import Processo from "../../abstracoes/processo";
import MenuTipoAtualizar from "../../menus/menuTipoAtualizar";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";
import CadastroEnderecoTitular from "../cadastro/cadastroEnderecoTitular";

export default class TipoAtualizarCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuTipoAtualizar();
    }

    processar(): void {
        let operacao = true;
        while (operacao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero('Qual opção desejada?');

            switch (this.opcao) {
                case 1:
                    let novoNome = this.entrada.receberTexto('Digite o novo nome: ');
                    this.cliente.Nome = novoNome;
                    break;
                case 2:
                    let novoNomeSocial = this.entrada.receberTexto('Digite o novo nome social: ');
                    this.cliente.NomeSocial = novoNomeSocial;
                    break;
                case 3:
                    let novaDataNascimento = this.entrada.receberData('Digite a nova data de nascimento: ');
                    this.cliente.DataNascimento = novaDataNascimento;
                    break;
                case 4:
                    if (this.cliente.Titular) {
                        console.log('Não é possível alterar o endereço de um dependente diretamente.');
                        console.log('Por favor, altere o endereço do cliente titular.');
                    } else {
                        let processoEndereco = new CadastroEnderecoTitular(this.cliente);
                        processoEndereco.processar();

                        console.log('Atualizando endereço dos dependentes...');
                        this.cliente.Dependentes.forEach(dependente => {
                            dependente.Endereco = this.cliente.Endereco.clonar() as Endereco;
                        });
                        console.log('Endereços dos dependentes atualizados com sucesso.');
                    }
                    break;
                case 0:
                    operacao = false;
                    console.log('Atualização concluída.');
                    break;
                default:
                    console.log('Opção não entendida.');
            }
        }
    }
}