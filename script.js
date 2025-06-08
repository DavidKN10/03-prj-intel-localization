// Detect language direction and apply RTL if needed

// This function checks the document's language and sets RTL if needed
function updateTextDirection() {
  // Get the current language from the <html> tag
  var lang = document.documentElement.lang || navigator.language || '';
  // List of RTL language codes (common ones)
  var rtlLangs = ['ar', 'he', 'fa', 'ur'];
  // Check if the language is RTL
  var isRTL = rtlLangs.some(function(code) {
    return lang.toLowerCase().startsWith(code);
  });

  // Use Bootstrap's rtl class if needed
  if (isRTL) {
    document.body.classList.add('rtl');
    document.body.setAttribute('dir', 'rtl');
    // Make sure all material-icons stay LTR
    var icons = document.querySelectorAll('.material-icons');
    icons.forEach(function(icon) {
      icon.setAttribute('dir', 'ltr');
    });
  } else {
    document.body.classList.remove('rtl');
    document.body.setAttribute('dir', 'ltr');
    // Remove dir attribute from icons if present
    var icons = document.querySelectorAll('.material-icons');
    icons.forEach(function(icon) {
      icon.removeAttribute('dir');
    });
  }
}

// Run on page load
updateTextDirection();

// Also observe for changes to the <html> lang attribute (e.g. by Google Translate)
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.attributeName === 'lang') {
      updateTextDirection();
    }
  });
});
observer.observe(document.documentElement, { attributes: true });

// Optionally, check every few seconds in case Google Translate changes text flow without updating lang
setInterval(updateTextDirection, 2000);

//
// To enable Bootstrap RTL support, you need to include Bootstrap's RTL CSS in your project.
// If you have it, the .rtl class on <body> will switch the layout.
//
console.log("hello");