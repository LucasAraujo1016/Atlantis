import type { NomeAcomodacao } from "./acomodacaoType";

export interface Hospedagem {
  id: string;
  clienteId: string; 
  tipoAcomodacao: NomeAcomodacao;
  dataEntrada: string; 
  dataSaida: string;  
}