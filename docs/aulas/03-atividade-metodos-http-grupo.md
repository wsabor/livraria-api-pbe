# 📝 Atividade 12 — Os 5 Métodos HTTP Completos

**UC:** Programação Back-End | **Bloco 3 — Aula de 16/09/2026**
**Formato:** EM GRUPO, no repositório do grupo | **Tempo:** 35 minutos
**Avaliação:** formativa — rotas testadas com retornos corretos

---

## Divisão de trabalho

| Quem | Responsável por |
|---|---|
| Integrante 1 | `POST` (criar) |
| Integrante 2 | `PUT` e `PATCH` (atualizar completo e parcial) |
| Integrante 3 | `DELETE` (apagar) |
| Integrante 4 | Testar tudo no Postman e preencher a tabela de verificação |

---

## Parte 1 — Implementar os métodos (20 min)

Sigam o guia, seções 3 a 5, implementando na `livroService.js`, `livroController.js` e `livroRoutes.js`:

- `POST /livros`
- `PUT /livros/:indice`
- `PATCH /livros/:indice`
- `DELETE /livros/:indice`

Não esqueçam de adicionar `set preco` e `set estoque` na classe `Livro` antes de implementar `PUT`/`PATCH`.

---

## Parte 2 — Testar cada método (10 min)

Preencham a tabela, testando cada requisição no Postman:

| Método | URL | Status esperado | Status obtido |
|---|---|---|---|
| GET | `/livros` | 200 | |
| GET | `/livros/0` | 200 | |
| GET | `/livros/99` | 404 | |
| POST | `/livros` | 201 | |
| PUT | `/livros/0` | 200 | |
| PATCH | `/livros/0` | 200 | |
| DELETE | `/livros/0` | 204 | |
| GET | `/livros/0` (depois do DELETE) | 404 | |

---

## Parte 3 — O experimento do cabeçalho (5 min)

Façam um `POST` **sem** o cabeçalho `Content-Type: application/json`. Registrem no README da pasta o status retornado e uma frase explicando por quê.

---

## Parte 4 — Enviar

```bash
git add .
git commit -m "feat: implementa POST, PUT, PATCH e DELETE com status codes adequados"
git push
```

---

## 🚀 Se sobrar tempo

Repliquem os 5 métodos para `Categoria`, se o grupo já tiver a estrutura básica dela.

---

## ✅ Checklist de entrega

- [ ] Os 4 métodos novos implementados (`POST`, `PUT`, `PATCH`, `DELETE`)
- [ ] `set preco` e `set estoque` adicionados à classe `Livro`
- [ ] Tabela de testes preenchida, com todos os status batendo
- [ ] Experimento do cabeçalho feito e explicado no README
- [ ] `git push` feito

---

## 💥 Se der erro

| Sintoma | Causa provável | Solução |
|---|---|---|
| Erro 500 ao criar livro | Esqueceram o `Content-Type: application/json` | Confira os headers no Postman |
| `PUT` funciona mas `PATCH` não distingue campos | Faltou o `if (dados.campo !== undefined)` em cada campo | Confira `atualizarParcialLivro` |
| `DELETE` retorna corpo em vez de vazio | Trocar `res.json(...)` por `res.status(204).send()` | — |
| `set preco` não funciona | Faltou declarar `#preco` como campo privado no topo da classe | Confira a classe `Livro` |
