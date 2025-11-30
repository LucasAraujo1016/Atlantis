# Atlantis

## Resumo da Atividade

Após o sucesso inicial do sistema Atlantis, foi identificado que a interface CLI se tornaria rapidamente obsoleta e pouco intuitiva para os usuários finais. Com base em um relatório da equipe de marketing e vendas, decidiu-se evoluir o sistema para uma aplicação web moderna, utilizando o conceito de Single Page Application (SPA). 

Esta etapa do projeto consistiu no desenvolvimento de um protótipo navegável da interface gráfica, implementado em React + TypeScript, visando melhor usabilidade e compatibilidade com as expectativas dos clientes. O protótipo contempla todas as funcionalidades já presentes no sistema CLI, incluindo o CRUD de clientes (hóspedes), cadastro de acomodações e registro de hospedagens.

## Descrição

Aplicação web para gerenciamento de clientes e hospedagens, desenvolvida em React + TypeScript.

## Pré-requisitos

- **Node.js**: v18.x ou superior  
- **npm**: v9.x ou superior  
- **Vite**: v5.x ou superior

## Instalação

1. Acesse a pasta do projeto:

   ```sh
   cd atviv
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
  - `component/`: Componentes React reutilizáveis
  - `pages/`: Páginas da aplicação
  - `assets/`: Imagens e outros recursos estáticos
  - `types/`: Tipagens TypeScript
- `public/`: Arquivos públicos

## Observações

- Sempre utilize as versões recomendadas das ferramentas para evitar incompatibilidades.
- O projeto utiliza Vite para desenvolvimento rápido e eficiente.