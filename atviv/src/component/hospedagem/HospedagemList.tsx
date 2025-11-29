import { useState, useEffect } from "react";
import HospedagemForm from "./HospedagemForm";
import type { Cliente } from "../types/clienteType";
import type { Hospedagem as HospedagemType } from "../types/hospedagemType";
import HospedagemTable from "../listagem/listaHospedagem";

const STORAGE_KEY = "hospedagens_atviv";
const CLIENTES_KEY = "clientes_atviv";

export default function HospedagemList() {
  const [hospedagens, setHospedagens] = useState<HospedagemType[]>(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  });

  const [clientes] = useState<Cliente[]>(() => {
    const data = localStorage.getItem(CLIENTES_KEY);
    return data ? JSON.parse(data) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [hospedagemEditando, setHospedagemEditando] = useState<HospedagemType | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hospedagens));
  }, [hospedagens]);

  function handleSalvar(dados: Omit<HospedagemType, "id">) {
    if (hospedagemEditando) {
      setHospedagens(hospedagens.map(h =>
        h.id === hospedagemEditando.id ? { ...hospedagemEditando, ...dados } : h
      ));
      setHospedagemEditando(null);
    } else {
      setHospedagens([...hospedagens, { ...dados, id: crypto.randomUUID() }]);
    }
    setShowForm(false);
  }

  function handleEditar(hospedagem: HospedagemType) {
    setHospedagemEditando(hospedagem);
    setShowForm(true);
  }

  function handleCancelar() {
    setShowForm(false);
    setHospedagemEditando(null);
  }

  function handleRemover(id: string) {
    setHospedagens(hospedagens.filter(h => h.id !== id));
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-300 flex flex-col items-center py-10 px-2 sm:px-4">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-4 sm:p-8 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow">
          Gerenciamento de Hospedagens
        </h2>
        {showForm ? (
          <HospedagemForm
            onSalvar={handleSalvar}
            onCancelar={handleCancelar}
            clientes={clientes}
            hospedagens={hospedagens}
            hospedagem={hospedagemEditando ?? undefined}
          />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
                onClick={() => { setShowForm(true); setHospedagemEditando(null); }}
              >
                Nova Hospedagem
              </button>
            </div>
            {hospedagens.length === 0 ? (
              <p className="text-center text-blue-900 font-semibold">Nenhuma hospedagem cadastrada.</p>
            ) : (
              <div className="rounded-xl shadow">
                <HospedagemTable
                  hospedagens={hospedagens}
                  clientes={clientes}
                  onEditar={handleEditar}
                  onRemover={handleRemover}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}