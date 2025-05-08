const radioServicos = [...document.getElementsByName('rdServico')];
const containerSubQuestions = [...document.querySelectorAll('.containerSubQuestions')];

const fluxo = () =>{
    radioServicos.map((input,index)=>{
        input.addEventListener("click",()=>{
            containerSubQuestions.map((container)=>{
                container.style.display = 'none';
            });
            if(index == 0 || index == 1){
                containerSubQuestions[0].style.display = 'flex';
            }else if(index == 2){
                containerSubQuestions[1].style.display = 'flex';
            }
            
        });
    });
}

export default fluxo;