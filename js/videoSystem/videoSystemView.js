class VideoSystemView {

    #convertMinToHours = (mins) => {
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

    constructor() {
        this.main = $('main');
        this.menu = $('.navbar-nav');
    }

    //Metodo donde carga el contenido inicial
    init(categories) {
        this.main.empty(); //Vaciamos el main

        let contanier = $('<div id="category-list" class="container"></div>');
        contanier.html('<h2>Categorias:</h2>');

        let contanierCategoria = $('<div class="d-flex flex-row flex-wrap justify-content-evenly"></div>');
        //iterar cada categoria 
        for (let categoria of categories) {

            contanierCategoria.append(`<a data-category="${categoria.name}" href="#categorylist">
                                            <h1 class="h2">${categoria.name}</h1>
                                        </a>`);

            contanier.append(contanierCategoria);
        }

        this.main.append(contanier);
    }
    //Eventos Init 
    bindInit(handler) {
        $('#home').click((event) => {
            handler();
        });
        $('#logo').click((event) => {
            handler();
        });
    }

    bindInitProduction(handler) {
        console.log($('#peliculasNav'));
        $('#peliculasNav').click(function (event) {
            handler(this.dataset.prod);
        });
        $('#serieNav').click(function (event) {
            handler(this.dataset.prod);
        });
    }

    /**
    * Mostrar las categorias en el menú nav
    * 
    */
    showCategoriesInMenu(categories) {
        let li = $(`<li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-has-popup="true">
		                    Categorías
		                </a>
		            </li>`);

        let container = $('<div class="dropdown-menu" aria-labelledby="navCats" id="category-list-menu"></div>');

        for (let category of categories) {
            container.append(`<a data-category="${category.name}" class="dropdown-item" href="#">
                                ${category.name}
                            </a>`);
        }
        li.append(container);
        this.menu.append(li);
    }

    //Eventos para cuando pulse una categoria tanto en main o en el menu
    bindCategoriesList(handler) {
        $('#category-list').find('a').click(function (event) {
            handler(this.dataset.category);
        });
        $('#category-list-menu').find('a').click(function (event) {
            handler(this.dataset.category);
        });
    }

    /**
     * Mostrar 3 producciones de forma aleatoria 
     */
    showProductionsInit(producciones) {
        //Creamos el contenedor principal
        let carousel = $('<div id="carouselExampleAutoplaying" class="carousel slide container " data-bs-ride="carousel"></div>');
        //Titulo principal
        // contanier.append('<h1>Producciones:</h1>');
        //Donde se va a contener las producciones con diseño flex
        let contanierProduciones = $('<div id="productionInit" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>');
        // let carouselInner = $(`<div class="carousel-inner" id="productionInit"></div>`);
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
        //Mostramos el diseño card
        for (const number of numbers) {
            let produccion = produccionesA[number];

        //     carouselInner.append(`<div class="carousel-item ">
            
        //     <img src="${produccion.image}" class=" " alt="${produccion.title}">
        //     <div class="carousel-caption d-none d-md-block">
        //         <h5>${produccion.title}</h5>
        //         <a data-produccion="${produccion.title}" href='#' class="btn btn-primary">Más información</a>
        //     </div>
        //   </div>`);

            //Diseño card
            contanierProduciones.append(`<a data-produccion="${produccion.title}" href='#'><div class="card" style="width: 18rem;">
                         <img src="${produccion.image}" class="card-img-top" alt="${produccion.title}">
                             <div class="card-body">
                                 <h5 class="card-title">${produccion.title}</h5>
                             </div>
                        </div ></a>`);
        }
        // carouselInner.children().first().addClass('active');
        //append al contenier las tres cards
        carousel.append(contanierProduciones);
    //     carousel.append(` <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    //     <span><i class="fa fa-angle-left" aria-hidden="true"></i></span>
    //     <span class="visually-hidden">Previous</span>
    //   </button>
    //   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span class="visually-hidden">Next</span>
    //   </button>`);
        //prepend al principio al main principal del html
        this.main.prepend(carousel);
    }

    //Si selecciona pelicula o serie, mostrar solo 
    listProductionsType(productions, type) {
        this.main.empty(); //borramos el contenido del main

        let contanier = $(`<h1>${type}s</h1>`);

        let contanierProduciones = $('<div id="productions" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>');

        this.main.append(contanier);
        for (let production of productions) {
            if(production.constructor.name === type){
                // let contanier = $(`<h1>${production.title}</h1>`);
                contanierProduciones.append(`<a data-produccion="${production.title}" href='#'><div class="card" style="width: 18rem;">
                             <img src="${production.image}" class="card-img-top" alt="${production.title}">
                                 <div class="card-body">
                                     <h5 class="card-title">${production.title}</h5>
                                 </div>
                            </div ></a>`);
            }
        }
        this.main.append(contanierProduciones);
    }

    //Si selecciona una categoria, mostras todas las producciones del dicho categoria
    listProductions(productions, category) {
        this.main.empty(); //borramos el contenido del main

        let contanier = $(`<h1>${category.name}</h1><p>${category.description}</p>`);

        let contanierProduciones = $('<div id="productions" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>');

        this.main.append(contanier);
        for (let production of productions) {
            // let contanier = $(`<h1>${production.title}</h1>`);
            contanierProduciones.append(`<a data-produccion="${production.title}" href='#'><div class="card" style="width: 18rem;">
                         <img src="${production.image}" class="card-img-top" alt="${production.title}">
                             <div class="card-body">
                                 <h5 class="card-title">${production.title}</h5>
                             </div>
                        </div ></a>`);
        }
        this.main.append(contanierProduciones);
    }

    //Eventos para cuando pulse una categoria tanto en main o en el menu
    bindProductions(handler) {
        $('#productions').find('a').click(function (event) {
            console.log("hola");
            handler(this.dataset.produccion);
        });
        $('#productionInit').find('a').click(function (event) {
            console.log("hola");
            handler(this.dataset.produccion);
        });
    }

    /**
     * Al hacer click en una produccion, mostrar la ficha de la produccion
     */
    showProduction(production, castIterator, directorIterator) {
        this.main.empty();


        let contanier = $('<div class="d-flex flex-column container w-75"></div>');
        console.log(production);
        contanier.append(`<div class="d-flex justify-content-center">
                                    <img src="${production.image}" class="img-fluid rounded-start w-100"  alt="${production.title}">
                                </div>
                                <div class="">
                                    <div class="">
                                        <h1 class="card-title">${production.title}</h1>
                                        <div class="d-flex gap-5" id='infoProduction'>
                                            <p>${production.nationality}</p>
                                            <p>${production.publication.getFullYear()}</p>
                                        </div>
                                        <p class="card-text">${production.synopsis}</p>
                                        <div id='infoPersons' class='d-flex gap-5 justify-content-evenly flex-wrap'>
                                            <div id="directorId">
                                                <h5>Director:</h5>
                                            </div>
                                            <div id="actorId">
                                                <h5>Cast:</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);


        //Introducimos el contenedor
        this.main.append(contanier);

        //Obtenemos para insertar los actores de la produccion
        let persons = $('#infoPersons');
        let cast = persons.children().last();
        let directors = persons.children().first();


        for (const director of directorIterator) {
            directors.append(`<a data-director='${director.name}/${director.lastname1}' href='#'>${director.name} ${director.lastname1} ${director.lastname2}</a><br>`);
        }

        for (const actor of castIterator) {
            cast.append(`<a data-actor='${actor.name}/${actor.lastname1}' href='#'>${actor.name} ${actor.lastname1} ${actor.lastname2}</a><br>`);
        }

        //mostramos contenido segun si es serie o pelicula
        if (production.constructor.name == 'Serie') {
            let info = $('#infoProduction');

            info.append(production.seasons + " temporadas");

            let table = $(`<table class="table table-hover"><tbody></tbody></table>`);

            for (let [indice, chapter] of production.resources.entries()) {
                table.append(`<tr>
                                <th>${++indice}</th>
                                <td>${chapter.link}</td>
                                <td>${this.#convertMinToHours(chapter.duration)}</td>
                            </tr>`);
            }

            contanier.append(table);
        } else {

            //En caso que sea pelicula
            let info = $('#infoProduction');
            info.append(production.resource.duration + " min");
        }
    }

    showActorsMenu() {
        this.menu.append(`<li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" data-nav='Actores'>Actores</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#" data-nav='Directores'>Directores</a>
                        </li>`);
    }

    bindNavActors(handler) {
        this.menu.find('a[data-nav="Actores"]').click(function (event) {
            console.log(this.dataset.nav);
            handler(this.dataset.nav);
        });
    }

    bindNavDirectors(handler) {
        this.menu.find('a[data-nav="Directores"]').click(function (event) {
            console.log(this.dataset.nav);
            handler(this.dataset.nav);
        });
    }


    showPersonsList(persons, type) {
        this.main.empty();

        let contanier = $(`<h1>${type}es</h1>`);

        let contanierPerson = $(`<div id="${type}Id" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>`);

        this.main.append(contanier);
        for (let person of persons) {
            contanierPerson.append(`<a data-${type}="${person.name}/${person.lastname1}" href='#' ><div class="card" style="width: 18rem;">
                         <img src="${person.picture}" class="card-img-top" alt="${person.name}">
                             <div class="card-body">
                                 <h5 class="card-title">${person.name} ${person.lastname1}</h5>
                             </div>
                        </div ></a>`);
        }
        this.main.append(contanierPerson);

    }

    //Eventos para cuando pulse en un actor o actriz
    bindActors(handler) {
        $('#actorId').find('a').click(function (event) {
            console.log("hola");
            handler(this.dataset.actor);
        });
    }

    //Eventos para cuando pulse en un director
    bindDirectores(handler) {
        $('#directorId').find('a').click(function (event) {
            console.log("hola");
            handler(this.dataset.director);
        });
    }

    //Donde muestra la ficha del actor
    showFichaActor(actor, producciones) {
        this.main.empty();

        let contanier = $('<div class="container h-50"></div>');

        contanier.append(`<div class="row h-50">
                            <div class="col-md-4 h-50">
                                    <img src="${actor.picture}" class="img-fluid h-50" alt="${actor.name}">
                            </div>
                            <div class="col-md-8">
                                <div class="">
                                    <h1 class="card-title">${actor.name} ${actor.lastname1} ${actor.lastname2}</h1>
                                    <div class="d-flex gap-5" id='infoProduction'>
                                        <p><b>Nacimiento: </b>${actor.born.getDate()}/${actor.born.getMonth()}/${actor.born.getFullYear()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`);

        //Introducimos el contenedor 
        this.main.append(contanier);

        //Mostrar las producciones del actor
        let produccionesContanier = $('<div id="actorId" class="row col-md-12"></div>');
        produccionesContanier.append('<h2 class="col">Producciones: </h2>');

        let produccionesCont = $('<div id="productions" class="d-flex gap-5 flex-row flex-wrap"></div>');

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

    //Donde muestra la ficha del director
    showFichaDirector(director, producciones) {
        this.main.empty();

        let contanier = $('<div class="container h-50"></div>');

        contanier.append(`<div class="row h-50">
                            <div class="col-md-4 h-50">
                                    <img src="${director.picture}" class="img-fluid h-50" alt="${director.name}">
                            </div>
                            <div class="col-md-8">
                                <div class="">
                                    <h1 class="card-title">${director.name} ${director.lastname1} ${director.lastname2}</h1>
                                    <div class="d-flex gap-5" id='infoProduction'>
                                        <p><b>Nacimiento: </b>${director.born.getDate()}/${director.born.getMonth()}/${director.born.getFullYear()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`);

        //Introducimos el contenedor 
        this.main.append(contanier);

        //Mostrar las producciones del actor
        let produccionesContanier = $('<div id="directorId" class="row col-md-12"></div>');
        produccionesContanier.append('<h2 class="col">Producciones: </h2>');

        let produccionesCont = $('<div id="productions" class="d-flex gap-5 flex-row flex-wrap"></div>');

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


}

export default VideoSystemView;