# Palette's Journal - Diário de UX e Acessibilidade

## 2026-07-20 - Padrão de Omissão de Rótulos em Elementos de Layout
**Learning:** No design system deste aplicativo, botões de ícone único (como Busca, Usuário e Carrinho no Header) e campos de entrada em formulários integrados ao rodapé (Footer) ou seções de apoio (como CEP e Newsletter) não herdam ou exigem nativamente rótulos de acessibilidade (`aria-label` ou `<label>`). Isso cria uma lacuna silenciosa onde a interface parece polida visualmente, mas permanece totalmente inacessível para leitores de tela.
**Action:** Ao adicionar ou dar manutenção a qualquer formulário ou botão de ícone no layout global do site, sempre incluir atributos `aria-label` descritivos ou associar explicitamente elementos `<label>` nativos, garantindo a navegação por teclado e compatibilidade com tecnologias assistivas.
