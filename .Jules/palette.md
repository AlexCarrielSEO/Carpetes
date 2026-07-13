# Palette's Journal - Carpetes Personalizados

## 2026-07-13 - Acessibilidade do Menu Mobile e Filtros de Categoria
**Learning:** Componentes de menu móvel personalizados (como botões hambúrguer baseados em SVG) e caixas de seleção `<select>` sem rótulos associados geram barreiras críticas para usuários de leitores de tela. O uso de `aria-expanded` dinâmico e `aria-label` claros permite que usuários de tecnologias assistivas entendam se o menu está aberto ou fechado e o propósito de filtros rápidos de forma independente.
**Action:** Sempre verificar se botões de alternância (toggles) possuem `aria-expanded` e se qualquer elemento interativo `<select>` sem etiqueta de texto visível possui um `aria-label` descritivo.
