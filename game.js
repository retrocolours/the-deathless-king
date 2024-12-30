

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
    witch: {
      text: `The witch cackles as she reveals she has a valuable gift for you. She knows who you're seeking and offers her help. However, you must offer something in return. The Witch is asking for your blood, to bind the magic contract.`,
      choices: [
        { text: "Sign in blood", nextScene: "gift" },
        { text: "Refuse", nextScene: "fight" },
      ],
    },
    fight: {
      text: `The witch's grin fades, replaced by a sinister scowl. "Foolish mortal," she hisses, her shadowy form growing larger, claws shimmering with dark energy. "You dare defy me?" She lunges at you, and you instinctively draw your dagger. The battle begins in the dim, suffocating room, the air heavy with her magic.`,
      choices: [
        { text: "Fight the witch with a dagger", nextScene: "fightOutcome" },
      ],
    },
    fightOutcome: {
      text: "", // Dynamically updates based on the outcome
      choices: [],
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
      choices: [{ text: "Say gratitudes and leave", nextScene: "forest" }],
    },
    vials: {
      text: `The witch dips two vials into her bubbling cauldron, one shimmering with vibrant life, the other swirling with cold, dark liquid. “Pour the black one to mend what is broken, and the bright one to awaken the still,” she says. The vials hum softly in your hands, their power undeniable. You feel the weight of their potential, the ability to heal and restore, or perhaps, to control life itself. You have gained the power of renewal.`,
      choices: [{ text: "Say gratitudes and leave", nextScene: "forest" }],
    },
    forest: {
      text: `The path ahead grows darker, but you feel prepared for the challenges to come.`,
      choices: [{ text: "Continue your journey", nextScene: "explore" }],
    },
  };

  // Functions
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

  function handleFight() {
    const hasStrengthDagger = savedInventory.includes("Dagger, strength +1");
    const hasProtectionDagger = savedInventory.includes("Dagger, protection +1");
    const fightOutcomeScene = scenes.fightOutcome;

    if (hasStrengthDagger) {
      fightOutcomeScene.text = `The witch's claws slash through the air, but your strength-enhanced dagger slices true, cutting through her dark magic. She screams in pain and collapses. The magic rune inscribed in your mother's dagger burns her. She screams and falls back. "You... are stronger than I expected. I admit defeat for now. Here, you deserve a prize for your bravery. You'll need it in your journey." She reappears, holding two mysterious small vials in her right hand and a glowing ball of yarn in her left hand.`;
      fightOutcomeScene.choices = [
        { text: "Mystical vials", nextScene: "vials" },
        { text: "Glowing thread", nextScene: "thread" },
      ];
    } else if (hasProtectionDagger) {
      fightOutcomeScene.text = `Your dagger glows with a protective aura, shielding you from the worst of her attacks. The magical rune blunts the force of her claws. However, her dark energy begins to overwhelm you, forcing you to retreat. The witch cackles as you flee into the forest, bruised but alive, with your quest still ahead.`;
      fightOutcomeScene.choices = [
        { text: "Continue through the forest", nextScene: "explore" },
      ];
    } else {
      console.error("Error: No valid inventory state detected.");
      return; // Safeguard to prevent proceeding with invalid state
    }

    currentState.scene = "fightOutcome";
    localStorage.setItem("currentScene", currentState.scene);
    textBox.innerHTML = "";
    choiceButtons.innerHTML = ""; // Clear buttons after pressing "Fight"
    typeSceneText();
  }

  function updateInventory(choice) {
    let item;
    if (choice === "Strength") {
      item = "Dagger, strength +1";
    } else if (choice === "Protection") {
      item = "Dagger, protection +1";
    } else if (choice === "Glowing thread") {
      item = "Ball of glowing thread";
    } else if (choice === "Mystical vials") {
      item = "Mystical vials (life and death)";
    }

    if (item && !savedInventory.includes(item)) {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      inventoryList.appendChild(listItem);

      savedInventory.push(item);
      localStorage.setItem("inventoryItems", JSON.stringify(savedInventory));
      inventoryBox.classList.add("visible");
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
        if (currentState.scene === "fight" && choice.text === "Fight the witch with a dagger") {
          handleFight();
          return;
        }

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
