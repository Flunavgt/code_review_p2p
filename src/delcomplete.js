const removeCompleted = document.querySelector('.removeCompleted');
export default function complete(myToDolist, render) {
  removeCompleted.addEventListener('click', () => {
    const temp = myToDolist.ToDo.filter(({ doneBox }) => !doneBox);
    myToDolist.SetToDo(temp);
    myToDolist.reorder();
    myToDolist.SaveToDolistLocal();
    render();
  });
}
