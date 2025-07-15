let task = JSON.parse(localStorage.getItem("tareas"));

/* paso uno referencias a los elementos de la pagina */
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");

/* paso dos estructura de datos */
let tasks = [];

/*paso tres cargar tareas guardadas en el navegador */
function loadTasks() {
    const stored = localStorage.getItem("tasks");
    task = stored ? JSON.parse(stored) : [];}

/* paso cuatro guardar tareas en el navegador */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* pintar tareas en pantalla */
taskList.innerHTML = ''; // limpiar lista
tasks.forEach((task, index) => {
  /* <li> contenedor */
  const li = document.createElement('li');

  /* ----- checkbox “completado” ----- */
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;

  // Cuando el usuario lo marque / desmarque
  checkbox.addEventListener('change', () => {
    toggleTask(index);   // cambia task.done y persiste
  });

  /* ----- texto de la tarea ----- */
  const span = document.createElement('span');
  span.textContent = task.text;

  /* Si la tarea está marcada como hecha, aplica la clase .completed
     (sirve para el tachado vía CSS y para que el checkbox aparezca activo) */
  if (task.done) li.classList.add('completed');

  /* ----- botón de eliminar ----- */
  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';   // o cualquier icono
  delBtn.className  = 'delete';

  // Al pulsar, borra la tarea
  delBtn.addEventListener('click', () => {
    deleteTask(index);   // quita del array y vuelve a pintar
  });

  /* ----- montar la fila ----- */
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);

  taskList.appendChild(li);
});

/* paso 6 manejar el envio de formularios */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //lee taskinput.value
    const task = taskInput.value;
    //inserta un nuevo objeto {text: task, done: false} en tasks
    tasks.push({text: task, done: false});
    //guarda en el navegador
    saveTasks();
    //limpia el input
    taskInput.value = '';
    //pinta en pantalla
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.done) li.classList.add('completed');
        const delBtn = document.createElement('button');
        delBtn.textContent = '✕';
        delBtn.className = 'delete';
        delBtn.addEventListener('click', () => {
            deleteTask(index);
            });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
/* borrar tarea */
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    render();
}
});

/* guardar tareas en el navegador */
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    render();
}   

/* Paso 7: Al arrancar */
loadTasks();
render();

/* guardar localmente las tareas */
function render() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.done) li.classList.add('completed');
        const delBtn = document.createElement('button');
        delBtn.textContent = '✕';
        delBtn.className = 'delete';
        delBtn.addEventListener('click', () => {
            deleteTask(index);
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

/* paso 8: guardar en el navegador localmente */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
