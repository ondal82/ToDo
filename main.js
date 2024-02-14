// 전역 변수 설정

let taskList = JSON.parse(localStorage.getItem('taskList'));;
let index = "";
let mode = "all";
let filterList = taskList;

// element 배정

let taskInput = document.getElementById("task-input");

let tabs = document.querySelectorAll(".task-tabs ul li");

console.log(tabs);

let addBtn = document.getElementById("btn-add");

// EventListener 설정

addBtn.addEventListener("click",addTask);

taskInput.addEventListener('keyup', function(e){
    if(e.key == 'Enter'){
        addTask()
    }
})
// 엔터키로도 입력되게 도와주는 함수

for (let i=0; i < tabs.length; i++) {
    tabs[i].addEventListener("click",function(event){
        setMode(event);
    });
}

// function

function addTask(){
    if (taskInput.value){
        let newID = idGen();
        let task = {
            id:newID,
            taskContent:taskInput.value,
            isComplete:false,
        }
        taskList.push(task);
        listRender();
    }
    
    clearInput();
};

function clearInput(){
    taskInput.value = "";
}

function toggleComplete(id){
    // for (let i=0; i< taskList.length; i++) {
    //     if (taskList[i].id == id){
    //         taskList[i].isComplete = !taskList[i].isComplete;
    //         break;
    //     }
    // }

    // const item = taskList.find(item => item.id == id)
    // item.isCompleted = !item.isCompleted
    // find 함수를 이용하여 직접 item을 찾는 경우. 단, item이 객체 자료가 아니라면 불완전한 코드

    const i = taskList.findIndex(item => item.id == id);
    taskList[i].isComplete = !taskList[i].isComplete;
    // findIndex 를 이용하여 for문 없이 작동시키는 경우
    // find 와 달리 배열에 직접 적용

    listRender();
};


function deleteTask(id){
    // for (let i=0; i< taskList.length; i++) {
    //     if (taskList[i].id == id){
    //         taskList.splice(i,1);
    //         break;
    //     }
    // }

    taskList = taskList.filter(item => item.id != id);
    // for문 대신 필터 함수를 이용하는 방식 -> 조건에 맞는 값만 다시 할당

    listRender();
};


function setMode(event){
    mode = event.target.id;

    // 언더바 요소 이동 처리
    let delClassItem = document.querySelector(".tabs-selected"); //기존에 class 를 가진 요소 탐색
    let addClassItem = document.getElementById(mode); // 새로 class를 넣을 요소 탐색
    delClassItem.classList.remove("tabs-selected"); 
    addClassItem.classList.add("tabs-selected");
    listRender();

    // id를 넣지 않고 처리가능한 방법은? nth-child 처럼
};

function filter(){
    if(mode === "all") {
        filterList = taskList;
    } else if (mode === "progress"){
        filterList = taskList.filter(item => item.isComplete == false);
    } else if (mode === "done") {
        filterList = taskList.filter(item => item.isComplete == true);
    }
};

function listRender(){
    filter();

    let resultHTML ="";
    let toggleClass ="";
    let toggleBtn = `class = "checkBtn"`;
    let list = filterList;
    
    for(let i=0 ; i<list.length ; i++){
        if(list[i].isComplete) {
            toggleClass ="task-done";
            toggleBtn = `class = "undoBtn"`;
        }

        resultHTML += 
        `<div class="task-card">
            <div class="task-items ${toggleClass}">${list[i].taskContent}</div>
            <div class="task-btn-box">
                <button onclick="toggleComplete('${list[i].id}')" ${toggleBtn}>Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;

        toggleClass="";
        toggleBtn = `class = "checkBtn"`;
    }

    document.getElementById("task-list").innerHTML = resultHTML;
    
    localStorage.setItem('taskList', JSON.stringify(taskList));
    
    // 할일 로컬 저장
}

function idGen() {
    return "_" + Math.random().toString(36).substr(2, 16);
};

// code 실행

listRender();
// 입력 값없는 처음에도 리스트 표시하여 저장된 값 불러옴