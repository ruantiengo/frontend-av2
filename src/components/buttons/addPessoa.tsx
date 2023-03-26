import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { TipoSanguineo } from "@/services/tipoSanguineoService";
import { api } from "@/services/api";
import SelectDemo from "../select";
import { Cidade } from "@/services/cidadeService";
import { Pessoa, addPessoa } from "@/services/pessoaService";
import { errorToast, successToast } from "../toast";
import { GlobalContext } from "@/contexts/globalContext";

const AddPessoaButton = () => {
  const [name, setName] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [tipoSanguineoId, setTipoSanguineoId] = useState<number>();
  const [cidadeId, setCidadeId] = useState<number>();
  const [documento, setDocumento] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [complemento, setComplemento] = useState("");
  const [tipoSanguineos, setTipoSanguineos] = useState<any>([]);
  const [cidades, setCidades] = useState<any>([]);
  const { setPessoas } = useContext(GlobalContext);
  useEffect(() => {
    api
      .get("/tipoSanguineo")
      .then((response) => {
        const data = response.data as TipoSanguineo[];

        const options = data.map((obj) => {
          return {
            name: obj.tipo,
            value: obj.id,
            id: obj.id,
          };
        });

        setTipoSanguineos(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/cidade")
      .then((response) => {
        const data = response.data as Cidade[];

        const options = data.map((obj) => {
          return {
            name: obj.nome,
            value: obj.id,
            id: obj.id,
          };
        });

        setCidades(options);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Nova Pessoa</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Nova Pessoa</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when youre done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input
              className="Input"
              id="name"
              defaultValue="John Doe"
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Rua
            </label>
            <input
              className="Input"
              id="username"
              defaultValue="Av. Amando Fajardo"
              onChange={(e) => {
                setRua(e.target.value);
                console.log(rua);
              }}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Numero
            </label>
            <input
              className="Input"
              id="username"
              defaultValue="5000"
              onChange={(e) => setNumero(e.target.value)}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Tipo Sanguineo
            </label>
            <SelectDemo
              array={tipoSanguineos}
              chave={"id"}
              title="Selecione"
              setValue={setTipoSanguineoId}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Cidade
            </label>
            <SelectDemo
              array={cidades}
              chave={"id"}
              title="Selecione"
              setValue={setCidadeId}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Complemento
            </label>
            <input
              className="Input"
              id="username"
              defaultValue="Casa"
              onChange={(e) => {
                setComplemento(e.target.value);
                console.log(complemento);
              }}
            />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button
                className="Button green"
                onClick={async () => {
                  try {
                    console.log(
                      name,
                      cidadeId,
                      complemento,
                      numero,
                      rua,
                      tipoSanguineoId
                    );

                    const pessoa = await addPessoa({
                      nome: name,
                      cidadeId: Number(cidadeId),
                      complemento,
                      numero,
                      rua,
                      tipoSanguineoId: Number(tipoSanguineoId),
                    });
                    setPessoas((old: Pessoa[]) => [...old, pessoa]);
                    successToast("Cadastrado com sucesso");
                  } catch (error: any) {
                    errorToast(error.message);
                    console.log(error);
                  }
                }}
              >
                Nova pessoa
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default AddPessoaButton;
