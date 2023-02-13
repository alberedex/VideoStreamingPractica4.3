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


}

export default VideoSystemView;