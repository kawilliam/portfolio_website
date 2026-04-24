// =============================================
// HELP
// =============================================
function cmdHelp() {
  if (state.helpVisible) {
    // Turn off
    const helpPanel = document.getElementById("help-panel");
    if (helpPanel) helpPanel.remove();
    state.helpVisible = false;
    print(`  <span class="dim">Help panel hidden. Type HELP to show again.</span>`);
  } else {
    // Turn on
    state.helpVisible = true;
    const panel = document.createElement("div");
    panel.id = "help-panel";
    panel.innerHTML = `
  <div class="section-title">AVAILABLE COMMANDS <span class="dim" style="font-size:0.85em"> click any command to run it</span></div>
  <div id="help-grid">
    <div><span class="bright cmd-link" onclick="runCommand('about')">about</span> (Who I am)</div>
    <div><span class="bright cmd-link" onclick="runCommand('projects')">projects</span> (My work)</div>
    <div><span class="bright cmd-link" onclick="runCommand('skills')">skills</span> (Skill summary)</div>
    <div><span class="bright cmd-link" onclick="runCommand('stack')">stack</span> (Tools & languages)</div>
    <div><span class="bright cmd-link" onclick="runCommand('resume')">resume</span> (View & download)</div>
    <div><span class="bright cmd-link" onclick="runCommand('contact')">contact</span> (Send message)</div>
    <div><span class="bright cmd-link" onclick="runCommand('status')">status</span> (Availability)</div>
    <div><span class="bright cmd-link" onclick="runCommand('quickview')">quickview</span> (Quick summary)</div>
    <div><span class="bright cmd-link" onclick="runCommand('share')">share</span> (Copy link)</div>
    <div><span class="bright cmd-link" onclick="runCommand('sound on')">sound on/off</span> (Toggle)</div>
    <div><span class="bright cmd-link" onclick="runCommand('cls')">cls</span> (Clear screen)</div>
    <div><span class="bright cmd-link" onclick="runCommand('help')">help</span> (Toggle panel)</div>
  </div>
`;
    document.getElementById("boot-screen").after(panel);
    print(`  <span class="dim">Help panel shown. Type HELP to hide.</span>`);
  }
}

// =============================================
// ABOUT
// =============================================
function cmdAbout() {
  print(`<span class="bright">READING FILE: ABOUT.TXT</span>`);
  printDivider();
  print(`  NAME      : Kyle A. Williamson`);
  print(`  TITLE     : Engineering Student`);
  print(`  SCHOOL    : York University — Lassonde School of Engineering`);
  print(`  PROGRAM   : Software Engineering, Data Stream`);
  print(`  YEAR      : 4th Year | Expected Graduation: 2027`);
  print(`  FOCUS     : Embedded Firmware, Formal Methods, Software Dev`);
  print(`  WORK      : Security Professional @ North Shield Security Group`);
  printBlank();
  print(`  INTERESTS : Hardware, Math, Basketball, Physics`);
  printBlank();
  print(`  I build reliable systems — from low-level firmware to`);
  print(`  full-stack applications. I use formal verification methods`);
  print(`  to reason about correctness where it matters most.`);
  printDivider();
  print(`  <span class="dim">Last Modified: 04-23-2025</span>`);
}

