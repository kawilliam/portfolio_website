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
  { text: "  Network Adapter : github.com/KyleWilliamson [CONNECTED]", delay: 150 },
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

const SPLASH = `
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
  { text: "Type HELP to see available commands.", delay: 200, class: "dim" },
  { text: "", delay: 100 },
];

// === BOOT RUNNER ===
function runBoot() {
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
      bootScreen.style.display = "none";
      const shell = document.getElementById("shell");
      shell.classList.remove("hidden");
      document.getElementById("cmd-input").focus();
    }, splashDelay + 800);

  }, totalDelay);
}

// === RECRUITER MODE: add ?recruiter to URL to skip boot ===
function isRecruiterMode() {
  return window.location.search.includes("recruiter");
}

window.addEventListener("DOMContentLoaded", () => {
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
});
