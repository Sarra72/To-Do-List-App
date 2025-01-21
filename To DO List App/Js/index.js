var taskNameInput = document.getElementById("task-name");
var taskDescriptionInput = document.getElementById("task-description");
var taskStatusInput = document.getElementById("task-status");
var taskProjectInput = document.getElementById("task-project");
var tasksContainer= document.getElementById("tasks-container");
var closeButton =document.getElementById("close-button");
var gIndex =0;
let tasksList=[];

function createTaskElement(i){
    return `<div class="list m-4 p-2 ">   
                &ensp;
                <b class="task-name task-text">${tasksList[i].taskName}&ensp;:</b>
                &ensp;
                <span class="task-desc" id="taskDesc">${tasksList[i].taskDescription}</span>&ensp;&ensp;&ensp;
                <span class="stat"><b>${tasksList[i].taskStatus}</b></span>
                &ensp;&ensp;
                <span class="proj"><b>${tasksList[i].taskProject}</b></span>
                &ensp;&ensp;&ensp;&ensp;
                
                <button onclick="goToUpdate(${i})" class="btn edit p-0 px-1">edit</button>
                <button onclick="Delete(${i})" type="button" class="btn-close btn-danger" id="close-button" aria-label="Close"></button>
            </div>`
}

function AddTask(){
    if(taskNameInput.value==null || taskDescriptionInput.value==null || taskStatusInput.value==="Task Status" || taskProjectInput.value === "Task Project" ){
        alert("Please, complete inputs")
        return;
    }
    var task ={
        taskName: taskNameInput.value ,
        taskDescription : taskDescriptionInput.value,
        taskStatus : taskStatusInput.value,
        taskProject: taskProjectInput.value
    }
    tasksList.push(task);
    localStorage.setItem('Tasks',JSON.stringify(tasksList));
    displayTasks();
    clear();
}

function displayTasks(){
    if (!tasksContainer) {
        console.error("tasksContainer is null or undefined");
        return;
    }

    if (!Array.isArray(tasksList)) {
        tasksList = [];
    }
    
    if(tasksList.length == 0 ){
        tasksContainer.innerHTML = `<p class="text-center m-3">No tasks Added, Add your first Task</p>`;
        return 0;
    }

    var element="";
    for(i=0 ; i<tasksList.length ;i++){
        element+= createTaskElement(i);
    }
    
    tasksContainer.innerHTML=element;
    
}

function clear(){
    taskNameInput.value=null;
    taskDescriptionInput.value=null;
    taskStatusInput.value="Task Status";
    taskProjectInput.value="Task Project";
}
function Delete(i){
    tasksList.splice(i,1);
    displayTasks();
    localStorage.setItem('Tasks',JSON.stringify(tasksList));
}

function goToUpdate(i){
    gIndex=i;
    var addBtn = document.getElementById("add-btn");
    var updateBtn = document.getElementById("update-btn");

    taskNameInput.value=tasksList[i].taskName;
    taskDescriptionInput.value=tasksList[i].taskDescription;
    taskStatusInput.value=tasksList[i].taskStatus;
    taskProjectInput.value=tasksList[i].taskProject;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}
function UpdateTask(){
    var addBtn = document.getElementById("add-btn");
    var updateBtn = document.getElementById("update-btn");

    var task ={
        taskName: taskNameInput.value ,
        taskDescription : taskDescriptionInput.value,
        taskStatus : taskStatusInput.value,
        taskProject: taskProjectInput.value
    }

    tasksList.splice(gIndex,1,task);
    localStorage.setItem('Tasks',JSON.stringify(tasksList));
    displayTasks();
    clear();
    
    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
}

if(localStorage.length == 0){
    tasksList=[];
}else{
tasksList= JSON.parse(localStorage.getItem('Tasks'));
}
displayTasks();