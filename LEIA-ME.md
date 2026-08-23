# Óleos de Ana Nunes — site

O site passou a ter **páginas separadas**, em vez de uma única página muito comprida.

```
index.html        Início — título, citação, 6 obras recentes, atalhos
obra.html         Obra — catálogo completo, com filtros e paginação (12 por página)
sobre.html        Sobre
contacto.html     Contacto
diagnostico.html  Ferramenta de teste (não faz parte do site, não publicar)
assets/estilo.css Aspecto de todas as páginas
assets/obras.js   Motor da galeria + lista de segurança das obras
assets/ondas.js   Fundo animado (ondas)
```

Para publicar, é a **pasta inteira** que vai — não só um ficheiro. Arrastar para `app.netlify.com/drop` funciona tal como está.

## Porque foi dividido

Com 28 obras (e a crescer), uma página só obrigava a percorrer a galeria toda para chegar ao contacto. Agora:

- Contacto e Sobre estão a um clique no menu, de qualquer sítio.
- A galeria mostra 12 obras de cada vez, com paginação `‹ 1 2 3 ›` e a indicação `1–12 de 28`.
- Filtrar por técnica volta sempre à primeira página.
- Cada página de galeria tem endereço próprio (`obra.html#pagina-2`), por isso pode ser partilhada.
- A numeração das obras é contínua entre páginas — a obra 13 continua a ser a 13.

A página de entrada mostra as 6 obras mais recentes: quem chega vê logo pintura, sem ter de navegar.

## Fundo animado

O fundo é o efeito **Waves** do React Bits, reescrito em JavaScript simples e canvas — o site não usa React nem passo de compilação, por isso instalar o pacote via `shadcn` não era possível. Os parâmetros são os que indicaste:

`lineColor #b19d93 · waveSpeedX 0.02 · waveSpeedY 0.01 · waveAmpX 40 · waveAmpY 20 · friction 0.9 · tension 0.01 · maxCursorMove 30 · xGap 12 · yGap 36`

Reage ao rato, corre a 60 fps, pára sozinho quando o separador não está visível ou quando uma obra está aberta em grande, e com `prefers-reduced-motion` fica num fotograma parado.

Para o tornar mais ou menos visível, muda uma linha no `assets/estilo.css`:

```css
:root{ --ondas-opacidade:.28 }   /* 0 = invisível, 1 = no máximo */
```

A secção Sobre passou a ter fundo translúcido (78%) em vez de opaco — de outra forma tapava as ondas nessa página. É a única coisa que mudou fora do fundo.

## Como se actualiza sozinho

A galeria lê o feed do blogue **oleosdeananunes.blogspot.com** em cada visita. A Ana publica o quadro novo no Blogger e ele aparece no site sozinho — na página de entrada como "obra recente" e no catálogo completo.

Convenção de títulos a manter nos posts:

- `Tela a Óleo - Nome` → *Nome*, "Óleo sobre tela"
- `Óleo sobre papel - Nome` → *Nome*, "Óleo sobre papel"
- `Ilustração - Nome` → *Nome*, "Ilustração"

O ano vem da data do post. Os filtros são gerados a partir do que existe. Se o blogue estiver inacessível, entra a lista de 28 obras gravada no `assets/obras.js`.

## Se as imagens não aparecerem

**Abre primeiro o `diagnostico.html`** no navegador. Testa a partir do teu computador se as fotografias e o feed conseguem ser carregados, e diz numa frase onde está o problema.

As fotografias não estão dentro dos ficheiros — estão alojadas no blogue da Ana (Blogger/Google) e são pedidas quando alguém abre a página. É preciso ligação à internet, e pré-visualizações fechadas bloqueiam esses pedidos.

Os endereços das imagens são os que o Blogger publica: o `<a href>` do post (tamanho nativo) e o `<img src>` (miniatura), com a miniatura como recurso se o grande falhar. Quando uma imagem falha, o cartão não desaparece — fica uma placa com o título e um aviso a explicar porquê.

## Acessibilidade

Link "saltar para o conteúdo"; anéis de foco visíveis; `scroll-padding-top` para o cabeçalho fixo não tapar o elemento focado (WCAG 2.2 AA); lightbox com `role="dialog"`, foco preso e devolvido, Esc e setas ← →; cartões abrem com Enter/Espaço; paginação navegável por teclado com `aria-current`; alvos de toque ≥ 44px; `prefers-reduced-motion` respeitado; texto alternativo com título, técnica e ano; contraste ≈ 7:1. Testado a 1440px e 375px, sem scroll horizontal.

## O que falta preencher

Substituir `EMAIL@EXEMPLO.PT` em `contacto.html` pelo email real.

## Design

Padrão `portfolio-grid`, estilo `editorial-grid-magazine`, tipos Playfair Display + Source Serif 4 + JetBrains Mono, paleta de cal quente com terracota e ocre. O registo das decisões está em `design-system/ana-nunes/MASTER.md`.
