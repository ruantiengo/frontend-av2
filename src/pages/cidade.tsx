import { Inter } from "next/font/google";
import { Pessoa, getPessoas } from "@/services/pessoaService";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Table from "@/components/table";
import { useContext, useMemo } from "react";
import AddPessoaButton from "@/components/buttons/addPessoa";
import { styled } from "@stitches/react";
import RemovePessoaButton from "@/components/buttons/removePessoa";
import { ToastContainer } from "react-toastify";
import { GlobalContext, GlobalProvider } from "@/contexts/globalContext";
import NavigationMenuDemo from "@/components/navigation";
import AddEstadoButton from "@/components/buttons/addEstado";
import RemoveEstadoButton from "@/components/buttons/removeEstado";
import AddCidadeButton from "@/components/buttons/addCidade";
import RemoveCidadeButton from "@/components/buttons/removeCidade";
import { Cidade } from "@/services/cidadeService";

const inter = Inter({ subsets: ["latin"] });

interface IHome {
  pessoas: Pessoa[];
}
export default function Home({}: IHome) {
  const columns = [
    {
      Header: "Cidade",
      accessor: "nome",
    },
    {
      Header: "Estado",
      accessor: "estadoSigla",
    },
  ];
  const { cidades } = useContext(GlobalContext);

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <NavigationMenuDemo />
      <div style={{ display: "flex", gap: "2rem" }}>
        <AddCidadeButton />
        <RemoveCidadeButton array={cidades!} />
      </div>

      <Table columns={columns} data={cidades!} />
    </Container>
  );
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});
