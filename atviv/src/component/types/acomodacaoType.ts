export type NomeAcomodacao =
  | "Solteiro Simples"
  | "Solteiro Mais"
  | "Casal Simples"
  | "Familia Simples"
  | "Familia Mais"
  | "Familia Super";

export interface Acomodacao {
  id: string;
  nomeAcomodacao: NomeAcomodacao;
  camaSolteiro: number;
  camaCasal: number;
  suite: number;
  climatizacao: boolean;
  garagem: number;
  status: "livre" | "ocupada";
}

export const detalhesAcomodacao: Record<NomeAcomodacao, Omit<Acomodacao, "id" | "nomeAcomodacao" | "status">> = {
  "Casal Simples":       { camaSolteiro: 0, camaCasal: 1, suite: 1, climatizacao: true, garagem: 1 },
  "Familia Simples":     { camaSolteiro: 2, camaCasal: 1, suite: 1, climatizacao: true, garagem: 1 },
  "Familia Mais":        { camaSolteiro: 5, camaCasal: 1, suite: 2, climatizacao: true, garagem: 2 },
  "Familia Super":       { camaSolteiro: 6, camaCasal: 2, suite: 3, climatizacao: true, garagem: 2 },
  "Solteiro Simples":    { camaSolteiro: 1, camaCasal: 0, suite: 1, climatizacao: true, garagem: 0 },
  "Solteiro Mais":       { camaSolteiro: 0, camaCasal: 1, suite: 1, climatizacao: true, garagem: 1 }
};