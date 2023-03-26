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
import { Estado, addEstado } from "@/services/estadoService";

const AddEstadoButton = () => {
  const [name, setName] = useState("");
  const [sigla, setSigla] = useState("");
  const { estados, setEstados } = useContext(GlobalContext);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Adicionar Estado</button>
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
            <label className="Label" htmlFor="name">
              Sigla
            </label>
            <input
              className="Input"
              id="name"
              defaultValue="MG"
              onChange={(e) => {
                setSigla(e.target.value);
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
                    const estado = await addEstado(name, sigla);
                    const newEstado: Estado = {
                      id: estado.id,
                      nome: name,
                      sigla: sigla,
                    };
                    setEstados((old) => [...old, newEstado]);
                    console.log(newEstado);

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
export default AddEstadoButton;
