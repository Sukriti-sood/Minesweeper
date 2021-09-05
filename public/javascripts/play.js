document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    let board_width = board.clientWidth;
    let href = window.location.href;
    let level = href.split("/").pop();

    let easy = 8,
        medium = 20,
        hard = 25;
    let easy_flag = 20,
        medium_flag = 100,
        hard_flag = 200;

    let width, bombAmount;
    if (level == "easy") {
        bombAmount = easy_flag;
        width = easy;
    } else if (level == "medium") {
        bombAmount = medium_flag;
        width = medium;
    } else {
        bombAmount = hard_flag;
        width = hard;
    }
    let square_width = board_width / width + "px";

    let flags = 0;
    let squares = [];
    let isGameOver = false;

    function createBoard() {
        //get shuffled game array with random bombs
        const bombsArray = Array(bombAmount).fill("bomb");
        const emptyArray = Array(width * width - bombAmount).fill("valid");
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.style.width = square_width;
            square.style.height = square_width;
            square.setAttribute("id", i);
            square.classList.add(shuffledArray[i]);
            board.appendChild(square);
            squares.push(square);

            //normal click
            square.addEventListener("click", function(e) {
                click(square);
            });

            //cntrl and left click
            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square);
            };
        }
    }

    //add numbers
    for (let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftEdge = i % width === 0;
        const isRightEdge = i % width === width - 1;

        if (squares[i].classList.contains("valid")) {
            if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
                total++;
            if (
                i > 9 &&
                !isRightEdge &&
                squares[i + 1 - width].classList.contains("bomb")
            )
                total++;
            if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
            if (
                i > 11 &&
                !isLeftEdge &&
                squares[i - 1 - width].classList.contains("bomb")
            )
                total++;
            if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
                total++;
            if (
                i < 90 &&
                !isLeftEdge &&
                squares[i - 1 + width].classList.contains("bomb")
            )
                total++;
            if (
                i < 88 &&
                !isRightEdge &&
                squares[i + 1 + width].classList.contains("bomb")
            )
                total++;
            if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
            squares[i].setAttribute("data", total);
        }
    }
});