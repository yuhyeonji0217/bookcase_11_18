/**
 * app.js
 * 모든 JS가 로드된 다음 처음 화면을 그리는 진입점입니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// 브라우저 창 크기가 바뀔 때 실행할 이벤트 처리 함수를 등록합니다.
applyLanguage();renderOwner();applyTheme();renderGenreOptions();renderShelf();window.addEventListener('resize',renderShelf);
