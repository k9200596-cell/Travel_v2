# K-TRAVEL PICKS v44 (2026-10-25)

## 실행 / 배포
- **index.html** 한 파일만 브라우저에서 열면 됩니다. HTML 안에 CSS와 JavaScript가 내장되어 있습니다.
- **style.css**, **app.js**는 수정하기 쉬운 별도 추출본입니다. 독립 HTML 파일에서는 이 두 파일을 추가로 업로드할 필요가 없습니다.
- 수동 배포: GitHub 저장소 `k9200596-cell/Travel_v2` → `main` → `index.html` → Edit(연필) → 이 ZIP의 `index.html` 전체로 교체 → Commit changes. 커밋 기록으로 이전 버전 복구 가능합니다.
- GitHub 연결 도구 쓰기 확인 결과 `HTTP 403 Resource not accessible by integration`. 별도 백업은 생략했지만 실제 쓰기 권한이 없어 **v44 커밋은 생성되지 않았습니다**. 공개 GitHub Pages 화면은 직접 검증하지 못했습니다.
- 해결: GitHub Settings → Applications → Installed GitHub Apps → Configure → Travel_v2 저장소 허용 여부 및 Contents: Read and write 권한 확인. 앱이 이 권한을 요청하지 않는 경우 앱 권한 재승인 또는 다른 쓰기 가능한 연결이 필요합니다.

## 이번 버전에서 개선한 점
1. 출발일을 바꾸면 기본적으로 기존 여행기간을 유지하며 귀국일을 함께 조정. 체크박스로 끄기 가능. UTC 날짜 연산으로 시차/서머타임 오류 방지.
2. 여행기간이 잘못된 상태에서 '여행계획 만들기'를 눌러도 기존 계획이 초기화되지 않도록 사전 차단.
3. 미저장 변경사항이 있는 계획을 새 계획으로 교체하기 전 확인창. 취소하면 기존 계획·메모 유지.
4. 스마트폰 상단에 여행 D-day·일정 작성률·맞춤 준비물·항공료 입력 여부·다음 할 일 표시.
5. 중복되는 이전 사진 갤러리를 접어놓고 필요할 때 열도록 정리. 기존 갤러리 기능은 유지.
6. 현재 계획 JSON 백업, 전체 저장목록 JSON, 사진 출처 JSON의 버전 메타데이터를 v44로 수정.
7. 신규 사진 출처 4곳: 삿포로 오도리공원, 뉴욕 센트럴파크·브루클린 브리지, 시드니 로열 보타닉 가든.
8. 기존 24개 여행지/120개 관광명소, 추천 일정·수정·삭제, 항공료·경비, 입국안내, 우기/건기, 준비물, 저장·복원·가져오기 기능 유지.

## 신규 사진 저작권 정보 (2026-10-25 Commons 원본 설명 확인)
- 삿포로 · 오도리공원: Odori park at Sapporo TV tower.jpg — 저작자 LR0725, 촬영 2023-07-09, CC BY-SA 4.0. 원본 https://commons.wikimedia.org/wiki/File:Odori%20park%20at%20Sapporo%20TV%20tower.jpg
- 뉴욕 · 센트럴파크: 2024-11-19-Central Park-0669.jpg — 저작자 Superbass, 촬영 2024-11-19, CC BY-SA 4.0. 원본 https://commons.wikimedia.org/wiki/File:2024-11-19-Central%20Park-0669.jpg
- 뉴욕 · 브루클린 브리지: Brooklyn Bridge 2024.jpg — 저작자 Mojnsen, 촬영 2024-02-18, CC BY-SA 4.0. 원본 https://commons.wikimedia.org/wiki/File:Brooklyn%20Bridge%202024.jpg
- 시드니 · 로열 보타닉 가든: Sydney Royal Botanic Gardens The Calyx seen from the northwest.jpg — 저작자 Ymblanter, 촬영 2024-04-01, CC BY-SA 4.0. 원본 https://commons.wikimedia.org/wiki/File:Sydney%20Royal%20Botanic%20Gardens%20The%20Calyx%20seen%20from%20the%20northwest.jpg
- 라이선스: https://creativecommons.org/licenses/by-sa/4.0/ · 저작자·원본·라이선스 링크 및 수정 여부 표시. 사이트는 CSS object-fit에 따라 크롭될 수 있습니다. 사진 원본 파일은 ZIP에 포함하지 않고 Commons 링크로 표시합니다.
- 사진 출처 확보 76/120곳, 미확인 44곳은 대체 이미지 유지. 이전 출처 기록 190건은 전수 재검증하지 않았습니다.

## 검증 및 한계
- Playwright Chromium 브라우저 시나리오 **66건 통과, 실패 0건**. 실제 추천 일정 생성 24도시×7기간=168건, 현지 도착일 계산 24도시×12개월=288건. 모바일/데스크톱 320~1440px 7개 화면폭에서 가로 넘침 없음.
- 브라우저 file:// 탐색이 관리자 정책으로 차단되어 page.set_content + 메모리 localStorage 모의 저장소 사용. 실제 기기에서 브라우저 데이터 지속성은 미검증.
- Wikimedia Commons 외부 이미지 실제 로딩과 해상도, GitHub Pages 공개 화면은 확인하지 못했습니다.
- 13개 국가 입국 안내는 기존 확인일 자료를 계승. 실제 출국 전 여권·비자·입국신고는 해당 국가 공식 사이트에서 다시 확인하세요.
- 월별 기온은 공식 기후평년값이 아닌 개략 추정치이며 우기/건기는 도시·해안·산악 등 지역별 차이가 있습니다.
- 유료 API는 사용하지 않았습니다.
