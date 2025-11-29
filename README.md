# Atlantis

## Descrição

Aplicação web para gerenciamento de clientes e hospedagens, desenvolvida em React + TypeScript, utilizando Vite.

## Pré-requisitos

- **Node.js**: v18.x ou superior  
- **npm**: v9.x ou superior  
- **Vite**: v5.x ou superior

## Instalação

1. Acesse a pasta do projeto:

   ```sh
   cd atvv
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

## Execução em Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```sh
npm run dev
```

Acesse o endereço exibido no terminal (geralmente http://localhost:5173).

## Build de Produção

Para gerar a versão de produção:

```sh
npm run build
```

Para visualizar o build localmente:

```sh
npm run preview
```

## Estrutura de Pastas

- `src/`: Código-fonte principal
  - `component/`: Componentes React reutilizáveis (clientes, hospedagens, dashboard, navbar, listagem, types)
  - `data/`: Configuração de acesso a dados (ex: Supabase)
  - `pages/`: Páginas da aplicação
  - `assets/`: Imagens e recursos estáticos
- `public/`: Arquivos públicos
- Arquivos de configuração: `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, etc.

## Observações

- Sempre utilize as versões recomendadas das ferramentas para evitar incompatibilidades.
- O projeto utiliza Vite para desenvolvimento rápido e eficiente.