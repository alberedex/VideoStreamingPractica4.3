import { Resource, Coordinate } from '../ObjetosEntidad.js';

class VideoSystemController {

    #videoSystemModel;
    #videoSystemView;

    #loadVideoSystemObjects() {
        let actor1 = this.#videoSystemModel.getActor("Christian", "Bale", "Philip", "30/01/1974", "");
        let actor2 = this.#videoSystemModel.getActor("Harry", "Melling", "", "13/04/1989", "image/imagesActor/harryMelling.jpg"); //Los crimenes de la academia

        let actor3 = this.#videoSystemModel.getActor("Paola", "Núñez", "Rivas", "08/04/1978", "image/imagesActor/paolaRivas.jpg"); //Resident Evil
        let actor12 = this.#videoSystemModel.getActor("Ella", "Pascale", "Balinska", "04/10/1996", "image/imagesActor/ellaPascale.jpg"); //Resident Evil

        let actor4 = this.#videoSystemModel.getActor("Ryan", "Rodney", "Reynold", "23/10/1976", "image/imagesActor/RyanReynold.jpg"); //Deadpool
        let actor11 = this.#videoSystemModel.getActor("Morena", "Silva", "de Vaz Setta Baccarin", "02/06/1979", "image/imagesActor/morenaSilva.jpg"); //Deadpool

        let actor5 = this.#videoSystemModel.getActor("Adam", "Richard", "Sandler", "09/09/1966", "image/imagesActor/adamRichardSandler.jpg");
        let actor6 = this.#videoSystemModel.getActor("Jennifer", "Joanna", "Aniston", "11/02/1969", "image/imagesActor/jAniston.jpg"); //Murder Mystery / Love Happens
        let actor17 = this.#videoSystemModel.getActor("Aaron", "Edward", "Eckhart", "12/03/1968", "image/imagesActor/AaronEdwardE.jpg"); //Love Happens

        let actor7 = this.#videoSystemModel.getActor("Joaquin", "Gutiérrez", "Ylla", "27/03/1981", "image/imagesActor/quimGuti.jpg"); //El vecino
        let actor10 = this.#videoSystemModel.getActor("Adrian", "Pino", "", "03/02/1990", "image/imagesActor/adrianPino.jpg"); //El vecino


        let actor8 = this.#videoSystemModel.getActor("Andy ", "A. J.", "Samberg", "18/08/1978", "image/imagesActor/andySamberg.jpg"); //Brooklyn 99
        let actor9 = this.#videoSystemModel.getActor("Melissa", "Gallo", "", "19/08/1982", "image/imagesActor/melissaGallo.jpg"); //Brooklyn 99

        let actor13 = this.#videoSystemModel.getActor("Ruth", "Codd", "", "13/06/1996", "image/imagesActor/RuthCodd.jpg"); //El club de la medianoche
        let actor14 = this.#videoSystemModel.getActor("Igby", "Rigney", "", "06/06/2003", "image/imagesActor/IgbyRigney.jpg"); //El club de la medianoche

        let actor15 = this.#videoSystemModel.getActor("Dina", "Shihabi", "", "22/09/1989", "image/imagesActor/DinaShihabi.jpg"); //Archivo 81
        let actor16 = this.#videoSystemModel.getActor("Mamoudou", "Athie", "", "25/07/1988", "image/imagesActor/MamoudouAthie.jpg"); //Archivo 81

        let actor18 = this.#videoSystemModel.getActor("Jennifer", "Lynn", "Affleck", "24/07/1969", "image/imagesActor/jenniferLopez.jpg"); //Cásate conmigo
        let actor19 = this.#videoSystemModel.getActor("Owen", "Cunningham", "Wilson", "18/11/1968", "image/imagesActor/owenCunningham.jpg"); //Cásate conmigo

        let actor20 = this.#videoSystemModel.getActor("Mario", "Casas", "Sierra", "12/06/1986", "image/imagesActor/MarioCasasS.jpg"); //Palmeras en la Nieve
        let actor21 = this.#videoSystemModel.getActor("Berta", "Vázquez", "", "28/03/1992", "image/imagesActor/BertaVazquez.jpg"); //Palmeras en la Nieve

