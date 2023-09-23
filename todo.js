const tasks = [];
const taskList = document.getElementById('taskList');
const addTaskInput = document.getElementById('addTaskBtn');
const totCount = document.getElementById('totCount'); // selecting span tag of total count
const compCount = document.getElementById('compCount'); // selecting span tag of completed task count
const notCompCount = document.getElementById('notCompCount'); // selecting span tag of not completed count
const completeAll = document.getElementById('completeAll');
// Render list of task available in task variable

function renderList() {
  taskList.innerHTML = '';
  let tot = 0;
  let comp = 0;
  let notComp = 0;

  tasks.forEach(function (task, index) {
    // couting task total, completed and not completed
    if (task.completed) {
      comp += 1;
    } else {
      notComp += 1;
    }
    tot += 1;

    //creating list item for new task

    const listItem = document.createElement('li');

    listItem.innerHTML = `<div><input type="checkbox" ${
      task.completed ? 'checked' : ''
    } ${task.completed ? 'class=completed' : ''}>
    ${task.text}</div>
    <button class="delete-btn">Delete</button>
      `;
    taskList.appendChild(listItem);

    //event listener for delete task button click
    listItem.querySelector('.delete-btn').addEventListener('click', () => {
      tasks.splice(index, 1);
      renderList();
    });

    // event listner for cheking checkbox of task

    listItem
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', () => {
        task.completed = !task.completed;
        if (this.checked) {
          comp += 1;
          notComp -= 1;
        } else {
          comp -= 1;
          notComp += 1;
        }
        completeAll.checked = false;
        renderList();
      });
  });

  //printing count on web page
  totCount.innerHTML = tot;
  compCount.innerHTML = comp;
  notCompCount.innerHTML = notComp;
}

//Function add task in task variable with status done or not done

function addTask() {
  const text = document.getElementById('taskInput').value;
  if (text === '') {
    alert('Empty task not allowed..!');
    return;
  }
  const task = {
    text,
    done: false,
  };
  tasks.push(task);
  console.log(task);
  completeAll.checked = false;
  document.getElementById('taskInput').value = '';
  renderList();
}

//cheking and unchecking all task checkbox
function checkUncheckTaks(e) {
  if (this.checked) {
    tasks.forEach(function (task, index) {
      task.completed = true;
      renderList();
    });
  } else {
    tasks.forEach(function (task, index) {
      task.completed = false;
      renderList();
    });
  }
}

// Event listener for add task button
addTaskInput.addEventListener('click', addTask);

//Event listener for marking complete all task
completeAll.addEventListener('change', checkUncheckTaks);
