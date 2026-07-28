(function(){
    const todos=[];
    const todocontainer=document.getElementById("todo");
    const inputtask=document.createElement("input");
    inputtask.placeholder="Enter task..."
    inputtask.type="text";
    const addbtn=document.createElement("button");
    addbtn.textContent="Add"
    const todolist=document.createElement("div");
    todolist.style.border="2px solid black"
    todocontainer.append(inputtask,addbtn,todolist);

    function rendertask(task){
        const p=document.createElement("p");
        p.textContent=task
        todolist.append(p);
    }

    function addtodo(){
        const task=inputtask.value;
        if(!task){
            return;
        }
        todos.unshift(task);
        console.log(todos);
        rendertask(task);
        inputtask.value="";
        inputtask.focus();
    }

    addbtn.addEventListener("click",addtodo);
})()