class VideoSystemView {
    constructor() {
        this.main = $('main');
        this.menu = $('.navbar-nav');
    }

    //Metodo donde carga el contenido inicial
    init(categories, model) {
        this.main.empty();
        let contanier = $('<div id="category-list"></div>');

        for (let categoria of categories) {
            let contanierCategoria = $('<div ></div>');

            contanierCategoria.append(`<a data-category="${categoria.name}" href="#categorylist"><h1 class="h2">${categoria.name}</h1></a>`);

            // let producciones = $('<div></div>');

            // for (let production of model.getProductionsCategory(categoria)) {
            //     producciones.append(`<div class="card" style="width: 18rem;">
            //         <img src="${production.image}" class="card-img-top" alt="${production.title}">
            //             <div class="card-body">
            //                 <h5 class="card-title">${production.title}</h5>
            //             </div>
            //         </div >`);
            // }
            // contanierCategoria.append(producciones);
            contanier.append(contanierCategoria);
        }

        this.main.append(contanier);
    }

    bindInit(handler) {
        $('#home').click((event) => {
            handler();
        });
        $('#logo').click((event) => {
            handler();
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
        let contanier = $('<div></div>');
        //Titulo principal
        contanier.append('<h1>Producciones:</h1>');
        //Donde se va a contener las producciones con diseño flex
        let contanierProduciones = $('<div id="productionInit" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>');

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


            contanierProduciones.append(`<a data-produccion="${produccion.title}" href='#'><div class="card" style="width: 18rem;">
                         <img src="${produccion.image}" class="card-img-top" alt="${produccion.title}">
                             <div class="card-body">
                                 <h5 class="card-title">${produccion.title}</h5>
                             </div>
                        </div ></a>`);
        }
        //append al contenier las tres cards
        contanier.append(contanierProduciones);
        //append al main principal del html
        this.main.append(contanier);
    }

    //Si selecciona una categoria, mostras todas las producciones del dicho categoria
    listProductions(productions, title) {
        this.main.empty(); //borramos el contenido del main
        let contanier = $(`<h1>${title}</h1>`);

        let contanierProduciones = $('<div id="productionCategory" class="d-flex gap-5 justify-content-evenly flex-wrap"></div>');

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
        $('#productionCategory').find('a').click(function (event) {
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
        let directors = '';

        for (const director of directorIterator) {
            if (directors) directors += '<br>'; //en caso que haya mas de un director
            directors += `${director.name} ${director.lastname1} ${director.lastname2}`;
        }

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
                                        <div class='d-flex gap-5 justify-content-evenly flex-wrap'>
                                            <div>
                                                <h5>Director:</h5>
                                                <p class="card-text">${directors}</p>
                                            </div>
                                            <div id='actorsProduction'>
                                                <h5>Cast:</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);


        //Introducimos el contenedor 
        this.main.append(contanier);

        //Obtenemos para insertar los actores de la produccion
        let cast = $('#actorsProduction');

        for (const actor of castIterator) {
            cast.append(`<a data-actor='${actor.name}-${actor.lastname1}' href='#'>${actor.name} ${actor.lastname1} ${actor.lastname2}</a><br>`);
        }

        //mostramos contenido segun si es serie o pelicula
        if (production.constructor.name == 'Serie') {
            let info = $('#infoProduction');

            info.append(production.seasons + " temporadas");

            let table = $(`<table class="table table-hover"><tbody></tbody></table>`);

            for (const chapter of production.resources) {
                table.append(`<tr>
                                <td>${chapter.link}</td>
                                <td>${chapter.duration}</td>
                            </tr>`);
            }

            contanier.append(table);
        } else {

            //En caso que sea pelicula
            let info = $('#infoProduction');
            info.append(production.resource.duration + " min");
        }
    }


}

export default VideoSystemView;