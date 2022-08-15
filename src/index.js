// import _ from 'lodash';
import './style.css';
import ToDolist from './toDos.js';
import complete from './delcomplete.js';

// const removeCompleted = document.querySelector('.removeCompleted');

const myToDolist = new ToDolist();

myToDolist.LoadToDoFromLocal();

function modificarBox(index, valor) {
  myToDolist.ToDo[index].doneBox = valor;
  myToDolist.SaveToDolistLocal();
}

function modifyDescription(index, valor) {
  myToDolist.ToDo[index].activity = valor;
  myToDolist.SaveToDolistLocal();
}

const render = () => {
  document.querySelector('.ToDoList').innerHTML = '';
  for (let index = 0; index < myToDolist.ToDo.length; index += 1) {
    const toDo = myToDolist.ToDo[index];

    const List = document.querySelector('.ToDoList');
    const element = document.createElement('li');
    element.classList.add('eachToDo');
    const doneBox = document.createElement('input');
    doneBox.type = 'checkbox';
    const inputTask = document.createElement('input');
    inputTask.type = 'text';
    doneBox.classList.add('doneBox');
    inputTask.value = toDo.activity;
    element.append(doneBox, inputTask);
    doneBox.setAttribute('id', toDo.id);
    inputTask.disabled = false;
    doneBox.checked = toDo.doneBox;
    if (doneBox.checked) {
      inputTask.style.textDecoration = 'line-through';
    }

    inputTask.addEventListener('change', () => {
      modifyDescription(index, inputTask.value);
    });

    doneBox.addEventListener('click', () => {
      modificarBox(index, doneBox.checked);

      if (doneBox.checked) {
        inputTask.style.textDecoration = 'line-through';
      } else {
        inputTask.style.textDecoration = 'none';
      }
    });

    List.appendChild(element);

    // Remove Button
    const deleteButton = document.createElement('button');

    // eslint-disable-next-line
    function deleteToDo() {
      const idToDelete = deleteButton.id;
      myToDolist.DeleteToDo(idToDelete);
      myToDolist.reorder();
      myToDolist.SaveToDolistLocal();
      render();
    }
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add('delButton');
    deleteButton.onclick = deleteToDo;
    deleteButton.id = toDo.id;
    element.appendChild(deleteButton);
  }
};

render();
// Controller
const button = document.querySelector('.button');
button.addEventListener('click', () => {
  const titletextbox = document.getElementById('activity');
  const toDop = titletextbox.value;
  myToDolist.AddToDo(toDop, false);
  myToDolist.SaveToDolistLocal();
  titletextbox.value = '';
  render();
});

complete(myToDolist, render);
