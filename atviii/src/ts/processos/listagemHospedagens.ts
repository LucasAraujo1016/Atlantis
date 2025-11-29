import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Acomodacao from "../modelos/acomodacao";

export default class ListagemHospedagens extends Processo {

    private acomodacoes: Acomodacao[]

    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }

    processar(): void {
        console.log('Inicinando a listagem de hospedagens.');

        const acomodacoesOcupadas = this.acomodacoes.filter(a => a.Hospede !== undefined);
        if (acomodacoesOcupadas.length === 0) {
            console.log('Nenhuma acomodação está ocupada no momento.');
            return;
        }

        console.log('Lista de acomodações ocupadas:');
        acomodacoesOcupadas.forEach(acomodacao => {
            console.log(`- Acomodação: ${acomodacao.NomeAcomadacao}, Hóspede: ${acomodacao.Hospede!.Nome}`);
        })
    }
}