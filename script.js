let boxes = document.querySelectorAll(".box");
let boxtext = document.querySelectorAll(".boxtext");
let firstplayerturn = "X";
let secondplayerturn = "O";
let currentplayer = "X";
let gameActive = true;
let gameBoard =["","","","","","","","",""];
let result = document.querySelector(".r");
let playAgain = document.querySelector(".playagain");
let reset = document.querySelector(".reset");
let playAgain1 = document.querySelector(".playagain1");
let reset1 = document.querySelector(".reset1");
let playAgain2 = document.querySelector(".playagain2");
let reset2 = document.querySelector(".reset2");
let popup = document.querySelector(".popup");
let popupContent = document.querySelector(".popupContent");
let popup1 = document.querySelector(".popup1");
let play = document.querySelector(".play");
let winnerAnnouncement = document.querySelector(".announcement");
let player1name = document.querySelector(".p1");
let player2name = document.querySelector(".p2");
let firstplayername="";
let secondplayername="";
let counter = 0;
let winCounter1 = 0;
let winCounter2 = 0;
let gameNo = document.querySelector(".gameNo");
let table = document.querySelector(".table");
let winnerName = "";
let noOfDraws = 0;
let turnAudio = new Audio("turnchange.wav");
let winAudio = new Audio("winning.wav");
let drawAudio = new Audio("draw.wav");
let winGif = document.querySelector(".gif");





// Functions
function toggleplayer(){
    currentplayer = currentplayer==="X" ? "O" : "X";
    turnAudio.play();
}

function turnText(){
    if(currentplayer==="X")
    {
        result.innerHTML=`Turn for ${firstplayername}`;
    }
    else{
        result.innerHTML=`Turn for ${secondplayername}`;
    }
}

function win(){
    winningcombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let x of winningcombinations){
        [a,b,c] = x;
        if(gameBoard[a]!="" && gameBoard[a]===gameBoard[b] && gameBoard[b]===gameBoard[c]){
            
            if(currentplayer==="X")
            {winnerAnnouncement.innerHTML=`${firstplayername} wins`;
            winCounter1++;
            player1name.innerHTML=`${firstplayername}      ${winCounter1}  :    ${winCounter2}       ${secondplayername} `;
            winnerName = firstplayername;}
            else{
                winnerAnnouncement.innerHTML=`${secondplayername} wins`;
                winCounter2++;  
                player1name.innerHTML=`${firstplayername}      ${winCounter1}  :    ${winCounter2}       ${secondplayername} `
                // player2name.innerHTML=`${secondplayername}: ${winCounter2 }`; 
                winnerName = secondplayername;
            }
            
            gameActive=false;
            winAudio.play();
            popup.style.display="flex";
            
            
            
            
            
           
            
            
        }
        
    }
}
function draw(){
    let isBoardFull = gameBoard.every(cell=>cell!="");
    if(isBoardFull && !win()){
        winnerAnnouncement.innerHTML=`Game is Drawn`;
        noOfDraws++;
        winnerName="Game Draw";
        gameActive=false; 
        popup.style.display="flex";
        drawAudio.play();
    }
}
function playAgainbutton(){
    gameActive=true;
    if(counter%2===0)
    {
      currentplayer=secondplayerturn;
    }
    else{
        currentplayer=firstplayerturn;
    }
    
    counter++;
    gameNo.innerHTML=`Game No. : ${counter + 1}*`
    addTableRow(counter,winnerName ,noOfDraws);
    gameBoard =["","","","","","","","",""];
    boxes.forEach(box=>{
        box.innerHTML="";
        })
        result.innerHTML= "";     
    }  



function resetbutton(){
    gameActive=true;
    currentplayer=firstplayerturn;
    gameBoard =["","","","","","","","",""];
    boxes.forEach(box=>{
        box.innerHTML="";
        })
        result.innerHTML= "";     
        winCounter1 = 0;
        winCounter2 = 0;
        counter=0;
        noOfDraws=0;
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
      
    
}

function addTableRow(gameNo, winner, draws) {
    let newRow = table.insertRow();
  
    let gameNoCell = newRow.insertCell();
    gameNoCell.textContent = gameNo;
  
    let winnerCell = newRow.insertCell();
    winnerCell.textContent = winner;
  
    let drawsCell = newRow.insertCell();
    drawsCell.textContent = draws;
  }
  




// Event Listeners
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        if(gameActive && gameBoard[index] === "" ) {
            box.innerHTML= currentplayer;
            gameBoard[index]=currentplayer;
            draw();
            win();
            toggleplayer();
            turnText();
        }
        
        })
})

playAgain.addEventListener("click",()=>{
    playAgainbutton();  
    turnText();           
       
})


reset.addEventListener("click",()=>{
    resetbutton();
    popup1.style.display="flex";  
    result.innerHTML=`Turn for ${firstplayername}`;
    winAudio.pause();
})

playAgain1.addEventListener("click",()=>{
    playAgainbutton();    
    popup.style.display="none";
    
    turnText();
    winAudio.pause();
    
       
})


reset1.addEventListener("click",()=>{
    resetbutton();
    popup.style.display="none";
    popup1.style.display="flex";  
    result.innerHTML=`Turn for ${firstplayername}`;
})


play.addEventListener("click",()=>{
     firstplayername = document.querySelector("#fpn").value ;
     secondplayername = document.querySelector("#spn").value ;
    resetbutton(); 
    popup1.style.display="none";
    result.innerHTML=`Turn for ${firstplayername}`;
    gameNo.innerHTML=`Game No. : ${counter + 1}*`;
    player1name.innerHTML=`${firstplayername}      ${winCounter1}  :    ${winCounter2}       ${secondplayername} `
    
    
})




