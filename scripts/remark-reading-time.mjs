/** Conta as palavras do artigo e expõe o número no frontmatter, para o
 *  "X min de leitura" ser calculado a partir do texto real. */
export function remarkReadingTime() {
  return (tree, file) => {
    let words = 0;
    const walk = (node) => {
      if (node.type === 'text' || node.type === 'inlineCode') {
        words += String(node.value).trim().split(/\s+/).filter(Boolean).length;
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
    file.data.astro.frontmatter.words = words;
    file.data.astro.frontmatter.minutes = Math.max(2, Math.round(words / 200));
  };
}
