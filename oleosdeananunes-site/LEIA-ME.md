# Óleos de Ana Nunes — site

O site passou a ter **páginas separadas**, em vez de uma única página muito comprida.

```
inicio/index.html   Início        ->  /inicio/
index.html          reencaminha para /inicio/  (raiz do site)
obra/index.html     Obra          ->  /obra/
sobre/index.html    Sobre         ->  /sobre/
contacto/index.html Contacto      ->  /contacto/
obra.html           reencaminha para /obra/  (endereços antigos)
sobre.html          reencaminha para /sobre/
contacto.html       reencaminha para /contacto/
diagnostico.html    Ferramenta de teste (não faz parte do site)
assets/estilo.css   Aspecto de todas as páginas
assets/obras.js     Motor da galeria + lista de segurança das obras
assets/ondas.js     Fundo animado (ondas)
favicon.ico         Ícone do separador
assets/favicon-*    Ícone em vários tamanhos + apple-touch-icon
```

## Endereços sem .html

O GitHub Pages não tem regras de reescrita: serve o ficheiro que existe, com o nome que tem. A forma de obter `/obra` em vez de `/obra.html` é dar a cada página a sua pasta com um `index.html` lá dentro — qualquer servidor entrega o `index.html` quando lhe pedem a pasta.

Resultado: `.../oleosdeananunes/obra/`. O `.html` desaparece, mas fica a barra final. Escrever `/obra` sem barra funciona à mesma — o GitHub Pages acrescenta-a sozinho.

A entrada segue a mesma regra e vive em `/inicio/`. O `index.html` da raiz tem de continuar a existir — é o que o GitHub Pages serve quando alguém abre `.../oleosdeananunes/` — mas passou a ser um reencaminhamento para `/inicio/`, para o endereço visível ser sempre o mesmo das outras páginas.

Se preferires a entrada em `/` (é o que a maioria dos sites faz, e poupa um salto), basta trocar: pôr o conteúdo de `inicio/index.html` na raiz, com os caminhos sem `../`, e apagar a pasta `inicio`.

Para tirar também a barra seria preciso um servidor com reescrita. O Netlify faz isso de origem: serve `obra.html` em `/obra`, sem barra e sem pastas.

Os antigos `obra.html`, `sobre.html` e `contacto.html` ficaram como reencaminhamentos, para não partir endereços já partilhados. Podem ser apagados daqui a uns meses.

Como os recursos passaram a ser referidos com `../assets/...` nas subpáginas, o site funciona em qualquer base — `utilizador.github.io/oleosdeananunes/`, um domínio próprio, ou aberto a partir de uma pasta local.

Para publicar, é a **pasta inteira** que vai — não só um ficheiro. Arrastar para `app.netlify.com/drop` funciona tal como está.

## Porque foi dividido

Com 28 obras (e a crescer), uma página só obrigava a percorrer a galeria toda para chegar ao contacto. Agora:

- Contacto e Sobre estão a um clique no menu, de qualquer sítio.
- A galeria é paginada, com `‹ 1 2 3 ›` e a indicação `1–12 de 28`.
- Filtrar por técnica volta sempre à primeira página.
- Cada página de galeria tem endereço próprio (`obra.html#pagina-2`), por isso pode ser partilhada.
- A numeração das obras é contínua entre páginas — a obra 13 continua a ser a 13.

A página de entrada mostra as 6 obras mais recentes: quem chega vê logo pintura, sem ter de navegar.

## Vista da galeria

No canto direito da barra de filtros há um selector **Vista**, com três ícones em que o número de barras é o número de obras por fila:

- **▮▮▮▮** — vista de catálogo, para percorrer muita obra depressa.
- **▮▮** — meio-termo.
- **▮** — uma obra de cada vez, grande, centrada até 820px.

Ao passar o rato por cima, cada ícone diz o que faz ("4 obras por fila"). Para leitores de ecrã, o mesmo texto vai em `aria-label`.

A escolha fica guardada no navegador de quem visita, por isso na visita seguinte o site abre como essa pessoa o deixou.

O número de obras por página acompanha a densidade — 12 com 4 por fila, 8 com 2, 6 com 1 — para que a página não fique interminável na vista grande. Ao mudar de vista, a obra que estava no topo continua na página que passa a ser mostrada, em vez de saltar para o início.

Em ecrãs estreitos a escolha é limitada ao que cabe: até 2 por fila abaixo de 1020px, e sempre 1 abaixo de 620px (aí o selector desaparece, por não ter nada para escolher).

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

## Ícone

O ícone do separador é a paleta com o monograma AN, recortada da imagem original e gerada em vários tamanhos: `favicon.ico` (16/32/48) na raiz, PNG de 16 e 32 para navegadores modernos, 180px para o ecrã inicial do iOS e 512px para partilhas.

O fundo branco da imagem foi tornado transparente, para o ícone assentar bem em separadores claros e escuros. O `apple-touch-icon` é a excepção — leva fundo de cal opaco, porque o iOS não lida bem com transparência.

A 32px lê-se o AN e as pinceladas de cor. A 16px fica um disco castanho com pontos coloridos e o monograma esbatido — é o limite do desenho, não da conversão; um logótipo com esse nível de detalhe não sobrevive a 16 pixéis. Os navegadores actuais usam quase sempre 32px.

## O que falta preencher

Substituir `EMAIL@EXEMPLO.PT` em `contacto.html` pelo email real.

## Design

Padrão `portfolio-grid`, estilo `editorial-grid-magazine`, tipos Playfair Display + Source Serif 4 + JetBrains Mono, paleta de cal quente com terracota e ocre. O registo das decisões está em `design-system/ana-nunes/MASTER.md`.
