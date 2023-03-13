var todoList = {
  todos: [],


  // Add To list
  addTodo: function(todoText) {
    this.todos.push({todoText: todoText, completed: false});

  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },

  deleteTodo: function(position) {
    this.todos.splice(position, 1);

  },

  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  // this.displayTodos();
  },

  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    // make eveything false
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
      // make eveything true
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }

  }
};


// handlers

var handler = {
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function(){
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
      view.displayTodos();

  },
  changeTodo: function () {
    var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
      view.displayTodos();
  },

  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },

  toggleCompleted: function () {
    var toggleCompletedInput = document.getElementById("toggleCompletedInput");
    todoList.toggleCompleted(toggleCompletedInput.valueAsNumber);
    toggleCompletedInput.value = '';
      view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
      view.displayTodos();
  }
};


var view = {
  displayTodos: function () {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = 'done' + todo.todoText;
      } else {
        todoTextWithCompletion = 'Not done' + todo.todoText;
      }
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton: function () {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  }
};
var todosUl = document.querySelector('ul');
todosUl.addEventListener('click', function(event){
  var elementClicked = event.target;
  if(elementClicked.className === 'deleteButton'){
    handler.deleteTodo(parseInt(elementClicked.parentNode.id));
  }
  
});




var input = document.getElementById("addTodoTextInput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("myBtn").click();
    }
});