// =============================================
// PROJECTS
// =============================================
const PROJECTS = {
  "JOBAGENT": {
    title: "Job Application Automation Agent",
    date: "03-15-2025",
    desc: [
      "Automated end-to-end job application pipeline using AI agents.",
      "Reduced manual application time by ~80% through intelligent",
      "resume tailoring, cover letter generation, and form submission.",
      "Built SRS and Technical Design Document through adversarial review.",
    ],
    tech: "Python, LLM APIs, Selenium, NLP",
    impact: "80% reduction in manual application time",
  },
  "SPECCHAIN": {
    title: "SpecChain NLP Pipeline",
    date: "02-10-2025",
    desc: [
      "NLP pipeline for automated persona generation and requirements",
      "engineering applied to a mental health application.",
      "Extracted structured specifications from unstructured user data.",
    ],
    tech: "Python, spaCy, HuggingFace, PySpark",
    impact: "Automated persona generation from raw user research data",
  },
  "REALESTATE": {
    title: "GTA Real Estate Hotspot Predictor",
    date: "11-20-2024",
    desc: [
      "Predicted real estate investment hotspots across the Greater",
      "Toronto Area using spatial autoregressive modeling and graph",
      "based network analysis methods.",
    ],
    tech: "Python, node2vec, PySpark, SAR Models",
    impact: "Identified high-growth zones with 87% spatial accuracy",
  },
  "ROOMSCHED": {
    title: "Conference Room Scheduler",
    date: "09-05-2024",
    desc: [
      "Full software design deliverable built for EECS 3311.",
      "Implemented using UML design patterns including Observer,",
      "Strategy, and Factory. Clean architecture throughout.",
    ],
    tech: "Java, UML, Design Patterns, Eiffel",
    impact: "Full design pattern coverage across all system components",
  },
};

function cmdProjects() {
  print(`<span class="bright">DIRECTORY OF C:\\KYLE\\PROJECTS</span>`);
  printDivider();
  print(`  <span class="dim">Volume in drive C is PORTFOLIO</span>`);
  printBlank();

  Object.entries(PROJECTS).forEach(([key, p]) => {
    print(
      `  <span class="bright">${key.padEnd(14)}</span>` +
      `<span class="dim">&lt;EXE&gt;</span>  ` +
      `${p.title}`
    );
  });

  printBlank();
  print(`  <span class="dim">${Object.keys(PROJECTS).length} file(s) found.</span>`);
  printDivider();
  print(`  Type <span class="bright">OPEN [NAME]</span> to expand a project.`);
  print(`  Example: <span class="bright">OPEN JOBAGENT</span>`);
}

function cmdOpenProject(name) {
  const project = PROJECTS[name];
  if (!project) {
    print(`File not found: "${name}"`, "error");
    print(`Type <span class="bright">PROJECTS</span> to see available projects.`);
    return;
  }

  print(`<span class="bright">EXECUTING: ${name}.EXE</span>`);
  printDivider();
  print(`  <span class="bright">TITLE   :</span> ${project.title}`);
  print(`  <span class="bright">DATE    :</span> ${project.date}`);
  print(`  <span class="bright">TECH    :</span> ${project.tech}`);
  print(`  <span class="bright">IMPACT  :</span> ${project.impact}`);
  printBlank();
  project.desc.forEach(line => print(`  ${line}`));
  printDivider();
}

// =============================================
// SKILLS
// =============================================
function skillBar(percent) {
  const filled = Math.round(percent / 10);
  const empty = 10 - filled;
  return `[<span class="bright">${"■".repeat(filled)}</span>${"□".repeat(empty)}]`;
}

function cmdSkills() {
  print(`<span class="bright">SCANNING SYSTEM COMPONENTS...</span>`);
  printDivider();

  const skills = [
    { name: "Python",            pct: 85 },
    { name: "Java",              pct: 78 },
    { name: "Formal Methods/TLA+", pct: 90 },
    { name: "C / Embedded C",   pct: 62 },
    { name: "SQL / Databases",   pct: 75 },
    { name: "Machine Learning",  pct: 72 },
    { name: "React / Frontend",  pct: 65 },
    { name: "Linux / Bash",      pct: 70 },
  ];

  skills.forEach(s => {
    const bar = skillBar(s.pct);
    const label = s.name.padEnd(22);
    print(`  ${bar} ${label} ${s.pct}%`);
  });

  printDivider();
  print(`  <span class="dim">Diagnostic complete. No critical errors found.</span>`);
}

