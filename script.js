const cep = document.getElementById('cep');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const erro = document.getElementById('erro');

async function getAddress(cep) {
  erro.innerHTML = '';

  try {
    let cepRequest = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    let cepConverted = await cepRequest.json();
    
    if (cepConverted.erro) {
      throw Error('CEP não existente!');
    }
    
    endereco.value = cepConverted.logradouro;
    bairro.value = cepConverted.bairro;
    cidade.value = cepConverted.localidade;
    estado.value = cepConverted.uf;
  } catch (error) {
    erro.innerHTML = `
      <p>
        CEP Inválido. Tente novamente!
      </p>
    `;
    console.log(error);
  } finally {
    console.log('Processamento concluído!')
  }
}

cep.addEventListener(
  'focusout',
  () => getAddress(cep.value)
);

// let ceps = [
//   '60353190',
//   '60353170'
// ];

// let cepList = ceps.map(cep => getAddress(cep));
// Promise.all(cepList).then(res => console.log(res));

// getAddress(cep);