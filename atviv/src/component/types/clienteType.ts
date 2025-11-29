import type { Documento } from './documentoType';
import type { Endereco } from './enderecoType';
import type { Telefones } from './telefoneType';

export interface Cliente {
  id: string;
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  dataCadastro: string;
  telefones: Telefones[];
  endereco: Endereco;
  documentos: Documento[];
  dependentes: string[];
  titularId?: string;
}