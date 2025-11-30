# Atlantis

## Resumo da Atividade

Após o sucesso do protótipo navegável, o sistema Atlantis evoluiu para uma aplicação web completa, mantendo a interface SPA validada pelos clientes. Nesta etapa, todas as funcionalidades já presentes desde o sistema CLI foram integradas à aplicação web, incluindo o CRUD de clientes (hóspedes), cadastro de acomodações e registro de hospedagens. O grande diferencial desta versão é a integração com um banco de dados, permitindo o armazenamento e gerenciamento persistente das informações do sistema.

## Descrição

Aplicação web para gerenciamento de clientes, acomodações e hospedagens, desenvolvida em React + TypeScript, utilizando Vite e conectada a um banco de dados.

## Conexão com o Banco de Dados

O Atlantis utiliza o [Supabase](https://supabase.com/) como backend para armazenamento dos dados. O Supabase é uma plataforma open source que oferece autenticação, banco de dados PostgreSQL e API REST, facilitando a integração com aplicações web modernas.

### Como funciona a conexão

- A aplicação se conecta ao Supabase utilizando a biblioteca oficial `@supabase/supabase-js`.
- As credenciais de acesso (URL do projeto e chave pública) ficam armazenadas em variáveis de ambiente ou em um arquivo de configuração.
- Todas as operações de leitura, criação, atualização e exclusão de dados (CRUD) são feitas através da API do Supabase, garantindo persistência e segurança.

### Como configurar sua própria conexão

1. **Crie uma conta gratuita no [Supabase](https://supabase.com/)** e inicie um novo projeto.
2. No painel do Supabase, copie a **URL do projeto** e a **chave anônima (anon key)**.
3. No projeto Atlantis, crie um arquivo `.env` na raiz com o seguinte conteúdo:

   ```
   VITE_SUPABASE_URL=https://<sua-url-do-projeto>.supabase.co
   VITE_SUPABASE_ANON_KEY=<sua-anon-key>
   ```

4. No código, a configuração da conexão geralmente está em `src/data/supabaseClient.ts`:

   ```typescript
   // src/data/supabaseClient.ts
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

5. Pronto! Agora a aplicação estará conectada ao seu próprio banco de dados Supabase.

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