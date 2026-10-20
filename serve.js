const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const ROOT_DIR = __dirname;
const VIDEOS_DIR = path.join(ROOT_DIR, 'videos');
const FRAMES_DIR = path.join(ROOT_DIR, 'videos', 'frames');
const REPORTS_DIR = path.join(ROOT_DIR, 'reports');

[VIDEOS_DIR, FRAMES_DIR, REPORTS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.mkv': 'video/x-matroska',
  '.avi': 'video/x-msvideo',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data));
}

function sanitizeFileName(name) {
  return path.basename(name).replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-File-Name'
    });
    return res.end();
  }

  // 1. List uploaded videos & reports
  if (req.method === 'GET' && pathname === '/api/videos') {
    try {
      const files = fs.readdirSync(VIDEOS_DIR).filter((f) => {
        const ext = path.extname(f).toLowerCase();
        return ['.mp4', '.mov', '.webm', '.mkv', '.avi'].includes(ext);
      });

      const videoList = files.map((filename) => {
        const filePath = path.join(VIDEOS_DIR, filename);
        const stat = fs.statSync(filePath);
        const baseName = path.parse(filename).name;
        const jsonReportPath = path.join(REPORTS_DIR, `${baseName}.json`);
        const mdReportPath = path.join(REPORTS_DIR, `${baseName}.md`);
        const frameFolder = path.join(FRAMES_DIR, baseName);
        let frameCount = 0;
        if (fs.existsSync(frameFolder)) {
          frameCount = fs.readdirSync(frameFolder).filter((f) => f.endsWith('.jpg') || f.endsWith('.png')).length;
        }
        return {
          filename,
          baseName,
          url: `/videos/${encodeURIComponent(filename)}`,
          size: stat.size,
          updatedAt: stat.mtime.toISOString(),
          hasJsonReport: fs.existsSync(jsonReportPath),
          hasMdReport: fs.existsSync(mdReportPath),
          frameCount
        };
      }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      return sendJson(res, 200, { ok: true, videos: videoList });
    } catch (err) {
      return sendJson(res, 500, { ok: false, error: err.message });
    }
  }

  // 2. Upload video file (binary stream with X-File-Name header)
  if (req.method === 'POST' && pathname === '/api/upload') {
    try {
      const rawName = req.headers['x-file-name']
        ? decodeURIComponent(req.headers['x-file-name'])
        : `ad_video_${Date.now()}.mp4`;
      const filename = sanitizeFileName(rawName);
      const savePath = path.join(VIDEOS_DIR, filename);
      const writeStream = fs.createWriteStream(savePath);

      req.pipe(writeStream);

      writeStream.on('finish', () => {
        const stat = fs.statSync(savePath);
        sendJson(res, 200, {
          ok: true,
          filename,
          url: `/videos/${encodeURIComponent(filename)}`,
          size: stat.size,
          savedPath: savePath
        });
      });

      writeStream.on('error', (err) => {
        sendJson(res, 500, { ok: false, error: err.message });
      });
      return;
    } catch (err) {
      return sendJson(res, 500, { ok: false, error: err.message });
    }
  }

  // 3. Save extracted keyframes & metadata for a video
  if (req.method === 'POST' && pathname === '/api/save-frames') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const baseName = sanitizeFileName(payload.baseName || 'video');
        const targetDir = path.join(FRAMES_DIR, baseName);
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        const savedFrames = [];
        if (Array.isArray(payload.frames)) {
          payload.frames.forEach((frame) => {
            if (!frame.dataUrl) return;
            const matches = frame.dataUrl.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
            if (!matches) return;
            const buffer = Buffer.from(matches[2], 'base64');
            const fname = sanitizeFileName(frame.name || `frame_${frame.time}s.jpg`);
            const fpath = path.join(targetDir, fname);
            fs.writeFileSync(fpath, buffer);
            savedFrames.push({
              name: fname,
              time: frame.time,
              segmentIndex: frame.segmentIndex,
              palette: frame.palette || [],
              url: `/videos/frames/${encodeURIComponent(baseName)}/${encodeURIComponent(fname)}`,
              savedPath: fpath
            });
          });
        }

        const metaPath = path.join(targetDir, 'metadata.json');
        fs.writeFileSync(
          metaPath,
          JSON.stringify({
            baseName,
            filename: payload.filename,
            duration: payload.duration,
            width: payload.width,
            height: payload.height,
            aspectRatio: payload.aspectRatio,
            segmentCount: payload.segmentCount,
            frames: savedFrames,
            extractedAt: new Date().toISOString()
          }, null, 2),
          'utf-8'
        );

        return sendJson(res, 200, { ok: true, frameDir: targetDir, count: savedFrames.length, frames: savedFrames });
      } catch (err) {
        return sendJson(res, 500, { ok: false, error: err.message });
      }
    });
    return;
  }

  // 4. Get or Save Report (JSON + Markdown)
  if (req.method === 'GET' && pathname.startsWith('/api/report/')) {
    const baseName = sanitizeFileName(pathname.replace('/api/report/', ''));
    const jsonPath = path.join(REPORTS_DIR, `${baseName}.json`);
    const mdPath = path.join(REPORTS_DIR, `${baseName}.md`);
    const metaPath = path.join(FRAMES_DIR, baseName, 'metadata.json');

    const result = { ok: true, baseName, data: null, markdown: null, metadata: null };
    if (fs.existsSync(jsonPath)) {
      try { result.data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')); } catch (e) {}
    }
    if (fs.existsSync(mdPath)) {
      try { result.markdown = fs.readFileSync(mdPath, 'utf-8'); } catch (e) {}
    }
    if (fs.existsSync(metaPath)) {
      try { result.metadata = JSON.parse(fs.readFileSync(metaPath, 'utf-8')); } catch (e) {}
    }
    return sendJson(res, 200, result);
  }

  if (req.method === 'POST' && pathname === '/api/save-report') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const baseName = sanitizeFileName(payload.baseName || 'report');
        const jsonPath = path.join(REPORTS_DIR, `${baseName}.json`);
        const mdPath = path.join(REPORTS_DIR, `${baseName}.md`);

        if (payload.data) {
          fs.writeFileSync(jsonPath, JSON.stringify(payload.data, null, 2), 'utf-8');
        }
        if (payload.markdown) {
          fs.writeFileSync(mdPath, payload.markdown, 'utf-8');
        }

        return sendJson(res, 200, {
          ok: true,
          jsonPath,
          mdPath
        });
      } catch (err) {
        return sendJson(res, 500, { ok: false, error: err.message });
      }
    });
    return;
  }

  // 5. Serve static files (with HTTP Range support for video scrubbing!)
  let filePath = pathname === '/' ? path.join(ROOT_DIR, 'index.html') : path.join(ROOT_DIR, pathname);
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Not Found');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(filePath);

  // Support Range requests so video timeline seeking every 10s works smoothly
  if (req.headers.range && contentType.startsWith('video/')) {
    const range = req.headers.range;
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType
    });
    return file.pipe(res);
  }

  res.writeHead(200, {
    'Content-Length': stat.size,
    'Content-Type': contentType,
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🎬 [4번 프로젝트] 글로벌 광고 영상 정밀 해부 & AI 복제 스튜디오`);
  console.log(`🌐 로컬 서버 실행 완료: http://localhost:${PORT}`);
  console.log(`📂 영상 저장 경로: ${VIDEOS_DIR}`);
  console.log(`📑 리포트 저장 경로: ${REPORTS_DIR}`);
  console.log(`====================================================`);
});
