function Player(name, marker, turn){
    this.name = name;
    this.marker= marker,
    this.turn = turn
};

function Gameboard(){
    this.gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.checkWinnings = function(marker){
        const winningCombinations = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];
                
        return winningCombinations.some(([a, b, c]) => 
            this.gameboard[a].toString() === marker &&
            this.gameboard[b].toString() === marker &&
            this.gameboard[c].toString() === marker
        );
    }

    this.checkTies = function(){
        let allUsed = this.gameboard.every(myFunction);
        function myFunction(value) {
            return value == 'X' || value == 'O';
        }

        return allUsed;
    }

    this.checkPosition = function(playerInput){
        
        if (this.gameboard[playerInput] == "X" ||this.gameboard[playerInput] == 'O'){
            console.log("You can't go there");
            return false;
        } 

        console.log("Passed");

        return true;
    }

    this.playerTurn = function(marker, index){
        this.gameboard[index] = marker;
    }

    this.resetBoard = function(){
       this.gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
}

function DomInteraction(gameboard){
    this.gameboard = gameboard;

    this.printBoard = function() {

        const container = document.querySelector(".board");
        container.innerHTML = ``;
        this.gameboard.forEach((pos, index) => {
            const position = document.createElement('div');
            position.classList.add('pos');
            position.dataset.index = index;
            position.innerHTML = this.gameboard[index] == "X" || this.gameboard[index] == "O" ?`<h2>${this.gameboard[index]}</h2>` : `<h2></h2>`;

            container.appendChild(position);
        });  
    };

    // in place of prompt
    this.cellInteraction = function(){
        var lastClickedIndex; 
        const grid = document.querySelectorAll('.board');
        grid.forEach((cell, index) => {
            cell.addEventListener('click', ()=>{
                lastClickedIndex = index;
            });
        });

        return lastClickedIndex;
    }

    // in place of all the player logs
    this.displayPlayer = function(playerName){
        const playerTitle = document.querySelector('#gameText');
        playerTitle.innerHTML = `${playerName}'s turn`
    }

    this.displayWinner = function(playerName){
        const playerTitle = document.querySelector('#gameText');
        playerTitle.innerHTML = `${playerName} won the game!`

    }

    this.displayTie = function(){
        const playerTitle = document.querySelector('#gameText');
        playerTitle.innerHTML = `Game was a tie.`
    }

    this.displayButtons = function(){
        document.getElementById("playAgain").style.visibility = "visible";
        document.getElementById("restart").style.visibility = "visible";

        document.getElementById("restart").addEventListener("click", () =>{
            window.location.reload();
        });

        document.getElementById("playAgain").addEventListener("click", () =>{
            gameEnd= false;
        });
    }

    this.resetBoard = function(){
        this.gameboard = [1,2,3,4,5,6,7,8,9];
    }

}

function gameLogic(player1, player2){
    document.getElementById("playAgain").style.visibility = "hidden";
    document.getElementById("restart").style.visibility = "hidden";

    var player1 = player1;
    var player2 = player2;

    var board = new Gameboard();
    var dom = new DomInteraction(board.gameboard);

    var gameEnd = false;
    var turn = 1;

    dom.printBoard();
    dom.displayPlayer(turn == 1? player1.name : player2.name);


    document.querySelector(".board").addEventListener("click", (event) =>{
        if (gameEnd) return;
        var playerInput = parseInt(event.target.dataset.index);

        if (board.checkPosition(playerInput)){

            if (turn == 1){
                board.playerTurn(player1.marker, playerInput)
                dom.printBoard();
                
                if (board.checkWinnings(player1.marker)){
                    gameEnd = true;
                    dom.displayWinner(player1.name);
                    console.log("Game over.");
                    dom.displayButtons();

                }
                else{
                    turn = 2;
                    dom.displayPlayer(turn == 1? player1.name : player2.name);
                }
                
            }
            else{
                board.playerTurn(player2.marker, playerInput)
                dom.printBoard();
                
                if (board.checkWinnings(player2.marker)){
                    gameEnd = true;
                    dom.displayWinner(player2.name);
                    console.log("Game over.");
                    dom.displayButtons();
                    
                }
                else{
                    turn = 1;
                    dom.displayPlayer(turn == 1? player1.name : player2.name);

                }
            }
        
            if (!board.checkWinnings("X") && !board.checkWinnings("O")){
                if (board.checkTies()){
                    gameEnd = true;
                    dom.displayTie();
                    dom.displayButtons();
                }
            }

        }
        else{
            alert("Please enter again");
            console.log("Please enter again.");
        }
    

    })
}


// ALL IN factory pattern IIFE 

(function () {

    var player1, player2;

    document.getElementById("start").addEventListener("click", ()=>{
        player1 = new Player(document.getElementById("player1").value, 'X', 1);
        player2 = new Player(document.getElementById("player2").value, 'O', 2);

        document.getElementById("playerInput").style.visibility = "hidden";
        
        document.getElementById("gameText").style.visibility = "visible";
        document.querySelector(".board").style.visibility = "visible";

        gameLogic(player1, player2);
        
    });

    document.getElementById("playAgain").addEventListener("click", ()=>{
        gameLogic(player1, player2);
        
    });
    
})();






