const { gql, ApolloServer } = require("apollo-server");

// Schema
// Schema Definition Language ou Linguagem de definição de esquema
// SDL



const db = [
    {
        id: 1,
        nome: "Enzo",
        email: "enzo@email.com",
        telefone: "11 1234 1234",
        perfil: 1
    },
    {
        id: 2,
        nome: "Heitor",
        email: "heitor@email.com",
        telefone: "22 2323 2323",
        perfil: 2
    }
]

const perfis = [
    { id: 1, descricao: "ADMIN" },
    { id: 2, descricao: "NORMAL" }
]

const typeDefs = gql`
    type Usuario {
        id: Int
        nome: String
        email: String
        telefone: String
        perfil: Perfil
    }

    type Perfil {
        id: Int
        descricao: String
    }

    type Query {
        usuario(id: Int): Usuario
        perfis: [Perfil]
    }
`

const resolvers = {
    Usuario: {
        perfil(obj) {
            return perfis.find(p => p.id === obj.id)
        }
    },
    Query: {
        usuario(_, args) {
            return db.find(db => db.id === args.id)
        },
        perfis() {
            return perfis
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen();