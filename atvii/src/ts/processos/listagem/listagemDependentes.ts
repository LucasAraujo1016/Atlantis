import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";


export default class ListagemDependentes extends Processo{
    processar(): void {
        console.log('Iniciando a listagem de dependentes.');
        let nomeTitular = this.entrada.receberTexto('Qual o nome do cliente titular?');
        let titular = Armazem.InstanciaUnica.Clientes.find(c => c.Nome === nomeTitular);

        if (titular){
            if (titular.Dependentes.length > 0){
                console.log(`\nDependentes do titular: ${titular.Nome}`);
                titular.Dependentes.forEach(dependente => {
                    let impressor: Impressor = new ImpressaorCliente(dependente);
                    console.log(impressor.imprimir());
                });
            } else {
                console.log(`O cliente '${titular.Nome}' não possui dependentes.`);
            }
        } else {
            console.log(`Cliente titular com o nome '${nomeTitular}' não encontrado.`)
        }
    }
}
