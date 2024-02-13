// 변수 설정

let taskList = [];

// element 배정

let taskInput = document.getElementById("task-input");

let addBtn = document.getElementById("btn-add");
let checkBtn = document.getElementById("btn-check");
let undoBtn = document.getElementById("btn-undo");
let deleteBtn = document.getElementById("btn-delete");

// EventListener 설정

addBtn.addEventListener("click",addTask);
checkBtn.addEventListener("click",checkTask);
undoBtn.addEventListener("click",undoTask);
deleteBtn.addEventListener("click",deleteTask);

// function

function addTask(){
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    listRender();
};

function listRender(){
    let resultHTML ="";
    for(let i=0 ; i<taskList.length ; i++){
        resultHTML += 
        `<div class="task-card">
            <div class="task-items">${taskList[i]}</div>
            <div class="task-btn-box">
                <button id="btn-check">Check</button>
                <button id="btn-delete">Delete</button>
            </div>
        </div>`;
    }

    document.getElementById("task-list").innerHTML = resultHTML;
}

function checkTask(){

};


function undoTask(){

};


function deleteTask(){
};

// code 실행




