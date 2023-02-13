import { Resource, Coordinate } from '../ObjetosEntidad.js';

class VideoSystemController {

    #videoSystemModel;
    #videoSystemView;

    #loadVideoSystemObjects() {
        let actor1 = this.#videoSystemModel.getActor("Christian", "Bale", "Philip", "30/01/1974", "");
        let actor2 = this.#videoSystemModel.getActor("Harry", "Melling", "", "13/04/1989", "/imagesActor/harryMelling.jpg"); //Los crimenes de la academia

        let actor3 = this.#videoSystemModel.getActor("Paola", "Núñez", "Rivas", "08/04/1978", "/imagesActor/paolaRivas.jpg"); //Resident Evil
        let actor12 = this.#videoSystemModel.getActor("Ella", "Pascale", "Balinska", "04/10/1996", "/imagesActor/ellaPascale.jpg"); //Resident Evil

        let actor4 = this.#videoSystemModel.getActor("Ryan", "Rodney", "Reynold", "23/10/1976", "/imagesActor/RyanReynold.jpg"); //Deadpool
        let actor11 = this.#videoSystemModel.getActor("Morena", "Silva", "de Vaz Setta Baccarin", "02/06/1979", "/imagesActor/morenaSilva.jpg"); //Deadpool

        let actor5 = this.#videoSystemModel.getActor("Adam", "Richard", "Sandler", "09/09/1966", "/imagesActor/adamRichardSandler.jpg");
        let actor6 = this.#videoSystemModel.getActor("Jennifer", "Joanna", "Aniston", "11/02/1969", "/imagesActor/jAniston.jpg"); //Murder Mystery

        let actor7 = this.#videoSystemModel.getActor("Joaquin", "Gutiérrez", "Ylla", "27/03/1981", "/imagesActor/quimGuti.jpg"); //El vecino
        let actor10 = this.#videoSystemModel.getActor("Adrian", "Pino", "", "03/02/1990", "/imagesActor/adrianPino.jpg"); //El vecino


        let actor8 = this.#videoSystemModel.getActor("Andy ", "A. J.", "Samberg", "18/08/1978", "/imagesActor/andySamberg.jpg"); //Brooklyn 99
        let actor9 = this.#videoSystemModel.getActor("Melissa", "Gallo", "", "19/08/1982", "/imagesActor/melissaGallo.jpg"); //Brooklyn 99

        actor1.picture = "/imagesActor/holhola.jpg";

        let category1 = this.#videoSystemModel.getCategory("Comedia", "Obra que presenta una mayoría de escenas y situaciones humorísticas o festivas");
        let category2 = this.#videoSystemModel.getCategory("Terror", "Al espectador sensaciones de pavor, terror, miedo, disgusto, repugnancia, horror, incomodidad o preocupación.");
        let category3 = this.#videoSystemModel.getCategory("Románticas", "es un género cinematográfico que se caracteriza por retratar argumentos construidos de eventos y personajes relacionados con la expresión del amor y las relaciones románticas.");

        let movie1 = this.#videoSystemModel.getMovie("Los crímenes de la academia", "USA", "23/12/2022", "Un veterano detective", "/image/portada.png", new Resource(85, "/movie/CrimenesDeLaAcademia.mp4"));
        let movie2 = this.#videoSystemModel.getMovie("Murder Mystery", "USA", "14/06/2019", "Un policía de Nueva York y su mujer se van de vacaciones a Europa pero terminan acusados de asesinato", "/image/murderMystery.png", new Resource(97, "/movie/movieMurderM.mp4"));
        let movie3 = this.#videoSystemModel.getMovie("Deadpool", "USA", "12/02/2016", "Wade Wilson, tras ser sometido a un cruel experimento científico, adquiere poderes especiales", "/image/DeadpoolCartel.png", new Resource(109, "/movie/dealpool.mp4"));

        let serie1 = this.#videoSystemModel.getSerie("El vecino", "España", "31/12/2019", "Un vecino superheroe", "/image/portadaVecino.png", [new Resource(32, "/serie/Episode1.mp4"), new Resource(24, "/serie/LaRedSocial.mp4"), new Resource(31, "/serie/dia.mp4")], "", 2);
        let serie2 = this.#videoSystemModel.getSerie("Resident Evil", "Estados Unidos", "14/07/2022", "Un virus mortal causara un apocalipsis global", "/image/portadaREvil.png", [new Resource(60, "/serie/Bienvenidos_a_New_Raccoon_City.mp4"), new Resource(48, "/serie/Lo_malo_conocido.mp4"), new Resource(45, "/serie/La_luz.mp4"), new Resource(53, "/serie/La_transformacion.mp4")], "", 2);
        let serie3 = this.#videoSystemModel.getSerie("Brooklyn Nine-Nine", "Estados Unidos", "17/07/2013", "forman una simpática y poco convencional brigada, pero todo cambia tras la llegada del nuevo jefe, el inflexible Raymond Holt.", "/image/brooklyn99.png", [new Resource(60, "/serie/b99_1.mp4"), new Resource(48, "/serie/b99_2.mp4"), new Resource(45, "/serie/b99_3.mp4"), new Resource(53, "/serie/b99_4.mp4")], "", 9);

