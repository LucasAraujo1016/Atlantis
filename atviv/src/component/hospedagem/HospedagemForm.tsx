import { useState, useEffect } from "react";
import type { Cliente } from "../types/clienteType";
import type { Hospedagem } from "../types/hospedagemType";
import { type NomeAcomodacao } from "../types/acomodacaoType";
import HospedagemAcomodacaoSelect from "./component/hospedagemAcomodacao";
import HospedagemClienteSelect from "./component/hospedagemCliente";
import HospedagemDatasFields from "./component/hospedagemDatas";

type HospedagemFormProps = {
  onSalvar: (dados: {
    tipoAcomodacao: NomeAcomodacao;
    clienteId: string;
    dataEntrada: string;
    dataSaida: string;
  }) => void;
  onCancelar: () => void;
  clientes: Cliente[];
  hospedagens: Hospedagem[];
  hospedagem?: Hospedagem;
};

export default function HospedagemForm({
  onSalvar,
  onCancelar,
  clientes,
  hospedagens,
  hospedagem,
}: HospedagemFormProps) {
  const [tipoAcomodacao, setTipoAcomodacao] = useState<NomeAcomodacao | "">(hospedagem?.tipoAcomodacao ?? "");
  const [clienteBusca, setClienteBusca] = useState(() => {
    if (hospedagem) {
      const cli = clientes.find(c => c.id === hospedagem.clienteId);
      return cli ? cli.nome : "";
    }
    return "";
  });
  const [clienteId, setClienteId] = useState(hospedagem?.clienteId ?? "");
  const [dataEntrada, setDataEntrada] = useState(hospedagem?.dataEntrada ?? "");
  const [dataSaida, setDataSaida] = useState(hospedagem?.dataSaida ?? "");

  useEffect(() => {
    setTipoAcomodacao(hospedagem?.tipoAcomodacao ?? "");
    setClienteBusca(
      hospedagem
        ? clientes.find(c => c.id === hospedagem.clienteId)?.nome ?? ""
        : ""
    );
    setClienteId(hospedagem?.clienteId ?? "");
    setDataEntrada(hospedagem?.dataEntrada ?? "");
    setDataSaida(hospedagem?.dataSaida ?? "");
  }, [hospedagem, clientes]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tipoAcomodacao || !clienteId || !dataEntrada || !dataSaida) return;
    onSalvar({ tipoAcomodacao, clienteId, dataEntrada, dataSaida });
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white bg-opacity-95 rounded-3xl shadow-2xl p-4 sm:p-8 space-y-6 border border-blue-100"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center drop-shadow">
          {hospedagem ? "Editar Hospedagem" : "Nova Hospedagem"}
        </h2>
        <HospedagemAcomodacaoSelect
          tipoAcomodacao={tipoAcomodacao}
          setTipoAcomodacao={setTipoAcomodacao}
          hospedagens={hospedagens}
        />
        <HospedagemClienteSelect
          clientes={clientes}
          clienteBusca={clienteBusca}
          setClienteBusca={setClienteBusca}
          clienteId={clienteId}
          setClienteId={setClienteId}
        />
        <HospedagemDatasFields
          dataEntrada={dataEntrada}
          setDataEntrada={setDataEntrada}
          dataSaida={dataSaida}
          setDataSaida={setDataSaida}
        />
        <div className="flex gap-4 justify-center pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}