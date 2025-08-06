# Juego del Número Secreto

Este proyecto es un juego sencillo donde el usuario debe adivinar un número secreto generado aleatoriamente. Está desarrollado en **JavaScript**, con interacción básica con HTML y manipulación del DOM.

---

## Descripción del juego

* El juego genera un **número aleatorio entre 1 y un máximo configurable** (por defecto, 10).
* El usuario debe ingresar un número y recibir pistas:

  * **"El número secreto es mayor"** si el número ingresado es menor.
  * **"El número secreto es menor"** si el número ingresado es mayor.
* Al acertar, se mostrará cuántos intentos tomó y se habilitará el botón de **"Nuevo Juego"**.
* El juego evita que un número se repita hasta que se hayan generado todos los posibles.

---

## Funcionalidades principales

* **Generación de números aleatorios sin repetición.**
* **Validación de intentos del usuario.**
* **Interacción con elementos del DOM (textos dinámicos y botones habilitados/deshabilitados).**
* **Contador de intentos para mostrar cuántas veces se intentó hasta acertar.**

---

## Explicación de líneas clave del código

```javascript
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosGenerados = [];
let numeroMaximo = 10;
```

Estas variables controlan el número secreto, la cantidad de intentos, la lista de números ya usados y el número máximo permitido.

```javascript
function asignarTexto(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}
```

Busca un elemento HTML y cambia su contenido de texto dinámicamente.

```javascript
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    if (listaNumerosGenerados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosGenerados.push(numeroGenerado);
        return numeroGenerado;
    }
}
```

Genera un número aleatorio entre 1 y `numeroMaximo`. Si ya fue generado, vuelve a llamar la función hasta encontrar uno que no esté en la lista.

```javascript
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('ingresarNumero').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTexto('p', `Acertaste el número en ${intentos} intento(s)`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        asignarTexto('p', numeroDeUsuario > numeroSecreto ? "El número secreto es menor" : "El número secreto es mayor");
        intentos++;
        limpiarCaja();
    }
}
```

Verifica si el número ingresado es igual al secreto, muestra pistas y aumenta el contador de intentos.

```javascript
function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}
```

Reinicia el juego para empezar otra partida.

---

## Código HTML mínimo para que funcione el juego

Copia este archivo `index.html` y enlázalo con tu archivo JS para probar el juego:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego del Número Secreto</title>
</head>
<body>
    <h1></h1>
    <p></p>

    <input type="number" id="ingresarNumero" placeholder="Escribe un número">
    <button onclick="verificarIntento()">Intentar</button>
    <button id="reiniciar" onclick="reiniciarJuego()" disabled>Nuevo Juego</button>

    <script src="script.js"></script>
</body>
</html>
```

---

## Requisitos para ejecutar el juego

1. Archivo **HTML** como el anterior.
2. Archivo **JavaScript** (`script.js`) con el código del juego.
3. Un navegador web moderno que soporte **ES6**.

---

## Cómo usar

1. Clona este repositorio o descarga los archivos.
2. Abre `index.html` en tu navegador.
3. Ingresa un número entre **1 y 10** y presiona **Intentar**.
4. Sigue las pistas hasta acertar y presiona **Nuevo Juego** para reiniciar.

---

## Mejoras posibles

* Permitir al usuario configurar el rango de números.
* Añadir un temporizador para contar el tiempo del juego.
* Mostrar un historial de números ingresados.
* Crear una interfaz más atractiva con CSS.
