
# Lista de Tarefas — AV1

Projeto simples para a AV1: Create + Read usando HTML, CSS e JavaScript puro.

Entrada principal:

- `home.html` — página principal (arquivo usado para abrir a aplicação)

Outros arquivos:

- `css/style.css` — estilos
- `js/script.js` — lógica JavaScript (versão didática, com comentários)

Como testar (Windows):

1. Abra o Explorador de Arquivos e dê duplo-clique em `home.html` para abrir no navegador.
2. Alternativa (recomendado para desenvolvimento): usar a extensão Live Server no VS Code.
3. Digite uma tarefa e clique em "Adicionar" ou pressione Enter.
4. Se o campo estiver vazio, uma mensagem de erro aparece no DOM.

Por que `home.html`?

Escolhi `home.html` como entrada principal para evitar duplicação. O conteúdo é simples e voltado para iniciantes.

Requisitos atendidos (resumo):

- Estrutura de pastas: `css/` e `js/` separadas.
- JS conectado via `<script src="js/script.js" defer>` em `home.html`.
- Uso de variáveis (`let`), array `tarefas`, funções `renderTarefas()` e `validarTarefa()`.
- Manipulação do DOM usando `getElementById`, `textContent`, criação de elementos e `appendChild`.
- Eventos com `addEventListener` e prevenção de comportamento padrão do formulário (`event.preventDefault()`).
- Validação com `trim()` e feedback no DOM (mensagem que desaparece ao digitar).

Observações para entrega:

- Confirme que o repositório no GitHub contenha todos os arquivos (`home.html`, `css/`, `js/`, `README.md`).
- Para a segunda parte da AV1, podemos adicionar remoção/edição de tarefas e persistência com `localStorage`.

Boa sorte na entrega — se quiser, eu preparo commits e um `.gitignore` básico para o repositório.

Persistência (localStorage):

- Esta versão já salva as tarefas no `localStorage` do navegador usando a chave `tarefasAV1`.
- As tarefas permanecem salvas mesmo se você fechar e reabrir o navegador (no mesmo computador e navegador).
- Para limpar as tarefas salvas, abra as ferramentas do desenvolvedor (F12) > Application > Local Storage e remova a chave `tarefasAV1`, ou remova os dados do site.

