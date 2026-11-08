/* ViralSpark AI - Independent Section Manager */
(() => {
  'use strict';

  const sections = [];

  function register(section) {
    if (!section || typeof section.render !== 'function') {
      console.error('Invalid section registration');
      return;
    }

    sections.push(section);
  }

  function getAll() {
    return [...sections];
  }

  window.ViralSparkSections = {
    register,
    getAll
  };
})();