        let actor22 = this.#videoSystemModel.getActor("Penélope", "Cruz", "Sánchez", "28/04/1974", "image/imagesActor/PenelopeCruz.jpg"); //Los abrazos rotos
        let actor23 = this.#videoSystemModel.getActor("Blanca", "Portillo", "Martínez", "15/06/1963", "image/imagesActor/BlancaPortillo.jpg"); //Los abrazos rotos

        actor1.picture = "image/imagesActor/holhola.jpg";

        let category1 = this.#videoSystemModel.getCategory("Comedia", "Obra que presenta una mayoría de escenas y situaciones humorísticas o festivas");
        let category2 = this.#videoSystemModel.getCategory("Terror", "Al espectador sensaciones de pavor, terror, miedo, disgusto, repugnancia, horror, incomodidad o preocupación.");
        let category3 = this.#videoSystemModel.getCategory("Románticas", "es un género cinematográfico que se caracteriza por retratar argumentos construidos de eventos y personajes relacionados con la expresión del amor y las relaciones románticas.");

        let movie1 = this.#videoSystemModel.getMovie("Los crímenes de la academia", "USA", "23/12/2022", "Historia ambientada en 1830 sobre un veterano detective, Augustus Landor, que intenta resolver unos asesinatos cometidos en West Point con la ayuda de un joven cadete al que el mundo conocería luego como Edgar Allan Poe.", "image/cartel/LosCrimenesDeLaAcademia.png", new Resource(85, "movie/CrimenesDeLaAcademia.mp4"));
        let movie2 = this.#videoSystemModel.getMovie("Murder Mystery", "USA", "14/06/2019", "Un policía de Nueva York y su mujer se van de vacaciones a Europa pero terminan acusados de asesinato", "image/cartel/murderMystery.png", new Resource(97, "movie/movieMurderM.mp4"));
        let movie3 = this.#videoSystemModel.getMovie("Deadpool", "USA", "12/02/2016", "Wade Wilson, tras ser sometido a un cruel experimento científico, adquiere poderes especiales", "image/cartel/DeadpoolCartel.png", new Resource(109, "movie/dealpool.mp4"));

        let movie4 = this.#videoSystemModel.getMovie("Love Happens", "USA", "18/09/2009", "El viudo Burke Ryan es un exitoso autor de libros de autoayuda que enseña cómo enfrentarse al dolor, pero es incapaz de seguir sus propios consejos. En uno de sus seminarios conoce a Eloise, una florista algo desencantada con el amor.", "image/cartel/loveHappens.png", new Resource(90, "movie/loveHappens.mp4"));
        let movie5 = this.#videoSystemModel.getMovie("Cásate conmigo", "USA", "11/02/2022", "Una estrella del pop es abandonada por su prometido momentos antes de su boda en el Madison Square Garden, por lo que decide casarse con un hombre seleccionado aleatoriamente entre el público.", "image/cartel/casateConmigo.png", new Resource(112, "movie/casateConmigo.mp4"));
        let movie6 = this.#videoSystemModel.getMovie("Palmeras en la Nieve", "España", "09/12/2015", "El descubrimiento de una carta olvidada durante años empuja a Clarence a viajar a Bioko para visitar la tierra en la que su padre Jacobo y su tío Kilian pasaron la mayor parte de su juventud, la isla de Fernando Poo. Allí experimentará la amistad, el amor y el odio, y los contrastes de una vida social ligera y espontánea opuesta a la rigidez de la sociedad española.", "image/cartel/PalmerasEnLaNieve.png", new Resource(163, "movie/PalmerasEnLaNieve.mp4"));
        let movie7 = this.#videoSystemModel.getMovie("Los abrazos rotos", "España", "18/03/2009", "Mateo Blanco es un escritor y director de cine que catorce años atrás sufrió un accidente de coche que le dejó ciego. A partir de ese accidente, en el que también murió su mujer, Mateo usa su nombre para firmar como director y el pseudónimo Harry Caine para sus otros trabajos.", "image/cartel/AbrazosRotos.png", new Resource(125, "movie/AbrazosRotos.mp4"));

