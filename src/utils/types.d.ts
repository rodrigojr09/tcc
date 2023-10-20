export interface User {
  // Identificação
  _id: string;
  // Autenticação
  rm: string;
  password: string;
  permission: number;
  // Informação do Aluno
  nome: string;
  nascimento: string;
}

interface Sala {
  id: string;
  nome: string;
  reclames: {
    motivo: string;
    user: string;
  }[];
  sugestoes: {
    motivo: string;
    user: string;
  }[];
}
