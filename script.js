const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwjib0MiBVHsJeEaBXV5HSJUNsMkZ2ZHaCeDFvylPomMWeeNBn8LBSJ5YlPaOOgLj0/exec";

function triggerHaptic() {
  if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
}

async function sendData() {
  const btn = document.querySelector(".btn-deploy");

  const data = {
    company: document.getElementById("company").value,
    role: document.getElementById("role").value,
    status: document.getElementById("status").value
  };

  if (!data.company) return;

  triggerHaptic();
  btn.innerText = "UPLOADING...";

  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  });

  btn.innerText = "Deploy to Grid";
  loadData();
}

async function deleteEntry(rowId) {
  if (!confirm("TERMINATE ENTRY?")) return;

  await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ action: "DELETE", rowId })
  });

  loadData();
}

async function loadData() {
  const tbody = document.getElementById("tableBody");

  try {
    const res = await fetch(SCRIPT_URL);
    const rows = await res.json();

    let counts = { total: rows.length, interview: 0, selected: 0 };
    tbody.innerHTML = "";

    rows.reverse().forEach(row => {
      if (row[5] === "Interview") counts.interview++;
      if (row[5] === "Selected") counts.selected++;

      tbody.innerHTML += `
        <tr>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td><span class="badge">${row[5]}</span></td>
          <td><button class="btn-delete" onclick="deleteEntry(${row[6]})">DEL</button></td>
        </tr>
      `;
    });

    document.getElementById("stat-total").innerText = counts.total;
    document.getElementById("stat-interview").innerText = counts.interview;
    document.getElementById("stat-selected").innerText = counts.selected;

    const rate = counts.total
      ? Math.round((counts.selected / counts.total) * 100)
      : 0;

    document.getElementById("stat-rate").innerText = rate + "%";

  } catch (err) {
    console.log("Load error");
  }
}

function filterTable() {
  const filter = document.getElementById("searchInput").value.toUpperCase();
  const trs = document.querySelectorAll("#tableBody tr");

  trs.forEach(tr => {
    const td = tr.children[0];
    tr.style.display =
      td.innerText.toUpperCase().includes(filter) ? "" : "none";
  });
}

window.onload = loadData;
