# Diário da Palette 🎨

Este arquivo registra aprendizados críticos sobre UX e acessibilidade no projeto.

## 2026-07-19 - [Melhoria de Acessibilidade em Componentes Globais]
**Learning:** Elementos interativos sem texto visível (como botões de ícone e links sociais) impossibilitam uma experiência de uso adequada para leitores de tela ou usuários de teclado. A adição de `aria-label` melhora instantaneamente o índice de acessibilidade (a11y) do aplicativo.
**Action:** Sempre verificar botões que renderizam apenas ícones (como buscas, redes sociais, ou menus de hambúrguer) e equipá-los com `aria-label` claros e descritivos.
