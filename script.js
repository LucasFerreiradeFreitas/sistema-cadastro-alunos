// ==========================================
// SUAS CLASSES (Aluno e GerenciadorDeAlunos)
// ==========================================

class Aluno {
  constructor(id, nome, idade, curso) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notas = [];
    this.status = "ativo";
  }

  adicionarNota(nota) {
    if (nota < 0 || nota > 10) {
      mostrarNotificacao("Nota inválida! Deve estar entre 0 e 10", "erro");
      return false;
    }

    this.notas.push(nota);
    mostrarNotificacao("Nota adicionada com sucesso!", "sucesso");
    return true;
  }

  calcularMedia() {
    if (this.notas.length === 0) {
      return 0;
    }
    const soma = this.notas.reduce((acumulador, nota) => acumulador + nota, 0);
    return soma / this.notas.length;
  }

  verificarAprovacao() {
    const media = this.calcularMedia();
    if (media >= 7) {
      return "Aprovado";
    } else if (media >= 5) {
      return "Recuperação";
    } else {
      return "Reprovado";
    }
  }

  exibirInfo() {
    console.log("\n=== INFORMAÇÕES DO ALUNO ===");
    console.log(`ID: ${this.id}`);
    console.log(`Nome: ${this.nome}`);
    console.log(`Idade: ${this.idade}`);
    console.log(`Curso: ${this.curso}`);
    console.log(`Média: ${this.calcularMedia().toFixed(2)}`);
    console.log(`Status: ${this.verificarAprovacao()}`);
  }
}

class GerenciadorDeAlunos {
  constructor() {
    this.alunos = [];
    this.proximoID = 1;
  }

  cadastrarAluno(nome, idade, curso) {
    const novoAluno = new Aluno(this.proximoID, nome, idade, curso);
    this.alunos.push(novoAluno);
    this.proximoID++;
    mostrarNotificacao(
      `Aluno ${nome} cadastrado com ID: ${novoAluno.id}`,
      "sucesso",
    );
    return novoAluno;
  }

  buscarAlunoPorId(id) {
    return this.alunos.find((aluno) => aluno.id === id);
  }

  buscarAlunoPorNome(nome) {
    return this.alunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(nome.toLowerCase()),
    );
  }

  listarTodosAlunos() {
    return this.alunos;
  }

  listarAlunosAprovados() {
    return this.alunos.filter((aluno) => aluno.calcularMedia() >= 7);
  }

  listarAlunosReprovados() {
    return this.alunos.filter((aluno) => aluno.calcularMedia() < 7);
  }

  removerAluno(id) {
    const index = this.alunos.findIndex((aluno) => aluno.id === id);

    if (index !== -1) {
      const nomeRemovido = this.alunos[index].nome;
      this.alunos.splice(index, 1);
      mostrarNotificacao(`Aluno ${nomeRemovido} removido com sucesso!`, "info");
      return true;
    } else {
      mostrarNotificacao("Aluno não encontrado!", "erro");
      return false;
    }
  }

  obterEstatisticas() {
    const total = this.alunos.length;
    const aprovados = this.alunos.filter((a) => a.calcularMedia() >= 7).length;
    const recuperacao = this.alunos.filter((a) => {
      const media = a.calcularMedia();
      return media >= 5 && media < 7;
    }).length;
    const reprovados = this.alunos.filter((a) => a.calcularMedia() < 5).length;

    let mediaGeral = 0;
    if (total > 0) {
      const somaMedias = this.alunos.reduce(
        (soma, aluno) => soma + aluno.calcularMedia(),
        0,
      );
      mediaGeral = somaMedias / total;
    }

    return {
      total,
      aprovados,
      recuperacao,
      reprovados,
      mediaGeral: mediaGeral.toFixed(2),
    };
  }
}

// ==========================================
// FUNÇÕES DA INTERFACE
// ==========================================

// Instância global do sistema
const sistema = new GerenciadorDeAlunos();

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = "info") {
  const notificacao = document.getElementById("notificacao");
  notificacao.textContent = mensagem;
  notificacao.className = `notificacao ${tipo} show`;

  setTimeout(() => {
    notificacao.classList.remove("show");
  }, 3000);
}

