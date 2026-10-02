# 📝 Atividade 08 — Refatoração e Code Review

**UC:** Programação Back-End | **Bloco 2 — Aula de 02/09/2026**
**Formato:** individual (refatoração) + duplas (revisão), no repositório pessoal | **Tempo:** 45 minutos
**Avaliação:** formativa — revisão de código entre pares, com checklist de clean code

---

## Parte 1 — Refatorar suas próprias classes (20 min)

Percorra as classes que você já criou (`Livro`, `Categoria`, `LivroFisico`, `LivroDigital`, `Pessoa`, `Cliente`, `Funcionario`, `Carrinho` — as que tiver) e aplique os dois refactors guiados de hoje onde forem cabíveis:

1. Extrair qualquer número mágico como constante nomeada.
2. Quebrar qualquer método que faça mais de uma coisa em métodos menores.

Para cada mudança, siga sempre a sequência: **rodar antes, anotar a saída, refatorar, rodar depois, comparar.**

Se alguma classe já estiver limpa nesses dois pontos, sem problema — passe para a próxima.

---

## Parte 2 — Auditoria com o checklist completo (10 min)

Preencha esta tabela para pelo menos 2 das suas classes, usando o checklist de 7 itens do guia:

| Item do checklist         | Classe 1: **\_\_\_** | Classe 2: **\_\_\_** |
| ------------------------- | -------------------- | -------------------- |
| 1. Nomes claros           | -                    | -                    |
| 2. Sem números mágicos    | -                    | -                    |
| 3. Métodos pequenos       | -                    | -                    |
| 4. Sem duplicação         | -                    | -                    |
| 5. Dados protegidos       | -                    | -                    |
| 6. Um arquivo, uma classe | -                    | -                    |
| 7. Comentários úteis      | -                    | -                    |

Marque ✅ para itens já corretos e ⚠️ para itens que ainda precisam de ajuste. Corrija o que der tempo.

---

## Parte 3 — Code review em duplas (15 min)

Formem duplas dentro do grupo de projeto. Escolham uma classe cada um para mostrar ao colega.

**Quem revisa:** preencha a mesma tabela do checklist para o código do colega, e escreva pelo menos um comentário específico para cada item marcado com ⚠️.

**Quem recebe:** ouça os comentários antes de discordar. Se concordar com a sugestão, aplique o ajuste agora, com o colega revisor por perto.

Depois, invertam os papéis.

---

## Parte 4 — Enviar

```bash
git add .
git commit -m "refactor: aplica clean code apos revisao entre pares"
git push
```

Atualize o `README.md` da pasta de hoje com uma nota curta sobre o que foi refatorado e o que a revisão do colega apontou.

---

## 🚀 Se sobrar tempo

Apliquem o mesmo checklist a uma terceira classe cada um, ou revisem uma segunda vez, trocando de dupla dentro do mesmo grupo.

---

## ✅ Checklist de entrega

- [ ] Ao menos uma constante mágica extraída, com teste antes e depois
- [ ] Ao menos um método longo quebrado em métodos menores
- [ ] Checklist de 7 itens preenchido para ao menos 2 classes
- [ ] Participei como revisor e como revisado
- [ ] Comentários da revisão foram específicos, não genéricos
- [ ] `git push` feito
