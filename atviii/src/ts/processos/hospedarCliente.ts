import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";

export default class HospedarCliente extends Processo {
    private acomodacoes: Acomodacao[];
    private clientes: Cliente[];

    constructor() {
        super();
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes;
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.log('Iniciando o processo de hospedagem...');

        if (this.clientes.length === 0) {
            console.log('Não há clientes cadastrados para hospedar.');
            return;
        }

        const acomodacoesVagas = this.acomodacoes.filter(a => a.Hospede === undefined);

        if (acomodacoesVagas.length === 0) {
            console.log('Não há acomodações vagas no momento.');
            return;
        }

        console.log('Lista de acomodações vagas:');
        acomodacoesVagas.forEach((acomodacao, index) => {
            console.log(`${index} - ${acomodacao.NomeAcomadacao}`);
        });

        let indiceAcomodacao = this.entrada.receberNumero('Selecione a acomodação desejada:');

        if (indiceAcomodacao < 0 || indiceAcomodacao >= acomodacoesVagas.length) {
            console.log('Opção inválida.');
            return;
        }
        let acomodacaoSelecionada = acomodacoesVagas[indiceAcomodacao];

        console.log('Lista de clientes titulares:');
        const titulares = this.clientes.filter(c => c.Titular === undefined);
        titulares.forEach((cliente, index) => {
            console.log(`${index} - ${cliente.Nome}`);
        });
        let indiceCliente = this.entrada.receberNumero('Selecione o cliente a ser hospedado:');

        if (indiceCliente < 0 || indiceCliente >= titulares.length) {
            console.log('Opção inválida.');
            return;
        }
        let clienteSelecionado = titulares[indiceCliente];

        acomodacaoSelecionada.Hospede = clienteSelecionado;

        console.log(`Cliente ${clienteSelecionado.Nome} hospedado na acomodação ${acomodacaoSelecionada.NomeAcomadacao} com sucesso!`);
    }
}