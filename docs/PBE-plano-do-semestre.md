# PBE — Planejamento do 2º Semestre (2º sem/2026)

**UC:** Programação Back-End (PBE) — 105h
**Turma:** 1-2026-SESI_DEV_OC_1
**Docente:** Wagner de Campos Sabor Junior
**Período:** 22/07/2026 a 09/12/2026 — quartas (5 aulas) + sextas (2 aulas) = **140 aulas fixas**
**Projeto integrador:** API de Gestão da Livraria (SA1), compartilhada com a UC de Projetos de Software (PSOF)

---

# 📅 CRONOGRAMA

*Replanejado em 30/09/2026, conforme `PBE_replanejado.xlsx`. Esta seção é a referência diária — o restante do documento é contexto de apoio.*

**Lógica semanal:** quarta-feira (5 aulas) traz o conteúdo novo e mais denso; sexta-feira (2 aulas) consolida, pratica e fecha entregas.

### Bloco 1 — Fundamentos, Ambiente e POO

| # | Data | Status | Conteúdo | Prática | Avaliação |
|---|---|---|---|---|---|
| 1 | 22/07 | ✅ | Aula inaugural: projeto integrador, arquitetura cliente-servidor, metodologia e avaliação | Acolhimento e integração da turma | Diagnóstica: sondagem de conhecimentos prévios |
| 2 | 24/07 | ✅ | Overview do ecossistema de ferramentas (Node.js, VS Code, Git/GitHub, Postman) | Formação dos grupos; repositórios GitHub | Formativa: grupos e repositórios criados |
| 3 | 29/07 | ✅ | Ambiente de desenvolvimento: Node.js, npm, VS Code, `package.json` | `npm init`, Nodemon, ESLint, primeiro script Node | Formativa: ambiente configurado |
| 4 | 31/07 | ✅ | Continuação: fluxo cliente-servidor | Pendências de ambiente; padronização entre grupos | Formativa: checklist de ambiente |
| 5 | 05/08 | ✅ | POO em JavaScript: classes, atributos, métodos, encapsulamento | Classes `Livro` e `Categoria` | Formativa: revisão do encapsulamento |
| 6 | 07/08 | ✅ | Herança e polimorfismo | Exercícios aplicados à livraria | Formativa: exercícios em grupo |
| 7 | 12/08 | ✅ | Herança e polimorfismo (segunda sessão) | Consolidação dos exercícios | Formativa: exercícios em grupo |
| 8 | 14/08 | ✅ | Composição e introdução a clean code | Refino das classes; ponte para UML | Formativa: entidades modeladas |

### Bloco 2 — Modelagem: UML, MVC e Clean Code

| # | Data | Status | Conteúdo | Prática | Avaliação |
|---|---|---|---|---|---|
| 9 | 19/08 | ✅ | Composição e clean code (segunda sessão) | Continuação do refino de classes | Formativa: entidades modeladas |
| 10 | 21/08 | ✅ | Diagrama de classes UML e relacionamentos | Modelagem UML da livraria em Draw.io | Formativa: rascunho do diagrama |
| 11 | 26/08 | ✅ | Padrão MVC e separação de responsabilidades | Esqueleto MVC em camadas vazias | Formativa: estrutura de pastas validada |
| 12 | 28/08 | ✅ | Fluxo completo de uma requisição pelas camadas | Coerência entre UML e pastas | Formativa: coerência diagrama × estrutura |
| 13 | 02/09 | ✅ | Clean code e refatoração contínua | Refatoração guiada + code review entre pares | Formativa: revisão entre pares |
| 14 | 04/09 | ✅ | Consolidação do Bloco 2; ponte para o Express | Entrega da modelagem consolidada | **Formativa: ENTREGA** UML + esqueleto + código |

### Bloco 3 — Express, HTTP e API REST em memória

