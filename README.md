# Lima Barbearia — Landing Page Premium

Landing page premium para barbearia, desenvolvida como demonstração de presença digital profissional.

## Tecnologias

- HTML5 semântico
- CSS3 (Mobile-first, dark mode, animações)
- JavaScript vanilla (Intersection Observer, animações)
- Google Fonts (Playfair Display + Inter)
- Lucide Icons / Font Awesome
- Totalmente estático — sem backend

## Estrutura

```
projeto-barbearia/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos completos
├── js/
│   └── main.js         # Scripts e animações
├── assets/
│   ├── images/         # Imagens locais (opcional)
│   └── icons/          # Ícones locais (opcional)
├── vercel.json         # Configuração Vercel
└── README.md
```

## Como Executar Localmente

### Opção 1 — Abrir direto no navegador

Abra o arquivo `index.html` em qualquer navegador moderno.

### Opção 2 — Servidor local (recomendado)

Com Python:

```bash
cd projeto-barbearia
python -m http.server 8000
```

Com Node.js (npx):

```bash
npx serve projeto-barbearia
```

Acesse `http://localhost:8000` no navegador.

## Publicar na Vercel

### Opção 1 — Via CLI

```bash
npm install -g vercel
cd projeto-barbearia
vercel
```

Siga as instruções no terminal. O deploy será automático.

### Opção 2 — Via GitHub + Vercel

1. Crie um repositório no GitHub
2. Envie os arquivos para o repositório
3. Acesse [vercel.com](https://vercel.com) e importe o repositório
4. A Vercel detectará automaticamente o projeto estático
5. Clique em "Deploy"

### Configuração

O arquivo `vercel.json` já está configurado para:
- Headers de segurança (X-Content-Type-Options, X-Frame-Options, etc.)
- Cache infinito para assets (CSS, JS, imagens)
- Rewrites para SPA (fallback para index.html)

## SEO

- Meta tags completas (title, description, keywords, Open Graph, Twitter Cards)
- Schema.org LocalBusiness em JSON-LD
- Tags semânticas HTML5 (header, main, section, article, footer)
- ARIA labels e landmarks
- Skip link para acessibilidade
- URLs canônicas

## Performance

- Lazy loading em imagens
- Imagens responsivas com `<picture>` e `srcset`
- Defer no JavaScript
- Fontes otimizadas (preconnect, display swap)
- CSS sem frameworks — apenas o essencial

## Personalização

Para usar com dados reais:
1. Substitua os telefones em `href="tel:..."` e `href="https://wa.me/..."` no HTML
2. Atualize o endereço no Schema JSON-LD e nas seções de contato
3. Troque as imagens Unsplash por fotos reais
4. Atualize o nome da barbearia, serviços, preços e equipe
5. Substitua a chave de embed do Google Maps

## Licença

Projeto de demonstração. Todos os direitos reservados.
