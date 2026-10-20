# 🎬 [광고 영상 분석 리포트] {영상 제목 / 파일명}

## 📋 0. 마스터 블루프린트 (전체 영상 총괄 설계도)
- **러닝타임 / 화면비율 / 프레임레이트**: `00:00` / `16:9 or 9:16` / `24fps or 30fps`
- **총 컷(Cut) 수 & 편집 템포**: 총 `N`컷 (평균 컷 길이 `X.X`초, 초반 빠른 훅 → 중반 빌드업 → 후반 클라이맥스)
- **국가별 광고 레퍼런스 문법**:
  - **주도적 스타일**: (예: 태국식 반전 드라마틱 서사 / 일본식 초현실 디테일 훅 / 미국식 하이임팩트 문제해결 / 한국식 감각적 미장센 & 타이포그래피)
- **전체 컬러 팔레트 & 조명 기조**:
  - Primary Color: `#XXXXXX` / Secondary Color: `#XXXXXX` / Accent Color: `#XXXXXX`
  - Lighting & LUT: (예: 웜톤 골든아워 시네마틱, 35mm 필름 그레인, 하이 콘트라스트 림라이트)
- **마스터 캐릭터 & 오브젝트 고정 프롬프트 (Consistency Seed)**:
  - **Main Character**: `[영문 고정 외형 묘사 - 연령, 인종, 헤어스타일, 얼굴 특징, 의상 디테일]`
  - **Hero Product / Prop**: `[영문 고정 제품/소품 외형 묘사 - 재질, 형태, 컬러, 로고 위치]`

---

## ⏱️ 구간별 10초 단위 정밀 해부 및 1:1 복제 프롬프트

### 🎬 [Section 01] `00:00 ~ 00:10` — (구간 핵심 소제목: 예 - 시선 강탈 오프닝 훅)

> **세부 컷 타임라인**:
> - `Cut 1 (00:00 ~ 00:03)`: [한 줄 요약]
> - `Cut 2 (00:03 ~ 00:07)`: [한 줄 요약]
> - `Cut 3 (00:07 ~ 00:10)`: [한 줄 요약]

#### 1. 구도 (Composition & Camera Work)
- **샷 사이즈 & 앵글**: (예: Cut 1은 ECU 눈동자 클로즈업 Eye-level → Cut 2는 Low-angle Medium Shot)
- **카메라 무브먼트**: (예: 초당 10% 속도의 Slow Dolly-in 후 00:03에 왼쪽으로 빠른 Whip Pan)
- **렌즈 화각 & 심도(DOF)**: (예: 85mm f/1.4 극단적 아웃포커싱, 피사체 정중앙 대칭 구도)

#### 2. 대사 (Dialogue, Voiceover, Subtitle & Sound)
- **대사 / 내레이션(VO)**:
  - `[00:01~00:04]` *"대사 원문"* (한국어 번역) — **[보이스 톤: 낮고 속삭이는 듯한 미스터리 톤, 호흡감 강조]**
- **화면 자막 (On-Screen Typography)**:
  - 문구: `"..."` / 위치: 화면 중앙 하단 / 스타일: 굵은 산세리프 화이트 텍스트 + 블랙 드롭섀도우, 프레임 단위로 글자가 튀어나오는 팝업 모션
- **BGM & 효과음(SFX)**:
  - `00:00`: 묵직한 베이스 드랍(Sub-bass impact) + 시계 초침 소리(Ticking SFX)
  - `00:03`: 전환 시 날카로운 Whoosh 사운드 후 긴장감 있는 현악기 피치카토 BGM 시작

#### 3. 내용 (Narrative & Ad Psychology)
- **스토리 전개**: [10초 동안 일어나는 서사 요약]
- **광고 심리학 & 레퍼런스 분석**:
  - 초반 3초 이탈 방지를 위한 패턴 인터럽트(Pattern Interrupt) 기법 적용.
  - (태국/일본/미국/한국 대표 광고 중 유사 레퍼런스 기법 및 소비자 뇌리에 박히는 이유 해설)

#### 4. 장면 (Scene & Mise-en-scène)
- **배경 및 공간**: [장소, 인테리어, 시간대, 배경 소품 디테일]
- **인물 외형 및 연기 디테일**: [의상, 헤어, 미세 표정 변화, 시선 이동 방향, 손짓/몸짓]
- **조명 및 색감**: [주광원 각도, 역광 유무, 색온도(K), 그림자 농도]
- **컷 편집 & 트랜지션**: [Hard cut / Match cut / Speed ramp 등 컷과 컷이 이어지는 편집 기술]

#### 5. 🤖 AI 100% 복제 프롬프트 (1:1 Clone Prompts)
- **🖼️ [First Frame Image Prompt (Midjourney v6 / Flux / 나노바나나)]**:
  - **Cut 1 (`00:00`)**:
    ```text
    [영문 초정밀 이미지 생성 프롬프트 - Subject + Action/Pose + Environment + Composition/Angle + Lighting + Color Palette + Camera/Lens + Style tags --ar 16:9 --v 6.1 --stylize 250]
    ```
    *(한글 해석 및 핵심 포인트 안내)*
- **🎥 [AI Video Motion Prompt (Runway Gen-3/4 / Kling / Veo / Sora)]**:
  - **Cut 1 (`00:00 ~ 00:03`)**:
    ```text
    [Camera Movement]: Slow push-in towards the subject's eyes, subtle handheld micro-shake.
    [Subject Motion]: The character slowly blinks and raises their eyebrows in surprise, lips slightly parting.
    [Environment & Lighting]: Warm rim light flickers gently in the blurred background, cinematic 24fps motion blur.
    ```
- **🔊 [Audio / Voice / SFX Prompt (ElevenLabs / Suno)]**:
  ```text
  [Voice]: Deep, cinematic, slightly husky young adult voice, intrigued and suspenseful tone.
  [SFX & BGM]: Deep cinematic sub-bass boom at 0s, rhythmic clock ticking, tense pizzicato strings at 110 BPM.
  ```
- **🚫 [Negative Prompt & 복제 디테일 팁]**:
  ```text
  morphing face, extra fingers, unnatural eye movement, overexposed lighting, cartoon, 3d render artifacts, text watermark, blurry focal point
  ```
