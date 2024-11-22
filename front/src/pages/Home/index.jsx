import { useState, useEffect } from "react"; //Importa o useState, useEffect para esse arquivo.
import api from "../../api"; //Importa a api para esse arquivo.
import "./styles.css"; //Importa o styles.css de cá para o arquivo css.


function Home() {   //É um componente funcional que se chama "Home", nesse caso, tudo que estiver dentro da "Home" poderá ser mudado ou seja usando o HTML.
    const [title, setTitle] = useState(''); //Nesse caso, foi criado uma variável chamado "title" mas que a string "('')" está vazia no momento. Então foi criada uma função chamada "setTitle" que ela foi criada para alterar o "title".
    const [author, setAuthor] = useState(''); //Nesse caso, é como a explicação acima só tem a mudança do variável "author" e que a string está vazia no momento também e foi criada a função "setAuthor" que foi criada para alterar o "author".
    const [books, setBooks] = useState([]); //Variável "books" armazena digamos uma lista de livros mas no momento está com a lista vazia. E "setBooks" adiciona ou modifca os itens na lista.

    const [editing, setEditing] = useState(null); // Para controlar a edição de um item

    useEffect(() => {
        fetchBooks(); // Busca os livros ao montar o componente
    }, []);

    // Função para buscar livros
    const fetchBooks = async () => {
        try {
            const response = await api.get('/');
            setBooks(response.data);
        } catch (error) {
            console.error(`Error ao buscar dados: ${error}`);
        }
    };

    // Função para enviar novos dados ao banco
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (editing) {
                // Atualiza um item existente

                await api.put(`updateItem/${editing.id}`, {
                    title,
                    author,
                });
                setEditing(null); // Limpa a edição após atualizar

            } else {
                // Adiciona um novo item
                await api.post('/insertItem', {
                    title,
                    author,
                });
            }

            setTitle('');
            setAuthor('');
            fetchBooks(); // Atualiza a lista de livros

        } catch (error) {
            console.error('Erro ao inserir/atualizar dados: ', error); //Se caso não for encontrado certo livro, irá mostrar essa tela de error.
        }
    }

    // Função para iniciar a edição de um item
    const handleEdit = (book) => {
        setTitle(book.title);
        setAuthor(book.author);
        setEditing(book); // Define o item que está sendo editado
    };

    // Função para excluir um item
    const handleDelete = async (id) => {
        try {
            await api.delete(`/deleteItem/${id}`);
            fetchBooks(); // Atualiza a lista de livros após exclusão
        } catch (error) {
            console.error('Erro ao excluir dados: ', error); //Se não atualiza os dados, irá mostrar esse error se houver algum problema.
        }
    };

    return (           //A variável "editing" se o usuário está editando ou inserindo algo.
                    //<form onSubmit={handleSubmit}> se usa para trazer o envio de um formulário no React.
                    //<label>Título: </label>....Aparecerá a palavra "Título" no navegador e o input de texto aparecerá também e confirmando o título do livro.
        <div> 
            <h1>{editing ? 'Editar Item' : 'Inserir Novo Item'}</h1> 
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Autor: </label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <button type="submit">{editing ? 'Atualizar' : 'Inserir'}</button>
                {editing && <button type="button" onClick={() => setEditing(null)}>Cancelar</button>}
            </form>
                
            <h1>Tabela de Livros</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <button onClick={() => handleEdit(book)}>Editar</button>
                                <button onClick={() => handleDelete(book.id)}>Excluir</button>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;  //Exporta a Home para React, jsx. 