// =============================================
// STACK
// =============================================
function cmdStack() {
  print(`<span class="bright">READING FILE: STACK.CFG</span>`);
  printDivider();
  print(`  <span class="bright">LANGUAGES  :</span> Python, Java, C, SQL, JavaScript`);
  print(`  <span class="bright">FORMAL     :</span> TLA+, TLAPS, Hoare Logic, CTL/LTL`);
  print(`  <span class="bright">DATA       :</span> PySpark, pandas, NumPy, HuggingFace`);
  print(`  <span class="bright">WEB        :</span> React, HTML/CSS, Spring Boot, REST`);
  print(`  <span class="bright">TOOLS      :</span> Git, VS Code, Docker, IntelliJ`);
  print(`  <span class="bright">HARDWARE   :</span> STM32, RTOS, Embedded C (learning)`);
  print(`  <span class="bright">OS         :</span> macOS, Linux, Windows`);
  printDivider();
}

// =============================================
// RESUME
// =============================================
function cmdResume() {
  print(`<span class="bright">LOADING RESUME.PDF...</span>`);
  printDivider();

  let progress = 0;
  const interval = setInterval(() => {
    progress += 20;
    const filled = Math.round(progress / 10);
    const empty = 10 - filled;
    const bar = `[${"█".repeat(filled)}${" ".repeat(empty)}] ${progress}%`;
    const output = document.getElementById("output");
    const last = output.lastElementChild;
    if (last && last.dataset.progress) {
      last.innerHTML = `  <span class="bright">${bar}</span>`;
    } else {
      const el = document.createElement("div");
      el.dataset.progress = true;
      el.innerHTML = `  <span class="bright">${bar}</span>`;
      output.appendChild(el);
      output.scrollTop = output.scrollHeight;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        printBlank();
        print(`  <span class="success">Transfer complete.</span>`);
        printBlank();
        print(`  <span class="bright">Kyle A. Williamson</span>`);
        print(`  Engineer. Thinker. Problem Solver.`);
        print(`  york.ca | github.com/kawilliamson`);
        printBlank();
        print(`  EDUCATION`);
        print(`  York University — BEng Software Engineering, Data Stream`);
        print(`  Expected 2027`);
        printBlank();
        print(`  EXPERIENCE`);
        print(`  Security Professional — North Shield Security Group`);
        print(`  Software Projects: JobAgent, SpecChain, GTA RE Predictor`);
        printBlank();
        print(`  To download the full PDF:`);
        print(
          `  <a href="assets/resume.pdf" download style="color:#ffb000">` +
          `PRINT RESUME.PDF</a>`
        );
        printDivider();
      }, 300);
    }
  }, 200);
}

