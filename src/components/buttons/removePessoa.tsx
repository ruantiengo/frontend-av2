import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import SelectDemo from "../select";

import { Pessoa, addPessoa, removePessoa } from "@/services/pessoaService";
import { errorToast, successToast } from "../toast";
import { GlobalContext } from "@/contexts/globalContext";

interface IRemove {
  array: Pessoa[];
}
const RemovePessoaButton = ({ array }: IRemove) => {
  const [id, setId] = useState(0);

  const convert = array.map((item) => {
    return {
      name: item.nome,
      id: item.id,
      value: item.id,
    };
  });
  const { setPessoas } = useContext(GlobalContext);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button red">Deletar Pessoa</button>
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
              Tipo Sanguineo
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
                    await removePessoa(id);
                    successToast("Eliminado com sucesso!");
                    setPessoas((old: Pessoa[]) =>
                      old.filter((pessoa: Pessoa) => pessoa.id !== id)
                    );
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
export default RemovePessoaButton;
