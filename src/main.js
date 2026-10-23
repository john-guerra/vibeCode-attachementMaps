import './index.css';
import { scoreResponses, formatScore, classifyRegion } from './domain/ecr-rs.js';

console.log("Attachment Map app initializing...");

const app = document.getElementById('app');
if (app) {
  // Demonstration calculation of test vector 4
  const testScore = scoreResponses([6, 5, 6, 5, 2, 3, 5, 4, 6]);
  const classification = classifyRegion(testScore.avoidance, testScore.anxiety);

  app.innerHTML = `
    <header class="app-header glass" style="padding: 1.5rem 2rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-subtle);">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 1.5rem; margin-bottom: 0.25rem;">Attachment Map</h1>
          <p style="color: var(--text-secondary); font-size: 0.875rem;">Relationship-Specific Anxiety × Avoidance Explorer (ECR-RS)</p>
        </div>
        <div>
          <button id="themeToggle" style="padding: 0.5rem 1rem; border-radius: var(--radius-md); background: var(--bg-subtle); color: var(--text-primary); font-weight: 500; font-size: 0.875rem; border: 1px solid var(--border-subtle);">
            Toggle Dark Mode
          </button>
        </div>
      </div>
    </header>

    <main style="max-width: 1200px; margin: 0 auto; padding: 0 1.5rem 3rem;">
      <div class="glass" style="padding: 2rem; border-radius: var(--radius-lg); margin-bottom: 2rem;">
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem;">Project Environment Ready</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          Scrum backlog populated on GitHub with 17 structured issues across 5 sprint milestones.
        </p>
        <div style="padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-family: monospace; font-size: 0.875rem;">
          Verified Test Vector 4 Calculation: Avoidance = ${formatScore(testScore.avoidance)}, Anxiety = ${formatScore(testScore.anxiety)} (${classification.description})
        </div>
      </div>
    </main>

    <footer style="margin-top: auto; padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.8125rem; border-top: 1px solid var(--border-subtle);">
      For self-reflection and education. Not a diagnosis or clinical assessment. Instrument: ECR-RS (Fraley et al., 2011).
    </footer>
  `;

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      document.body.classList.toggle('theme-light');
    });
  }
}
