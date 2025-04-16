const toDoInput = document.getElementById('todo_input');
const addTaskBtn = document.getElementById('add_task');
const containerToDo = document.getElementById('toDo_container');


//Modal
const modalContainer = document.getElementById('modal_container');
const closeModal = document.getElementById('close_modal');
const modifyInput = document.getElementById('editedTask_input');
const addModifyTask = document.getElementById('add_edited_task');

//Buscando los botones
/*No es buena idea ya que solo va a obtener los elementos que ya tengan esa clase en el DOM, no de forma dinámica
sino que estática
const btnCompleteTask = document.querySelectorAll('.btn_actions--complete');

btnCompleteTask.forEach(btn =>{
    btn.addEventListener('click', (e)=>{
        e.preventDefault();
        console.log('Hola');
        
    })
})
*/

//EventsListener de los botones
addTaskBtn.addEventListener("click",validateInput);
closeModal.addEventListener('click',closeModalFunction);

//Al recargar la pagina se muestre las tareas del local
window.onload = () =>{
    if (localStorage.length > 0) {
        displayTasks();
    }
}

function validateInput() {
    if (toDoInput.value == "") {
        alert('Debe de escribir una tarea a realizar');
    }else{
        addTaskToToDoList();
        toDoInput.value = ""; 
    }
}

function addTaskToToDoList() {
    let taskAdded = false;

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == toDoInput.value) {
            taskAdded = true;
            
        }
    }
    //Aqui digo que si la tarea ya ha sido añadida, no se debe de añadir nuevamente
    taskAdded ? alert('Esta tarea ya ha sido añadida') : containerToDo.appendChild(createTaskContainer(toDoInput.value));
    storageTask(toDoInput.value);
}
function taskCompleted(paragraph) {
    paragraph.className = 'complete_task';
}
function deleteTask(taskContainer) {
    taskContainer.parentNode.removeChild(taskContainer);
    localStorage.removeItem(taskContainer.textContent);
}
function editTask(oldTask) {
    console.log(oldTask);
    //Abre el modal
    modalContainer.style.display = "block";
    //Al dar click en el boton de añadir tarea modifcada se ejecuta la funcion de modificar el texto de la tarea
    addModifyTask.addEventListener('click',()=>{
        modifyTaskText(modifyInput.value,oldTask);
        modifyInput.value = "";
    });
    
}

//Esta funcion modifica la tarea
function modifyTaskText(text, oldTask) {
    console.log(oldTask.textContent);
    localStorage.removeItem(oldTask.textContent);
    localStorage.setItem(text, text);
    oldTask.parentNode.replaceChild(createTaskContainer(text),oldTask);
    closeModalFunction();
}

function closeModalFunction() {
    modalContainer.style.display = 'none';
}
//Esta funcion crea un contenedor de tarea, además añade las funciones de manera directa
function createTaskContainer(text) {

    const newDiv = document.createElement('div');
    newDiv.className = 'task';
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    paragraph.className = 'description_task';
    /*Creando contenedor de botones de accion */
    const btnDiv = document.createElement('div');
    btnDiv.className = 'btn_container';
    /*Creando los botones y asignando sus clase */
    const btnCheck = document.createElement('button');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');
    btnCheck.className = 'btn_actions btn_actions--complete';
    btnEdit.className = 'btn_actions btn_actions--edit';
    btnDelete.className = 'btn_actions btn_actions--delete';

    /*Creando las imagenes de los botones */

    const imgCheck = document.createElement('img');
    imgCheck.src = 'assets/check.svg';
    btnCheck.appendChild(imgCheck);

    const imgEdit = document.createElement('img');
    imgEdit.src = 'assets/edit.svg';
    btnEdit.appendChild(imgEdit);

    const imgDelete = document.createElement('img');
    imgDelete.src = 'assets/delete.svg';
    btnDelete.appendChild(imgDelete);

    btnDiv.appendChild(btnCheck);
    btnDiv.appendChild(btnEdit);
    btnDiv.appendChild(btnDelete);
    newDiv.appendChild(paragraph);
    newDiv.appendChild(btnDiv);
    //containerToDo.appendChild(newDiv);

    btnCheck.addEventListener('click',()=>{
        taskCompleted(paragraph);
    });
    btnEdit.addEventListener('click',()=>{
        editTask(newDiv);
    })
    btnDelete.addEventListener('click',()=>{
        deleteTask(newDiv);
    })
    
    return newDiv;
}

function storageTask(task) {
    localStorage.setItem( task, task);
}

function displayTasks() {
    //Filtra las tareas para que no tome en cuenta esa palabra que surge al recargar mi pagina
    let taskFilter = Object.keys(localStorage).filter(key => !key.startsWith('amplitude_'))
    
    taskFilter.forEach(taskKey => {
        const task = localStorage.getItem(taskKey);
        containerToDo.appendChild(createTaskContainer(task));
    })
    
}