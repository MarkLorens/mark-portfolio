import { COMMANDS, GUEST_HOST } from "./terminal-commands.js";

const LINE_DELAY_MS = 350;

export function initTerminal() {
  const body = document.querySelector("[data-terminal-body]");
  const tabs = document.querySelectorAll("[data-cmd]");
  if (!body || tabs.length === 0) return;

  let isRunning = false;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.dataset.cmd;
      const command = COMMANDS[name];
      if (!command || isRunning) return;

      isRunning = true;
      tabs.forEach((other) => other.classList.remove("is-active"));
      tab.classList.add("is-active");

      body.replaceChildren();
      run(body, name, command, () => {
        isRunning = false;
      });
    });
  });
}

function promptLine(host, text) {
  const line = document.createElement("p");
  const prompt = document.createElement("span");

  prompt.className = "terminal__prompt";
  prompt.textContent = `${host} ~ %`;
  line.append(prompt, ` ${text}`);

  return line;
}

function outputLine(text) {
  const line = document.createElement("p");
  line.className = "terminal__line--muted";
  line.textContent = text;
  return line;
}

function run(body, name, command, onDone) {
  body.append(promptLine(GUEST_HOST, `contact:${name} --lookup --forced`));

  let index = 0;

  const printNext = () => {
    if (index < command.fakeLines.length) {
      body.append(outputLine(command.fakeLines[index]));
      index += 1;
      body.scrollTop = body.scrollHeight;
      setTimeout(printNext, LINE_DELAY_MS);
      return;
    }

    body.append(promptLine(command.host, command.result));
    body.scrollTop = body.scrollHeight;
    onDone();
  };

  setTimeout(printNext, LINE_DELAY_MS);
}
