import { showFeedBack, defaultCheckElement, newCategoryValidation } from './validation.js';

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
        this.menu = $('.navbar-nav');
        this.fichaWindow = null;
        this.fichaWindowRegistry = [];
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
            // handler(this.dataset.nav);

            let nav = event.currentTarget.dataset.nav;
            this.#excecuteHandler(handler, [nav], 'body', { action: 'ListActores', nav: nav }, '#ListActors', event);
        });
    }

    bindDirectorsList(handler) {
        this.menu.find('a[id="director-menu"]').click((event) => {
            // handler(this.dataset.nav);

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
            info.append(this.#convertMinToHours(production.resource.duration));
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
                                        <p><b>Nacimiento: </b>${person.born.getDate()}/${person.born.getMonth()}/${person.born.getFullYear()}</p>
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
                                        <p><b>Nacimiento: </b>${person.born.getDate()}/${person.born.getMonth()}/${person.born.getFullYear()}</p>
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
            // handler(this.dataset.produccion);

            let produccion = event.currentTarget.dataset.produccion;

            this.#excecuteHandler(handler, [produccion], 'body', { action: 'showProduction', produccion: produccion }, '#Production', event);
        });
    }

    //Eventos para cuando pulse en un actor o actriz
    bindActors(handler) {
        $('#ActoresId').find('a').click((event) => {
            // handler(this.dataset.person);

            let person = event.currentTarget.dataset.person;

            this.#excecuteHandler(handler, [person], 'body', { action: 'showActor', person: person }, '#showActor', event);
        });
    }

    //Eventos para cuando pulse en un director
    bindDirectores(handler) {
        $('#DirectoresId').find('a').click((event) => {
            // handler(this.dataset.person);

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
                            <button type='button' id='b-closeW' class="nav-link collapse-link active btn btn-link" href="" >Cerrar Ventanas</button>
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

    showAdminMenu() {
        let li = $(`<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="AdminMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-has-popup="true">
                            Admin
                        </a>
                    </li>`);

        let container = $('<div class="dropdown-menu" aria-labelledby="AdminMenu" id="category-list-menu"></div>');

        container.append(`<a id="newCategory" class="dropdown-item collapse-link" href="#" >
                Nueva Categoria
            </a>`);

        li.append(container);
        this.menu.append(li);
    }

    showModalAddCategory() {
        $('body').append(`<div class="modal fade" id="formAddCategory" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Nueva Categoria</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" id='buttonClose' class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary">Crear nueva categoria</button>
                </div>
            </form>
          </div>
        </div>
      </div>`);

        let myModal = new bootstrap.Modal(document.getElementById('formAddCategory'), {
            keyboard: false
        });

        myModal.show();

        // console.log(form);
        // myModal.addEventListener('reset',function(){
        //     myModal.dispose();
        // })

    }

    bindAdmin(handlerNewCategory) {
        $('#newCategory').click((event) => {
            handlerNewCategory();
        });
    }


    bindNewCategoryForm(handler) {
        console.log("hola");
        newCategoryValidation(handler);
    }

    showNewCategoryMessage(done, categ, error) {
        let form = $('#formBody');
        if (form.children().length > 2) form.children()[2].remove();
        if (done) {
            form.append(`<div class="alert alert-success" role="alert">
                            Ha registrado la nueva categoria ${categ.name}
                        </div>`);
        } else {
            form.append(`<div class="alert alert-danger" role="alert">
                          Ha producido un error: ${error.message}
                        </div>`);
        }
    }



}

export default VideoSystemView;