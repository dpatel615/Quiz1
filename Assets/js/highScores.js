var HighScore = document.querySelector("#highScores");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#GoBack");

// event listener to clear score

clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});

//Retreives local stroage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i=0; i < allScores ; i++) {
       var Li = document.createElement("li");
       Li.textContent = allScores[i].Initials + " " + allScores[i].FinalScore;
       
       HighScore.appendChild(Li);
   }   

}

goBack.addEventListener("click", function(){
    window.location.replace("./index.html");
});