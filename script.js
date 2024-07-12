
var gameBoard = (function(){

    //creating board
    let board = [[" ", " ", " "],
                 [" ", " ", " "],
                 [" ",  " ", " "]];

    function getBoard(){
        return board;
    }

    // get the value 

    function changeValue(row, col, player){
        // need the index (row and col and uses the player to determine the marker)
        if (board[row][col] === " "){
            board[row][col] = player;
            return true;
        }
        
        return false;
        
    }

    function resetBoard(){
        //reset the board
        board = [[ " ", " ", " "],
                 [ " ", " ", " "],
                 [ " ", " ", " "]];
    }

    function checkWins(marker){
        for (let pos = 0 ; pos < 3; pos++){
            if (board[pos][0] === marker && marker === board[pos][1] && board[pos][2] === marker){
                return true;
            }
            else if (board[0][pos] === marker && marker === board[1][pos] && board[2][pos] === marker){
                return true;
            }
        }
        if (board[0][0] === marker && marker === board[1][1] && board[2][2] === marker){
            return true;
        }

        else if (board[0][2]=== marker && marker === board[1][1] && board[2][0] === marker){
            return true;
        }
        return false;
    }


    function checkTies(){
        for (let row of board){
            for(let cell of row){
                if (cell === " "){
                    return false; // still empty
                }
            }
        }
        return true; // no empty spots
    }

    // modify the board 

    return{
        changeValue: changeValue,
        resetBoard: resetBoard,
        getBoard: getBoard,
        checkTies: checkTies,
        checkWins: checkWins,

    };

})();

// using an object constructor cause we have a specific type of object that we need to duplicate (can add functions)
function Player(name, marker){
    this.name = name;
    this.marker = marker; 
    this.points = 0; // after every round this will get updated 
}

var game = (function(){
    // defing the players 
    let playerOne;
    let playerTwo;
    let boardInstance = gameBoard;
    let currentPlayer;

    let info = document.querySelector(".display");



    function startGame(pOne, pTwo){
        playerOne = new Player(pOne, "X");
        playerTwo = new Player(pTwo, "O");

        currentPlayer = playerOne;
        info.textContent = `${currentPlayer.name}'s turn`;

        boardInstance.resetBoard();
    }

    function switchPlayer(){
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
        info.textContent = `${currentPlayer.name}'s turn`;
        // call the other display the players turn 

    }

    function playGame(row, col){

        if (boardInstance.changeValue(row, col, currentPlayer.marker)){
            if (boardInstance.checkWins(currentPlayer.marker)){
                currentPlayer.points++;
                display.displayEnd(currentPlayer.name);
            }
            else if (boardInstance.checkTies()){
                display.displayTie();
            }
            switchPlayer();
        }   
    }

    return {
        startGame: startGame,
        playGame: playGame,
    };

})();


var display = (function(){

    // grab the values for the functions
    
    let onScreenBoard = document.querySelector(".board");
    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    const playAgain = document.getElementById("playAgain");
    const mainSection = document.querySelector(".main");
    const homeSection = document.querySelector(".home");
    const result = document.querySelector(".result");
    const dialog = document.querySelector("dialog");
    const info = document.querySelector(".display");

    const pOne = document.getElementById("player1");
    const pTwo = document.getElementById("player2");
    

    function render(){
        let boardArray = gameBoard.getBoard();
        // take list and turns it into the dom based on what the stages are at its point rn 

        onScreenBoard.innerHTML = '';

        // Set grid layout for onScreenBoard - NEED to fix it
        onScreenBoard.style.display = 'grid';
        onScreenBoard.style.gridTemplateColumns = 'repeat(3, 90px)';
        onScreenBoard.style.gap = '10px'; 

        boardArray.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                let button = document.createElement('button');
                button.textContent = cell;
                button.style.border = '1px solid black';
                button.style.borderRadius = '5px';
                button.style.height = '80px';
                button.style.width = '80px';
                button.style.fontSize= '20px';
                button.style.fontWeight = 'bold';

                onScreenBoard.appendChild(button);

                button.dataset.row = rowIndex;
                button.dataset.column = colIndex;
            });   
        });

        onScreenBoard.querySelectorAll('button').forEach(button =>{
            button.addEventListener('click', handleClick);
        });

    }


    function handleClick(event){
        let rowIndex = event.target.dataset.row;
        let colIndex = event.target.dataset.column;

        rowIndex = parseInt(rowIndex);
        colIndex = parseInt(colIndex);

        game.playGame(rowIndex, colIndex);
        render();

    };


    startButton.addEventListener("click", function(){
        const pOneName = pOne.value;
        const pTwoName = pTwo.value;
        game.startGame(pOneName, pTwoName);

        info.style.display = 'flex'

        homeSection.style.display = 'none';
        render();

       

        //get container
        
    })

    playAgain.addEventListener("click", function(){
        const pOneName = pOne.value;
        const pTwoName = pTwo.value;
        gameBoard.resetBoard();
        render();
        game.startGame(pOneName, pTwoName);
        dialog.close();

    })

    restartButton.addEventListener("click", function(){
        window.location.reload();

    })

    function displayEnd(name){
        result.textContent = `${name} Wins!`;
        dialog.showModal();
    }

    function displayTie(){
        result.textContent = 'Game is a tie!';
        dialog.showModal();
    }


    return{
        render: render,
        handleClick: handleClick,
        displayEnd: displayEnd,
        displayTie: displayTie,
    };

})();







