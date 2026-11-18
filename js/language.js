/* Language picker: changing language never changes stored book records. */
$('language-settings').addEventListener('click', () => $('language-dialog').showModal());
$('close-language').addEventListener('click', () => $('language-dialog').close());
document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => {
    currentLanguage = button.dataset.language;
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    applyLanguage();
    $('language-dialog').close();
  });
});
