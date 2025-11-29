import type { Hospedagem } from "../types/hospedagemType";
import type { Cliente } from "../types/clienteType";

type Props = {
  hospedagens: Hospedagem[];
  clientes: Cliente[];
  onEditar: (hospedagem: Hospedagem) => void;
  onRemover: (id: string) => void;
};

function formatarData(data: string) {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function getNomeCliente(id: string, clientes: Cliente[]) {
  const cliente = clientes.find(c => c.id === id);
  return cliente ? cliente.nome : "-";
}

export default function HospedagemTable({
  hospedagens,
  clientes,
  onEditar,
  onRemover,
}: Props) {
  const Table = (
    <table className="min-w-full bg-white rounded-xl shadow border border-blue-100 hidden md:table">
      <thead>
        <tr>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Cliente</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Tipo de Acomodação</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Entrada</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Saída</th>
          <th className="py-3 px-4 border-b text-blue-900 font-semibold">Ações</th>
        </tr>
      </thead>
      <tbody>
        {hospedagens.map(h => (
          <tr key={h.id} className="hover:bg-blue-50 transition">
            <td className="py-3 px-4 border-b">{getNomeCliente(h.clienteId, clientes)}</td>
            <td className="py-3 px-4 border-b">{h.tipoAcomodacao}</td>
            <td className="py-3 px-4 border-b">{formatarData(h.dataEntrada)}</td>
            <td className="py-3 px-4 border-b">{formatarData(h.dataSaida)}</td>
            <td className="py-3 px-4 border-b">
              <div className="flex flex-col gap-2 md:flex-row md:gap-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-lg shadow transition"
                  onClick={() => onEditar(h)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg shadow transition"
                  onClick={() => onRemover(h.id)}
                >
                  Remover
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
      {hospedagens.map(h => (
        <div key={h.id} className="bg-white rounded-xl shadow border border-blue-100 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-blue-900 text-lg">{getNomeCliente(h.clienteId, clientes)}</span>
            <div className="flex gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg shadow transition"
                onClick={() => onEditar(h)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow transition"
                onClick={() => onRemover(h.id)}
              >
                Remover
              </button>
            </div>
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Acomodação:</span> {h.tipoAcomodacao}
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Entrada:</span> {formatarData(h.dataEntrada)}
          </div>
          <div className="text-sm text-blue-900 mb-1">
            <span className="font-semibold">Saída:</span> {formatarData(h.dataSaida)}
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