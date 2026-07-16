const observerOptions = {
  threshold: 0.4,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("opacity-0");
  observer.observe(section);
});

document.querySelectorAll(".group").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

const COMMANDS = {
  wa: {
    host: "whatsapp@10-64-36-199",
    fakeLines: [
      "Connecting to WhatsApp Business API...",
      "",
      "> initializing contact pipeline...",
      "✔ Loading environment variables",
      "✔ Validating configuration",
      "✔ Establishing SSH tunnel",
      "Resolving whatsapp.internal...",
      "PING whatsapp.internal (10.64.36.199): 56 data bytes",
      "64 bytes from 10.64.36.199: icmp_seq=0 ttl=64 time=1.2 ms",
      "",
      "Starting secure transport...",
      "Negotiating TLS v1.3...",
      "Generating ephemeral session keys...",
      "Exchange complete.",
      "",
      "Authenticating user...",
      "Token accepted.",
      "Checking access permissions...",
      "Permission granted.",
      "",
      "Querying contact registry...",
      "Found 1 record.",
      "Decrypting payload...",
      "Checksum verified.",
      "",
      "Formatting response...",
      "Done.",
    ],
    result: "+(62)821-8144-6150",
  },
  mail: {
    host: "mail@10-64-36-199",
    fakeLines: [
      "Resolving mail.smtp.io...",
      "Resolving MX records...",
      "MX lookup successful.",
      "",
      "Connecting to mail server...",
      "[■■□□□□□□□□] 18%",
      "[■■■■□□□□□□] 42%",
      "[■■■■■■■□□□] 71%",
      "[■■■■■■■■■■] 100%",
      ,
      "",
      "EHLO localhost",
      "250 Hello.",
      "",
      "STARTTLS",
      "220 Ready to start TLS.",
      "",
      "Negotiating cipher suite...",
      "TLS_AES_256_GCM_SHA384 selected.",
      "",
      "Authenticating...",
      "235 Authentication successful.",
      "",
      "Retrieving preferred contact...",
      "Encoding UTF-8...",
      "",
      "Done.",
    ],
    result: "marklorens0705@gmail.com",
  },
  dsc: {
    host: "discord@10-64-36-199",
    fakeLines: [
      "$ npm fetch discord-user discord#123",
      "",
      "npm WARN user No description",
      "npm WARN deprecated user-hashtag@2.4.1:",
      "Discord removed # for no reason",
      "",
      "added 314 packages in 8.42s",
      "",
      "7 vulnerabilities (2 low, 5 existential)",
      "",
      "Run `npm audit fix --force`",
      "",
      "> npm audit fix --force",
      "",
      "WARN this is not actually a command line...",
      "WARN are you still reading these...",
      "✔ Resolving discord-user",
      "✔ Fetching profile",
      "✔ Synchronizing friend cache",
      "✔ Downloading avatar... 100%",
      "",
      "aesrath",
    ],
    result: "aesrath",
  },
};

const LINE_DELAY_MS = 350;

function init() {
  const terminalBody = document.getElementById("TerminalBody");
  const navButtons = document.querySelectorAll(".terminal-nav-container-list");

  if (!terminalBody || navButtons.length === 0) return;

  let isRunning = false;

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cmd = COMMANDS[button.dataset.cmd];
      if (!cmd || isRunning) return;
      isRunning = true;

      navButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");

      terminalBody.innerHTML = "";
      runSequence(terminalBody, button.dataset.cmd, cmd, () => {
        isRunning = false;
      });
    });
  });
}

function runSequence(terminalBody, cmdName, cmd, onDone) {
  const inputLine = document.createElement("p");
  inputLine.innerHTML = `<span>guest@10-64-36-199 ~ %</span> contact:${cmdName} --lookup --forced`;
  terminalBody.appendChild(inputLine);

  let index = 0;

  const printNextLine = () => {
    if (index < cmd.fakeLines.length) {
      const line = document.createElement("p");
      line.className = "terminal-line-fake";
      line.textContent = cmd.fakeLines[index];
      terminalBody.appendChild(line);
      index += 1;
      terminalBody.scrollTop = terminalBody.scrollHeight;
      setTimeout(printNextLine, LINE_DELAY_MS);
      return;
    }

    const resultLine = document.createElement("p");
    resultLine.innerHTML = `<span>${cmd.host} ~ %</span> ${cmd.result}`;
    terminalBody.appendChild(resultLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
    onDone();
  };

  setTimeout(printNextLine, LINE_DELAY_MS);
}

document.addEventListener("DOMContentLoaded", init);
