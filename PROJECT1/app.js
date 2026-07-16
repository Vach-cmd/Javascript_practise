let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    turnIndicator.innerText = "Player O's Turn";
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o-mark");
            turnO = false;
            turnIndicator.innerText = "Player X's Turn";
        } else {
            box.innerText = "X";
            box.classList.add("x-mark");
            turnO = true;
            turnIndicator.innerText = "Player O's Turn";
        }
        box.disabled = true;

        if (!checkWinner()) {
            checkDraw();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-mark", "o-mark");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    turnIndicator.innerText = "";
};

const checkDraw = () => {
    let allFilled = [...boxes].every(box => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        turnIndicator.innerText = "";
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
