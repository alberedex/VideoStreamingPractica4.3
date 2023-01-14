"use strict";

import {
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    AbstractClassException } from './js/Exception.js';
import {Person,Category,Resource,Production,Movie,Serie,User,Coordinate} from './js/ObjetosEntidad.js'
//La function anonima
let VideoSystem = (function () {
    let instantiated; //Objeto con la instancia única ImageManager

    function init() { //Inicialización del Singleton
        class VideoSystem{
            #name;
            #users = [];
            #productions = [];
            #categories = [];
            #actors = [];
            #directors = [];

            /*
                Estructura de almacenar informacion 

                #users = [ User ];
                #productions = [ Production ];
                #categories = [
                    {
                        category: Category,
                        productions: [ Production ]
                    }
                ];
                #actors = [
                    {
                        actor: Person,
                        productions: [ Production ]
                    }
                ];
                #directors = [
                    {
                        director: Person,
                        productions: [ Production ]
                    }
                ];
            */

            #defaultCategory = new Category("default category"); //Categoría por defecto

            constructor() {
                
            }

            //Getter y setter de name 
            get name(){
                return this.#name;
            }

            set name(nameN){
                if (!nameN) throw new InvalidValueException("name", nameN);
                this.#name = nameN;
            }

        }
        let vs = new VideoSystem();
        Object.freeze(vs);
        return vs; //Devolvemos el objeto VideoSystem creado por primera vez y unico.
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

export default VideoSystem;