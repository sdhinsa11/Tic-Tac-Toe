

// step 1: 

var gameBoard = (function(){

    //creating board
    let board = [[ " ", " ", " "],
                 [ " ", " ", " "],
                 [ " ",  " ", " "]];

    function displayBoard(){
        console.log("----------------------");
        for (let i = 0; i < 3; i++){
            let row = "|";
            for(let j = 0; j < 3; j++){
                row += board[i][j] ? `${board[i][j]} |` : "  |";
            }
            console.log(row);
            console.log("----------------------");
        }
    }

    function getBoard(){
        return board;
    }

    // function getCell(){
    //     let row = parseInt(prompt("Row Number (0-2): "));
    //     let col = parseInt(prompt("Col Number (0-2): "));
    //     return row, col;
    // }


    // get the value 

    function changeValue(row, col, player){
        // need the index (row and col and uses the player to determine the marker)
        if (board[row][col] === " "){
            board[row][col] = player;
        }
        else{
            console.log("Cannot go there"); 
        }
    }

    function resetBoard(){
        //reset the board
        board = [[ " ", " ", " "],
                 [ " ", " ", " "],
                 [ " ", " ", " "]];
    }

    function checkBoardH(marker){
        for (let row = 0 ; row < 3; row++){
            if (board[row][0] === marker && marker === board[row][1] && board[row][2] === marker){
                return true;
            }
        }
        return false;
    }

    function checkBoardV(marker){
        for (let col = 0 ; col < 3; col++){
            if (board[0][col] === marker && marker === board[1][col] && board[2][col] === marker){
                return true;
            }
        }
        return false;
        
    }

    function checkBoardD(marker){
        if (board[0][0] === marker && marker === board[1][1] && board[2][2] === marker){
            return true;
        }

        else if (board[0][2]=== marker && marker === board[1][1] && board[2][0] === marker){
            return true;
        }

        else{
            return false;
        }
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
        displayBoard: displayBoard,
        changeValue: changeValue,
        resetBoard: resetBoard,
        getBoard: getBoard,
        checkTies: checkTies,
        checkBoardD: checkBoardD,
        checkBoardV: checkBoardV,
        checkBoardH: checkBoardH,

    };

})();


// using an object constructor cause we have a specific type of object that we need to duplicate (can add functions)
function Player(name, marker){
    this.name = name;
    this.marker = marker; 
    this.points = 0; // after every round this will get updated 
}

var game = (function(){

    function inputPlayer(){
        var pName = prompt("Enter Player name:");
        var pMarker = prompt("Enter X or O");
        return new Player(pName, pMarker);
        // input players 
    }

    function playGame(playerOne, playerTwo){

        // make board instance
        let boardInstance = gameBoard;
        let gameOver = false;
        let currentPlayer = playerOne;


        // this is the function
        //press yes or no to start (use while loop)
        while(!gameOver){
            boardInstance.displayBoard();

            console.log(`${currentPlayer.name} choose a cell:`);
            let row = parseInt(prompt("Row Number (0-2): "));
            let col = parseInt(prompt("Col Number (0-2): "));

            boardInstance.changeValue(row, col, currentPlayer.marker);
            boardInstance.displayBoard();


            if (boardInstance.checkBoardV(currentPlayer.marker)){
                console.log(`${currentPlayer.name} wins!`);
                currentPlayer.points++;
                gameOver = true;
            }
            else if (boardInstance.checkBoardH(currentPlayer.marker)){
                console.log(`${currentPlayer.name} wins!`);
                currentPlayer.points++;
                gameOver = true;
            }

            else if (boardInstance.checkBoardD(currentPlayer.marker)){
                console.log(`${currentPlayer.name} win!`);
                currentPlayer.points++;
                gameOver = true;
            }

            else if (boardInstance.checkTies()){
                console.log("Its a tie");
                gameOver = true;
            }

            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
        }

        let playAgain = prompt("Do you want to play again? (Y/N: ");
        if (playAgain === "Y")
            {
                boardInstance.resetBoard();
                playGame(playerOne, playerTwo);
            }
        else{
            console.log("Game is done!");
            console.log(`${playerOne.name} has ${playerOne.points} points.`);
            console.log(`${playerTwo.name} has ${playerTwo.points} points.`);
        }


    }

    return {
        inputPlayer: inputPlayer,
        playGame: playGame,
    };

})();


playerOne = new game.inputPlayer();
playerTwo = new game.inputPlayer();

game.playGame(playerOne, playerTwo);





