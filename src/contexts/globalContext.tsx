import { Cidade, getCidades } from "@/services/cidadeService";
import { Estado, getEstados } from "@/services/estadoService";
import { Pessoa, getPessoas } from "@/services/pessoaService";
import React, { createContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

type GlobalContextType = {
  pessoas: Pessoa[] | undefined;
  setPessoas: React.Dispatch<React.SetStateAction<Pessoa[]>>;
  estados: Estado[] | undefined;
  setEstados: React.Dispatch<React.SetStateAction<Estado[]>>;
  cidades: Cidade[] | undefined;
  setCidades: React.Dispatch<React.SetStateAction<Cidade[]>>;
};
export const GlobalContext = createContext<GlobalContextType>({
  pessoas: undefined,
  setPessoas: () => {},
  estados: undefined,
  setEstados: () => {},
  cidades: undefined,
  setCidades: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);

  const fetchData = async () => {
    // faça uma chamada de API e atualize o estado com os dados
    const resPessoas = await getPessoas();
    const resEstados = await getEstados();
    const resCidades = await getCidades();
    setPessoas(resPessoas);
    setEstados(resEstados);
    setCidades(resCidades);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!pessoas || !estados || !cidades) {
    // Renderiza um componente de carregamento enquanto o estado está sendo atualizado
    console.log("carregando");

    return <ClipLoader />;
  }

  return (
    <GlobalContext.Provider
      value={{ pessoas, setPessoas, estados, setEstados, cidades, setCidades }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
