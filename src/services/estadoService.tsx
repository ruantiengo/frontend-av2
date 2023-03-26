import { api } from "./api";

export interface Estado {
  id: number;
  nome: String;
  sigla: String;
}

export const getEstados = async (): Promise<Estado[]> => {
  return (await api.get("estado")).data as Estado[];
};

export const addEstado = async (
  nome: string,
  sigla: string
): Promise<Estado> => {
  return await api.post("estado", {
    nome,
    sigla,
  });
};

export const removeEstado = async (id: number): Promise<Estado[]> => {
  return await api.delete(`estado/${id}`);
};
