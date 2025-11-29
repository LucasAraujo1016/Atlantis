import React from "react";
import type { Cliente } from "../types/clienteType";

type Props = {
  clientes: Cliente[];
  teleVisible: string | null;
  setTeleVisible: (id: string | null) => void;
  onEditar: (cliente: Cliente) => void;
  onExcluir: (id: string) => void;
  formatarData: (data: string) => string;
  getNomeTitular: (titularId: string | undefined) => string;
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
};

export default function ClienteTable({
  clientes,
  teleVisible,
  setTeleVisible,
  onEditar,
  onExcluir,
  formatarData,
  getNomeTitular,
  setClientes,
}: Props) {
  function toggleTelefones(id: string) {
    setTeleVisible(teleVisible === id ? null : id);
  }

  const Table = (
    <table className="min-w-full bg-white rounded-xl shadow border border-blue-100 hidden md:table">
      <thead>
        <tr>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Nome</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Nome Social</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Nascimento</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Cadastro</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Documento</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Telefone(s)</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Endereço</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Titular</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Ações</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id} className="hover:bg-blue-50 transition">
            <td className="py-3 px-4 border-b">{cliente.nome}</td>
            <td className="py-3 px-4 border-b">{cliente.nomeSocial}</td>
            <td className="py-3 px-4 border-b">{formatarData(cliente.dataNascimento)}</td>
            <td className="py-3 px-4 border-b">{formatarData(cliente.dataCadastro)}</td>
            <td className="py-3 px-4 border-b">
              {cliente.documentos.length > 0
                ? `${cliente.documentos[0].tipo}: ${cliente.documentos[0].numero}`
                : "-"}
            </td>
            <td className="py-3 px-4 border-b">
              {cliente.telefones.length > 0 ? (
                <div className="relative inline-block">
                  <button
                    className="underline text-blue-700 font-medium"
                    onClick={() => toggleTelefones(cliente.id)}
                    type="button"
                  >
                    ({cliente.telefones[0].ddd}) {cliente.telefones[0].numero}
                    {cliente.telefones.length > 1 && " ▼"}
                  </button>
                  {teleVisible === cliente.id && (
                    <ul className="absolute z-10 left-0 mt-1 bg-white border rounded shadow min-w-max">
                      {cliente.telefones.map((tel, idx) => (
                        <li key={idx}>
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                            onClick={() => {
                              const novosTels = [
                                tel,
                                ...cliente.telefones.filter((_, i) => i !== idx),
                              ];
                              setClientes((prev) =>
                                prev.map((c) =>
                                  c.id === cliente.id ? { ...c, telefones: novosTels } : c
                                )
                              );
                              setTeleVisible(null);
                            }}
                          >
                            ({tel.ddd}) {tel.numero}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                "-"
              )}
            </td>
            <td className="py-3 px-4 border-b">
              {`${cliente.endereco.rua}, ${cliente.endereco.numero} - ${cliente.endereco.bairro}, ${cliente.endereco.cidade}/${cliente.endereco.estado} (${cliente.endereco.cep})`}
            </td>
            <td className="py-3 px-4 border-b">{getNomeTitular(cliente.titularId)}</td>
            <td className="py-3 px-4 border-b">
              <div className="flex flex-col gap-2 md:flex-row md:gap-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-lg shadow transition"
                  onClick={() => onEditar(cliente)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg shadow transition"
                  onClick={() => onExcluir(cliente.id)}
                >
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const Cards = (
    <div className="flex flex-col gap-4 md:hidden">
      {clientes.map((cliente) => (
        <div key={cliente.id} className="bg-white rounded-xl shadow border border-blue-100 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-blue-900 text-lg">{cliente.nome}</span>
            <div className="flex gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg shadow transition"
                onClick={() => onEditar(cliente)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow transition"
                onClick={() => onExcluir(cliente.id)}
              >
                Excluir
              </button>
            </div>
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Nome Social:</span> {cliente.nomeSocial || "-"}
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Nascimento:</span> {formatarData(cliente.dataNascimento)}
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Cadastro:</span> {formatarData(cliente.dataCadastro)}
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Documento:</span>{" "}
            {cliente.documentos.length > 0
              ? `${cliente.documentos[0].tipo}: ${cliente.documentos[0].numero}`
              : "-"}
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Telefone(s):</span>{" "}
            {cliente.telefones.length > 0 ? (
              <span>
                <button
                  className="underline text-blue-700 font-medium"
                  onClick={() => toggleTelefones(cliente.id)}
                  type="button"
                >
                  ({cliente.telefones[0].ddd}) {cliente.telefones[0].numero}
                  {cliente.telefones.length > 1 && " ▼"}
                </button>
                {teleVisible === cliente.id && (
                  <ul className="absolute z-10 left-0 mt-1 bg-white border rounded shadow min-w-max">
                    {cliente.telefones.map((tel, idx) => (
                      <li key={idx}>
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                          onClick={() => {
                            const novosTels = [
                              tel,
                              ...cliente.telefones.filter((_, i) => i !== idx),
                            ];
                            setClientes((prev) =>
                              prev.map((c) =>
                                c.id === cliente.id ? { ...c, telefones: novosTels } : c
                              )
                            );
                            setTeleVisible(null);
                          }}
                        >
                          ({tel.ddd}) {tel.numero}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            ) : (
              "-"
            )}
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Endereço:</span>{" "}
            {`${cliente.endereco.rua}, ${cliente.endereco.numero} - ${cliente.endereco.bairro}, ${cliente.endereco.cidade}/${cliente.endereco.estado} (${cliente.endereco.cep})`}
          </div>
          <div className="text-sm text-blue-900">
            <span className="font-semibold">Titular:</span> {getNomeTitular(cliente.titularId)}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {Table}
      {Cards}
    </>
  );
}