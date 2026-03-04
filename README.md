# 📚 Sistema de Cadastro de Alunos

Sistema web completo para gerenciamento de alunos, notas e estatísticas escolares.

![Status](https://img.shields.io/badge/status-concluído-success)
![Licença](https://img.shields.io/badge/licença-MIT-blue)

## 🎯 Funcionalidades

- ✅ Cadastro de alunos (nome, idade, curso)
- ✅ Adição de notas (validação 0-10)
- ✅ Cálculo automático de médias
- ✅ Verificação de aprovação (Aprovado/Recuperação/Reprovado)
- ✅ Busca por nome ou ID
- ✅ Filtros (aprovados/reprovados)
- ✅ Estatísticas da turma
- ✅ Remoção de alunos
- ✅ Interface responsiva

## 🚀 Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3** - Estilização e responsividade
- **JavaScript (ES6+)** - Lógica e interatividade
- **Programação Orientada a Objetos** - Arquitetura

## 💻 Como Usar

1. Clone o repositório:

```bash
git clone https://github.com/LucasFerreiradeFreitas/sistema-cadastro-alunos.git
```

2. Abra o arquivo `index.html` no navegador

3. Pronto! O sistema está funcionando.

## 📁 Estrutura do Projeto

```
sistema-alunos/
├── index.html      # Estrutura da página
├── style.css       # Estilos e design
├── script.js       # Lógica JavaScript
└── README.md       # Documentação
```

## 🏗️ Arquitetura

O projeto utiliza **Programação Orientada a Objetos** com duas classes principais:

### Classe Aluno

- Gerencia dados individuais do aluno
- Calcula médias
- Verifica aprovação

### Classe GerenciadorDeAlunos

- CRUD completo (Create, Read, Update, Delete)
- Busca e filtros
- Geração de estatísticas

## 📊 Funcionalidades Detalhadas

### Cadastro

- Formulário com validação
- ID automático
- Campos obrigatórios

### Notas

- Validação (0-10)
- Múltiplas notas por aluno
- Cálculo de média em tempo real

### Estatísticas

- Total de alunos
- Quantidade de aprovados
- Quantidade em recuperação
- Quantidade de reprovados
- Média geral da turma

## 🎯 Aprendizados

Este projeto foi desenvolvido para praticar:

- JavaScript ES6+ (Classes, Arrow Functions, Destructuring)
- Manipulação de DOM
- Event Listeners
- Array Methods (map, filter, reduce, find)
- Validação de dados
- Interface responsiva

## 👨‍💻 Autor

**Lucas Ferreira de Freitas**

- GitHub: [@LucasFerreiradeFreitas](https://github.com/LucasFerreiradeFreitas)
- LinkedIn: [Lucas Freitas](https://linkedin.com/in/lucas-ferreira-freitas)

## 🚀 Próximas Melhorias

- [ ] LocalStorage (persistência de dados)
- [ ] Edição de alunos
- [ ] Múltiplas disciplinas
- [ ] Exportação em PDF
- [ ] Gráficos de desempenho
- [ ] Sistema de login

---

⭐ Se este projeto te ajudou, deixe uma estrela!
