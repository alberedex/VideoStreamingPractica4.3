"use strict";

import {Resource, Coordinate } from './ObjetosEntidad.js';
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
    
    function showProductionsCategory(category) {
        for(let production of vs.getProductionsCategory(category)){
            console.log(production.toString());
        }
    }

    let vs = VideoSystem.getInstance();
    console.log(vs.name);
    //Asignamos nombre a la plataforma
    vs.name = "Plataforma VideoSystem";
    console.log(vs.name);

    console.log("************ TESTEO PERSON ************");

    //ACTORS 

    let actor1 = vs.getActor("Christian", "Bale", "Philip", "30/01/1974", "");
    let actor2 = vs.getActor("Harry", "Melling", "", "13/04/1989", "/imagesActor/harryMelling.jpg"); //Los crimenes de la academia

    let actor3 = vs.getActor("Paola", "Núñez", "Rivas", "08/04/1978", "/imagesActor/paolaRivas.jpg"); //Resident Evil

    let actor4 = vs.getActor("Ryan", "Rodney", "Reynold", "23/10/1976", "/imagesActor/RyanReynold.jpg"); //Deadpool

    let actor5 = vs.getActor("Adam", "Richard", "Sandler", "09/09/1966", "/imagesActor/adamRichardSandler.jpg"); 
    let actor6 = vs.getActor("Jennifer", "Joanna", "Aniston", "11/02/1969", "/imagesActor/jAniston.jpg"); //Murder Mystery

    let actor7 = vs.getActor("Joaquin", "Gutiérrez", "Ylla", "27/03/1981", "/imagesActor/quimGuti.jpg"); //El vecino
    
    actor1.picture = "/imagesActor/holhola.jpg";

    console.log("** PERSON toString");
    console.log(actor1.toString());

    try{
        let actor = vs.getActor("", "Redondo", "","35/02/2001", "");
        
        //Error: The paramenter name has an invalid value.
    }catch(error){
        console.error(error.message);
    }
    
    try{
        let actor = vs.getActor("Alberto", "Redondo", "","35/02/2001", "");
        //Error: The paramenter born has an invalid value. (born: 35/2/2001)
    }catch(error){
        console.error(error.message);
    }
    
    try{
        actor1.picture = "/imagesActor/pruebaSinExtenxion";
        //Error: The paramenter picture has an invalid value. (picture: /imagesActor/holhola)
    }catch(error){
        console.error(error.message);
    }
    
    let resource1 = new Resource(85,"/resource/1.mp4");
    let resource2 = new Resource(124,"/resource/1.mp4");

    // Al hacer factory y por empaquetador de modulos , el test.js no tiene acceso a Production para probar la clase abstracta

    // try {
    //     let production = new Production("prueba","Española","15/1/2022","","");
    // } catch (error) {
    //     console.error(error.message);
    // }

    //testeo factory categoria
    let category1 = vs.getCategory("Comedia", "Obra que presenta una mayoría de escenas y situaciones humorísticas o festivas");
    let category2 = vs.getCategory("Terror", "Al espectador sensaciones de pavor, terror, miedo, disgusto, repugnancia, horror, incomodidad o preocupación.");
    
    try {
        let category = vs.getCategory("","");
        //Error: The paramenter name has an invalid value. (name: )
    } catch (error) {
        console.error(error.message);
    }

    //testeo factory production
    let movie1 = vs.getMovie("Los crímenes de la academia","USA","23/12/2022","Un veterano detective","portada.png",new Resource(85,"/movie/CrimenesDeLaAcademia.mp4"));
    let movie2 = vs.getMovie("Murder Mystery","USA","14/06/2019","Un policía de Nueva York y su mujer se van de vacaciones a Europa pero terminan acusados de asesinato","murderMystery.png",new Resource(97,"/movie/movieMurderM.mp4"));
    let movie3 = vs.getMovie("Deadpool","USA","12/02/2016","Wade Wilson, tras ser sometido a un cruel experimento científico, adquiere poderes especiales","DeadpoolCartel.png",new Resource(109,"/movie/dealpool.mp4"));

    let serie1 = vs.getSerie("El vecino","España","31/12/2019","Un vecino superheroe","portadaVecino.png",[new Resource(32,"/serie/Episode1.mp4"),new Resource(24,"/serie/LaRedSocial.mp4"),new Resource(31,"/serie/dia.mp4")],"",2);
    let serie2 = vs.getSerie("Resident Evil","Estados Unidos","14/07/2022","Un virus mortal causara un apocalipsis global","portadaREvil.png",[new Resource(60,"/serie/Bienvenidos_a_New_Raccoon_City.mp4"),new Resource(48,"/serie/Lo_malo_conocido.mp4"),new Resource(45,"/serie/La_luz.mp4"),new Resource(53,"/serie/La_transformacion.mp4")],"",2);
    
    serie2.addResources(new Resource(10,"/serie/insertadoDespues.mp4"));

    //Creacion objetos de Coordinate
    let coor1 = new Coordinate(38.8951,-77.0364);
    let coor2 = new Coordinate(38.8951,-77.0364);
    let coor3 = new Coordinate(42.5412,-44.5214);

    try {
        let coord2 = new Coordinate(-95.2544,85.1245);
        //Error: The paramenter latitude has an invalid value. (latitude: -95.2544)
    } catch (error) {
        console.error(error.message);
    }
    console.log("**Añadir Localizaciones tras el objeto movie ya creado");
    console.log(movie1.addLocations(coor2));
    console.log(movie1.addLocations(coor3));

    console.log("** Category toString");
    console.log(category1.toString());
    
    console.log("** Movie toString");
    console.log(movie1.toString());
    
    console.log("** Serie toString");
    console.log(serie1.toString());

    console.log("** Coordinate toString");
    console.log(coor1.toString());

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

    //Eliminar una no existente
    try {
        vs.removeCategory(category1);
        console.log("**Eliminar una categoria no existente");
        vs.removeCategory(category1);
        //Error: The Category is not exists.
    } catch (error) {
        console.error(error.message);
    }
    console.log("Volvemos a asigna la categoria, para ir probando");
    vs.addCategory(category1);

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
        console.log("**Añadir actor ya existente");
        console.log(vs.addActor(actor1));
        //Error: The Person is exists.
    } catch (error) {
        console.error(error.message);
    }

    try {
        console.log("**Eliminar actor no existente");
        vs.removeActor(actor1);
        console.log(vs.removeActor(actor1));
        //Error: The Person is not exists.
    } catch (error) {
        console.error(error.message);
    }
    //Volvemos a meter al sistema el actor
    console.log(vs.addActor(actor1));

    //recorremos las produccion registradas en el sistema
    console.log ("************ Mostramos todos los actores registrados/as. ************");
    for(let actor of vs.actors){
        console.log(actor);
    }


    //Directors
    console.log("************ AÑADIR DIRECTORES ************");

    let director1 = vs.getDirector("Scott","Cooper","","20/05/1970","/director/fotoScott.jpg"); 
    let director2 = vs.getDirector("Nacho","Vigalondo","Palacios","06/04/1977","/director/fotoNacho.jpg");
    
    let director3 = vs.getDirector("Andrew","Dabb","","25/06/1985","/director/fotoADabb.jpg");
    let director4 = vs.getDirector("Kyle","Newacheck","","23/01/1984","/director/fotoKyleN.jpg");
    let director5 = vs.getDirector("Tim","Miller","","10/10/1964","/director/fotoTimMiller.jpg");
    
    console.log(vs.addDirector(director1));
    console.log(vs.addDirector(director2));
    console.log(vs.addDirector(director3));
    console.log(vs.addDirector(director4));
    console.log(vs.addDirector(director5));

    try {
        console.log("**Añadir director ya existente");
        console.log(vs.addDirector(director5));
        //Error: The Person is exists.
    } catch (error) {
        console.error(error.message)
    }
    
    try {
        console.log("**Eliminar director no existente");
        vs.removeDirector(director5);
        console.log(vs.removeDirector(director5));
        //Error: The Person is not exists.
    } catch (error) {
        console.error(error.message)
    }
    
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
        console.log("**Crear cuenta con mal username");
        let userPrueba = vs.getUser("Usuario Prueba","email@gmail.com","abcd1234");
    } catch (error) {
        console.error(error.message);
    }
    try {
        console.log("**Crear cuenta con mal correo electronico");
        let userPrueba = vs.getUser("UsuarioPrueba","emailnoescorrecto.com","abcd1234");
    } catch (error) {
        console.error(error.message);
    }
    
    try {
        console.log("**Introducir usuario ya existente");
        console.log(vs.addUser(user1));
        //Error: The username is exists.
    } catch (error) {
        console.error(error.message);
    }

    try {
        console.log(vs.removeUser(user1));
        console.log("**Introducir usuario no existente");
        console.log(vs.removeUser(user1));
        //Error: The usuario is not exists.
    } catch (error) {
        console.error(error.message);
    }
    console.log(vs.addUser(user1));
    
    console.log ("************ Mostramos todos los usuarios registrados. ************");
    for (const user of vs.users) {
        console.log(user.toString());
    }

    console.log("************ ASIGNACION PRODUCCIONES A UNA CATEGORIA ************");
    //Asignacion Categorias
    console.log(vs.assignCategory(category1,serie1,movie2,movie3));
    //Categoria1 = Comedia = El vecino, Murder Mystery, Deadpool
    console.log(vs.assignCategory(category2,serie2));
    console.log(vs.assignCategory(category2,movie1));
    //Categoria2 = Terror = Resident Evil , Los crimenes de la academia
    
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
    console.log("Asignamos otra vez misma pelicula "+movie1.title+" al actor : "+actor1.name);
    console.log(vs.assignActor(actor1,movie1));
    
    console.log("Mostrar producciones del actor despues de meter duplicado: "+actor1.name);
    showProductionsActor(actor1);

    console.log("");
    
    // console.log(vs.deassignActor(actor1,serie1));
    console.log("Actores de una Production: "+movie1.title);
    showActorsProductions(movie1);
    
    console.log("");
    
    console.log("Producciones de una Categoria: "+category1.name);
    showProductionsCategory(category1);
}

window.onload = test();