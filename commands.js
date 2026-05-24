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
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('about')}" onclick="runCommand('about')">about</span> (Who I am)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('projects')}" onclick="runCommand('projects')">projects</span> (My work)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('skills')}" onclick="runCommand('skills')">skills</span> (Skill summary)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('stack')}" onclick="runCommand('stack')">stack</span> (Tools & languages)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('resume')}" onclick="runCommand('resume')">resume</span> (View & download)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('contact')}" onclick="runCommand('contact')">contact</span> (Send message)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('status')}" onclick="runCommand('status')">status</span> (Availability)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('quickview')}" onclick="runCommand('quickview')">quickview</span> (Quick summary)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('share')}" onclick="runCommand('share')">share</span> (Copy link)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('sound')}" onclick="runCommand('sound')">sound</span> (Toggle)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('cls')}" onclick="runCommand('cls')">cls</span> (Clear screen)</div>
    <div><span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('help')}" onclick="runCommand('help')">help</span> (Toggle panel)</div>
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
  print(`  TITLE     : Software Engineering Student`);
  print(`  SCHOOL    : York University, Lassonde School of Engineering`);
  print(`  PROGRAM   : Bachelor of Engineering, Software Engineering`);
  print(`  YEAR      : 4th Year | Expected Graduation: 2027`);
  print(`  COURSES   : Mission-Critical Systems, Software Design & Testing,`);
  print(`            : Data Structures & Algorithms, Operating Systems,`);
  print(`            : Computer Organization, Embedded Systems, Capstone`);
  print(`  FOCUS     : Backend, Full-Stack, Systems Programming`);
  print(`  WORK      : Security Professional @ Northern Shield Security`);
  print(`            : ex-Risk Associate @ Aritzia`);
  print(`            : ex-Sales Specialist @ Apple`);
  printBlank();
  print(`  INTERESTS : Low-Level Systems, Basketball, Math, Physics`);
  printBlank();
  print(`  LANGUAGES : English (Native), French, Italian`);
  printBlank();
  print(`  I build full-stack systems from mobile apps to microservices,`);
  print(`  with active interest in low-level and systems programming.`);
  printBlank();
  print(`  CONTACT   : mgkshome7@gmail.com`);
  print(`  LINKEDIN  : linkedin.com/in/kyle-abraham-williamson`);
  print(`  LOCATION  : Richmond Hill, ON, Canada`);
  printDivider();
  print(`  <span class="dim">Last Modified: 05-24-2026</span>`);
}

// =============================================
// PROJECTS
// =============================================
const PROJECTS = {
  "BLOCKBID": {
    title: "BlockBid Auction System: Full-Stack Microservices Platform",
    date: "Oct 2025 -- Dec 2025",
    desc: [
      "Architected 6-service microservices auction platform with",
      "database-per-service pattern, real-time WebSocket bidding,",
      "JWT/RBAC authentication, Ethereum blockchain audit trails,",
      "and 30+ REST endpoints. Deployed via Docker Compose.",
    ],
    tech: "Docker, Spring Boot, WebSocket, Ethereum, JWT",
    impact: "6 services, 30+ REST endpoints, single-command deploy",
  },
  "RUNZ": {
    title: "Runz: Street Basketball Ranking Mobile App",
    date: "Jan 2026 -- Present",
    desc: [
      "Full-stack competitive 1v1 basketball platform targeting 2 platforms",
      "(iOS, Android). Real-time game sessions",
      "via Supabase Realtime WebSocket, dual-implementation Elo ranking engine",
      "(Dart + PL/pgSQL), GPS-verified match validation via PostGIS.",
      "Built 3 Edge Functions supporting 15+ push notification types, persistent",
      "offline action queue, and cron-driven auto-resolution system.",
    ],
    tech: "Flutter, Supabase, Riverpod, PostGIS, Deno, FCM",
    impact: "2 platforms, 12+ Postgres tables, 15+ notification types",
  },
  "REALESTATE": {
    title: "GTA Real Estate Hotspots: Spatial Network Analysis",
    date: "Sept 2025 -- Dec 2025",
    desc: [
      "Analyzed 358,713 building permits from Toronto Open Data using",
      "graph-based spatial network of 98 regions and 165 connections.",
      "Spatial Autoregressive model achieved 44.7% lower RMSE (p=0.037)",
      "and 60% precision in identifying top-10 growth hotspots.",
    ],
    tech: "Python, PyTorch, NetworkX, Spatial Autoregressive Models",
    impact: "44.7% lower RMSE, 60% precision on top-10 hotspots",
  },
  "ROOMSCHED": {
    title: "YorkU Conference Room Scheduler",
    date: "Sept 2025 -- Dec 2025",
    desc: [
      "Led team of 4 in building enterprise room booking system with",
      "conflict-free scheduling, role-based access control, automated",
      "waitlisting, and comprehensive UML documentation. Applied",
      "Observer, Factory, and Strategy design patterns.",
    ],
    tech: "Java, Design Patterns, UML, Eiffel",
    impact: "Team of 4, full design pattern coverage",
  },
  "PORTFOLIO": {
    title: "Terminal Portfolio: Interactive Developer Website",
    date: "April 2025",
    desc: [
      "Interactive terminal emulator with custom shell (14+ commands,",
      "arrow-key history, auto-demo mode, recruiter skip-path).",
      "Procedural Web Audio API sound engine synthesizing audio from",
      "oscillator nodes, zero audio files. CRT-era aesthetic via",
      "layered CSS gradients and keyframe animations.",
    ],
    tech: "Vanilla JS, Web Audio API, CSS3, HTML5",
    impact: "Zero dependencies, zero audio files, zero frameworks",
  },
};

