# Palette's Journal - Critical Learnings

## 2026-07-16 - Acessibilidade de Botões de Ícone e Formulários Dinâmicos
**Learning:** Botões que usam apenas ícones (ex. Search, User, ShoppingCart, Menu) sem texto visível precisam de atributos `aria-label` descritivos claros para garantir que leitores de tela entendam sua finalidade. Elementos dinâmicos como alertas ou feedbacks de CEP devem usar `role="status"` e `aria-live="polite"` para anunciar atualizações de estado sem interromper a experiência do usuário.
**Action:** Sempre verificar botões baseados em ícone para garantir atributos de acessibilidade, e adicionar suporte `aria-live` a feedbacks assíncronos.
