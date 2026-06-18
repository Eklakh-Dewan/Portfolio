/* =================================================================
   EKLAKH DEWAN — PORTFOLIO INTERACTIONS
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Animated skill bars ---------- */
  const bars = document.querySelectorAll('.bar-fill');
  if (bars.length) {
    const barIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const pct = el.getAttribute('data-pct') || '0';
          requestAnimationFrame(() => { el.style.width = pct + '%'; });
          barIo.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => barIo.observe(b));
  }

  /* ---------- Hero inference trace typing effect ---------- */
  const traceBody = document.getElementById('traceBody');
  if (traceBody) {
    const lines = [
      { k: 'role',        v: 'AI Engineer & Data Science Undergraduate' },
      { k: 'specialization', v: 'NLP, Agentic LLM Workflows, Explainable ML' },
      { k: 'current_status', v: 'Open to internships & collaborations', bool: true },
      { k: 'stack',       v: 'Python · FastAPI · PyTorch · LangChain' },
      { k: 'confidence',  v: '0.97', num: true },
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let html = '';

    function typeNext() {
      if (lineIndex >= lines.length) {
        traceBody.innerHTML = html + '<span class="trace-line">// trace complete</span><span class="t-cursor"></span>';
        return;
      }
      const line = lines[lineIndex];
      const prefix = `<span class="trace-key">"${line.k}"</span>: `;
      const fullValue = line.bool || line.num ? line.v : `"${line.v}"`;

      if (charIndex === 0) {
        html += prefix;
      }

      if (charIndex < fullValue.length) {
        charIndex++;
        const typedSoFar = fullValue.substring(0, charIndex);
        const valueClass = line.bool ? 'trace-bool' : (line.num ? 'trace-bool' : 'trace-str');
        traceBody.innerHTML = html + `<span class="${valueClass}">${typedSoFar}</span><span class="t-cursor"></span>`;
        setTimeout(typeNext, 18 + Math.random() * 22);
      } else {
        const valueClass = line.bool || line.num ? 'trace-bool' : 'trace-str';
        html += `<span class="${valueClass}">${fullValue}</span>${lineIndex < lines.length - 1 ? ',' : ''}<br>`;
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNext, 280);
      }
    }

    traceBody.innerHTML = '<span class="t-cursor"></span>';
    setTimeout(typeNext, 500);
  }

});
