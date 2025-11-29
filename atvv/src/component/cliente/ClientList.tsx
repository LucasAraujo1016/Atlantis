import { useState, useEffect } from "react";
import ClienteForm from "./ClienteForm";
import type { Cliente } from "../types/clienteType";
import ClienteTable from "../listagem/listaClientes";
import { supabase } from "../../data/supabaseClient";

export default function ClientList() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [telefonesVisiveis, setTelefonesVisiveis] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    fetchClientes();
  }, []);

  async function fetchClientes() {
    const { data: clientesData } = await supabase.from("cliente").select("*");
    if (!clientesData) return setClientes([]);
    const { data: documentos } = await supabase.from("documento").select("*");
    const { data: telefones } = await supabase.from("telefone").select("*");
    const { data: enderecos } = await supabase.from("endereco").select("*");

    const clientesCompletos = clientesData.map((c: any) => ({
      ...c,
      documentos: documentos?.filter((d: any) => d.cliente_id === c.id) || [],
      telefones: telefones?.filter((t: any) => t.cliente_id === c.id) || [],
      endereco: enderecos?.find((e: any) => e.cliente_id === c.id) || {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
      dependentes: clientesData.filter((dep: any) => dep.titular_id === c.id) || [],
      titularId: c.titular_id || undefined,
      nomeSocial: c.nome_social || "",
      dataNascimento: c.data_nascimento,
      dataCadastro: c.data_cadastro,
    }));
    setClientes(clientesCompletos);
  }

  async function handleSalvar(cliente: Cliente) {
    if (clienteEditando) {
      await supabase.from("cliente").update({
        nome: cliente.nome,
        nome_social: cliente.nomeSocial,
        data_nascimento: cliente.dataNascimento,
        data_cadastro: cliente.dataCadastro,
        titular_id: cliente.titularId ?? null,
      }).eq("id", cliente.id);
    } else {
      await supabase.from("cliente").insert({
        id: cliente.id,
        nome: cliente.nome,
        nome_social: cliente.nomeSocial,
        data_nascimento: cliente.dataNascimento,
        data_cadastro: cliente.dataCadastro,
        titular_id: cliente.titularId ?? null,
      });
    }

    if (cliente.documentos && cliente.documentos.length > 0) {
      const doc = cliente.documentos[0];
      const { data: docExistente } = await supabase.from("documento").select("id").eq("cliente_id", cliente.id).maybeSingle();
      if (docExistente) {
        await supabase.from("documento").update({
          tipo: doc.tipo,
          numero: doc.numero,
          data_expedicao: doc.dataExpedicao,
        }).eq("cliente_id", cliente.id);
      } else {
        await supabase.from("documento").insert({
          cliente_id: cliente.id,
          tipo: doc.tipo,
          numero: doc.numero,
          data_expedicao: doc.dataExpedicao,
        });
      }
    }

    await supabase.from("telefone").delete().eq("cliente_id", cliente.id);
    if (cliente.telefones && cliente.telefones.length > 0) {
      await supabase.from("telefone").insert(
        cliente.telefones.map(t => ({
          cliente_id: cliente.id,
          ddd: t.ddd,
          numero: t.numero,
        }))
      );
    }

    await supabase.from("endereco").delete().eq("cliente_id", cliente.id);
    if (cliente.endereco) {
      await supabase.from("endereco").insert({
        cliente_id: cliente.id,
        rua: cliente.endereco.rua,
        numero: cliente.endereco.numero,
        bairro: cliente.endereco.bairro,
        cidade: cliente.endereco.cidade,
        estado: cliente.endereco.estado,
        cep: cliente.endereco.cep,
      });
    }

    if (!cliente.titularId) {
      const { data: dependentes } = await supabase
        .from("cliente")
        .select("id")
        .eq("titular_id", cliente.id);

      if (dependentes && dependentes.length > 0) {
        for (const dep of dependentes) {
          await supabase.from("telefone").delete().eq("cliente_id", dep.id);
          if (cliente.telefones && cliente.telefones.length > 0) {
            await supabase.from("telefone").insert(
              cliente.telefones.map(t => ({
                cliente_id: dep.id,
                ddd: t.ddd,
                numero: t.numero,
              }))
            );
          }
          await supabase.from("endereco").delete().eq("cliente_id", dep.id);
          if (cliente.endereco) {
            await supabase.from("endereco").insert({
              cliente_id: dep.id,
              rua: cliente.endereco.rua,
              numero: cliente.endereco.numero,
              bairro: cliente.endereco.bairro,
              cidade: cliente.endereco.cidade,
              estado: cliente.endereco.estado,
              cep: cliente.endereco.cep,
            });
          }
        }
      }
    }

    await fetchClientes();
    setShowForm(false);
    setClienteEditando(null);
  }

  function handleEditar(cliente: Cliente) {
    setClienteEditando(cliente);
    setShowForm(true);
  }

  async function handleExcluir(id: string) {
    await supabase.from("cliente").delete().eq("titular_id", id);
    await supabase.from("cliente").delete().eq("id", id);
    await fetchClientes();
  }

  function handleCancelar() {
    setShowForm(false);
    setClienteEditando(null);
  }

  function formatarData(data: string) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  function getNomeTitular(titularId: string | undefined) {
    if (!titularId) return "-";
    const titular = clientes.find(c => c.id === titularId);
    return titular ? titular.nome : "-";
  }

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-300 flex flex-col items-center py-10 px-2 sm:px-4">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-4 sm:p-8 w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center drop-shadow">
          Gerenciamento de Clientes
        </h2>
        {!showForm && (
          <input
            type="text"
            placeholder="Buscar cliente pelo nome..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="mb-6 border border-blue-300 px-4 py-2 rounded-lg w-full max-w-md shadow"
          />
        )}
        {showForm ? (
          <ClienteForm
            onSalvar={handleSalvar}
            onCancelar={handleCancelar}
            cliente={clienteEditando ?? undefined}
            clientesExistentes={clientes}
          />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
                onClick={() => { setShowForm(true); setClienteEditando(null); }}
              >
                Novo Cliente
              </button>
            </div>
            {clientesFiltrados.length === 0 ? (
              <p className="text-center text-blue-900 font-semibold">Nenhum cliente cadastrado.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl shadow">
                <ClienteTable
                  clientes={clientesFiltrados}
                  teleVisible={telefonesVisiveis}
                  setTeleVisible={setTelefonesVisiveis}
                  onEditar={handleEditar}
                  onExcluir={handleExcluir}
                  formatarData={formatarData}
                  getNomeTitular={getNomeTitular}
                  setClientes={setClientes}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}