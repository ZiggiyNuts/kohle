// script.js
let currentSection = 0;
const sections = document.querySelectorAll('.section');
const totalSections = sections.length;
let isScrolling = false;

// Add touch support
let touchStartY = 0;
let touchEndY = 0;

function scrollToSection(sectionIndex) {
  if (isScrolling) return;  // Verhindert das Scrollen während einer Animation
  isScrolling = true;

  // Alle Abschnitte unsichtbar machen und nur den aktuellen Abschnitt anzeigen
  sections.forEach((section, index) => {
    if (index === sectionIndex) {
      section.style.transform = `translateY(0)`;  // Zeigt den aktuellen Abschnitt an
    } else if (index < sectionIndex) {
      section.style.transform = `translateY(-100vh)`;  // Vorherige Abschnitte nach oben schieben
    } else {
      section.style.transform = `translateY(100vh)`;  // Nächste Abschnitte nach unten schieben
    }
  });

  setTimeout(() => {
    isScrolling = false;
  }, 800);  // Anpassung auf die Dauer der Animation
}

window.addEventListener('wheel', function (event) {
  if (isScrolling) return;

  if (event.deltaY > 0) {
    if (currentSection < totalSections - 1) {
      currentSection++;
    }
  } else {
    if (currentSection > 0) {
      currentSection--;
    }
  }
  scrollToSection(currentSection);
});

// Initialisierung: Stellen Sie sicher, dass der erste Abschnitt sichtbar ist
scrollToSection(currentSection);

document.addEventListener('touchstart', function(event) {
  touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
  if (isScrolling) return;
  
  touchEndY = event.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  // Minimum swipe distance threshold
  if (Math.abs(deltaY) > 50) {
    if (deltaY > 0) {
      // Swipe up
      if (currentSection < totalSections - 1) {
        currentSection++;
      }
    } else {
      // Swipe down
      if (currentSection > 0) {
        currentSection--;
      }
    }
    scrollToSection(currentSection);
  }
});

// Prevent default touch behavior to avoid bouncing on iOS
document.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });
