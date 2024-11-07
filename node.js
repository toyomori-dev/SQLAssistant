import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados MySQL
const dbConfig = {
    host: 'dbsenac.mysql.database.azure.com',
    user: 'bruno',
    password: '8e5e12358@',
    database: 'loja_esportiva',
    ssl: {
        rejectUnauthorized: false
    }
};

// Pool de conexões MySQL
const pool = mysql.createPool(dbConfig);

// Rota para processar perguntas e executar SQL
app.post('/query', async (req, res) => {
    try {
        const { question } = req.body;

        // Gerar SQL usando Azure OpenAI
        const openaiResponse = await fetch("https://azuretelegram.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-08-01-preview", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': '6150d5126ecc4142803bf6e6e94f211a'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "Você é um especialista em SQL. Gere apenas o comando SQL sem explicações. Use apenas SELECT para consultas de leitura."
                    },
                    {
                        role: "user",
                        content: question
                    }
                ],
                max_tokens: 800,
                temperature: 0.7
            })
        });

        const openaiData = await openaiResponse.json();
        const sqlQuery = openaiData.choices[0].message.content;

        // Executar a query no MySQL
        const connection = await pool.getConnection();
        try {
            const [results] = await connection.query(sqlQuery);
            res.json({
                sql: sqlQuery,
                results: results
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
