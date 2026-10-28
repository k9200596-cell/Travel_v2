# K-TRAVEL PICKS v46 — 사진 중심 여행 사이트

2026-10-27 제작. 기존 v45 단일 HTML을 기반으로 기존 기능을 보존하며 UI를 정리했습니다.

## 이번 개선
- 첫 화면: 24개 여행지의 대표 사진 카드만 강조. 국가·도시별 공식 인기순위가 아닌 편집 추천순입니다.
- 여행지 선택: 5개 관광명소 사진 카드를 먼저 표시(전체 120개). 사진 선택 → 짧은 설명 → 일정 담기.
- 기존 일정·경비·저장 기능 유지, 입국·기후·체크리스트는 '여행 준비' 접이식 메뉴로 이동.
- 화면 상단 우측 v46 표시, 모바일 화면폭 320~1440px 검사.
- 출처가 확인된 명소 사진 80곳, 대체 이미지 40곳. 기존 사진 출처는 계승, 이번 버전 신규 사진 0건.

## 파일 안내
- `index.html`: CSS/JS를 포함한 **완전한 단일 실행 파일**. GitHub Pages에는 이 파일만 교체하면 됩니다.
- `style.css`: 전체 스타일(참고용).
- `app.js`: 전체 JavaScript(참고용).
- `photo_sources.json`, `missing_photos.csv`: 사진 출처와 누락 명소 목록.
- `test_report.json`: 검사 결과와 미검증 항목.

## GitHub 수동 업로드
1. https://github.com/k9200596-cell/Travel_v2 에 로그인합니다.
2. `main` 브랜치에서 `index.html`을 엽니다. 기존 내용 전체를 새 `index.html` 내용으로 교체하거나 GitHub 웹 편집기에서 동일 경로에 반영합니다.
3. 커밋 메시지 `feat: K-TRAVEL PICKS v46 photo-first UI`로 커밋합니다.
4. GitHub Pages 배포 완료 후 https://k9200596-cell.github.io/Travel_v2/ 에서 우측 상단 v46 및 주요 기능을 확인합니다.
5. 권한 오류 시 GitHub Settings > Applications > Installed GitHub Apps > Configure 에서 해당 연결 앱의 저장소 접근 범위 및 Contents: Read and write 권한을 확인합니다.

## 자동 업로드 상태
- 2026-10-27 GitHub 연결의 Git 객체 쓰기 사전 검사에서 HTTP 403 `Resource not accessible by integration` 발생.
- 저장소의 `main/index.html` 최신 확인 blob SHA: `b4176c14048d578a2da1c9a9fc35967c3f73e66b` (저장소는 v44).
- **v46 커밋·Pages 배포는 수행되지 않았습니다.**

## 검사 및 한계
- Chromium Playwright UI 검사 36건 통과, JSON 내보내기·가져오기 추가 검증. 24개 여행지×7개 여행기간 168건, 24개×12개월 도착일 288건, 24개 도시 갤러리 검사 통과.
- 실제 모바일 기기, 브라우저 재시작 후 저장, 외부 Wikimedia 이미지 로딩은 미검증입니다.
- 사진 원본을 ZIP에 포함하지 않습니다. 외부 사진을 사용할 때는 카드별 출처·저작자·라이선스·수정 여부를 확인하세요.
- 유료 API는 사용하지 않습니다.
