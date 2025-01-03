function showPlayerInputs() {
    // Get the number of players selected
    const numPlayers = parseInt(document.getElementById("numPlayers").value);
    const form = document.getElementById("nameForm");

    // Remove any previously added player inputs
    const existingInputs = document.querySelectorAll(".player-input");
    existingInputs.forEach(input => input.remove());

    // Add new player inputs
    for (let i = 1; i <= numPlayers; i++) {
        const inputDiv = document.createElement("div");
        inputDiv.classList.add("player-input");
        inputDiv.innerHTML = `
            <label for="player${i}">Player ${i}:</label>
            <input type="text" id="player${i}" name="player${i}">
            <label class="custom-checkbox tank-checkbox">
                <input type="checkbox" id="tank${i}" name="tank${i}">
            </label>
            <label for="tank${i}" style="color: blue;">Tank</label>
            <label class="custom-checkbox healer-checkbox">
                <input type="checkbox" id="healer${i}" name="healer${i}">
            </label>
            <label for="healer${i}" style="color: green;">Healer</label>
            <label class="custom-checkbox dps-checkbox">
                <input type="checkbox" id="dps${i}" name="dps${i}">
            </label>
            <label for="dps${i}" style="color: red;">DPS</label>
            <br><br>
        `;
        form.insertBefore(inputDiv, form.querySelector("button"));
    }
}

function processPlayers() {
    const numPlayers = parseInt(document.getElementById("numPlayers").value);
    const names = [];

    for (let i = 1; i <= numPlayers; i++) {
        const playerName = document.getElementById(`player${i}`).value;
        if (playerName.trim()) {
            names.push(playerName);
        } else {
            alert(`Please enter a name for Player ${i}.`);
            return;
        }
    }

    console.log("Selected Players:", names);
    alert("Selected Players: " + names.join(", "));
}
