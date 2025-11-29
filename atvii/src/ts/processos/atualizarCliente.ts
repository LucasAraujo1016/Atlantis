import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import TipoAtualizarCliente from "./tipos/tipoAtualizarCliente";

export default class AtualizarCliente extends Processo {
    processar(): void {
        console.log('Iniciando a atualização de um cliente.');
        let nome = this.entrada.receberTexto('Qual o nome do cliente a ser atualizado?');
        let cliente = Armazem.InstanciaUnica.Clientes.find(c => c.Nome === nome);

        if (cliente) {
            this.processo = new TipoAtualizarCliente(cliente);
            this.processo.processar();
        } else {
            console.log(`Cliente com o nome '${nome}' não encontrado.`);
        }
    }
}