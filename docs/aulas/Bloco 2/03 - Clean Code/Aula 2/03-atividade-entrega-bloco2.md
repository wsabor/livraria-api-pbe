# 📝 Atividade 09 — Entrega Consolidada do Bloco 2

**UC:** Programação Back-End | **Aula de 04/09/2026**
**Formato:** EM GRUPO, no repositório do grupo | **Tempo:** 65 minutos
**Avaliação:** formativa — entrega do diagrama UML, esqueleto MVC e código refatorado

---

## Bloco 1 — Diagrama UML (20 min)

| Item                                                                                           | OK? |
| ---------------------------------------------------------------------------------------------- | --- |
| Todas as classes do grupo estão no diagrama, com atributos e métodos atualizados               | -   |
| Os 4 tipos de relacionamento usam o símbolo certo (associação, agregação, composição, herança) | -   |
| Multiplicidade indicada nas relações principais                                                | -   |
| O diagrama bate com o código real em `src/models/` — nenhuma discrepância                      | -   |
| `Pedido` e `ItemPedido` seguem só no diagrama, sem código ainda (isso é esperado)              | -   |

Ajustem o que faltar e exportem a versão final.

---

## Bloco 2 — Esqueleto MVC (20 min)

| Item                                                                                   | OK? |
| -------------------------------------------------------------------------------------- | --- |
| Servidor sobe sem erro com `npm run dev`                                               | -   |
| Pasta `routes/` com o arquivo de referência de `Livro` (e `Categoria`, se o grupo fez) | -   |
| Pasta `controllers/` com o arquivo de referência correspondente                        | -   |
| Pasta `services/` com o arquivo de referência correspondente                           | -   |
| Pasta `models/` com todas as classes do grupo, cada uma com `module.exports`           | -   |

---

## Bloco 3 — Clean Code (15 min)

| Item                                                         | OK? |
| ------------------------------------------------------------ | --- |
| Números mágicos extraídos como constantes nomeadas           | -   |
| Ao menos um método longo quebrado em métodos menores         | -   |
| Checklist de clean code de 02/09 aplicado, não só verificado | -   |
| Código revisado por um colega (rodadas de 02/09)             | -   |

---

## Bloco 4 — Preparação para o Express (10 min)

Cada integrante do grupo, na própria máquina:

```bash
git pull
npm install
npm run dev
```

Confirmem juntos que todos veem a mensagem em `http://localhost:3000`.

---

## Entrega final

1. Atualizem o `README.md` do grupo com:
   - Link ou imagem do diagrama final
   - A estrutura de pastas do esqueleto MVC
   - Uma frase sobre o que foi refatorado em 02/09

2. Commit de entrega:

```bash
git add .
git commit -m "docs: entrega consolidada do Bloco 2 - UML, esqueleto MVC e clean code"
git push
```

3. Compartilhem o link do repositório com o professor.

---

## ✅ Checklist de entrega final

- [ ] Bloco 1 (UML) — todos os itens conferidos
- [ ] Bloco 2 (esqueleto MVC) — todos os itens conferidos
- [ ] Bloco 3 (clean code) — todos os itens conferidos
- [ ] Bloco 4 (ambiente Express) — todos os integrantes confirmados
- [ ] README atualizado
- [ ] Commit de entrega feito
- [ ] Link compartilhado com o professor
