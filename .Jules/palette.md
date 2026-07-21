# Diário do Palette 🎨

Este diário contém os aprendizados críticos de UX e acessibilidade adquiridos durante o desenvolvimento do projeto.

## 2026-07-21 - Acessibilidade em Botões de Ícones e Inputs sem Label
**Learning:** Elementos de interface interativos que não possuem texto visível, como botões compostos apenas por ícones (por exemplo: busca, usuário, carrinho de compras) ou campos de entrada sem labels associados, são completamente inacessíveis para leitores de tela se não possuírem atributos ARIA adequados.
**Action:** Sempre incluir atributos `aria-label` descritivos e claros (preferencialmente no idioma do usuário, no caso português) em botões que contêm apenas ícones e em campos de formulários que não possuem labels de texto associados.
