// Pegando os componentes
const indicators = [...document.getElementsByClassName("indicator")];
const sections = [...document.querySelectorAll("section")];
const buttonNext = document.getElementById("buttonNext");
const buttonBack = document.getElementById("buttonBack");
const indicatorTitle = document.getElementById("indicatorTitle");
let actualSection = 0;

let formDadosPessoais = {
  nome: null,
  telefone: null,
  rua: null,
  numero: null,
  complemento: null,
  bairro: null,
  cidade: null,
};

// Mostrar o indicador atual
const actualIndicator = () => {
  indicators.map((indicator, index) => {
    if (index == actualSection) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
};

// exibir apenas section atual
const exibirSections = () => {
  sections.map((section, index) => {
    section.style.display = "none";
    if (index == actualSection) {
      section.style.display = "flex";
    }
  });
  switch (actualSection) {
    case 0:
      indicatorTitle.innerText = "Informações pessoais";
      break;
    case 1:
      indicatorTitle.innerText = "Informações dos Serviços";
      break;
    case 2:
      indicatorTitle.innerText = "Infomações finais";
      break;
  }
  actualIndicator();
};

buttonNext.addEventListener("click", () => {
  if (actualSection == 0) {
    formDadosPessoais.nome = document.getElementById("txtNome").value;
    if (formDadosPessoais.nome == "") {
      popupMsg("error", "Digite seu nome completo!", "Aviso");
      return;
    }
    formDadosPessoais.telefone = document.getElementById("numTel").value;
    const numeroLimpo = formDadosPessoais.telefone.replace(/\D/g, "");
    if (numeroLimpo.length < 10) {
      popupMsg(
        "error",
        "Telefone incompleto! Digite o DDD e o número completo.",
        "Aviso"
      );
      return;
    }
    if (numeroLimpo.length === 10 && numeroLimpo.charAt(2) === "9") {
      popupMsg(
        "error",
        "Número de celular incompleto! Verifique se digitou o 9 e todos os outros dígitos.",
        "Aviso"
      );
      return;
    }
    formDadosPessoais.rua = document.getElementById("txtEndereco").value;
    if (formDadosPessoais.rua == "") {
      popupMsg("error", "Digite seu endereço!", "Aviso");
      return;
    }
    formDadosPessoais.numero = document.getElementById("numNumero").value;
    if (formDadosPessoais.numero == "") {
      popupMsg("error", "Digite o número de sua casa!", "Aviso");
      return;
    }
    formDadosPessoais.bairro = document.getElementById("txtBairro").value;
    if (formDadosPessoais.bairro == "") {
      popupMsg("error", "Digite seu bairro!", "Aviso");
      return;
    }
    formDadosPessoais.cidade = document.getElementById("txtCidade").value;
    if (formDadosPessoais.cidade == "") {
      popupMsg("error", "Digite sua cidade!", "Aviso");
      return;
    }
    formDadosPessoais.complemento = document.getElementById("txtBairro").value;
  }
  actualSection += 1;
  console.log(actualSection);
  if (actualSection <= 2) {
    exibirSections();
  }
  if (actualSection == 2) {
    getProblemas();
    loadMsg();
  }
  if (actualSection == 1) {
    buttonNext.innerText = "Finalizar";
  }
  if (actualSection == 3) {
    if (dadosSelecionados.servico == null) {
      popupMsg("error", "Selecione um serviço!", "Erro ao continuar!");
      actualSection -= 1;
      exibirSections();
      return;
    }
    return;
  }
  if (actualSection > 0) {
    buttonBack.style.display = "flex";
  }
});

buttonBack.addEventListener("click", () => {
  actualSection -= 1;
  exibirSections();
  if (actualSection == 2) {
    buttonNext.innerText = "Finalizar";
  } else {
    buttonNext.innerText = "Próximo";
  }
  if (actualSection > 0) {
    buttonBack.style.display = "flex";
  } else {
    buttonBack.style.display = "none";
  }
});

window.addEventListener("load", () => {
  exibirSections();
});

// Configuração para o telefone
const numTel = document.getElementById("numTel");
numTel.addEventListener("keypress", (e) => {
  formatTel();
});

const formatTel = () => {
  let valor = numTel.value.replace(/\D/g, "").slice(0, 11);

  // Aplica a máscara: (XX) XXXXX-XXXX
  let formatado = `(${valor.substring(0, 2)})${valor.substring(
    2,
    7
  )}-${valor.substring(7, 11)}`;
  numTel.value = formatado;
};

const popupMsg = (icon, txtMsg, txtTitle) => {
  Swal.fire({
    title: txtTitle,
    text: txtMsg,
    icon: icon,
  });
};

// Preparar a mensagem para o whatszapp
const loadMsg = () => {
  let url = new String(
    "https://api.whatsapp.com/send?phone=5511949335503&text="
  );

  let msgInfoCliente = "*Informações do Cliente:* %0A";

  msgInfoCliente = msgInfoCliente.concat(
    "*Nome:* ",
    formDadosPessoais.nome,
    "%0A"
  );
  msgInfoCliente = msgInfoCliente.concat(
    "*Telefone:* ",
    formDadosPessoais.telefone,
    "%0A"
  );
  msgInfoCliente = msgInfoCliente.concat(
    "*Rua/Logradouro:* ",
    formDadosPessoais.rua,
    "%0A"
  );
  msgInfoCliente = msgInfoCliente.concat(
    "*Bairro:* ",
    formDadosPessoais.bairro,
    "%0A"
  );
  msgInfoCliente = msgInfoCliente.concat(
    "*Número:* ",
    formDadosPessoais.numero,
    "%20%20%20"
  );
  msgInfoCliente = msgInfoCliente.concat(
    "*Complemento:* ",
    formDadosPessoais.complemento,
    "%0A"
  );
  msgInfoCliente = msgInfoCliente.concat(
    "*Cidade:* ",
    formDadosPessoais.cidade,
    "%0A%0A"
  );

  let msgInfoAparelho = `*Informações do Aparelho:* %0A`;
  if(dadosSelecionados.servico != null){
    msgInfoAparelho = msgInfoAparelho.concat(
      "*Serviço:* ",
      dadosSelecionados.servico,
      " %0A"
    );
  }else{
    actualSection -= 1;
    exibirSections();
    popupMsg('warning','Selecione um serviço para continuar!','AVISO');
    return;
  }

  if(dadosSelecionados.acao != null){
    let msgAcao = `*Desejado:* ${dadosSelecionados.acao} %0A`;
    msgInfoAparelho = msgInfoAparelho.concat(msgAcao);
  }else{
    actualSection -= 1;
    exibirSections();
    popupMsg('warning','Selecione o que deseja para continuar','AVISO');
    return;
  }


  if (dadosSelecionados.problemas && dadosSelecionados.problemas.length > 0) {
    const listaProblemas = dadosSelecionados.problemas
      .map((problema) => `- ${problema}`)
      .join("%0A");

    msgInfoAparelho = msgInfoAparelho.concat(
      "*Problemas:* %0A",
      listaProblemas,
      "%0A"
    );
  } else {
    msgInfoAparelho = msgInfoAparelho.concat(
      "\n\n*Problemas:* Nenhum problema selecionado."
    );
  }

  url = url.concat(msgInfoCliente, msgInfoAparelho);

  // PEGANDO O OUTRO
  let txtOutro = document.getElementById("txtOutro").value;
  let msgOutro = "";
  if (txtOutro != "") {
    msgOutro = `%0A*Outro:* ${txtOutro}`;
    url = url.concat(msgOutro);
  }

  window.open(url, "_blank");
  window.location.reload();
};

import { fluxo, getProblemas, dadosSelecionados } from "./fluxo.js";
fluxo();
