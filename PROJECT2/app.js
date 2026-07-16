let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawGame = () => {
    console.log("game was draw.");
    msg.innerText = "Game was Draw. Play again";
    msg.style.backgroundColor = "blue";
};

const showWinner = (UserWin, userChoice,compChoice) => {
    if (UserWin){
        userScore++;
        userScorePara.innerText = userScore;
        console.log("you win!");
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {        
        compScore++;
        compScorePara.innerText = compScore;
        console.log("you lose");
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const playGame = (UserChoice) => {
    console.log( "user choice =", UserChoice);
    //Generate computer choice
    const compChoice = genCompChoice();
    console.log("comp choice =" , compChoice);

    if(UserChoice === compChoice){
         //Draw Game
        drawGame();
    }else{
        let UserWin = true;
        if(UserChoice === "rock") {
            //scissors , paper
            UserWin = compChoice === "paper" ? false :true;
        }else if (UserChoice === "paper") {
            //rock, scissors
            UserWin = compChoice === "scissors" ? false : true;
        }else{
            //rock, paper
            UserWin = compChoice === "rock" ? false : true;
        }
        showWinner(UserWin, UserChoice,compChoice);
    }
};

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click",  () => {
        const UserChoice = choice.getAttribute("id");
        playGame(UserChoice);
    });
});
