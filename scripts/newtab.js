const timerEl = document.getElementById("timer");
const targetLabel = document.getElementById("targetLabel");

let targetDate = null;
let showMillis = false;
let rafId = null;
let isLight = false;

function loadSettings() {
  chrome.storage.sync.get(
    ["targetDate", "showMillis", "themeLight"],
    (data) => {
      if (data.targetDate) {
        targetDate = new Date(data.targetDate);
        targetLabel.textContent = targetDate.toLocaleString();
      } else {
        targetLabel.textContent = "No target set — open settings (⚙️)";
        timerEl.textContent = "Set a target date";
      }

      showMillis = !!data.showMillis;

      isLight = !!data.themeLight;
      document.documentElement.classList.toggle("light", isLight);

      startLoop();
    }
  );
}

function clearLoop() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}

function startLoop() {
  clearLoop();
  function tick() {
    if (!targetDate) {
      timerEl.textContent = "No target date set";
      return;
    }

    const now = new Date();
    let diff = targetDate - now; // future - now

    if (diff < 0) {
      timerEl.textContent = "Target date is in the past";
      rafId = requestAnimationFrame(tick);
      return;
    }

    const ms = diff % 1000;
    diff = Math.floor(diff / 1000);
    const seconds = diff % 60;
    diff = Math.floor(diff / 60);
    const minutes = diff % 60;
    diff = Math.floor(diff / 60);
    const hours = diff % 24;
    diff = Math.floor(diff / 24);
    const days = diff;

    const parts = [];
    parts.push(`${days}d`);
    parts.push(pad(hours, 2) + "h");
    parts.push(pad(minutes, 2) + "m");
    parts.push(pad(seconds, 2) + "s");

    let text = parts.join(" ");
    if (showMillis) text += " " + pad(ms, 3) + "ms";

    timerEl.textContent = text;

    rafId = requestAnimationFrame(tick);
  }
  tick();
}

function pad(n, width) {
  return n.toString().padStart(width, "0");
}

function toDatetimeLocal(d) {
  const pad2 = (n) => n.toString().padStart(2, "0");
  const YYYY = d.getFullYear();
  const MM = pad2(d.getMonth() + 1);
  const DD = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
}

loadSettings();
