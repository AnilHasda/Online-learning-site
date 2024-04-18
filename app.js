const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn")
const table = document.getElementById("table");
//code for display flashcard
const show = () => {
    addQuestionCard.classList.remove("hide")
}
addQuestion.addEventListener("click", show)
//code for removing flashcard
const hide = () => {
    addQuestionCard.classList.add("hide")
}
closeBtn.addEventListener("click", hide)
let editBool = false;
//Submit Question
cardButton.addEventListener(
    "click",
    (submitQuestion = () => {
        editBool = false;
        let tempQuestion = question.value.trim();
        let tempAnswer = answer.value.trim();
        if (!tempQuestion || !tempAnswer) {
            errorMessage.classList.remove("hide");
        } else {
            container.classList.remove("hide");
            errorMessage.classList.add("hide");
            // viewlist();
        }
    })
);
//code for localstorage
let response = localStorage.getItem("list");
let finalResponse = JSON.parse(response);
let updateBtn = "";
let data = finalResponse ? finalResponse : [];
// localStorage.clear()
console.log(data)
const addItems = () => {
    if (cardButton.innerHTML === "Add-Items") {
        let item = {
            id: Date.now(),
            qns: question.value,
            ans: answer.value

        }
        data = [...data, item];
        localStorage.setItem("list", JSON.stringify(data));
        console.log(data)
        question.value = "";
        answer.value = "";
        display();
    }
    if (cardButton.innerHTML === "update item") {
        data = data.map(ele => ele.id === updateBtn ? { ...ele, qns: question.value, ans: answer.value } : ele)
        cardButton.innerHTML = "Add-Items";
        localStorage.setItem("list", JSON.stringify(data));
        //input.value="";
        display();
    }
}
function test(id) {
    data = data.filter(ele => ele.id !== id)
    localStorage.setItem("list", JSON.stringify(data));
    display();
}
const update = (id) => {
    show();
    updateBtn = id;
    cardButton.innerHTML = "update item";
    data.map(ele => {
        if (ele.id === id) {
            question.value = ele.qns;
            answer.value = ele.ans;
        }
    })
}
const display = () => {
    table.innerHTML = `<tr><td>question</td><td>answer<td colspan='2'>Actions</td></tr>`;
    for (let i = 0; i < data.length; i++) {
        table.innerHTML += `<tr><td>${data[i].qns}</td><td>${data[i].ans}</td><td><span onclick="update(${data[i].id})"><i class="fas fa-edit"></i></span></td><td><span onclick="test(${data[i].id})"><i class="fas fa-trash"></i></span></td></tr>`;
    }
}
display();
cardButton.addEventListener("click", addItems);