        let serie1 = this.#videoSystemModel.getSerie("El vecino", "España", "31/12/2019", "Un vecino superheroe", "image/cartel/portadaVecino.png", [new Resource(32, "serie/Episode1.mp4"), new Resource(24, "serie/LaRedSocial.mp4"), new Resource(31, "serie/dia.mp4")], "", 2);
        let serie2 = this.#videoSystemModel.getSerie("Resident Evil", "Estados Unidos", "14/07/2022", "Un virus mortal causara un apocalipsis global", "image/cartel/portadaREvil.png", [new Resource(60, "serie/Bienvenidos_a_New_Raccoon_City.mp4"), new Resource(48, "serie/Lo_malo_conocido.mp4"), new Resource(45, "serie/La_luz.mp4"), new Resource(53, "serie/La_transformacion.mp4")], "", 2);
        let serie3 = this.#videoSystemModel.getSerie("Brooklyn Nine-Nine", "Estados Unidos", "17/07/2013", "forman una simpática y poco convencional brigada, pero todo cambia tras la llegada del nuevo jefe, el inflexible Raymond Holt.", "image/cartel/brooklyn99.png", [new Resource(60, "serie/b99_1.mp4"), new Resource(48, "serie/b99_2.mp4"), new Resource(45, "serie/b99_3.mp4"), new Resource(53, "serie/b99_4.mp4")], "", 9);

        let serie4 = this.#videoSystemModel.getSerie("El club de la medianoche", "Estados Unidos", "07/10/2022", "En una mansión con una misteriosa historia, ocho miembros del Midnight Club se reúnen cada noche a la medianoche para contar historias siniestras y buscar señales sobrenaturales del más allá.", "image/cartel/clubMedianoche.png", [new Resource(60, "serie/clubM_1.mp4"), new Resource(48, "serie/clubM_2.mp4"), new Resource(45, "serie/clubM_3.mp4"), new Resource(53, "serie/clubM_4.mp4")], "", 1);
        let serie5 = this.#videoSystemModel.getSerie("Archivo 81", "Estados Unidos", "14/01/2022", "Un archivista acepta un trabajo restaurando cintas de video dañadas y se ve envuelto en un misterio que involucra al director desaparecido y un culto demoníaco.", "image/cartel/archivo81.png", [new Resource(75, "serie/a81_1.mp4"), new Resource(48, "serie/a81_2.mp4"), new Resource(45, "serie/a81_3.mp4"), new Resource(53, "serie/a81_4.mp4")], "", 1);

        serie2.addResources(new Resource(10, "serie/insertadoDespues.mp4"));

        let coor1 = new Coordinate(38.8951, -77.0364);
        let coor2 = new Coordinate(38.8951, -77.0364);
        let coor3 = new Coordinate(42.5412, -44.5214);

        let user1 = this.#videoSystemModel.getUser("alberedex", "2001rs@gmail.com", "pass1234");
        this.#videoSystemModel.addUser(user1);

        this.#videoSystemModel.addCategory(category1);
        this.#videoSystemModel.addCategory(category2);
        this.#videoSystemModel.addCategory(category3);

        this.#videoSystemModel.addProduction(movie1);
        this.#videoSystemModel.addProduction(movie2);
        this.#videoSystemModel.addProduction(movie3);
        this.#videoSystemModel.addProduction(movie4);
        this.#videoSystemModel.addProduction(movie5);
        this.#videoSystemModel.addProduction(movie6);
        this.#videoSystemModel.addProduction(movie7);

        //Series
        this.#videoSystemModel.addProduction(serie1);
        this.#videoSystemModel.addProduction(serie2);
        this.#videoSystemModel.addProduction(serie3);
        this.#videoSystemModel.addProduction(serie4);
        this.#videoSystemModel.addProduction(serie5);


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
        this.#videoSystemModel.addActor(actor13);
        this.#videoSystemModel.addActor(actor14);
        this.#videoSystemModel.addActor(actor15);
        this.#videoSystemModel.addActor(actor16);
        this.#videoSystemModel.addActor(actor17);
        this.#videoSystemModel.addActor(actor18);
        this.#videoSystemModel.addActor(actor19);
        this.#videoSystemModel.addActor(actor20);
        this.#videoSystemModel.addActor(actor21);

