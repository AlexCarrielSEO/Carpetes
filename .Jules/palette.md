# Palette's Journal - Critical Learnings

## 2026-07-15 - [Acessibilidade em Botões de Ícone Único e Formulários de Rodapé]
**Learning:** Em landing pages e interfaces modernas, botões que possuem apenas ícones (como carrinho, perfil e busca) são frequentemente deixados sem qualquer atributo acessível (como `aria-label`). Isso os torna completamente invisíveis para leitores de tela. Da mesma forma, inputs sem rótulos visuais (utilizando apenas placeholder) precisam de elementos `<label className="sr-only">` para se manterem acessíveis e ao mesmo tempo preservarem o design limpo e moderno desejado pelo cliente.
**Action:** Sempre verificar botões sem texto explícito e adicionar `aria-label` descritivos no idioma da aplicação. Adicionar `<label>` com a classe `sr-only` em todos os inputs de formulários minimalistas que utilizam apenas placeholders para identificação visual.
