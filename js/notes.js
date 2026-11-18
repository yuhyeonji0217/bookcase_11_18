/**
 * notes.js
 * 인상 깊은 문장과 메모의 추가·수정·삭제를 같은 팝업으로 처리합니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function openNote(type,index=null){
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
 noteType=type;editingNoteIndex=index;
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
 const editing=index!==null;
// 화면에 표시할 텍스트를 안전하게 설정합니다(입력값을 HTML로 실행하지 않음).
 $('note-heading').textContent=(type==='comments'?t('notes'):t('sentences'))+' — '+(editing?t('edit'):t('add'));
// 현재 상세 화면에서 보고 있는 책을 고유 ID로 찾습니다.
 $('note-content').value=editing?(currentBook()?.[type]?.[index]||''):'';
// HTML hidden 속성을 변경하여 필요한 화면/버튼만 표시합니다.
 $('delete-note').hidden=!editing;
// 해당 dialog를 모달 팝업으로 열어 입력을 받습니다.
 $('note-dialog').showModal();
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('add-comment').addEventListener('click',()=>openNote('comments'));
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('add-sentence').addEventListener('click',()=>openNote('sentences'));
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('cancel-note').addEventListener('click',()=>{$('note-dialog').close();editingNoteIndex=null;});
// 현재 상세 화면에서 보고 있는 책을 고유 ID로 찾습니다.
$('note-form').addEventListener('submit',e=>{e.preventDefault();const value=$('note-content').value.trim();const book=currentBook();if(!value||!book)return;if(editingNoteIndex===null)book[noteType].push(value);
// 데이터가 없거나 입력값이 잘못된 경우를 걸러 오류와 잘못된 저장을 방지합니다.
 else if(editingNoteIndex>=0&&editingNoteIndex<book[noteType].length)book[noteType][editingNoteIndex]=value;
// 열려 있는 dialog 팝업을 닫습니다.
 saveBooks();renderDetail();$('note-dialog').close();editingNoteIndex=null;});

// 현재 상세 화면에서 보고 있는 책을 고유 ID로 찾습니다.
$('delete-note').addEventListener('click',()=>{const book=currentBook();if(!book||editingNoteIndex===null)return;if(!confirm(t('confirmDeleteNote')))return;book[noteType].splice(editingNoteIndex,1);saveBooks();renderDetail();$('note-dialog').close();editingNoteIndex=null;});
