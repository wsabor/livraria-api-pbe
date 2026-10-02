# 📝 Atividade 05 — Diagrama de Classes da Livraria (rascunho)

**UC:** Programação Back-End | **Bloco 2 — Aula de 21/08/2026**
**Formato:** EM GRUPO, no Draw.io | **Tempo:** 30 minutos
**Avaliação:** formativa — rascunho do diagrama de classes por grupo

---

## Objetivo

Desenhar, em grupo, o rascunho do diagrama de classes da Livraria, usando as classes que vocês já escreveram em código **mais duas novas** (`Pedido` e `ItemPedido`), aplicando os 4 tipos de relacionamento vistos hoje.

> Não precisa terminar hoje — é rascunho. Retomamos na próxima aula.

---

## Antes de começar

1. Abram [app.diagrams.net](https://app.diagrams.net) → **Device**.
2. Um integrante compartilha a tela (ou todos acessam juntos, se o laboratório permitir edição compartilhada — nesse caso, criem o arquivo e enviem o link para o grupo).
3. Combinem quem desenha cada bloco de classes — sugestão na tabela abaixo.

| Quem         | Responsável por desenhar                                          |
| ------------ | ----------------------------------------------------------------- |
| Integrante 1 | `Livro`, `LivroFisico`, `LivroDigital` (com a herança entre eles) |
| Integrante 2 | `Categoria` e a relação dela com `Livro`                          |
| Integrante 3 | `Pessoa`, `Cliente`, `Funcionario` (com a herança entre eles)     |
| Integrante 4 | `Carrinho`, `Pedido`, `ItemPedido` e as relações entre eles       |

Se o grupo tiver menos de 4 integrantes, acumulem blocos — mas cada um precisa ter desenhado ao menos uma parte visível do diagrama.

---

## Parte 1 — As caixas de classe (10 min)

Desenhem uma caixa para cada classe abaixo, com nome, atributos (com `-`/`+`) e métodos. Usem o que vocês já escreveram em código nas aulas anteriores — não precisa inventar nada novo aqui, só desenhar o que já existe.

**Classes já existentes (retirem do código de 05/08, 07/08 e 12/08):**

- `Livro`
- `Categoria`
- `LivroFisico`
- `LivroDigital`
- `Pessoa`
- `Cliente`
- `Funcionario`
- `Carrinho`

**Duas classes novas, só no diagrama de hoje (ainda não existem em código):**

```
┌───────────────────────────┐
│        Pedido             │
├───────────────────────────┤
│ - numero: number          │
│ - data: string            │
├───────────────────────────┤
│ + calcularTotal(): number │
└───────────────────────────┘

┌──────────────────────────────┐
│      ItemPedido              │
├──────────────────────────────┤
│ - quantidade: number         │
├──────────────────────────────┤
│ + calcularSubtotal(): number │
└──────────────────────────────┘
```

---

## Parte 2 — Os relacionamentos (15 min)

Conectem as caixas com o relacionamento **correto** para cada par. Usem o teste da pergunta que está no guia sempre que tiverem dúvida entre agregação e composição.

| Classe A       | Relação | Classe B     | Tipo esperado                 |
| -------------- | ------- | ------------ | ----------------------------- |
| `LivroFisico`  | —       | `Livro`      | herança                       |
| `LivroDigital` | —       | `Livro`      | herança                       |
| `Cliente`      | —       | `Pessoa`     | herança                       |
| `Funcionario`  | —       | `Pessoa`     | herança                       |
| `Livro`        | —       | `Categoria`  | agregação                     |
| `Carrinho`     | —       | `Livro`      | agregação                     |
| `Pedido`       | —       | `ItemPedido` | composição                    |
| `ItemPedido`   | —       | `Livro`      | associação                    |
| `Funcionario`  | —       | `Cliente`    | associação (rótulo: "atende") |

> 🤔 Antes de desenhar cada linha, discutam em voz alta: **qual dos 4 tipos é esse, e por quê?** Não preencham a tabela só olhando a coluna "Tipo esperado" — ela existe para vocês conferirem depois de decidir juntos, não para copiar direto.

Acrescentem a multiplicidade em pelo menos **3 relações** da tabela acima (a que o grupo achar mais clara para praticar).

---

## Parte 3 — Discussão em grupo (5 min)

Respondam entre vocês, sem escrever — o professor pode perguntar isso circulando pela sala:

1. Por que `Livro`/`Categoria` é agregação, e não composição?
2. Por que `Pedido`/`ItemPedido` é composição, e não agregação?
3. O que `ItemPedido`/`Livro` (associação) tem de diferente das outras relações da tabela?

---

## Salvar e entregar

```
File → Export as → PNG
```

Salvem o arquivo exportado no repositório do grupo, em uma pasta nova:

```
livraria-api-grupoN/
└── docs/
    └── diagrama-classes-v1.png
```

Se o grupo preferir, também podem salvar o link do próprio Draw.io (File → Save as → Device, ou copiar o link de compartilhamento) em um arquivo `docs/diagrama-classes-v1.md`, explicando em 2-3 linhas o que já está pronto e o que falta.

Enviem para o GitHub:

```bash
git add .
git commit -m "docs: adiciona rascunho do diagrama de classes v1"
git push
```

---

## ✅ Checklist de entrega

- [ ] As 8 classes existentes desenhadas, com atributos e métodos
- [ ] `Pedido` e `ItemPedido` desenhadas
- [ ] As 4 heranças (`LivroFisico`, `LivroDigital`, `Cliente`, `Funcionario`) com triângulo vazio
- [ ] `Livro`–`Categoria` e `Carrinho`–`Livro` com losango **vazio** (agregação)
- [ ] `Pedido`–`ItemPedido` com losango **cheio** (composição)
- [ ] `ItemPedido`–`Livro` e `Funcionario`–`Cliente` com seta simples (associação)
- [ ] Multiplicidade em pelo menos 3 relações
- [ ] O grupo sabe justificar as 3 perguntas da Parte 3
- [ ] Imagem exportada e enviada ao repositório do grupo

---

## 💥 Se travar

| Dúvida                                                         | Onde olhar                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| "Qual símbolo é agregação mesmo?"                              | Losango **vazio** — guia, seção 2                                                                                         |
| "E composição?"                                                | Losango **preenchido** — guia, seção 2                                                                                    |
| "Como troco o estilo da ponta da linha no Draw.io?"            | Clique na linha → painel direito → estilo da seta — guia, seção 4                                                         |
| "Por que `ItemPedido`–`Livro` não é agregação nem composição?" | Porque não é relação de "tem um" — é só uma referência: o item **se refere a** um livro, sem ser dono dele. É associação. |
