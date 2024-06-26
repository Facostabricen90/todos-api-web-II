document.addEventListener('DOMContentLoaded', (event) => {
    var editTodoModal = document.getElementById('editTodoModal');
    editTodoModal.addEventListener('show.bs.modal', function (event) {
      var buttonModifyTodo = event.relatedTarget;
      var todoIdForModify = buttonModifyTodo.getAttribute('data-todo-id');
      var todoOldTitle = buttonModifyTodo.getAttribute('data-todo-title');
      var todoCompletedChecked = buttonModifyTodo.getAttribute('data-todo-completed') === 'true';

      var modalTitleInput = editTodoModal.querySelector('#editTodoTitle');
      var modalCompletedInput = editTodoModal.querySelector('#editTodoCompleted');
      var modalIdInput = editTodoModal.querySelector('#editTodoId');

      modalTitleInput.value = todoOldTitle;
      modalCompletedInput.checked = todoCompletedChecked;
      modalIdInput.value = todoIdForModify;
    });
  });

  document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const taskId = document.getElementById('taskId2').value;

    try {
      const response = await fetch(`/api/v1/todos/${taskId}`);
      if (!response.ok) {
        throw new Error('Tarea no encontrada');
      }

      const todo = await response.json();
      document.getElementById('taskTitle').innerText = `Título: ${todo.title}`;
      document.getElementById('taskCompleted').innerText = `Completado: ${todo.completed ? 'Sí' : 'No'}`;

      $('#taskModal').modal('show');
    } catch (error) {
      document.getElementById('errorMessage').innerText = error.message;

      $('#errorModal').modal('show');
    }
  });