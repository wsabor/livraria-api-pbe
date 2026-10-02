# 🔑 Gabarito — Atividade 07: Auditoria UML x Código

**Uso exclusivo do professor.**

---

## Tabela de auditoria — referência

| Classe do diagrama | Existe em `src/models/`? | Motivo esperado |
|---|---|---|
| `Livro` | Sim | Consolidada em 19/08 |
| `Categoria` | Sim | Consolidada em 19/08 |
| `Pessoa` | Sim | Consolidada em 07/08 |
| `Cliente` | Sim | Consolidada em 07/08 |
| `Funcionario` | Sim | Consolidada em 07/08 |
| `LivroFisico` | Provavelmente não | Já existe em código pessoal desde 07/08, falta consolidar no grupo |
| `LivroDigital` | Provavelmente não | Idem |
| `Carrinho` | Provavelmente não | Já existe em código pessoal desde 12/08, falta consolidar no grupo |
| `Pedido` | Não | Entidade desenhada em 14/08 para o Bloco 3, sem código ainda — esperado |
| `ItemPedido` | Não | Idem |

**O que caracteriza domínio nesta atividade não é ter tudo consolidado hoje.** É o grupo conseguir separar corretamente as duas colunas de motivo: três classes com pendência real de consolidação, e duas classes com ausência intencional, planejada desde 14/08.

**Erro mais provável:** algum grupo tratar `Pedido` e `ItemPedido` como se fosse a mesma categoria de problema que `LivroFisico`/`LivroDigital`/`Carrinho`, tentando "resolver" as cinco da mesma forma. Vale perguntar diretamente ao grupo: "por que `Pedido` não tem código ainda, dá pra criar agora do mesmo jeito que vocês vão fazer com `Carrinho`?" — a resposta correta aponta para a ausência do banco de dados como bloqueio real, não simples esquecimento.

---

## Sobre a decisão de consolidar hoje

Não há resposta certa sobre se o grupo deve consolidar `LivroFisico`, `LivroDigital` e `Carrinho` hoje ou depois — ambas são decisões válidas, dado o tom mais leve da aula. O que vale conferir é se a decisão foi **registrada** no README do grupo, com responsável definido caso tenham optado por consolidar hoje.

Se o grupo consolidar hoje, o código de referência já validado nas aulas anteriores (07/08 e 12/08) é o mesmo — não há novidade de sintaxe aqui, só cópia e ajuste de `module.exports`.

---

## Checklist de correção rápida (por grupo)

- [ ] Esqueleto de `Categoria` completo, se estava pendente
- [ ] Servidor sobe sem erro
- [ ] Tabela de auditoria com as 10 classes, motivos corretos
- [ ] Grupo distingue verbalmente pendência de consolidação vs ausência planejada
- [ ] Decisão sobre consolidação registrada no README, com responsável se aplicável
- [ ] Push feito
