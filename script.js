const app = {
    // PASTE YOUR GOOGLE DEPLOYMENT URL BETWEEN THE QUOTES BELOW
    URL: "https://script.google.com/macros/s/AKfycbwjib0MiBVHsJeEaBXV5HSJUNsMkZ2ZHaCeDFvylPomMWeeNBn8LBSJ5YlPaOOgLj0/exec",

    async sendData() {
        const company = document.getElementById('company').value;
        const role = document.getElementById('role').value;
        const status = document.getElementById('status').value;

        if(!company || !role) return alert("Enter all fields!");

        const btn = document.querySelector('button');
        btn.innerText = "UPLOADING...";

        try {
            await fetch(this.URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                body: JSON.stringify({ company, role, status })
            });
            alert("DEPLOYED TO GRID!");
            location.reload();
        } catch (err) {
            console.error(err);
            alert("ERROR IN UPLOAD");
        }
    }
};
