// Lista de Tarefas - Versão Iniciante

// guarda as tarefas
var tarefas = [];

// pega os elementos do HTML
var form = document.getElementById('task-form');
var input = document.getElementById('task-input');
var list = document.getElementById('task-list');
var errorMessage = document.getElementById('error-message');

// mostra as tarefas na tela
function mostrarTarefas() {
  list.innerHTML = '';

  if (tarefas.length === 0) {
    list.innerHTML = '<li>Nenhuma tarefa por enquanto.</li>';
    return;
  }

  for (var i = 0; i < tarefas.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = tarefas[i] + '<button class="remove-btn" onclick="remover(' + i + ')">Remover</button>';
    list.appendChild(li);
  }
}

// adiciona tarefa
function adicionarTarefa(texto) {
  if (texto.trim() === '') {
    errorMessage.textContent = 'Digite algo!';
    return;
  }
  
  tarefas.push(texto);
  input.value = '';
  errorMessage.textContent = '';
  mostrarTarefas();
}

// remove tarefa
function remover(index) {
  tarefas.splice(index, 1);
  mostrarTarefas();
}

// quando o formulário for enviado
form.addEventListener('submit', function(e) {
  e.preventDefault();
  adicionarTarefa(input.value);
  input.focus();
});

// mostra as tarefas quando a página abre
mostrarTarefas();
