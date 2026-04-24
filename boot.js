// === SOUND ENGINE ===
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playClick() {
  if (!state.soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(820, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.04);
  } catch (e) {}
}

// === BOOT BEEP SEQUENCE ===
function playBootSound() {
  try {
    if (!audioCtx) audioCtx = new AudioContext();

    function beep(frequency, startTime, duration, volume = 0.3) {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(frequency, startTime);
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    }

    const t = audioCtx.currentTime;

    // Classic POST beep sequence
    beep(440, t, 0.08);
    beep(880, t + 0.1, 0.08);
    beep(660, t + 0.2, 0.08);
    beep(1320, t + 0.3, 0.15);

  } catch (e) {}
}

// === AMBIENT DISK HUM ===
function startAmbientDisk() {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    const t = audioCtx.currentTime;

    // Base disk hum
    const spinOsc = audioCtx.createOscillator();
    const spinGain = audioCtx.createGain();
    spinOsc.connect(spinGain);
    spinGain.connect(audioCtx.destination);
    spinOsc.type = "triangle";
    spinOsc.frequency.setValueAtTime(75, t);
    spinGain.gain.setValueAtTime(0.0001, t);
    spinGain.gain.linearRampToValueAtTime(0.04, t + 1.5);
    spinOsc.start(t);

    // Flutter layer
    const flutterOsc = audioCtx.createOscillator();
    const flutterGain = audioCtx.createGain();
    flutterOsc.connect(flutterGain);
    flutterGain.connect(audioCtx.destination);
    flutterOsc.type = "sine";
    flutterOsc.frequency.setValueAtTime(160, t);
    flutterGain.gain.setValueAtTime(0.0001, t);
    flutterGain.gain.linearRampToValueAtTime(0.050, t + 1.5);
    flutterOsc.start(t);

    // Subtle pitch variation to simulate seeking
    function seekLoop() {
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const freq = 110 + Math.random() * 40;
      spinOsc.frequency.linearRampToValueAtTime(freq, now + 2.0);
      flutterOsc.frequency.linearRampToValueAtTime(freq + 60, now + 2.0);
      setTimeout(seekLoop, 2000 + Math.random() * 1500);
    }
    seekLoop();

    // Store refs so sound on/off can control it
    window._diskOsc = spinOsc;
    window._diskGain = spinGain;
    window._flutterOsc = flutterOsc;
    window._flutterGain = flutterGain;

  } catch (e) {}
}

// === BOOT CONFIGURATION ===
const BOOT_LINES = [
  { text: "KYLE CORP BIOS v6.22", delay: 0, class: "bright" },
  { text: "Copyright (C) 1994-2025 Kyle Corp Systems Inc.", delay: 80 },
  { text: "Serial No: KW-SWE-4315-YRK", delay: 80 },
  { text: "", delay: 120 },
  { text: "CPU: Kyle A. Williamson @ 4.0GHz (Overclocked)", delay: 80 },
  { text: "Checking system memory...", delay: 200 },
  { text: "640K OK", delay: 600, class: "success" },
  { text: "", delay: 100 },
  { text: "Detecting hardware...", delay: 200 },
  { text: "  Primary Drive   : C:\\KYLE\\PORTFOLIO", delay: 150 },
  { text: "  Co-Processor    : Formal Methods Engine (TLA+)", delay: 150 },
  { text: "  Network Adapter : github.com/kawilliam [CONNECTED]", delay: 150 },
  { text: "  Sound Blaster   : ENABLED", delay: 150 },
  { text: "", delay: 100 },
  { text: "Checking system invariants...", delay: 300 },
  { text: "  [■■■■■■■■■■] Invariant check passed. No violations found.", delay: 800, class: "success" },
  { text: "", delay: 100 },
  { text: "Loading AUTOEXEC.BAT...", delay: 300 },
  { text: "", delay: 200 },
  { text: "  SET NAME=Kyle A. Williamson", delay: 100 },
  { text: "  SET TITLE=Software Engineer", delay: 100 },
  { text: "  SET SCHOOL=York University, Lassonde School of Engineering", delay: 100 },
  { text: "  SET TAGLINE=Engineer. Thinker. Problem Solver.", delay: 100 },
  { text: "  SET STATUS=Seeking Co-op 2025", delay: 100 },
  { text: "", delay: 200 },
  { text: "Starting KYLE.EXE...", delay: 400 },
  { text: "", delay: 600 },
];

