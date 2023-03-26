import { api } from "./api";

export interface Cidade {
  id: number;
  nome: string;
  estadoId?: number;
  estadoSigla?: string;
}

export const getCidades = async (): Promise<Cidade[]> => {
  const cidades = (await api.get("cidade")).data.map((cidade: any) => {
    return {
      id: cidade.id,
      nome: cidade.nome,
      estadoId: cidade.estadoId,
      estadoSigla: cidade.estado.sigla,
    };
  });
  console.log(cidades);

  return cidades;
};

export const addCidade = async (
  nome: string,
  estadoId: number
): Promise<Cidade> => {
  return await api.post("cidade", {
    nome,
    estadoId,
  });
};

export const removeCidade = async (id: number): Promise<Cidade> => {
  return await api.delete(`cidade/${id}`);
};
