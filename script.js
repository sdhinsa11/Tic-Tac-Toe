

// step 1: 

var gameBoard = (function(){

    //creating board
    let board = [[ null, null,null],
                 [ null, null, null],
                 [ null, null, null]];

    function displayBoard(){
        for (let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                console.log(board[i][j]);
            }
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
        if (!board[row][col]){
            board[row][col] = player.marker;
        }
        else{
            console.log("Cannot go there"); 
        }
    }

    function resetBoard(){
        //reset the board
        board = [[ null, null,null],
        [ null, null, null],
        [ null, null, null]];
    }

    // modify the board 

    return{
        displayBoard: displayBoard,
        changeValue: changeValue,
        resetBoard: resetBoard,
        getBoard: getBoard,
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
        var pName = prompt("Enter Player 1 name:");
        var pMarker = prompt("Enter X or O");
        return Player(pName, pMarker);
        // input players 
    }

    function checkBoardH(b, marker){
        for (let row = 0 ; row < 3; row++){
            if (b[row][0] === marker && marker === b[row][1] && b[row][2] === marker){
                return true;
            }
            else{
                return false;
            }
        }
    }

    function checkBoardV(b, marker){
        for (let col = 0 ; col < 3; col++){
            if (b[0][col] === marker && marker === b[1][col] && b[2][col] === marker){
                return true;
            }
            else{
                return false;
            }
        }
        
    }

    function checkBoardD(b, marker){
        if (b[0][0] === marker && marker === b[1][1] && b[2][2] === marker){
            return true;
        }

        else if (b[0][2]=== marker && marker === b[1][1] && b[2][0] === marker){
            return true;
        }

        else{
            return false;
        }
    }

    function checkTies(b){
        for (let row of board){
            for(let cell of row){
                if (cell === null){
                    return false; // still empty
                }
            }
        }
        return true; // no empty spots
        
    }

    function check(b){
        //combine them all together 
    }


    
    function playGame(playerOne, playerTwo){

        // need to put these outside in glpbal code so that the players dont restart
        // call input players

        // make board instance
        let board = gameBoard.getBoard;
        let gameOver = false;
        currentPlayer = playerOne;


        // this is the function
        //press yes or no to start (use while loop)
        while(!gameOver){
            board.displayBoard;

            console.log("${currentPlayer.name} choose a cell: ");
            let row = parseInt(prompt("Row Number (0-2): "));
            let col = parseInt(prompt("Col Number (0-2): "));

            gameBoard.changeValue(row, col, currentPlayer.marker);
            gameBoard.displayBoard();

            if (checkBoardD(board, currentPlayer.marker)){
                console.log("${currentPlayer} wins!");
                currentPlayer.points++;
                gameOver = true;
            }
            else if (checkBoardH(board, currentPlayer.marker)){
                console.log("${currentPlayer} wins!");
                currentPlayer.points++;
                gameOver = true;
            }

            else if (checkBoardD(board, currentPlayer.marker)){
                console.log("${currentPlayer} wins!");
                currentPlayer.points++;
                gameOver = true;
            }

            else if (checkTies(board)){
                gameOver = true;
            }

            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
        }

        let playAgain = prompt("Do you want to play again? (Y/N: ");
        if (playAgain === "Y")
            {
                playGame(playerOne, playerTwo);
            }
        else{
            console.log("Game is done!");
        }

        // if winner/tie then aks to play again if true then it loops back and resets everything if not then it just exits out 
        // players and markers dont reset if it gets added but if X won or O won then we add a point to that persons marker

    }

    return {
        inputPlayer: inputPlayer,
        checkBoardD: checkBoardH,
        checkBoardV: checkBoardV,
        checkBoardD: checkBoardD,
        checkTies: checkTies,
        inputPlayer: inputPlayer,
        playGame: playGame,
    };

})();


playerOne = game.inputPlayer();
playerTwo = game.inputPlayer();

game.playGame(playerOne, playerTwo);



    // checks if there is a 3 in a row of X's or O's (so we need our own function for that)
    // game controller

    //winning function (check one there is atleast 3 pieces
    // ties






