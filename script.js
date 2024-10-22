const textBox = document.getElementById('text-box');
const choiceButtons = document.getElementById('choice-buttons');

let currentState = {};

function startGame() {
    currentState = {
        scene: 'start',
    };
    updateScene();
}

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

        // More cases for different scenes...
    }
}

function renderChoices(choices) {
    choiceButtons.innerHTML = ''; // Clear previous choices
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('choice-button');
        button.innerText = choice.text;
        button.onclick = () => {
            currentState.scene = choice.nextScene;
            updateScene();
        };
        choiceButtons.appendChild(button);
    });
}

startGame();
