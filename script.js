let form = document.querySelector("#formulario");
let dia = document.querySelector("#dia");
let mes = document.querySelector("#mes");
let ano = document.querySelector("#ano");
let validacao = 1;
function calcularIdade(dia, mes, ano) {
    var dataNascimento = new Date(ano, mes - 1, dia);
    var dataAtual = new Date();
    var anos = dataAtual.getFullYear() - dataNascimento.getFullYear();
    var meses = dataAtual.getMonth() - dataNascimento.getMonth();
    var dias = dataAtual.getDate() - dataNascimento.getDate();
    // Corrigir possíveis casos onde o mês pode ter ficado negativo
    if (meses < 0 || (meses === 0 && dias < 0)) {
      anos--;
      meses += 12;
    }
  
    // Corrigir dias negativos
    if (dias < 0) {
      var ultimoDiaMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior;
      meses--;
    }
  
    return {anos: anos, meses: meses, dias: dias};
  }
form.addEventListener("submit", e=>{
    e.preventDefault();
    console.log("enviou");
    switch (parseInt(mes.value)) {
        case 2,4,6,9,11:
            if(parseInt(dia.value) == 31 && document.querySelector("#validacao") == null){
                let e = document.createElement("p");
                e.innerHTML = "O mes escolhido possui apenas 30 dias.Tente Novamente!";
                e.style.color = "#F00";
                e.id = "validacao";
                console.log("largura: "+ screen.width);
                if(screen.width <= 800){
                    console.log("entrei aqui")
                    document.querySelector("#linha-vertical").appendChild(e);
                    e.style.marginTop = "85px";
                }
                else{
                    document.querySelector("#inputs").appendChild(e);
                    document.querySelector("#inputs").style.marginLeft = "10px";
                }
                validacao = 0;
            }
            if(parseInt(dia.value) < 31){
                if(document.querySelector("#validacao") != null){
                    let node = document.querySelector("#validacao");    
                    node.parentNode.removeChild(node);
                }
                validacao = 1;
            }
            break;
        default:
            validacao = 1;
            break;
    }
    if(validacao == 1){
        console.log("Usuario digitou:" + dia.value+"/"+mes.value+"/"+ano.value);
        let resultado = calcularIdade(dia.value, mes.value, ano.value);
        console.log("Idade: " + resultado.anos + " anos, " + resultado.meses + " meses e " + resultado.dias + " dias.");
        document.querySelector("#traco-ano").innerHTML = resultado.anos;
        document.querySelector("#traco-mes").innerHTML = resultado.meses;
        document.querySelector("#traco-dia").innerHTML = resultado.dias;
    }
    else{
        document.querySelector("#traco-ano").innerHTML = "--";
        document.querySelector("#traco-mes").innerHTML = "--";
        document.querySelector("#traco-dia").innerHTML = "--";
    }
})
 