// =============================================
// CONTACT
// =============================================
function cmdContact() {
  const fields = [
    { key: "name", label: "Your Name" },
    { key: "email", label: "Your Email" },
    { key: "message", label: "Your Message" },
  ];
  const values = {};
  let fieldIndex = 0;

  const input = document.getElementById("cmd-input");
  const prompt = document.getElementById("prompt");

  print(`<span class="bright">INITIATING CONTACT PROTOCOL...</span>`);
  printDivider();
  print(`  <span class="dim">Fill in the fields below and hit ENTER after each.</span>`);
print(`  <span class="dim">Press ESC or type EXIT at any time to cancel.</span>`);
  printBlank();

  // Lock terminal into contact mode
  window._contactMode = true;
  prompt.textContent = `${fields[0].label}: `;
  input.value = "";
  input.focus();

  function handleContactInput(e) {
    if (e.key === "Escape" || input.value.trim().toLowerCase() === "exit") {
      input.removeEventListener("keydown", handleContactInput);
      prompt.textContent = `C:\\KYLE> `;
      window._contactMode = false;
      input.value = "";
      printBlank();
      print(`  <span class="dim">Contact cancelled. Returning to terminal.</span>`);
      printDivider();
      return;
    }
    if (e.key !== "Enter") return;
    e.stopImmediatePropagation();

    const val = input.value.trim();
    if (!val) return;

    input.value = "";

    if (fieldIndex < fields.length) {
      values[fields[fieldIndex].key] = val;
      print(`  ${fields[fieldIndex].label}: ${val}`, "dim");
      fieldIndex++;

      if (fieldIndex < fields.length) {
        // Move to next field
        prompt.textContent = `${fields[fieldIndex].label}: `;
      } else {
        // All fields done — ask to confirm
        prompt.textContent = `Transmit? [Y/N]: `;
        printBlank();
        print(`  <span class="bright">Ready to transmit. Confirm? [ Y / N ]</span>`);
      }
    } else {
      // Handle Y/N confirmation
      const answer = val.toLowerCase();
      input.removeEventListener("keydown", handleContactInput);
      prompt.textContent = `C:\\KYLE> `;
      window._contactMode = false;

      printBlank();
      if (answer === "y") {
        print(`  <span class="dim">Transmitting...</span>`);
        fetch("https://formspree.io/f/mykllorb", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            message: values.message,
          }),
        })
        .then(res => {
          if (res.ok) {
            print(`  <span class="success">Message transmitted. I'll be in touch soon.</span>`);
          } else {
            print(`  <span class="error">Transmission failed. Try emailing me directly.</span>`);
          }
          printDivider();
        })
        .catch(() => {
          print(`  <span class="error">Transmission failed. Check your connection.</span>`);
          printDivider();
        });
      } else {
        print(`  <span class="error">Transmission cancelled.</span>`);
        printDivider();
      }
    }
  }

  input.addEventListener("keydown", handleContactInput);
}

// =============================================
// STATUS
// =============================================
function cmdStatus() {
  print(`<span class="bright">READING FILE: STATUS.SYS</span>`);
  printDivider();
  print(`  AVAILABILITY  : <span class="success">Open to Co-op Opportunities — 2026</span>`);
  print(`  LOCATION      : Richmond Hill, Ontario, Canada`);
  print(`  WORK TYPE     : Internship / Co-op / Contract`);
  print(`  INTERESTS     : Embedded, Software, Hardware`);
  print(`  RESPONSE TIME : Within 24 hours`);
  printDivider();
  print(`  Type <span class="bright">CONTACT</span> to reach out.`);
}

// =============================================
// QUICKVIEW
// =============================================
function cmdQuickview() {
  print(`<span class="bright">QUICKVIEW — 30 SECOND SUMMARY</span>`);
  printDivider();
  print(`  Kyle A. Williamson is a 4th-year Software Engineering student`);
  print(`  at York University (Data Stream), graduating in 2027.`);
  printBlank();
  print(`  He specializes in formal methods, embedded systems, and`);
  print(`  data engineering — with a track record of building tools`);
  print(`  that are correct by design, not just by testing.`);
  printBlank();
  print(`  Currently seeking co-op roles in embedded firmware,`);
  print(`  software development, or systems engineering.`);
  printBlank();
  print(`  <span class="bright">Top Projects   :</span> JobAgent, SpecChain, GTA RE Predictor`);
  print(`  <span class="bright">Top Skills     :</span> Python, TLA+, Java, Embedded C`);
  print(`  <span class="bright">Available      :</span> <span class="success">Yes — Co-op 2026</span>`);
  printDivider();
  print(`  Type <span class="bright">CONTACT</span> to get in touch.`);
}

// =============================================
// SOUND
// =============================================
function cmdSoundOn() {
  state.soundEnabled = true;
  if (window._diskGain) window._diskGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.5);
  if (window._flutterGain) window._flutterGain.gain.linearRampToValueAtTime(0.018, audioCtx.currentTime + 0.5);
  print(`  <span class="success">Sound enabled.</span>`);
}

function cmdSoundOff() {
  state.soundEnabled = false;
  if (window._diskGain) window._diskGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
  if (window._flutterGain) window._flutterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
  print(`  <span class="dim">Sound disabled.</span>`);
}

