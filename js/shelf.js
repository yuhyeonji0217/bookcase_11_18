/**
 * shelf.js
 * 책장 렌더링, 상단 우선 배치, 선택/상세 진입, 드래그 정렬을 담당합니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function renderShelf(){
// 기존 자식 요소를 비워 중복 표시를 방지한 뒤 최신 데이터로 다시 그립니다.
 const top=$('shelf-top'),bottom=$('shelf-bottom');top.replaceChildren();bottom.replaceChildren();
// 책장의 실제 가로 너비를 측정해 윗칸에 들어갈 책 수를 계산합니다.
 const topCapacity=top.clientWidth-parseFloat(getComputedStyle(top).paddingLeft)-parseFloat(getComputedStyle(top).paddingRight)-6;
// 실행 중 변경될 수 있는 지역 변수를 선언합니다.
 let used=0,onBottom=false;
// 배열/목록의 각 요소를 순서대로 방문하여 DOM을 생성하거나 상태를 갱신합니다.
 books.forEach(book=>{
// HTML 파일에 없는 요소를 JavaScript에서 새로 생성합니다.
  const el=document.createElement('button');el.type='button';el.className='book'+(book.id===selectedId?' selected':'');el.textContent=book.title;
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
  el.title=`${book.title} — ${book.author} (${book.genre||'미분류'}, ${book.pages}p) · 드래그해서 순서 변경`;
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
  el.draggable=true;
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
  el.dataset.bookId=book.id;
// 책을 잡아 끌기 시작할 때 실행할 이벤트 처리 함수를 등록합니다.
  el.addEventListener('dragstart',e=>{draggedBookId=book.id;selectedId=book.id;el.classList.add('dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',String(book.id));});
// 책을 놓고 드래그가 끝날 때 실행할 이벤트 처리 함수를 등록합니다.
  el.addEventListener('dragend',()=>{draggedBookId=null;document.querySelectorAll('.book').forEach(node=>node.classList.remove('dragging','drop-before','drop-after'));renderShelf();});
// 다른 책 위로 끌고 갈 때 실행할 이벤트 처리 함수를 등록합니다.
  el.addEventListener('dragover',e=>{if(!draggedBookId||draggedBookId===book.id)return;e.preventDefault();e.dataTransfer.dropEffect='move';document.querySelectorAll('.book').forEach(node=>node.classList.remove('drop-before','drop-after'));const after=e.clientX>el.getBoundingClientRect().left+el.offsetWidth/2;el.classList.add(after?'drop-after':'drop-before');});
// 다른 책 위에 놓을 때 실행할 이벤트 처리 함수를 등록합니다.
  el.addEventListener('drop',e=>{e.preventDefault();e.stopPropagation();if(!draggedBookId||draggedBookId===book.id)return;const after=e.clientX>el.getBoundingClientRect().left+el.offsetWidth/2;moveBook(draggedBookId,book.id,after);});
// 페이지 수에 따라 책등 너비를 계산합니다. 100페이지 구간마다 8px 증가하고 최대 80px로 제한합니다.
  const width=bookWidth(book.pages);el.style.width=`${width}px`;el.style.height=`${105+(Number(book.heightSeed)||0)%55}px`;el.style.backgroundColor=colorForGenre(book.genre||'미분류');
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
  el.addEventListener('click',()=>{if(selectedId===book.id)openDetail(book.id);else{selectedId=book.id;renderShelf();}});
// 데이터가 없거나 입력값이 잘못된 경우를 걸러 오류와 잘못된 저장을 방지합니다.
  const needed=width+(used>0?5:0);if(!onBottom&&used+needed>topCapacity)onBottom=true;
// 생성한 HTML 요소를 부모 요소의 자식으로 화면에 붙입니다.
  (onBottom?bottom:top).appendChild(el);if(!onBottom)used+=needed;
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
 });
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function moveBook(sourceId,targetId,after=false){
// 고유 ID와 일치하는 책이 배열의 몇 번째에 있는지 찾습니다.
 const from=books.findIndex(b=>String(b.id)===String(sourceId));
// 데이터가 없거나 입력값이 잘못된 경우를 걸러 오류와 잘못된 저장을 방지합니다.
 if(from<0)return;
// 배열에서 항목을 빼거나 특정 위치에 삽입합니다. 순서 변경/기록 삭제에 사용합니다.
 const [moved]=books.splice(from,1);
// 고유 ID와 일치하는 책이 배열의 몇 번째에 있는지 찾습니다.
 const to=books.findIndex(b=>String(b.id)===String(targetId));
// 배열에서 항목을 빼거나 특정 위치에 삽입합니다. 순서 변경/기록 삭제에 사용합니다.
 if(to<0){books.splice(from,0,moved);return;}
// 배열에서 항목을 빼거나 특정 위치에 삽입합니다. 순서 변경/기록 삭제에 사용합니다.
 books.splice(to+(after?1:0),0,moved);
// 변경된 책 데이터와 색상을 기준으로 책장 화면을 다시 그립니다.
 saveBooks();renderShelf();
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
