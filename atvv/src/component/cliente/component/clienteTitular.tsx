import type { Cliente } from "../../types/clienteType";
import type { Documento } from "../../types/documentoType";


type Props = {
  clientesExistentes: Cliente[];
  buscaTitular: string;
  setBuscaTitular: (v: string) => void;
  titularId: string;
  setTitularId: (v: string) => void;
};

export default function ClienteTitularSelect({
  clientesExistentes,
  buscaTitular,
  setBuscaTitular,
  setTitularId,
}: Props) {
  return (
    <div>
      <label className="block mb-1 font-semibold">Titular</label>
      <input
        type="text"
        placeholder="Digite para buscar o titular..."
        list="titulares"
        value={buscaTitular}
        onChange={e => {
          setBuscaTitular(e.target.value);
          if (e.target.value === "") {
            setTitularId("");
            return;
          }
          const selecionado = clientesExistentes.find(
            c =>
              !c.titularId &&
              c.nome.toLowerCase() === e.target.value.toLowerCase()
          );
          setTitularId(selecionado ? selecionado.id : "");
        }}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <datalist id="titulares">
        {clientesExistentes
          .filter(
            c =>
              !c.titularId &&
              c.nome.toLowerCase().startsWith(buscaTitular.toLowerCase())
          )
          .map(c => (
            <option key={c.id} value={c.nome}>
              {c.nome} ({(c.documentos?.[0] as Documento)?.numero})
            </option>
          ))}
      </datalist>
    </div>
  );
}