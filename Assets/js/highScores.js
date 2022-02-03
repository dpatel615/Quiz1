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
       var createLi = document.createElement("li");
       createLi.textContent = allScores[i].initials + " " + allScores[i].score;
       HighScore.appendChild(createLi);
   }   

}

goBack.addEventListener("click", function(){
    window.location.replace("./index1.html");
});