let refreshTimer = null;

document.getElementById("toggleRefresh").addEventListener("click", () => {
  const input = document.getElementById("refreshInterval");
  const interval = parseInt(input.value);
  if (!refreshTimer && interval > 0) {
    loadData();
    refreshTimer = setInterval(loadData, interval * 1000);
    document.getElementById("toggleRefresh").textContent = "Arrêter";
    input.disabled = true;
  } else {
    clearInterval(refreshTimer);
    refreshTimer = null;
    document.getElementById("toggleRefresh").textContent = "Démarrer";
    input.disabled = false;
  }
});

loadData();
