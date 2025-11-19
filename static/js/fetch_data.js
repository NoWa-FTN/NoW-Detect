const rowsPerPage = 10;

let currentAlertPage = 1;
let currentFlowPage = 1;

let totalAlertPages = 1;
let totalFlowPages = 1;

function loadAlertPage(page = 1) {
  fetch(`/api/events?page=${page}&per_page=${rowsPerPage}`)
    .then(res => {
      totalAlertPages = parseInt(res.headers.get('X-Total-Pages') || "1");
      return res.json();
    })
    .then(data => {
      currentAlertPage = page;
      renderAlertPage(data);
      updateAlertPaginationControls();
    });
}

function loadFlowPage(page = 1) {
  fetch(`/api/flows?page=${page}&per_page=${rowsPerPage}`)
    .then(res => {
      totalFlowPages = parseInt(res.headers.get('X-Total-Pages') || "1");
      return res.json();
    })
    .then(data => {
      currentFlowPage = page;
      renderFlowPage(data);
      updateFlowPaginationControls();
    });
}

function renderAlertPage(data) {
  const tbody = document.querySelector("#alerts tbody");
  tbody.innerHTML = "";
  data.forEach(event => {
    if (event.alert) {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${formatTimestamp(event.timestamp)}</td>
        <td>${event.src_ip || ""}</td>
        <td>${event.src_port || ""}</td>
        <td>${event.dest_ip || ""}</td>
        <td>${event.dest_port || ""}</td>
        <td>${event.proto || ""}</td>
        <td>${event.alert.severity || ""}</td>
        <td>${event.alert.action || ""}</td>
        <td>${event.alert.category || ""}</td>
        <td>${event.alert.signature || ""}</td>
      `;
      tbody.appendChild(row);
    }
  });
  document.getElementById("alertPageNum").textContent = `Page ${currentAlertPage} / ${totalAlertPages}`;
}

function renderFlowPage(data) {
  const tbody = document.querySelector("#flows tbody");
  tbody.innerHTML = "";
  data.forEach(event => {
    let row = document.createElement("tr");
    if (event.flow && event.flow.proto === "TCP") {
      row.innerHTML = `
        <td>${formatTimestamp(event.timestamp)}</td>
        <td>${event.src_ip || ""}</td>
        <td>${event.src_port || ""}</td>
        <td>${event.dest_ip || ""}</td>
        <td>${event.dest_port || ""}</td>
        <td>${event.flow.proto || ""}</td>
        <td></td><td></td><td></td><td></td>
      `;
    } else if (event.http) {
      row.innerHTML = `
        <td>${formatTimestamp(event.timestamp)}</td>
        <td>${event.src_ip || ""}</td>
        <td>${event.src_port || ""}</td>
        <td>${event.dest_ip || ""}</td>
        <td>${event.dest_port || ""}</td>
        <td>HTTP</td>
        <td>${event.http.http_method || ""}</td>
        <td>${event.http.hostname || ""}</td>
        <td>${event.http.url || ""}</td>
        <td>${event.http.status_code || ""}</td>
      `;
    }
    tbody.appendChild(row);
  });
  document.getElementById("flowPageNum").textContent = `Page ${currentFlowPage} / ${totalFlowPages}`;
}

function updateAlertPaginationControls() {
  document.getElementById("prevAlert").disabled = currentAlertPage <= 1;
  document.getElementById("nextAlert").disabled = currentAlertPage >= totalAlertPages;
}

function updateFlowPaginationControls() {
  document.getElementById("prevFlow").disabled = currentFlowPage <= 1;
  document.getElementById("nextFlow").disabled = currentFlowPage >= totalFlowPages;
}

document.getElementById("prevAlert").addEventListener("click", () => {
  if (currentAlertPage > 1) loadAlertPage(currentAlertPage - 1);
});
document.getElementById("nextAlert").addEventListener("click", () => {
  if (currentAlertPage < totalAlertPages) loadAlertPage(currentAlertPage + 1);
});
document.getElementById("prevFlow").addEventListener("click", () => {
  if (currentFlowPage > 1) loadFlowPage(currentFlowPage - 1);
});
document.getElementById("nextFlow").addEventListener("click", () => {
  if (currentFlowPage < totalFlowPages) loadFlowPage(currentFlowPage + 1);
});

loadAlertPage();
loadFlowPage();

function formatTimestamp(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
