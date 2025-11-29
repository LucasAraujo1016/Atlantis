import type { Telefones } from "../../types/telefoneType";

type Props = {
  telefones: Telefones[];
  novoDDD: string;
  setNovoDDD: (v: string) => void;
  novoNumero: string;
  setNovoNumero: (v: string) => void;
  adicionarTelefone: () => void;
  removerTelefone: (idx: number) => void;
};

export default function ClienteTelefonesFields({
  telefones,
  novoDDD,
  setNovoDDD,
  novoNumero,
  setNovoNumero,
  adicionarTelefone,
  removerTelefone,
}: Props) {
  return (
    <div>
      <label className="block mb-1 font-semibold">Telefones</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="DDD"
          value={novoDDD}
          onChange={e => setNovoDDD(e.target.value)}
          className="border px-2 py-1 rounded w-16"
          maxLength={3}
        />
        <input
          type="text"
          placeholder="Número"
          value={novoNumero}
          onChange={e => setNovoNumero(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
          maxLength={9}
        />
        <button type="button" onClick={adicionarTelefone} className="bg-green-500 text-white px-2 py-1 rounded">
          Adicionar
        </button>
      </div>
      <ul>
        {telefones.map((tel, idx) => (
          <li key={idx} className="flex items-center gap-2">
            ({tel.ddd}) {tel.numero}
            <button type="button" onClick={() => removerTelefone(idx)} className="text-red-500 text-xs">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}