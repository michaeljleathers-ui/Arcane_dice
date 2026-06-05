function rollDice(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  document.getElementById("result").textContent = result;
}
function startAdventure() {
  document.getElementById("story").innerHTML =
    "You stand before an abandoned stone well.<br><br>" +
    "The wind is still.<br><br>" +
    "Bugs stares into the darkness below.";

  document.getElementById("choices").innerHTML =
    '<button onclick="lookDown()">Look Into The Well</button>' +
    '<button onclick="walkAway()">Walk Away</button>';
}

function lookDown() {
  document.getElementById("story").textContent =
    "You lean over the edge of the well. Far below, something shifts in the dark.";

  document.getElementById("choices").innerHTML =
    '<button onclick="startAdventure()">Back To The Well</button>';
}

function walkAway() {
  document.getElementById("story").textContent =
    "You decide this is absolutely someone else's problem. Bugs judges you silently.";

  document.getElementById("choices").innerHTML =
    '<button onclick="startAdventure()">Return To The Well</button>';
}
}
