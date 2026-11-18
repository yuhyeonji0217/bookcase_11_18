/**
 * config.js
 * 공통 설정: 저장 키, 이전 버전 데이터 이전, 장르/테마 목록, 공유 상태와 보조 함수. 다른 모든 JS보다 먼저 실행해야 합니다.
 * 주석은 기능 단위뿐 아니라 각 실행문의 목적까지 설명합니다.
 */

// localStorage에 저장할 때 사용하는 고유한 키 이름입니다.
const STORAGE_KEY = 'whos-bookcase-v1';
// localStorage에 저장할 때 사용하는 고유한 키 이름입니다.
const OWNER_KEY = 'whos-bookcase-owner-v1';
// localStorage에 저장할 때 사용하는 고유한 키 이름입니다.
const GENRE_KEY = 'whos-bookcase-genres-v1';
// localStorage에 저장할 때 사용하는 고유한 키 이름입니다.
const THEME_KEY = 'whos-bookcase-theme-v1';
// 이 구간에서 사용할 지역 변수를 선언하여 계산값 또는 DOM 요소를 보관합니다.
const $ = id => document.getElementById(id);
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
// Preserve data saved by earlier Who's Bookshelf versions.
// 구버전 Bookshelf 저장 키와 새 Bookcase 저장 키를 대응시켜 이전 데이터도 사용할 수 있게 합니다.
const previousKeys = {
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
  [STORAGE_KEY]:'whos-bookshelf-v1', [OWNER_KEY]:'whos-bookshelf-owner-v1',
// 이 구문은 위에서 설명한 기능에 필요한 값·속성·실행 순서를 설정합니다.
  [GENRE_KEY]:'whos-bookshelf-genres-v1', [THEME_KEY]:'whos-bookshelf-theme-v1'
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
};
// 구버전 Bookshelf 저장 키와 새 Bookcase 저장 키를 대응시켜 이전 데이터도 사용할 수 있게 합니다.
for (const [key, oldKey] of Object.entries(previousKeys)) {
// 브라우저에 이미 저장된 문자열 값을 읽습니다. 값이 없으면 null을 반환합니다.
  if (localStorage.getItem(key) === null && localStorage.getItem(oldKey) !== null) {
// 브라우저에 이미 저장된 문자열 값을 읽습니다. 값이 없으면 null을 반환합니다.
    localStorage.setItem(key, localStorage.getItem(oldKey));
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
  }
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
}
// 새 사용자에게 기본 제공할 장르 이름과 색상 코드입니다.
const defaultGenres = {'Uncategorized':'#c4b9aa','Fiction':'#b4c7b1','Essay':'#d8b3a6','Humanities':'#a9c4d4','Self-help':'#e9ce8c','Science':'#c9b9d9'};
// 테마 ID별 배경·글자·책장·버튼 색상 팔레트를 선언합니다. 순서가 테마 선택창의 표시 순서입니다.
const themes = {
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  white: {name:'White',page:'#ffffff',text:'#171717',muted:'#666666',frame:'#a8a8a8',wood:'#ededed',inside:'#fafafa',shadow:'#d2d2d2',panel:'#ffffff',border:'#d7d7d7',button:'#ffffff',hover:'#f0f0f0',accent:'#707070'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  gray: {name:'Gray',page:'#414348',text:'#f0f0f0',muted:'#c0c1c5',frame:'#777a80',wood:'#55585e',inside:'#36383d',shadow:'#25262a',panel:'#4b4e54',border:'#777a80',button:'#585b61',hover:'#696c73',accent:'#c6c8cd'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  black: {name:'Black',page:'#101113',text:'#f3f4f6',muted:'#a7aab0',frame:'#666a70',wood:'#292c30',inside:'#191b1e',shadow:'#08090a',panel:'#1d2024',border:'#51565c',button:'#2a2e33',hover:'#3c4249',accent:'#c6cbd2'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  warm: {name:'Ivory',page:'#faf8f4',text:'#26231f',muted:'#77716a',frame:'#6d4d36',wood:'#ead8bd',inside:'#f8f1e7',shadow:'#d7c4a9',panel:'#ffffff',border:'#e1d5c8',button:'#ffffff',hover:'#f0e5d7',accent:'#8caa91'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  sage: {name:'Green',page:'#edf2ec',text:'#283c31',muted:'#61756a',frame:'#506c58',wood:'#b9cdb8',inside:'#e3ece0',shadow:'#b2c3b2',panel:'#f8fbf6',border:'#c5d7c7',button:'#f8fbf6',hover:'#dce8da',accent:'#6b9878'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  peach: {name:'Peach',page:'#fff1ea',text:'#533a37',muted:'#8c6963',frame:'#a66b5d',wood:'#e9bca8',inside:'#fff3e9',shadow:'#dfb5a5',panel:'#fffaf7',border:'#e9c7bb',button:'#fffaf7',hover:'#ffe1d4',accent:'#d88872'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  blue: {name:'Blue',page:'#151e2e',text:'#eaf0f7',muted:'#b4c1d2',frame:'#8faac5',wood:'#3a506a',inside:'#26364b',shadow:'#101827',panel:'#202c3e',border:'#5a718c',button:'#2d4058',hover:'#3a5370',accent:'#94c5dd'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  sky: {name:'Sky Blue',page:'#f7fcff',text:'#38566a',muted:'#7791a1',frame:'#b5d3e4',wood:'#e3f3fc',inside:'#fbfeff',shadow:'#d8eaf4',panel:'#ffffff',border:'#e1eff7',button:'#ffffff',hover:'#edf8ff',accent:'#90c7e7'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  darkgreen: {name:'Dark Green',page:'#14251e',text:'#eef4ed',muted:'#b3c6b9',frame:'#52705d',wood:'#294a38',inside:'#1b3327',shadow:'#0b1710',panel:'#203b2c',border:'#496a54',button:'#30513e',hover:'#41674e',accent:'#94c8a2'},
// 이 테마의 표시 이름과 CSS 변수에 대응되는 색상 코드를 정의합니다.
  lavender: {name:'Lavender',page:'#f4f0fa',text:'#413650',muted:'#796c89',frame:'#79658e',wood:'#c9b7db',inside:'#ede5f4',shadow:'#c7b8d3',panel:'#fdfaff',border:'#d9cde6',button:'#fdfaff',hover:'#e7dbf2',accent:'#a58abd'}
// 앞에서 시작한 함수/조건문/반복문/이벤트 처리 구간을 닫습니다.
};
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function readJSON(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return value && typeof value === 'object' ? value : fallback; } catch { return fallback; } }
// 책 한 권을 객체로 저장하는 배열을 로드합니다.
let books = readJSON(STORAGE_KEY, []);
// 데이터가 없거나 입력값이 잘못된 경우를 걸러 오류와 잘못된 저장을 방지합니다.
if (!Array.isArray(books)) books = [];
// 새 사용자에게 기본 제공할 장르 이름과 색상 코드입니다.
let genres = {...defaultGenres, ...readJSON(GENRE_KEY, {})};
// 마지막으로 선택한 테마를 복원하며 저장된 값이 없으면 Ivory를 사용합니다.
let themeSetting = readJSON(THEME_KEY, {id:'warm'});
// 선택한 책, 상세 페이지의 책, 현재 메모 종류 등을 기억하는 공유 상태입니다.
let selectedId = null, currentId = null, noteType = 'comments';
// 수정 중인 메모의 배열 위치입니다. null이면 새 항목을 추가하는 상태입니다.
let editingNoteIndex = null;
// 드래그 중인 책의 고유 ID를 기억합니다.
let draggedBookId = null;
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function saveBooks(){localStorage.setItem(STORAGE_KEY,JSON.stringify(books));}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function saveGenres(){localStorage.setItem(GENRE_KEY,JSON.stringify(genres));}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function currentBook(){return books.find(b=>b.id===currentId);}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function bookWidth(pages){return Math.min(80,24+Math.floor((Number(pages)-1)/100)*8);}
// 이름 있는 함수를 정의합니다. 이 함수는 필요할 때 다른 이벤트 처리 함수에서 호출됩니다.
function colorForGenre(name){return genres[name] || genres['Uncategorized'] || genres['미분류'] || '#c4b9aa';}