| # | Data | Status | Conteúdo | Prática | Avaliação |
|---|---|---|---|---|---|
| 15 | 09/09 | ✅ | Framework Express.js: rotas e middlewares | Primeiro servidor Express no esqueleto MVC | Formativa: servidor rodando |
| 16 | 11/09 | ✅ | Express (segunda sessão) | Consolidação do servidor e das rotas iniciais | Formativa: servidor rodando |
| 17 | 16/09 | ✅ | Rotas nas camadas do MVC; middlewares e ordem de execução | Agregador de rotas; middleware de log | Formativa: rotas organizadas |
| 18 | 18/09 | ✅ | Rotas e middlewares (segunda sessão) | Consolidação | Formativa: rotas organizadas |
| 19 | 23/09 | ✅ | Protocolo HTTP: métodos, cabeçalhos, media types, status codes | Pesquisa em cadeia + rotas para os 5 métodos | Formativa: rotas com status corretos |
| 20 | 25/09 | ✅ | Protocolo HTTP (repetição) | Consolidação dos métodos HTTP | Formativa: rotas com status corretos |
| 21 | 30/09 | ✅ | Route params, query params e body | Rotas parametrizadas e leitura de body JSON | Formativa: exercícios com parâmetros |
| 22 | 02/10 | ⬜ | Consolidação dos três tipos de parâmetro; revisão do CRUD em memória | Filtros por query params; conferência dos 5 métodos | Formativa: exercícios de parâmetros |
| — | 07/10 | 🟡 | **CARGA REDUZIDA — Semana da Criança** | Pendências da API em memória, sem conteúdo novo | Formativa: checagem de pendências |
| — | 09/10 | 🟡 | **CARGA REDUZIDA — Semana da Criança** | Pendências da API em memória, sem conteúdo novo | Formativa: checagem de pendências |
| 23 | 14/10 | ⬜ | Princípios REST: recursos, semântica de URL; troca do índice por `id` | CRUD REST em memória completo com `id` (Livro e Categoria) | Formativa: CRUD REST em memória |
| 24 | 16/10 | ⬜ | Testes sistemáticos com Postman: coleções e variáveis | Coleção Postman cobrindo o CRUD | Formativa: coleção Postman |
| 25 | 21/10 | ⬜ | Validação de entrada e tratamento de erros (400/404/500); middleware de erro | Validações e respostas de erro padronizadas | Formativa: casos de erro tratados |
| 26 | 23/10 | ⬜ | Consolidação do Bloco 3 | Ajustes finais da API em memória | **Formativa: ENTREGA** da API RESTful em memória (grupo) |

### Bloco 4 — Persistência em MySQL com SQL puro (sem ORM)

| # | Data | Status | Conteúdo | Prática | Avaliação |
|---|---|---|---|---|---|
| 27 | 28/10 | ⬜ | Por que sair da memória; revisão de SQL (BCD); driver `mysql2`; `.env` | Script `.sql` de criação; conexão; `GET /livros` do banco | Formativa: conexão e listagem do banco |
| 28 | 30/10 | ⬜ | Consulta por `id` com `SELECT ... WHERE` e placeholders `?` | `GET /livros/:id` do banco; pendências de conexão | Formativa: Read funcionando |
| 29 | 04/11 | ⬜ | `INSERT`, `UPDATE`, `DELETE` pelo service; noção de SQL injection | Migração de POST, PUT/PATCH e DELETE para o MySQL | Formativa: CRUD de Livro persistido |
| 30 | 06/11 | ⬜ | Erros de banco e respostas HTTP adequadas | Tratamento de erros; coleção Postman contra o MySQL | Formativa: CRUD persistido testado |
| 31 | 11/11 | ⬜ | Relacionamento Livro–Categoria: chave estrangeira e `JOIN` | CRUD de Categoria; listagem de livros com categoria | Formativa: relacionamento funcionando |
| 32 | 13/11 | ⬜ | Consolidação do Bloco 4; script `.sql` de criação e carga inicial | Ajustes finais da persistência | **Formativa: ENTREGA** da API com MySQL (grupo) |

### Fechamento do projeto e Situação de Avaliação Somativa

| # | Data | Status | Conteúdo | Prática | Avaliação |
|---|---|---|---|---|---|
| 33 | 18/11 | ⬜ | Documentação (README + coleção Postman), refatoração final, code review; apresentação da somativa | Entrega final da livraria; simulado da prova prática | **Formativa: ENTREGA FINAL** da livraria (grupo); simulado |
| — | 20/11 | 🛑 | **FERIADO NACIONAL** — Dia de Zumbi e da Consciência Negra | — | — |
| 34 | 25/11 | ⬜ | **SITUAÇÃO DE AVALIAÇÃO SOMATIVA** — prova prática individual: API REST de To-Do List em Express + MVC | Desenvolvimento individual em sala; entrega no GitHub ao final | **Somativa (individual):** Ficha de Observação + código |
| 35 | 27/11 | ⬜ | Devolutiva da somativa | Feedback individual; autoavaliação; orientação de recuperação | Formativa: autoavaliação e devolutiva |

### Reserva

| # | Data | Status | Uso previsto |
|---|---|---|---|
| 36 | 02/12 | 🔵 | Absorver atrasos; recuperação da somativa para ausentes ou abaixo do esperado; pendências do projeto |
| 37 | 04/12 | 🔵 | Dúvidas, feedback individual, finalização de projetos e portfólio no GitHub |
| 38 | 09/12 | 🔵 | Encerramento da UC: balanço do semestre, autoavaliação final, ponte para a SA2 |

---

## O que mudou no replanejamento de 30/09

