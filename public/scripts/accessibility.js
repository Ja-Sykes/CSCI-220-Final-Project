// Elements to resize
const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, input, label, button');
const body = document.querySelector('body');

// Store original inline font sizes
const originalSizes = [];
elements.forEach(el => originalSizes.push(el.style.fontSize));

// -------------------
// Restore settings on load
// -------------------
window.addEventListener('load', () => {
    // Restore font sizes
    const savedSizes = JSON.parse(localStorage.getItem('fontSizes'));
    if (savedSizes) {
        elements.forEach((el, i) => {
            el.style.fontSize = savedSizes[i];
        });
    }

    // Restore theme colors
    const bg = localStorage.getItem('themeBackground');
    const color = localStorage.getItem('themeColor');
    if (bg && color) {
        body.style.backgroundColor = bg;
        body.style.color = color;
    }
});

// -------------------
// Font buttons
// -------------------
document.querySelector('#txt-increase')?.addEventListener('click', () => {
    elements.forEach(el => {
        let size = parseFloat(window.getComputedStyle(el).fontSize);
        el.style.fontSize = (size + 1) + 'px';
    });
});

document.querySelector('#txt-decrease')?.addEventListener('click', () => {
    elements.forEach(el => {
        let size = parseFloat(window.getComputedStyle(el).fontSize);
        el.style.fontSize = (size - 1) + 'px';
    });
});

document.querySelector('#txt-orig')?.addEventListener('click', () => {
    elements.forEach((el, i) => {
        el.style.fontSize = originalSizes[i];
    });
});

document.querySelector('#fontSave')?.addEventListener('click', () => {
    const currentSizes = [];
    elements.forEach(el => currentSizes.push(el.style.fontSize));
    localStorage.setItem('fontSizes', JSON.stringify(currentSizes));
    alert("Font size settings saved!");
});

// -------------------
// Theme buttons
// -------------------
document.querySelector('#dark')?.addEventListener('click', () => {
    body.style.backgroundColor = '#121212';
    body.style.color = '#E0E0E0';
});

document.querySelector('#light')?.addEventListener('click', () => {
    body.style.backgroundColor = '#FFFFFF';
    body.style.color = '#000000';
});

document.querySelector('#og')?.addEventListener('click', () => {
    body.style.backgroundColor = '#002066';
    body.style.color = '#FFFFFF';
});

document.querySelector('#themeSave')?.addEventListener('click', () => {
    // Always save hex values manually to avoid RGB issues
    const bg = body.style.backgroundColor || '#002066';
    const color = body.style.color || '#FFFFFF';
    localStorage.setItem('themeBackground', bg);
    localStorage.setItem('themeColor', color);
    alert("Theme settings saved!");
});
