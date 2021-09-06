document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");

    let href = window.location.href;
    let level = href.split("/").pop();

    let easy = 8,
        medium = 10,
        hard = 15;
    let easy_flag = 16,
        medium_flag = 25,
        hard_flag = 56;

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

    let flags = 0;
    let squares = [];
    let isGameOver = false;
    let isClick = false;

    function createBoard() {
        //get shuffled game array with random bombs
        const bombsArray = Array(bombAmount).fill("bomb");
        const emptyArray = Array(width * width - bombAmount).fill("valid");
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.setAttribute("id", i);
            square.classList.add(level);
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
                console.log("here");
                addFlag(square);
            };
        }
    }

    createBoard();
    console.log(squares);
    //add Flag with right click
    function addFlag(square) {
        console.log("here");

        if (isGameOver) return;
        if (!square.classList.contains("checked") && flags < bombAmount) {
            if (!square.classList.contains("flag")) {
                square.classList.add("flag");
                square.innerHTML = " 🚩";
                flags++;
                checkForWin();
            } else {
                square.classList.remove("flag");
                square.innerHTML = "";
                flags--;
            }
        }
    }

    //click on square actions
    function click(square) {
        let currentId = parseInt(square.id);
        if (isGameOver) return;
        if (
            square.classList.contains("checked") ||
            square.classList.contains("flag")
        )
            return;
        if (!isClick && square.classList.contains("bomb")) {
            square.classList.remove("bomb");
            square.classList.add("valid");
            isClick = true;
            bombAmount--;
            squares[currentId] = square;
        }
        if (square.classList.contains("bomb")) {
            console.log("here");
            gameOver(square);
        } else {
            let total = check_num_bombs(currentId); //(number of bombs around)
            if (total != 0) {
                square.classList.add("checked");
                let classes = [
                    "",
                    "one",
                    "two",
                    "three",
                    "four",
                    "five",
                    "six",
                    "seven",
                    "eight",
                ];
                square.classList.add(classes[total]);
                square.innerHTML = total;
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add("checked");
    }

    function checkSquare(square, currentId) {
        const isLeftEdge = currentId % width === 0;
        const isRightEdge = currentId % width === width - 1;

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                //const newId = parseInt(currentId) - 1   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > width - 1 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id;
                //const newId = parseInt(currentId) +1 -width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > width - 1) {
                const newId = squares[parseInt(currentId - width)].id;
                //const newId = parseInt(currentId) -width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > width && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id;
                //const newId = parseInt(currentId) -1 -width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < width * width - 1 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1].id;
                //const newId = parseInt(currentId) +1   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < width * width - width && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id;
                //const newId = parseInt(currentId) -1 +width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < width * width - width - 1 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                //const newId = parseInt(currentId) +1 +width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < width * width - width) {
                const newId = squares[parseInt(currentId) + width].id;
                //const newId = parseInt(currentId) +width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
    }

    function check_num_bombs(i) {
        let total = 0;
        const isLeftEdge = i % width === 0;
        const isRightEdge = i % width === width - 1;
        // a b c  / a + b
        // d + e
        // f g h
        if (squares[i].classList.contains("valid")) {
            // checking for d
            if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
                total++;
            if (
                i > width - 1 &&
                !isRightEdge &&
                squares[i + 1 - width].classList.contains("bomb")
            )
                total++;
            if (i > width - 1 && squares[i - width].classList.contains("bomb"))
                total++;
            if (
                i > width &&
                !isLeftEdge &&
                squares[i - 1 - width].classList.contains("bomb")
            )
                total++;
            if (
                i < width * width - 1 &&
                !isRightEdge &&
                squares[i + 1].classList.contains("bomb")
            )
                total++;
            if (
                i < width * width - width &&
                !isLeftEdge &&
                squares[i - 1 + width].classList.contains("bomb")
            )
                total++;
            if (
                i < width * width - width - 1 &&
                !isRightEdge &&
                squares[i + 1 + width].classList.contains("bomb")
            )
                total++;
            if (
                i < width * width - width &&
                squares[i + width].classList.contains("bomb")
            )
                total++;
        }
        return total;
    }

    function gameOver(square) {
        isGameOver = true;

        //show ALL the bombs
        squares.forEach((square) => {
            if (square.classList.contains("bomb")) {
                square.innerHTML = "💣";
                square.classList.remove("bomb");
                square.classList.add("checked");
            }
        });
    }

    //check for win
    function checkForWin() {
        ///simplified win argument
        let matches = 0;

        for (let i = 0; i < squares.length; i++) {
            if (
                squares[i].classList.contains("flag") &&
                squares[i].classList.contains("bomb")
            ) {
                matches++;
            }
            if (matches === bombAmount) {
                isGameOver = true;
            }
        }
    }
});