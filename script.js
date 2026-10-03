//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const winnerMessage = document.getElementById("winnerMessage");

//Track attendance
let count = 0;
const maxCount = 50;
let greetingTimeout;

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get form values
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].textContent;

  if (name === "" || team === "") {
    return;
  }

  //Increment count
  count++;

  //Update total count and progress bar
  const percentage = Math.round((count / maxCount) * 100);
  attendeeCount.textContent = count;
  progressBar.style.width = `${percentage}%`;

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = Number(teamCounter.textContent) + 1;

  if (count === maxCount) {
    const waterCount = Number(document.getElementById("waterCount").textContent);
    const zeroCount = Number(document.getElementById("zeroCount").textContent);
    const powerCount = Number(document.getElementById("powerCount").textContent);
    const highestTeamCount = Math.max(waterCount, zeroCount, powerCount);
    const winningTeams = [];

    if (waterCount === highestTeamCount) {
      winningTeams.push("Team Water Wise");
    }
    if (zeroCount === highestTeamCount) {
      winningTeams.push("Team Net Zero");
    }
    if (powerCount === highestTeamCount) {
      winningTeams.push("Team Renewables");
    }

    const winnerStatus =
      winningTeams.length > 1 ? "are the co-winners" : "is the winner";
    winnerMessage.textContent =
      `🏆 Attendance goal reached! ${winningTeams.join(" and ")} ${winnerStatus}!`;
    winnerMessage.classList.add("winner-message-visible");
  }

  //Show welcome message
  const message = `🎉 Welcome, ${name}! You are checked in with ${teamName}.`;
  greeting.textContent = message;
  greeting.classList.add("success-message");

  clearTimeout(greetingTimeout);
  greetingTimeout = setTimeout(function () {
    greeting.classList.remove("success-message");
    greeting.textContent = "";
  }, 5000);

  form.reset();
});