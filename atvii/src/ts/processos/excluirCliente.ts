import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirCliente extends Processo {
    processar(): void {
        console.log('Iniciando a exclusão de cliente.');
        let nome = this.entrada.receberTexto('Qual o nome do cliente a ser excluido?');
        let indexCliente = Armazem.InstanciaUnica.Clientes.findIndex(c => c.Nome === nome);
        
        if (indexCliente !== -1){
            let cliente = Armazem.InstanciaUnica.Clientes[indexCliente];

            if (cliente.Titular === undefined && cliente.Dependentes.length > 0){
                console.log('Este cliente é um titular. A exclusão irá remover seus dependentes.');
                cliente.Dependentes.forEach(dependente => {
                    let indexDependente = Armazem.InstanciaUnica.Clientes.findIndex(c => c.Nome === dependente.Nome);
                    if (indexDependente !== -1){
                        Armazem.InstanciaUnica.Clientes.splice(indexDependente, 1);
                    }
                });
            }
            else if (cliente.Titular !== undefined){
                let titular = cliente.Titular;
                let indexDependenteNoTitular = titular.Dependentes.findIndex(d => d.Nome === cliente.Nome);
                if (indexDependenteNoTitular !== -1){
                    titular.Dependentes.splice(indexDependenteNoTitular, 1);
                }
            }
            Armazem.InstanciaUnica.Clientes.splice(indexCliente, 1);
            console.log('Cliente excluído com sucesso!')
        } else {
            console.log(`Cliente com o nome '${nome}' não encontrado.`)
        }
    }
}