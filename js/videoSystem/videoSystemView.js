import { newCategoryValidation, newProductionValidation, newPersonValidation, delCategoryValidation, delProductionValidation, assignDesValidation, delPersonValidation,selectProdAssignDes, loginValidation, map } from './validation.js';
import { setCookie, getCookie } from './videoSystemApp.js';

class VideoSystemView {
    /**
     * Metodo donde convierte [minutos] del Recurso a [horas,minutos] para facilitar al usuario la duracion
     */
    #convertMinToHours(mins) {
        let result = '';
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        if (h > 0) {
            if (h < 10) '0' + h;
            result += `${h} h `;
        }
        if (m > 0) {
            if (m < 10) '0' + m;
            result += `${m} min`;
        }
        return result;
    }

    #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
        handler(...handlerArguments);
        $(scrollElement).get(0).scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }

    constructor() {
        this.main = $('main');
        this.menu = $('#navbar-prin');
        this.fichaWindow = null;
        this.fichaWindowRegistry = [];
        this.areaLogin = $('#AreaLogin');
    }

    //Metodo donde carga las categorias en el contenido inicial
    init(categories) {

        let listCategory = $('#category-list');
        if (listCategory.children().length > 0) listCategory.remove();

        let contanier = $('<div id="category-list"></div>');
        let titleCategories = $('<h2>Categorias</h2>');
        titleCategories.addClass('mt-2 mb-3 text-center bg-dark-subtle p-3 text-uppercase');

        contanier.append(titleCategories);

        let contanierCategoria = $('<div class="d-flex flex-row flex-wrap justify-content-evenly"></div>');
        //iterar cada categoria 
        for (let categoria of categories) {

            contanierCategoria.append(`<div class="card">
                                        <div class="card-body">
                                            <a data-category="${categoria.name}" href="#">
                                                <h1 class="h2">${categoria.name}</h1>
                                            </a>
                                        </div>
                                     </div>`);

            contanier.append(contanierCategoria);
        }

        this.main.append(contanier);
    }


    /**
    * Mostrar las categorias en el menú nav
    * 
    */
    showCategoriesInMenu(categories) {
        let menu = $('#category-list-menu');

        if (menu.length === 0) {
            let li = $(`<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navCats" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-has-popup="true">
		                    Categorías
		                </a>
		            </li>`);

            menu = $('<div class="dropdown-menu" aria-labelledby="navCats" id="category-list-menu"></div>');
            li.append(menu);
            this.menu.append(li);
        } else {
            //En caso que haya elementos, eliminamos la lista para poner los nuevo
            menu.children().remove();
        }

        for (let category of categories) {
            menu.append(`<a data-category="${category.name}" class="dropdown-item collapse-link" href="#">
                                ${category.name}
                            </a>`);
        }


    }

    /**
     * Mostrar en nav dos elementos Actores / Directores
     */
    showPersonsMenu() {
        this.menu.append(`<li class="nav-item">
                            <a class="nav-link active collapse-link" aria-current="page" href="#" id='actor-menu' data-nav='Actores'>Actores</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active collapse-link" aria-current="page" href="#" id='director-menu' data-nav='Directores'>Directores</a>
                        </li>`);
    }

    //Eventos Init 
    bindInit(handler) {

        $('#home').click((event) => {
            this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
        });
        $('#logo').click((event) => {
            this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
        });
        $('#homeFooter').click((event) => {
            this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
        });
        //Evento cuando tenga el menu para resoluciones pequeñas, al hacer click a un item, oculte la nav despelgada
        $('.collapse-link').click(function () {
            $('.navbar-collapse').collapse('hide');
        });

    }

    //Eventos para cuando pulse una categoria tanto en main o en el menu
    bindCategoriesList(handler) {
        $('#category-list').find('a').click((event) => {
            let category = event.currentTarget.dataset.category;
            this.#excecuteHandler(handler, [category], 'main', { action: 'ListProductionsCategory', category: category }, '#CategoriaList', event);

        });

    }

    bindCategoriesListMenu(handler) {
        $('#category-list-menu').find('a').click((event) => {

            let category = event.currentTarget.dataset.category;
            this.#excecuteHandler(handler, [category], 'body', { action: 'ListProductionsCategory', category: category }, '#CategoriaList', event);
        });
    }


    bindActorsList(handler) {
        this.menu.find('a[id="actor-menu"]').click((event) => {

            let nav = event.currentTarget.dataset.nav;
            this.#excecuteHandler(handler, [nav], 'body', { action: 'ListActores', nav: nav }, '#ListActors', event);
        });
    }

    bindDirectorsList(handler) {
        this.menu.find('a[id="director-menu"]').click((event) => {

            let nav = event.currentTarget.dataset.nav;
            this.#excecuteHandler(handler, [nav], 'body', { action: 'ListDirectores', nav: nav }, '#ListDirectores', event);
        });
    }

    /**
     * Mostrar 3 producciones de forma aleatoria 
     */
    showProductionsInit(producciones) {
        //Creamos el contenedor principal
        this.main.empty();
        let carousel = $('<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel"></div>');

        let carouselInner = $(`<div class="carousel-inner" id="productions"></div>`);
        //Generaramos numero aleatorios
        let produccionesA = Array.from(producciones);
        var numbers = [];
        let lengthArray = produccionesA.length;

        while (numbers.length < 3) {
            let number = (Math.floor(Math.random() * lengthArray) + 0);

            let result = numbers.indexOf(number);

            if (result === -1) {
                numbers.push(number);
            }
        }
        //Mostramos el diseño carousel
        for (const number of numbers) {
            let produccion = produccionesA[number];

            carouselInner.append(`<div class="carousel-item ">
            <div style='background-image:url(${produccion.image});' alt="${produccion.title}"></div>
            <div class="carousel-caption d-md-block">
                <h5>${produccion.title}</h5>
                <a data-produccion="${produccion.title}" href='#' class="btn btn-primary">Más info</a>
            </div>
          </div>`);
        }
        carouselInner.children().first().addClass('active');
        //append al contenier las tres elementos
        carousel.append(carouselInner);
        carousel.append(` <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>`);
        //prepend al principio al main principal del html
        this.main.prepend(carousel);
    }

    /**
     * Si selecciona una categoria, mostras todas las producciones del dicho categoria
     */
    listProductions(productions, category) {
        this.main.empty(); //borramos el contenido del main
        let contanierPrincipal = $('<div></div>');
        contanierPrincipal.addClass('container');

        contanierPrincipal.append(`<h1>${category.name}</h1><p>${category.description}</p>`);
        contanierPrincipal.addClass("text-center");
        let contanierProduciones = $('<div id="productions" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>');

        for (let production of productions) {

            contanierProduciones.append(`<a data-produccion="${production.title}" href='#'>
                                          <div class="card" style="width: 18rem;">
                                            <img src="${production.image}" class="card-img-top" alt="${production.title}">
                                                 <div class="card-body">
                                                     <h5 class="card-title">${production.title}</h5>
                                                     <p class="card-text"><small class="text-muted">${production.publication.getFullYear()}</small></p>
                                                 </div>
                                            </div></a>`);
        }
        contanierPrincipal.append(contanierProduciones);
        this.main.append(contanierPrincipal);
    }

    /**
     * Mostrar la ficha de produccion en una nueva ventana
     */
    showProductionWindow(production, castIterator, directorIterator) {
        let main = $(this.fichaWindow.document).find('main');

        let contanier = $('<div class="d-flex flex-column container"></div>');

        contanier.append(`<div class="d-flex justify-content-center">
                                    <img src="${production.image}" class="img-fluid w-75" alt="${production.title}">
                                </div>
                                <div>
                                    <h1 class="card-title">${production.title}</h1>
                                    <div class="d-flex gap-5 flex-wrap" id='infoProduction'>
                                        <p>${production.nationality}</p>
                                        <p>${production.publication.getFullYear()}</p>
                                    </div>
                                    <h5>Sinopsis:</h5>
                                    <p class="card-text">${production.synopsis}</p>
                                    <div id='infoPersons' class='d-flex gap-5 justify-content-evenly flex-wrap'>
                                        <div id="DirectoresId">
                                            <h5>Director:</h5>
                                        </div>
                                        <div id="ActoresId">
                                            <h5>Cast:</h5>
                                        </div>
                                </div>
                            </div>`);


        //Introducimos el contenedor
        main.append(contanier);

        //Obtenemos para insertar los actores de la produccion
        let persons = $(this.fichaWindow.document).find('#infoPersons');
        let cast = persons.children().last();
        let directors = persons.children().first();

        //Mostrar los directores de la produccion
        for (const director of directorIterator) {
            directors.append(`<p>${director.name} ${director.lastname1} ${director.lastname2}</p>`);
        }

        //Mostrar el cast de la produccion
        for (const actor of castIterator) {
            cast.append(`<p>${actor.name} ${actor.lastname1} ${actor.lastname2}</p>`);
        }

        let info = $(this.fichaWindow.document).find('#infoProduction');

        //mostramos contenido segun si es serie o pelicula
        if (production.constructor.name == 'Serie') {

            info.append(production.seasons + " temporadas");

            let table = $(`<table class="table table-hover"><tbody></tbody></table>`);
            let indice = 0;
            for (let chapter of production.resources) {

                table.append(`<tr>
                                <th>${++indice}</th>
                                <td>${chapter.link}</td>
                                <td>${this.#convertMinToHours(chapter.duration)}</td>
                            </tr>`);
            }

            contanier.append(table);
        } else if (production.constructor.name == 'Movie') {

            //En caso que sea pelicula
            info.append(this.#convertMinToHours(production.resource.duration));
        }
    }

    /**
     * FICHA DE LA PRODUCCION 
     */
    showProduction(production, castIterator, directorIterator) {
        this.main.empty();


        let contanier = $('<div class="d-flex flex-column container"></div>');

        contanier.append(`<div class="d-flex justify-content-center">
                                    <img src="${production.image}" class="img-fluid w-75" alt="${production.title}">
                                </div>
                                <div>
                                    <h1 class="card-title">${production.title}</h1>
                                    <button id="b-open" data-id="${production.title}" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
                                    <button id="b-favorite" data-id="${production.title}" class="btn btn-primary text-uppercase mr-2 px-4">Favoritos</button>
                                    <div class="d-flex gap-5 flex-wrap" id='infoProduction'>
                                        <p>${production.nationality}</p>
                                        <p>${production.publication.getFullYear()}</p>
                                    </div>
                                    <h5>Sinopsis:</h5>
                                    <p class="card-text">${production.synopsis}</p>
                                    <div id='infoPersons' class='d-flex gap-5 justify-content-evenly flex-wrap'>
                                        <div id="DirectoresId">
                                            <h5>Director:</h5>
                                        </div>
                                        <div id="ActoresId">
                                            <h5>Cast:</h5>
                                        </div>
                                </div>
                            </div>`);


        //Introducimos el contenedor
        this.main.append(contanier);

        //Obtenemos para insertar los actores de la produccion
        let persons = $('#infoPersons');
        let cast = persons.children().last();
        let directors = persons.children().first();

        //Mostrar los directores de la produccion
        for (const director of directorIterator) {
            directors.append(`<a data-person='${director.name}/${director.lastname1}' href='#'>${director.name} ${director.lastname1} ${director.lastname2}</a><br>`);
        }

        //Mostrar el cast de la produccion
        for (const actor of castIterator) {
            cast.append(`<a data-person='${actor.name}/${actor.lastname1}' href='#'>${actor.name} ${actor.lastname1} ${actor.lastname2}</a><br>`);
        }

        let info = $('#infoProduction');

        //mostramos contenido segun si es serie o pelicula
        if (production.constructor.name == 'Serie') {

            info.append(production.seasons + " temporadas");

            let table = $(`<table class="table table-hover"><tbody></tbody></table>`);
            let indice = 0;
            for (let chapter of production.resources) {

                table.append(`<tr>
                                <th>${++indice}</th>
                                <td>${chapter.link}</td>
                                <td>${this.#convertMinToHours(chapter.duration)}</td>
                            </tr>`);
            }

            contanier.append(table);
        } else if (production.constructor.name == 'Movie') {

            //En caso que sea pelicula
            if (production.resource.duration != null) {
                info.append(this.#convertMinToHours(production.resource.duration));
            }
        }

        if (production.locations.length > 0) {
            contanier.append(`<div class="container"><h5>Ubicaciones: </h5><div class="m-4" id="mapidProd" name='mapid'></div></div>`);

            let mapContainerProd = $('#mapidProd');
            mapContainerProd.css({
                height: '250px',
                border: '2px solid #faa541',
            });

            let mapProd = L.map('mapidProd').setView([production.locations[0].latitude, production.locations[0].longitude], 15);
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }).addTo(mapProd);


            for (let location of production.locations) {
                L.marker([location.latitude, location.longitude]).addTo(mapProd);

            }
        }
    }


    /**
     * Mostrar la lista de todos los actores/directores registrados
     * @param {*} persons Iterator de Person
     * @param {*} type Filtrar por Actor o Director
     */
    showPersonsList(persons, type) {
        this.main.empty();

        let contanierPrincipal = $('<div></div>');
        contanierPrincipal.addClass('container');

        contanierPrincipal.append(`<h1>${type}</h1>`);
        contanierPrincipal.addClass("text-center");

        let contanierPerson = $(`<div id="${type}Id" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>`);

        for (let person of persons) {
            contanierPerson.append(`<a data-person="${person.name}/${person.lastname1}" href='#' ><div class="card" style="width: 18rem;">
                         <img src="${person.picture}" class="card-img-top" alt="${person.name}">
                             <div class="card-body">
                                 <h5 class="card-title">${person.name} ${person.lastname1}</h5>
                             </div>
                        </div ></a>`);
        }
        contanierPrincipal.append(contanierPerson);
        this.main.append(contanierPrincipal);

    }


    /**
     * Donde muestra la ficha del actor/director
     * @param {*} person Objeto Person
     * @param {*} producciones Iterator de las producciones realizadas por el actor/actriz o director
     */
    showFichaPerson(person, producciones) {
        this.main.empty();

        let contanier = $('<div class="container h-50"></div>');

        contanier.append(`<div class="row h-50">
                            <div class="col-md-4 h-50">
                                    <img src="${person.picture}" class="img-fluid h-50" alt="${person.name}">
                            </div>
                            <div class="col-md-8">
                                <div>
                                    <h1 class="card-title">${person.name} ${person.lastname1} ${person.lastname2}</h1>
                                    <button id="b-open" data-id="${person.name}/${person.lastname1}" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
                                    <div class="d-flex gap-5" id='infoProduction'>
                                        <p><b>Nacimiento: </b>${person.born.toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`);

        //Introducimos el contenedor 
        this.main.append(contanier);

        //Mostrar las producciones de la persona
        let produccionesContanier = $('<div class="row col-md-12"></div>');
        produccionesContanier.append('<h2 class="col">Producciones: </h2>');
        let produccionesCont = $('<div id="productions" class="d-flex gap-5 flex-row flex-wrap"></div>');
        produccionesCont.addClass("text-center");

        for (const production of producciones) {
            produccionesCont.append(`<a data-produccion="${production.title}" href='#'>
            <div class="card" style="width: 18rem;">
                <img src="${production.image}" class="card-img-top img-fluid" alt="${production.title}">
                    <div class="card-body">
                        <h5 class="card-title">${production.title}</h5>
                    </div>
           </div></a>`);
        }

        produccionesContanier.append(produccionesCont);

        contanier.append(produccionesContanier);
    }


    /**
     * Donde muestra la ficha del actor/director en una nueva ventana
     * @param {*} person Objeto Person
     * @param {*} producciones Iterator de las producciones realizadas por el actor/actriz o director
     */
    showFichaPersonNewWindow(person, producciones) {

        let main = $(this.fichaWindow.document).find('main');

        let contanier = $('<div class="container h-50"></div>');

        contanier.append(`<div class="row h-50">
                            <div class="col-md-4 h-50">
                                    <img src="${person.picture}" class="img-fluid h-50" alt="${person.name}">
                            </div>
                            <div class="col-md-8">
                                <div>
                                    <h1 class="card-title">${person.name} ${person.lastname1} ${person.lastname2}</h1>
                                    <div class="d-flex gap-5" id='infoProduction'>
                                        <p><b>Nacimiento: </b>${person.born.toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`);

        //Introducimos el contenedor 
        main.append(contanier);

        //Mostrar las producciones de la persona
        let produccionesContanier = $('<div class="row col-md-12"></div>');
        produccionesContanier.append('<h2 class="col">Producciones: </h2>');

        let produccionesCont = $('<div id="productions" class="d-flex gap-5 flex-row flex-wrap"></div>');

        for (const production of producciones) {
            produccionesCont.append(`
            <div class="card" style="width: 18rem;">
                <img src="${production.image}" class="card-img-top img-fluid" alt="${production.title}">
                    <div class="card-body">
                        <h5 class="card-title">${production.title}</h5>
                    </div>
           </div>`);
        }

        produccionesContanier.append(produccionesCont);

        contanier.append(produccionesContanier);
    }

    //Eventos para cuando pulse una categoria tanto en main o en el menu
    bindProductions(handler) {
        $('#productions').find('a').click((event) => {
            let produccion = event.currentTarget.dataset.produccion;

            this.#excecuteHandler(handler, [produccion], 'body', { action: 'showProduction', produccion: produccion }, '#Production', event);
        });
    }

    //Eventos para cuando pulse en un actor o actriz
    bindActors(handler) {
        $('#ActoresId').find('a').click((event) => {
            let person = event.currentTarget.dataset.person;

            this.#excecuteHandler(handler, [person], 'body', { action: 'showActor', person: person }, '#showActor', event);
        });
    }

    //Eventos para cuando pulse en un director
    bindDirectores(handler) {
        $('#DirectoresId').find('a').click((event) => {
            let person = event.currentTarget.dataset.person;

            this.#excecuteHandler(handler, [person], 'body', { action: 'showDirector', person: person }, '#showDirector', event);
        });
    }

    /**
     * Evento al pulsar el boton de abrir en una nueva ventana la ficha
     * @param {} handler 
     */
    bindShowFichaInNewWindow(handler) {
        $('#b-open').click((event) => {
            let title = event.target.dataset.id;
            //Buscamos por titlo con el target de la ventana y que este abierta, devuelve la referencia de la ventana
            let existe = this.fichaWindowRegistry.find((windowR) => windowR.name === title && !(windowR.closed));

            //En caso que no exista la ventana, la creamos
            if (!existe) {
                this.fichaWindow = window.open("auxWindow.html", `${title}`, "width=800, height=600, top=250, left=350, titlebar=yes, toolbar=no, menubar=no, location=no");

                this.fichaWindow.addEventListener('DOMContentLoaded', () => {

                    handler(event.target.dataset.id);

                });
                this.fichaWindowRegistry.push(this.fichaWindow);
            } else {
                //En caso que exista, la mostramos en la vista
                existe.focus();
            }

        });
    }


    /**
     * Mostramos la opcion de eliminar las ventanas que tengan la referencias en la barra 
     * de navegacion de la pagina inicial
     */
    showButtonCloseWindowsMenu() {
        this.menu.append(`<li class="nav-item">
                            <button type='button' id='b-closeW' class="nav-link collapse-link active btn btn-link" >Cerrar Ventanas</button>
                        </li>`);
    }

    /**
     * el evento 
     */
    bindClose(handler) {
        $('#b-closeW').click(function (event) {
            handler();
        });
    }

    /**
     * Metodo donde comprueba esta abierto y lo cierra
     * Una vez hecho, vaciamos la array de las ventanas
     */
    closeWindows() {
        for (const windowA of this.fichaWindowRegistry) {
            if (!windowA.closed) {
                windowA.close();
            }
        }

        this.fichaWindowRegistry = [];  //Una vez cerradas, lo vaciamos la array
    }

    /**
     * ADMINISTRACIÓN
     */



    /**
     * Mostrar en el menu la opcion de Adminstrador
     */
    showAdminMenu() {
        let li = $(`<li class="nav-item dropdown" id='MenuAdminstrador'>
                        <a class="nav-link dropdown-toggle text-white" href="#" id="AdminMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-has-popup="true">
                            Admin
                        </a>
                    </li>`);

        let container = $('<div class="dropdown-menu ps-3" aria-labelledby="AdminMenu" id="category-list-menu"></div>');

        container.append(`<button type='button' id="newProduccion" class="nav-link dropdown-item collapse-link btn btn-link text-black">
                            Nueva producción
                        </button>
                        <button type='button' id="delProduccion" class="nav-link dropdown-item collapse-link btn btn-link text-black">
                            Eliminar producción
                        </button>
                        <button type='button' id="asigProducion" class="nav-link dropdown-item collapse-link btn btn-link text-black">
                            Asignar/desasignar actores/directores de la producción
                        </button>
                        <button type='button' id="newCategory" class="nav-link dropdown-item collapse-link btn btn-link text-black">
                            Nueva Categoria
                        </button>
                        <button type='button' id="delCategory" class="nav-link dropdown-item collapse-link btn btn-link text-black">
                            Eliminar Categoria
                        </button>
                        <button type='button' id="newPerson" class="nav-link dropdown-item collapse-link btn btn-link text-black">
                            Nueva Persona
                        </button>
                        <button type='button' id="delPerson" class="nav-link dropdown-item collapse-link btn btn-link text-black">
                            Eliminar Persona
                        </button>
                        <button type='button' id="grabarJSON" class="nav-link dropdown-item collapse-link btn btn-link text-black">
                        Grabar objetos a JSON
                        </button>`);

        li.append(container);
        this.menu.append(li);
    }



    bindAdmin(handlerNewProduccion, handlerDelProduccion, handlerAsigProducion, handlerNewCategory, handlerDelCategory, handlerNewPerson, handlerDelPerson, handlerGrabarJSON) {
        $('#newProduccion').click((event) => {
            handlerNewProduccion();
        });
        $('#delProduccion').click((event) => {
            handlerDelProduccion();
        });
        $('#asigProducion').click((event) => {
            handlerAsigProducion();
        });
        $('#newCategory').click((event) => {
            handlerNewCategory();
        });
        $('#delCategory').click((event) => {
            handlerDelCategory();
        });
        $('#newPerson').click((event) => {
            handlerNewPerson();
        });
        $('#delPerson').click((event) => {
            handlerDelPerson();
        });
        $('#grabarJSON').click((event) => {
            handlerGrabarJSON();
        });
    }

    /**
     * Para poder eliminar correctamente el modal del arbol DOM 
     */
    bindCloseModal() {
        let myModal = new bootstrap.Modal(document.getElementsByClassName('modal')[0], {
            keyboard: false
        });

        myModal.show();

        $('.buttonClose').click((event) => {
            $('body .modal').remove();
            // myModal.dispose()
        });
    }

    bindCloseModalAlert() {
        let myModal = new bootstrap.Modal(document.getElementById('messageModal'), {
            keyboard: false
        });

        myModal.show();

        $('.buttonCloseM').click((event) => {
            $('#messageModal').remove();
        });
    }

    /**
    * Evento donde se enlaza con el boton de los listados para eliminar la persona del sistema
    * @param {*} handlerDirector 
    * @param {*} handlerActor 
    */
    bindDelPersonForm(handlerDirector, handlerActor) {
        delPersonValidation(handlerDirector, handlerActor);
    }

    /**
     * Vertificar el formulario de añadir Produccion 
     * @param {*} handler 
    */
    bindNewProductionForm(handler) {
        newProductionValidation(handler);
    }

    /**
     * Vertificar el formulario de eliminar Produccion 
     * @param {*} handler 
    */
    bindDelProductionForm(handler) {
        delProductionValidation(handler);
    }

    /**
    * Vertificar el formulario de añadir Categoria 
    * @param {*} handler 
    */
    bindNewCategoryForm(handler) {
        newCategoryValidation(handler);
    }
    /**
    * Vertificar el formulario de eliminar Categoria 
    * @param {*} handler 
    */
    bindDelCategoryForm(handler) {
        delCategoryValidation(handler);
    }

    /**
    * Vertificar el formulario de añadir Persona 
    * @param {*} handler 
    */
    bindNewPersonForm(handler) {
        newPersonValidation(handler);
    }

    /**
    * Enlazar el evento cuando produce un cambio en el select del formulario de asignar o desasignar a una produccion
    * @param {*} handler 
    */
    bindShowAssignsProd(handler) {

        selectProdAssignDes(handler);
    }

    /**
     * Enlazar el evento y validar cuando haya pulsado el boton de intercambio de propiedades del formulario de asignar o desasignar a una produccion
     * @param {*} handlerDirectors 
     * @param {*} handlerActors 
     * @param {*} prod 
     */
    bindAssignDesProduction(handlerDirectors, handlerActors, prod) {
        assignDesValidation(handlerDirectors, handlerActors, prod);
    }

    /**
     * MENSAJE DE ACCION TRAS DE UNA OPERACION REALIZADA
     */


    /**
     * Estructura modal global para mostrar al usuario de si ha realizado correctamente o no 
     */
    showModalAlertAction(done, feedback) {
        let styleBackground, title;


        if (done) {
            //En caso de correcto, mostrar en correcto
            styleBackground = "background-color:#d1e7dd";
            title = `<i class="bi bi-check-circle"></i>
            <h1 class="modal-title fs-5" id="exampleModalLabel">Exito</h1>`;
        } else {
            //En caso de fallo, mostrar en error
            styleBackground = "background-color:#f8d7da";
            title = `<i class="bi bi-x-circle"></i>
            <h1 class="modal-title fs-5" id="exampleModalLabel">Error</h1>`;
        }

        //Mostrar el modal con la informacion requerida
        $('body').append(`<div class="modal fade" id="messageModal" style="z-index: 1900" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content" style='${styleBackground}'>
                <div class="modal-header gap-2 alert-primary" >
                  ${title}
                  <button type="button" class="btn-close buttonCloseM" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ${feedback}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-dark buttonCloseM" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>`);
    }

    /**
     * Una vez hecho una actualizacion en el modelo, mostrar el mensaje al usuario
     * @param {*} done 
     * @param {*} categ 
     * @param {*} feedback 
     */
    showMessageActionDelCategory(done, categ, feedback) {
        if (done) {
            feedback = `La categoria <strong>${categ.name}</strong> ha sido eliminada correctamente`;

            //Reiniciamos el formulario una vez realizado la operacion
            let divCat = $('#selectDelCategory').find(`option[value="${categ.name}"]`);
            divCat.remove();
            document.formDelCategory.reset();
        } else {

            feedback = feedback.message;
        }

        this.showModalAlertAction(done, feedback);
    }

    /**
     * Una vez hecho una actualizacion en el modelo, mostrar el mensaje al usuario
     * @param {*} done 
     * @param {*} categ 
     * @param {*} feedback 
     */
    showMessageActionAddCategory(done, categ, feedback) {

        if (done) {
            feedback = `La categoria <strong>${categ.name}</strong> ha sido añadida correctamente`;

            //Reiniciamos el formulario 
            document.formNewCategory.reset();

        } else {
            feedback = feedback.message;

        }
        //Mostrar el mensaje con el modal global con su mensaje
        this.showModalAlertAction(done, feedback);

    }

    /**
     * Una vez hecho una actualizacion en el modelo, mostrar el mensaje al usuario
     * @param {*} done 
     * @param {*} categ 
     * @param {*} feedback 
     */
    showMessageActionAddProd(done, prod, feedback) {

        if (done) {
            feedback = `La produccion <strong>${prod.title}</strong> ha sido añadido`;

            document.formNewProduction.reset();
            document.fGeocoder.reset();
            $('#geocoderAddresses').empty();
            //Eliminar puntos
            map.eachLayer(function (layer) {
                if (layer._shadow) {
                    map.removeLayer(layer);
                }
            });


        } else {
            feedback = feedback.message;

        }

        this.showModalAlertAction(done, feedback);

    }

    /**
     * Una vez hecho una actualizacion en el modelo, mostrar el mensaje al usuario
     * @param {*} done 
     * @param {*} categ 
     * @param {*} feedback 
     */
    showMessageActionDelProd(done, production, feedback) {

        if (done) {
            feedback = `La produccion <strong>${production.title}</strong> ha sido eliminada correctamente`;

            let divCat = $('#selectDelProd').find(`option[value="${production.title}"]`);
            divCat.remove();
            document.formDelProduction.reset();
        } else {

            feedback = feedback.message;

        }

        this.showModalAlertAction(done, feedback);

    }

    /**
     * Una vez hecho assignar o desassignar a los directores de una produccion, mostrar el mensaje
     * @param {} done 
     * @param {*} director 
     * @param {*} feedback 
     */
    showMessageActionAssignDirector(done, director, feedback) {

        if (done) {
            feedback = `Ha sido un exito el proceso solicitado para Directores`;
        } else {
            feedback = feedback.message;
        }

        this.showModalAlertAction(done, feedback);
    }

    /**
     * Una vez hecho assignar o desassignar a los Actores de una produccion, mostrar el mensaje
     */
    showMessageActionAssignActores(done, actor, feedback) {

        if (done) {
            feedback = `Ha sido un exito el proceso solicitado para Actores`;
        } else {
            feedback = feedback.message;
        }

        this.showModalAlertAction(done, feedback);
    }

    /**
     * Una vez hecho añadir un usuario, mostrar el mensaje
     */
    showMessageAddPerson(done, person, feedback) {
        if (done) {

            feedback = `La persona <strong>${person.name}</strong> ha sido añadido`;
            document.formNewPerson.reset();
        } else {
            feedback = feedback.message;
        }

        this.showModalAlertAction(done, feedback);
    }

    /**
     * Una vez hecho añadir un usuario, mostrar el mensaje
     */
    showMessageDelPerson(done, person, feedback) {

        if (done) {
            feedback = `La persona <strong>${person.name}</strong> ha sido eliminado`;
            document.formDelPersonDirector.reset();
            document.formDelPersonActor.reset();
            let formPerson = $('#formRemPerson').find(`option[value="${person.name}/${person.lastname1}"]`);
            formPerson.remove();
        } else {
            feedback = feedback.message;
        }

        this.showModalAlertAction(done, feedback);
    }

    /**
     * FORMULARIOS
     */

    /**
     * Mostrar Modal de añadir una produccion 
     * @param {*} actorIterator 
     * @param {*} directorIterator 
     * @param {*} categoriesIterator 
     */
    showModalAddProduction(actorIterator, directorIterator, categoriesIterator) {
        $('body').append(`<div class="modal fade" id="formAddProduction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Nuevo Produccion</h1>
                        <button type="button" class="btn-close buttonClose" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form name="formNewProduction" role="form" enctype="multipart/form-data" novalidate>
                        <div class="modal-body" id='formBody'>
                        <div class='row'>
                        <div class='row'>
                            <div class="col-md-6">
                                <label for="Ptitle" class="form-label">Titulo</label>
                                <input type="text" class="form-control" id="Ptitle" name='Ptitle'  required>
                                <div class="invalid-feedback">El titulo es obligatorio.</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                            <div class="col-md-6">
                                <label for="Pimage" class="form-label">Imagen</label>
                                <input type="file" class="form-control" id="Pimage" name='Pimage' required>
                                <div class="invalid-feedback">La imagen es obligatorio y con extensión jpg, png o gif.</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>
                            <div class='row'>
                            <div class="col-md-6">
                                <label for="Nacionalidad" class="form-label">Nacionalidad</label>
                                <input type="text" class="form-control" id="Nacionalidad" name='Nacionalidad'>
                                <div class="invalid-feedback">La nacionalidad es obligatorio.</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                            <div class="col-6">
                                <label for="Pdate" class="form-label">Fecha de publicacion</label>
                                <input type="date" class="form-control" id="Pdate" required pattern="\d{2}/\d{2}/\d{4}">
                                <div class="invalid-feedback">La fecha es obligatorio.</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                            </div>
                            <div class="col-12">
                                <label for="PSynopsis" class="form-label">Synopsis</label>
                                <textarea class="form-control" id="PSynopsis" name="PSynopsis" aria-describedby="Synopsis" rows="4"></textarea>
                            </div>
                        </div>
                        
                        </div>
                        <div class="modal-footer">
                            <button type="button" id='buttonClose' class="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cerrar</button>
                            <button type="reset" class="btn btn-secondary">Borrar datos</button>
                            <button type="submit" class="btn btn-primary">Crear nueva produccion</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`);

        let formProduc = $('#formBody');

        let alertsSelect = $(`<div class="invalid-feedback">Debe seleccionar al menos uno.</div>
        <div class="valid-feedback">Correcto.</div>`);

        let contanierPerson = $('<div class="row">');
        //Categorias
        let contanierSelectCategory = $('<div class="col-md-4">');
        contanierSelectCategory.append('<label for="newproCategories" class="form-label">Categorias</label>');

        let categoriesSelectCategory = $(`<select class="form-select" aria-label="multiple select Categorias" id="newproCategories" name="newproCategories" aria-describedby="newproCategories" multiple required></select>`);

        for (let category of categoriesIterator) {
            categoriesSelectCategory.append(`<option value="${category.name}">${category.name}</option>`);
        }

        contanierSelectCategory.append(categoriesSelectCategory);
        // formProduc.append(contanierSelectCategory);
        contanierPerson.append(contanierSelectCategory);
        contanierSelectCategory.append(alertsSelect);

        //Person


        let contanierSelectPerson = $('<div class="col-md-4">');
        contanierSelectPerson.append('<label for="newproDirector" class="form-label">Directores:</label>');

        let categoriesSelect = $(`<select class="form-select" aria-label="multiple select Directores" id="newproDirector" name="newproDirector" aria-describedby="director" multiple required></select>`);

        for (let director of directorIterator) {
            categoriesSelect.append(`<option value="${director.name}/${director.lastname1}">${director.name} ${director.lastname1}</option>`);
        }

        contanierSelectPerson.append(categoriesSelect);
        contanierPerson.append(contanierSelectPerson);
        contanierSelectPerson.append(alertsSelect.clone());


        let contanierSelectActor = $('<div class="col-md-4">');
        contanierSelectActor.append('<label for="newproActor" class="form-label">Actores:</label>');

        let categoriesSelectActor = $(`<select class="form-select" aria-label="multiple select Actores" id="newproActor" name="newproActor" aria-describedby="actor" multiple required></select>`);

        for (let actor of actorIterator) {
            categoriesSelectActor.append(`<option value="${actor.name}/${actor.lastname1}">${actor.name} ${actor.lastname1}</option>`);
        }

        contanierSelectActor.append(categoriesSelectActor);
        contanierPerson.append(contanierSelectActor);

        contanierSelectActor.append(alertsSelect.clone());
        formProduc.append(contanierPerson);

        formProduc.append(`<div class="col-md-6"><label class="form-check-label pt-3" for="selectType">Tipo de produccion:</label>
                        <select class="form-select" aria-label="select Produccion" id='selectType' name='selectType' required>
                        <option value="" selected>Seleccione el tipo de produccion</option>
                        <option value="Movie">Pelicula</option>
                        <option value="Serie">Serie</option>
                      </select>
                      <div class="invalid-feedback">Debe seleccionar que tipo de produccion es.</div>
                    <div class="valid-feedback">Correcto.</div></div>`);

        formProduc.append(`<div class="container p-4">
        <form id="fGeocoder" method="get" name='fGeocoder' action="https://nominatim.openstreetmap.org/search">
            <input type="hidden" name="format" value="json">
            <input type="hidden" name="limit" value="3">
            <h2>Buscar:</h2>
            <div class="form-group row">
                <div class="col-sm-10">
                    <label for="address" class="col-form-label">Dirección</label>
                    <input type="text" name="q" class="form-control" id="address" placeholder="Introduce la dirección a buscar">
                </div>
                <div class="col-sm-2 align-self-end">
                    <button id="bAddress" class="btn btn-primary" type="submit">Buscar</button>
                </div>
            </div>
            <div id="geocoderAddresses"></div>
            <div id="geocoderMap" class="my-2"></div>
        </form>
    </div>`);

        formProduc.append(`<div class="container"><div class="m-4" id="mapid" name='mapid'></div></div>`);

        let mapContainer = $('#mapid');
        mapContainer.css({
            height: '250px',
            border: '2px solid #faa541',
            margin: '0',
            padding: '0'
        });


    }

    /**
    * Mostrar el modal de Añadir categorias 
    */
    showModalAddCategory() {
        $('body').append(`<div class="modal fade" id="formAddCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Nueva Categoria</h1>
              <button type="button" class="btn-close buttonClose" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form name="formNewCategory" role="form" novalidate>
                <div class="modal-body" id='formBody'>
                    <div class="mb-3">
                        <label for="nombreCategoria" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="nombreCategoria" name="nombreCategoria" aria-describedby="nombre Categoria" required>
                        <div class="invalid-feedback">El nombre es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>

                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="description" id="description" name="description" style="height: 100px"></textarea>
                        <label for="description">Description</label>
                        <div class="invalid-feedback">El nombre es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" id='buttonClose' class="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary">Crear nueva categoria</button>
                </div>
            </form>
          </div>
        </div>
      </div>`);

    }

    /**
     * Modal donde se puede eliminar una categoria
     * @param {*} categoriasIterator 
     */
    showModalRemoveCategory(categoriasIterator) {
        $('body').append(`<div class="modal fade" id="formRemCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Categoria</h1>
              <button type="button" class="btn-close buttonClose" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form name="formDelCategory" role="form" id='formDelC' novalidate>
                <div class="modal-body" id='formBody'>

                </div>
                <div class="modal-footer">
                <button type="button" id='buttonClose' class="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary">Eliminar la categoria</button>
                </div>
            </form>
          </div>
        </div>
      </div>`);

        let formBody = $('#formBody');
        let group = $(`<div>`);
        let select = $(`<input class="form-control mb-4" list='DelCategory' id='selectDelCategory' name='selectDelCategory' aria-label="Select eliminar Categoria" placeholder="Escribe para buscar..." required>`);
        let datalist = $(`<datalist id='DelCategory'>`);
        for (let categoria of categoriasIterator) {
            datalist.append(`<option value="${categoria.name}">`);
        }
        select.append(datalist);

        group.append(select);
        group.append(`<div class="invalid-feedback">Debe escribir una categoria existente para eliminar.</div>
                    <div class="valid-feedback">Correcto.</div>`);
        formBody.append(group);
    }

    /**
     * Muestra el modal para eliminar Producciones del sistema
     * @param {} productionsIterator 
     */
    showModalRemoveProductions(productionsIterator) {
        $('body').append(`<div class="modal fade" id="formRemProduction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Produccion</h1>
              <button type="button" class="btn-close buttonClose" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form name="formDelProduction" role="form" novalidate>
                <div class="modal-body" id='formBody'>

                </div>
                <div class="modal-footer">
                <button type="button" id='buttonClose' class="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary">Eliminar la produccion</button>
                </div>
                </form>
          </div>
        </div>
      </div>`);

        let formBody = $('#formBody');

        let select = $(`<select class="form-select mb-4" id='selectDelProd' aria-label="Select eliminar Producciones" required>`);
        select.append(`<option value="">Seleccione una produccion</option>`);
        for (let prod of productionsIterator) {
            select.append(`<option value="${prod.title}">${prod.title}</option>`);
        }

        formBody.append(select);
        formBody.append(`<div class="invalid-feedback">Debe seleccionar una produccion para eliminar.</div>
        <div class="valid-feedback">Correcto.</div>`);
    }

    /**
     * Modal donde se muestra el select de elegir una produccion,
     * para luego poder assignar / desassignar actores/directores
     * @param {} productionsIterator 
     */
    showModalAssignProductions(productionsIterator) {
        $('body').append(`<div class="modal fade" id="formAssignProduction" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Asignar Actores/Directores a la Produccion</h1>
                        <button type="button" class="btn-close buttonClose" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form name="formAssignDesProd" role="form" novalidate>
                        <div class="modal-body" id='formBody'>
                            
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" id='buttonClose' class="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cerrar</button>
                                                      
                        </div>
                    </form>
                </div>
            </div>
        </div>`);

        let bodyForm = $('#formBody');
        let contenedor = $(`<div id='selectProd'></div>`);
        let select = $(`<select class="form-select mb-4" id='selectProd' aria-label="Default select example">`);

        select.append(`<option value="">Seleccione una produccion</option>`);
        for (let prod of productionsIterator) {
            select.append(`<option value="${prod.title}">${prod.title}</option>`);
        }
        contenedor.append(select);
        contenedor.append(`<div class="invalid-feedback">Debes seleccionar una produccion.</div>`);
        bodyForm.append(contenedor);
    }


    /**
     * Mostrar los listados disponibles y lo que tiene asignado, pemitir assignar/desassignar de la produccion
     * @param {*} directorIterator 
     * @param {*} actorIterator 
     * @param {*} getCast 
     * @param {*} getProductionsDirector 
     */
    showAssignProductionModule(getCast, getProductionsDirector, getDirectorsAvailableProd, getActorsAvailableProd) {
        let bodyForm = $('#formBody');

        let fila = $('#formBody .row');
        if (fila.children().length > 0) fila.remove();

        //Person Directores
        let contanierPerson = $('<div class="row">');
        //Primer select que son los directores que estan disponibles
        let contanierSelectPerson = $('<div class="col-md-5">');
        contanierSelectPerson.append('<label for="Director" class="form-label">Directores disponibles</label>');

        let categoriesSelect = $(`<select class="form-select" multiple aria-label="multiple select Directores" id="Director" name="Director" aria-describedby="director"></select>`);

        for (let director of getDirectorsAvailableProd) {
            categoriesSelect.append(`<option value="${director.name}/${director.lastname1}">${director.name} ${director.lastname1}</option>`);

        }

        contanierSelectPerson.append(categoriesSelect);
        contanierPerson.append(contanierSelectPerson);
        //boton
        contanierPerson.append(`<div class="col-md-2 d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-primary directorButton">
          <i class="bi bi-arrow-left-right"></i></button>
          
        </div>`);

        //Segundo select, que son directores que estan asignados 
        let contanierSelectPerson2 = $('<div class="col-md-5">');
        contanierSelectPerson2.append(`<label for="DirectorProd" class="form-label">Directores asignados</label>`);
        let assignDirector = $(`<select class="form-select" multiple aria-label="multiple select Directores" id="DirectorProd" name="DirectorProd" aria-describedby="director"></select>`);

        for (let director of getProductionsDirector) {

            assignDirector.append(`<option value="${director.name}/${director.lastname1}">${director.name} ${director.lastname1}</option>`);
        }

        contanierSelectPerson2.append(assignDirector)
        contanierPerson.append(contanierSelectPerson2);
        contanierSelectPerson2.append(`<div class="invalid-feedback">Debes seleccionar</div>`);
        //Turno de los actores
        //Primer select donde muestra los actores disponibles 
        let contanierPersonActor = $('<div class="row mt-4">');


        let contanierSelectPersonActor = $('<div class="col-md-5">');
        contanierSelectPersonActor.append('<label for="Actor" class="form-label">Actores disponibles</label>');

        let categoriesSelectActor = $(`<select class="form-select" multiple aria-label="multiple select actor" id="Actor" name="Actor" aria-describedby="director"></select>`);

        for (let actor of getActorsAvailableProd) {
            categoriesSelectActor.append(`<option value="${actor.name}/${actor.lastname1}">${actor.name} ${actor.lastname1}</option>`);
        }
        contanierSelectPersonActor.append(categoriesSelectActor);
        contanierPersonActor.append(contanierSelectPersonActor);
        contanierSelectPersonActor.append(` <div class="invalid-feedback">Debes seleccionar</div>`);
        //boton
        contanierPersonActor.append(`<div class="col-md-2 d-flex gap-2 flex-column justify-content-center align-items-center">
          <button type="button" class="btn btn-primary actorButton">
          <i class="bi bi-arrow-left-right"></i></button>
        </div>`);

        let contanierSelectPersonActor2 = $('<div class="col-md-5">');
        contanierSelectPersonActor2.append(`<label for="ActorProd" class="form-label">Actores asignados:</label>`);
        let assignActor = $(`<select class="form-select" multiple aria-label="multiple select Actores" id="ActorProd" name="ActorProd" aria-describedby="director"></select>`);
        //Segundo selec donde se muestra los actores que estan asociados 
        for (let actor of getCast) {

            assignActor.append(`<option value="${actor.name}/${actor.lastname1}">${actor.name} ${actor.lastname1}</option>`);
        }

        contanierSelectPersonActor2.append(assignActor);
        contanierPersonActor.append(contanierSelectPersonActor2);
        bodyForm.append(contanierPerson);
        bodyForm.append(contanierPersonActor);
    }

    /**
     * Modal donde permite añadir Persona
     */
    showModalAddPerson() {
        $('body').append(`<div class="modal fade" id="formAddPerson" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Nueva Persona</h1>
                        <button type="button" class="btn-close buttonClose" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form name="formNewPerson" role="form" enctype="multipart/form-data" novalidate>
                    <div class="modal-body" id='formBody'>
                    <div class="col-md-12">
                    <label for="selectType" class="form-label">Tipo de persona*</label>
                      <select class="form-select" aria-label="Default select example" id='selectType' name='selectType' required>
                        <option value="" selected>Seleccione el tipo de persona</option>
                        <option value="Director">Director</option>
                        <option value="Actor">Actor</option>
                      </select>
                        <div class="invalid-feedback">El tipo es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                    <div class='row'>
                        <div class="col-md-5 p-3">
                            <label for="PersonName" class="form-label">Nombre*</label>
                            <input type="text" class="form-control" id="PersonName" name='PersonName' required>
                            <div class="invalid-feedback">El nombre es obligatorio.</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                        <div class="col-md-4 p-3">
                            <label for="PersonLastName1" class="form-label">Primer Apellido*</label>
                            <input type="text" class="form-control" id="PersonLastName1" name='PersonLastName1' required>
                            <div class="invalid-feedback">El primer apellido es obligatorio.</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                        <div class="col-md-3 p-3">
                            <label for="PersonLastName2" class="form-label">Segundo Apellido</label>
                            <input type="text" class="form-control" id="PersonLastName2" name='PersonLastName2'>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                    </div>
                    <div class='row'>
                    <div class="col-md-6 p-3">
                        <label for="Pdate" class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control" id="Pdate" required pattern="\d{2}/\d{2}/\d{4}">
                        <div class="invalid-feedback">La fecha es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                    <div class="col-md-6 p-3">
                        <label for="Pimage" class="form-label">Imagen</label>
                        <input type="file" class="form-control" id="Pimage" name='Pimage' required>
                        <div class="invalid-feedback">La imagen es obligatorio y con extensión jpg, png o gif.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                    </div>
                </div>
                        <div class="modal-footer">
                            <button type="button" id='buttonClose' class="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cerrar</button>
                            <button type="reset" class="btn btn-secondary">Borrar datos</button>
                            <button type="submit" class="btn btn-primary">Crear nueva persona</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`);
    }

    /**
     * Mostramos el modal del formulario de eliminar Personas
     * @param {*} directorIterator 
     * @param {*} actorIterator 
     */
    showModalRemovePerson(directorIterator, actorIterator) {
        $('body').append(`<div class="modal fade" id="formRemPerson" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Persona</h1>
              <button type="button" class="btn-close buttonClose" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id='formBody'>
            <form name="formDelPersonDirector" role="form" id='formDelPersonDirector' novalidate>
            <div>
                <label for='selectDelDirector'>Directores</label>
                <select class="form-select mb-4" id='selectDelDirector' aria-label="Select eliminar Director" required></select>

                <div class="invalid-feedback">Debe seleccionar un director para eliminar.</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
                <button type="submit" class="btn btn-primary">Eliminar Director</button>
            
            </form>
            <hr>
            <form name="formDelPersonActor" role="form" id='formDelPersonActor' novalidate>
                <div>
                <label for='selectDelActor'>Actores</label>

                <select class="form-select mb-4" id='selectDelActor' aria-label="Select eliminar Actor" required></select>

                <div class="invalid-feedback">Debe seleccionar un actor para eliminar.</div>
                <div class="valid-feedback">Correcto.</div>
                </div>
                <button type="submit" class="btn btn-primary">Eliminar Actor</button>
            </form>
                </div>
                <div class="modal-footer">
                <button type="button" id='buttonClose' class="btn btn-secondary buttonClose" data-bs-dismiss="modal">Cerrar</button>
                </div>
          </div>
        </div>
      </div>`);

        let selectDirector = $('#selectDelDirector');

        selectDirector.append(`<option value="">Seleccione una Director</option>`);
        for (let director of directorIterator) {
            selectDirector.append(`<option value="${director.name}/${director.lastname1}">${director.name} ${director.lastname1}</option>`);
        }

        let selectActor = $('#selectDelActor');

        selectActor.append(`<option value="">Seleccione una Actor</option>`);
        for (let actor of actorIterator) {
            selectActor.append(`<option value="${actor.name}/${actor.lastname1}">${actor.name} ${actor.lastname1}</option>`);
        }

    }

    /**
     * Mostramos en la barra de navegacion de iniciar sesion , en caso que no exista la cookie
     */
    showLinkLogin() {
        this.areaLogin.empty();
        this.areaLogin.append(`<li class="nav-item">
                            <a id='showLogin' class="nav-link collapse-link active" aria-current="page" href="#">Iniciar Sesion</a>
                        </li>`);

    }

    /**
     * Enlazamos el manejador al evento cuando hace click al login
     * @param {*} handler 
     */
    bindLinkLogin(handler) {
        $('#showLogin').click(() => {
            this.#excecuteHandler(handler, [], 'main', { action: 'login' }, '#Login', event);
        });
    }

    /**
     * Mostrar en main el formulario de login
     */
    showLogin() {
        this.main.empty();
        let divLogin = $(`<div class="container pt-5">
        <div class="d-flex justify-content-center pt-5 ">
            <div class="col-6 p-5 bg-dark-subtle rounded shadow">
                <h2 class="mb-4">Iniciar Sesión</h2>
                <form action="#" class="signin-form" name='formLogin' id='formLogin'>
                    <div class="form-group mt-3">
                        <label class="form-control-placeholder" for="username">Usuario</label>
                        <input type="text" class="form-control" name='username' required>
                        <div class="invalid-feedback">La usuario es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                    <div class="form-group mt-3 mb-3">
                        <label class="form-control-placeholder" for="password">Contraseña</label>
                        <input id="password-field" name='password' type="password" class="form-control" autocomplete=on required>
                        <div class="invalid-feedback">La contraseña es obligatorio.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                    <div class="form-group">
                        <button type="submit" id='btn-login' class="form-control btn btn-primary rounded submit px-3">Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    </div>`);

        this.main.append(divLogin);
    }

    /**
     * Mostrar el mensaje de Error en caso de fallo
     */
    showMessageErrorLogin() {
        let errorExits = $('#alertErrorLogin');
        if (errorExits.length == 0) {
            $('#formLogin').append(`<div class="alert alert-danger" role="alert" id='alertErrorLogin'>Usuario o contraseña incorrectos</div>`);
        }
    }

    /**
     * Validacion de los campos del login
     * @param {*} handler 
     */
    bindLogin(handler) {
        loginValidation(handler);
    }

    /**
     * En caso de no tener sesion, eliminarlo
     */
    removeAdminMenu() {
        $('#MenuAdminstrador').remove();
    }

    /**
     * Asignacion del cookie de sesion 
     * @param {*} user 
     */
    setUserCookie(user) {
        setCookie('loginUserCookie', user.username, 1);
    }

    /**
     * Cambio de historial de ese momento (Login por init)
     */
    initHistory() {
        history.replaceState({ action: 'init' }, null, '#');
    }

    /**
     * Eliminacion del cookie de sesion en caso de cierre
     */
    deleteUserC() {
        setCookie('loginUserCookie', null, 0);
    }

    /**
     * Mostramos el bienvenidos al usuario
     * @param {} user 
     */
    showWelcomeAdmin(user) {
        this.areaLogin.empty();

        let li = $(`<div class='d-flex flex-row align-items-center gap-3 me-5'>
                        <span class="">Bienvenido ${user.username}</span>
                        <button type="button" id='btnClose' class="btn btn-secondary">Cerrar Sesion</button>
                    </div>`);

        this.areaLogin.append(li);
    }

    /**
     * Enlazamos el manejador con el evento, cuando pulse el boton de cierre sesion
     * @param {*} handler 
     */
    bindCloseSession(handler) {
        $('#btnClose').click(function () {
            handler();
        })
    }

    /**
     * Mostrar opcion en nav de producciones favoritas
     */
    showProdFavorites() {
        let li = `<li class="nav-item">
        <a class="nav-link active collapse-link" aria-current="page" href="#" id='prodFavorite-menu' data-nav='ProdFavorites'>Produciones Favoritas</i></a>
        </li>`;
        this.areaLogin.append(li);
    }

    /**
     * Enlazar el manejador con el evento cuando haga el click a boton de prod favorites
     * @param {*} handler 
     */
    bindShowProdFavorites(handler) {
        $('#prodFavorite-menu').click((event) => {
            this.#excecuteHandler(handler, [], 'body', { action: 'showProductionFavorites' }, '#ProductionFavorites', event);
        });
    }

    /**
     * enlazar el manejador con el evento cuando pulse el boton de meterlo en la lista favoritas
     * @param {*} handler 
     */
    bindAddFavoriteProduction(handler) {
        $('#b-favorite').click(function (event) {
            handler(event.target.dataset.id);
        });
    }

    /**
     * Mostrar la lista de producciones favoritas del usuario
     * @param {*} user 
     * @param {*} producciones 
     */
    showProductionsListFavorites(user, producciones) {
        this.main.empty(); //borramos el contenido del main
        let contanierPrincipal = $('<div></div>');
        contanierPrincipal.addClass('container');

        contanierPrincipal.append(`<h1>Producciones favoritas de ${user.username}</h1>`);
        contanierPrincipal.addClass("text-center");
        let contanierProduciones = $('<div id="productions" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>');
        let prodFavorite = localStorage.getItem(`${user.username}`);
        if (prodFavorite != null) {
            let ArrayProdFavorites = prodFavorite.split('/');
            for (let production of producciones) {
                let encontrado = false;
                let i = 0;
                while (!encontrado && ArrayProdFavorites.length > i) {

                    if (production.title == ArrayProdFavorites[i]) {
                        contanierProduciones.append(`
                        <div><a data-produccion="${production.title}" href='#'>
                                          <div class="card" style="width: 18rem;">
                                            <img src="${production.image}" class="card-img-top" alt="${production.title}">
                                                 <div class="card-body">
                                                     <h5 class="card-title">${production.title}</h5>
                                                     <div class='d-flex justify-content-around align-items-center'>
                                                     <p class="card-text"><small class="text-muted">${production.publication.getFullYear()}</small></p>
                                                     
                                                     </div>
                                                 </div>
                                            </div></a>
                                            <button type="button" data-produccion="${production.title}" class="btn btn-danger delProdFavorite"><i class="bi bi-trash-fill"></i>Quitar de la lista</button></div>`);
                        encontrado = true;
                    }
                    i++;
                }
            }
            // 
        } else {
            contanierPrincipal.append(`<p class="alert alert-warning">No hay producciones favoritas</p>`);
        }
        contanierPrincipal.append(contanierProduciones);
        this.main.append(contanierPrincipal);

    }

    /**
    * Una vez hecho una accion con PHP, mostrar el mensaje al admin
    * @param {*} done 
    * @param {*} categ 
    * @param {*} feedback 
    */
    showMessageActionWriteJSON(done, fichero, feedback) {

        if (done) {
            feedback = `El fichero ha sido creado en: ${fichero}`;

        } else {
            feedback = `No se ha recibido respuesta, no se ha podido crear el fichero`;

        }
        //Mostrar el mensaje con el modal global con su mensaje
        this.showModalAlertAction(done, feedback);

    }

    /**
     * Mostrar el mensaje de accion cuando pulse de meterlo en la lista
     * @param {*} done 
     */
    showMessageActionFavoritesProds(done) {
        $('#alertFav').remove();
        if (done) {
            $('#b-favorite').after(`<div class="alert alert-success" id='alertFav' role="alert">
            Ha sido añadido a las producciones favoritas
          </div>`);

        } else {
            $('#b-favorite').after(`<div class="alert alert-danger" id='alertFav' role="alert">
            No se ha podido añadir a favoritos, ya tienes en favoritos o inicia sesion
          </div>`);

        }

    }

    /**
     * Enlazamos el manejador con el evento cuando pulsa para eliminar la produccion de la lista de favoritos
     * @param {*} handler 
     */
    bindRemoveProdFavorite(handler) {
        $('.delProdFavorite').click(function () {
            handler(this.dataset.produccion);
        });
    }


}

export default VideoSystemView;