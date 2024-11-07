Documentação de Instalação - SQL Assistant
Este é um projeto que utiliza um servidor Node.js com o Express para permitir consultas SQL interativas em um banco de dados MySQL. O projeto permite que o usuário faça perguntas em linguagem natural e receba resultados de banco de dados com base em suas perguntas.

Requisitos
Node.js e npm
O Node.js deve estar instalado na sua máquina. Você pode verificar se já o tem instalado com o seguinte comando:

bash
Copiar código
node -v
Caso não tenha, baixe e instale o Node.js aqui.

Banco de Dados MySQL
O projeto utiliza um banco de dados MySQL para armazenar os dados, como produtos e compras. O MySQL precisa estar instalado e acessível. Certifique-se de ter as credenciais de acesso e configure o banco de dados de acordo com a estrutura fornecida no código.

Passo 1: Configuração do Banco de Dados
Crie o banco de dados e as tabelas necessárias. Use o script SQL abaixo para criar as tabelas e inserir os dados iniciais:

sql
Copiar código
-- Criar banco de dados
DROP DATABASE IF EXISTS loja_esportiva;
CREATE DATABASE IF NOT EXISTS loja_esportiva;
USE loja_esportiva;

-- Criar tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    produto_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL,
    descricao TEXT
);

-- Criar tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de Compras
CREATE TABLE IF NOT EXISTS compras (
    compra_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);

-- Criar tabela de Itens de Compra
CREATE TABLE IF NOT EXISTS itens_compra (
    item_compra_id INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT,
    produto_id INT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES compras(compra_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(produto_id)
);

-- Inserir produtos esportivos
INSERT INTO produtos (nome, categoria, preco, estoque, descricao) VALUES
('Tênis de Corrida', 'Calçados', 299.99, 50, 'Tênis confortável para corrida de alta performance.'),
('Raquete de Tênis', 'Raquetes', 180.50, 30, 'Raquete profissional de tênis de alto desempenho.'),
...
;

-- Inserir um cliente
INSERT INTO clientes (nome, email, telefone, endereco) 
VALUES ('João Silva', 'joao.silva@email.com', '(11) 99999-9999', 'Rua Exemplo, 123');
Passo 2: Configuração do Ambiente
Crie um arquivo .env na raiz do seu projeto e adicione as credenciais de acesso ao banco de dados MySQL:
env
Copiar código
PORT=3000
DB_HOST=dbsenac.mysql.database.azure.com
DB_USER=bruno
DB_PASSWORD=8e5e12358@
DB_NAME=loja_esportiva
Substitua os valores de DB_HOST, DB_USER, DB_PASSWORD e DB_NAME com as suas próprias credenciais.

Passo 3: Instalação de Dependências
Navegue até o diretório do projeto no terminal.
Instale as dependências necessárias executando o seguinte comando:
bash
Copiar código
npm install express mysql2 cors node-fetch dotenv
Isso irá instalar as bibliotecas express, mysql2, cors, node-fetch e dotenv, que são necessárias para o funcionamento do servidor e interação com o banco de dados.

Passo 4: Iniciar o Servidor
Com todas as dependências instaladas e o banco de dados configurado, inicie o servidor com o comando:
bash
Copiar código
npm start
O servidor começará a rodar na porta especificada no arquivo .env (porta 3000 por padrão).

Passo 5: Acessando o Sistema
Abra o arquivo index.html em um navegador para interagir com o sistema. O HTML contém a interface onde você pode fazer perguntas sobre os dados, como "Quais são os produtos mais vendidos?".

O servidor expõe os seguintes endpoints:

GET /: Endpoint de teste para verificar se o servidor está funcionando corretamente. Retorna "Hello World!".
GET /produtos: Retorna todos os produtos cadastrados no banco de dados.
POST /query: Permite que você envie uma pergunta em formato JSON. O servidor interpreta a pergunta, gera a consulta SQL correspondente e retorna os resultados.
Passo 6: Testar as Consultas
Ao abrir a interface HTML no navegador, você pode digitar uma pergunta, como:
"Quais são os produtos mais vendidos?"
"Quais são os produtos disponíveis?"
O servidor irá gerar a consulta SQL correspondente e retornará os resultados de forma estruturada, com a consulta SQL gerada sendo exibida no navegador.
Configuração do Frontend (index.html)
O frontend da aplicação (arquivo index.html) permite ao usuário interagir com o servidor. A página permite que o usuário faça uma pergunta sobre os dados, e exibe a consulta SQL gerada e os resultados em uma tabela.

Recursos de Frontend:
Bootstrap: Usado para o design e estilo da página.
Highlight.js: Usado para destacar o código SQL gerado de forma legível.
Função JavaScript: A função generateAndExecuteSQL() envia a pergunta ao servidor e exibe os resultados ou erros.
Passo 7: Personalização e Expansão
Você pode adicionar novas consultas SQL baseadas em diferentes perguntas. Basta modificar o código do backend (index.js) para adicionar mais lógica na parte de /query.
Além disso, pode-se estender as tabelas do banco de dados ou adicionar mais funcionalidades na interface frontend para dar suporte a novas perguntas ou relatórios.
Conclusão
Com esses passos, você terá um servidor de consultas SQL funcional baseado em perguntas em linguagem natural, alimentado por um banco de dados MySQL. O sistema é altamente personalizável e pode ser expandido conforme suas necessidades.

Se precisar de mais alguma ajuda ou tiver alguma dúvida durante a instalação ou configuração, não hesite em perguntar!



