let maingamediv = document.getElementsByClassName("main-game")[0];
let gamebtn = document.getElementById("playGame");
let winDiv= document.getElementsByClassName('popup')[0];
let popupHeading = document.getElementById("popupHeading");
let popupConfirnBtn = document.getElementById("popupBtnConfirm");
let popupRejectBtn = document.getElementById("popupBtnReject");
var audio= new Audio("success-fanfare-trumpets-6185.mp3");
var correctAudio= new Audio("correct.mp3")
var IncorrectAudio=  new Audio("surprised-child.mp3");
let count = 0;
let xWins = false;
let player1 ;
let player2 ;


//game continue function
function reloadGame(){
  //maingamediv.style.display="block";
  // winDiv.style.display="none";
  // generateGameGrid();
  location.reload();
}


// WInning window pop up

function winpop(){

  winDiv.style.display="block";
  maingamediv.style.display="none";
  if(xWins == true){

   
    //console.log(player1.value);
     popupHeading.innerText= "Winner"+"    " +player1.value;
    //  popupHeading2.innerText= "Dou You Want To continue";
  }
  else{
    popupHeading.innerText= "Winner"+"     " +player2.value;
  }
}


// GAame WIN lOGIC

function winGame(){

  let colEle = document.getElementsByClassName('gridColumn');
  let wins =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,7,4],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  wins.forEach(element => {
    console.log("win game called");
    if((colEle[element[0]].innerText === colEle[element[1]].innerText) && (colEle[element[2]].innerText === colEle[element[1]].innerText) && (colEle[element[0]].innerText !== "")){

      audio.play();


      colEle[element[0]].style.color="red";
      colEle[element[1]].style.color="red";
      colEle[element[2]].style.color="red";


      if(colEle[element[1]].innerText==='X'){

       
        setTimeout(() => {
          xWins= true;

          winpop();
          
        },1000);

      }
      else{
        setTimeout(() => {
          
          winpop();
        }, 1000);
      }
    }
    
  });
}


//refresh function


function refresh () {
  
  count = 0;
  console.log(count);
  let eachcol = document.getElementsByClassName("gridColumn");
  Array.from(eachcol).forEach((element) => {
    element.innerText = "";
  });
}

// function refresh2 () {
//   winDiv.style.display="none"
//   generateGameGrid()
//   count = 0;
//   refresh();
// }


// function settime(){
 
//   correctAudio.currentTime=1;
//   correctAudio.play();
  
// }






function generateGameGrid() {
  gamebtn.style.display = "none";

  let playerDiv = document.createElement("div");
  playerDiv.style.display = "flex";
  playerDiv.style.flexDirection = "column";

  player1 = document.createElement("input");
  player1.setAttribute("type", "text");
  player1.classList.add("playerInput");
  
  player1.setAttribute("placeholder", "First Player");

  player2 = document.createElement("input");
  player2.setAttribute("type", "text");
  player2.classList.add("playerInput");
 
  player2.setAttribute("placeholder", "Second Player");

  playerDiv.appendChild(player1);
  playerDiv.appendChild(player2);

  let playerNameBtn = document.createElement("button");
  playerNameBtn.innerText = "Done";
  
  playerNameBtn.classList.add("playerNameBtn");
  

  playerNameBtn.addEventListener("mouseover", function changeColor() {
    playerNameBtn.style.backgroundColor = "skyblue";
  });

  playerNameBtn.addEventListener("mouseout", function changeColor() {
    playerNameBtn.style.backgroundColor = "#61892F";
  });

  playerDiv.appendChild(playerNameBtn);

  maingamediv.appendChild(playerDiv);

  playerNameBtn.addEventListener("click", function grid() {
    if (player1.value.length == 0 || player2.value.length == 0) {
      alert("Players Name can't be Empty");
    } else {
      playerNameBtn.style.display = "none";

      player1.style.display = "none";
      player2.style.display = "none";
      

      // loop for making row
      for (let i = 0; i < 3; i++) {
        let row = document.createElement("div");
        row.style.display = "flex";
        row.style.backgroundColor = "white";
        row.style.height = "100px";
        row.style.width = "300px";
        row.style.border = "1px solid black";

        //loop for making column
        for (let j = 0; j < 3; j++) {
          let column = document.createElement("div");
          column.style.backgroundColor = "white";
          column.style.height = "100px";
          column.style.width = "300px";
          column.style.border = "1px solid black";
          column.style.fontSize = "45px";
          // column.style.padding="20px"
          // column.style.textAlign="center";
          column.style.display = "flex";
          column.style.alignItems = "center";

          column.style.justifyContent = "center";
          //setting class for column

          column.setAttribute("class", "gridColumn");
          // column.className='gridColumn';

          column.addEventListener("mouseover", function () {
            column.style.backgroundColor = "purple";
            column.style.cursor = "pointer";
            if (count % 2 == 0 && count <9) {
                
              namePlayer1.style.visibility='visible';
              
              namePlayer1.innerText = player1.value + "  =====>   " + "X";
              namePlayer1.style.marginBottom = "30px";
              namePlayer1.style.color = "black";
              console.log("inside If");
            } else if(count % 2 == 1 && count <9){
              // namePlayer2.style.display="initial";
              namePlayer1.style.visibility="visible";
              namePlayer1.innerText = player2.value + "  =====>   " + "0";
              namePlayer1.style.marginBottom = "30px";
              namePlayer1.style.color = "black";
              console.log("inside else");
            }
          });

          column.addEventListener("mouseout", function () {
            column.style.backgroundColor = "white";
          

            namePlayer1.style.visibility="hidden";
           
          });

          row.appendChild(column);


          //function to display X or 0 )

          column.addEventListener("click", function () {
            if (column.childNodes.length == 0) {

              
              if (count % 2 == 0) {
              
                correctAudio.play();
                // settime();
                column.innerText = "X";
                console.log("hello");
                count++;
                winGame();
              } else {
              
                correctAudio.play();
                // settime();
                column.innerText = "0";
                count++;
                winGame();
              }
            }
            else{
              
              IncorrectAudio.play();
            }
          });
        }

        maingamediv.appendChild(row);
      }

      let sideDiv = document.createElement("div");

      let namePlayer1 = document.createElement("h3");
      // namePlayer1.innerText = player1.value + "  =====>   " + "X";
      // namePlayer1.style.marginBottom = "20px";
      // namePlayer1.style.color = "white";

      let namePlayer2 = document.createElement("h3");
      namePlayer2.style.display="none";
      // namePlayer2.innerText = player2.value + "  =====>   " + "0";
      // namePlayer2.style.marginBottom = "20px";
      // namePlayer2.style.color = "white";

      sideDiv.appendChild(namePlayer1);
      // sideDiv.appendChild(namePlayer2);

      maingamediv.prepend(sideDiv);

      // Reset Button

      let resetBtn = document.createElement("button");
      // resetBtn.setAttribute('type','reset');
      resetBtn.innerText = "Reset";
      resetBtn.classList.add("resetBtn");

      maingamediv.appendChild(resetBtn);

      //Adding event listener to reset the game

      resetBtn.addEventListener("click", refresh);
    }
  });
}
