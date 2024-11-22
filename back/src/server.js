const express = require('express'); // Importa o framework Express para criação do servidor

// Middleware é uma função que tem acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função de middleware na pilha de execução do Express.
// Ele é usado para permitir que aplicações web que estão rodando em um domínio (origem) acessem recursos em outro domínio.
const cors = require('cors'); // Importa o middleware para lidar com CORS (Cross-Origin Resource Sharing)

const { getAllItems, insertItem, updateItem, deleteItem } = require('./allItems');
 // Importa as funções para manipulação de dados

const app = express(); // Cria uma instância do aplicativo Express
app.use(express.json()); // Middleware para analisar requisições com corpo em JSON
app.use(cors()); // Middleware para permitir requisições de diferentes origens

const PORT = 3003; // Define a porta em que o servidor irá escutar

// Inicia o servidor na porta definida e imprime uma mensagem no console
app.listen(PORT, () => {
    console.log(`Funcionando na porta ${PORT}`);
});

// Rota para buscar todos os itens
app.get('/', async (req, res) => {
    try {
        const items = await getAllItems(); // Chama a função para buscar todos os itens
        res.status(200).json(items); // Envia os itens como resposta com status 200 (OK)
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envia uma mensagem de erro com status 500 (Erro interno do servidor)
    }
});

// Rota para inserir um item
app.post('/insertItem', async (req, res) => {
    const { title, author } = req.body; // Extrai título e autor do corpo da requisição
    try {
        const result = await insertItem(title, author); // Chama a função para inserir um item
        res.status(201).json(result); // Envia o resultado da inserção como resposta com status 201 (Criado)
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envia uma mensagem de erro com status 500 (Erro interno do servidor)
    }
});


// Rota para atualizar um item
app.put('/updateItem/:id', async (req, res) => {
    const { id } = req.params; // Extrai o ID da URL
    const { title, author } = req.body; // Extrai os dados do corpo da requisição

    try {
        // Função para atualizar o item no banco de dados
        const result = await updateItem(id, title, author);
        res.status(200).json(result); // Envia o resultado da atualização
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envia uma mensagem de erro
    }
});


// Rota para excluir um item
app.delete('/deleteItem/:id', async (req, res) => {
    const { id } = req.params; // Extrai o ID da URL

    try {
        // Função para excluir o item do banco de dados
        const result = await deleteItem(id);
        res.status(200).json(result); // Envia o resultado da exclusão
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envia uma mensagem de erro
    }
});


