const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwjib0MiBVHsJeEaBXV5HSJUNsMkZ2ZHaCeDFvylPomMWeeNBn8LBSJ5YlPaOOgLj0/exec";

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
  
  if(!data.company) return;
  
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
  if(!confirm("TERMINATE ENTRY?")) return;
  triggerHaptic();
  await fetch(SCRIPT_URL, { 
    method: "POST", 
    mode: "no-cors", 
    body: JSON.stringify({action: "DELETE", rowId: rowId}) 
  });
  loadData();
}

async function loadData() {
  const tbody = document.getElementById("tableBody");
  try {
    const res = await fetch(SCRIPT_URL);
    const rows = await res.json();
    let counts = { Total: rows.length, Interview: 0, Selected: 0 };
    tbody.innerHTML = "";

    rows.reverse().forEach(row => {
      if(row[5] === "Interview") counts.Interview++;
      if(row[5] === "Selected") counts.Selected++;
      const rowId = row[6]; 

      tbody.innerHTML += `<tr>
        <td style="color:var(--accent)">${row[1]}</td>
        <td style="color:var(--dim)">${row[2]}</td>
        <td><span class="badge status-${row[5].toLowerCase()}">${row[5]}</span></td>
        <td><button class="btn-delete" onclick="deleteEntry(${rowId})">DEL</button></td>
      </tr>`;
    });

    document.getElementById("stat-total").innerText = counts.Total;
    document.getElementById("stat-interview").innerText = counts.Interview;
    document.getElementById("stat-selected").innerText = counts.Selected;
    
    if(counts.Selected > 0) document.getElementById("box-success").classList.add("target-met");
    if(counts.Interview >= 3) document.getElementById("box-interview").classList.add("target-met");

    const rate = counts.Total > 0 ? Math.round((counts.Selected / counts.Total) * 100) : 0;
    document.getElementById("stat-rate").innerText = rate + "%";
  } catch (e) { 
    console.log("Terminal Sync Error"); 
  }
}

function filterTable() {
  const input = document.getElementById("searchInput").value.toUpperCase();
  const trs = document.getElementById("tableBody").getElementsByTagName("tr");
  for (let tr of trs) {
    const td = tr.getElementsByTagName("td")[0];
    tr.style.display = (td && td.innerText.toUpperCase().indexOf(input) > -1) ? "" : "none";
  }
}

window.onload = loadData;
