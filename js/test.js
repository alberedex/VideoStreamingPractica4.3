"use strict";

import { Person, Category, Resource, Production, Movie, Serie, User, Coordinate } from './ObjetosEntidad.js';
import VideoSystem from './VideoSystemObject.js';

function test() {


    function showProductionsDirector(director) {
        for(let production of vs.getProductionsDirector(director)){
            console.log(production.toString());
        }
    }

    function showProductionsActor(actor) {
        for(let production of vs.getProdutionsActor(actor)){
            console.log(production.toString());
        }
    }

    function showActorsProductions(production) {
        for(let actor of vs.getCast(production)){
            console.log(actor.toString());
        }
    }

    let user = new Person("Alberto", "Redondo", "","26/2/2001", "");

    let category1 = new Category("Comedia", "");
    let category2 = new Category("Terror", "");

    let resource1 = new Resource(85,"/resource/1");
    let resource2 = new Resource(124,"/resource/1");

    try {
        let production = new Production("prueba","Española","15/1/2022","","");
    } catch (error) {
        console.error(error.message);
    }

    let movie1 = new Movie("Los crímenes de la academia","USA","23/12/2022","Un veterano detective","portada.png",new Resource(85,"movie.mp4"));

    let serie1 = new Serie("El vecino","España","31/12/2019","Un vecino superheroe","portadaVecino.png",[new Resource(15,"1.mp4"),new Resource(25,"2.mp4"),new Resource(45,"3.mp4")],"",2);

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

    //recorremos las categorias registradas en el sistema
    for (let categoria of vs.categories) {
        console.log(categoria);
    }
    
    //Añadir produccion 
    console.log(vs.addProduction(movie1));
    console.log(vs.addProduction(serie1));
    
    console.log(vs.removeProduction(movie1));

    //recorremos las produccion registradas en el sistema
    for (let categoria of vs.productions) {
        console.log(categoria);
    }

    //ACTORS 

    let actor1 = new Person("Christian", "Bale", "","30/1/1974", "");
    let actor2 = new Person("Harry", "Melling", "","13/4/1989", "");

    console.log(vs.addActor(actor1));
    console.log(vs.addActor(actor2));
    
    console.log(vs.removeActor(actor1));
    console.log(vs.addActor(actor1));

    for(let actor of vs.actors){
        console.log(actor);
    }


    //Directors

    let director1 = new Person("Scott","Cooper","","20/5/1970","fotoScott.jpg");
    let director2 = new Person("Nacho","Vigalondo","Palacios","06/4/1977","fotoNacho.jpg");

    console.log(vs.addDirector(director1));
    console.log(vs.addDirector(director2));

    for (let director of vs.directors) {
        console.log(director);
    }

    let user1 = new User("alberedex","2001rs@gmail.com","pass1234");

    console.log(user.toString());
    director1.born = "01/3/2001";
    console.log(director1);


    //Asignacion Categorias
    vs.assignCategory(category1,movie1,serie1);
    
    
    //Desasignacion Categorias
    vs.deassignCategory(category1,serie1);

    //Asignacion Producciones a un director
    vs.assignDirector(director1,movie1);
    vs.assignDirector(director1,serie1);
    
    showProductionsDirector(director1);
    
    vs.deassignDirector(director1,movie1);
    vs.deassignDirector(director1,movie1);
    
    
    //Asignacion Actores
    let moviePrueba = new Movie("Los crímenes de la academia","USA","23/12/2022","Un veterano detective","portada.png",new Resource(85,"movie.mp4"));
    console.log(vs.assignActor(actor1,serie1));
    console.log(vs.assignActor(actor1,movie1));
    console.log(vs.assignActor(actor2,moviePrueba));
    
    showProductionsActor(actor1);

    // console.log(vs.deassignActor(actor1,serie1));
    console.log("Actores de una Production");
    showActorsProductions(movie1);
}

window.onload = test();