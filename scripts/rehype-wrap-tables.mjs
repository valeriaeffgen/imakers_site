import { visit } from 'unist-util-visit';

/**
 * Envolve toda <table> do markdown em um contêiner com rolagem horizontal.
 * Sem isso, uma tabela larga estica a coluna do grid e a página inteira ganha
 * rolagem lateral no celular — sem que a tabela em si pareça o culpado.
 */
export function rehypeWrapTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null) return;
      if (parent.type === 'element' && parent.properties?.className?.includes?.('table-scroll')) return;
      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'], tabindex: 0, role: 'region', 'aria-label': 'Tabela com rolagem horizontal' },
        children: [node],
      };
    });
  };
}
