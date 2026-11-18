/**
 * owner.js
 * 책장 제목 Who's의 Who 부분만 클릭해서 바꾸는 기능입니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function renderOwner(){$('owner-name').textContent=localStorage.getItem(OWNER_KEY)||'Who';}
// 브라우저에 이미 저장된 문자열 값을 읽습니다. 값이 없으면 null을 반환합니다.
$('edit-owner').addEventListener('click',()=>{$('owner-input').value=localStorage.getItem(OWNER_KEY)||'Who';$('owner-dialog').showModal();});
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('cancel-owner').addEventListener('click',()=>$('owner-dialog').close());
// 변경한 값을 브라우저의 localStorage에 영구 보관합니다(사용자가 삭제하기 전까지).
$('owner-form').addEventListener('submit',e=>{e.preventDefault();const name=$('owner-input').value.trim();if(!name)return;localStorage.setItem(OWNER_KEY,name);renderOwner();$('owner-dialog').close();});
