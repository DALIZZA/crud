const connection = require('./connection') //Importa o conecction.js

//É uma função assíncrona, consulta banco de dados, busca dados da api, busca itens. Se não ter nada, dá erro ao buscar itens.
const getAllItems = async () => {
    try {
        const[query] = await connection.execute('SELECT * FROM teste_node.book')
        return query
    } catch (error) {
        throw new Error(`Erro ao buscar itens: ${error.message}`)
    }
}
//Função assíncrona, insere um novo item se não encontra, erro ao inserir item.
async function insertItem(title, author){
    try{
        const insertQuery = "INSERT INTO book (title, author) VALUES (?, ?)"
        const values = [title, author]

        const[result] = await connection.execute(insertQuery, values)
        return result
    } catch(error){
        throw new Error(`Erro ao inserir item: ${error.message}` )
    }
}

// Atualizar
const updateItem = async (id, title, author) => {
    try {
        const updateQuery = "UPDATE book SET title = ?, author = ? WHERE id = ?";
        const values = [title, author, id];
        const [result] = await connection.execute(updateQuery, values);
        return result;
    } catch (error) {
        throw new Error(`Erro ao atualizar item: ${error.message}`);
    }
};

// Para deletar
const deleteItem = async (id) => {
    try {
        const deleteQuery = "DELETE FROM book WHERE id = ?";
        const values = [id];
        const [result] = await connection.execute(deleteQuery, values);
        return result;
    } catch (error) {
        throw new Error(`Erro ao excluir item: ${error.message}`);
    }
};


module.exports = { getAllItems, insertItem, updateItem, deleteItem };