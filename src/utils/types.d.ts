
export interface User {
    // Identificação
    _id: string
    // Autenticação
    rm: string
    password: string
    permission:number
    // Informação do Aluno
    nome: string
    nascimento: string
}

