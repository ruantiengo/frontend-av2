import { api } from "./api";

export interface Pessoa {
  id?: number;
  nome: string;
  complemento: string;
  numero: string;
  rua: string;
  tipoSanguineo?: {
    id: number;
    tipo: String;
  };
  cidadeId?: number;
  tipoSanguineoId?: number;
  cidade?: {
    id: number;
    nome: string;
  };
}
export const getPessoas = async (): Promise<Pessoa[]> => {
  return (await api.get("pessoa")).data as Pessoa[];
};

export const addPessoa = async (pessoa: Pessoa): Promise<Pessoa> => {
  return await api.post("pessoa", {
    ...pessoa,
  });
};
export const removePessoa = async (id: number): Promise<Pessoa> => {
  return await api.delete(`pessoa/${id}`);
};
