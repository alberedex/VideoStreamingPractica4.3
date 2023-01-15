"use strict";

import { Person, Category, Resource, Production, Movie, Serie, User, Coordinate } from './ObjetosEntidad.js';
import VideoSystem from './VideoSystemObject.js';

function test() {
    let user = new Person("Alberto", "Redondo", "", new Date(2001, 1, 26), "");

    let category1 = new Category("Comedia", "");
    let category2 = new Category("Terror", "");

    let resource1 = new Resource(85,"/resource/1");
    let resource2 = new Resource(124,"/resource/1");

    try {
        let production = new Production("prueba","Española",new Date(2022,2,15),"","");
    } catch (error) {
        console.error(error.message);
    }

    let movie1 = new Movie("Los crímenes de la academia","USA",new Date(2022,11,23),"Un veterano detective","portada.png","movie.mp4");

    let serie1 = new Serie("El vecino","España",new Date(2019,11,31),"Un vecino superheroe","portadaVecino.png",["1.mp4","2.mp4","3.mp4"],"",2);

    console.log(movie1);

    console.log(serie1);

    

    let vs = VideoSystem.getInstance();
    console.log(vs);

    vs.name = "Plataforma VideoSystem";
    console.log(vs);

    //Añadir categorias
    vs.addCategory(category1);
    vs.addCategory(category2);

    //Añadir una existente
    try {
        vs.addCategory(category1);
    } catch (error) {
        console.error(error.message);
    }

    //Añadir produccion 
    console.log(vs.addProduction(movie1));
    console.log(vs.addProduction(serie1));
    
    console.log(vs.removeProduction(movie1));

    //recorremos las categorias registradas en el sistema
    for (let categoria of vs.categories) {
        console.log(categoria);
    }


    let user1 = new User("alberedex","2001rs@gmail.com","pass1234");

    console.log(user.toString());

}

window.onload = test();