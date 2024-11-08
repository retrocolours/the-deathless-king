// Start Game Initialization
function startGame() {
    currentState = {
        scene: 'start',
    };
    updateScene();
}

// Update the scene based on the current state
function updateScene() {
    switch (currentState.scene) {
        case 'start':
            textBox.innerHTML = "You awaken in a dark room.\nWhat will you do?";
            renderChoices([
                { text: "Explore the room", nextScene: 'explore' },
                { text: "Stay still", nextScene: 'stay' },
            ]);
            break;

        case 'explore':
            textBox.innerHTML = "You find a door. Do you open it?";
            renderChoices([
                { text: "Open the door", nextScene: 'door' },
                { text: "Go back", nextScene: 'start' },
            ]);
            break;

        case 'stay':
            textBox.innerHTML = "You hear strange noises. What will you do?";
            renderChoices([
                { text: "Investigate", nextScene: 'investigate' },
                { text: "Wait longer", nextScene: 'wait' },
            ]);
            break;

        // Add more cases as necessary for different scenes...
    }
}

// Render the choices dynamically
function renderChoices(choices) {
    choiceButtons.innerHTML = ''; // Clear previous choices
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('game-container__choice-button');
        button.innerText = choice.text;
        button.onclick = () => {
            currentState.scene = choice.nextScene;
            updateScene();
        };
        choiceButtons.appendChild(button);
    });
}
