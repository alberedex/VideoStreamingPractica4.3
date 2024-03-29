"use strict";

import {
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    AbstractClassException
} from '../Exception.js';
import { Person, Category, Resource, Production, Movie, Serie, User, Coordinate } from '../ObjetosEntidad.js'

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

    function init(name) { //Inicialización del Singleton
        class VideoSystem {
            #name;
            #users = [];
            #productions = [];
            #categories = [];
            #actors = [];
            #directors = [];

            #elementosEliminados = {
                ProductionsDelete: [],
                CategoriesDelete: [],
                ActorsDelete: [],
                DirectorDelete: [],
                usersDelete: []
            }

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

            //Devuelve la posicion de una produccion de la lista
            #getPositionProduction(production) {
                return this.#productions.findIndex((productionElement) => productionElement.title === production.title);
            }

            //devuelve la posicion de la categoria de la lista 
            #getPositionCategory(category) {
                return this.#categories.findIndex((categoryElement) => categoryElement.category.name === category.name);
            }

            //devuelve la posicion del actor de la lista 
            #getPositionActor(actor) {
                return this.#actors.findIndex((actorElement) => actorElement.actor.name === actor.name && actorElement.actor.lastname1 === actor.lastname1);
            }

            //devuelve la posicion del director de la lista 
            #getPositionDirector(director) {
                return this.#directors.findIndex((directorElement) => directorElement.director.name === director.name && directorElement.director.lastname1 === director.lastname1);
            }

            

            constructor(name) {
                this.#name = name;
                //Añadimos el primer categoria por defecto , posicion = 0
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
                let position = this.#getPositionCategory(newCategory);
                if (position >= 0) throw new CategoryIsExistsException(); //En caso que existe

                //Insertamos el objeto literal a la lista de categorias 
                this.#categories.push(
                    {
                        category: newCategory,
                        productions: []
                    }
                );

                return this.#categories.length;
            }

            //Metodo donde se elimina una categoria
            removeCategory(category) {
                //Validamos
                if (!category) throw new InvalidValueException("Category", category);
                if (!(category instanceof Category)) throw new TypeVideoSystemException("Category");

                let position = this.#getPositionCategory(category);
                //En caso de que no exista o si es la categoria por defecto, no permito que elimine
                if (position === -1 || position === 0) throw new CategoryIsNotExistsException();

                let productions = this.#categories[position].productions;

                for (let i = 0; i < productions.length; i++) {
                    //Insertamos en el categoria por defecto los producciones registradas
                    this.#categories[0].productions.push(productions[i]);
                }
                //Eliminamos el objeto literal de la categoria
                this.#categories.splice(position, 1);

                this.#elementosEliminados.CategoriesDelete.push(category.name);

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

            //Metodo remove User al sistema
            removeUser(user) {
                if (!user) throw new InvalidValueException("user", user);
                if (!(user instanceof User)) throw new TypeVideoSystemException("User");
                //Comprobamos por nombre de usuario
                let position = this.#users.findIndex((userElement) => userElement.username === user.username);
                if (position === -1) throw new UserNotIsExistsException(); //Excepcion en caso que no exista

                this.#users.splice(position, 1); //Eliminamos el usuario

                this.#elementosEliminados.usersDelete.push({
                    username: user.username,
                    email: user.email,
                    password: user.password
                });

                return this.#users.length;  //Devolvemos el numero de usuarios 
            }

            //devuelve la posicion del director de la lista 
            getPositionUserAuth(name,pass) {
                return this.#users.findIndex(userRegist => userRegist.username == name && userRegist.password == pass);
            }

            /**
             * Metodos para PRODUCTIONS
             */

            //Metodo donde devuelve un iterador de las producciones del sistema
            get productions() {
                let array = this.#productions;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i];

                        }
                    }
                }
            }

            //Metodo donde se add producciones al sistema
            addProduction(production) {
                //Validamos los datos de entrada
                if (!production) throw new InvalidValueException("production", production);
                if (!(production instanceof Production)) throw new TypeVideoSystemException("Production");

                //Comprobamos por titulo 
                let position = this.#getPositionProduction(production);
                if (position >= 0) throw new ProductionIsExistsException(); //Excepcion en caso que exista

                this.#productions.push(production);

                return this.#productions.length;
            }

            //Metodo donde se elimina un produccion del sistema
            removeProduction(production) {
                //Validamos los datos de entrada
                if (!production) throw new InvalidValueException("production", production);
                if (!(production instanceof Production)) throw new TypeVideoSystemException("Production");

                //Comprobamos por titulo 
                let position = this.#getPositionProduction(production);
                if (position === -1) throw new ProductionIsNotExistsException(); //Excepcion en caso que no exista

                //En caso que exista, comprobamos en el resto de la listas que posse la produccion

                //Para la lista de categoria, eliminar la produccion 
                for (let categoria of this.#categories) {
                    //categoria me da un objeto literal , metemos en otro bucle para recorrer la array de producciones
                    let i = 0;
                    let encontrado = false;

                    while (i < categoria.productions.length && !encontrado) {
                        if (categoria.productions[i].title === production.title) {
                            categoria.productions.splice(i, 1);
                            encontrado = true; //lo finalizamos para esta categoria, ya esta borrado
                        }
                        i++; //incrementamos
                    }
                }

                //Para la lista de actors, eliminar la produccion 
                for (let actor of this.#actors) {
                    //actor me da un objeto literal , metemos en otro bucle para recorrer la array de producciones
                    let i = 0;
                    let encontrado = false;

                    while (i < actor.productions.length && !encontrado) {
                        if (actor.productions[i].title === production.title) {
                            actor.productions.splice(i, 1);
                            encontrado = true; //lo finalizamos para el actor, ya esta borrado
                        }
                        i++; //incrementamos el contador
                    }
                }

                //Para la lista de directores, eliminar la produccion 
                for (let director of this.#directors) {
                    //categoria me da un objeto literal , metemos en otro bucle para recorrer la array de producciones
                    let i = 0;
                    let encontrado = false;

                    while (i < director.productions.length && !encontrado) {
                        if (director.productions[i].title === production.title) {
                            director.productions.splice(i, 1);
                            encontrado = true; //lo finalizamos para el/la director/a, ya esta borrado
                        }
                        i++; //incrementamos el contador
                    }
                }

                //Una vez comprobamos, eliminamos en la lista general de producciones
                this.#productions.splice(position, 1);


                let productionObjLit;
                    //Propiedades comunes
                    productionObjLit = {
                        title: production.title,
                        nationality: production.nationality,
                        publication: production.publication,
                        synopsis: production.synopsis,
                        image: production.image
                    }
                    if (production instanceof Movie) {
                        //En caso de pelicula
                        productionObjLit.resource = production.resource;
                        productionObjLit.locations = [];
                        productionObjLit.type = "Movie";

                    } else if (production instanceof Serie) {
                        //En caso de Serie
                        productionObjLit.resources = [];
                        productionObjLit.locations = [];
                        productionObjLit.seasons = production.seasons;
                        productionObjLit.type = "Serie";

                        for (let resource of production.resources) {
                            productionObjLit.resources.push({
                                duration: resource.duration,
                                link: resource.link
                            });
                        }
                    }
                    //coordinate
                    for (let coordinate of production.locations) {
                        productionObjLit.locations.push({
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude
                        });
                    }

                this.#elementosEliminados.ProductionsDelete.push(productionObjLit);

                return this.#productions.length;
            }

            /**
             * Metodos para ACTORS 
             */

            //Metodo donde devuelve un iterador de los actores del sistema
            get actors() {
                let array = this.#actors;
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < array.length; i++) {
                            yield array[i].actor;
                        }
                    }
                }
            }

            //Metodo donde se add actor en el sistema
            addActor(actor) {
                //Validamos los datos de entrada
                if (!actor) throw new InvalidValueException("actor", actor);
                if (!(actor instanceof Person)) throw new TypeVideoSystemException("Actor");

                //Comprobamos por nombre y lastname  
                let position = this.#getPositionActor(actor);
                if (position >= 0) throw new PersonIsExistsException(); //Excepcion en caso que exista

                this.#actors.push({
                    actor: actor,
                    productions: []
                });

                return this.#actors.length;
            }

            //Metodo donde se elimina un actor del sistema
            removeActor(actor) {
                //Validamos los datos de entrada
                if (!actor) throw new InvalidValueException("actor", actor);
                if (!(actor instanceof Person)) throw new TypeVideoSystemException("Actor");

                //Comprobamos por nombre y lastname  
                let position = this.#getPositionActor(actor);
                if (position === -1) throw new PersonIsNotExistsException(); //Excepcion en caso que no exista
                
                //Metemos en el array del objeto literal para tenerlo elementos borrados
                let actorObjLit = {
                    actor: {
                        name: actor.name,
                        lastname1: actor.lastname1,
                        lastname2: actor.lastname2,
                        born: actor.born,
                        picture: actor.picture
                    },
                    productions: []
                }

                for (let prod of this.#actors[position].productions) {
                    actorObjLit.productions.push(prod.title);
                }

                this.#elementosEliminados.ActorsDelete.push(actorObjLit);

                this.#actors.splice(position, 1);


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
                let position = this.#getPositionDirector(director);
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
                let position = this.#getPositionDirector(director);
                if (position === -1) throw new PersonIsNotExistsException(); //Excepcion en caso que no exista

                let directorObjLit = {
                    director: {
                        name: director.name,
                        lastname1: director.lastname1,
                        lastname2: director.lastname2,
                        born: director.born,
                        picture: director.picture
                    },
                    productions: []
                }

                for (let prod of this.#directors[position].productions) {
                    directorObjLit.productions.push(prod.title);
                }

                this.#elementosEliminados.DirectorDelete.push(directorObjLit);

                this.#directors.splice(position, 1);


                return this.#directors.length;
            }

            /**
             * METODOS DE ASIGNACION Y DESASIGNACION EN LAS LISTAS
             */
            //CATEGORY

            //metodo donde se asigna uno o mas producciones a una categoria
            assignCategory(category, ...productions) {
                //Validamos
                if (!category) throw new InvalidValueException("Category", category);
                if (!(category instanceof Category)) throw new TypeVideoSystemException("Category");

                let position = this.#getPositionCategory(category);
                if (position === -1) {
                    //En caso que no exista, se añade la nueva categoria
                    position = (this.addCategory(category) - 1);
                }
                //Asignamos la referencia , para trabajar con el objeto
                let catP = this.#categories[position].productions;

                //Compruebo todos los productions que no sean null
                for (let prod of productions) {
                    if (prod == null) throw new InvalidValueException("Productions", prod);
                }

                for (let i = 0; i < productions.length; i++) {

                    //Obtenemos la posicion de la lista de Produccion 
                    let positionProd = this.#getPositionProduction(productions[i]);
                    //En caso que no exista, lo hacemos un push a la lista 
                    if (positionProd === -1) {
                        this.addProduction(productions[i]);
                        //Asignar la produccion a la categoria
                        catP.push(productions[i]);
                    } else {
                        //en caso que existe, comprobamos que no tiene asignado a la categoria
                        let positionProduction = catP.findIndex((productionsE) => productionsE.title === productions[i].title);
                        //En caso que no esta asignado, lo asignamos de la lista 
                        if (positionProduction === -1) catP.push(this.#productions[positionProd]);
                    }

                }

                //Devolver el numero de producciones de la categoria
                return catP.length;
            }

            //metodo donde se desasigna uno o mas producciones de una categoria
            deassignCategory(category, ...productions) {
                //Validamos
                if (!category) throw new InvalidValueException("Category", category);
                if (!(category instanceof Category)) throw new TypeVideoSystemException("Category");

                let position = this.#getPositionCategory(category);
                if (position === -1) {
                    //En caso que no exista, se añade la nueva categoria
                    throw new CategoryIsNotExistsException();
                }
                //Asignamos la referencia, para trabajar con la categoria
                let cat = this.#categories[position];

                //Compruebo todos los productions que no sean null
                for (let prod of productions) {
                    if (prod == null) throw new InvalidValueException("Productions", prod);
                }

                for (let i = 0; i < productions.length; i++) {

                    let positionP = cat.productions.findIndex((productionElement) => productionElement.title === productions[i].title);

                    if (positionP >= 0) cat.productions.splice(positionP, 1);

                }

                //Devolver el numero de produciones de la categoria
                return cat.productions.length;
            }


            //DIRECTOR

            //metodo donde se asigna uno o mas producciones a un director/a
            assignDirector(director, ...productions) {
                //Validamos
                if (!director) throw new InvalidValueException("director", director);
                if (!(director instanceof Person)) throw new TypeVideoSystemException("director");

                let position = this.#getPositionDirector(director);
                if (position === -1) {
                    //En caso que no exista, se añade la nuevo/a director/a
                    position = (this.addDirector(director) - 1);
                }
                //Asignamos la referencia , para trabajar con el objeto
                let d = this.#directors[position];

                //Compruebo todos los productions que no sean null
                for (let prod of productions) {
                    if (prod == null) throw new InvalidValueException("Productions", prod);
                }

                for (let i = 0; i < productions.length; i++) {

                    //Obtenemos la posicion de la lista de Produccion 
                    let positionProd = this.#getPositionProduction(productions[i]);

                    //En caso que no exista, lo hacemos un push a la lista 
                    if (positionProd === -1) {

                        this.addProduction(productions[i]); //Metemos la Production en el sistema

                        //Asignar la produccion a la director
                        d.productions.push(productions[i]);
                    } else {
                        //Comprobamos que no esta asignado al director, para no haya duplicado
                        let positionProdDirector = d.productions.findIndex((productionElement) => productionElement.title === productions[i].title);

                        if (positionProdDirector === -1) {
                            //Asignar la produccion existente al director
                            d.productions.push(this.#productions[positionProd]);
                        }
                    }


                }

                //Devolver el numero de producciones del director/a
                return d.productions.length;
            }

            //metodo donde se desasigna uno o mas producciones de un director/a
            deassignDirector(director, ...productions) {
                //Validamos
                if (!director) throw new InvalidValueException("director", director);
                if (!(director instanceof Person)) throw new TypeVideoSystemException("director");

                let position = this.#getPositionDirector(director);
                if (position === -1) {
                    throw new PersonIsNotExistsException();
                }

                let d = this.#directors[position];

                //Compruebo todos los productions que no sean null
                for (let prod of productions) {
                    if (prod == null) throw new InvalidValueException("Productions", prod);
                }

                for (let i = 0; i < productions.length; i++) {

                    let positionP = d.productions.findIndex((productionElement) => productionElement.title === productions[i].title);

                    if (positionP >= 0) d.productions.splice(positionP, 1);

                }

                //Devolver el numero de produciones del director/a
                return d.productions.length;
            }

            //Metodo donde se asigna uno o varios producciones a un actor
            assignActor(actor, ...productions) {
                //Validamos
                if (actor === null) throw new InvalidValueException("actor", actor);

                let position = this.#getPositionActor(actor);
                if (position === -1) {
                    //En caso que no exista, se añade la nuevo/a actor
                    position = (this.addActor(actor) - 1);
                }
                //Asignamos la referencia , para trabajar con el objeto
                let act = this.#actors[position];

                //Compruebo todos los productions que no sean null
                for (let prod of productions) {
                    if (prod == null) throw new InvalidValueException("Productions", prod);
                }

                for (let i = 0; i < productions.length; i++) {

                    //Obtenemos la posicion de la lista de Produccion 
                    let positionProd = this.#getPositionProduction(productions[i]);

                    //En caso que no exista, lo hacemos un push a la lista 
                    if (positionProd === -1) {

                        this.addProduction(productions[i]);

                        //Asignar la produccion al actor
                        act.productions.push(productions[i]);
                    } else {
                        //Comprobamos que no esta asignado al actriz, para no haya duplicado
                        let positionProdActor = act.productions.findIndex((productionElement) => productionElement.title === productions[i].title);

                        if (positionProdActor === -1) {
                            //Asignar la produccion existente en la lista de produccion al actor, en caso que no tiene el actor
                            act.productions.push(this.#productions[positionProd]);

                        }
                    }
                }

                //Devolver el numero de producciones del actor que hemos trabajado
                return act.productions.length;
            }

            //Metodo donde se desasigna una o varias producciones al actor
            deassignActor(actor, ...productions) {
                //Validamos
                if (actor === null) throw new InvalidValueException("actor", actor);

                //Obtenemos la posicion del actor
                let position = this.#getPositionActor(actor);
                if (position === -1) {
                    //En caso que no exista
                    throw new PersonIsNotExistsException();
                }
                //Asignamos la referencia , para trabajar con el objeto
                let act = this.#actors[position];

                //Compruebo todos los productions que no sean null
                for (let prod of productions) {
                    if (prod == null) throw new InvalidValueException("Productions", prod);
                }

                //Recorremos los producciones, uno o varios
                for (let i = 0; i < productions.length; i++) {
                    //Buscamos la produccion en el actor
                    let positionP = act.productions.findIndex((productionElement) => productionElement.title === productions[i].title);
                    //Si se encuentra, eliminamos de la lista del actor, la produccion
                    if (positionP >= 0) act.productions.splice(positionP, 1);

                }
                //Devolver el numero de producciones del actor que hemos trabajado
                return act.productions.length;
            }

            //FACTORY METHOD 

            //FACTORY ACTOR
            getActor(name, lastname1, lastname2, born, picture) {
                //Validar datos de entrada, antes de realizar la busqueda
                if (!name) throw new InvalidValueException("name", name);
                //Buscamos en la lista de actores registrados
                let position = this.#actors.findIndex((actorElement) => actorElement.actor.name === name && actorElement.actor.lastname1 === lastname1);

                let actor;

                if (position === -1) {
                    //En caso que no esta registrado, creamos el objeto
                    actor = new Person(name, lastname1, lastname2, born, picture);
                } else {
                    //En caso que exista, devolver la misma
                    actor = this.#actors[position].actor;
                }
                //Devolvemos el objeto
                return actor;
            }

            //FACTORY DIRECTOR
            getDirector(name, lastname1, lastname2, born, picture) {
                //Validar datos de entrada, antes de realizar la busqueda
                if (!name) throw new InvalidValueException("name", name);
                //Buscamos en la lista de directores registrados
                let position = this.#directors.findIndex((directorElement) => directorElement.director.name === name && directorElement.director.lastname1 === lastname1);

                let director;

                if (position === -1) {
                    //En caso que no esta registrado, creamos el objeto
                    director = new Person(name, lastname1, lastname2, born, picture);
                } else {
                    //En caso que exista, devolver la misma
                    director = this.#directors[position].director;
                }
                //Devolvemos el objeto
                return director;
            }

            //FACTORY CATEGORIA
            getCategory(name, description = "") {
                //Validar datos de entrada, antes de realizar la busqueda
                if (!name) throw new InvalidValueException("name", name);
                //Buscamos en la lista de categorias registrados
                let position = this.#categories.findIndex((categoryElement) => categoryElement.category.name === name);

                let category;

                if (position === -1) {
                    //En caso que no esta registrado, creamos el objeto
                    category = new Category(name, description);
                } else {
                    //En caso que exista, devolver la misma
                    category = this.#categories[position].category;
                }
                //Devolvemos el objeto
                return category;
            }


            //FACTORY MOVIE
            getMovie(title, nationality, publication, synopsis, image, resource, locations) {
                //Validar datos de entrada, antes de realizar la busqueda
                if (!title) throw new InvalidValueException("title", title);

                let position = this.#productions.findIndex((proElement) => proElement.title === title);

                let movie;

                if (position === -1) {
                    //En caso que no esta registrado, creamos el objeto
                    movie = new Movie(title, nationality, publication, synopsis, image, resource, locations);
                } else {
                    //En caso que exista, devolver la misma
                    movie = this.#productions[position];
                }
                //Devolvemos el objeto
                return movie;
            }

            //FACTORY SERIE
            getSerie(title, nationality, publication, synopsis, image, resources, locations, seasons) {
                //Validar datos de entrada, antes de realizar la busqueda
                if (!title) throw new InvalidValueException("title", title);

                let position = this.#productions.findIndex((proElement) => proElement.title === title);

                let serie;

                if (position === -1) {
                    //En caso que no esta registrado, creamos el objeto
                    serie = new Serie(title, nationality, publication, synopsis, image, resources, locations, seasons);
                } else {
                    //En caso que exista, devolver la misma
                    serie = this.#productions[position];
                }
                //Devolvemos el objeto
                return serie;
            }

            //FACTORY USER 
            getUser(username, email, password) {
                //Validar datos de entrada, antes de realizar la busqueda
                if (!username) throw new InvalidValueException("username", username);

                // let position = this.#users.findIndex((userElement) => userElement.username === username && userElement.email === email);
                let position = this.#users.findIndex((userElement) => userElement.username === username);
                let user;

                if (position === -1) {
                    //En caso que no esta registrado, creamos el objeto
                    user = new User(username, email, password);
                } else {
                    user = this.#users[position];
                }

                return user;

            }

            //Metodo donde devuelve la produccion
            getProduction(title) {
                //Validar datos de entrada, antes de realizar la busqueda
                if (!title) throw new InvalidValueException("title", title);

                let position = this.#productions.findIndex((proElement) => proElement.title === title);

                let production = 0;

                if (position !== -1) {

                    //En caso que exista, devolver
                    production = this.#productions[position];
                }
                //Devolvemos el objeto
                return production;
            }

            //getCast
            //Devuelve todos los actores que tiene una relacion con una produccion
            * getCast(production) {
                if (production === null) throw new InvalidValueException("production", productions);

                for (let act of this.#actors) {
                    let encontrado;
                    let i = 0;
                    while (i < act.productions.length && !encontrado) {
                        if (act.productions[i].title === production.title) {
                            encontrado = act.actor;
                        }
                        i++; //incrementamos 
                    }
                    if (encontrado) yield encontrado;
                }
            }

            //Devuelve todas las producciones de un director
            * getProductionsDirector(director) {
                //Validamos
                if (director === null) throw new InvalidValueException("director", director);

                let position = this.#getPositionDirector(director);

                if (position >= 0) {
                    for (let produccion of this.#directors[position].productions) {
                        yield produccion;
                    }
                }
            }

            //getProductionsActor 
            //Devuelve todas las producciones del actor
            * getProdutionsActor(actor) {
                if (!actor) throw new InvalidValueException("Actor", null);

                let position = this.#getPositionActor(actor);
                if (position >= 0) {
                    //Recorremos las producciones
                    for (let produccion of this.#actors[position].productions) {
                        yield produccion;
                    }
                }
            }

            //Devuelve el director de la produccion
            * getDirectorsProdutions(produccion) {
                if (!produccion) throw new InvalidValueException("produccion", null);

                let position = this.#getPositionProduction(produccion);
                if (position >= 0) {
                    //Recorremos las producciones
                    for (let director of this.#directors) {
                        for (const produccionDirector of director.productions) {
                            if (produccion === produccionDirector) {
                                yield director.director;
                            }
                        }
                    }
                }
            }

            //Devuelve todas las producciones de una categoria
            * getProductionsCategory(category) {
                //Validamos
                if (category === null) throw new InvalidValueException("category", category);

                let position = this.#getPositionCategory(category);

                if (position >= 0) {
                    for (let produccion of this.#categories[position].productions) {
                        yield produccion;
                    }
                }
            }

            //Devuelve todas las producciones de la categoria por defecto
            * getProductionsCategoryDefault() {
                let position = 0;

                for (let produccion of this.#categories[position].productions) {
                    yield produccion;
                }
            }

            * getDirectorsAvailableProd(produccion) {
                if (!produccion) throw new InvalidValueException("produccion", null);

                for (const director of this.#directors) {
                    let d = director.director;

                    let existe = false;
                    for (let directorAssign of this.getDirectorsProdutions(produccion)) {
                        if (directorAssign.name == d.name && directorAssign.lastname1 == d.lastname1) {
                            existe = true;
                        }
                    }
                    if (!existe) yield d;
                }
            }

            * getActorsAvailableProd(produccion) {
                if (!produccion) throw new InvalidValueException("produccion", null);

                for (const actor of this.#actors) {
                    let a = actor.actor;

                    let existe = false;
                    for (let actorAssign of this.getCast(produccion)) {
                        if (actorAssign.name == a.name && actorAssign.lastname1 == a.lastname1) {
                            existe = true;
                        }
                    }
                    if (!existe) yield a;
                }
            }

            generatorJSON() {

                let ObjLitToJSON = {
                    Producciones: [],
                    Actores: [],
                    Categorias: [],
                    Directores: [],
                    Users: []
                };

                for (let produccion of this.productions) {

                    let productionObjLit;
                    //Propiedades comunes
                    productionObjLit = {
                        title: produccion.title,
                        nationality: produccion.nationality,
                        publication: produccion.publication,
                        synopsis: produccion.synopsis,
                        image: produccion.image
                    }
                    if (produccion instanceof Movie) {
                        //En caso de pelicula
                        productionObjLit.resource = produccion.resource;
                        productionObjLit.locations = [];
                        productionObjLit.type = "Movie";

                    } else if (produccion instanceof Serie) {
                        //En caso de Serie
                        productionObjLit.resources = [];
                        productionObjLit.locations = [];
                        productionObjLit.seasons = produccion.seasons;
                        productionObjLit.type = "Serie";

                        for (let resource of produccion.resources) {
                            productionObjLit.resources.push({
                                duration: resource.duration,
                                link: resource.link
                            });
                        }
                    }
                    //coordinate
                    for (let coordinate of produccion.locations) {
                        productionObjLit.locations.push({
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude
                        });
                    }
                    //Metemos el objeto en la lista de producciones
                    ObjLitToJSON.Producciones.push(productionObjLit);
                }

                //Iteramos los actores, creamos el objeto literal con la relacion de producciones y meterlo en array del objeto literal
                for (let actor of this.#actors) {
                    let actorObjLit = {
                        actor: {
                            name: actor.actor.name,
                            lastname1: actor.actor.lastname1,
                            lastname2: actor.actor.lastname2,
                            born: actor.actor.born,
                            picture: actor.actor.picture
                        },
                        productions: []
                    }

                    for (let prod of actor.productions) {
                        actorObjLit.productions.push(prod.title);
                    }
                    ObjLitToJSON.Actores.push(actorObjLit);
                }
                //Iteramos los directores, creamos el objeto literal con la relacion de producciones y meterlo en array del objeto literal
                for (let director of this.#directors) {
                    let directorObjLit = {
                        director: {
                            name: director.director.name,
                            lastname1: director.director.lastname1,
                            lastname2: director.director.lastname2,
                            born: director.director.born,
                            picture: director.director.picture
                        },
                        productions: []
                    }

                    for (let prod of director.productions) {
                        directorObjLit.productions.push(prod.title);
                    }
                    ObjLitToJSON.Directores.push(directorObjLit);
                }

                //Iteramos los categorias, creamos el objeto literal con la relacion de producciones y meterlo en array del objeto literal
                for (let categoria of this.#categories) {
                    let categoriaObjLit = {
                        category: {
                            name: categoria.category.name,
                            description: categoria.category.description
                        },
                        productions: []
                    }

                    for (let prod of categoria.productions) {
                        categoriaObjLit.productions.push(prod.title);
                    }
                    ObjLitToJSON.Categorias.push(categoriaObjLit);
                }
                //Iteramos los usuarios, creamos el objeto literal y meterlo en array del objeto literal
                for (let user of this.#users) {
                    let userObjLit = {
                        username: user.username,
                        email: user.email,
                        password: user.password
                    }
                    ObjLitToJSON.Users.push(userObjLit);

                }
                //Unimos los dos objetos literales (actuales y borrados) y convertimos en JSON 
                return JSON.stringify(Object.assign(ObjLitToJSON,this.#elementosEliminados));
            }
        }
        let vs = new VideoSystem(name);
        Object.freeze(vs);
        return vs; //Devolvemos el objeto VideoSystem creado por primera vez y unico.
    }
    return {
        getInstance: function (name) {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(name); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    }
})();


export default VideoSystem;