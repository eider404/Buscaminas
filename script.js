function Logica(){
    
    let dificultad= document.querySelector( '#form_dif').dificultad.value;
    var tablero = [];
    let facil = [[],[],[],[],[],[]];
    let medio = [[],[],[],[],[],[],[]];
    let dificil = [[],[],[],[],[],[],[],[],[]];
    let cantidadMine = 0;
    let num = 0;
    let columna = -1;
    let fila = 0;


//Escoge la dificultada
    switch(dificultad){
        case 'facil':
            tablero= facil;        // sele agrega las casillas del array es decir 6
            num = 6;            // El tablero sera de 6 x 6
            cantidadMine= 7;    // por la dificultad se le agragara 7 minas
        break;
        case 'medio':
            tablero= medio;
            num = 7;
            cantidadMine = 12;
        break;
        case 'dificil':
            tablero= dificil;
            num = 9;
            cantidadMine = 17;
        break;

    }


/*Agragar las minas de manera random en la matriz "tablero"*/
    for( i = 1; i <= cantidadMine ; i++){
        
        var x = Math.floor(Math.random()*num); //x tendra un valor random entre 0 y num (segun la dificultad) linia: 60, 65, 70 
        var y = Math.floor(Math.random()*num); 

        if(tablero[x][y] == 1){ //if para evitar que mas minas sean colocadas en la misma coordenada
            tablero[x][y] = 0;  //se elimina la mina de las coordenadas;
            i--;                //retrocede la cuenta del for para repetir el proceso
        }
        tablero[x][y] = 1;      //se agrega la mina en la coordenada
    }


/* organiza los "button" de tal manera que segun la dificultad cambiaba de fila */
    let cuadrado = Math.pow(num,2);                 //genera segun el "num" a la potencia 2
    for ( i = 1; i < (cuadrado+1); i++) {            
        let res = i % num;                          //genera un residuo segun el contador y num
                                                    /*ejemplo: i % num ->  7 % 6 = 1
                                                                    ->  8 % 6 = 2*/
        if(res == 1){                               
            var br = document.createElement("br");  //crea un "br" para hacer un salto delinea y ordenar el tablero
            capa.appendChild(br);                   //el br se agregara dentro del "div" con el id=capa, linea: 40
            columna = columna +1;                   //la variable columna aumenta para pasar a la otra columna en la matriz
        }
        fila = (i-1) % num;                         //hace un residuo de tal manera que solo tendra los valores entre 0 y num
        addElemento(columna,fila,i,num);
                
    }


    function addElemento(columna,fila,valor, num){
        var button = document.createElement("button");          //crea un button
        button.id ="id"+valor;                                  //al botton se le agrega un "id"
        button.value = tablero[columna][fila];                  //se le agrega valor segun por la matriz "tablero" usando las columna y fila
        let valueButton= tablero[columna][fila];                //genera el el valor de dicha coordenada
        button.onclick = function(){
            touch(valor, valueButton, tablero, columna, fila,num)};
        
        capa.appendChild(button);                                //se le agrega el button dentro el div del id="capa" 
                    
    }

    let numeroClickscoordenada = ['aqui se guardaran las coordenadas de los botones clickeados']
    function touch(valor, valueButton, tablero,columna, fila, num){  
        
        if(valueButton==1){
            if(numeroClickscoordenada.length < ((num*num)-cantidadMine+1)){
                document.querySelector("#id"+valor).style.background = "#B00000 ";
                document.querySelector("#id"+valor).innerHTML ="X";
                document.querySelector("#mensage").innerHTML ="GAME OVER &#128531;";
                document.querySelector("#mensage").style.color = "#B00000 ";
                numeroClickscoordenada = ['perdiste']; // significa que se reiniciara el array pero con un valor de 'perdiste'
            }
            
            
        }else{
            //CountAround(valor, mine,columna, fila);
            let countAround = 0;
            document.querySelector("#id"+valor).style.background = "#537254";
            if(columna == num-1){
                if(tablero[columna-1][fila-1]==1){
                countAround ++;
                }
                if(tablero[columna-1][fila]==1){
                    countAround ++;
                }
                if(tablero[columna-1][fila+1]==1){
                    countAround ++;
                }
            }
            if(columna == 0){
                if(tablero[columna+1][fila-1]==1){
                countAround ++;//
                }
                if(tablero[columna+1][fila]==1){
                    countAround ++;
                }
                if(tablero[columna+1][fila+1]==1){
                    countAround ++;
                }
            }

            if(columna > 0 && columna < num-1){
                if(tablero[columna-1][fila-1]==1){
                countAround ++;
                }
                if(tablero[columna-1][fila]==1){
                    countAround ++;
                }
                if(tablero[columna-1][fila+1]==1){
                    countAround ++;
                }

                if(tablero[columna+1][fila-1]==1){
                countAround ++;//
                }
                if(tablero[columna+1][fila]==1){
                    countAround ++;
                }
                if(tablero[columna+1][fila+1]==1){
                    countAround ++;
                }
            }

            if(tablero[columna][fila-1]==1){
                countAround ++;
            }
            if(tablero[columna][fila+1]==1){
                countAround ++;
            }

            
            console.log(countAround);
            document.querySelector("#id"+valor).innerHTML = countAround;
            
            
            
        }  

        let repetido = false;
        for (const iterator of numeroClickscoordenada) {
            if(iterator == `${columna} ${fila}`){
                repetido = true;
            }
        }
        if(repetido == false){
            numeroClickscoordenada.push(`${columna} ${fila}`)
            //console.log(numeroClickscoordenada)
        }
        
        if(numeroClickscoordenada.length == ((num*num)-cantidadMine+1) && numeroClickscoordenada[0]!='perdiste'){
            document.querySelector("#mensage").style.color = "#2fc348";
            document.querySelector("#mensage").innerHTML ="WON &#128526;"

        }
        
    }
}