document.addEventListener("DOMContentLoaded", () => {
    const textBox = document.getElementById('text-box');
    const choiceButtons = document.getElementById('choice-buttons');
    const inventoryBox = document.getElementById('inventory'); 
    const inventoryList = document.getElementById('inventory-list');
    let currentState;

    // Retrieve player name from localStorage
    const playerName = localStorage.getItem("playerName");
    const greetingText = `So you see yourself as a brave adventurer, ${playerName}. Let the story begin, then. \nYou find yourself in a dark forest in the middle of the night. The air is heavy with mist, and the shadows of ancient trees loom all around you. All you can remember is the bitter anger in your father’s voice as he cursed the name of The Deathless King—the ancient sorcerer who stole your mother away. You need to bring her back. \nYou clutch your only weapon—a simple blade your mother once gifted you, inscribed with a rune. What does it look like?`;
    let index = 0;

    function startGame() {
        currentState = {
            scene: 'premise',
        };
        typeText(greetingText, () => updateScene());
    }

    function updateScene() {
        if (currentState.scene === 'premise') {
            renderChoices([
                { text: "Strength", nextScene: 'explore' },
                { text: "Protection", nextScene: 'stay' },
            ]);
        }
    }

    function renderChoices(choices) {
        choiceButtons.innerHTML = ''; // Clear previous choices
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('game-container__choice-button');
            button.innerText = choice.text;
        
            // Add an image to the button based on the choice text
            if (choice.text === "Strength") {
                const image = document.createElement('img');
                image.src = "./assets/images/sila.png"; 
                image.alt = "Rune of Strength";
                image.classList.add('button-image');
                button.prepend(image);
            } else if (choice.text === "Protection") {
                const stayImage = document.createElement('img');
                stayImage.src = "./assets/images/obereg.png"; 
                stayImage.alt = "Rune of Defense";
                stayImage.classList.add('button-image');
                button.prepend(stayImage);
            }
        
            button.onclick = () => {
                currentState.scene = choice.nextScene;
                textBox.innerHTML = ""; 
                updateInventory(choice.text); // Update inventory based on choice
                typeSceneText();
            };
            choiceButtons.appendChild(button);
        });
    }

    function updateInventory(choice) {
        let item;
        if (choice === "Strength") {
            item = "Dagger, strength +1";
        } else if (choice === "Protection") {
            item = "Dagger, protection +1";
        }

        if (item) {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            inventoryList.appendChild(listItem);

            // Reveal the inventory box after the first item is added
            inventoryBox.style.display = "flex"; 
        }
    }

    function typeText(text, callback) {
        index = 0;
        textBox.innerHTML = ''; 
        function typeCharacter() {
            if (index < text.length) {
                textBox.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeCharacter, 50); // Change the speed by changing this delay
            } else if (callback) {
                callback(); // Call the callback function once typing is done
            }
        }
        typeCharacter();
    }

    startGame();
});


    // function typeSceneText() {
    //     // Add logic here to type text specific to each scene if needed
    //     if (currentState.scene === 'explore') {
    //         typeText("You find a door. Do you open it?", () => renderChoices([
    //             { text: "Open the door", nextScene: 'door' },
    //             { text: "Go back", nextScene: 'start' }
    //         ]));
    //     } else if (currentState.scene === 'stay') {
    //         typeText("You hear strange noises. What will you do?", () => renderChoices([
    //             { text: "Investigate", nextScene: 'investigate' },
    //             { text: "Wait longer", nextScene: 'wait' }
    //         ]));
    //     }
    // }

 
//     startGame();
// });
