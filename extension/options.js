const apiKeyInput = document.getElementById("apiKey");
const saveBtn = document.getElementById("saveBtn");
const saved = document.getElementById("saved");

chrome.storage.local.get(["gmmApiKey"], (result) => {
  if (result.gmmApiKey) apiKeyInput.value = result.gmmApiKey;
});

saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({ gmmApiKey: apiKeyInput.value.trim() }, () => {
    saved.style.display = "inline";
    setTimeout(() => (saved.style.display = "none"), 1500);
  });
});
