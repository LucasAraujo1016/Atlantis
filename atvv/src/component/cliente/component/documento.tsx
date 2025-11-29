type Props = {
  tipoDocumento: string;
  setTipoDocumento: (v: string) => void;
  numeroDocumento: string;
  setNumeroDocumento: (v: string) => void;
  dataExpedicao: string;
  setDataExpedicao: (v: string) => void;
};

export default function ClienteDocumentoFields({
  tipoDocumento,
  setTipoDocumento,
  numeroDocumento,
  setNumeroDocumento,
  dataExpedicao,
  setDataExpedicao,
}: Props) {
  return (
    <>
      <div>
        <label className="block mb-1 font-semibold">Tipo de Documento</label>
        <select
          value={tipoDocumento}
          onChange={e => setTipoDocumento(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="CPF">CPF</option>
          <option value="RG">RG</option>
          <option value="Passaporte">Passaporte</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-semibold">Número do Documento</label>
        <input
          type="text"
          value={numeroDocumento}
          onChange={e => setNumeroDocumento(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Data de Expedição</label>
        <input
          type="date"
          value={dataExpedicao}
          onChange={e => setDataExpedicao(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </>
  );
}