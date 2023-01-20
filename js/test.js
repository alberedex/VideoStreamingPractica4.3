"use strict";

import {Resource, Production, Coordinate } from './ObjetosEntidad.js';
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

    let vs = VideoSystem.getInstance();
    console.log(vs);

    vs.name = "Plataforma VideoSystem";
    console.log(vs);

    console.log("************ TESTEO PERSON ************");

    //ACTORS 

    let actor1 = vs.getActor("Christian", "Bale", "Philip", "30/1/1974", "");
    let actor2 = vs.getActor("Harry", "Melling", "", "13/4/1989", "imagesActor/harryMelling.jpg"); //Los crimenes de la academia

    let actor3 = vs.getActor("Paola", "Núñez", "Rivas", "08/4/1978", "imagesActor/paolaRivas.jpg"); //Resident Evil

    let actor4 = vs.getActor("Ryan", "Rodney", "Reynold", "23/10/1976", "imagesActor/RyanReynold.jpg"); //Deadpool

    let actor5 = vs.getActor("Adam", "Richard", "Sandler", "09/9/1966", "imagesActor/adamRichardSandler.jpg"); 
    let actor6 = vs.getActor("Jennifer", "Joanna", "Aniston", "11/2/1969", "imagesActor/jAniston.jpg"); //Murder Mystery

    let actor7 = vs.getActor("Joaquin", "Gutiérrez", "Ylla", "27/3/1981", "imagesActor/quimGuti.jpg"); //El vecino

    console.log("** PERSON toString");
    console.log(actor1.toString());

    try{
        let actor = vs.getActor("Alberto", "Redondo", "","35/2/2001", "");
        //Error: The paramenter born has an invalid value. (born: 35/2/2001)
    }catch(error){
        console.error(error.message);
    }


    let resource1 = new Resource(85,"/resource/1");
    let resource2 = new Resource(124,"/resource/1");

    try {
        let production = new Production("prueba","Española","15/1/2022","","");
    } catch (error) {
        console.error(error.message);
    }

    //testeo factory categoria
    let category1 = vs.getCategory("Comedia", "Obra que presenta una mayoría de escenas y situaciones humorísticas o festivas");
    let category2 = vs.getCategory("Terror", "Al espectador sensaciones de pavor, terror, miedo, disgusto, repugnancia, horror, incomodidad o preocupación.");
    
    //testeo factory production
    let movie1 = vs.getMovie("Los crímenes de la academia","USA","23/12/2022","Un veterano detective","portada.png",new Resource(85,"movie/CrimenesDeLaAcademia.mp4"));
    let movie2 = vs.getMovie("Murder Mystery","USA","14/6/2019","Un policía de Nueva York y su mujer se van de vacaciones a Europa pero terminan acusados de asesinato","murderMystery.png",new Resource(97,"movie/movieMurderM.mp4"));
    let movie3 = vs.getMovie("Deadpool","USA","12/2/2016","Wade Wilson, tras ser sometido a un cruel experimento científico, adquiere poderes especiales","DeadpoolCartel.png",new Resource(109,"movie/dealpool.mp4"));

    let serie1 = vs.getSerie("El vecino","España","31/12/2019","Un vecino superheroe","portadaVecino.png",[new Resource(32,"serie/Episode1.mp4"),new Resource(24,"serie/LaRedSocial.mp4"),new Resource(31,"serie/dia.mp4")],"",2);
    let serie2 = vs.getSerie("Resident Evil","Estados Unidos","14/7/2022","Un virus mortal causara un apocalipsis global","portadaREvil.png",[new Resource(60,"serie/Bienvenidos_a_New_Raccoon_City.mp4"),new Resource(48,"serie/Lo_malo_conocido.mp4"),new Resource(45,"serie/La_luz.mp4"),new Resource(53,"serie/La_transformación.mp4")],"",2);
    
    console.log("** Category toString");
    console.log(category1.toString());
    
    console.log("** Movie toString");
    console.log(movie1.toString());
    
    console.log("** Serie toString");
    console.log(serie1.toString());

    //Añadir categorias
    vs.addCategory(category1);
    vs.addCategory(category2);

    //Añadir una existente
    try {
        console.log("**Añadir una categoria ya existente");
        vs.addCategory(category1);
        //Error: The Category is exists.
    } catch (error) {
        console.error(error.message);
    }

    //recorremos las categorias registradas en el sistema
    for (let categoria of vs.categories) {
        console.log(categoria);
    }
    
    //Añadir produccion 
        //Peliculas
    console.log("");
    console.log("************ AÑADIR PRODUCCION ************");
    console.log(vs.addProduction(movie1));
    console.log(vs.addProduction(movie2));
    console.log(vs.addProduction(movie3));
        
        //Series
    console.log(vs.addProduction(serie1));
    console.log(vs.addProduction(serie2));
    
    try {
        console.log("**Añadir una produccion ya existente");
        console.log(vs.addProduction(serie2));
        //Error: The Production is exists.
    } catch (error) {
        console.error(error.message);
    }
    console.log("**Borrar una produccion existente");
    console.log(vs.removeProduction(movie1));
    
    try{
        console.log("**Borrar una produccion no existente, despues lo añadimos para realizar más test");
        console.log(vs.removeProduction(movie1));
        //Error: The Production is not exists.
    }catch(error){
        console.error(error.message);
    }

    vs.addProduction(movie1);

    //recorremos las produccion registradas en el sistema
    console.log ("************ Mostramos todas las producciones registradas. ************");
    for (let categoria of vs.productions) {
        console.log(categoria);
    }

    console.log("************ AÑADIR ACTOR ************");
    
    console.log(vs.addActor(actor1));
    console.log(vs.addActor(actor2));
    console.log(vs.addActor(actor3));
    console.log(vs.addActor(actor4));
    console.log(vs.addActor(actor5));
    console.log(vs.addActor(actor6));
    console.log(vs.addActor(actor7));
    
    try {
        // console.log(vs.addActor(actor1));
    } catch (error) {
        console.error(error.message);
    }

    //recorremos las produccion registradas en el sistema
    console.log ("************ Mostramos todos los actores registrados/as. ************");
    for(let actor of vs.actors){
        console.log(actor);
    }


    //Directors
    console.log("************ AÑADIR DIRECTORES ************");

    let director1 = vs.getDirector("Scott","Cooper","","20/5/1970","fotoScott.jpg"); 
    let director2 = vs.getDirector("Nacho","Vigalondo","Palacios","06/4/1977","fotoNacho.jpg");
    
    let director3 = vs.getDirector("Andrew","Dabb","","25/6/1985","fotoADabb.jpg");
    let director4 = vs.getDirector("Kyle","Newacheck","","23/1/1984","fotoKyleN.jpg");
    let director5 = vs.getDirector("Tim","Miller","","10/10/1964","fotoTimMiller.jpg");
    
    console.log(vs.addDirector(director1));
    console.log(vs.addDirector(director2));
    console.log(vs.addDirector(director3));
    console.log(vs.addDirector(director4));
    console.log(vs.addDirector(director5));
    
    //recorremos las produccion registradas en el sistema
    console.log ("************ Mostramos todos los directores registrados. ************");
    for (let director of vs.directors) {
        console.log(director);
    }


    console.log("************ AÑADIR USERS ************");

    let user1 = vs.getUser("alberedex","2001rs@gmail.com","pass1234");
    let user2 = vs.getUser("luciaVillalba","luciacasa@hotmail.com","passSupercomplicado");
    let user3 = vs.getUser("Carlos123","carlos_alvarez@gmail.com","abcd1234");

    console.log(vs.addUser(user1));
    console.log(vs.addUser(user2));
    console.log(vs.addUser(user3));

    try {
        let userPrueba = vs.getUser("UsuarioPrueba","emailnoescorrecto.com","abcd1234");
    } catch (error) {
        console.error(error.message);
    }

    console.log("************ ASIGNACION PRODUCCIONES A UNA CATEGORIA ************");
    //Asignacion Categorias
    console.log(vs.assignCategory(category1,serie1,movie2,movie3));

    console.log(vs.assignCategory(category2,serie2));
    console.log(vs.assignCategory(category2,movie1));

    
    //Desasignacion Categorias
    vs.deassignCategory(category1,serie1);
    console.log("************ ASIGNACION PRODUCCIONES A UN DIRECTOR ************");
    //Asignacion Producciones a un director
    vs.assignDirector(director1,movie1);
    vs.assignDirector(director1,serie1);
    vs.assignDirector(director2,serie1);
    vs.assignDirector(director3,serie2);
    vs.assignDirector(director4,movie2);
    vs.assignDirector(director5,movie3);
    
    console.log("Mostrar producciones del director: "+director1.name);
    showProductionsDirector(director1);
    
    console.log("Mostrar producciones del director: "+director3.name);
    showProductionsDirector(director3);


    vs.deassignDirector(director1,movie1);
    vs.deassignDirector(director1,movie1);
    
    console.log("************ ASIGNACION PRODUCCIONES A UN ACTOR/ACTRIZ ************");
    //Asignacion Actores
    console.log(vs.assignActor(actor1,movie1));
    console.log(vs.assignActor(actor2,movie1));
    console.log(vs.assignActor(actor3,serie2));
    console.log(vs.assignActor(actor4,movie3));
    console.log(vs.assignActor(actor5,movie2));
    console.log(vs.assignActor(actor1,movie2));
    console.log(vs.assignActor(actor6,movie2));
    console.log(vs.assignActor(actor7,serie1));

    console.log("Mostrar producciones del actor: "+actor1.name);
    showProductionsActor(actor1);
    
    console.log("");
    
    // console.log(vs.deassignActor(actor1,serie1));
    console.log("Actores de una Production: "+movie1.title);
    showActorsProductions(movie1);
}

window.onload = test();