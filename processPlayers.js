const heroesByRole = new Map([
    ["Vanguards", [
        "Captain America", "Doctor Strange", "Groot", "Hulk",
        "Magneto", "Peni Parker", "Thor", "Venom"
    ]],
    ["Duelists", [
        "Black Panther", "Black Widow", "Hawkeye", "Hela",
        "Iron Fist", "Iron Man", "Magik", "Moon Knight",
        "Namor", "Psylocke", "Punisher", "Scarlet Witch",
        "Spider-Man", "Squirrel Girl", "Star-Lord", "Storm",
        "Winter Soldier", "Wolverine"
    ]],
    ["Strategists", [
        "Adam Warlock", "Cloak & Dagger", "Jeff the Land Shark",
        "Loki", "Luna Snow", "Mantis", "Rocket Raccoon"
    ]]
]);

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

function balancedRandom(playerSelection, selectedHeroes) {
    // Copy starting hero list for editing what is still available
    const availableHeroes = new Map(
        Array.from(heroesByRole, ([role, heroes]) => [role, [...heroes]])
    );


}

function trueRandom(playerSelection, selectedHeroes) {
    // Copy starting hero list for editing what is still available
    const availableHeroes = new Map(
        Array.from(heroesByRole, ([role, heroes]) => [role, [...heroes]])
    );

    for (let [playerKey, roleChk] of playerSelection) {
        //get random role
        const rolesArray = Array.from(availableHeroes.keys());
        const roleIndex = Math.floor(Math.random() * rolesArray.length);
        //get random hero
        const heroesArray = availableHeroes.get(rolesArray[roleIndex]);
        const heroIndex = Math.floor(Math.random() * heroesArray.length);
        //save selected hero
        const heroResult = heroesArray[heroIndex];
        //add to selected
        selectedHeroes.set(playerKey, heroResult);
        //remove selected hero from available heroes
        heroesArray.splice(heroIndex, 1);
    }
}
function roleChoice(playerSelection, selectedHeroes) {
    // Copy starting hero list for editing what is still available
    const availableHeroes = new Map(
        Array.from(heroesByRole, ([role, heroes]) => [role, [...heroes]])
    );

}

function displayResults(selectedHeroes) {
    const resultsContainer = document.getElementById('resultsContainer');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Add a heading for the results
    const heading = document.createElement('h2');
    heading.textContent = 'Selected Heroes';
    resultsContainer.appendChild(heading);

    // Append each map entry to the results container
    selectedHeroes.forEach((hero, player) => {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `<strong>${player}:</strong> ${hero}`;
        resultsContainer.appendChild(resultElement);
    });
}

function processPlayers() {
    const numPlayers = parseInt(document.getElementById("numPlayers").value);
    const playerSelection = new Map();

    for (let i = 1; i <= numPlayers; i++) {
        //containers for form selection
        const playerName = document.getElementById(`player${i}`).value;
        const tankSelect = document.getElementById(`tank${i}`).checked;
        const healerSelect = document.getElementById(`healer${i}`).checked;
        const dpsSelect = document.getElementById(`dps${i}`).checked;
        //map player name to role selections
        if (playerName.trim()) {
            playerSelection.set(playerName.trim(), [tankSelect, healerSelect, dpsSelect]);
        } else {
            alert(`Please enter a name for Player ${i}.`);
            return;
        }
    }

    //generate character selections based on ruleset
    const selectedHeroes = new Map;

    switch (document.getElementById("randomType").value.toLowerCase()) {
        case "balanced":
            balancedRandom(playerSelection, selectedHeroes);
            break;
        case "random":
            trueRandom(playerSelection, selectedHeroes);
            break;
        case "roleSelect":
            roleChoice(playerSelection, selectedHeroes);
            break;
        default:
            trueRandom(playerSelection, selectedHeroes);
            break;
    }

    //update html to show results
    displayResults(selectedHeroes);
}

