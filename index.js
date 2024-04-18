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
    let input = document.getElementById(`${id}`).value;
    if (input === "") {
        alert("please enter your answer")
    }
    else {
        let currentData = data.filter(ele => ele.id == id)
        if (input === currentData[0].ans) {
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
            // table.innerHTML += `<tr><td>${data[i].qns}</td><td>${data[i].ans}</td><td><span onclick="update(${data[i].id})"><i class="fas fa-edit"></i></span></td><td><span onclick="test(${data[i].id})"><i class="fas fa-trash"></i></span></td></tr>`;
            table.innerHTML += `
        <div class="component">
        <h3><u>question${i + 1}:</u>${data[i].qns}</h3>
        <input type="text"placeholder="enter your answer"id="${data[i].id}"><button onclick="checkAns('${data[i].id}')">submit</button>
        <button onclick="show(this)">Show answer/hide answer</button>
        <p class="answer hide">ans:${data[i].ans}</p>

        </div>`
        }
    }
    else {
        table.innerHTML = "Data is not found please login to add data";
    }
}

display();
