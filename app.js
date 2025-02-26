// Cargar tareas desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
  });
  
  // Agregar una tarea
  document.getElementById('add-button').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
  
    if (taskText) {
      addTaskToList(taskText);
      saveTasks();
    }
    taskInput.value = ''; // Limpiar el campo de texto
  });
  
  // Función para agregar una tarea
  function addTaskToList(taskText) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="delete-button">Eliminar</button>
    `;
    
    // Marcar tarea como completada
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks(); // Guardar tareas después de marcar como completada
    });
  
    // Eliminar tarea
    li.querySelector('.delete-button').addEventListener('click', (e) => {
      e.stopPropagation(); // Evitar que se dispare el evento de "completar"
      li.remove();
      saveTasks();
    });
  
    taskList.appendChild(li);
  }
  
  // Guardar tareas en localStorage
  function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
  
    taskList.querySelectorAll('li').forEach(li => {
      const taskText = li.querySelector('.task-text').textContent;
      const isCompleted = li.classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Cargar tareas desde localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    tasks.forEach(task => {
      const taskText = task.text;
      const isCompleted = task.completed;
      const li = document.createElement('li');
      
      li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-button">Eliminar</button>
      `;
      
      if (isCompleted) {
        li.classList.add('completed');
      }
  
      // Marcar tarea como completada
      li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
      });
  
      // Eliminar tarea
      li.querySelector('.delete-button').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
      });
  
      document.getElementById('task-list').appendChild(li);
    });
  }
  