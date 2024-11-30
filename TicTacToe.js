let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let drawMsg = document.querySelector("#draw");

let turnX = true;

const resetGame = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    drawMsg.classList.add("hide");
};

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Only proceed if the box is empty
            if (turnX) {
                box.innerText = "X";
                turnX = false;
            } else {
                box.innerText = "O";
                turnX = true;
            }
            box.disabled = true;

            if (!checkWinner()) {
                checkDraw();
            }
        }
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    drawMsg.classList.add("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true; // Return true if there's a winner
            }
        }
    }
    return false; // Return false if no winner
};

const checkDraw = () => {
    let allFilled = true;

    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        drawMsg.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
