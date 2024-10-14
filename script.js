const choices = ["rock", "paper", "scissors"];
const resultText = document.getElementById("result-text");
const userScore = document.getElementById("user-score");
const compScore = document.getElementById("comp-score");
const buttons = document.querySelectorAll(".choice");
const score = [0,0];

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const userChoice = button.id;
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        determineWinner(userChoice, computerChoice);
    });
});

function determineWinner(user, computer) {
    if (user === computer) {
        resultText.textContent = `It's a tie! Both chose ${user}.`;
    } else if (
        (user === "rock" && computer === "scissors") ||
        (user === "scissors" && computer === "paper") ||
        (user === "paper" && computer === "rock")
    ) {
        resultText.textContent = `You win! ${user} beats ${computer}.`;
        score[0] ++;
    } else {
        resultText.textContent = `You lose! ${computer} beats ${user}.`;
        score[1] ++;
    }
    userScore.textContent = score[0];
    compScore.textContent = score[1];
}

document.getElementById("reset").addEventListener("click", () => {
    resultText.textContent = "";
    score = [0,0];
    userScore.textContent = score[0];
    compScore.textContent = score[1];

});
