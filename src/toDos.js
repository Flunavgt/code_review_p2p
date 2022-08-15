export default class ToDolist {
  #toDo;

  constructor() {
    this.#toDo = [];
  }

  // Setters
  SetToDo(toDo) {
    this.#toDo = toDo;
  }

  // Getter
  get ToDo() {
    return this.#toDo;
  }

  reorder() {
    for (let index = 0; index < this.#toDo.length; index += 1) {
      this.#toDo[index].id = index;
    }
  }

  // editToDo(id, activity, doneBox) {
  // }

  // Methods
  AddToDo(activity, doneBox) {
    const id = this.#toDo.length;
    this.#toDo.push({
      activity,
      doneBox,
      id,
    });
  }

  DeleteToDo(id) {
    // const localToDo = this.#toDo;
    this.#toDo.splice(id, 1);
  }

  SaveToDolistLocal() {
    localStorage.setItem('toDo', JSON.stringify(this.#toDo));
  }

  LoadToDoFromLocal() {
    const savedToDo = JSON.parse(localStorage.getItem('toDo'));

    if (Array.isArray(savedToDo)) {
      this.#toDo = savedToDo;
      return true;
    }
    return false;
  }
}