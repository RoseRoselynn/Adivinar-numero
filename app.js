//el document. es un objeto que representa el documento HTML, nos permite utilizar una serie de funciones y operaciones
//el querySelector nos permite traer de otro documento dentro de Curso2 alguna cosa, en este caso estamos trayendo el p desde HTML
//El p desde HTML lo estamos guardando en una variable

/*let parrafo = document.querySelector("p");

//Desde el javascript estamos dicendo que el p en HTML tendrá el texto de "Ingresa un número del 1 al 10"

parrafo.innerHTML = "Ingresa un número del 1 al 10";*/


//estamos creando la función que usaremos en el HTML
//la funcion es el encapsulamiento de una accion/tarea que queremos que haga

/*function asignarTexto() {
    let titulo = document.querySelector("h1");
    titulo.innerHTML = "Juego del amigo secreto";
}*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let numeroSecreto = 0; //guardamos en una variable el número que generó nuestra funcion Math
let intentos = 0;
let listaNumerosGenerados = [];
let numeroMaximo = 10;

//ahora haremos lo mismo pero más genérico para poder usarla siempre que queramos
function asignarTexto(elemento, texto) { //asignamos parámetros (son variables) para decirle a nuestra función cómo debe actuar
    let elementoHTML = document.querySelector(elemento); //traemos un elemento de HTML para poder hacerlo dinámico en JS
    elementoHTML.innerHTML = texto; //como al elemento le asignamos una variable ahora aquí le decimos que texto tendrá
    return;

}//aquí llamamos nuestra función genérica y le asignamos las condiciones que queremos aplicar
function condicionesIniciales() {
    asignarTexto('h1', "Juego del número secreto"); //primero decimos el elemento y luego lo que mostrará
    asignarTexto('p', `Ingresa un número del 1 al ${numeroMaximo}`);//las comillas invertidas nos sirven para mostrar texto y valores
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

//hemos colocado nuestras funciones de Math dentro de otra función para utilizarlo cuando queramos solo invocandola
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //solo para mostrar en consola
    console.log(numeroGenerado);
    console.log(listaNumerosGenerados);

    //si el tamaño de esta variable (lista de todos los numeros generados) es igual al numeroMaximo entonces...
    if (listaNumerosGenerados.length == numeroMaximo) {
        asignarTexto('p', "Ya se asignaron todos los números posibles")
    } else { //si aún nos quedan más numeros entonces...
        //si el numero generado ya está en la lista hacemos todo, si no, generamos otro numero
        if (listaNumerosGenerados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); //retorna la funcion nuevamente para que se repita
        } else {
            listaNumerosGenerados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

condicionesIniciales();

function verificarIntento() {
    //value: es una propiedad que nos da el valor que el usuario ha ingresado en ese campo
    let numeroDeUsuario = parseInt(document.getElementById('ingresarNumero').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTexto('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? "intento" : "intentos"}`);
        //lo que estamos haciendo es que al momento de acertar se quitará el atributo de "disabled" en el botón nuevo juego en HTML
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTexto('p', "El número secreto es menor");
        } else {
            asignarTexto('p', "El número secreto es mayor");
        }
        intentos++
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#ingresarNumero').value = "";
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //indicar condiciones iniciales
    condicionesIniciales();
    //deshabilitar botón de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true')
}

