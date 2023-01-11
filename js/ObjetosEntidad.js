"use strict";
//Objeto Person, para identificar los datos de una persona.
class Person{
    //Propiedades
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name,lastname1,lastname2,born,picture){
        //Validar datos de entrada

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