        let director1 = this.#videoSystemModel.getDirector("Scott", "Cooper", "", "20/05/1970", "image/director/fotoScott.jpg");
        let director2 = this.#videoSystemModel.getDirector("Nacho", "Vigalondo", "Palacios", "06/04/1977", "image/director/fotoNacho.jpg");

        let director3 = this.#videoSystemModel.getDirector("Andrew", "Dabb", "", "25/06/1985", "image/director/fotoADabb.jpg");
        let director4 = this.#videoSystemModel.getDirector("Kyle", "Newacheck", "", "23/01/1984", "image/director/fotoKyleN.jpg");
        let director5 = this.#videoSystemModel.getDirector("Tim", "Miller", "", "10/10/1964", "image/director/fotoTimMiller.jpg");

        let director6 = this.#videoSystemModel.getDirector("Daniel", "Joshua", "Goor", "10/10/1964", "image/director/fotoDanielJoshua.jpg");

        let director7 = this.#videoSystemModel.getDirector("Mike", "Flanagan", "", "20/05/1978", "image/director/fotoMikeFlanagan.jpg");
        let director8 = this.#videoSystemModel.getDirector("James", "Wan", "", "26/02/1977", "image/director/fotoJamesWan.jpg");
        let director9 = this.#videoSystemModel.getDirector("Brandon", "Camp", "", "25/08/1971", "image/director/fotoBrandonCamp.jpg");
        let director10 = this.#videoSystemModel.getDirector("Kat", "Coiro", "", "10/01/1974", "image/director/KatCoiro.jpg");
        let director11 = this.#videoSystemModel.getDirector("Fernando", "González", "Molina", "10/11/1975", "image/director/FernandoGonzalez.jpg");
        let director12 = this.#videoSystemModel.getDirector("Pedro", "Almodóvar", "Caballero", "25/07/1949", "image/director/PedroAlmodovar.jpg");

        this.#videoSystemModel.addDirector(director1);
        this.#videoSystemModel.addDirector(director2);
        this.#videoSystemModel.addDirector(director3);
        this.#videoSystemModel.addDirector(director4);
        this.#videoSystemModel.addDirector(director5);
        this.#videoSystemModel.addDirector(director6);
        this.#videoSystemModel.addDirector(director7);
        this.#videoSystemModel.addDirector(director8);
        this.#videoSystemModel.addDirector(director9);
        this.#videoSystemModel.addDirector(director10);
        this.#videoSystemModel.addDirector(director11);
        this.#videoSystemModel.addDirector(director12);

        this.#videoSystemModel.assignCategory(category1, serie1, movie2, movie3, serie3);
        //Categoria1 = Comedia = El vecino, Murder Mystery, Deadpool
        this.#videoSystemModel.assignCategory(category2, serie2);
        this.#videoSystemModel.assignCategory(category2, movie1);
        this.#videoSystemModel.assignCategory(category2, serie4);
        this.#videoSystemModel.assignCategory(category2, serie5);

        this.#videoSystemModel.assignCategory(category3, movie4);
        this.#videoSystemModel.assignCategory(category3, movie5);
        this.#videoSystemModel.assignCategory(category3, movie6);
        this.#videoSystemModel.assignCategory(category3, movie7);

