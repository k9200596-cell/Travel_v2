# K-TRAVEL PICKS v52 — 2026-11-02

## 이번 버전
- 기존 24개 도시, 240개 관광명소, 자동 일정, 저장·복원, JSON 백업, Booking.com 연결, Frankfurter 환율, PDF 기능 유지.
- Wikimedia Commons 개별 사진 설명 페이지의 저작자·장소·CC 라이선스를 확인한 사진 15장을 5개 기존 관광명소에 신규 연결.
  - 푸꾸옥 즈엉동 야시장 5장, 롱비치 2장, 푸꾸옥 국립공원 북동부 도로 1장
  - 오키나와 국제거리 4장, 슈리성 공원 3장
- 관광명소 사진 출처 기록 95/240곳, 미확보 145곳. 총 사진 출처 레코드 240장(기존 225장 + 신규 15장).
- 갤러리는 중복 파일 제외 최대 5장 표시, 첫 대표 사진과 갤러리 첫 사진 일치.
- 슈리성의 2019년 화재 이전 사진에는 현재 모습과 다르다는 주의 문구를 표시.
- 실제 사진 연결 실패 시 텍스트가 겹치던 대체 이미지에서 SVG 내부 중복 문구를 제거.
- 인쇄/PDF 경비 포함 체크박스 기본 미체크. 미체크 시 일정만 출력, 체크 시 경비표를 모든 일정 마지막에 표시.
- 사진 저작권 점검 안내 문구를 현재 버전 기준으로 갱신.

## 출처와 검증 범위
- 신규 15장의 파일명, 저작자, CC 라이선스, 촬영일(알 수 없는 경우 미확인), 개별 원본 URL, 확인일은 `v52_new_photo_sources.csv` 및 `photo_sources.json`에 기록.
- CC BY-SA 사진의 저작자·원본·라이선스 링크·수정 여부 표시 의무 준수 필요.
- 원본 파일 자체를 저장소에 복제하지 않고 Commons `Special:FilePath` 외부 링크를 사용.
- 기존 225장 사진은 이전 버전의 출처 기록을 계승하며 **이번 실행에서 재검증하지 않음**.
- 외부 이미지의 실제 로딩, 원격 이미지 파일 바이트, Booking.com의 최종 조건 유지, Frankfurter API 실제 CORS 동작은 이 환경에서 검증하지 못함.
- 오래된 관광지 사진은 최신 현장 모습을 의미하지 않음. 슈리성 사진은 화재 이전 모습임을 명시.

## 테스트
- `test_report.json`: 데스크톱·모바일·갤러리·일정·Booking.com URL·모의 환율·저장·PDF 경비 포함/제외 등 **76/76 통과**.
- Chromium은 로컬/외부 URL 이동이 정책상 차단되어 `page.set_content` 방식으로 UI 테스트 수행. 네트워크 환율은 모의 응답, 브라우저 저장은 모의 localStorage를 사용. 실제 운영 환경에서 추가 검증 필요.

## GitHub Pages 수동 배포
1. `https://github.com/k9200596-cell/Travel_v2` → `main` → 기존 `index.html` 열기.
2. 편집(연필)에서 이 ZIP의 `index.html` 전체 내용을 교체하거나, GitHub의 **Upload files**에서 기존 `index.html`을 같은 이름으로 교체.
3. `Commit changes` 클릭. 다른 버전별 파일을 저장소 루트에 추가하지 않음.
4. `https://k9200596-cell.github.io/Travel_v2/`에서 강력 새로고침 후 우측 상단 **v52** 확인.
5. 사진 링크 로딩, Booking.com 날짜·인원 전달, 환율 출처/기준일, PDF 체크박스 동작을 실제 네트워크에서 확인.

GitHub `main`의 `index.html` 조회 당시 blob SHA: `82da0721ec76f78073e2815fa653911b177a39b9`, 표시 버전 v50.
GitHub 계정은 저장소 메타데이터에서 push=true로 보였으나, 협업자 권한 확인 API는 403 `Resource not accessible by integration` 오류. 사용자 요청에 따라 자동 쓰기/커밋을 하지 않았음.

## 소스 구성
- `index.html`: GitHub Pages 단일 파일 배포용. CSS/JS 내장.
- `style.css`, `app.js`: 별도 편집/개발용 (HTML과 동일 내용).
- `photo_sources.json`: 사진 출처 전체 기록과 사진 미확보 명소 목록.
- `missing_photos.csv`: 145개 미확보 명소 전체 목록.
- `v52_new_photo_sources.csv`: 신규 사진 15장의 라이선스·원본·저작자·확인일.
- `test_report.json`: 테스트 결과 및 미검증 범위.
