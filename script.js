const app = {
    URL: "https://script.google.com/macros/s/AKfycbwjib0MiBVHsJeEaBXV5HSJUNsMkZ2ZHaCeDFvylPomMWeeNBn8LBSJ5YlPaOOgLj0/exec",

    async sendData() {
        const company = document.getElementById('company').value;
        const role = document.getElementById('role').value;
        const status = document.getElementById('status').value;

        if(!company || !role) {
            alert("SYSTEM_ERROR: FIELDS_EMPTY");
            return;
        }

        document.getElementById('deployBtn').innerText = "SYNCHRONIZING...";

        try {
            await fetch(this.URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ company, role, status })
            });
            alert("TRANSMISSION_SUCCESS");
            location.reload();
        } catch (e) {
            alert("UPLINK_FAILED");
        }
    },

    filterTable() {
        let input = document.getElementById('search').value.toUpperCase();
        let rows = document.getElementById('targetTable').getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            let txt = rows[i].textContent || rows[i].innerText;
            rows[i].style.display = txt.toUpperCase().indexOf(input) > -1 ? "" : "none";
        }
    }
};
