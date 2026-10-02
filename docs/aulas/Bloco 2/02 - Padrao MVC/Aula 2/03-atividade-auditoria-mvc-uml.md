# 📝 Atividade 07 — Auditoria: UML x Código

**UC:** Programação Back-End | **Bloco 2 — Aula de 28/08/2026**
**Formato:** EM GRUPO, no repositório do grupo | **Tempo:** 35 minutos
**Avaliação:** formativa — estrutura MVC finalizada e coerente com o UML

---

## Objetivo

Comparar o diagrama de classes que o grupo desenhou em 14/08 com o que existe de verdade em `src/models/` hoje, entendendo por que algumas peças ainda não coincidem — e distinguindo o que é pendência do que é planejamento.

---

## Parte 1 — Terminar o esqueleto, se faltar (10 min)

Confiram se as 3 pastas (`routes/`, `controllers/`, `services/`) já têm um arquivo para `Categoria`, além do de `Livro`. Se não tiverem, criem agora seguindo o guia, seção 2.

Rodem `npm run dev` e confirmem que o servidor ainda sobe sem erro.

---

## Parte 2 — Montar a tabela de auditoria (20 min)

Abram o diagrama de 14/08 e a pasta `src/models/` do repositório do grupo, lado a lado. Preencham a tabela abaixo para as 10 classes do diagrama.

| Classe do diagrama | Existe em `src/models/`? | Se não existe, por quê |
| ------------------ | ------------------------ | ---------------------- |
| `Livro`            | -                        | -                      |
| `Categoria`        | -                        | -                      |
| `LivroFisico`      | -                        | -                      |
| `LivroDigital`     | -                        | -                      |
| `Pessoa`           | -                        | -                      |
| `Cliente`          | -                        | -                      |
| `Funcionario`      | -                        | -                      |
| `Carrinho`         | -                        | -                      |
| `Pedido`           | -                        | -                      |
| `ItemPedido`       | -                        | -                      |

Na coluna "por quê", usem uma das duas respostas abaixo, conforme o caso:

- **"Já existe em código, falta só consolidar no repositório do grupo."** (é o caso esperado de `LivroFisico`, `LivroDigital`, `Carrinho`)
- **"Ainda não existe em código nenhum — foi desenhada em 14/08 para o Bloco 3."** (é o caso esperado de `Pedido`, `ItemPedido`)

---

## Parte 3 — Decisão do grupo (5 min)

Para as classes marcadas como "falta só consolidar", decidam: vão trazer para o repositório do grupo hoje, ou deixam para uma próxima aula? Registrem a decisão no README do grupo, na tabela de responsabilidades, com quem ficaria responsável se decidirem consolidar hoje.

Para `Pedido` e `ItemPedido`, não é preciso decidir nada — elas continuam só no diagrama por enquanto.

---

## Parte 4 — Enviar

```bash
git add .
git commit -m "feat: finaliza esqueleto MVC e audita coerencia com o diagrama UML"
git push
```

---

## 🚀 Se sobrar tempo

Consolidem `LivroFisico.js`, `LivroDigital.js` e `Carrinho.js` em `src/models/` agora, escolhendo entre as versões dos integrantes — o mesmo processo que já fizeram com `Livro` e `Categoria` em 19/08.

---

## ✅ Checklist de entrega

- [ ] Esqueleto de `Categoria` completo nas 3 pastas
- [ ] Servidor ainda sobe sem erro
- [ ] Tabela de auditoria preenchida para as 10 classes
- [ ] Grupo registrou a decisão sobre consolidar (ou não) as classes pendentes
- [ ] `git push` feito
