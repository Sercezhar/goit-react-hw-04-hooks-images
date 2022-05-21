export function applyDarkTheme(themeChecker) {
  // INPUT
  document
    .querySelector('input[type=text]')
    .style.setProperty('--text-color', themeChecker ? '#848383' : '#e5e5e5');

  // BODY
  document.body.style.setProperty(
    '--bg-color',
    themeChecker ? '#fff' : '#202124'
  );
  // SEARCH BAR
  document
    .querySelector('#search-bar')
    .style.setProperty('--theme-color', themeChecker ? '#00a7e1' : '#3e3e3e');
}
