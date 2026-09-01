# Grade do Instagram — gerador

Gera os nove quadros da grade do perfil (conceito "A ponte") em 1080×1350,
com a mesma fonte e as mesmas cores do site.

```bash
npx playwright install chromium   # uma vez
npm run instagram                 # gera PNG e PDF em dist-instagram/
```

Para usar outro navegador: `CHROME=/caminho/para/chrome npm run instagram`.

Saem três coisas: os nove PNG em 1080×1350 prontos para publicar, os mesmos
nove em PDF vetorial (o texto continua editável em Illustrator, Affinity,
Inkscape ou Figma) e um PDF único com as nove páginas.

A página do PDF fica com 1350,7 px de altura em vez de 1350: o Chromium
arredonda ao converter pixels para pontos. Menos de um pixel, sem efeito
prático, mas convém exportar em 1080×1350 na hora de virar imagem de novo.

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
