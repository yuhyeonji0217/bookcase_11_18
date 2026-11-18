/**
 * detail.js
 * 책 상세 정보, 메모/문장 목록, 독서 진행률 표시와 입력을 담당합니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function openDetail(id){currentId=id;$('shelf-view').hidden=true;$('detail-view').hidden=false;renderDetail();}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function renderDetail(){const book=currentBook();if(!book)return;
// 화면에 표시할 텍스트를 안전하게 설정합니다(입력값을 HTML로 실행하지 않음).
 $('detail-title').textContent=book.title;$('detail-author').textContent=`${t("authorPrefix")}: ${book.author}`;$('detail-publisher').textContent=`${t("publisherPrefix")}: ${book.publisher}`;$('detail-genre').textContent=`${t("genrePrefix")}: ${displayGenre(book.genre||"Uncategorized")}`;
// 읽은 페이지를 기반으로 진행률 숫자와 막대 너비를 갱신합니다.
 updateProgress();
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
 for(const type of ['sentences','comments']){
// 기존 자식 요소를 비워 중복 표시를 방지한 뒤 최신 데이터로 다시 그립니다.
 const list=$(type);list.replaceChildren();
// 배열/목록의 각 요소를 순서대로 방문하여 DOM을 생성하거나 상태를 갱신합니다.
 (book[type]||[]).forEach((value,index)=>{
// HTML 파일에 없는 요소를 JavaScript에서 새로 생성합니다.
  const li=document.createElement('li');li.className='note-item';
// 키보드 Enter 또는 Space로 조작할 때 실행할 이벤트 처리 함수를 등록합니다.
  const content=document.createElement('span');content.className='note-text editable-note';content.textContent=value;content.tabIndex=0;content.setAttribute('role','button');content.setAttribute('title',t('editNote'));content.setAttribute('aria-label',`Edit ${type==='sentences'?'sentence':'note'} ${index+1}`);content.addEventListener('click',()=>openNote(type,index));content.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openNote(type,index);}});
// 생성한 HTML 요소를 부모 요소의 자식으로 화면에 붙입니다.
  li.appendChild(content);list.appendChild(li);
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
 });
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function updateProgress(){const book=currentBook();if(!book)return;const percent=Math.round((book.readPages||0)/book.pages*100);$('progress-fill').style.width=`${percent}%`;$('progress-text').textContent=`${book.readPages||0}p / ${book.pages}p · ${percent}% 읽음`;document.querySelector('.progress').setAttribute('aria-valuenow',String(percent));}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function openProgressEditor(){
// 현재 상세 화면에서 보고 있는 책을 고유 ID로 찾습니다.
 const book=currentBook();if(!book)return;
// 입력창의 현재 값을 읽거나 초기값을 설정합니다.
 $('read-pages').max=book.pages; $('read-pages').value=book.readPages||0;
// 해당 dialog를 모달 팝업으로 열어 입력을 받습니다.
 $('progress-dialog').showModal(); $('read-pages').focus();
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('progress-control').addEventListener('click',openProgressEditor);
// 키보드 Enter 또는 Space로 조작할 때 실행할 이벤트 처리 함수를 등록합니다.
$('progress-control').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProgressEditor();}});
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('cancel-progress').addEventListener('click',()=>$('progress-dialog').close());
// 입력 폼의 저장 버튼을 누를 때 실행할 이벤트 처리 함수를 등록합니다.
$('progress-form').addEventListener('submit',e=>{
// 현재 상세 화면에서 보고 있는 책을 고유 ID로 찾습니다.
 e.preventDefault();const book=currentBook();if(!book)return;
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
 const input=$('read-pages');const value=Number(input.value);
// 입력된 페이지 수가 허용되는 정수인지 검증합니다.
 if(input.value.trim()===''||!Number.isInteger(value)||value<0||value>book.pages){
// 함수의 계산 결과를 돌려주거나 조건에 따라 함수 실행을 중단합니다.
  alert(t("pagesRange", {pages:book.pages}));return;
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
 }
// 열려 있는 dialog 팝업을 닫습니다.
 book.readPages=value;saveBooks();updateProgress();$('progress-dialog').close();
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
});
