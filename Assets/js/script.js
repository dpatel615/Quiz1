var questions = [
    {
       title: "Commonly used data type Do Not include:",
       choices: ["string","boolean","alerts","Number"],
       answer: "alerts" 
    },
    {
        title: "The condition in an if/else statment is enclosed within ----.",
        choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
        answer: "Curly Brackets",
    },
    {
        title: "Array in javascript can be used to store ----.",
        choices: ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"],
        answer: "All of the above",
    },
    {
        title: "String value must be enclosed within --- when being assigned to variables.",
        choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
        answer: "Quotes",
    },
    {
        title: "A very useful tool for used during development and debugging for printing content is --- ",
        choices: ["Javascript", "Terminal/ Bash", "for loops", "console log"],
        answer: "Terminal/ Bash",
    }
];

// Declare variable
var score = 0;
var questionIndex = 0;

// Start working code
var currentTime = document.querySelector("#CurrentTime");
var timer = document.querySelector("#startTime");
var questionDiv = document.querySelector("#QuestionDiv");
var wrapper = document.querySelector("#wrapper");


// second left is 25 seconds per question:
var SecondsLeft = 101;
// Holds interval time
var HoldInterval = 0;
// hold penalty time
var Penalty = 10;
// create new element
var UlCreate = document.createElement("ul");

// Trigger timer on button, shows user a display on screen
timer.addEventListener("click", function(){
    // we are checking zero because its originally set to zero
    if(HoldInterval ===  0){
        HoldInterval = setInterval(function (){
            SecondsLeft--;
            currentTime.textContent = "Time: " + SecondsLeft;

            if(SecondsLeft <= 0) {
               clearInterval(HoldInterval);
                allDone();
                currentTime.textContent= "Time's up";
            }
        }, 1000);
    }
    render(questionIndex); 
});
// Render question and choice to page
function render(questionIndex) {
    // clear exsiting data
    questionDiv.innerHTML = "" ;
    UlCreate.innerHTML = "";
    // for loops to loop through all info in array
    for (var i=0; i<questions.length; i++){
       // appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoice = questions[questionIndex].choices;
        questionDiv.textContent = userQuestion;
    }
    // now for each question choice
    userChoice.forEach(function (newItem){
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionDiv.appendChild(UlCreate);
        UlCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// event to compare choice with answer
function compare(event){
    var element = event.target;

 if (element.matches("li")){
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id","createDiv");
   // for correct answer
   if(element.textContent == questions[questionIndex].answer){
       score++;
       createDiv.textContent = "Right answer!  " + questions[questionIndex].answer;     
    } else {
        // Deduct -10 seconda off secondslefs for wrong answers
        SecondsLeft = SecondsLeft - Penalty;
        createDiv.textContent = "Wrong answer! The correct answer is:  " + questions[questionIndex].answer;
    }     
 }
 questionIndex++;

 if (questionIndex >= questions.length) {
     allDone ();
     createDiv.textContent = "End the Quiz!" + " " + "you got " + score + " /" + questions.length + " Correct!";
 } else {
     render(questionIndex);
 } 
 questionDiv.appendChild(createDiv);
}

// All done will append last page
function allDone() {
    questionDiv.innerHTML = " ";
    currentTime.innerHTML = " ";
    
    
   // heading 
   var createH1 = document.createElement("h1");
   createH1.setAttribute("id","createH1");
   createH1.textContent = "All Done!"

   questionDiv.appendChild(createH1);

   // paragraph
   var createPar = document.createElement("p");
   createPar.setAttribute("id","createPar");

   questionDiv.appendChild(createPar);

   // calculate time remaining and replace it with score
   if (SecondsLeft >= 0){
       var timeRemain = SecondsLeft;
       var createPar2 = document.createElement("createPar");
       clearInterval(HoldInterval);
       createPar.textContent = "Your final score is: " + timeRemain;

       questionDiv.appendChild(createPar2);
   }

   var Label = document.createElement("label");
   Label.setAttribute("id", "Lable");
   Label.textContent = " Enter Your Initials:   ";

   questionDiv.appendChild(Label);
   var Input = document.createElement("input");
   Input.setAttribute("id","Input");
   questionDiv.append(Input);
  // heading 
   // buttom for submit
  var Submit = document.createElement("button");
  Submit.setAttribute("type", "submit");
  Submit.setAttribute("id","Submit");
  Submit.textContent = "Submit"; 
  questionDiv.appendChild(Submit);
  
  // Event listener to capture initial and local storage for initial and score
    Submit.addEventListener("click",function(){
        var Initials = Input.value;

        if (Initials == null) {
            console.log("No value entered! ");

         }else {
            var FinialScore = {
                Initials: Initials,
                score: timeRemain
            }
            console.log(FinialScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores == null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
           allScores.push(FinialScore);
           var NewScore = JSON.stringify(allScores);
           localStorage.setItem("allScores",NewScore);

           window.location.replace("./highScores.html");
        }
    });

   


}