function cmdProjects() {
  print(`<span class="bright">DIRECTORY OF C:\\KYLE\\PROJECTS</span>`);
  printDivider();
  print(`  <span class="dim">Volume in drive C is PORTFOLIO</span>`);
  printBlank();

  Object.entries(PROJECTS).forEach(([key, p]) => {
    print(
      `  <span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('open ${key.toLowerCase()}')}" onclick="runCommand('open ${key.toLowerCase()}')">${key.padEnd(14)}</span>` +
      `<span class="dim">&lt;EXE&gt;</span>  ` +
      `${p.title}`
    );
  });

  printBlank();
  print(`  <span class="dim">${Object.keys(PROJECTS).length} file(s) found.</span>`);
  printDivider();
  print(`  Click a project above or type <span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('open blockbid')}" onclick="runCommand('open blockbid')">OPEN [NAME]</span> to expand.`);
}

function cmdOpenProject(name) {
  const project = PROJECTS[name];
  if (!project) {
    print(`File not found: "${name}"`, "error");
    print(`Type <span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('projects')}" onclick="runCommand('projects')">PROJECTS</span> to see available projects.`);
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
    { name: "Java / Spring Boot", pct: 78 },
    { name: "Flutter / Dart",    pct: 80 },
    { name: "JavaScript / TS",   pct: 75 },
    { name: "C / C++",           pct: 62 },
    { name: "SQL / Postgres",    pct: 78 },
    { name: "Docker / DevOps",   pct: 70 },
    { name: "Supabase / Backend", pct: 75 },
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
  print(`  <span class="bright">LANGUAGES  :</span> Python, Java, C/C++, JavaScript, TypeScript, Dart, SQL, SystemVerilog, HTML/CSS`);
  print(`  <span class="bright">FRAMEWORKS :</span> Spring Boot, Flutter, Riverpod, React.js, Node.js, Express.js, Streamlit`);
  print(`  <span class="bright">DATA / ML  :</span> PyTorch, Scikit-learn, Pandas, NumPy, NetworkX, Jupyter`);
  print(`  <span class="bright">INFRA      :</span> Docker, Docker Compose, Git, GitHub Actions, Maven, Linux/macOS`);
  print(`  <span class="bright">DATABASES  :</span> PostgreSQL, Supabase, MySQL, SQLite`);
  print(`  <span class="bright">PROTOCOLS  :</span> REST, WebSocket, JWT, OAuth, SSE, Discord/Telegram Bot APIs`);
  print(`  <span class="bright">TOOLS      :</span> Postman, JUnit, Playwright, Selenium, Excel`);
  printDivider();
}

// =============================================
// RESUME
// =============================================
function cmdResume() {
  // Clear any orphaned progress interval from a previous call
  if (window._resumeInterval) { clearInterval(window._resumeInterval); window._resumeInterval = null; }
  print(`<span class="bright">LOADING RESUME.PDF...</span>`);
  printDivider();

  let progress = 0;
  window._resumeInterval = setInterval(() => {
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
      clearInterval(window._resumeInterval);
      window._resumeInterval = null;
      setTimeout(() => {
        printBlank();
        print(`  <span class="success">Transfer complete.</span>`);
        printBlank();
        print(`  <span class="bright">Kyle A. Williamson</span>`);
        print(`  Software Engineering Student. Builder.`);
        print(`  kawilliam.github.io | github.com/kawilliam | linkedin.com/in/kyle-abraham-williamson`);
        printBlank();
        print(`  EDUCATION`);
        print(`  York University, BEng Software Engineering`);
        print(`  Lassonde School of Engineering | Expected 2027`);
        printBlank();
        print(`  EXPERIENCE`);
        print(`  Security Professional @ Northern Shield Security`);
        print(`  Risk Associate @ Aritzia | Sales Specialist @ Apple`);
        print(`  Projects: BlockBid, Runz, GTA RE Hotspots`);
        printBlank();
        print(`  To download the full PDF:`);
        print(
          `  <a href="assets/Kyle_Williamson_Resume.pdf" download style="color:#ffb000">` +
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
      printText(`  ${fields[fieldIndex].label}: ${val}`);
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
      if (answer === "y" || answer === "yes") {
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
            print(`  <span class="error">Transmission failed. Try emailing mgkshome7@gmail.com directly.</span>`);
          }
          printDivider();
        })
        .catch(() => {
          print(`  <span class="error">Transmission failed. Check your connection or email mgkshome7@gmail.com.</span>`);
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
  print(`  AVAILABILITY  : <span class="success">Open to New Grad Opportunities, 2027</span>`);
  print(`  LOCATION      : Richmond Hill, Ontario, Canada`);
  print(`  WORK TYPE     : Full-Time / New Grad`);
  print(`  INTERESTS     : Backend, Full-Stack, Systems Programming`);
  print(`  RESPONSE TIME : Within 24 hours`);
  printDivider();
  print(`  Type <span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('contact')}" onclick="runCommand('contact')">CONTACT</span> to reach out.`);
}

// =============================================
// QUICKVIEW
// =============================================
function cmdQuickview() {
  print(`<span class="bright">QUICKVIEW: 30 SECOND SUMMARY</span>`);
  printDivider();
  print(`  Kyle A. Williamson is a 4th-year Software Engineering student`);
  print(`  at York University (Lassonde School of Engineering),`);
  print(`  graduating in 2027.`);
  printBlank();
  print(`  He builds full-stack systems from mobile apps to microservices,`);
  print(`  with active interest in low-level and systems programming.`);
  printBlank();
  print(`  He is currently seeking a backend, full-stack, or systems-oriented`);
  print(`  new-graduate role.`);
  printBlank();
  print(`  <span class="bright">Top Projects   :</span> BlockBid, Runz, GTA Real Estate Hotspots`);
  print(`  <span class="bright">Top Skills     :</span> Python, Java, Flutter/Dart, TypeScript`);
  print(`  <span class="bright">Available      :</span> <span class="success">Yes, New Grad 2027</span>`);
  printDivider();
  print(`  Type <span class="bright cmd-link" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();runCommand('contact')}" onclick="runCommand('contact')">CONTACT</span> to get in touch.`);
}

// =============================================
// SHUTDOWN
// =============================================
function cmdShutdown() {
  print(`<span class="bright">SHUTTING DOWN...</span>`);
  printBlank();
  print(`  <span class="dim">Powering off display...</span>`);
  setTimeout(() => {
    document.getElementById("terminal").classList.add("shutting-down");
    setTimeout(() => { location.reload(); }, 1500);
  }, 600);
}

// =============================================
// SOUND
// =============================================
function cmdSoundToggle() {
  if (state.soundEnabled) {
    cmdSoundOff();
  } else {
    cmdSoundOn();
  }
}

function cmdSoundOn() {
  if (state.soundEnabled) {
    print(`  <span class="dim">Sound is already enabled.</span>`);
    return;
  }
  state.soundEnabled = true;
  if (audioCtx && window._diskGain) window._diskGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.5);
  if (audioCtx && window._flutterGain) window._flutterGain.gain.linearRampToValueAtTime(0.018, audioCtx.currentTime + 0.5);
  print(`  <span class="success">Sound enabled.</span>`);
}

function cmdSoundOff() {
  if (!state.soundEnabled) {
    print(`  <span class="dim">Sound is already disabled.</span>`);
    return;
  }
  state.soundEnabled = false;
  if (audioCtx && window._diskGain) window._diskGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
  if (audioCtx && window._flutterGain) window._flutterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
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
    print(`  <span class="dim">(Copy manually, clipboard access denied)</span>`);
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
  print(`<span class="bright">        /\\_/\\  </span>`);
  print(`<span class="bright">       ( o.o ) </span>`);
  print(`<span class="bright">  >>>   > ^ <  </span>`);
  print(`<span class="bright">  RIP AND TEAR UNTIL IT IS DONE</span>`);
  printBlank();
  print(`  <span class="dim">No demons found on this system.</span>`);
}

function eggMatrix() {
  print(`  <span class="success">Initializing Matrix protocol...</span>`);
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01";
  let count = 0;
  window._matrixInterval = setInterval(() => {
    let line = "  ";
    for (let i = 0; i < 48; i++) {
      line += chars[Math.floor(Math.random() * chars.length)];
    }
    print(`<span class="success">${line}</span>`);
    count++;
    if (count >= 10) {
      clearInterval(window._matrixInterval);
      window._matrixInterval = null;
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
  window._hackInterval = setInterval(() => {
    if (i < lines.length) {
      print(`<span class="error">${lines[i]}</span>`);
      i++;
    } else {
      clearInterval(window._hackInterval);
      window._hackInterval = null;
      printBlank();
      print(`  <span class="bright">ACCESS DENIED.</span>`);
      print(`  <span class="dim">Did you really think that would work?</span>`);
    }
  }, 300);
}

function eggHireMe() {
  print(`  <span class="success">EXCELLENT DECISION.</span>`);
  print(`  Redirecting to contact protocol...`);
  window._hireTimeout = setTimeout(() => {
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
  if (window._matrixInterval) {
    clearInterval(window._matrixInterval);
    window._matrixInterval = null;
  }
  if (window._hackInterval) {
    clearInterval(window._hackInterval);
    window._hackInterval = null;
  }
  if (window._resumeInterval) {
    clearInterval(window._resumeInterval);
    window._resumeInterval = null;
  }
  if (window._hireTimeout) {
    clearTimeout(window._hireTimeout);
    window._hireTimeout = null;
  }
  document.getElementById("output").innerHTML = "";
}