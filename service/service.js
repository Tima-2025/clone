// file: app.js

// Lightweight client-side validation and submit handler
(function () {
  const form = document.getElementById('serviceForm');
  const requiredSelects = ['userKind', 'organPart'];

  function setError(id, message = '') {
    const p = document.querySelector(`.error[data-for="${id}"]`);
    if (p) p.textContent = message;
  }

  function validateSelect(id) {
    const el = document.getElementById(id);
    const valid = el && el.value.trim() !== '';
    setError(id, valid ? '' : 'Please make a selection');
    return valid;
  }

  requiredSelects.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('change', () => validateSelect(id));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ok = requiredSelects.map(validateSelect).every(Boolean);
    if (!ok) return;

    // Collect values
    const data = Object.fromEntries(new FormData(form).entries());

    // Demo: show as JSON, replace with real request as needed
    alert('Submitted:\n' + JSON.stringify(data, null, 2));

  });
})();
