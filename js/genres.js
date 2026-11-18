/**
 * genres.js
 * 장르 선택 목록과 장르별 책등 색상 설정 팝업을 관리합니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
// Rebuild actual dropdowns. Datalist suggestions alone do not guarantee a visible selection UI.
function renderGenreOptions() {
  for (const [selectId, customId] of [['book-genre','book-genre-custom'],['edit-genre','edit-genre-custom']]) {
    const select = $(selectId), custom = $(customId);
    if (!select || !custom) continue;
    const previous = select.value;
    select.replaceChildren();
    for (const name of Object.keys(genres)) {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = displayGenre(name);
      select.appendChild(option);
    }
    const other = document.createElement('option');
    other.value = '__custom__';
    other.textContent = t('newGenreOption');
    select.appendChild(other);
    if ([...select.options].some(option => option.value === previous)) select.value = previous;
    updateCustomGenre(selectId, customId);
  }
}
function updateCustomGenre(selectId, customId) {
  const select = $(selectId), custom = $(customId);
  const isCustom = select.value === '__custom__';
  custom.hidden = !isCustom;
  custom.required = isCustom;
  if (!isCustom) custom.value = '';
}
for (const [selectId, customId] of [['book-genre','book-genre-custom'],['edit-genre','edit-genre-custom']]) {
  $(selectId).addEventListener('change', () => updateCustomGenre(selectId, customId));
}
function selectedGenre(selectId, customId) {
  return $(selectId).value === '__custom__' ? $(customId).value.trim() : $(selectId).value;
}
function renderGenreSettings(){
// 기존 자식 요소를 비워 중복 표시를 방지한 뒤 최신 데이터로 다시 그립니다.
 const list=$('genre-list');list.replaceChildren();
// 배열/목록의 각 요소를 순서대로 방문하여 DOM을 생성하거나 상태를 갱신합니다.
 Object.entries(genres).forEach(([name,color])=>{
// HTML 파일에 없는 요소를 JavaScript에서 새로 생성합니다.
  const row=document.createElement('div');row.className='genre-row';
// HTML 파일에 없는 요소를 JavaScript에서 새로 생성합니다.
  const label=document.createElement('label');label.textContent=displayGenre(name);
// HTML 파일에 없는 요소를 JavaScript에서 새로 생성합니다.
  const picker=document.createElement('input');picker.type='color';picker.value=/^#[0-9a-f]{6}$/i.test(color)?color:'#c4b9aa';picker.setAttribute('aria-label',`${displayGenre(name)} ${t("colorSuffix")}`);
// 색상 입력값이 변할 때 실행할 이벤트 처리 함수를 등록합니다.
  picker.addEventListener('input',()=>{genres[name]=picker.value;saveGenres();renderShelf();});
// 생성한 HTML 요소를 부모 요소의 자식으로 화면에 붙입니다.
  row.append(label,picker);list.appendChild(row);
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
 });
// 책 추가/수정 폼의 장르 자동완성 목록을 갱신합니다.
 renderGenreOptions();
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('genre-settings').addEventListener('click',()=>{renderGenreSettings();$('genre-dialog').showModal();});
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('close-genre').addEventListener('click',()=>$('genre-dialog').close());
// 입력 폼의 저장 버튼을 누를 때 실행할 이벤트 처리 함수를 등록합니다.
$('add-genre-form').addEventListener('submit',e=>{e.preventDefault();const name=$('new-genre-name').value.trim();if(!name)return;if(Object.hasOwn(genres,name)){alert(t('genreExists'));return;}genres[name]=$('new-genre-color').value;saveGenres();renderGenreSettings();renderGenreOptions();e.currentTarget.reset();});
