const listEl = document.getElementById("list");
const statusBanner = document.getElementById("statusBanner");
const symbolInput = document.getElementById("symbolInput");
const addBtn = document.getElementById("addBtn");
const refreshBtn = document.getElementById("refreshBtn");

function renderQuotes(quotes) {
  listEl.innerHTML = "";
  quotes.forEach((q) => {
    const row = document.createElement("div");
    row.className = "row";

    const up = q.changePct >= 0;
    row.innerHTML = `
      <span class="symbol">${q.symbol}</span>
      <span class="price">$${q.price.toFixed(2)}</span>
      <span class="change ${up ? "up" : "down"}">${up ? "▲" : "▼"} ${Math.abs(q.changePct).toFixed(2)}%</span>
      <button class="remove-btn" data-symbol="${q.symbol}" title="Remove">✕</button>
    `;
    listEl.appendChild(row);
  });

  listEl.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const symbol = btn.getAttribute("data-symbol");
      const watchlist = await getWatchlist();
      await setWatchlist(watchlist.filter((s) => s !== symbol));
      await loadAndRender();
    });
  });
}

function showStatus(message) {
  if (!message) {
    statusBanner.style.display = "none";
    return;
  }
  statusBanner.textContent = message;
  statusBanner.style.display = "block";
}

async function loadAndRender() {
  const watchlist = await getWatchlist();
  try {
    const quotes = await fetchQuotes(watchlist);
    renderQuotes(quotes);
    showStatus(USE_MOCK_DATA ? "Showing sample data — connect a live API key in Options" : "");
  } catch (err) {
    showStatus("Couldn't load live quotes: " + err.message);
  }
}

addBtn.addEventListener("click", async () => {
  const symbol = symbolInput.value.trim().toUpperCase();
  if (!symbol) return;
  const watchlist = await getWatchlist();
  if (!watchlist.includes(symbol)) {
    await setWatchlist([...watchlist, symbol]);
  }
  symbolInput.value = "";
  await loadAndRender();
});

symbolInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

refreshBtn.addEventListener("click", loadAndRender);

loadAndRender();
