import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";
import Telefone from "../../modelos/telefone";
import CadastrarDocumentosCliente from "./documento/cadastrarDocumentosCliente";


export default class CadastroClienteDependente extends Processo{
    processar(): void {
        console.log('Iniciando o cadastro de dependente')
        let nomeTitular = this.entrada.receberTexto('Qual o nome do cliente titular?');
        let titular = Armazem.InstanciaUnica.Clientes.find(c => c.Nome === nomeTitular);

        if (titular){
            console.log('Iniciando cadastro dos dados do dependente')
            let nome = this.entrada.receberTexto('Qual o nome do novo cliente?');
            let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?');
            let dataNascimento = this.entrada.receberData('Qual a data de nascimento?');
            let dependente = new Cliente(nome, nomeSocial, dataNascimento);

            dependente.Titular = titular;
            titular.Dependentes.push(dependente);
            dependente.Endereco = titular.Endereco.clonar() as Endereco;
            if (titular.Telefones.length > 0) {
                dependente.Telefones.push(titular.Telefones[0].clonar() as Telefone);
            }

            this.processo = new CadastrarDocumentosCliente(dependente);
            this.processo.processar();

            Armazem.InstanciaUnica.Clientes.push(dependente);
            console.log('Finalizando o cadastro do cliente dependente.')
        } else {
            console.log(`Titular com o nome '${nomeTitular}' não encontrado.`)
        }
    }
}