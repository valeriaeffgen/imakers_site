#!/usr/bin/env python3
"""Gera as curvas do wordmark para o gerador de imagens sociais.

Rode depois de trocar o nome da marca ou a fonte de display, e cole a saida
em PALAVRA_D / PALAVRA_AVANCO no generate-og.mjs.

    pip install fonttools brotli
    python3 scripts/wordmark-path.py

A fonte precisa ser a instancia estatica do peso usado no logo (500). Para
extrai-la do woff2 variavel que o site serve:

    from fontTools.ttLib.woff2 import decompress
    from fontTools.varLib import instancer
    decompress('public/fonts/quicksand-var-latin.woff2', 'quicksand-var.ttf')
    instancer.instantiateVariableFont(TTFont('quicksand-var.ttf'), {'wght': 500})
"""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Identity

FONTE = '/root/.fonts/Quicksand-Medium.ttf'
PALAVRA = 'viceja'
CORPO = 100.0
LETTER_SPACING = -0.028          # o mesmo valor do .logo__word no Logo.astro

f = TTFont(FONTE)
k = CORPO / f['head'].unitsPerEm
cmap, gs, hmtx = f.getBestCmap(), f.getGlyphSet(), f['hmtx']

pen = SVGPathPen(gs, ntos=lambda v: f'{v:.3f}'.rstrip('0').rstrip('.'))
x = 0.0
for ch in PALAVRA:
    nome = cmap[ord(ch)]
    # A fonte cresce para cima e o SVG para baixo: por isso o -k no eixo y.
    gs[nome].draw(TransformPen(pen, Identity.translate(x, 0).scale(k, -k)))
    x += hmtx[nome][0] * k + LETTER_SPACING * CORPO

print('PALAVRA_AVANCO =', round(x / CORPO, 4))
print('PALAVRA_D =', repr(pen.getCommands()))
