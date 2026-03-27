//Lista de Tarefas - Versão Iniciante 

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

  for (let i = 0; i < tarefas.length; i++) {
    let li = document.createElement('li');

    li.innerHTML = `
      <span id="texto-${i}">${tarefas[i]}</span>
      <button onclick="editar(${i})">Editar</button>
      <button class="remove-btn" onclick="remover(${i})">Remover</button>
    `;

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

// editar tarefa (sem popup)
function editar(index) {
  const li = list.children[index];

  li.innerHTML = `
    <input type="text" id="edit-input-${index}" value="${tarefas[index]}">
    <button onclick="salvar(${index})">Salvar</button>
    <button onclick="mostrarTarefas()">Cancelar</button>
  `;
}

// salvar edição
function salvar(index) {
  const inputEdit = document.getElementById(`edit-input-${index}`);
  const novoTexto = inputEdit.value;

  if (novoTexto.trim() === '') {
    errorMessage.textContent = 'A tarefa não pode ficar vazia!';
    return;
  }

  tarefas[index] = novoTexto;
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