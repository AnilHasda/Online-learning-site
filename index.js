let container = document.getElementById("container");

//code for localstorage
let response = localStorage.getItem("list");
let finalResponse = JSON.parse(response);
let data = finalResponse ? finalResponse : [];
let scoreBoard=document.querySelector(".scoreBoard");
let mainScore=document.querySelector("#score");
let score = 0;
function show(e) {
    score++;
    console.log(score)
    let answer = e.nextElementSibling;
    answer.classList.toggle("hide")
}
function checkAns(id) {
    console.log(id)
    let input = document.getElementById(`${id}`).value;
    if (input === "") {
        alert("please enter your answer")
    }
    else {
        let currentData = data.filter(ele => ele.id == id);
        let x=currentData[0].ans.split("\n").join("");
        console.log({input,x})
        if (input == x) {
            score++;
            scoreBoard.innerHTML="Your total Score="+score;
            alert("corrct answer");
        }
        else {
            alert("wrong answer")
        }
    }
}
//creation of scoredBoard
const display = () => {
    if (data.length > 0) {
        mainScore.classList.remove("hide");
        for (let i = 0; i < data.length; i++) {
            // container.innerHTML += `<tr><td>${data[i].qns}</td><td>${data[i].ans}</td><td><span onclick="update(${data[i].id})"><i class="fas fa-edit"></i></span></td><td><span onclick="test(${data[i].id})"><i class="fas fa-trash"></i></span></td></tr>`
        // <div class="component">
        // <h3><u>question${i + 1}:</u>${data[i].qns}</h3>
        // <input type="text"placeholder="enter your answer"id="${data[i].id}"><button onclick="checkAns('${data[i].id}')">submit</button>
        // <button onclick="show(this)">Show answer/hide answer</button>
        // <p class="answer hide">ans:${data[i].ans}</p>

    let element=document.createElement("div");
    element.setAttribute("class","component");
    let h3=document.createElement("h3");
    h3.innerHTML=`<u>question${i + 1}:</u>${data[i].qns}`;
    element.appendChild(h3);
    let input=document.createElement("input");
    input.setAttribute("placeholder","enter your answer");
    input.setAttribute("id",`${data[i].id}`);
    element.appendChild(input);
    let button=document.createElement("button");
    button.onclick=()=>{checkAns(`${data[i].id}`)}
    button.innerHTML="submit";
    element.appendChild(button);
    let showButton=document.createElement("button");
    showButton.innerHTML="Show answer/hide answer";
    showButton.onclick=()=>{show(showButton)}
    element.appendChild(showButton);
    let paragraph=document.createElement("p");
    paragraph.setAttribute("class","answer hide");
    paragraph.innerHTML=`ans:${data[i].ans}`;
    element.appendChild(paragraph);
    container.appendChild(element);
        }
    }
    else {
        container.innerHTML = "Data is not found please login to add data";
    }
}

display();
