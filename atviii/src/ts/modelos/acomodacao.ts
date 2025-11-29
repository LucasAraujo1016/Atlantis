import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao"
import Cliente from "./cliente"

export default class Acomodacao {
    private nomeAcomadacao: NomeAcomadacao
    private camaSolteiro: Number
    private camaCasal: Number
    private suite: Number
    private climatizacao: Boolean
    private garagem: Number
    private hospede: Cliente | undefined

    constructor(nomeAcomadacao: NomeAcomadacao, camaSolteiro: Number, camaCasal: Number,
        suite: Number, climatizacao: Boolean, garagem: Number) {
        this.nomeAcomadacao = nomeAcomadacao
        this.camaSolteiro = camaSolteiro
        this.camaCasal = camaCasal
        this.suite = suite
        this.climatizacao = climatizacao
        this.garagem = garagem
    }

    public get NomeAcomadacao() { return this.nomeAcomadacao }
    public get CamaSolteiro() { return this.camaSolteiro }
    public get CamaCasal() { return this.camaCasal }
    public get Suite() { return this.suite }
    public get Climatizacao() { return this.climatizacao }
    public get Garagem() { return this.garagem }
    public get Hospede() {return this.hospede}

    public set Hospede(hospede: Cliente | undefined) {this.hospede = hospede}
}