document.addEventListener("DOMContentLoaded", () => {
  const textBox = document.getElementById("game-container__text");
  const choiceButtons = document.getElementById("game-container__buttons");
  const inventoryBox = document.getElementById("inventory");
  const inventoryList = document.getElementById("inventory-list");
  let currentState;

  // Check if this is a fresh start from index
  if (
    !localStorage.getItem("gameInProgress") ||
    localStorage.getItem("newGameStart") === "true"
  ) {
    //   console.log("Starting a new game. Clearing previous inventory.");
    localStorage.removeItem("inventoryItems"); // Clear inventory for a new game
    localStorage.setItem("newGameStart", "false"); // Reset fresh start flag
    localStorage.setItem("gameInProgress", "true"); // Set active game flag
  }

  // Retrieves player name, saved scene, and saved inventory from localStorage
  const playerName = localStorage.getItem("playerName");
  const savedScene = localStorage.getItem("currentScene");
  const savedInventory =
    JSON.parse(localStorage.getItem("inventoryItems")) || [];
  const gameStarted = localStorage.getItem("gameStarted") === "true";
  const greetingText = `So you claim to be a brave adventurer, ${playerName}. Let the story begin, then. \nYou find yourself in a dark forest in the middle of the night. The air is heavy with mist, and the shadows of ancient trees loom all around you. All you can remember is the bitter anger in your father’s voice as he cursed the name of The Deathless King — the ancient sorcerer who stole your mother away. You need to bring her back. \nYou clutch your only weapon — a simple blade your mother once gifted you, inscribed with a rune. What does it look like?`;

  const scenes = {
    premise: {
      text: greetingText,
      choices: [
        {
          text: "Strength",
          nextScene: "explore",
          imageSrc: "./assets/images/sila.png",
          imageAlt: "Rune of Strength",
        },
        {
          text: "Protection",
          nextScene: "explore",
          imageSrc: "./assets/images/obereg.png",
          imageAlt: "Rune of Defense",
        },
      ],
    },
    explore: {
      text: `Everything around you is shadow, until a faint glimmer draws your gaze deeper into the darkness. The light sharpens into a small, crooked house perched on twisted legs, its windows flickering with an unnatural glow, and the thick, metallic scent of herbs wafts from it. The house seems to hold secrets of the forest and perhaps a clue to your quest, but as you pause, a silvered lake beyond it catches your attention, its glassy waters glowing with a quiet, mythical light that whispers your name. Will you knock on the door of the strange house or follow the path to the lake's haunting call?`,
      choices: [
        { text: "Approach the strange-looking house", nextScene: "cabin" },
        { text: "Walk to the lake", nextScene: "lake" },
      ],
    },
    cabin: {
      text: `You cautiously approach the crooked house. Inside, a figure cloaked in shadows beckons you forward. This is the witch’s lair. She grins wickedly, whispering secrets of the forest and offering you forbidden knowledge...`,
      choices: [
        { text: "Accept the witch's offer", nextScene: "witch" },
        { text: "Refuse and step back", nextScene: "explore" },
      ],
    },
    lake: {
      text: `You walk toward the lake, the quiet lull of the water pulling you in. As you approach, you see a figure emerging from the depths, her voice like a song. It's a siren, her enchanting eyes locking with yours, drawing you closer with each step...`,
      choices: [
        { text: "Listen to her song", nextScene: "siren" },
        { text: "Resist and turn away", nextScene: "explore" },
      ],
    },
    witch: {
      text: `The witch cackles as she reveals she has a valuable gift for you. She knows who you're seeking and offers her help. However, you must offer something in return. The Witch is asking for your blood, to bind the magic contract.`,
      choices: [
        { text: "Sign in blood", nextScene: "gift" },
        { text: "Refuse", nextScene: "fight" },
      ],
    },
    gift: {
      text: `The witch cuts the palm of your hand to take your blood, her eyes glimmering like smoldering coals. After the contract is complete she disappears in a dark corner of the house. She returns holding two objects in her gnarled hands. In her left, a small ball of glowing thread pulses faintly, its strands shimmering with an otherworldly light, twitching as if eager to leap from her palm. In her right, a crystal vial filled with dark liquid swirls ominously, its surface rippling like a restless shadow. “One will guide you through the unknown,” she croaks, “but it may lead you to truths you’d rather not see. The other will mend what is broken, but its cost may weigh heavier than the wound itself. Choose wisely, wanderer.”`,
      choices: [
        { text: "Glowing thread", nextScene: "thread" },
        { text: "Mystical vials", nextScene: "vials" },
      ],
    },
    thread: {
      text: `The witch mutters ancient words and spits into her hand, shaping a small ball of glowing thread. She hands it to you with a crooked smile and whispers, “Throw it to the ground when you’re lost, and it will guide your steps.” The thread feels warm and alive in your hand, twitching as if eager to move. You sense it holds the wisdom of paths unseen. You have gained a new way forward.`,
      choices: [
        { text: "Say gratitudes and leave", nextScene: "forest" },
        // { text: "Mystical vials", nextScene: "vials" },
      ],
    },
   vials: {
      text: `The witch dips two vials into her bubbling cauldron, one shimmering with vibrant life, the other swirling with cold, dark liquid. “Pour the black one to mend what is broken, and the bright one to awaken the still,” she says. The vials hum softly in your hands, their power undeniable. You feel the weight of their potential, the ability to heal and restore, or perhaps, to control life itself. You have gained the power of renewal.`,
      choices: [
        { text: "Leave", nextScene: "forest" },
        { text: "Leave", nextScene: "forest" },
      ],
    },
    forest: {
      text: `The witch cuts the palm of your hand to take your blood, her eyes glimmering like smoldering coals. After the contract is complete she disappears in a dark corner of the house. She returns holding two objects in her gnarled hands. In her left, a small ball of glowing thread pulses faintly, its strands shimmering with an otherworldly light, twitching as if eager to leap from her palm. In her right, a crystal vial filled with dark liquid swirls ominously, its surface rippling like a restless shadow. “One will guide you through the unknown,” she croaks, “but it may lead you to truths you’d rather not see. The other will mend what is broken, but its cost may weigh heavier than the wound itself. Choose wisely, wanderer.”`,
      choices: [
        { text: "Sign in blood", nextScene: "choice" },
        { text: "Refuse", nextScene: "explore" },
      ],
    },
    siren: {
      text: `The siren's song grows louder, filling your mind and soul. You feel a strange compulsion, like a pull deep within your heart...`,
      choices: [
        { text: "Follow her into the lake", nextScene: "end" },
        { text: "Resist and flee", nextScene: "explore" },
      ],
    },
  };

  function loadInventory() {
    savedInventory.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      inventoryList.appendChild(listItem);
    });
  }

  function startGame() {
    loadInventory();
    if (!gameStarted || !savedScene) {
      currentState = { scene: "premise" };
      localStorage.setItem("gameStarted", "true");
      typeText(scenes.premise.text, () =>
        renderChoices(scenes.premise.choices)
      );
    } else {
      currentState = { scene: savedScene };
      typeSceneText();
    }
  }

  function typeSceneText() {
    const scene = scenes[currentState.scene];
    if (scene) {
      if (currentState.scene === "explore") {
        inventoryBox.classList.add("visible");
      }
      typeText(scene.text, () => renderChoices(scene.choices));
    } else {
      console.error(`Scene "${currentState.scene}" not found in scenes map.`);
    }
  }

  function renderChoices(choices) {
    choiceButtons.innerHTML = "";
    choices.forEach((choice) => {
      const button = document.createElement("button");
      button.classList.add("game-container__choice-button");
      button.innerText = choice.text;

      if (choice.imageSrc) {
        const image = document.createElement("img");
        image.src = choice.imageSrc;
        image.alt = choice.imageAlt;
        image.classList.add("button-image");
        button.prepend(image);
      }

      button.onclick = () => {
        currentState.scene = choice.nextScene;
        localStorage.setItem("currentScene", currentState.scene);
        textBox.innerHTML = "";
        updateInventory(choice.text);
        choiceButtons.innerHTML = "";
        typeSceneText();
      };

      choiceButtons.appendChild(button);
    });

    gsap.fromTo(
      choiceButtons.children,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power3.out" }
    );
  }

  function updateInventory(choice) {
    let item;
    if (choice === "Strength") {
      item = "Dagger, strength +1";
    } else if (choice === "Protection") {
      item = "Dagger, protection +1";
    }

    // Checks if the item is already in the savedInventory before adding
    if (item && !savedInventory.includes(item)) {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      inventoryList.appendChild(listItem);

      // Adds item to inventory array and saves it in localStorage
      savedInventory.push(item);
      localStorage.setItem("inventoryItems", JSON.stringify(savedInventory));
      // Ensures the inventory box is visible when items are added
      inventoryBox.classList.add("visible");
    }
  }

  function typeText(text, callback, speed = 60) {
    let index = 0;
    textBox.innerHTML = "";

    function typeCharacter() {
      if (index < text.length) {
        textBox.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeCharacter, speed);
      } else {
        if (callback) {
          setTimeout(callback, 500);
        }
      }
    }
    typeCharacter();
  }

  startGame();
});
