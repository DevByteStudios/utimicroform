// SEVICOS
const radioServicos = [...document.getElementsByName("rdServico")];
const containerAction = [
  ...document.querySelectorAll(".containerAction"),
];
const rdAcao = [...document.getElementsByName('rdAcao')];
const cbProblema = [...document.getElementsByName('cbProblema')];
const containerProblem = [...document.querySelectorAll('.containerProblem')];

let dadosSelecionados={
    servico: null,
    acao:null,
    problemas:null,
}
// console.log(,radioServicos,rdAcao)
const fluxo = () => {
  // SELECIONANDO O SERVIÇO A SER PEDIDO
  radioServicos.map((input, index) => {
    // ESCONDENDO OS CAMPOS
    input.addEventListener("click", () => {
        limparContainerAction();
        limparContainerProblema();
        limparRadiosAction();
    // EXIBINDO AS SUBPERGUNTAS CONFORME O SERVIÇO ESCOLHIDO  
    dadosSelecionados.servico = input.value
      if (index == 0){ //COMPUTADOR
        containerAction[0].style.display = "flex";
      } else{//OUTROS
        containerAction[index].style.display = "flex";
      }
      rdAcao.map((inputAcao,indexAcao)=>{
        inputAcao.addEventListener('click', () => {
            limparContainerProblema();
            limparCheckbox();
            // Vericações especificas
            dadosSelecionados.acao = inputAcao.value
            if(indexAcao == 4){
                containerProblem[3].style.display = "flex";
                return;
            }
            if(indexAcao == 6){
                containerProblem[4].style.display = "flex";
                return;
            }
            if(indexAcao == 7){
                containerProblem[5].style.display = "flex";
                return;
            }
            if(indexAcao != 3 && indexAcao != 5 && indexAcao != 4 && indexAcao != 6 && indexAcao != 4 ){
                containerProblem[indexAcao].style.display = "flex";
            }
          });
        });
        
    });
    
  });
};


const limparContainerAction = () =>{
    containerAction.map((container) => {
        container.style.display = "none";
      });
}

const limparContainerProblema =()=>{
    containerProblem.map((containerProblem) => {
        containerProblem.style.display = "none";
      });
}

const limparRadiosAction = ()=>{
    rdAcao.map((acao)=>{
        acao.checked = false;
      });
}

const limparCheckbox = ()=>{
    cbProblema.map((problema)=>{
        problema.checked = false;
      });
}


const getProblemas = () => {
    const selecionados = cbProblema.filter(cb => cb.checked).map(cb => cb.value);
    dadosSelecionados.problemas = selecionados;
    
};
export {fluxo,getProblemas,dadosSelecionados};