| Mudança | Motivo |
|---|---|
| **ORM removido** — Sequelize, models do Sequelize, associações, migrations e seeds saem do plano | Nível da turma. Persistência passa a ser `mysql2` com SQL puro, aproveitando o SQL já visto em BCD |
| Migrations e seeds substituídos por **um script `.sql` versionado** no repositório | Mesmo resultado prático (banco recriável em qualquer máquina) com uma ferramenta que a turma já conhece |
| **Swagger removido**; documentação passa a ser README com a lista de endpoints + coleção Postman exportada | Reduz ferramentas novas; a coleção Postman já é construída no Bloco 3 |
| Middleware de erro antecipado do antigo Bloco 5 para 21/10, em versão simples | Evita uma aula inteira de conteúdo novo no fim do semestre |
| Troca de índice por `id` no CRUD em memória (14/10) | Prepara a chegada do banco, onde `id` é natural; resolve o problema dos índices que "andam" após um DELETE |
| **Somativa individual** vira **prova prática em sala num único dia** (25/11, quarta de 5 aulas) | O projeto individual em 4 encontros não cabia antes das reservas |
| Quartas voltam a ter conteúdo novo; sextas voltam a ser consolidação | A repetição de 25/09 havia deslocado o conteúdo denso para uma sexta (02/10) |
| **02/12, 04/12 e 09/12** viram reserva | Absorver atrasos, recuperação e a baixa frequência típica do fim do ano |

---

## Decisões de escopo

| Item | Decisão |
|---|---|
| Projeto formativo (SA1) | API de Gestão da Livraria — grupo, repositório `livraria-api-grupoN` |
| Somativa | Prova prática individual em sala (25/11): API REST de To-Do List em Express + MVC, CRUD completo, status codes e validações; MySQL como critério desejável |
| Stack | Node.js, Express.js, MySQL com `mysql2` (sem ORM) |
| Persistência | Em memória até 23/10; MySQL com SQL puro a partir de 28/10 |
| Documentação de API | README com os endpoints + coleção Postman exportada (sem Swagger) |
| Banco | Script `.sql` único, versionado, com criação das tabelas e carga inicial |
| Repositórios | Grupo: `livraria-api-grupoN`. Individual: `programacao-backend`, tratado como portfólio |
| Total de aulas | Fixo em 140. O feriado de 20/11 zera uma sexta; 09/12 repõe as 2 aulas |

## Restrições do contexto

| Restrição | Consequência no planejamento |
|---|---|
| **Ritmo da turma mais lento que o previsto** | Vários conteúdos ocuparam 2 sessões; ORM e Swagger foram retirados |
| **Sexta-feira compartilhada com PSOF** | PBE usa 2 das 5 aulas; atrasos em PBE consomem horário de PSOF |
| **Turma sem experiência prévia em JS/Node** | Código majoritariamente pronto com lacunas curtas; material de apoio que liga os pontos entre aulas |
| **Frequência baixa no fim do ano** | Somativa em 25/11, antes do período de maior ausência; três reservas no final |
| **Total de aulas é rígido** | Qualquer perda precisa ser absorvida pelas reservas, não pelo calendário |

## Capacidades técnicas a desenvolver

- **CT 1** — POO aplicada ao domínio do projeto
- **CT 2** — Modelagem UML
- **CT 3** — Clean code e refatoração
- **CT 4, 5** — Ambiente de desenvolvimento back-end
- **CT 6** — Protocolo HTTP e JSON
- **CT 7** — Padrão MVC
- **CT 8** — Rotas e middlewares (Express)
- **CT 9** — Persistência em banco de dados relacional
- **CT 12, 13** — Construção e validação de APIs RESTful

## Princípio norteador

```
Bloco 1   Fundamentos e POO         →  as entidades do domínio existem como classes
Bloco 2   UML + MVC + Clean Code    →  a estrutura do projeto é modelada e organizada
Bloco 3   Express + REST            →  a API responde de verdade, em memória
Bloco 4   MySQL com SQL puro         →  os dados sobrevivem ao reinício do servidor
Fechamento Documentação + prova      →  a turma prova, sozinha, que sabe construir uma API
```

## Alertas de planejamento

**1. Formato da somativa mudou.** A Situação de Avaliação Somativa passou de projeto individual em vários encontros para prova prática individual em um único dia. Vale conferir se o Plano de Ensino precisa de ajuste formal na seção de avaliação e alinhar com a coordenação.

**2. CT 9 sem ORM.** Se a redação da CT 9 no Plano de Ensino mencionar ORM explicitamente, a capacidade continua sendo desenvolvida (persistência em banco relacional), mas com outra técnica. Vale registrar a justificativa pedagógica.

**3. Semana da Criança.** 07/10 e 09/10 somam 7 aulas de carga reduzida. Se alguma delas acontecer normalmente, dá para antecipar o conteúdo de 14/10 e ganhar folga para o Bloco 4.

**4. Reservas são a única margem.** Não há mais folga dentro dos blocos. Um novo imprevisto deve consumir primeiro 02/12, depois 04/12; 09/12 fica para o encerramento.

**5. Duplicações registradas na planilha.** 12/08, 19/08, 11/09, 18/09 e 25/09 aparecem como repetição da aula anterior — é o registro real do ritmo da turma, não erro de preenchimento.
