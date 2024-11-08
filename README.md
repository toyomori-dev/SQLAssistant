Documentação de Instalação - SQL Assistant

Este é um projeto que utiliza um servidor Node.js com Express para permitir consultas SQL interativas em um banco de dados MySQL. O projeto permite que o usuário faça perguntas em linguagem natural e receba resultados de banco de dados com base em suas perguntas.

## Requisitos

1. **Node.js e npm**  
   O Node.js deve estar instalado na sua máquina. Você pode verificar se já o tem instalado com o seguinte comando:
   ```bash
   node -v
Caso não tenha, baixe e instale o Node.js aqui.

#  Banco de Dados MySQL
O projeto utiliza um banco de dados MySQL para armazenar os dados, como produtos e compras. O MySQL precisa estar instalado e acessível. Certifique-se de ter as credenciais de acesso e configure o banco de dados de acordo com a estrutura fornecida no código.

#  Passo 1: Configuração do Banco de Dados
Crie o banco de dados e as tabelas necessárias. Use o script SQL abaixo para criar as tabelas e inserir os dados iniciais:

# Passo 2: Configuração do Ambiente
Crie um arquivo .env na raiz do seu projeto e adicione as credenciais de acesso ao banco de dados MySQL:

PORT=3000
DB_HOST=HOST
DB_USER=USER
DB_PASSWORD=PASSWORD
DB_NAME=Database

# Passo 3: Instalação de Dependências
Navegue até o diretório do projeto no terminal.
Instale as dependências necessárias executando o seguinte comando:
```bash
npm install express mysql2 cors node-fetch dotenv

```
Isso irá instalar as bibliotecas express, mysql2, cors, node-fetch e dotenv, que são necessárias para o funcionamento do servidor e interação com o banco de dados.

# Passo 4: Iniciar o Servidor
Com todas as dependências instaladas e o banco de dados configurado, inicie o servidor com o comando:

```bash
npm start
```
O servidor começará a rodar na porta especificada no arquivo .env (porta 3000 por padrão).

# Passo 5: Acessando o Sistema
Abra o arquivo index.html em um navegador para interagir com o sistema. O HTML contém a interface onde você pode fazer perguntas sobre os dados, como "Quais são os produtos mais vendidos?".

O servidor expõe os seguintes endpoints:

GET /: Endpoint de teste para verificar se o servidor está funcionando corretamente. Retorna "Hello World!".
GET /produtos: Retorna todos os produtos cadastrados no banco de dados.
POST /query: Permite que você envie uma pergunta em formato JSON. O servidor interpreta a pergunta, gera a consulta SQL correspondente e retorna os resultados.

# Passo 6: Testar as Consultas
Ao abrir a interface HTML no navegador, você pode digitar uma pergunta, como:
"Quais são os produtos mais vendidos?"
"Quais são os produtos disponíveis?"
O servidor irá gerar a consulta SQL correspondente e retornará os resultados de forma estruturada, com a consulta SQL gerada sendo exibida no navegador.
