const toDoWrapper = document.querySelector(".todo__wrapper"),
    toDoForm = toDoWrapper.querySelector("form"),
    toDoList = toDoWrapper.querySelector(".toDoList"),
    toDoListWeek = toDoWrapper.querySelector(".toDoList__week");

let toDo_ary = [],
    week_ary= [];

const TODO_LS = "currentToDo",
    WEEK_LS = "weekToDo";

    function saveToDo(){
        localStorage.setItem(TODO_LS, JSON.stringify(toDo_ary));
    }

    function saveToWeek(){
        localStorage.setItem(WEEK_LS, JSON.stringify(week_ary));
    }

    function deleteHandle(e){
        e.preventDefault();
        const btnTarget = e.target;
        const parentLi = btnTarget.parentNode;
        const offSetLi = parentLi.parentNode;
        
        
        if(offSetLi.id === toDoList.id){
            offSetLi.removeChild(parentLi);
            const toDoDelete = toDo_ary.filter(toDo => {
                if(parentLi.id != JSON.stringify(toDo.id)){
                    return toDo;
                }
            })
            toDo_ary = toDoDelete;
            saveToDo();
        } else {
            offSetLi.removeChild(parentLi);
            const toDoDelete = toDo_ary.filter(toDo => {
                if(parentLi.id != JSON.stringify(toDo.id)){
                    return toDo;
                }
            })
            week_ary = toDoDelete;
            saveToWeek();
        }
    }

    function sendHandle(e){
        e.preventDefault();

        const parentList = e.target.parentNode;
        const btn = e.target;
        const text = parentList.firstChild.innerText;

        if(btn.id === "week"){

            const liId = toDo_ary.length +1;

            btn.id = "today";
            parentList.id = liId;
            btn.innerText = "→";
            toDoListWeek.removeChild(parentList);
            toDoList.appendChild(parentList);

            const toDo_obj = {
                text,
                id : liId
            }

            toDo_ary.push(toDo_obj);

            
        } else {

            const idx = toDo_ary.findIndex(function(item){
                return parseInt(parentList.id) ===item.id
            })
            if(idx > -1){
                toDo_ary.splice(idx, parseInt(parentList.id));
            }

            toDoList.removeChild(parentList);
            const liId = week_ary.length +1;
            parentList.id = liId;
            btn.id= "week"
            btn.innerText = "←"
            toDoListWeek.appendChild(parentList);

            const week_obj = {
                text,
                id: liId
            }

            week_ary.push(week_obj);
        }

        saveToDo();
        saveToWeek();

    }

    function paintTodo(text){
        const li = document.createElement("li");
        const span = document.createElement("span");
        const btn = document.createElement("button");
        const btn2 = document.createElement("button");

        const listId = toDo_ary.length + 1;

        span.innerText = text;
        btn.innerText = "❌";
        btn2.innerText = "→";
        btn.addEventListener("click", deleteHandle);
        btn2.addEventListener("click", sendHandle);
        li.id = listId;
        li.appendChild(span);
        li.appendChild(btn);
        li.appendChild(btn2);
        toDoList.appendChild(li);

        const toDo_obj = {
            text,
            id: listId
        }
        toDo_ary.push(toDo_obj);
        
        saveToDo();

    }

    function paintToWeek(text){
        const li = document.createElement("li");
        const span = document.createElement("span");
        const btn = document.createElement("button");
        const btn2 = document.createElement("button");

        const listId = week_ary.length + 1;

        span.innerText = text;
        btn.innerText = "❌";
        btn2.innerText = "←";
        btn.addEventListener("click", deleteHandle);
        btn2.addEventListener("click", sendHandle);
        li.id = listId;
        li.appendChild(span);
        li.appendChild(btn);
        li.appendChild(btn2);
        toDoListWeek.appendChild(li);

        const week_obj = {
            text,
            id: listId
        }
        week_ary.push(week_obj);
        
        saveToWeek();

    }

    function loadToDos(){
        const toDoValue = localStorage.getItem(TODO_LS);
        const currentToDo = JSON.parse(toDoValue);

        currentToDo.forEach(toDo => {
            const toDoText = toDo.text;
            paintTodo(toDoText);
        })

        const toWeekValue = localStorage.getItem(WEEK_LS);
        const currentToWeek = JSON.parse(toWeekValue);

        currentToDo.forEach(toDo => {
            const toDoText = toDo.text;
            paintToWeek(toDoText);
        })
    }

    function toDoHandle(e){
        e.preventDefault();
        const toDoValue = e.target[0].value;

        paintTodo(toDoValue);
        
    }

    function toDoInit(){
        loadToDos();
        toDoForm.addEventListener("submit", toDoHandle);
    }

    toDoInit();