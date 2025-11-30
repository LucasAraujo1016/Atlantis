# Atlantis

## Resumo da Atividade

Esta versão do projeto Atlantis representa uma evolução do MVP, trazendo mais funcionalidades e melhorias na arquitetura. Foram aplicados dois padrões de projeto (Singleton e Strategy) e princípios SOLID para tornar o sistema mais robusto e flexível. O armazenamento dos dados é feito em memória, utilizando a classe “Armazém” que implementa o padrão Singleton. O padrão Strategy foi utilizado tanto por meio de uma interface (Menu) quanto por uma classe abstrata (Processo), permitindo a definição de diferentes comportamentos e ações no sistema.

As principais funcionalidades implementadas nesta etapa são:
- CRUD completo de clientes, incluindo o cadastro de dependentes.
- Listagem de dependentes para um titular específico.
- Listagem do titular para um dependente específico.

O sistema permanece como uma aplicação CLI (linha de comando), sem integração com banco de dados externo, e está preparado para o primeiro lançamento como MVP.

## Descrição

Projeto em TypeScript para gerenciamento de clientes, documentos, endereços e telefones.

## Pré-requisitos

- **Node.js**: v18.x ou superior  
- **npm**: v9.x ou superior  
- **TypeScript**: v5.x ou superior

## Instalação

1. Acesse a pasta do projeto:

   ```sh
   cd atvii
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

## Compilação

Para compilar os arquivos TypeScript para JavaScript:

```sh
npx tsc
```

Os arquivos compilados serão gerados na pasta `src/js/`.

## Execução

Após compilar, execute o projeto usando Node.js. Por exemplo, para rodar o arquivo principal:

```sh
node src/js/app/app.js
```

## Estrutura de Pastas

- `ts/`: Código-fonte TypeScript
- `src/js/`: Código JavaScript compilado
- Subpastas organizam abstrações, modelos, processos, menus, etc.

## Observações

- Sempre compile o projeto antes de executar para garantir que as alterações em TypeScript estejam refletidas no JavaScript.
- Certifique-se de estar usando as versões recomendadas das ferramentas para evitar incompatibilidades.