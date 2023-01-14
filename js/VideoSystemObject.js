"use strict";

import {
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    AbstractClassException } from './js/Exception.js';

//La function anonima
let VideoSystem = (function () {
    let instantiated; //Objeto con la instancia única ImageManager

    function init() { //Inicialización del Singleton

    }
    return {
        getInstance: function () {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    }
})();