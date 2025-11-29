import { detalhesAcomodacao, type NomeAcomodacao } from "../../types/acomodacaoType";
import type { Hospedagem } from "../../types/hospedagemType";

type Props = {
  tipoAcomodacao: NomeAcomodacao | "";
  setTipoAcomodacao: (v: NomeAcomodacao) => void;
  hospedagens: Hospedagem[];
};

export default function HospedagemAcomodacaoSelect({ tipoAcomodacao, setTipoAcomodacao, hospedagens }: Props) {
  function vagasOcupadas(tipo: NomeAcomodacao) {
    return hospedagens.filter(h => h.tipoAcomodacao === tipo).length;
  }

  return (
    <div>
      <label className="block mb-1 font-semibold">Tipo de Acomodação</label>
      <select
        value={tipoAcomodacao}
        onChange={e => setTipoAcomodacao(e.target.value as NomeAcomodacao)}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="">Selecione o tipo de acomodação</option>
        {Object.keys(detalhesAcomodacao).map(tipo => (
          <option
            key={tipo}
            value={tipo}
            disabled={vagasOcupadas(tipo as NomeAcomodacao) >= 2}
          >
            {tipo}
            {vagasOcupadas(tipo as NomeAcomodacao) >= 2 ? " (Indisponível)" : ""}
          </option>
        ))}
      </select>
      {tipoAcomodacao && (
        <div className="mt-2 text-sm text-gray-700">
          <strong>Detalhes:</strong>
          <ul>
            <li>Camas de solteiro: {detalhesAcomodacao[tipoAcomodacao].camaSolteiro}</li>
            <li>Camas de casal: {detalhesAcomodacao[tipoAcomodacao].camaCasal}</li>
            <li>Suítes: {detalhesAcomodacao[tipoAcomodacao].suite}</li>
            <li>Climatização: {detalhesAcomodacao[tipoAcomodacao].climatizacao ? "Sim" : "Não"}</li>
            <li>Garagem: {detalhesAcomodacao[tipoAcomodacao].garagem}</li>
          </ul>
        </div>
      )}
    </div>
  );
}