// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Hero terminal typing effect ----
const terminalBody = document.getElementById('terminalBody');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lines = [
  { prompt: '$ whoami', out: 'Barath Jai' },
  { prompt: '$ role', out: 'Aspiring Java Backend Developer' },
  { prompt: '$ focus', out: 'Java · Spring Boot · PostgreSQL' },
  { prompt: '$ status', out: 'Learning · Building · Shipping' },
];

function renderStatic() {
  terminalBody.innerHTML = lines
    .map(l => `<span class="line"><span class="prompt">${l.prompt}</span></span><span class="line out">${l.out}</span>`)
    .join('');
}

function typeLine(el, text, speed, done) {
  let i = 0;
  const timer = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      if (done) done();
    }
  }, speed);
}

function runTypingSequence() {
  terminalBody.innerHTML = '';
  let idx = 0;

  function next() {
    if (idx >= lines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      terminalBody.appendChild(cursor);
      return;
    }
    const { prompt, out } = lines[idx];

    const promptLine = document.createElement('span');
    promptLine.className = 'line prompt';
    terminalBody.appendChild(promptLine);

    typeLine(promptLine, prompt, 28, () => {
      const outLine = document.createElement('span');
      outLine.className = 'line out';
      terminalBody.appendChild(outLine);
      typeLine(outLine, out, 18, () => {
        idx++;
        setTimeout(next, 220);
      });
    });
  }
  next();
}

if (terminalBody) {
  if (reduceMotion) {
    renderStatic();
  } else {
    runTypingSequence();
  }
}
