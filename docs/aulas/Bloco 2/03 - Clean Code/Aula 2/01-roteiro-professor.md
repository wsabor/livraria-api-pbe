# Roteiro do Professor — PBE | Aula de 04/09/2026 (sexta, 2 aulas)

**UC:** Programação Back-End | **Turma:** 1-2026-SESI_DEV_OC_1 | **Docente:** Wagner de Campos Sabor Junior
**Fechamento do Bloco 2 — Consolidação e ponte para o Express**

**Conteúdo:** fechamento da modelagem do Bloco 2 (diagrama UML + esqueleto MVC + clean code) e ponte para o framework Express
**Prática:** ajustes finais e entrega da modelagem consolidada; preparação do ambiente para o Express
**Capacidades:** CT 2, 3, 7 | CS 1, 4
**Formativa:** ENTREGA do diagrama UML + esqueleto MVC + código refatorado, por grupo

---

## Nota sobre esta versão

Este roteiro substitui um material gerado anteriormente para esta mesma data, que continha conteúdo equivocado (uma segunda rodada de code review, na verdade já correspondente a uma aula anterior). A partir de agora, o cronograma de referência é o arquivo `PBE_ajustadoClaude.xlsx`, mais atualizado e com o status real de cada aula já registrado.

---

## Situação de partida

Sem conteúdo novo hoje. É o fechamento formal do Bloco 2, que vem sendo construído desde 14/08 (diagrama UML), passando por 19/08 e 28/08 (esqueleto MVC) e 02/09 (clean code e refatoração). Hoje os três eixos se juntam numa entrega só, e a aula termina com uma pequena virada de página: preparar o terreno para o Express, que começa de verdade na próxima aula (09/09).

**O que muda em relação às aulas anteriores:** hoje tem prazo. A formativa pede uma entrega concreta — não é mais "trabalhem no checklist", é "entreguem o pacote completo". Vale comunicar isso com clareza logo na abertura.

---

## Linha do tempo

| Aula | Tempo | Foco |
|:---:|:---:|---|
| 1 | 50 min | Checklist de consolidação dos 3 eixos (diagrama, esqueleto, clean code) |
| 2 | 50 min | Fechar pendências, preparar o ambiente para o Express, entrega formal |

---

## AULA 1 (50 min) — O grande checklist de consolidação

### Abertura (5 min)

"Hoje fecha o Bloco 2 inteiro. Não tem conteúdo novo — é organizar, conferir e entregar formalmente tudo que vocês construíram desde 14/08: o diagrama UML, o esqueleto MVC e o código já com clean code aplicado. No fim da aula, cada grupo faz uma entrega única, reunindo os três."

### Apresentar o checklist (10 min)

Distribuir `03-atividade-entrega-bloco2.md`. Passar rapidamente pelos três blocos do checklist, sem se aprofundar — a profundidade é o trabalho do restante da aula.

### Trabalho em grupo (35 min)

Cada grupo percorre o checklist completo. Circular priorizando, nesta ordem:

1. O servidor Express ainda sobe sem erro (`npm run dev`) — é a base de tudo o que vem a seguir.
2. O diagrama bate com o código real (reforçar o hábito de auditoria já praticado antes).
3. O checklist de clean code de 02/09 foi de fato aplicado, não só verificado.

---

## AULA 2 (50 min) — Fechar, preparar o Express, entregar

### Finalizar pendências (15 min)

Últimos ajustes do checklist. Priorizar o que falta sobre o que já está pronto — não é preciso revisar de novo o que o grupo já confirmou.

### Preparar o ambiente para o Express (15 min)

Ponte para 09/09. Três verificações rápidas, por grupo:

1. **Todos os integrantes conseguem rodar o projeto na própria máquina**, não só quem fez a instalação original em 19/08. Cada um faz `git pull`, `npm install`, `npm run dev` e confirma a mensagem no navegador.
2. **Os arquivos vazios de `controllers/` e `services/`** ainda estão lá, com os comentários de 19/08 — são eles que vão ganhar código de verdade na próxima aula.
3. **Versão do Node e do Express conferida**, sem necessidade de atualizar nada hoje — só constatar que está tudo funcionando antes de avançar.

Frase de transição: "a partir de 09/09, essas pastas vazias começam a virar código de verdade. Hoje é só garantir que o terreno está pronto."

### Entrega formal (20 min)

Cada grupo:

1. Atualiza o `README.md` com um resumo consolidado do Bloco 2: link ou imagem do diagrama final, estrutura de pastas do esqueleto, e uma frase sobre o que foi refatorado.
2. Faz o commit de entrega:

```bash
git add .
git commit -m "docs: entrega consolidada do Bloco 2 - UML, esqueleto MVC e clean code"
git push
```

3. Compartilha o link do repositório com você (por chat, planilha, ou o meio que preferir usar para registrar a entrega).

### Fechamento (não custa marcar o momento)

"Vocês fecham hoje um bloco inteiro do curso — da primeira classe solta em 29/07 até um esqueleto de API organizado, documentado e revisado em equipe. Na próxima aula, essa estrutura ganha vida de verdade com o Express."

---

## Avaliação formativa

**Instrumento:** entrega do diagrama UML, esqueleto MVC e código refatorado, por grupo.

| Critério | O que caracteriza domínio |
|---|---|
| Diagrama entregue bate com o código real | Nenhuma discrepância entre classes/atributos/métodos do diagrama e do repositório |
| Esqueleto MVC completo | `routes/`, `controllers/`, `services/`, `models/` presentes, com os arquivos esperados |
| Clean code aplicado, não só verificado | Constante mágica extraída, método longo quebrado, conforme 02/09 |
| Todos os integrantes conseguem rodar o projeto | Confirmado em sala, não só por quem fez a configuração original |
| README com resumo consolidado do bloco | Presente e compreensível para alguém de fora do grupo |

---

## Contingências

**Grupo descobre pendência grande só hoje** (ex.: `Livro.js` nunca foi consolidado no repositório do grupo). Priorizar resolver isso sobre qualquer outro item do checklist — é a base de tudo o resto.

**Algum integrante não consegue rodar o projeto na própria máquina.** Não deixar para depois: é exatamente o tipo de problema que trava a próxima aula. Resolver em sala, mesmo que isso signifique reduzir tempo de outra parte do checklist.

**Sobrou tempo.** Grupos adiantados podem dar uma segunda olhada no README, deixando-o mais claro para quem for ler de fora — é um bom momento para aplicar o princípio de "nomes e comunicação clara" também fora do código.
