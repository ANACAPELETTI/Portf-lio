var cont = 0;
var word = ['H','T','M','L'];
var input = [null,null,null,null];
var lenght = 4;
var indexLetter = 0; // Coluna
var linha = 0;
var maxLinhas = 6;
var arrayDeInputs = coletarInputs();
var jogoOperando = true;

//letter_empty -> pode escrever
//letter -> bloquado
//letter_wrong -> tudo errado tio
//letter_right -> letra certa, local certo
//letter_place -> letra certa, local errado

function setarPosicao(_linha, coluna){
    if(jogoOperando == false){
        return;
    }
    if(_linha != linha){
        return;
    }
    console.log("linha: "+_linha, "coluna: "+coluna)
    console.log(obterInput(linha, coluna, arrayDeInputs).classList.value);
    if(obterInput(linha, coluna, arrayDeInputs).classList.value == null){
        console.log("Tem classe");
    }
    setarInputComoLetter_empty(linha, indexLetter, arrayDeInputs);
    indexLetter = coluna;
    if(arrayDeInputs[linha][coluna].className != "letter_empty"){   
    }else{
        for(i = 0; i < lenght; i++){
            if(arrayDeInputs[linha][i].className == "letter_border"){
                setarInputComoLetter_empty(linha, coluna, arrayDeInputs);
            }
        }
        setarInputComoLetter_border(linha, coluna, arrayDeInputs);
    }
}

function setarInputComoLetter_border(linha, coluna, arrayDeInputs){
    obterInput(linha, coluna, arrayDeInputs).className = "letter_border";
}

function setarInputComoLetter(linha, coluna, arrayDeInputs){
    obterInput(linha, coluna, arrayDeInputs).className = "letter";
}

function setarInputComoLetter_right(linha, coluna, arrayDeInputs){
    obterInput(linha, coluna, arrayDeInputs).className = "letter_right";
}

function setarInputComoLetter_wrong(linha, coluna, arrayDeInputs){
    obterInput(linha, coluna, arrayDeInputs).className = "letter_wrong";
}

function setarInputComoLetter_place(linha, coluna, arrayDeInputs){
    obterInput(linha, coluna, arrayDeInputs).className = "letter_place";
}

function setarInputComoLetter_empty(linha, coluna, arrayDeInputs){
    obterInput(linha, coluna, arrayDeInputs).className = "letter_empty";
}

function setarTextoNoInput(linha, coluna, arrayDeInputs, letra){
    obterInput(linha, coluna, arrayDeInputs).innerHTML = letra;
}

function setarTeclaComoRight(linha, coluna, letra){
    botao = document.getElementById("Key_"+letra);
    botao.className = "right";
}

function setarTeclaComoPlace(linha, coluna, letra){
    botao = document.getElementById("Key_"+letra);
    botao.className = "place";
}

function setarTeclaComoWrong(linha, coluna, letra){
    botao = document.getElementById("Key_"+letra);
    botao.className = "wrong";
}

function inserirLetra(letra){
    if(jogoOperando == false){
        return;
    }
    if( 0 <= indexLetter && indexLetter < lenght){
        input[indexLetter] = letra;
        setarTextoNoInput(linha, indexLetter, arrayDeInputs, letra);
        setarInputComoLetter_empty(linha, indexLetter, arrayDeInputs);
        console.log(input);
        if(indexLetter < lenght-1){
            indexLetter++;
        }
    } else {
    }
}

function deletarLetra(){
    if(jogoOperando == false){
        return;
    }
    if( 0 <= indexLetter && indexLetter <= lenght){
        input[indexLetter] = null;
        setarTextoNoInput(linha, indexLetter, arrayDeInputs, '');
        setarInputComoLetter_empty(linha, indexLetter, arrayDeInputs);
        console.log(input);
        if(indexLetter > 0){
            indexLetter--;
        }
    } else {
    }
}

function verificarSeTodosOsCamposEstaoCheios(){
    estaCheio = true;
    for(i = 0; i < lenght; i++){
        if(input[i] === null){
            estaCheio = false;
        }
    }
    return estaCheio;
}

function verificarPalavra(){
    if(jogoOperando == false){
        return;
    }
    if(verificarSeTodosOsCamposEstaoCheios()){
        if(verificaSeLetraContemNaPalavra()){
            alert("Parabéns!");
        } else {
            esvaziarInput();
            proximaLinha();
            console.log(linha);
            if(linha < 5){
                console.log("Errou, tente novamente!");
            }  
        }
    }
    
}

function esvaziarInput(){
    for(i = 0; i < lenght; i++){
        input[i] = null;
    }
    indexLetter = 0;
}

function proximaLinha(){
    if( 0 <= linha && linha < maxLinhas-1){
        linha++;
        console.log("Linha atual: "+linha);
        for(i = 0; i < lenght; i++){
            setarInputComoLetter_empty(linha, i, arrayDeInputs);
        }
    } else {
        jogoOperando = false;
        alert("A palavra era: " + word);
    }
}

function coletarInputs(){
    var _arrayDeInputs = new Array(maxLinhas);
    for(i = 0; i<maxLinhas; i++){ // Pega todas as linhas
        busca = '#palavra'+i+' div';
        _arrayDeInputs[i] = document.querySelectorAll(busca);
    }
    return _arrayDeInputs;
}

function obterInput(linha, coluna, arrayDeInputs){
    return arrayDeInputs[linha][coluna]; // ARRUMAR CASO ACABE AS TENTATIVAS
}

function verificaSeLetraContemNaPalavra(){
    estaPalavraECorreta = true;
    for(inputIndex = 0; inputIndex < lenght; inputIndex++){
        // Define todos como errados de inicio, se algum for certo, muda depois
        setarInputComoLetter_wrong(linha, inputIndex, arrayDeInputs);
        contemALetra = false;
        for(workIndex = 0; workIndex < lenght; workIndex++){
            if(input[inputIndex] == word[workIndex]){
                if(inputIndex == workIndex){
                    setarInputComoLetter_right(linha, inputIndex, arrayDeInputs);
                    if(document.getElementById("Key_"+input[inputIndex]).classList.length == 0 || document.getElementById("Key_"+input[inputIndex]).className == 'place'){
                        setarTeclaComoRight(linha, indexLetter, input[inputIndex]);
                    }
                    workIndex = lenght; //Se ele encontrou o certo, ele encerra o loop
                    contemALetra = true;
                } else {
                    setarInputComoLetter_place(linha, inputIndex, arrayDeInputs);
                    if(document.getElementById("Key_"+input[inputIndex]).classList.length == 0){
                        setarTeclaComoPlace(linha, inputIndex, input[inputIndex]);
                    }
                    contemALetra = false;
                }
            } 
        }
        if(!contemALetra){
            estaPalavraECorreta = false;
            if(document.getElementById("Key_"+input[inputIndex]).classList.length == 0){
                setarTeclaComoWrong(linha, inputIndex, input[inputIndex]);
            }
        }
    }
    return estaPalavraECorreta;
}