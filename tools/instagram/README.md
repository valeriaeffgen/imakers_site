# Grade do Instagram — gerador

Gera os nove quadros da grade do perfil (conceito "A ponte") em 1080×1350,
com a mesma fonte e as mesmas cores do site.

```bash
npx playwright install chromium   # uma vez
npm run instagram                 # gera e exporta para dist-instagram/
```

Para usar outro navegador: `CHROME=/caminho/para/chrome npm run instagram`.

## Geometria

| | |
| --- | --- |
| Célula da grade do perfil | 1012 × 1350 (3:4) |
| Post publicado | 1080 × 1350 (4:5) |
| Sangria | 34 px de cada lado |

O Instagram recorta toda miniatura da grade para 3:4. O mosaico é desenhado
uma vez, do tamanho da grade inteira (3036 × 4050), e cada quadro mostra o seu
recorte — por isso a seta atravessa os três quadros do meio sem emenda. A
sangria de 34px é o que a grade corta e o que, no feed, vira continuidade.

## Ordem de publicação

A grade preenche do post mais novo para o mais antigo. **O quadro 9 é o
primeiro a subir**; o quadro 1 é o último. Os nomes dos arquivos já saem
numerados por ordem de postagem.

Para mexer nos textos, edite `QUADROS` em `tiles.mjs`; para as legendas,
`legendas.mjs`.
