type Props = {
  dataEntrada: string;
  setDataEntrada: (v: string) => void;
  dataSaida: string;
  setDataSaida: (v: string) => void;
};

export default function HospedagemDatasFields({
  dataEntrada,
  setDataEntrada,
  dataSaida,
  setDataSaida,
}: Props) {
  return (
    <>
      <div>
        <label className="block mb-1 font-semibold">Data de Entrada</label>
        <input
          type="date"
          value={dataEntrada}
          onChange={e => setDataEntrada(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Data de Saída</label>
        <input
          type="date"
          value={dataSaida}
          onChange={e => setDataSaida(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
    </>
  );
}