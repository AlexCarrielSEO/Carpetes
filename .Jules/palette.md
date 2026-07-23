# Diário de Bordo do Palette 🎨

## 2026-07-23 - [Melhoria de Acessibilidade no Cabeçalho e Rodapé]
**Learning:** Elementos de interface interativos que contêm apenas ícones (como botões de busca, perfil, carrinho de compras, menu móvel e links de redes sociais) não fornecem feedback de texto legível para leitores de tela se não possuírem atributos `aria-label` descritivos ou alternativas textuais. No ecossistema Tailwind CSS + Radix UI / Lucide-React, é fundamental sempre anexar propriedades explicativas acessíveis (`aria-label`) para assegurar que todos os usuários consigam navegar e interagir plenamente.
**Action:** Sempre inspecionar botões de ícones puros em componentes globais de cabeçalho (Header) e rodapé (Footer) e adicionar as respectivas tags `aria-label` condizentes com o idioma principal do projeto (neste caso, Português).
