"use strict";

import {
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    AbstractClassException
} from './Exception.js';
import { Person, Category, Resource, Production, Movie, Serie, User, Coordinate } from './ObjetosEntidad.js'

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

//En caso que exista la produccion
class ProductionIsExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The Production is exists.", fileName, lineNumber);
        this.name = "ProductionIsExistsException";
    }
}

//En caso que no exista la produccion
class ProductionIsNotExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The Production is not exists.", fileName, lineNumber);
        this.name = "ProductionIsNotExistsException";
    }
}
//En caso que exista la Persona
class PersonIsExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The Person is exists.", fileName, lineNumber);
        this.name = "PersonIsExistsException";
    }
}

//En caso que exista la Persona
class PersonIsNotExistsException extends VideoSystemException {
    constructor(fileName, lineNumber) {
        super("Error: The Person is not exists.", fileName, lineNumber);
        this.name = "PersonIsNotExistsException";
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
                if (position === -1) throw new UserNotIsExistsException(); //Excepcion en caso que no exista

                this.#users.splice(position, 1); //Eliminamos el usuario

                return this.#users.length;  //Devolvemos el numero de usuarios 
            }

            /**
             * Metodos para PRODUCTIONS
             */

            //Metodo donde devuelve un iterador de las producciones del sistema
            get productions(){
                let array = this.#productions;
                return {
                    * [Symbol.iterator](){
                        for (let i = 0; i < array.length; i++) {
                            yield array[i];
                            
                        }
                    }
                }    
            }

            //Metodo donde se add producciones al sistema
            addProduction(production){
                //Validamos los datos de entrada
                if (!production) throw new InvalidValueException("user", production);
                if (!(production instanceof Production)) throw new TypeVideoSystemException("Production");

                //Comprobamos por titulo 
                let position = this.#productions.findIndex((productionElement) => productionElement.title === production.title);
                if (position >= 0) throw new ProductionIsExistsException(); //Excepcion en caso que exista

                this.#productions.push(production);

                return this.#productions.length;
            }

            //Metodo donde se elimina un produccion del sistema
            removeProduction(production){
                //Validamos los datos de entrada
                if (!production) throw new InvalidValueException("user", production);
                if (!(production instanceof Production)) throw new TypeVideoSystemException("Production");

                //Comprobamos por titulo 
                let position = this.#productions.findIndex((productionElement) => productionElement.title === production.title);
                if (position === -1) throw new ProductionIsNotExistsException(); //Excepcion en caso que no exista
                
                //En caso que exista, comprobamos en el resto de la listas que posse la produccion

                //Para la lista de categoria, eliminar la produccion 
                for(let categoria of this.#categories){
                    //categoria me da un objeto literal , metemos en otro bucle para recorrer la array de producciones
                    
                    for (let i = 0; i < categoria.productions.length; i++) {
                        if(categoria.productions[i].title === production.title){
                            categoria.productions.splice(i, 1);
                            break; //lo finalizamos para esta categoria, ya esta borrado
                        }
                        
                    }
                }

                //Para la lista de actors, eliminar la produccion 
                for(let actor of this.#actors){
                    //categoria me da un objeto literal , metemos en otro bucle para recorrer la array de producciones
                    
                    for (let i = 0; i < actor.productions.length; i++) {
                        if(actor.productions[i].title === production.title){
                            actor.productions.splice(i, 1);
                            break; //lo finalizamos para el actor, ya esta borrado
                        }
                        
                    }
                }

                //Para la lista de directores, eliminar la produccion 
                for(let director of this.#directors){
                    //categoria me da un objeto literal , metemos en otro bucle para recorrer la array de producciones
                    
                    for (let i = 0; i < director.productions.length; i++) {
                        if(director.productions[i].title === production.title){
                            director.productions.splice(i, 1);
                            break; //lo finalizamos para el/la director/a, ya esta borrado
                        }
                        
                    }
                }

                //Una vez comprobamos, eliminamos en la lista general de producciones
                this.#productions.splice(position,1);

                return this.#productions.length;
            }

            /**
             * Metodos para ACTORS 
             */

            //Metodo donde devuelve un iterador de los actores del sistema
            get actors(){
                let array = this.#actors;
                return {
                    *[Symbol.iterator](){
                        for (let i = 0; i < array.length; i++) {
                            yield array[i].actor;
                        }
                    }
                }
            }

            //Metodo donde se add actor en el sistema
            addActor(actor){
                //Validamos los datos de entrada
                if (!actor) throw new InvalidValueException("actor", actor);
                if (!(actor instanceof Person)) throw new TypeVideoSystemException("Actor");

                //Comprobamos por nombre y lastname  
                let position = this.#actors.findIndex((actorElement) => actorElement.actor.name === actor.name && actorElement.actor.lastname1 === actor.lastname1);
                if (position >= 0) throw new PersonIsExistsException(); //Excepcion en caso que exista

                this.#actors.push({
                    actor:actor,
                    productions: []
                });

                return this.#actors.length;
            }

            //Metodo donde se elimina un actor del sistema
            removeActor(actor){
                //Validamos los datos de entrada
                if (!actor) throw new InvalidValueException("actor", actor);
                if (!(actor instanceof Person)) throw new TypeVideoSystemException("Actor");

                //Comprobamos por nombre y lastname  
                let position = this.#actors.findIndex((actorElement) => actorElement.actor.name === actor.name && actorElement.actor.lastname1 === actor.lastname1);
                if (position === -1) throw new PersonIsNotExistsException(); //Excepcion en caso que no exista

                this.#actors.splice(position,1);

                return this.#actors.length;
            }

            /**
             * Metodos para Director
             */

            //Metodo donde devuelve un iterador de los directores del sistema
            get directors() {
                let array = this.#directors;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i].director;
                        }
                    }
                }
            }

            //Metodo donde se add director en el sistema
            addDirector(director) {
                //Validamos los datos de entrada
                if (!director) throw new InvalidValueException("director", director);
                if (!(director instanceof Person)) throw new TypeVideoSystemException("director");

                //Comprobamos por nombre y lastname  
                let position = this.#directors.findIndex((directorElement) => directorElement.director.name === director.name && directorElement.director.lastname1 === director.lastname1);
                if (position >= 0) throw new PersonIsExistsException(); //Excepcion en caso que exista

                this.#directors.push({
                    director: director,
                    productions: []
                });

                return this.#directors.length;
            }

            //Metodo donde se elimina un/a director/a del sistema
            removeDirector(director) {
                //Validamos los datos de entrada
                if (!director) throw new InvalidValueException("director", director);
                if (!(director instanceof Person)) throw new TypeVideoSystemException("director");

                //Comprobamos por nombre y lastname  
                let position = this.#directors.findIndex((directorElement) => directorElement.director.name === director.name && directorElement.director.lastname1 === director.lastname1);
                if (position === -1) throw new PersonIsNotExistsException(); //Excepcion en caso que no exista

                this.#directors.splice(position, 1);

                return this.#directors.length;
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

export {
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    AbstractClassException
};
export { Person, Category, Resource, Production, Movie, Serie, User, Coordinate }; 
export default VideoSystem;