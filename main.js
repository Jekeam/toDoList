var todolist = [];

(function(id){

    //Я описываю здесь конструктор
    function toDoList(title, domObject){
        this.title = title     
        this.tasks = [];
        var changeTitle = function (title){            
            this.title = title
            header.innerText = this.title
            header.hidden = false
        }.bind(this)

        var addTasks = function(text){
            this.tasks.push(text)
        }.bind(this)

        var container  = document.createElement('div')
        var header = document.createElement('h3')
        var btAddTask = document.createElement('button')
        btAddTask.title = btAddTask.innerText = 'Добавить задачу'

        header.innerText = this.title
        header.addEventListener('dblclick', function(e){
            e.target.hidden = true
            var input = document.createElement('input')            
            container.insertBefore(input, e.target)
            input.value = e.target.innerText

            input.addEventListener('keypress', function(e){                
                if(e.which == 13){                    
                    changeTitle(this.value)
                    this.parentNode.removeChild(this)
                    delete this
                }            
            })
        })

        //Так можно задать много дейстивий на одно событие
        function addEvents (tag, array, fn){
            array.forEach(function(el){
                tag.addEventListener(el, fn)
            })
        }

        var inputAddTask = document.createElement('input')
        var stepAddTask = 0
                
        var addTask = function  (e) {
            console.log(e.which)
            if ((stepAddTask||e.which == 13) && isLengthNotNull(inputAddTask.value)){                
                var checkbox = document.createElement('input')
                checkbox.id = getID('task')
                checkbox.type = 'checkbox'                

                var label = document.createElement('label')
                label.setAttribute('for', checkbox.id)
                addTasks(label.innerText = inputAddTask.value)

                
                var br = document.createElement('br')
                stepAddTask = 0

                container.insertBefore(checkbox, e.target)
                container.insertBefore(label, e.target)
                container.insertBefore(br, e.target)
                container.removeChild(inputAddTask)
                inputAddTask.value = ''                
            } else {                 
                container.insertBefore(inputAddTask, e.target)
                stepAddTask = 1                
                inputAddTask.focus()
            }
        }              
        addEvents(btAddTask,['click'], addTask)
        addEvents(inputAddTask,['click'], addTask)//todo

        container.appendChild(header)
        container.appendChild(btAddTask)
        domObject.appendChild(container)        
    }


    //Методы
    function isLengthNotNull(value){
        if(value.length !==0 ){
            return true
        }else{
            return false
        }
        
    }

    function getID(value){
        var value = value || "id"
        return value + '_' + Math.random().toString(16).substr(2, 8).toUpperCase() 
    }


    //Тут создается кнопка и событие нажатие на нее
    var  todo = document.getElementById(id)
    var btNewTodo = document.createElement('button')
    btNewTodo.title =  btNewTodo.innerText = 'Создать ToDo-list'
    todo.appendChild(btNewTodo)

    var containerTodoList = document.createElement('div')
    //containerTodoList.className = "todo-container"
    todo.appendChild(containerTodoList)

    var inputNameTodo = document.createElement('input')
    var stepCreatTodoList = 0

    inputNameTodo.addEventListener('keypress', function(e){
        if(e.which == 13 && isLengthNotNull(inputNameTodo.value)){
            todolist.push(new toDoList(inputNameTodo.value, containerTodoList));
            stepCreatTodoList = 0
            todo.removeChild(inputNameTodo)
            inputNameTodo.value = ''            
        }
    })

    btNewTodo.addEventListener('click', function(){
        if (stepCreatTodoList != 0 && isLengthNotNull(inputNameTodo.value)){
            todolist.push(new toDoList(inputNameTodo.value, containerTodoList));
            stepCreatTodoList = 0
            todo.removeChild(inputNameTodo)
            inputNameTodo.value = ''
        }else{
            todo.insertBefore(inputNameTodo, btNewTodo)
            stepCreatTodoList = 1
            inputNameTodo.focus()
        }
    })
})('todo')