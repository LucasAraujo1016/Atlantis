import Menu from "../interfaces/menu";

export default class MenuTipoAtualizar implements Menu{
    mostrar(): void {
        console.clear();
        console.clear()
        console.log(`****************************`)
        console.log('| Qual informação você deseja atualizar?');
        console.log(`----------------------`)
        console.log('| 1 - Nome');
        console.log('| 2 - Nome Social');
        console.log('| 3 - Data de Nascimento');
        console.log('| 4 - Endereço');
        console.log('| 0 - Concluir atualização');
        console.log(`----------------------`)
    }
}