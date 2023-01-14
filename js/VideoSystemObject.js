"use strict";

import {
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    AbstractClassException
} from './js/Exception.js';
import { Person, Category, Resource, Production, Movie, Serie, User, Coordinate } from './js/ObjetosEntidad.js'

// Objeto VideoSystem
class VideoSystemException extends BaseException {
    constructor(message = "Error: Video System Generic Exception.", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "VideoSystemException";
    }
}

class TypeVideoSystemException extends VideoSystemException {
    constructor(name, fileName, lineNumber) {
        super("Error: The method needs a " + name + " parameter.", fileName, lineNumber);
        this.name = "TypeVideoSystemException";
    }
}

//En caso que exista la categoria
class CategoryIsExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The Category is exists.", fileName, lineNumber);
        this.name = "CategoryIsExistsException";
    }
}

//En caso que exista la categoria
class CategoryIsNotExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The Category is not exists.", fileName, lineNumber);
        this.name = "CategoryIsNotExistsException";
    }
}

//En caso que exista el username
class UsernameIsExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The username is exists.", fileName, lineNumber);
        this.name = "UsernameIsExistsException";
    }
}

//En caso que exista el username
class EmailIsExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The email is exists.", fileName, lineNumber);
        this.name = "EmailIsExistsException";
    }
}

//En caso que no exista el usuario
class UserNotIsExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The usuario is not exists.", fileName, lineNumber);
        this.name = "UserNotIsExistsException";
    }
}

//La function anonima
let VideoSystem = (function () {
    let instantiated; //Objeto con la instancia única ImageManager

    function init() { //Inicialización del Singleton
        class VideoSystem {
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
                this.addCategory(this.#defaultCategory);
            }

            //Getter y setter de name 
            get name() {
                return this.#name;
            }

            set name(nameN) {
                if (!nameN) throw new InvalidValueException("name", nameN);
                this.#name = nameN;
            }

            /**
            * METODOS DE CATEGORY
            */
            //Getter que devuelve un iterador de categories 
            get categories() {
                let array = this.#categories;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 1; i < array.length; i++) {
                            yield array[i].category;
                        }
                    }
                }
            }

            //Metodo donde se añade una categoria
            addCategory(newCategory) {
                //Validamos
                if (!newCategory) throw new InvalidValueException("Category", newCategory);
                if (!(newCategory instanceof Category)) throw new TypeVideoSystemException("Category");
                //Buscamos si existe la categoria
                let position = this.#categories.findIndex((element) => element.category.name === newCategory.name)
                if(position >=0) throw new CategoryIsExistsException(); //En caso que existe

                //Insertamos el objeto literal a la lista de categorias 
                this.#categories.push(
                    {
                    category:newCategory,
                    productions: []
                    }
                );

                return this.#categories.length;
            }

            //Metodo donde se elimina una categoria
            removeCategory(category){
                //Validamos
                if (!category) throw new InvalidValueException("Category", category);
                if (!(category instanceof Category)) throw new TypeVideoSystemException("Category");

                let position = this.#categories.findIndex((element) => element.category.name === category.name)
                if(position === -1) throw new CategoryIsNotExistsException();

                let productions = this.#categories[position].productions;

                for (let i = 0; i < productions.length; i++) {
                    //Insertamos en el categoria por defecto los producciones registradas
                    this.#categories[0].productions.push(productions[i]);                    
                }
                //Eliminamos el objeto literal de la categoria
                this.#categories.splice(position,1);

                return this.#categories.length; //Devolvemos el numero tras la operacion 
            }
            
            /**
            * METODOS DE USERS
            */

            //Getter que devuelve un iterador de users 
            get users() {
                let array = this.#users;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i];
                        }
                    }
                }
            }

            //Metodo add User al sistema
            addUser(user) {
                //Validamos los datos de entrada
                if (!user) throw new InvalidValueException("user", user);
                if (!(user instanceof User)) throw new TypeVideoSystemException("User");
                //Comprobamos el nombre de usuario que no exista
                let position = this.#users.findIndex((userElement) => userElement.username === user.username);
                if (position >= 0) throw new UsernameIsExistsException(); //Excepcion en caso que exista
                //Comprobamos que el email no exista
                position = this.#users.findIndex((userElement) => userElement.email === user.email);
                if (position >= 0) throw new EmailIsExistsException(); //Excepcion en caso que exista

                this.#users.push(user); //Insertamos a la lista de usuarios el nuevo usuario 

                return this.#users.length;  //Devolvemos el numero de usuarios 
            }

            //Metodo add User al sistema
            removeUser(user) {
                if (!user) throw new InvalidValueException("user", user);
                if (!(user instanceof User)) throw new TypeVideoSystemException("User");
                //Comprobamos por nombre de usuario
                let position = this.#users.findIndex((userElement) => userElement.username === user.username);
                if (position === -1) throw new UserNotIsExistsException(); //Excepcion en caso que exista

                this.#users.splice(position, 1); //Eliminamos el usuario

                return this.#users.length;  //Devolvemos el numero de usuarios 
            }

            /**
             * Metodos para PRODUCTIONS
             */

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