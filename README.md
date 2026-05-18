# PulseFit Personal

Aplicação pessoal para cadastro de perfil, controle de treinos por dia da semana e acompanhamento de evolução corporal.

## Recursos

- Dashboard com dados do usuário, treino do dia, IMC, idade, total de exercícios e gráfico de peso.
- Perfil editável com cálculo automático de idade e IMC.
- Treinos por dia da semana com criação, edição e exclusão de exercícios.
- Histórico de peso corporal salvo junto com os demais dados.
- Persistência local no navegador via `localStorage`.
- Interface responsiva com Next.js, React, Tailwind CSS e componentes reutilizáveis.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Publicar no GitHub Pages

1. Suba este projeto para um repositório no GitHub.
2. No GitHub, abra `Settings > Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions`.
4. Faça um push na branch `main`.

O workflow em `.github/workflows/deploy.yml` gera a versão estática em `out/` e publica no GitHub Pages.

Os dados do usuário ficam no `localStorage`, então continuam salvos no mesmo navegador e domínio publicado. Para sincronizar entre dispositivos, será necessário adicionar login e banco de dados.