// =============================================
// SHARE
// =============================================
function cmdShare() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    print(`  <span class="success">Portfolio link copied to clipboard!</span>`);
    print(`  <span class="dim">${url}</span>`);
  }).catch(() => {
    print(`  Link: <span class="bright">${url}</span>`);
    print(`  <span class="dim">(Copy manually — clipboard access denied)</span>`);
  });
}

// =============================================
// EASTER EGGS
// =============================================
function eggWin() {
  print(`  This program requires Microsoft Windows.`);
  print(`  Windows is not installed.`);
  print(`  <span class="dim">Nice try.</span>`);
}

function eggDoom() {
  print(`<span class="bright">`, "");
  print(`        /\\_/\\  `);
  print(`       ( o.o ) `);
  print(`  >>>   > ^ <  `);
  print(`  RIP AND TEAR UNTIL IT IS DONE`);
  print(`</span>`, "");
  printBlank();
  print(`  <span class="dim">No demons found on this system.</span>`);
}

function eggMatrix() {
  print(`  <span class="success">Initializing Matrix protocol...</span>`);
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01";
  let count = 0;
  const interval = setInterval(() => {
    let line = "  ";
    for (let i = 0; i < 48; i++) {
      line += chars[Math.floor(Math.random() * chars.length)];
    }
    print(`<span class="success">${line}</span>`);
    count++;
    if (count >= 10) {
      clearInterval(interval);
      printBlank();
      print(`  <span class="bright">Wake up, Kyle...</span>`);
    }
  }, 80);
}

function eggHack() {
  print(`  <span class="error">INITIALIZING HACK SEQUENCE...</span>`);
  const lines = [
    "  Bypassing firewall................",
    "  Spoofing MAC address...............",
    "  Injecting payload..................",
    "  Decrypting mainframe...............",
    "  Rerouting through proxies..........",
  ];
  let i = 0;
  const interval = setInterval(() => {
    if (i < lines.length) {
      print(`<span class="error">${lines[i]}</span>`);
      i++;
    } else {
      clearInterval(interval);
      printBlank();
      print(`  <span class="bright">ACCESS DENIED.</span>`);
      print(`  <span class="dim">Did you really think that would work?</span>`);
    }
  }, 300);
}

function eggHireMe() {
  print(`  <span class="success">EXCELLENT DECISION.</span>`);
  print(`  Redirecting to contact protocol...`);
  setTimeout(() => {
    clearOutput();
    cmdContact();
  }, 1200);
}

function eggDate() {
  print(`  Current date is: Thu 04-23-1994`);
  print(`  <span class="dim">Time flies when you're building cool stuff.</span>`);
}

function eggScreensaver() {
  print(`  <span class="dim">Launching screensaver... (type CLS to exit)</span>`);
  const frames = [
    "  >>> KYLE.EXE <<<",
    "   >> KYLE.EXE <<",
    "    > KYLE.EXE < ",
    "      KYLE.EXE   ",
    "    > KYLE.EXE < ",
    "   >> KYLE.EXE <<",
  ];
  let f = 0;
  const output = document.getElementById("output");
  const interval = setInterval(() => {
    const last = output.lastElementChild;
    if (last && last.dataset.screensaver) {
      last.innerHTML = `<span class="bright">${frames[f % frames.length]}</span>`;
    } else {
      const el = document.createElement("div");
      el.dataset.screensaver = true;
      el.innerHTML = `<span class="bright">${frames[f % frames.length]}</span>`;
      output.appendChild(el);
    }
    f++;
    output.scrollTop = output.scrollHeight;
  }, 150);

  // Stop on cls
  const originalClear = clearOutput;
  window._screensaverInterval = interval;
}

// Override cls to also clear screensaver
const _originalClear = clearOutput;
function clearOutput() {
  if (window._screensaverInterval) {
    clearInterval(window._screensaverInterval);
    window._screensaverInterval = null;
  }
  document.getElementById("output").innerHTML = "";
}