import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";

export default class ListagemTitularDeDependente extends Processo {
    processar(): void {
        console.clear();
        console.log('Iniciando a listagem do titular de um dependente.');
        let nomeDependente = this.entrada.receberTexto('Qual o nome do cliente dependente?');
        let dependente = Armazem.InstanciaUnica.Clientes.find(c => c.Nome === nomeDependente);

        if (dependente){
            console.log(`\nTitular do cliente: ${dependente.Nome}`);
            let impressor: Impressor = new ImpressaorCliente(dependente.Titular);
            console.log(impressor.imprimir());
        } else {
            console.log(`Cliente dependente com o nome '${nomeDependente}' não encontrado.`)
        }
    }
}