import React from "react";
import type { Endereco } from "../../types/enderecoType";

type Props = {
  endereco: Endereco;
  handleEnderecoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ClienteEnderecoFields({ endereco, handleEnderecoChange }: Props) {
  return (
    <fieldset className="border p-3 rounded">
      <legend className="font-semibold">Endereço</legend>
      <div className="mb-2">
        <label className="block mb-1">Rua</label>
        <input
          type="text"
          name="rua"
          value={endereco.rua}
          onChange={handleEnderecoChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Número</label>
        <input
          type="text"
          name="numero"
          value={endereco.numero}
          onChange={handleEnderecoChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Bairro</label>
        <input
          type="text"
          name="bairro"
          value={endereco.bairro}
          onChange={handleEnderecoChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Cidade</label>
        <input
          type="text"
          name="cidade"
          value={endereco.cidade}
          onChange={handleEnderecoChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Estado</label>
        <input
          type="text"
          name="estado"
          value={endereco.estado}
          onChange={handleEnderecoChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">CEP</label>
        <input
          type="text"
          name="cep"
          value={endereco.cep}
          onChange={handleEnderecoChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
    </fieldset>
  );
}