const SAVE_KEY = "driftersTrailSave";

function rollDice(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  document.getElementById("result").textContent = result;
}

const scenes = {
  start: {
    text: [
      "You stand before an abandoned stone well.",
      "The wind is still.",
      "Bugs stares into the darkness below."
    ],
    choices: [
      { label: "Look Into The Well", next: "lookDown" },
      { label: "Walk Away", next: "walkAway" }
    ]
  },

  lookDown: {
    text: [
      "You lean over the edge of the well.",
      "Far below, something shifts in the dark.",
      "A faint whisper rises from below."
    ],
    choices: [
      { label: "Climb Down", next: "climbDown" },
      { label: "Throw A Rock", next: "throwRock" }
    ]
  },

  walkAway: {
    text: [
      "You decide this is absolutely someone else's problem.",
      "Bugs does not move.",
      "He sits beside the well and stares at you like you have disappointed every cat who has ever lived."
    ],
    choices: [
      { label: "Follow Bugs", next: "followBugs" },
      { label: "Leave Anyway", next: "leaveAnyway" }
    ]
  },

  climbDown: {
    text: [
      "The stones are slick with age.",
      "Halfway down, your boot knocks loose a chunk of moss.",
      "Behind it, wedged into the wall, is a small iron box."
    ],
    choices: [
      { label: "Open The Box", next: "openBox" },
      { label: "Keep Climbing", next: "keepClimbing" }
    ]
  },

  throwRock: {
    text: [
      "You drop a loose stone into the well.",
      "Several seconds pass.",
      "Then a metallic CLANG echoes up from below."
    ],
    choices: [
      { label: "Investigate", next: "climbDown" },
      { label: "Leave", next: "leaveAnyway" }
    ]
  },

  followBugs: {
    text: [
      "Bugs circles the well once, then disappears behind a curtain of dead vines.",
      "You push the vines aside and discover a narrow tunnel hidden behind the stonework."
    ],
    choices: [
      { label: "Enter The Tunnel", next: "bugsTunnelEnding" },
      { label: "Call Bugs Back", next: "leaveAnyway" }
    ]
  },

  leaveAnyway: {
    text: [
      "You leave the well behind.",
      "Nothing follows you.",
      "Still, for the rest of the day, you cannot stop thinking about what might have been down there."
    ],
    ending: "The Road Not Taken"
  },

  openBox: {
    text: [
      "The iron box groans open.",
      "Inside rests a tarnished silver ring wrapped in rotted cloth.",
      "Bugs, somehow still at the top of the well, sneezes dramatically."
    ],
    ending: "The Forgotten Treasure"
  },

  keepClimbing: {
    text: [
      "You keep climbing until your boots touch the damp stone floor below.",
      "The whisper stops.",
      "The well is empty."
    ],
    ending: "Nothing But Darkness"
  },

  bugsTunnelEnding: {
    text: [
      "The tunnel opens into a small chamber beneath the well.",
      "Bugs sits proudly beside a pile of stolen chicken bones and one suspiciously shiny button.",
      "Whatever mystery lived here, Bugs has already claimed it."
    ],
    ending: "Better Than You"
  }
};

function startAdventure() {
  document.getElementById("startControls").innerHTML = "";
  document.getElementById("story").innerHTML = "";
  loadScene("start", false);
  saveGame();
}

function loadScene(sceneId, logChoice = true) {
  const scene = scenes[sceneId];

  if (!scene) {
    addToStory("ERROR: Scene not found: " + sceneId);
    saveGame();
    return;
  }

  if (logChoice) {
    addToStory("► " + getChoiceLabel(sceneId));
  }

  scene.text.forEach(line => addToStory(line));

  if (scene.ending) {
  document.getElementById("choices").innerHTML =
    "<h3>QUEST COMPLETE</h3>" +
    "<p>Ending: " + scene.ending + "</p>";

  updateQuestLog(scene.ending);
  saveGame();
  return;
}

  document.getElementById("choices").innerHTML = scene.choices
    .map(choice => {
      return '<button onclick="loadScene(\'' + choice.next + '\')">' + choice.label + '</button>';
    })
    .join("");

  saveGame();
}

function getChoiceLabel(sceneId) {
  const allScenes = Object.values(scenes);

  for (const scene of allScenes) {
    if (!scene.choices) continue;

    const match = scene.choices.find(choice => choice.next === sceneId);

    if (match) {
      return match.label;
    }
  }

  return "Continue";
}

function addToStory(text) {
  const story = document.getElementById("story");
  story.innerHTML += "<p>" + text + "</p>";
}

function saveGame() {
  const saveData = {
    story: document.getElementById("story").innerHTML,
    choices: document.getElementById("choices").innerHTML,
    result: document.getElementById("result").textContent,
    questStatus: document.getElementById("questStatus").textContent,
    knownEndings: document.getElementById("knownEndings").innerHTML,
    trailNotes: document.getElementById("trailNotes").textContent
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

function loadGame() {
  const savedGame = localStorage.getItem(SAVE_KEY);

  if (!savedGame) return;

  const saveData = JSON.parse(savedGame);

  document.getElementById("story").innerHTML = saveData.story;
  document.getElementById("choices").innerHTML = saveData.choices;
  document.getElementById("result").textContent = saveData.result || "--";

  if (saveData.questStatus) {
    document.getElementById("questStatus").textContent = saveData.questStatus;
  }

  if (saveData.knownEndings) {
    document.getElementById("knownEndings").innerHTML = saveData.knownEndings;
  }

  if (saveData.trailNotes) {
    document.getElementById("trailNotes").textContent = saveData.trailNotes;
  }
}

function updateQuestLog(endingName) {
  document.getElementById("questStatus").textContent = "Status: Complete";

  document.getElementById("knownEndings").innerHTML =
    "<li>" + endingName + "</li>";

  document.getElementById("trailNotes").textContent =
    "The Abandoned Well has been completed. The trail continues...";
}

function showView(viewId) {
  document.getElementById("adventureView").classList.add("hidden");
  document.getElementById("characterView").classList.add("hidden");
  document.getElementById("inventoryView").classList.add("hidden");
  document.getElementById("bugsView").classList.add("hidden");
  document.getElementById("questLogView").classList.add("hidden");

  document.getElementById(viewId).classList.remove("hidden");
}

function resetGame() {
  localStorage.removeItem(SAVE_KEY);

  document.getElementById("story").innerHTML =
    "<p>The trail continues...</p>";

  document.getElementById("choices").innerHTML = "";

  document.getElementById("result").textContent = "--";

  document.getElementById("questStatus").textContent =
    "Status: In Progress";

  document.getElementById("knownEndings").innerHTML =
    "<li>None recorded yet</li>";

  document.getElementById("trailNotes").textContent =
    "The trail has only just begun.";
}

window.onload = loadGame;
