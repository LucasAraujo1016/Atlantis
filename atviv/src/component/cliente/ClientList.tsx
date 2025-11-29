import { useState, useEffect } from "react";
import ClienteForm from "./ClienteForm";
import type { Cliente } from "../types/clienteType";
import ClienteTable from "../listagem/listaClientes";

const STORAGE_KEY = "clientes_atviv";
const HOSPEDAGENS_KEY = "hospedagens_atviv";

export default function ClientList() {
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [telefonesVisiveis, setTelefonesVisiveis] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
  }, [clientes]);

  function handleSalvar(cliente: Cliente) {
    if (clienteEditando) {
      setClientes(prevClientes => {
        const atualizados = prevClientes.map(c =>
          c.id === cliente.id ? cliente : c
        );
        if (!cliente.titularId) {
          return atualizados.map(c =>
            c.titularId === cliente.id
              ? { ...c, telefones: cliente.telefones, endereco: cliente.endereco }
              : c
          );
        }
        return atualizados;
      });
      setClienteEditando(null);
    } else {
      setClientes([...clientes, cliente]);
    }
    setShowForm(false);
  }

  function handleEditar(cliente: Cliente) {
    setClienteEditando(cliente);
    setShowForm(true);
  }

  function handleExcluir(id: string) {
    const dependentesIds = clientes.filter(c => c.titularId === id).map(c => c.id);
    setClientes(clientes.filter(
      c => c.id !== id && !dependentesIds.includes(c.id)
    ));
    const hospedagens = JSON.parse(localStorage.getItem(HOSPEDAGENS_KEY) || "[]");
    const idsParaExcluir = [id, ...dependentesIds];
    const hospedagensFiltradas = hospedagens.filter(
      (h: any) => !idsParaExcluir.includes(h.clienteId)
    );
    localStorage.setItem(HOSPEDAGENS_KEY, JSON.stringify(hospedagensFiltradas));
  }

  function handleCancelar() {
    setShowForm(false);
    setClienteEditando(null);
  }

  function formatarData(data: string) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function getNomeTitular(titularId: string | undefined) {
    if (!titularId) return "-";
    const titular = clientes.find(c => c.id === titularId);
    return titular ? titular.nome : "-";
  }

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-300 flex flex-col items-center py-10 px-2 sm:px-4">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-4 sm:p-8 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow">
          Gerenciamento de Clientes
        </h2>
        {!showForm && (
          <input
            type="text"
            placeholder="Buscar cliente pelo nome..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="mb-6 border border-blue-300 px-4 py-2 rounded-lg w-full max-w-md shadow"
          />
        )}
        {showForm ? (
          <ClienteForm
            onSalvar={handleSalvar}
            onCancelar={handleCancelar}
            cliente={clienteEditando ?? undefined}
            clientesExistentes={clientes}
          />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
                onClick={() => { setShowForm(true); setClienteEditando(null); }}
              >
                Novo Cliente
              </button>
            </div>
            {clientesFiltrados.length === 0 ? (
              <p className="text-center text-blue-900 font-semibold">Nenhum cliente cadastrado.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl shadow">
                <ClienteTable
                  clientes={clientesFiltrados}
                  teleVisible={telefonesVisiveis}
                  setTeleVisible={setTelefonesVisiveis}
                  onEditar={handleEditar}
                  onExcluir={handleExcluir}
                  formatarData={formatarData}
                  getNomeTitular={getNomeTitular}
                  setClientes={setClientes}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}