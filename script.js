

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

    // function getCell(row, col){
    //     return board[row][col];
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
    }

    // modify the board 

    return{
        displayBoard: displayBoard,
        changeValue: changeValue,

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
        // input players 
    }

    function checkBoardH(b){
        // check board horizontal
    }

    function checkBoardV(b){
        // check board vetical
    }

    function checkBoardD(b){
        // check board diagonally
    }

    function checkTies(b){
        
    }

    function check(b){
        //combine them all together 
    }

    
    function game(){
        // call input players 

        // make board instance



        //press yes or no to start (use while loop)
        
        //player1 goes ( ask player to type in a cell number and call the thing, if invalid then try again)
        // same thing for 2 

        // call the check function 

        // if winner/tie then aks to play again if true then it loops back and resets everything if not then it just exits out 
        // players and markers dont reset if it gets added but if X won or O won then we add a point to that persons marker

        
    }

    return {game: game};



})();

    // checks if there is a 3 in a row of X's or O's (so we need our own function for that)
    // game controller

    //winning function (check one there is atleast 3 pieces
    // ties






