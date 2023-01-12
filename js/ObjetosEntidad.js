"use strict";
import {
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    AbstractClassException } from './js/Exception.js';

//Objeto Person, para identificar los datos de una persona.
class Person{
    //Propiedades
    #name; //Nombre de la persona
    #lastname1; //Primer apellido
    #lastname2; //Segundo apellido
    #born; //Fecha de nacimiento
    #picture; //String de la ruta de la imagen

    constructor(name,lastname1,lastname2,born,picture){
        //Validar datos de entrada
        if(!name) throw new InvalidValueException("name",name);
        if(!lastname1) throw new InvalidValueException("lastname1",lastname1);
        if(isNaN(Date.parse(born))) throw new InvalidValueException("born",born);

        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;

    }
    //Getter y setter de name 
    get name(){
        return this.#name;
    }
    
    set name(nameNew){
        this.#name = nameNew;
    }
    
    //Getter y setter de lastname1
    get lastname1(){
        return this.#lastname1;
    }

    set lastname1(name){
        this.#lastname1 = name;
    }

    //Getter y setter de lastname2
    get lastname2(){
        return this.#lastname2;
    }

    set lastname2(name){
        this.#lastname2 = name;
    }

    //Getter y setter de born
    get born(){
        return this.#born;
    }

    set born(name){
        this.#born = name;
    }

    //Getter y setter de picture
    get picture(){
        return this.#picture;
    }

    set picture(name){
        this.#picture = name;
    }

    //Metodo toString
    toString(){
        return "Name: "+this.#name+", LastName: "+this.#lastname1+" "+this.#lastname2+", Born: "+this.#born+", Picture: "+this.#picture;
    }
}

//Objeto Category, para identificar la categoria y construir la estructura
class Category {
    #name;
    #description;

    constructor(name, description) {
        //Validar datos de entrada
        if (!name) throw new InvalidValueException("name", name);

        this.#name = name;
        this.#description = description;
    }

    //Getter y setter de name
    get name() {
        return this.#name;
    }

    set name(name) {
        if (!name) throw new InvalidValueException("name", name);
        this.#name = name;
    }
    
    //Getter y setter de description
    get description() {
        return this.#description;
    }

    set description(descriptionN) {
        if (!descriptionN) throw new InvalidValueException("description", description);
        this.#description = description;
    }

    //Metodo toString
    toString(){
        return "name: "+this.#name+", description: "+this.#description;
    }
}

//Objeto Resource, donde se representa un recuso audiovisual
class Resource {
    #duration;
    #link;

    constructor(duration,link) {
        if (duration <= 0) throw new InvalidValueException("duration", duration);
        if (!link) throw new InvalidValueException("link",link);

        this.#duration = duration;
        this.#link = link;
    }

    //Metodo toString
    toString(){
        return "Duration: "+this.#duration+", Link: "+this.#link;
    }
}

//Objeto Production, es clase ABSTRACTA, es para Movie y Series
class Production {
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    constructor(title,nationality,publication,synopsis,image){
        //Comprobación que no sea Production que es clase abstracta.
		if ((new.target === Production)) throw new AbstractClassException("Production");

        if (!title) throw new InvalidValueException("title",title);
        if(isNaN(Date.parse(publication))) throw new InvalidValueException("publication",publication);

        this.#title = title;
        this.#nationality = nationality;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;
    }

    get title(){
        return this.#title;
    }

    get nationality(){
        return this.#nationality;
    }

    get publication(){
        return this.#publication;
    }

    get synopsis(){
        return this.#synopsis;
    }

    get image(){
        return this.#image;
    }

    toString(){
        return "Title: "+this.#title+", Nationality: "+this.#nationality+", Publication: "+this.#publication+", Synopsis: "+this.#synopsis+", Image: "+this.#image
    }
}

//Objeto Movie que hereda de Production, representa de un recuso Pelicula
class Movie extends Production{
    #resource;
    #locations;

    constructor(title,nationality,publication,synopsis,image,resource,locations) {
        super(title,nationality,publication,synopsis,image);

        this.#resource = resource;
        this.#locations = locations;

    }

    //Getter y setter de resource
    get resource(){
        return this.#resource;
    }

    set resource(resourseN){

        this.#resource = resourseN;
    }

    
    //Getter y setter de locations
    get locations(){
        return this.#locations;
    }

    set locations(locationsN){

        this.#locations = locationsN;
    }

    toString(){
        return this.#resource.toString()+this.#locations.toString();
    }
}

//Objeto Serie que hereda de Production, representa de un recuso Serie
class Serie extends Production{
    #resources;
    #locations;
    #seasons;

    constructor(title,nationality,publication,synopsis,image,resources,locations,seasons) {
        super(title,nationality,publication,synopsis,image);

        this.#resources = resources;
        this.#locations = locations;
        this.#seasons = seasons;

    }

    //Getter y setter de resource
    get resource(){
        return this.#resource;
    }

    set resource(resourseN){

        this.#resource = resourseN;
    }

    
    //Getter y setter de locations
    get locations(){
        return this.#locations;
    }

    set locations(locationsN){

        this.#locations = locationsN;
    }

    toString(){
        return this.#resource.toString()+this.#locations.toString();
    }
}

//Objeto User, que representa un usuario
class User{
    #username;
    #email;
    #password;

    constructor(username,email,password) {
        if (!username) throw new InvalidValueException("username",username);
        if (!email) throw new InvalidValueException("email",email);
        if (!password) throw new InvalidValueException("password",password);

        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    get username(){
        return this.#username;
    }

    //Metodo toString
    toString(){
        return "Username: "+this.#username+", email: "+this.#email;
    }
}

//Objeto Coordinate, que representa las cordenadas de una ubicacion
class Coordinate{
    #latitude;
    #longitude;

    constructor(latitude,longitude) {
        if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) throw new InvalidValueException("latitude",latitude);
        if (Number.isNaN(longitude)  || longitude < -90 || longitude > 90) throw new InvalidValueException("longitude",longitude);

        this.#latitude = latitude;
        this.#longitude = longitude;

    }

    get latitude(){
        return this.#latitude;
    }

    get longitude(){
        return this.#longitude;
    }

    toString(){
        return "Latitude: "+this.#latitude+", Longitude: "+this.#longitude;
    }
}