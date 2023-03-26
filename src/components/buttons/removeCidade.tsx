import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import SelectDemo from "../select";

import { Pessoa, addPessoa, removePessoa } from "@/services/pessoaService";
import { errorToast, successToast } from "../toast";
import { GlobalContext } from "@/contexts/globalContext";
import { Estado, removeEstado } from "@/services/estadoService";
import { Cidade, removeCidade } from "@/services/cidadeService";

interface IRemove {
  array: Cidade[];
}
const RemoveCidadeButton = ({ array }: IRemove) => {
  const [id, setId] = useState(0);
  const convert = array.map((item) => {
    return {
      name: item.nome,
      id: item.id,
      value: item.id,
    };
  });
  const { cidades, estados, setEstados, setCidades } =
    useContext(GlobalContext);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button red">Deletar Estado</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Nova Pessoa</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when youre done.
          </Dialog.Description>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Estado
            </label>
            <SelectDemo
              array={convert}
              chave={"id"}
              title="Selecione"
              setValue={setId}
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
                className="Button red"
                onClick={async () => {
                  try {
                    await removeCidade(id).then(() => {
                      const filteredArray = cidades!.filter(
                        (old) => old.id !== id
                      );
                      console.log(filteredArray);
                      setCidades([...filteredArray]);
                    });
                    successToast("Eliminado com sucesso!");

                    console.log(id);
                  } catch (error: any) {
                    console.log(error);
                    errorToast(error.message);
                  }
                }}
              >
                Remover
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
export default RemoveCidadeButton;
