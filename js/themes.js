/**
 * themes.js
 * 테마 선택 버튼을 만들고 CSS 변수를 교체해 화면 전체 색을 바꿉니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function applyTheme(){
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
 const theme=themes[themeSetting.id]||themes.warm;
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
 const vars={page:'--page',text:'--text',muted:'--muted',frame:'--shelf-frame',wood:'--shelf-wood',inside:'--shelf-inside',shadow:'--shadow',panel:'--panel',border:'--border',button:'--button',hover:'--button-hover',accent:'--accent'};
// CSS 스타일 속성을 JavaScript에서 동적으로 변경합니다.
 for(const [key,cssVar] of Object.entries(vars))document.documentElement.style.setProperty(cssVar,theme[key]);
// 배열/목록의 각 요소를 순서대로 방문하여 DOM을 생성하거나 상태를 갱신합니다.
 document.querySelectorAll('.theme-choice').forEach(el=>el.classList.toggle('active',el.dataset.theme===themeSetting.id));
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function renderThemeOptions(){const list=$('theme-options');list.replaceChildren();for(const [id,theme] of Object.entries(themes)){
// HTML 파일에 없는 요소를 JavaScript에서 새로 생성합니다.
 const button=document.createElement('button');button.type='button';button.className='theme-choice';button.dataset.theme=id;
// 배열/목록의 각 요소를 순서대로 방문하여 DOM을 생성하거나 상태를 갱신합니다.
 const swatches=document.createElement('span');swatches.className='swatches';[theme.page,theme.wood,theme.frame,theme.accent].forEach(c=>{const s=document.createElement('i');s.style.background=c;swatches.appendChild(s);});
// HTML 파일에 없는 요소를 JavaScript에서 새로 생성합니다.
 const label=document.createElement('span');label.textContent=theme.name;button.append(swatches,label);
// 변경한 값을 브라우저의 localStorage에 영구 보관합니다(사용자가 삭제하기 전까지).
 button.addEventListener('click',()=>{themeSetting={id};localStorage.setItem(THEME_KEY,JSON.stringify(themeSetting));applyTheme();});list.appendChild(button);
// 선택한 테마 팔레트를 화면 전체 CSS 변수에 적용합니다.
 }applyTheme();}
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('theme-settings').addEventListener('click',()=>{renderThemeOptions();$('theme-dialog').showModal();});
// 해당 요소를 클릭할 때 실행할 이벤트 처리 함수를 등록합니다.
$('close-theme').addEventListener('click',()=>$('theme-dialog').close());
