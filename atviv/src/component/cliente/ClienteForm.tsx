import { useState, useEffect } from "react";
import type { Endereco } from "../types/enderecoType";
import type { Telefones } from "../types/telefoneType";
import type { Cliente } from "../types/clienteType";
import type { Documento } from "../types/documentoType";
import ClienteDocumentoFields from "./component/documento";
import ClienteTelefonesFields from "./component/telefones";
import ClienteEnderecoFields from "./component/endereco";
import ClienteTitularSelect from "./component/clienteTitular";

type ClienteFormProps = {
  onSalvar: (cliente: Cliente) => void;
  onCancelar: () => void;
  cliente?: Cliente;
  clientesExistentes?: Cliente[];
};

export default function ClienteForm({
  onSalvar,
  onCancelar,
  cliente,
  clientesExistentes = [],
}: ClienteFormProps) {
  const [nome, setNome] = useState(cliente?.nome ?? "");
  const [nomeSocial, setNomeSocial] = useState(cliente?.nomeSocial ?? "");
  const [dataNascimento, setDataNascimento] = useState(cliente?.dataNascimento ?? "");
  const [telefones, setTelefones] = useState<Telefones[]>(cliente?.telefones ?? []);
  const [novoDDD, setNovoDDD] = useState("");
  const [novoNumero, setNovoNumero] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>(cliente?.documentos?.length ? cliente.documentos : [{
    tipo: "CPF",
    numero: "",
    dataExpedicao: new Date(),
  }]);
  const [tipoDocumento, setTipoDocumento] = useState(documentos[0]?.tipo ?? "CPF");
  const [numeroDocumento, setNumeroDocumento] = useState(documentos[0]?.numero ?? "");
  const [dataExpedicao, setDataExpedicao] = useState(
    documentos[0]?.dataExpedicao
      ? new Date(documentos[0].dataExpedicao).toISOString().split("T")[0]
      : ""
  );
  const [endereco, setEndereco] = useState<Endereco>(
    cliente?.endereco ?? {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    }
  );
  const [isDependente, setIsDependente] = useState(!!cliente?.titularId);
  const [titularId, setTitularId] = useState(cliente?.titularId ?? "");
  const [buscaTitular, setBuscaTitular] = useState("");

  useEffect(() => {
    setNome(cliente?.nome ?? "");
    setNomeSocial(cliente?.nomeSocial ?? "");
    setDataNascimento(cliente?.dataNascimento ?? "");
    setTelefones(cliente?.telefones ?? []);
    setDocumentos(cliente?.documentos?.length ? cliente.documentos : [{
      tipo: "CPF",
      numero: "",
      dataExpedicao: new Date(),
    }]);
    setTipoDocumento(cliente?.documentos?.[0]?.tipo ?? "CPF");
    setNumeroDocumento(cliente?.documentos?.[0]?.numero ?? "");
    setDataExpedicao(
      cliente?.documentos?.[0]?.dataExpedicao
        ? new Date(cliente.documentos[0].dataExpedicao).toISOString().split("T")[0]
        : ""
    );
    setEndereco(
      cliente?.endereco ?? {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      }
    );
    setIsDependente(!!cliente?.titularId);
    setTitularId(cliente?.titularId ?? "");
    setBuscaTitular("");
  }, [cliente]);

  function handleEnderecoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEndereco({ ...endereco, [e.target.name]: e.target.value });
  }

  function adicionarTelefone() {
    if (novoDDD && novoNumero) {
      setTelefones([...telefones, { ddd: novoDDD, numero: novoNumero }]);
      setNovoDDD("");
      setNovoNumero("");
    }
  }

  function removerTelefone(index: number) {
    setTelefones(telefones.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let telefonesFinal = telefones;
    let enderecoFinal = endereco;

    if (isDependente && titularId) {
      const titular = clientesExistentes.find(c => c.id === titularId);
      if (titular) {
        telefonesFinal = titular.telefones;
        enderecoFinal = titular.endereco;
      }
    }

    const documento: Documento = {
      tipo: tipoDocumento,
      numero: numeroDocumento,
      dataExpedicao: dataExpedicao ? new Date(dataExpedicao) : new Date(),
    };
    const novoCliente: Cliente = {
      id: cliente?.id ?? crypto.randomUUID(),
      nome,
      nomeSocial,
      dataNascimento,
      dataCadastro: cliente?.dataCadastro ?? new Date().toISOString().split("T")[0],
      telefones: telefonesFinal,
      endereco: enderecoFinal,
      documentos: [documento],
      dependentes: [],
      titularId: isDependente ? titularId : undefined,
    };
    onSalvar(novoCliente);
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white bg-opacity-95 rounded-3xl shadow-2xl p-4 sm:p-8 space-y-6 border border-blue-100"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center drop-shadow">
          {cliente ? "Editar Cliente" : "Novo Cliente"}
        </h2>
        <div>
          <label className="flex items-center gap-2 font-semibold text-blue-800">
            <input
              type="checkbox"
              checked={isDependente}
              onChange={e => setIsDependente(e.target.checked)}
              className="accent-blue-600"
            />
            Dependente
          </label>
        </div>
        {isDependente && (
          <ClienteTitularSelect
            clientesExistentes={clientesExistentes}
            buscaTitular={buscaTitular}
            setBuscaTitular={setBuscaTitular}
            titularId={titularId}
            setTitularId={setTitularId}
          />
        )}
        <div>
          <label className="block mb-1 font-semibold text-blue-800">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full border border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-blue-800">Nome Social</label>
          <input
            type="text"
            value={nomeSocial}
            onChange={e => setNomeSocial(e.target.value)}
            className="w-full border border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-blue-800">Data de Nascimento</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={e => setDataNascimento(e.target.value)}
            className="w-full border border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <ClienteDocumentoFields
          tipoDocumento={tipoDocumento}
          setTipoDocumento={setTipoDocumento}
          numeroDocumento={numeroDocumento}
          setNumeroDocumento={setNumeroDocumento}
          dataExpedicao={dataExpedicao}
          setDataExpedicao={setDataExpedicao}
        />

        {!isDependente && (
          <ClienteTelefonesFields
            telefones={telefones}
            novoDDD={novoDDD}
            setNovoDDD={setNovoDDD}
            novoNumero={novoNumero}
            setNovoNumero={setNovoNumero}
            adicionarTelefone={adicionarTelefone}
            removerTelefone={removerTelefone}
          />
        )}

        {!isDependente && (
          <ClienteEnderecoFields
            endereco={endereco}
            handleEnderecoChange={handleEnderecoChange}
          />
        )}

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