        serie2.addResources(new Resource(10, "/serie/insertadoDespues.mp4"));

        let coor1 = new Coordinate(38.8951, -77.0364);
        let coor2 = new Coordinate(38.8951, -77.0364);
        let coor3 = new Coordinate(42.5412, -44.5214);

        let user1 = this.#videoSystemModel.getUser("alberedex", "2001rs@gmail.com", "pass1234");
        let user2 = this.#videoSystemModel.getUser("luciaVillalba", "luciacasa@hotmail.com", "passSupercomplicado");
        let user3 = this.#videoSystemModel.getUser("Carlos123", "carlos_alvarez@gmail.com", "abcd1234");

        this.#videoSystemModel.addUser(user1);
        this.#videoSystemModel.addUser(user2);
        this.#videoSystemModel.addUser(user3);

        this.#videoSystemModel.addCategory(category1);
        this.#videoSystemModel.addCategory(category2);
        this.#videoSystemModel.addCategory(category3);

        this.#videoSystemModel.addProduction(movie1);
        this.#videoSystemModel.addProduction(movie2);
        this.#videoSystemModel.addProduction(movie3);

        //Series
        this.#videoSystemModel.addProduction(serie1);
        this.#videoSystemModel.addProduction(serie2);
        this.#videoSystemModel.addProduction(serie3);


        this.#videoSystemModel.addActor(actor1);
        this.#videoSystemModel.addActor(actor2);
        this.#videoSystemModel.addActor(actor3);
        this.#videoSystemModel.addActor(actor4);
        this.#videoSystemModel.addActor(actor5);
        this.#videoSystemModel.addActor(actor6);
        this.#videoSystemModel.addActor(actor7);
        this.#videoSystemModel.addActor(actor8);
        this.#videoSystemModel.addActor(actor9);
        this.#videoSystemModel.addActor(actor10);
        this.#videoSystemModel.addActor(actor11);
        this.#videoSystemModel.addActor(actor12);

        let director1 = this.#videoSystemModel.getDirector("Scott", "Cooper", "", "20/05/1970", "/director/fotoScott.jpg");
        let director2 = this.#videoSystemModel.getDirector("Nacho", "Vigalondo", "Palacios", "06/04/1977", "/director/fotoNacho.jpg");

        let director3 = this.#videoSystemModel.getDirector("Andrew", "Dabb", "", "25/06/1985", "/director/fotoADabb.jpg");
        let director4 = this.#videoSystemModel.getDirector("Kyle", "Newacheck", "", "23/01/1984", "/director/fotoKyleN.jpg");
        let director5 = this.#videoSystemModel.getDirector("Tim", "Miller", "", "10/10/1964", "/director/fotoTimMiller.jpg");

        let director6 = this.#videoSystemModel.getDirector("Daniel", "Joshua", "Goor", "10/10/1964", "/director/fotoDanielJoshua.jpg");

        this.#videoSystemModel.addDirector(director1);
        this.#videoSystemModel.addDirector(director2);
        this.#videoSystemModel.addDirector(director3);
        this.#videoSystemModel.addDirector(director4);
        this.#videoSystemModel.addDirector(director5);
        this.#videoSystemModel.addDirector(director6);

        this.#videoSystemModel.assignCategory(category1, serie1, movie2, movie3, serie3);
        //Categoria1 = Comedia = El vecino, Murder Mystery, Deadpool
        this.#videoSystemModel.assignCategory(category2, serie2);
        this.#videoSystemModel.assignCategory(category2, movie1);

        this.#videoSystemModel.assignDirector(director1, movie1);
        this.#videoSystemModel.assignDirector(director1, serie1);
        this.#videoSystemModel.assignDirector(director2, serie1);
        this.#videoSystemModel.assignDirector(director3, serie2);
        this.#videoSystemModel.assignDirector(director4, movie2);
        this.#videoSystemModel.assignDirector(director5, movie3);
        this.#videoSystemModel.assignDirector(director6, serie3);

        this.#videoSystemModel.assignActor(actor1, movie1);
        this.#videoSystemModel.assignActor(actor2, movie1);
        this.#videoSystemModel.assignActor(actor3, serie2);
        this.#videoSystemModel.assignActor(actor12, serie2);
        this.#videoSystemModel.assignActor(actor4, movie3);
        this.#videoSystemModel.assignActor(actor11, movie3);
        this.#videoSystemModel.assignActor(actor5, movie2);
        this.#videoSystemModel.assignActor(actor1, movie2);
        this.#videoSystemModel.assignActor(actor6, movie2);
        this.#videoSystemModel.assignActor(actor7, serie1);
        this.#videoSystemModel.assignActor(actor10, serie1);
        this.#videoSystemModel.assignActor(actor8, serie3);
        this.#videoSystemModel.assignActor(actor9, serie3);
    }

    constructor(model, view) {
        this.#videoSystemModel = model;
        this.#videoSystemView = view;

        this.onLoad();
        this.onInit();

    }

    //Carga inicial de la aplicacion
    onLoad = () => {
        this.#loadVideoSystemObjects();
    }

    //En respuesta a un cambio de datos
    onInit = () => {

    }

}

export default VideoSystemController;