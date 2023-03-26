import { api } from "./api";

export interface TipoSanguineo {
  id: number;
  tipo: String;
}

export const getPessoas = async (): Promise<TipoSanguineo[]> => {
  return (await api.get("tipoSanguineo")).data as TipoSanguineo[];
};
