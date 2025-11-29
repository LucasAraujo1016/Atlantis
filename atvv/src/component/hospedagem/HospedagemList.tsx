import { useState, useEffect } from "react";
import HospedagemForm from "./HospedagemForm";
import type { Cliente } from "../types/clienteType";
import type { Hospedagem as HospedagemType } from "../types/hospedagemType";
import HospedagemTable from "../listagem/listaHospedagem";
import { supabase } from "../../data/supabaseClient";

type Acomodacao = {
  id: string;
  nome: string;
  camaSolteiro: number;
  camaCasal: number;
  suite: number;
  climatizacao: boolean;
  garagem: number;
};

export default function HospedagemList() {
  const [hospedagens, setHospedagens] = useState<HospedagemType[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [hospedagemEditando, setHospedagemEditando] = useState<HospedagemType | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data: acomodacoesData } = await supabase
        .from("acomodacao")
        .select("*");

      setAcomodacoes(acomodacoesData || []);

      const { data: hospedagensData } = await supabase
        .from("hospedagem")
        .select("*");

      const hospedagensTratadas = (hospedagensData || []).map(h => ({
        ...h,
        clienteId: h.cliente_id,
        tipoAcomodacao:
          acomodacoesData?.find(a => a.id === h.tipo_acomodacao)?.nome || "",
        dataEntrada: h.data_entrada,
        dataSaida: h.data_saida,
        id: h.id,
      }));

      setHospedagens(hospedagensTratadas);

      const { data: clientesData } = await supabase
        .from("cliente")
        .select(`
          *,
          documentos:documento(*),
          telefones:telefone(*),
          endereco:endereco(*)
        `);

      setClientes(clientesData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function handleSalvar(dados: Omit<HospedagemType, "id">) {
    const acomodacao = acomodacoes.find(a => a.nome === dados.tipoAcomodacao);
    if (!acomodacao) return;

    if (hospedagemEditando) {
      const { data, error } = await supabase
        .from("hospedagem")
        .update({
          cliente_id: dados.clienteId,
          tipo_acomodacao: acomodacao.id,
          data_entrada: dados.dataEntrada,
          data_saida: dados.dataSaida,
        })
        .eq("id", hospedagemEditando.id)
        .select();
      if (!error && data) {
        setHospedagens(hospedagens.map(h =>
          h.id === hospedagemEditando.id
            ? { ...hospedagemEditando, ...dados }
            : h
        ));
      }
      setHospedagemEditando(null);
    } else {
      const { data, error } = await supabase
        .from("hospedagem")
        .insert({
          cliente_id: dados.clienteId,
          tipo_acomodacao: acomodacao.id,
          data_entrada: dados.dataEntrada,
          data_saida: dados.dataSaida,
        })
        .select();
      if (!error && data && data[0]) {
        setHospedagens([
          ...hospedagens,
          { ...dados, id: data[0].id },
        ]);
      }
    }
    setShowForm(false);
  }

  function handleEditar(hospedagem: HospedagemType) {
    setHospedagemEditando(hospedagem);
    setShowForm(true);
  }

  function handleCancelar() {
    setShowForm(false);
    setHospedagemEditando(null);
  }

  async function handleRemover(id: string) {
    const { error } = await supabase.from("hospedagem").delete().eq("id", id);
    if (!error) {
      setHospedagens(hospedagens.filter(h => h.id !== id));
    }
  }

  if (loading) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-300 flex flex-col items-center py-10 px-2 sm:px-4">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-4 sm:p-8 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow">
          Gerenciamento de Hospedagens
        </h2>
        {showForm ? (
          <HospedagemForm
            onSalvar={handleSalvar}
            onCancelar={handleCancelar}
            clientes={clientes.filter(c => !c.titular_id)}
            hospedagens={hospedagens}
            hospedagem={hospedagemEditando ?? undefined}
          />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
                onClick={() => { setShowForm(true); setHospedagemEditando(null); }}
              >
                Nova Hospedagem
              </button>
            </div>
            {hospedagens.length === 0 ? (
              <p className="text-center text-blue-900 font-semibold">Nenhuma hospedagem cadastrada.</p>
            ) : (
              <div className="rounded-xl shadow">
                <HospedagemTable
                  hospedagens={hospedagens}
                  clientes={clientes}
                  onEditar={handleEditar}
                  onRemover={handleRemover}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}