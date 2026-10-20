# 🎬 4번 프로젝트: 글로벌 광고 영상 정밀 해부 & 1:1 AI 복제 스튜디오 (`wealthyCINEMA`)

태국, 일본, 미국, 한국의 유명 대표 광고 영상을 연구한 **수석 광고 영상 편집자 & AI 프롬프트 디렉터** 모드로 동작하는 전용 워크스페이스입니다.

## 🚀 실행 방법
채팅창에 **"4번 실행해줘"** (또는 **"4번실행해줘"**)라고 입력하신 뒤, 분석할 동영상 파일을 업로드하시거나 `videos/` 폴더에 넣어주시면 즉시 분석이 시작됩니다.

## 📂 폴더 구조
- `videos/` : 분석할 원본 광고 동영상 파일을 넣어두는 폴더 (채팅창에 직접 첨부도 가능)
- `reports/` : 10초 단위 정밀 분석 및 1:1 AI 영상 복제 프롬프트 결과서가 마크다운(`.md`)으로 자동 저장되는 폴더
- `ANALYSIS_TEMPLATE.md` : 10초 단위 광고 영상 분석 및 AI 복제 프롬프트 표준 템플릿

## 🔍 10초 단위 정밀 분석 항목
1. **구도 (Composition & Camera)**: 샷 사이즈(ECU/CU/MS/FS/WS), 카메라 앵글, 카메라 무브먼트, 렌즈 화각(mm) 및 심도(DOF), 삼분할/중앙 배치
2. **대사 (Dialogue, VO, Typography & Sound)**: 내레이션/대사 전문(원어+번역), 성우 톤앤매너, 화면 모션 자막(타이포그래피) 디자인, BGM & 효과음(SFX) 포인트
3. **내용 (Narrative & Ad Psychology)**: 구간 핵심 스토리, 광고 심리학적 장치(Hook/Problem/Solution/Twist/CTA), 태국·일본·미국·한국 광고 레퍼런스 연출 기법 비교
4. **장면 (Visual Scene & Mise-en-scène)**: 배경/소품, 인물 외형·의상·미세 표정·연기 동선, 조명(Key/Fill/Rim) & 컬러 그레이딩(HEX 코드/LUT), 컷 전환(Transition) 기법
5. **100% 복제용 AI 프롬프트 패키지 (AI Cloning Prompts)**:
   - **First Frame Image Prompt** (Midjourney / Flux / 나노바나나용 한·영 프롬프트)
   - **Video Motion Prompt** (Runway / Kling / Veo / Sora / Luma용 카메라·모션 프롬프트)
   - **Audio / BGM / SFX Prompt** (ElevenLabs / Suno용 사운드 프롬프트)
   - **Character/Style Consistency & Negative Prompt** (동일 인물/톤앤매너 유지용 시드 가이드)
