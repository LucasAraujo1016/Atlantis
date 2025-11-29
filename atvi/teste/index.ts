import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
let cliente = new Cliente()
cliente.nome = `Pedro de Alcântara João Carlos Leopoldo Salvador`
cliente.nomeSocial = `Dom Pedro II`
cliente.dataCadastro = new Date(1840, 6, 23)
cliente.dataNascimento = new Date(1825, 11, 2)
let endereco = new Endereco()
endereco.rua = `R. do Catete`
endereco.bairro = `Copacabana`
endereco.cidade = `Rio de Janeiro`
endereco.estado = `Rio de Janeiro`
endereco.pais = `Brasil`
endereco.codigoPostal = `22220-000`
cliente.endereco = endereco

let telefone = new Telefone()
telefone.ddd = '12'
telefone.numero = '987654321'
cliente.telefones.push(telefone)

let dependente = new Cliente()
dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`
dependente.nomeSocial = `Princesa Isabel`
dependente.dataCadastro = new Date(1921, 10, 14)
dependente.dataNascimento = new Date(1846, 6, 29)
dependente.endereco = (cliente.endereco.clonar() as Endereco)
dependente.telefones = cliente.telefones.map(telefone => telefone.clonar() as Telefone);
dependente.titular = cliente
cliente.dependentes.push(dependente)

console.log(cliente);

console.log("Dependente:");
console.log("Nome:", dependente.nome);
console.log("Titular:", dependente.titular.nome);
console.log("Endereço:", dependente.endereco);
console.log("Telefones:", dependente.telefones);