        this.#videoSystemModel.assignDirector(director1, movie1);
        this.#videoSystemModel.assignDirector(director1, serie1);
        this.#videoSystemModel.assignDirector(director2, serie1);
        this.#videoSystemModel.assignDirector(director3, serie2);
        this.#videoSystemModel.assignDirector(director4, movie2);
        this.#videoSystemModel.assignDirector(director5, movie3);
        this.#videoSystemModel.assignDirector(director6, serie3);
        this.#videoSystemModel.assignDirector(director7, serie4);
        this.#videoSystemModel.assignDirector(director8, serie5);
        this.#videoSystemModel.assignDirector(director9, movie4);
        this.#videoSystemModel.assignDirector(director10, movie5);
        this.#videoSystemModel.assignDirector(director11, movie6);
        this.#videoSystemModel.assignDirector(director12, movie7);

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
        this.#videoSystemModel.assignActor(actor13, serie4);
        this.#videoSystemModel.assignActor(actor14, serie4);
        this.#videoSystemModel.assignActor(actor15, serie5);
        this.#videoSystemModel.assignActor(actor16, serie5);

        this.#videoSystemModel.assignActor(actor6, movie4);
        this.#videoSystemModel.assignActor(actor17, movie4);

        this.#videoSystemModel.assignActor(actor18, movie5);
        this.#videoSystemModel.assignActor(actor19, movie5);

