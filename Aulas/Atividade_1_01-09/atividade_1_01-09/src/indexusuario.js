import './styleindexusuario.css'

// Executa o script após o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
  // === VARIÁVEIS GLOBAIS ===
  const toggle = document.querySelector(".menu-toggle");         // Botão do menu hambúrguer
  const menu = document.querySelector(".menu");                  // Elemento do menu
  const tipoUsuario = localStorage.getItem("tipoUsuario");       // Tipo de usuário: 'dono' ou 'usuario'
  const usuarioLogado = localStorage.getItem("usuarioLogado") === "true"; // Verifica se está logado

  // === MENU HAMBÚRGUER ===
  if (toggle && menu) {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();           // Evita que o clique no botão feche o menu imediatamente
      menu.classList.toggle("active");   // Alterna a visibilidade do menu
    });

    document.addEventListener("click", (event) => {
      // Fecha o menu ao clicar fora dele
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove("active");
      }
    });
  }

  // === SE FOR DONO: MOSTRA LINK PARA O PAINEL E ESCONDE ITENS PARA USUÁRIO COMUM ===
  if (tipoUsuario === "dono") {
    const painelLink = document.createElement("li");
    painelLink.innerHTML = `
      <img src="/Projeto Final/Imagens/Icones/iconedepainel.png" alt="Painel" width="30" />
      <a href="painel.html">Painel</a>
    `;
    menu.appendChild(painelLink);

    // Remove itens disponíveis apenas para usuários comuns
    document.querySelector(".auth-container")?.remove();
    document.querySelector(".carrinho-container")?.remove();
    document.querySelector(".estante-container")?.remove();
  }

  // === USUÁRIO COMUM: CONFIGURAÇÃO DOS POPUPS DE CARRINHO E ESTANTE ===
  if (tipoUsuario === "usuario") {
    const carrinhoContainer = document.querySelector(".carrinho-container");
    const popupCarrinho = document.querySelector(".popup-carrinho");

    if (carrinhoContainer && popupCarrinho) {
      if (!usuarioLogado) {
        // Exibe o popup de login/cadastro ao passar o mouse
        carrinhoContainer.addEventListener("mouseenter", () => popupCarrinho.classList.add("active"));
        carrinhoContainer.addEventListener("mouseleave", () => {
          setTimeout(() => {
            if (!popupCarrinho.matches(":hover")) popupCarrinho.classList.remove("active");
          }, 150);
        });
        popupCarrinho.addEventListener("mouseleave", () => popupCarrinho.classList.remove("active"));

        // Botões dentro do popup redirecionam para login ou cadastro
        document.getElementById("btn-login-popup")?.addEventListener("click", () => window.location.href = "login.html");
        document.getElementById("btn-cadastro-popup")?.addEventListener("click", () => window.location.href = "cadastro.html");
      } else {
        // Se estiver logado, link já envia ao carrinho
        document.getElementById("link-carrinho").href = "carrinho.html";
      }
    }

    const estanteContainer = document.querySelector(".estante-container");
    const popupEstante = document.querySelector(".popup-estante");

    if (estanteContainer && popupEstante) {
      if (!usuarioLogado) {
        // Pop-up de estante para não-logados
        estanteContainer.addEventListener("mouseenter", () => popupEstante.classList.add("active"));
        estanteContainer.addEventListener("mouseleave", () => {
          setTimeout(() => {
            if (!popupEstante.matches(":hover")) popupEstante.classList.remove("active");
          }, 150);
        });
        popupEstante.addEventListener("mouseleave", () => popupEstante.classList.remove("active"));

        // Botões redirecionam ao login ou cadastro
        document.getElementById("btn-login-estante")?.addEventListener("click", () => window.location.href = "login.html");
        document.getElementById("btn-cadastro-estante")?.addEventListener("click", () => window.location.href = "cadastro.html");
      } else {
        // Link direto à estante se logado
        document.getElementById("link-estante").href = "estante.html";
      }
    }
  }

  // === POPUP DE LOGIN / CADASTRO (PERFIL) ===
  const authContainer = document.querySelector(".auth-container");
  if (authContainer) {
    if (usuarioLogado) {
      authContainer.remove(); // Remove se já logado
    } else {
      // Botões que redirecionam para login/cadastro
      document.getElementById("auth-login")?.addEventListener("click", () => window.location.href = "login.html");
      document.getElementById("auth-cadastro")?.addEventListener("click", () => window.location.href = "cadastro.html");
    }
  }

  // === BUSCA E EXIBE OS LIVROS ===
  const container = document.getElementById("livros-container");
  window.livros = [];  // Armazenará os livros recebidos

  fetch("/Projeto Final/PHP/buscar_livros.php")
    .then(res => res.json())
    .then(data => {
      if (data.success && Array.isArray(data.livros)) {
        window.livros = data.livros;
        renderizarLivros(window.livros); // Renderiza os livros na página
      } else {
        console.error("Erro ao buscar livros:", data.message);
        container.innerHTML = "<p>Erro ao carregar os livros.</p>";
      }
    })
    .catch(err => {
      console.error("Erro na requisição:", err);
      container.innerHTML = "<p>Erro de conexão ao carregar livros.</p>";
    });

  // === FILTROS: elementos do DOM ===
  const inputTitulo = document.getElementById("filtro-titulo");
  const filtroGenero = document.getElementById("filtro-genero");
  const filtroOrdenacao = document.getElementById("filtro");
  const filtroColecao = document.getElementById("filtro-colecao");
  const filtroEditora = document.getElementById("filtro-editora");
  const filtroFormato = document.getElementById("formato");
  const btnFiltrar = document.getElementById("btn-filtrar");

  // Função que renderiza os livros na tela
  function renderizarLivros(lista) {
    container.innerHTML = ""; // Limpa o container

    if (!lista || lista.length === 0) {
      container.innerHTML = "<p>Nenhum livro encontrado.</p>";
      return;
    }

    lista.forEach((livro) => {
      const card = document.createElement("div");
      card.classList.add("livro-card");

      const preco = parseFloat(livro.preco).toFixed(2);
      const sinopse = livro.sinopse?.slice(0, 200) || "Sinopse não disponível.";

      card.innerHTML = `
        <img src="${livro.imagem}" alt="Capa de ${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p><strong>R$ ${preco}</strong></p>
        <div class="accordion">
          <div class="accordion-conteudo">
            <p class="sinopse-previa">${sinopse}...</p>
          </div>
        </div>
      `;

      // Adiciona botão de detalhes se for usuário comum (não dono)
      if (!tipoUsuario || tipoUsuario === "usuario") {
        const btnDetalhes = document.createElement("button");
        btnDetalhes.className = "btn-detalhes";
        btnDetalhes.textContent = "Ver Detalhes";
        btnDetalhes.addEventListener("click", () => {
          // Armazena o livro selecionado e redireciona
          localStorage.setItem("livroSelecionado", JSON.stringify(livro));
          window.location.href = "livro.html";
        });
        card.appendChild(btnDetalhes);
      }

      container.appendChild(card);
    });
  }

  // Função que aplica filtros aos livros exibidos
  function aplicarFiltroIndependente() {
    const titulo = inputTitulo.value.toLowerCase().trim();
    const genero = filtroGenero.value;
    const ordem = filtroOrdenacao.value;
    const colecao = filtroColecao.value.toLowerCase().trim();
    const editora = filtroEditora.value.toLowerCase().trim();
    const formato = filtroFormato.value;

    let livrosFiltrados = [...window.livros]; // Cria cópia dos livros

    if (titulo) livrosFiltrados = livrosFiltrados.filter(l => l.titulo.toLowerCase().includes(titulo));
    if (genero) livrosFiltrados = livrosFiltrados.filter(l => l.genero === genero);
    if (colecao) livrosFiltrados = livrosFiltrados.filter(l => l.colecao?.toLowerCase().includes(colecao));
    if (editora) livrosFiltrados = livrosFiltrados.filter(l => l.editora?.toLowerCase().includes(editora));
    if (formato) livrosFiltrados = livrosFiltrados.filter(l => l.formato === formato);

    // Ordena conforme opção selecionada
    switch (ordem) {
      case "ordem-alfabetica":
        livrosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case "ordem-alfabetica-decrescente":
        livrosFiltrados.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      case "mais-vendidos":
        livrosFiltrados.sort((a, b) => (b.vendas || 0) - (a.vendas || 0));
        break;
      case "menos-vendidos":
        livrosFiltrados.sort((a, b) => (a.vendas || 0) - (b.vendas || 0));
        break;
      case "lancamentos":
        livrosFiltrados.sort((a, b) => new Date(b.lancamento) - new Date(a.lancamento));
        break;
      case "melhor-avaliados":
        livrosFiltrados.sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0));
        break;
    }

    renderizarLivros(livrosFiltrados); // Atualiza tela com os livros filtrados
  }

  // Define eventos para aplicar filtros
  btnFiltrar?.addEventListener("click", aplicarFiltroIndependente);
  filtroOrdenacao?.addEventListener("change", aplicarFiltroIndependente);
});
