import React from "react";
import type { Cliente } from "../../types/clienteType";

type Props = {
  clientes: Cliente[];
  clienteBusca: string;
  setClienteBusca: (v: string) => void;
  clienteId: string;
  setClienteId: (v: string) => void;
};

export default function HospedagemClienteSelect({
  clientes,
  clienteBusca,
  setClienteBusca,
  setClienteId,
}: Props) {
  const titulares = clientes.filter(c => !c.titularId);

  function handleClienteBusca(e: React.ChangeEvent<HTMLInputElement>) {
    setClienteBusca(e.target.value);
    if (e.target.value === "") {
      setClienteId("");
      return;
    }
    const selecionado = titulares.find(
      c => c.nome.toLowerCase() === e.target.value.toLowerCase()
    );
    setClienteId(selecionado ? selecionado.id : "");
  }

  return (
    <div>
      <label className="block mb-1 font-semibold">Cliente</label>
      <input
        type="text"
        placeholder="Digite para buscar o cliente titular..."
        list="clientes"
        value={clienteBusca}
        onChange={handleClienteBusca}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <datalist id="clientes">
        {titulares
          .filter(c => c.nome.toLowerCase().startsWith(clienteBusca.toLowerCase()))
          .map(c => (
            <option key={c.id} value={c.nome}>
              {c.nome} ({c.documentos[0]?.numero})
            </option>
          ))}
      </datalist>
    </div>
  );
}