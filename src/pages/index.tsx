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

const inter = Inter({ subsets: ["latin"] });

interface IHome {
  pessoas: Pessoa[];
}
export default function Home({}: IHome) {
  const columns = [
    {
      Header: "Nome",
      accessor: "nome",
    },
    {
      Header: "Complemento",
      accessor: "complemento",
    },
    {
      Header: "Número",
      accessor: "numero",
    },
    {
      Header: "Rua",
      accessor: "rua",
    },
    {
      Header: "Tipo Sanguíneo",
      accessor: "tipoSanguineo.tipo",
    },
    {
      Header: "Cidade",
      accessor: "cidade.nome",
    },
  ];
  const { pessoas } = useContext(GlobalContext);
  console.log("Renderiza denoovo");

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
        <AddPessoaButton />
        <RemovePessoaButton array={pessoas!} />
      </div>

      <Table columns={columns} data={pessoas!} />
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
