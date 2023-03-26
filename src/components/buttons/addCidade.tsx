import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { TipoSanguineo } from "@/services/tipoSanguineoService";
import { api } from "@/services/api";
import SelectDemo from "../select";
import { Cidade, addCidade } from "@/services/cidadeService";
import { Pessoa, addPessoa } from "@/services/pessoaService";
import { errorToast, successToast } from "../toast";
import { GlobalContext } from "@/contexts/globalContext";
import { Estado, addEstado } from "@/services/estadoService";

const AddCidadeButton = () => {
  const [name, setName] = useState("");
  const [estadoId, setEstadoId] = useState(0);
  const { estados, setCidades } = useContext(GlobalContext);
  const [estadosOptions, setEstadoOptions] = useState<any>();

  useEffect(() => {
    if (estados) {
      const mapObject = estados.map((obj) => {
        return {
          name: obj.nome,
          value: obj.id,
          id: obj.id,
        };
      });

      setEstadoOptions(mapObject);
    }
  }, [estados]);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Adicionar Cidade</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Adicionar Estado</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when youre done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Nome
            </label>
            <input
              className="Input"
              id="name"
              defaultValue="Minas Gerais"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Estado
            </label>
            <SelectDemo
              array={estadosOptions!}
              chave={"id"}
              title="Selecione"
              setValue={setEstadoId}
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
                    const cidade = await addCidade(name, Number(estadoId));
                    const newCidade: Cidade = {
                      id: cidade.id,
                      nome: name,

                      estadoId: cidade.estadoId,
                    };
                    setCidades((old) => [...old, newCidade]);

                    successToast("Cadastrado com sucesso");
                  } catch (error: any) {
                    errorToast(error.message);
                    console.log(error);
                  }
                }}
              >
                Novo Estado
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
export default AddCidadeButton;
