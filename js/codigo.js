'use strict';

window.addEventListener('load', ()  => {

    leerTexto();
    grabarTexto();
});

//FUNCIONES

//Funcion leer texto
function leerTexto(){
    
    const texto = document.querySelector('.texto');
    const btnLeerTexto = document.querySelector('.btn-leer');

    //Al pulsar el boton locuta el mensaje escrito
    btnLeerTexto.addEventListener('click', () => {
        const locutor = new SpeechSynthesisUtterance();
        const voz = window.speechSynthesis;

        locutor.text = texto.value;
        voz.speak(locutor);
    });
}

//Funcion grabar voz
function grabarTexto(){

    const btnGrabar  = document.querySelector('.btn-grabar');
    const contenido  = document.querySelector('.contenido');

    //Creamos los objetos para poder grabar nuestra voz con el microfono
    const reconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition;
    const reconocimiento = new reconocimientoVoz();

    //Metodo que se ejecuta al empezar a grabar
    reconocimiento.onstart = () =>{
        contenido.innerHTML = "Estamos grabando la voz...";
    }

    //Metodo que se ejecuta al terminar la grabación
    reconocimiento.onresult = (e) => {
        let mensaje = e.results[0][0].transcript;
        leer(mensaje);
    }

    //Funcion que locuta el mensaje
    const leer = (mensaje) => {
        const voz = new SpeechSynthesisUtterance();
        voz.text = mensaje;
        window.speechSynthesis.speak(voz);
    }

    //Evento que graba al pulsar el boton
    btnGrabar.addEventListener('click', () => {
        reconocimiento.start();
    });
}