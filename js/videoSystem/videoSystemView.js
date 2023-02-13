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
            container.append(`<a data-category="${category.name}" class="dropdown-item" href="#categorylist">
                                ${category.name}
                            </a>`);
        }
        li.append(container);
        this.menu.append(li);
    }

    bindCategoriesList(handler) {
        $('#category-list').find('a').click(function (event) {
            console.log("hola");
            handler(this.dataset.category);
        });
        $('#category-list-menu').find('a').click(function (event) {
            console.log("hola");
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
        let contanierProduciones = $('<div class="d-flex gap-5 justify-content-evenly"></div>');

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




}

export default VideoSystemView;