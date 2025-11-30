# Atlantis

## Resumo da Atividade

Nesta etapa do desenvolvimento do sistema Atlantis, o foco foi aprimorar o MVP a partir do feedback de clientes, incluindo o cadastro e gerenciamento de hospedagens. Para isso, foi implementada a classe “Acomodações”, representando diferentes tipos de quartos em hotéis, pousadas ou resorts, com suas respectivas configurações (quantidade de camas, suítes, climatização, garagem, etc.). 

O padrão de projeto **Builder** foi utilizado para facilitar a criação de diferentes tipos de acomodações, por meio de classes diretoras específicas para cada configuração (ex: Solteiro Simples, Casal Simples, Família Mais, etc.). Além disso, foram desenvolvidas as estruturas e lógicas necessárias para controlar as hospedagens, permitindo registrar hóspedes e vinculá-los às acomodações disponíveis.

Com essas melhorias, o sistema Atlantis se aproxima de um produto mínimo viável, pronto para ser comercializado.

## Descrição

Projeto em TypeScript para gerenciamento de acomodações, clientes, documentos, endereços e telefones.

## Pré-requisitos

- **Node.js**: v18.x ou superior  
- **npm**: v9.x ou superior  
- **TypeScript**: v5.x ou superior

## Instalação

1. Acesse a pasta do projeto:

   ```sh
   cd atviii
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