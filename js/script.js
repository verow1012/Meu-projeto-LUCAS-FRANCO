// AV1 — Create + Read (Lista de Tarefas)
// Versão bem didática para iniciantes: comentários passo a passo

// 1) Array para guardar as tarefas na memória (somente enquanto a página estiver aberta)
// Chave usada no localStorage
var STORAGE_KEY = 'tarefasAV1';

// Array para guardar as tarefas
var tarefas = [];

// 2) Seleção de elementos do HTML (campos e área onde vamos mostrar as tarefas)
// Usamos getElementById porque é simples e direto para iniciantes.
var form = document.getElementById('task-form');
var input = document.getElementById('task-input');
var list = document.getElementById('task-list');
var errorMessage = document.getElementById('error-message');

// 3) Função para verificar se o texto digitado é válido
function validarTarefa(texto) {
  // se não for string, não é válido
  if (typeof texto !== 'string') {
    return false;
  }

  // trim() remove espaços no começo e no fim
  // se, depois do trim, a string ficar vazia, não é válido
  if (texto.trim() === '') {
    return false;
  }

  // passou nas verificações: é válido
  return true;
}

// 4) Função que desenha a lista de tarefas na tela (render)
function renderTarefas() {
  // limpa o conteúdo atual da lista
  list.innerHTML = '';

  // se não houver tarefas, mostramos uma mensagem simples
  if (tarefas.length === 0) {
    var liEmpty = document.createElement('li');
    liEmpty.textContent = 'Nenhuma tarefa por enquanto.';
    list.appendChild(liEmpty);
    return; // sai da função
  }

  // se houver tarefas, criamos um elemento <li> para cada uma
  for (var i = 0; i < tarefas.length; i++) {
    var li = document.createElement('li');

    // texto da tarefa
    var span = document.createElement('span');
    span.textContent = tarefas[i];
    li.appendChild(span);

    // botão remover
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Remover';
    btn.className = 'remove-btn';
    // guarda o índice no atributo data-index
    btn.setAttribute('data-index', String(i));
    btn.setAttribute('aria-label', 'Remover tarefa ' + tarefas[i]);
    // adiciona listener que lê o índice e chama a função de remoção
    btn.addEventListener('click', function (e) {
      var idx = parseInt(e.target.getAttribute('data-index'), 10);
      removerTarefa(idx);
    });

    li.appendChild(btn);
    list.appendChild(li);
  }
}

// 10) Função para remover tarefa pelo índice
function removerTarefa(index) {
  if (index >= 0 && index < tarefas.length) {
    tarefas.splice(index, 1); // remove 1 elemento na posição index
    salvarTarefas(); // atualiza o localStorage
    renderTarefas(); // atualiza a interface
  }
}

// 5) Mostrar e limpar mensagens de erro no DOM
function mostrarErro(msg) {
  errorMessage.textContent = msg; // escreve a mensagem no <p id="error-message">
}

function limparErro() {
  errorMessage.textContent = '';
}

// 6) Quando o formulário for enviado (usuário clica em adicionar ou pressiona Enter)
form.addEventListener('submit', function (e) {
  e.preventDefault(); // evita que a página recarregue

  var texto = input.value; // pega o texto que o usuário digitou

  // valida o texto
  if (!validarTarefa(texto)) {
    mostrarErro('Por favor, digite uma tarefa válida (não pode ficar vazia).');
    return; // para aqui: não adiciona tarefa inválida
  }

  // adiciona a tarefa ao array (usamos trim para remover espaços extras)
  tarefas.push(texto.trim());

  // salvamos no localStorage sempre que alteramos o array
  salvarTarefas();

  // limpa o campo de input e a mensagem de erro
  input.value = '';
  limparErro();

  // atualiza a lista mostrada na tela
  renderTarefas();

  // coloca o foco de volta no campo para facilitar adicionar outra tarefa
  input.focus();
});

// 7) Quando o usuário digita no campo, verificamos se já é válido para esconder o erro
input.addEventListener('input', function () {
  if (validarTarefa(input.value)) {
    limparErro();
  }
});

// 8) Render inicial para mostrar mensagem "Nenhuma tarefa" quando a página abrir
// Antes de renderizar, tentamos carregar tarefas salvas no localStorage
carregarTarefas();
renderTarefas();

// 9) Funções para salvar/carregar o array de tarefas no localStorage
function salvarTarefas() {
  try {
    var json = JSON.stringify(tarefas);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (err) {
    // Se ocorrer erro (por exemplo, quota cheia), apenas logamos para o desenvolvedor
    // Mas não impedimos o funcionamento básico da aplicação
    console.error('Erro ao salvar tarefas no localStorage:', err);
  }
}

function carregarTarefas() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      // só usa se for um array
      if (Array.isArray(parsed)) {
        tarefas = parsed;
      }
    }
  } catch (err) {
    // se houver JSON inválido ou outro erro, começamos com array vazio
    console.error('Erro ao carregar tarefas do localStorage:', err);
    tarefas = [];
  }
}
