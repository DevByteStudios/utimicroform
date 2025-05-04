
const indicators = [...document.getElementsByClassName('indicator')]

const sections = [...document.querySelectorAll('section')];
const buttonNext = document.getElementById('buttonNext');
const buttonBack = document.getElementById('buttonBack');
const indicatorTitle = document.getElementById("indicatorTitle");
let actualSection = 0;

// Mostrar o indicador atual
const actualIndicator = () =>{
    indicators.map((indicator,index)=>{
        if(index == actualSection){
            indicator.classList.add('active');
        }else{
            indicator.classList.remove('active');
        }
    });
}

// exibir apenas section atual
const exibirSections = () =>{
    sections.map((section,index)=>{
        section.style.display = 'none';
        if(index == actualSection){
            section.style.display = "flex";
        }
    });
    switch(actualSection){
        case 0:
            indicatorTitle.innerText = 'Informações pessoais';
            break;
        case 1:
                indicatorTitle.innerText = 'Informações do Aparelho';
                break;
        case 2:
            indicatorTitle.innerText = 'Infomações finais';
            break;
        
    }
    actualIndicator();
} 

const numTel = document.getElementById("numTel");
numTel.addEventListener("keyup",(e)=>{
    let valor = numTel.value.replace(/\D/g, '').slice(0, 11); 
      
    // while (valor.length < 11) {
    //   valor += '_';
    // }

    // Aplica a máscara: (XX) XXXXX-XXXX
    let formatado = `(${valor.substring(0,2)}) ${valor.substring(2,7)}-${valor.substring(7,11)}`;
    numTel.value = formatado;
    let valorNormal = valor.replace(/\D/g, '').slice(0, 11); // Só os números
    console.log(valorNormal)
})

buttonNext.addEventListener("click",()=>{
    if(actualSection < 2){
        actualSection += 1;
        if(actualSection == 2){
            buttonNext.innerText = "Finalizar";
        }else{
            buttonNext.innerText = "Próximo";
        }
    }
    exibirSections();
    if(actualSection > 0){
        buttonBack.style.display = "flex";
    }
});

buttonBack.addEventListener("click",()=>{
    actualSection -= 1;
    exibirSections();
    if(actualSection == 2){
        buttonNext.innerText = "Finalizar";
    }else{
        buttonNext.innerText = "Próximo";
    }
    if(actualSection > 0){
        buttonBack.style.display = "flex";
    }else{
        buttonBack.style.display = "none";
    }
});

window.addEventListener("load",()=>{
    exibirSections();
})