// Renderizar lista de alunos
function renderizarAlunos(alunos) {
  const listaAlunos = document.getElementById("listaAlunos");

  if (alunos.length === 0) {
    listaAlunos.innerHTML =
      '<p class="text-muted">Nenhum aluno encontrado.</p>';
    return;
  }

  listaAlunos.innerHTML = alunos
    .map((aluno) => {
      const status = aluno.verificarAprovacao();
      const badgeClass =
        status === "Aprovado"
          ? "badge-aprovado"
          : status === "Recuperação"
            ? "badge-recuperacao"
            : "badge-reprovado";

      return `
      <div class="aluno-card">
        <div class="aluno-header">
          <h3>${aluno.nome} (ID: ${aluno.id})</h3>
          <span class="badge ${badgeClass}">${status}</span>
        </div>
        
        <div class="aluno-info">
          <div><strong>Idade:</strong> ${aluno.idade} anos</div>
          <div><strong>Curso:</strong> ${aluno.curso}</div>
          <div><strong>Média:</strong> ${aluno.calcularMedia().toFixed(2)}</div>
        </div>
        
        <div class="aluno-notas">
          <strong>Notas:</strong>
          <div class="notas-list">
            ${
              aluno.notas.length > 0
                ? aluno.notas
                    .map(
                      (nota) =>
                        `<span class="nota-badge">${nota.toFixed(1)}</span>`,
                    )
                    .join("")
                : '<span class="text-muted">Nenhuma nota cadastrada</span>'
            }
          </div>
        </div>
        
        <div class="aluno-actions">
          <button onclick="removerAlunoPorId(${aluno.id})" class="btn btn-danger btn-small">Remover</button>
        </div>
      </div>
    `;
    })
    .join("");
}

// Atualizar estatísticas
function atualizarEstatisticas() {
  const stats = sistema.obterEstatisticas();
  const estatisticas = document.getElementById("estatisticas");

  estatisticas.innerHTML = `
    <div class="stat-item">
      <h3>${stats.total}</h3>
      <p>Total de Alunos</p>
    </div>
    <div class="stat-item">
      <h3>${stats.aprovados}</h3>
      <p>Aprovados</p>
    </div>
    <div class="stat-item">
      <h3>${stats.recuperacao}</h3>
      <p>Recuperação</p>
    </div>
    <div class="stat-item">
      <h3>${stats.reprovados}</h3>
      <p>Reprovados</p>
    </div>
    <div class="stat-item">
      <h3>${stats.mediaGeral}</h3>
      <p>Média Geral</p>
    </div>
  `;
}

// Handlers dos formulários
document.getElementById("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = parseInt(document.getElementById("idade").value);
  const curso = document.getElementById("curso").value;

  sistema.cadastrarAluno(nome, idade, curso);

  // Limpar formulário
  e.target.reset();

  // Atualizar interface
  renderizarAlunos(sistema.listarTodosAlunos());
  atualizarEstatisticas();
});

document.getElementById("formNota").addEventListener("submit", (e) => {
  e.preventDefault();

  const id = parseInt(document.getElementById("alunoId").value);
  const nota = parseFloat(document.getElementById("nota").value);

  const aluno = sistema.buscarAlunoPorId(id);

  if (!aluno) {
    mostrarNotificacao("Aluno não encontrado!", "erro");
    return;
  }

  if (aluno.adicionarNota(nota)) {
    e.target.reset();
    renderizarAlunos(sistema.listarTodosAlunos());
    atualizarEstatisticas();
  }
});

// Funções de busca e listagem
function listarTodos() {
  renderizarAlunos(sistema.listarTodosAlunos());
}

function buscarPorNome() {
  const nome = document.getElementById("buscaNome").value;
  const resultados = sistema.buscarAlunoPorNome(nome);
  renderizarAlunos(resultados);
}

function listarAprovados() {
  renderizarAlunos(sistema.listarAlunosAprovados());
}

function listarReprovados() {
  renderizarAlunos(sistema.listarAlunosReprovados());
}

function removerAlunoPorId(id) {
  if (confirm("Tem certeza que deseja remover este aluno?")) {
    sistema.removerAluno(id);
    renderizarAlunos(sistema.listarTodosAlunos());
    atualizarEstatisticas();
  }
}

// Inicializar interface
atualizarEstatisticas();
