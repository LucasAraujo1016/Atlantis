# Atlantis

## Descrição

Projeto em TypeScript para gerenciamento de clientes, documentos, endereços e telefones.

## Pré-requisitos

- **Node.js**: v18.x ou superior  
- **npm**: v9.x ou superior  
- **TypeScript**: v5.x ou superior

## Instalação

1. Acesse a pasta do projeto:

   ```sh
   cd atvi
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

Os arquivos compilados serão gerados na pasta `js/`.

## Execução

Após compilar, execute o projeto usando Node.js. Por exemplo, para rodar o arquivo principal de teste:

```sh
node js/teste/index.js
```

## Estrutura de Pastas

- `modelos/`: Modelos principais em TypeScript
- `enumeracoes/`: Enumerações utilizadas no projeto
- `interfaces/`: Interfaces TypeScript
- `teste/`: Scripts de teste em TypeScript
- `js/`: Código JavaScript compilado

## Observações

- Sempre compile o projeto antes de executar para garantir que as alterações em TypeScript estejam refletidas no JavaScript.
- Certifique-se de estar usando as versões recomendadas das ferramentas para evitar incompatibilidades.