        this.#videoSystemModel.assignActor(actor20, movie6);
        this.#videoSystemModel.assignActor(actor21, movie6);
        this.#videoSystemModel.assignActor(actor22, movie7);
        this.#videoSystemModel.assignActor(actor23, movie7);
    }

    constructor(model, view) {
        this.#videoSystemModel = model;
        this.#videoSystemView = view;

        this.onLoad();
        this.onInit();

        this.#videoSystemView.bindInit(this.handleInit);
    }

    //Carga inicial de la aplicacion
    onLoad = () => {
        this.#loadVideoSystemObjects();
        this.#videoSystemView.showCategoriesInMenu(this.#videoSystemModel.categories);

        this.#videoSystemView.showPersonsMenu();
        this.#videoSystemView.bindActorsList(this.handleActoresList);
        this.#videoSystemView.bindDirectorsList(this.handleDirectoresList);
        this.#videoSystemView.bindCategoriesListMenu(this.handleProductionsCategoryList);
        this.#videoSystemView.showButtonCloseWindowsMenu();
        this.#videoSystemView.bindClose(this.handleClose);

        this.#videoSystemView.showAdminMenu();
        this.#videoSystemView.bindAdmin(
            this.handlerNewProduccionForm,
            this.handlerDelProduccionForm,
            this.handlerAsigProducionForm,
            this.handlerNewCategoryForm,
            this.handlerDelCategoryForm,
            this.handlerNewPersonForm,
            this.handlerDelPersonForm
        );
    }

    //En respuesta a un cambio de datos
    onInit = () => {
        this.#videoSystemView.showProductionsInit(this.#videoSystemModel.productions);
        this.#videoSystemView.init(this.#videoSystemModel.categories);
        this.#videoSystemView.bindCategoriesList(this.handleProductionsCategoryList);

        this.#videoSystemView.bindProductions(this.handleProduction);
    }

    handleInit = () => {
        this.onInit();
    }

    //lista de categorias
    handleProductionsCategoryList = (category) => {
        let category1 = this.#videoSystemModel.getCategory(category);
        this.#videoSystemView.listProductions(this.#videoSystemModel.getProductionsCategory(category1), category1);

        this.#videoSystemView.bindProductions(this.handleProduction); //Cuando pulse en una categoria, lanzar el bind para las producciones de la categoria
    }

    //ficha de la producion 
    handleProduction = (production) => {

        let production1 = this.#videoSystemModel.getProduction(production);
        this.#videoSystemView.showProduction((production1), this.#videoSystemModel.getCast(production1), this.#videoSystemModel.getDirectorsProdutions(production1));
        this.#videoSystemView.bindActors(this.handleActor);
        this.#videoSystemView.bindDirectores(this.handleDirector);

        this.#videoSystemView.bindShowFichaInNewWindow(this.handleProductionNewWindow);
    }

    //lista de los actores
    handleActoresList = (type) => {
        this.#videoSystemView.showPersonsList(this.#videoSystemModel.actors, type);
        this.#videoSystemView.bindActors(this.handleActor);
    }
    //lista de los directores
    handleDirectoresList = (type) => {
        this.#videoSystemView.showPersonsList(this.#videoSystemModel.directors, type);
        this.#videoSystemView.bindDirectores(this.handleDirector);
    }

    //Cuando pulse en un actor
    handleActor = (actorSelec) => {
        actorSelec = actorSelec.split('/');
        let actor = this.#videoSystemModel.getActor(actorSelec[0], actorSelec[1]);

        this.#videoSystemView.showFichaPerson(actor, this.#videoSystemModel.getProdutionsActor(actor));

        this.#videoSystemView.bindProductions(this.handleProduction);
        this.#videoSystemView.bindShowFichaInNewWindow(this.handleActorNewWindow);
    }

    //Cuando pulse en un director
    handleDirector = (directorSelec) => {
        directorSelec = directorSelec.split('/');
        let director = this.#videoSystemModel.getDirector(directorSelec[0], directorSelec[1]);

        this.#videoSystemView.showFichaPerson(director, this.#videoSystemModel.getProductionsDirector(director));

        this.#videoSystemView.bindProductions(this.handleProduction);

        this.#videoSystemView.bindShowFichaInNewWindow(this.handleDirectorNewWindow);
    }

    //ficha produccion en una nueva ventana
    handleProductionNewWindow = (production) => {
        let production1 = this.#videoSystemModel.getProduction(production);
        this.#videoSystemView.showProductionWindow(production1, this.#videoSystemModel.getCast(production1), this.#videoSystemModel.getDirectorsProdutions(production1));
    }

    //Actor nueva ventana
    handleActorNewWindow = (actorSelec) => {
        actorSelec = actorSelec.split('/');
        let actor = this.#videoSystemModel.getActor(actorSelec[0], actorSelec[1]);

        this.#videoSystemView.showFichaPersonNewWindow(actor, this.#videoSystemModel.getProdutionsActor(actor));

        // this.#videoSystemView.bindProductions(this.handleProduction);
    }

    //Director nueva ventana
    handleDirectorNewWindow = (directorSelec) => {
        directorSelec = directorSelec.split('/');
        let director = this.#videoSystemModel.getDirector(directorSelec[0], directorSelec[1]);

        this.#videoSystemView.showFichaPersonNewWindow(director, this.#videoSystemModel.getProductionsDirector(director));

        // this.#videoSystemView.bindProductions(this.handleProduction);
    }
    //Para cerrar todas las ventanas registradas
    handleClose = () => {
        this.#videoSystemView.closeWindows();
    }

    handlerNewCategoryForm = () => {
        this.#videoSystemView.showModalAddCategory();

        this.#videoSystemView.bindNewCategoryForm(this.handleCreateCategory);
        this.#videoSystemView.bindCloseModal();
    }

    handleCreateCategory = (title, description) => {
        let categ = this.#videoSystemModel.getCategory(title, description);

        let done, error;
        try {
            this.#videoSystemModel.addCategory(categ);
            done = true;
            error = `La categoria <strong>${title}</strong> ha sido añadida correctamente`;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#videoSystemView.showMessageAction(done, categ, error);
        this.onAddCategory();
    }


    onAddCategory = () => {
        this.#videoSystemView.showCategoriesInMenu(this.#videoSystemModel.categories);
        this.#videoSystemView.bindCategoriesListMenu(this.handleProductionsCategoryList);

        // this.#videoSystemView.init(this.#videoSystemModel.categories);
        // this.#videoSystemView.bindCategoriesList(this.handleProductionsCategoryList);
    }

    handlerDelCategoryForm = () => {
        this.#videoSystemView.showModalRemoveCategory(this.#videoSystemModel.categories);

        this.#videoSystemView.bindDelCategoryForm(this.handleDelCategory);
        this.#videoSystemView.bindCloseModal();
    }

    handleDelCategory = (category) => {
        let cat = this.#videoSystemModel.getCategory(category);

        let done, error;

        try {
            this.#videoSystemModel.removeCategory(cat);
            done = true;
            error = `La categoria <strong>${category}</strong> ha sido eliminada correctamente`;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this.#videoSystemView.showMessageAction(done, cat, error);
        this.onAddCategory();
    }

    handlerNewProduccionForm = () => {
        this.#videoSystemView.showModalAddProduction(this.#videoSystemModel.actors, this.#videoSystemModel.directors, this.#videoSystemModel.categories);

        this.#videoSystemView.bindNewProductionForm(this.handleCreateProduction);
        this.#videoSystemView.bindCloseModal();
    }

    handlerDelProduccionForm = () => {
        this.#videoSystemView.showModalRemoveProductions(this.#videoSystemModel.productions);

        this.#videoSystemView.bindDelProductionForm(this.handleDelProduction);
        this.#videoSystemView.bindCloseModal();
    }

    handleCreateProduction = (title, nationality, publication, synopsis, image, categorias, directores, actores, typePro) => {
        let prod;
        if (typePro == 'Movie') {
            prod = this.#videoSystemModel.getMovie(title, nationality, publication, synopsis, image);

        } else if (typePro == 'Serie') {
            prod = this.#videoSystemModel.getSerie(title, nationality, publication, synopsis, image);
        }

        let done, error;
        try {
            //Introducimos la produccion en el sistema
            this.#videoSystemModel.addProduction(prod);

            //Asignamos la categoria con la produccion 
            for (const categoria of categorias) {
                let categoryAs = this.#videoSystemModel.getCategory(categoria);
                this.#videoSystemModel.assignCategory(categoryAs, prod);
            }

            //Asignamos el director con la produccion 
            for (const director of directores) {
                let directorSelec = director.split('/');

                let directorAs = this.#videoSystemModel.getDirector(directorSelec[0], directorSelec[1]);
                this.#videoSystemModel.assignDirector(directorAs, prod);
            }

            //Asignamos el actor con la produccion 
            for (const actor of actores) {
                let actorSelec = actor.split('/');

                let actorAs = this.#videoSystemModel.getActor(actorSelec[0], actorSelec[1]);
                this.#videoSystemModel.assignActor(actorAs, prod);
            }

            done = true;
            error = `La produccion <strong>${title}</strong> ha sido añadido`;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#videoSystemView.showMessageAction(done, prod, error);
        // this.onAddCategory();
    }

    handleDelProduction = (production) => {
        let prod = this.#videoSystemModel.getProduction(production);

        let done, error;

        try {
            this.#videoSystemModel.removeProduction(prod);
            done = true;
            error = `La produccion  <strong>${production}</strong> ha sido eliminada correctamente`;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this.#videoSystemView.showMessageAction(done, prod, error);
    }

    handlerAsigProducionForm = () => {
        this.#videoSystemView.showModalAssignProductions(this.#videoSystemModel.productions);


        this.#videoSystemView.bindShowAssignsProd(this.handlerShowAssignProduction);
        this.#videoSystemView.bindCloseModal();
    }

    handlerShowAssignProduction = (production) => {
        let prod = this.#videoSystemModel.getProduction(production);

        this.#videoSystemView.showAssignProductionModule(this.#videoSystemModel.directors, this.#videoSystemModel.actors, this.#videoSystemModel.getCast(prod), this.#videoSystemModel.getDirectorsProdutions(prod));
        this.#videoSystemView.bindAssignDesProduction(this.handleAssingDesProdDirector, this.handleAssingDesProdActor, prod);
    }

    handleAssingDesProdDirector = (directoresAssign, directoresDeassign, prod) => {
        let done, error;
        let obj;
        try {

            for (let director of directoresAssign) {

                let directorSplit = director.split('/');
                let objDirector = this.#videoSystemModel.getDirector(directorSplit[0], directorSplit[1]);
                this.#videoSystemModel.assignDirector(objDirector, prod);
            }

            for (let director of directoresDeassign) {

                let directorSplit = director.split('/');
                let objDirector = this.#videoSystemModel.getDirector(directorSplit[0], directorSplit[1]);
                this.#videoSystemModel.deassignDirector(objDirector, prod);
            }
            done = true;
            error = `Ha sido un exito el proceso solicitado para Directores`;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this.#videoSystemView.showMessageAction(done, obj, error);
        //Reiniciamos la formulario 
        this.#videoSystemView.showAssignProductionModule(this.#videoSystemModel.directors, this.#videoSystemModel.actors, this.#videoSystemModel.getCast(prod), this.#videoSystemModel.getDirectorsProdutions(prod));
        this.#videoSystemView.bindAssignDesProduction(this.handleAssingDesProdDirector, this.handleAssingDesProdActor, prod);
    }

    handleAssingDesProdActor = (actoresAssign, actoresDeassign, prod) => {
        let done, error;
        let obj;
        try {
            for (let actor of actoresAssign) {
                let actorSplit = actor.split('/');
                let obj = this.#videoSystemModel.getActor(actorSplit[0], actorSplit[1]);
                this.#videoSystemModel.assignActor(obj, prod);
            }

            for (let actor of actoresDeassign) {

                let actorSplit = actor.split('/');
                let obj = this.#videoSystemModel.getActor(actorSplit[0], actorSplit[1]);
                this.#videoSystemModel.deassignActor(obj, prod);
            }
            done = true;
            error = `Ha sido un exito el proceso solicitado para Actores`;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this.#videoSystemView.showMessageAction(done, obj, error);
        //Reiniciamos la formulario 
        this.#videoSystemView.showAssignProductionModule(this.#videoSystemModel.directors, this.#videoSystemModel.actors, this.#videoSystemModel.getCast(prod), this.#videoSystemModel.getDirectorsProdutions(prod));
        this.#videoSystemView.bindAssignDesProduction(this.handleAssingDesProdDirector, this.handleAssingDesProdActor, prod);
    }

    handlerNewPersonForm = () => {
        this.#videoSystemView.showModalAddPerson();

        this.#videoSystemView.bindNewPersonForm(this.handleCreatePerson);
        this.#videoSystemView.bindCloseModal();
    }

    handleCreatePerson = (name, lastname1, lastname2, born, picture, typePerson) => {
        let done, error;
        let obj;
        if (typePerson == "Director") {
            let obj = this.#videoSystemModel.getDirector(name, lastname1, lastname2, born, picture);

            try {
                this.#videoSystemModel.addDirector(obj);
                done = true;
                error = `Ha sido añadido el nuevo director <strong>${name} ${lastname1}<strong>`;
            } catch (exception) {
                done = false;
                error = exception;
            }


        } else if (typePerson == 'Actor') {
            let obj = this.#videoSystemModel.getActor(name, lastname1, lastname2, born, picture);

            try {
                this.#videoSystemModel.addActor(obj);
                done = true;
                error = `Ha sido añadido el nuevo actor <strong>${name} ${lastname1}<strong>`;
            } catch (exception) {
                done = false;
                error = exception;
            }

        }
        //Mensaje de exito
        this.#videoSystemView.showMessageAction(done, obj, error);
    }


    handlerDelPersonForm = () => {
        this.#videoSystemView.showModalRemovePerson(this.#videoSystemModel.directors, this.#videoSystemModel.actors);

        this.#videoSystemView.bindDelPersonForm(this.handlerDelDirector, this.handlerDelActor);
        this.#videoSystemView.bindCloseModal();
    }

    handlerDelDirector = (director) => {
        let directorSplit = director.split('/');
        let ObjDirector = this.#videoSystemModel.getDirector(directorSplit[0], directorSplit[1]);

        let done, error;

        try {
            this.#videoSystemModel.removeDirector(ObjDirector);
            done = true;
            error = `Ha sido eliminado el director ${ObjDirector.name} ${ObjDirector.lastname1}`;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this.#videoSystemView.showMessageAction(done, ObjDirector, error);
    }

    handlerDelActor = (actor) => {
        let actorSplit = actor.split('/');
        let ObjActor = this.#videoSystemModel.getActor(actorSplit[0], actorSplit[1]);

        let done, error;

        try {
            this.#videoSystemModel.removeActor(ObjActor);
            done = true;
            error = `Ha sido eliminado el actor ${ObjActor.name} ${ObjActor.lastname1}`;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this.#videoSystemView.showMessageAction(done, ObjActor, error);
    }
}

export default VideoSystemController;