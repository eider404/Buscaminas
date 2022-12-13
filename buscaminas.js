
function generarTablero(){

    let capa = document.querySelector("#capa")
    let nTablero = 5;

    for (let x = 0; x < (nTablero*nTablero); x++) {

        let button = document.createElement("button");
        button.id = "id"+ x;
        button.addEventListener("click", function(){ Click(x) });
        
        capa.appendChild(button);

        //(x+1) para que despues del primer ciclo no genere un <br>, y asi lo hara despues de nTablero ciclos
        if((x+1) % nTablero == 0){
            let br = document.createElement("br"); 
            capa.appendChild(br); 
        }
    }
}


function Click(x){
    //document.querySelector(`#id${coordenada}`).style.background = "#B00000 ";
    document.querySelector(`#id${x}`).className = "mine"
}

