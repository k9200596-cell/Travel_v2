# K-TRAVEL PICKS v43 (2026-10-24)

## 실행 및 배포
- `index.html` 단일 파일을 브라우저에서 열면 됩니다. CSS/JavaScript는 HTML 안에 내장되어 있어 추가 파일 업로드가 필요하지 않습니다.
- `style.css`, `app.js`는 수정하기 편하도록 별도로 분리한 동일 소스입니다. `v43_patch.js`와 `v43_patch.css`는 이번 변경 부분입니다.
- GitHub 수동 업로드: `k9200596-cell/Travel_v2` 저장소 → `main` → 기존 `index.html` → 연필(Edit) → v43의 `index.html` 전체 내용으로 교체 → Commit changes. 기존 파일을 유지하고 싶다면 GitHub 커밋 기록으로 되돌릴 수 있습니다.
- 현재 GitHub 연결 앱의 `create_blob` 쓰기 권한 확인은 HTTP 403으로 실패했습니다. 따라서 v43은 GitHub에 자동 업로드되지 않았습니다. 원격 `main/index.html`은 v42(SHA 930622cd38883367fa5bead92bbf8905942dd3c0)입니다.
- GitHub Settings → Applications → Installed GitHub Apps → Configure에서 `Travel_v2` 저장소 접근과 **Contents: Read and write** 권한을 확인하세요. 앱 자체가 해당 권한을 요청하지 않으면 사용자가 설정만으로 추가할 수 없으며 앱 제공자 측 권한 설정/재연결이 필요할 수 있습니다.

## v43 변경사항
1. 저장/미저장 상태를 즉시 표시. 저장 후 편집하면 미저장 변경 경고.
2. 나라별 입국 준비와 맞춤 준비물 완료 수를 여행 준비 요약에 함께 표시.
3. 맞춤 준비물 전체/미완료/완료 필터와 미완료 목록 복사 기능.
4. 출발일만 입력한 경우 현지 도착일은 잠정값임을 명확히 표시. 항공권 정보 또는 직접 입력한 날짜로 신고 기간을 확인하도록 안내.
5. 12개월 기온·비가 잦은 시기 추정치 시각화. 공식 기후평년값이 아닌 참고값임을 명시.
6. 여행지 빠른 입력을 다시 적용할 때 기존 준비물 체크와 비행시간을 지우던 문제 수정.
7. 사진 4곳 신규 추가: 시드니 하버브리지, 시드니 본다이 비치, 뉴욕 자유의 여신상, 상하이 동방명주.
8. 24개 여행지·120개 관광명소, 일정·경비·브라우저 저장·JSON 백업 기능 유지.

## 테스트와 한계
- Chromium Playwright 검사 **57건 통과, 0건 실패**. 24개 도시 × 7개 일정 길이 = 168건, 24개 도시 × 12개월 도착일 = 288건.
- 브라우저 탐색이 관리자 정책으로 차단되어 `page.set_content`와 **메모리 모의 localStorage**를 사용했습니다. 실제 모바일 기기와 실제 브라우저 데이터 영속성은 미검증입니다.
- 외부 이미지 190개 출처 기록 중 신규 4건의 원본 설명을 확인했으며 기존 186건은 계승 기록입니다. 120개 명소 중 72곳 사진 출처 기록, 48곳 미확인.
- 기온은 공식 평년값이 아닌 대략적인 안내 수치, 입국 요건은 기존 확인일 기준이며 출국 직전 최신 공식 자료 확인이 필요합니다.

## 신규 사진 출처 (CC BY-SA 4.0)
- Sydney Harbour Bridge 2025.jpg — Bonnie Jin, 2025-04-12: https://commons.wikimedia.org/wiki/File:Sydney_Harbour_Bridge_2025.jpg
- Sydney Bondi Beach 2025.jpg — LittleMi&Ada, 2025-03-14: https://commons.wikimedia.org/wiki/File:Sydney_Bondi_Beach_2025.jpg
- Statue of Liberty 2024.jpg — Mojnsen, 2024-02-19: https://commons.wikimedia.org/wiki/File:Statue_of_Liberty_2024.jpg
- Oriental Pearl Tower in Shanghai.jpg — Dmitry A. Mottl, 2014-12-22: https://commons.wikimedia.org/wiki/File:Oriental_Pearl_Tower_in_Shanghai.jpg
- 라이선스: https://creativecommons.org/licenses/by-sa/4.0/
- 원본 이미지 파일은 이 ZIP에 포함하지 않고 Wikimedia Commons 링크로 표시합니다. 원본 파일 수정은 없으며 CSS 표시 영역이 일부 잘릴 수 있습니다.
