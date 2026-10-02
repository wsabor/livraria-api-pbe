# 📦 Guia do Aluno — Consolidação do Bloco 2

**UC:** Programação Back-End | **Aula de 04/09/2026**
**Projeto:** API de Gestão da Livraria (SA1)

---

## O que hoje é

Sem conteúdo novo. Hoje é o fechamento do Bloco 2 inteiro — desde 14/08 (diagrama UML), passando por 19/08 e 28/08 (esqueleto MVC), até 02/09 (clean code). Os três eixos se juntam numa entrega única, em grupo. No fim da aula, uma pequena preparação para o que vem a seguir: o framework Express, que começa de verdade em 09/09.

---

## 1. Os três eixos do Bloco 2

| Eixo | Desde quando | O que verificar hoje |
|---|---|---|
| Diagrama UML | 14/08 | Bate com o código real, símbolos corretos, multiplicidade indicada |
| Esqueleto MVC | 19/08 e 28/08 | Pastas `routes/`, `controllers/`, `services/`, `models/` completas |
| Clean code | 02/09 | Constante mágica extraída, método longo quebrado, checklist aplicado |

Hoje vocês não vão criar nada novo nesses três eixos — vão **conferir, fechar pendências e entregar**.

---

## 2. Checklist de entrega

Sigam a atividade `03-atividade-entrega-bloco2.md`, que traz o checklist completo dos três eixos.

---

## 3. Preparando o terreno para o Express

A partir de 09/09, os arquivos vazios de `controllers/` e `services/` (criados em 19/08) vão ganhar código de verdade. Antes disso, confiram três coisas:

1. **Todo integrante do grupo consegue rodar o projeto na própria máquina** — não só quem fez a instalação original. Façam, cada um:

```bash
git pull
npm install
npm run dev
```

Confirmem a mensagem no navegador em `http://localhost:3000`.

2. **Os arquivos de referência de `controllers/` e `services/` ainda estão lá**, com os comentários de 19/08.

3. **Nada precisa ser atualizado hoje** — é só constatar que está tudo funcionando antes de avançar.

---

## 4. Entrega formal

1. Atualizem o `README.md` do grupo com um resumo do Bloco 2: link ou imagem do diagrama final, a estrutura de pastas do esqueleto, e uma frase sobre o que foi refatorado em 02/09.

2. Façam o commit de entrega:

```bash
git add .
git commit -m "docs: entrega consolidada do Bloco 2 - UML, esqueleto MVC e clean code"
git push
```

3. Compartilhem o link do repositório com o professor.

---

## ✅ Checklist

- [ ] Diagrama conferido contra o código real
- [ ] Esqueleto MVC completo nas 4 pastas
- [ ] Clean code aplicado, não só verificado
- [ ] Todos os integrantes conseguem rodar o projeto
- [ ] README atualizado com resumo do bloco
- [ ] Commit de entrega feito e link compartilhado com o professor

---

## 📎 Cola rápida

```bash
git pull
npm install
npm run dev
git add .
git commit -m "docs: entrega consolidada do Bloco 2 - UML, esqueleto MVC e clean code"
git push
```
