// === TERMINAL STATE ===
const state = {
  history: [],
  historyIndex: -1,
  soundEnabled: true,
  helpVisible: false,
};

// === HELPER: Print a line to output ===
function print(text = "", className = "") {
  const output = document.getElementById("output");
  const line = document.createElement("div");
  line.innerHTML = text;
  if (className) line.classList.add(className);
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

// === HELPER: Print a blank line ===
function printBlank() {
  print("");
}

// === HELPER: Clear the output ===
function clearOutput() {
  if (window._screensaverInterval) {
    clearInterval(window._screensaverInterval);
    window._screensaverInterval = null;
  }
  document.getElementById("output").innerHTML = "";
}

// === HELPER: Print a divider ===
function printDivider() {
  print("─".repeat(52), "dim");
}

// === CLICK ANYWHERE TO FOCUS INPUT ===
document.addEventListener("click", () => {
  document.getElementById("cmd-input").focus();
});

// === KEYBOARD: handle input submission + history ===
document.getElementById("cmd-input").addEventListener("keydown", (e) => {
  playClick();
  if (window._contactMode) return;
  if (e.key !== "Enter" && e.key !== "ArrowUp" && e.key !== "ArrowDown") {
    cancelDemo();
    clearAutoType();
  }
    document.addEventListener("click", () => {
    cancelDemo();
    document.getElementById("cmd-input").focus();
  });
  if (e.key === "Enter") {
    const input = document.getElementById("cmd-input");
    const raw = input.value.trim();
    const cmd = raw.toLowerCase();

    // Echo the command in output
    if (raw !== "") {
      state.history.unshift(raw);
      state.historyIndex = -1;
    }

    input.value = "";

    if (raw === "") return;

    // Clear then route to command handler
    clearOutput();
    print(`C:\\KYLE> ${raw}`, "dim");
    printBlank();
    handleCommand(cmd, raw);

    printBlank();
  }

  // Arrow UP — go back in history
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      document.getElementById("cmd-input").value =
        state.history[state.historyIndex];
    }
  }

  // Arrow DOWN — go forward in history
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (state.historyIndex > 0) {
      state.historyIndex--;
      document.getElementById("cmd-input").value =
        state.history[state.historyIndex];
    } else {
      state.historyIndex = -1;
      document.getElementById("cmd-input").value = "";
    }
  }

});

// === COMMAND ROUTER ===
function handleCommand(cmd, raw) {
  switch (cmd) {
    case "help":       cmdHelp();         break;
    case "about":      cmdAbout();        break;
    case "projects":   cmdProjects();     break;
    case "skills":     cmdSkills();       break;
    case "stack":      cmdStack();        break;
    case "resume":     cmdResume();       break;
    case "contact":    cmdContact();      break;
    case "status":     cmdStatus();       break;
    case "quickview":  cmdQuickview();    break;
    case "cls":        clearOutput();     break;
    case "sound on":   cmdSoundOn();      break;
    case "sound off":  cmdSoundOff();     break;
    case "share":      cmdShare();        break;

    // Easter eggs
    case "win":        eggWin();          break;
    case "doom":       eggDoom();         break;
    case "matrix":     eggMatrix();       break;
    case "hack":       eggHack();         break;
    case "hire me":    eggHireMe();       break;
    case "hire":       eggHireMe();       break;
    case "date":       eggDate();         break;
    case "screensaver": eggScreensaver(); break;

    // Open a project by name
    default:
      if (cmd.startsWith("open ")) {
        const name = raw.slice(5).toUpperCase().trim();
        cmdOpenProject(name);
      } else {
        print(
          `Bad command or file name: "${raw}"`,
          "error"
        );
        print(`Type <span class="bright">HELP</span> to see available commands.`);
      }
  }
}

// === TAB TITLE BLINK WHEN INACTIVE ===
let titleInterval = null;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    let blink = true;
    titleInterval = setInterval(() => {
      document.title = blink
        ? "[ KYLE.EXE RUNNING ]"
        : "Kyle A. Williamson";
      blink = !blink;
    }, 800);
  } else {
    clearInterval(titleInterval);
    document.title = "Kyle A. Williamson";
  }
});

function runCommand(cmd) {
  clearOutput();
  print(`C:\\KYLE> ${cmd}`, "dim");
  printBlank();
  handleCommand(cmd.toLowerCase(), cmd);
  printBlank();
  document.getElementById("cmd-input").focus();
}

// === AUTO TYPE SUGGESTION ===
let _autoTypeInterval = null;

function autoType(text, delayPerChar = 80) {
  const input = document.getElementById("cmd-input");
  input.value = "";
  let i = 0;
  _autoTypeInterval = setInterval(() => {
    if (i < text.length) {
      input.value += text[i];
      i++;
    } else {
      clearInterval(_autoTypeInterval);
    }
  }, delayPerChar);
}

function clearAutoType() {
  if (_autoTypeInterval) {
    clearInterval(_autoTypeInterval);
    _autoTypeInterval = null;
    document.getElementById("cmd-input").value = "";
  }
}

// === AUTO DEMO MODE ===
const DEMO_SEQUENCE = ["about", "projects", "skills", "status", "contact"];
let _demoTimeout = null;
let _demoRunning = false;
let _demoIndex = 0;

function startDemoCountdown() {
  _demoTimeout = setTimeout(runDemo, 15000);
}

function cancelDemo() {
  if (_demoTimeout) {
    clearTimeout(_demoTimeout);
    _demoTimeout = null;
  }
  if (_demoRunning) {
    _demoRunning = false;
    _demoIndex = 0;
    clearOutput();
    print(`<span class="dim">Demo stopped. You have control.</span>`);
    printBlank();
  }
}

function runDemo() {
  _demoRunning = true;
  if (_demoIndex >= DEMO_SEQUENCE.length) {
    _demoIndex = 0;
    _demoRunning = false;
    return;
  }

  const cmd = DEMO_SEQUENCE[_demoIndex];
  _demoIndex++;

  // Auto type the command
  autoType(cmd, 100);

  setTimeout(() => {
    runCommand(cmd);
    if (_demoRunning) {
      _demoTimeout = setTimeout(runDemo, 5000);
    }
  }, cmd.length * 100 + 500);
}