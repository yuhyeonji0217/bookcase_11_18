/**
 * book-actions.js
 * 책 추가·수정·삭제와 상세 화면에서 책장으로 돌아가는 기능입니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function openBookEditor() {
// 현재 상세 화면에서 보고 있는 책을 고유 ID로 찾습니다.
 const book=currentBook();if(!book)return;
// 책 추가/수정 폼의 장르 자동완성 목록을 갱신합니다.
 renderGenreOptions();const form=$('edit-book-form');
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
 for(const key of ['title','author','publisher','genre','pages']) {
// 입력창의 현재 값을 읽거나 초기값을 설정합니다.
  if (key !== 'genre') form.elements.namedItem(key).value=book[key]??'';
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
 }
// 해당 dialog를 모달 팝업으로 열어 입력을 받습니다.
 $('edit-genre').value = book.genre;
 if ($('edit-genre').value !== book.genre) { $('edit-genre').value = '__custom__'; $('edit-genre-custom').value = book.genre; }
 updateCustomGenre('edit-genre','edit-genre-custom');
 $('edit-book-dialog').showModal();
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
for(const id of ['detail-title','detail-author','detail-publisher','detail-genre']) {
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
 $(id).addEventListener('click',openBookEditor);
// 키보드 Enter 또는 Space로 조작할 때 실행할 이벤트 처리 함수를 등록합니다.
 $(id).addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBookEditor();}});
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('cancel-edit-book').addEventListener('click', () => $('edit-book-dialog').close());
// 입력 폼의 저장 버튼을 누를 때 실행할 이벤트 처리 함수를 등록합니다.
$('edit-book-form').addEventListener('submit', event => {
// 브라우저 기본 동작(폼 새로고침/드롭 차단 등)을 막고 직접 만든 기능을 실행합니다.
  event.preventDefault();
// 현재 상세 화면에서 보고 있는 책을 고유 ID로 찾습니다.
  const book = currentBook();
// 데이터가 없거나 입력값이 잘못된 경우를 걸러 오류와 잘못된 저장을 방지합니다.
  if (!book) return;
// 폼 안의 name 속성을 가진 입력 요소 값을 한 번에 수집합니다.
  const data = new FormData(event.currentTarget);
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
  const title = String(data.get('title')).trim();
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
  const author = String(data.get('author')).trim();
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
  const publisher = String(data.get('publisher')).trim();
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
  const genre = selectedGenre('edit-genre','edit-genre-custom');
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
  const pages = Number(data.get('pages'));
// 데이터가 없거나 입력값이 잘못된 경우를 걸러 오류와 잘못된 저장을 방지합니다.
  if (!title || !author || !publisher || !genre) {
// 함수의 계산 결과를 돌려주거나 조건에 따라 함수 실행을 중단합니다.
    alert(t('missingFields')); return;
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
  }
// 입력된 페이지 수가 허용되는 정수인지 검증합니다.
  if (!Number.isSafeInteger(pages) || pages < 1) {
// 함수의 계산 결과를 돌려주거나 조건에 따라 함수 실행을 중단합니다.
    alert(t('invalidPages')); return;
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
  }
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
  const readPages = Number(book.readPages) || 0;
// 데이터가 없거나 입력값이 잘못된 경우를 걸러 오류와 잘못된 저장을 방지합니다.
  if (readPages > pages && !confirm(
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
    t("pagesReduced", {readPages, pages})
// 함수의 계산 결과를 돌려주거나 조건에 따라 함수 실행을 중단합니다.
  )) return;
// 데이터가 없거나 입력값이 잘못된 경우를 걸러 오류와 잘못된 저장을 방지합니다.
  if (!Object.hasOwn(genres, genre)) {
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
    genres[genre] = '#c4b9aa';
// 장르별 색상 설정을 브라우저 저장소에 반영합니다.
    saveGenres();
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
  }
// 기존 책 객체의 ID와 기록은 유지하고 수정한 정보만 덮어씁니다.
  Object.assign(book, {title, author, publisher, genre, pages,
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
    readPages: Math.min(readPages, pages)});
// 책 배열의 최신 상태를 브라우저 저장소에 반영합니다.
  saveBooks();
// 현재 책의 제목·정보·독서 기록을 상세 화면에 다시 그립니다.
  renderDetail();
// 열려 있는 dialog 팝업을 닫습니다.
  $('edit-book-dialog').close();
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
});
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('add-book').addEventListener('click',()=>{renderGenreOptions();$('book-genre').selectedIndex=0;updateCustomGenre('book-genre','book-genre-custom');$('book-dialog').showModal();});
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('cancel-book').addEventListener('click',()=>{$('book-form').reset();$('book-dialog').close();});
// 입력 폼의 저장 버튼을 누를 때 실행할 이벤트 처리 함수를 등록합니다.
$('book-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const pages=Number(data.get('pages'));const genre=selectedGenre('book-genre','book-genre-custom');
// 입력된 페이지 수가 허용되는 정수인지 검증합니다.
 if(!Number.isSafeInteger(pages)||pages<1)return alert(t('invalidPages'));if(!genre)return alert(t('missingGenre'));
// 장르별 색상 설정을 브라우저 저장소에 반영합니다.
 if(!Object.hasOwn(genres,genre)){genres[genre]='#c4b9aa';saveGenres();}
// 소수점을 버려 책 두께의 페이지 구간 또는 높이용 정수를 만듭니다.
 books.push({id:crypto.randomUUID(),title:String(data.get('title')).trim(),author:String(data.get('author')).trim(),publisher:String(data.get('publisher')).trim(),genre,pages,readPages:0,comments:[],sentences:[],heightSeed:Math.floor(Math.random()*55)});
// 열려 있는 dialog 팝업을 닫습니다.
 saveBooks();renderShelf();e.currentTarget.reset();$('book-dialog').close();});
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('delete-book').addEventListener('click',()=>{if(!selectedId)return alert(t('chooseBook'));if(!confirm(t('confirmDeleteBook')))return;books=books.filter(book=>book.id!==selectedId);selectedId=null;saveBooks();renderShelf();});
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('back').addEventListener('click',()=>{currentId=null;$('detail-view').hidden=true;$('shelf-view').hidden=false;renderShelf();});
