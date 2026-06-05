function rollDice(sides) {
  const result = Math.floor(Math.random() * sides) + 1;
  document.getElementById("result").textContent = result;
}
function startAdventure() {
    document.getElementById("story").textContent =
        "You stand before an abandoned stone well. The wind is still. Bugs stares into the darkness below.";
}
