let exemploObj = {
    nome: '',
    cor: '',
    modelo:'',
}

function exemplosConstroiObj() {
    exemploObj.nome = 'Civic';
    exemploObj.cor = 'Azul';
    exemploObj.modelo = 'Honda';


    console.log(exemploObj);
}

function exemplosIteraObj() {

  console.log('Iterando o objeto:');

    for (let itens of Object.entries(exemploObj)) {
        console.log(itens); // [chave, valor]
    }
}

export {exemplosConstroiObj ,exemplosIteraObj}