/* ViralSpark AI - Pricing Plans */
(() => {
  'use strict';

  window.ViralSparkSections.register({
    id: 'plans',
    title: 'Plans',
    render() {
      return `
        <div class="eyebrow">SIMPLE & FLEXIBLE PRICING</div>
        <h1 class="page-title">
          Choose your <span class="gradient-text">plan.</span>
        </h1>
        <p class="page-desc">
          Find the right creative tools for your journey.
        </p>

        <div class="quick-grid">

          <div class="tool-card">
            <h3>Free</h3>
            <h2>₹0</h2>
            <p>3 free generations</p>
            <p>Explore creator tools</p>
          </div>

          <div class="tool-card">
            <h3>Starter</h3>
            <h2>₹199</h2>
            <p>Starter plan features</p>
            <p>For growing creators</p>
          </div>

          <div class="tool-card">
            <h3>Pro</h3>
            <h2>₹499</h2>
            <p>Pro plan features</p>
            <p>For active creators</p>
          </div>

          <div class="tool-card">
            <h3>Premium</h3>
            <h2>₹1,699</h2>
            <p>Premium plan features</p>
            <p>For advanced creators</p>
          </div>

        </div>
      `;
    }
  });
})();
