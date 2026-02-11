:root {
    --neon-green: #00ff41;
    --dark-bg: #0a0a0a;
    --glass: rgba(0, 255, 65, 0.1);
}

body {
    background-color: var(--dark-bg);
    color: var(--neon-green);
    font-family: 'Courier New', monospace;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.terminal-border {
    border: 2px solid var(--neon-green);
    padding: 20px;
    box-shadow: 0 0 15px var(--neon-green);
    background: var(--glass);
    width: 90%;
    max-width: 800px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid var(--neon-green);
    padding: 10px;
    text-align: left;
}

input, select, button {
    background: transparent;
    border: 1px solid var(--neon-green);
    color: var(--neon-green);
    padding: 8px;
    margin: 5px 0;
}

button:hover {
    background: var(--neon-green);
    color: black;
    cursor: pointer;
}