const SPLASH = `\
 ██╗  ██╗██╗   ██╗██╗     ███████╗
 ██║ ██╔╝╚██╗ ██╔╝██║     ██╔════╝
 █████╔╝  ╚████╔╝ ██║     █████╗  
 ██╔═██╗   ╚██╔╝  ██║     ██╔══╝  
 ██║  ██╗   ██║   ███████╗███████╗
 ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝

 Kyle A. Williamson — Portfolio v1.0
 Engineer. Thinker. Problem Solver.
`;

const POST_SPLASH = [
  { text: "", delay: 0 },
  { text: "Welcome. This is an interactive portfolio.", delay: 200 },
  { text: "Type commands below to explore.", delay: 400 },
  { text: "Not sure where to start? Try typing: ABOUT", delay: 600, class: "dim" },
  { text: "", delay: 700 },
];

// === BOOT RUNNER ===
function runBoot() {
  playBootSound();
  const bootScreen = document.getElementById("boot-screen");
  let totalDelay = 0;

  // Render each BIOS line with cumulative delay
  BOOT_LINES.forEach((line) => {
    totalDelay += line.delay;
    setTimeout(() => {
      const el = document.createElement("div");
      el.textContent = line.text;
      if (line.class) el.classList.add(line.class);
      bootScreen.appendChild(el);
    }, totalDelay);
  });

  // Show ASCII splash after BIOS lines
  totalDelay += 300;
  setTimeout(() => {
    bootScreen.innerHTML = ""; // Clear BIOS, show splash
    const splashEl = document.createElement("pre");
    splashEl.textContent = SPLASH;
    splashEl.classList.add("bright");
    splashEl.style.fontFamily = "'Share Tech Mono', monospace";
    splashEl.style.lineHeight = "1.2";
    splashEl.style.letterSpacing = "0";
    bootScreen.appendChild(splashEl);

    // Render post-splash lines
    let splashDelay = 0;
    POST_SPLASH.forEach((line) => {
      splashDelay += line.delay;
      setTimeout(() => {
        const el = document.createElement("div");
        el.textContent = line.text;
        if (line.class) el.classList.add(line.class);
        bootScreen.appendChild(el);
      }, splashDelay);
    });

    // Hand off to shell after splash
    setTimeout(() => {
      const shell = document.getElementById("shell");
      shell.classList.remove("hidden");
      document.getElementById("cmd-input").focus();
      cmdHelp();
      setTimeout(() => autoType("about"), 1000);
    }, splashDelay + 800);

  }, totalDelay);
}

// === RECRUITER MODE: add ?recruiter to URL to skip boot ===
function isRecruiterMode() {
  return window.location.search.includes("recruiter");
}

document.addEventListener("click", function bootOnClick() {
  document.removeEventListener("click", bootOnClick);
  const msg = document.getElementById("click-to-start");
  if (msg) msg.remove();
  if (isRecruiterMode()) {
    document.getElementById("boot-screen").style.display = "none";
    const shell = document.getElementById("shell");
    shell.classList.remove("hidden");
    document.getElementById("cmd-input").focus();
    print(`<span class="bright">RECRUITER MODE — Boot sequence skipped.</span>`);
    printBlank();
    cmdQuickview();
    printBlank();
    print(`Type <span class="bright">HELP</span> to see all commands.`);
  } else {
    runBoot();
  }
  startAmbientDisk();
});

setTimeout(() => {
  const shell = document.getElementById("shell");
  shell.classList.remove("hidden");
  document.getElementById("cmd-input").focus();
  cmdHelp();
  setTimeout(() => autoType("about"), 1000);
  startDemoCountdown(); // ADD THIS
}, splashDelay + 800);