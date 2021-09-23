const { gql, ApolloServer } = require("apollo-server");

// Schema
// Schema Definition Language ou Linguagem de definição de esquema
// SDL

const produtos = [
    {
        id: 1,
        nome: 'Notebook',
        valor: 122.45
    },
    {
        id: 2,
        nome: 'Mouse',
        valor: 10.00
    }
]

const usuarios = [
    {
        id: 1,
        nome: 'Enzo',
        salario: 1234.56,
        ativo: true,
        idade: 37
    },
    {
        id: 2,
        nome: 'Heitor',
        salario: 1234.56,
        ativo: true,
        idade: 1
    }
]

const typeDefs = gql`
    type Produto {
        id: ID
        nome: String
        valor: Float
    }
    
    type Usuario {
        idade: Int
        salario: Float
        nome: String
        ativo: Boolean
        id: ID
    }

    type Query {
        usuarios: [Usuario],
        produtos: [Produto]
        usuario(id: Int, nome: String): Usuario
    }
`

const resolvers = {
    Query: {
        usuarios() {
            return usuarios
        },
        usuario(obg, args) {
            const { id, nome } = args
            if (id) return usuarios.find(u => u.id === args.id)
            return usuarios.find(u => u.nome === args.nome)
        },
        produtos() {
            return produtos
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen();