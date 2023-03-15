import { Coordinate } from '../ObjetosEntidad.js';

function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}

function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack($(this), false);
    } else {
        showFeedBack($(this), true);
    }
}

/**
 * Validacion de nueva categoria
 */
function newCategoryValidation(handler) {
    let form = document.forms.formNewCategory;

    $(form).attr('novalidate', true);
    // $(form).addClass('needs-validation');
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (this.nombreCategoria.checkValidity()) {

            showFeedBack($(this.nombreCategoria), true);
        } else {
            isValid = false;
            firstInvalidElement = this.nombreCategoria;
            showFeedBack($(this.nombreCategoria), false);
        }

        if (isValid) {
            handler(form.nombreCategoria.value, form.description.value);

        } else {
            firstInvalidElement.focus();
        }


        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.nombreCategoria).change(defaultCheckElement);

}

function DateFormat(Pdate) {
    let date = new Date(Pdate).toLocaleDateString();
    date = date.split('/');
    if (date[0] <= 9) date[0] = "0" + date[0];
    if (date[1] <= 9) date[1] = "0" + (date[1]);
    let newDate = date.join('/');
    return newDate;
}

/**
 * Comprobamos la extension que tiene el fichero
 * @param {*} file 
 * @param {*} allowedExtensions 
 * @returns 
 */
function checkFileExtension(file, allowedExtensions) {
    let fileExtension = file.name.split('.').pop().toLowerCase();

    return allowedExtensions.some((extension) => {
        return extension === fileExtension
    });
}

/**
 * Validacion de nuevo Produccion 
 */
function newProductionValidation(handler) {
    let form = document.forms.formNewProduction;

    $(form).attr('novalidate', true);

    //Formulario de nueva Produccion
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        let imagentemp;
        //Select prod
        if (this.selectType.value) {

            showFeedBack($(this.selectType), true);
        } else {
            isValid = false;
            firstInvalidElement = this.selectType;
            showFeedBack($(this.selectType), false);
        }
        //Select multiple de actores
        if (!this.newproActor.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.newproActor;

            showFeedBack($(this.newproActor), false);
        } else {
            showFeedBack($(this.newproActor), true);
        }

        //Select multiple de directores
        if (!this.newproDirector.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.newproDirector;

            showFeedBack($(this.newproDirector), false);
        } else {
            showFeedBack($(this.newproDirector), true);
        }

        //Select multiple de categorias
        if (!this.newproCategories.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.newproCategories;

            showFeedBack($(this.newproCategories), false);
        } else {
            showFeedBack($(this.newproCategories), true);
        }

        //Input de imagen
        if (!this.Pimage.value) {
            isValid = false;
            firstInvalidElement = this.Pimage;
            showFeedBack($(this.Pimage), false);
        } else if (!checkFileExtension(this.Pimage.files[0], ['jpg', 'png', 'gif'])) {

            isValid = false;
            firstInvalidElement = this.Pimage;

            showFeedBack($(this.Pimage), false);
        } else {
            showFeedBack($(this.Pimage), true);
        }

        //Input de fecha
        if (this.Pdate.checkValidity()) {
            showFeedBack($(this.Pdate), true);
        } else {
            isValid = false;
            firstInvalidElement = this.Pdate;
            showFeedBack($(this.Pdate), false);
        }

        //Input de nacionalidad
        if (this.Nacionalidad.checkValidity()) {

            showFeedBack($(this.Nacionalidad), true);
        } else {
            isValid = false;
            firstInvalidElement = this.Nacionalidad;
            showFeedBack($(this.Nacionalidad), false);
        }

        //Input de titlo 
        if (!this.Ptitle.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.Ptitle;
            showFeedBack($(this.Ptitle), false);
        } else {
            showFeedBack($(this.Ptitle), true);

        }

        //En caso que no sea valido, focus
        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            //Si es valido

            let categorias = [...this.newproCategories.selectedOptions].map(function (option) {
                return option.value;
            });

            let directores = [...this.newproDirector.selectedOptions].map(function (option) {
                return option.value;
            });

            let actores = [...this.newproActor.selectedOptions].map(function (option) {
                return option.value;
            });


            handler(this.Ptitle.value, this.Nacionalidad.value, new Date(this.Pdate.value), this.PSynopsis.value, imagentemp, categorias, directores, actores, [], this.selectType.value);


        }
        event.preventDefault();
        event.stopPropagation();

    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
        let selects = $(this).find('select');
        selects.removeClass('is-valid is-invalid');

    }));

    $(form.Nacionalidad).change(defaultCheckElement);
    $(form.Ptitle).change(defaultCheckElement);
    $(form.selectType).change(defaultCheckElement);
    $(form.Pdate).change(defaultCheckElement);

    $(form.newproCategories).change(function () {
        if (this.selectedOptions.length) {
            showFeedBack($(this), true);
        }
    });
    $(form.newproDirector).change(function () {
        if (this.selectedOptions.length) {
            showFeedBack($(this), true);
        }
    });
    $(form.newproActor).change(function () {
        if (this.selectedOptions.length) {
            showFeedBack($(this), true);
        }
    });

    $(form.Pimage).change(function (event) {
        if (!this.value) {
            isValid = false;
            firstInvalidElement = this.Pimage;
            showFeedBack($(this), false);
        } else if (!checkFileExtension(this.files[0], ['jpg', 'png', 'gif'])) {

            showFeedBack($(this), false);
        } else {
            showFeedBack($(this), true);
        }
    });

}


/**
 * Validacion de nueva persona
 */
function newPersonValidation(handler) {
    let form = document.forms.formNewPerson;

    $(form).attr('novalidate', true);

    //Formulario de nueva persona
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        //Input de imagen
        if (!this.Pimage.value) {
            isValid = false;
            firstInvalidElement = this.Pimage;
            showFeedBack($(this.Pimage), false);
        } else if (!checkFileExtension(this.Pimage.files[0], ['jpg', 'png', 'gif'])) {

            isValid = false;
            firstInvalidElement = this.Pimage;

            showFeedBack($(this.Pimage), false);
        } else {
            showFeedBack($(this.Pimage), true);
        }
        
        //Input de fecha
        if (this.Pdate.checkValidity()) {

            showFeedBack($(this.Pdate), true);
        } else {
            isValid = false;
            firstInvalidElement = this.Pdate;
            showFeedBack($(this.Pdate), false);
        }

        //Input de apellido2
        if (this.PersonLastName2.checkValidity()) {

            showFeedBack($(this.PersonLastName2), true);
        } else {
            isValid = false;
            firstInvalidElement = this.PersonLastName2;
            showFeedBack($(this.PersonLastName2), false);
        }
        //Input de apellido1
        if (this.PersonLastName1.checkValidity()) {

            showFeedBack($(this.PersonLastName1), true);
        } else {
            isValid = false;
            firstInvalidElement = this.PersonLastName1;
            showFeedBack($(this.PersonLastName1), false);
        }

        //Input de nombre
        if (this.PersonName.checkValidity()) {

            showFeedBack($(this.PersonName), true);
        } else {
            isValid = false;
            firstInvalidElement = this.PersonName;
            showFeedBack($(this.PersonName), false);
        }

        //Select de tipo de persona
        if (this.selectType.checkValidity()) {

            showFeedBack($(this.selectType), true);
        } else {
            isValid = false;
            firstInvalidElement = this.selectType;
            showFeedBack($(this.selectType), false);
        }



        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handler(this.PersonName.value, this.PersonLastName1.value, this.PersonLastName2.value, new Date(this.Pdate.value), undefined, this.selectType.value);
        }
        event.preventDefault();
        event.stopPropagation();

    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
        let selects = $(this).find('select');
        selects.removeClass('is-valid is-invalid');
    }));

    $(form.selectType).change(defaultCheckElement);
    $(form.PersonName).change(defaultCheckElement);
    $(form.PersonLastName1).change(defaultCheckElement);
    $(form.PersonLastName2).change(defaultCheckElement);
    $(form.Pdate).change(defaultCheckElement);

    $(form.Pimage).change(function (event) {
        if (!this.value) {
            isValid = false;
            firstInvalidElement = this.Pimage;
            showFeedBack($(this), false);
        } else if (!checkFileExtension(this.files[0], ['jpg', 'png', 'gif'])) {

            showFeedBack($(this), false);
        } else {
            showFeedBack($(this), true);
        }
    });

}

/**
 * Validacion del eliminar una categoria
 */
function delCategoryValidation(handler) {
    let form = document.forms.formDelCategory;

    $(form).attr('novalidate', true);

    //Formulario de eliminar categoria
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        //Input con options de categorias
        if (this.selectDelCategory.checkValidity()) {

            showFeedBack($(this.selectDelCategory), true);
        } else {
            isValid = false;
            firstInvalidElement = this.selectDelCategory;
            showFeedBack($(this.selectDelCategory), false);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {

            handler(this.selectDelCategory.value);
        }
        event.preventDefault();
        event.stopPropagation();

    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.selectDelCategory).change(defaultCheckElement);

}


/**
 * Validacion del eliminar produccion  
 */
function delProductionValidation(handler) {
    let form = document.forms.formDelProduction;

    $(form).attr('novalidate', true);

    //Formulario de eliminar produccion
    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        //Select de producciones
        if (this.selectDelProd.checkValidity()) {

            showFeedBack($(this.selectDelProd), true);
        } else {
            isValid = false;
            firstInvalidElement = this.selectDelProd;
            showFeedBack($(this.selectDelProd), false);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {

            handler(this.selectDelProd.value);
        }
        event.preventDefault();
        event.stopPropagation();

    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let selects = $(this).find('select');
        selects.removeClass('is-valid is-invalid');
    }));

    $(form.selectDelProd).change(defaultCheckElement);

}

/**
 * Validacion de asignacion y desasignacion de los directores/actores de una produccion
 * @param {*} handlerDirectors 
 * @param {*} handlerActors 
 * @param {*} prod 
 */
function assignDesValidation(handlerDirectors, handlerActors, prod) {
    let form = document.forms.formAssignDesProd;
    //Si hace el click al boton de directores
    $('.directorButton').click(function (event) {
        let directorAssign = [...form.Director.selectedOptions].map(function (option) {
            return option.value;
        });

        let directorDeassign = [...form.DirectorProd.selectedOptions].map(function (option) {
            return option.value;
        });
        //Comprobamos si hay al menos uno seleccionado
        if (directorAssign.length == 0 && directorDeassign.length == 0) {
            showFeedBack($(form.Director), false);
            showFeedBack($(form.DirectorProd), false);

        } else {
            handlerDirectors(directorAssign, directorDeassign, prod);
        }
    });

    //Si hace el click al boton de actores
    $('.actorButton').click(function (event) {
        let actorAssign = [...form.Actor.selectedOptions].map(function (option) {
            return option.value;
        });

        let actorDeassign = [...form.ActorProd.selectedOptions].map(function (option) {
            return option.value;
        });

        //Comprobamos si hay al menos uno seleccionado
        if (actorAssign.length == 0 && actorDeassign.length == 0) {
            showFeedBack($(form.Actor), false);
            showFeedBack($(form.ActorProd), false);
        } else {
            handlerActors(actorAssign, actorDeassign, prod);
        }
    });

    $(form.DirectorProd).change(function () {
        if (this.selectedOptions.length) {
            showFeedBack($(this), true);
            showFeedBack($(form.Director), true);
        }
    });

    $(form.Director).change(function () {
        if (this.selectedOptions.length) {
            showFeedBack($(this), true);
            showFeedBack($(form.DirectorProd), true);
        }
    });

    $(form.ActorProd).change(function () {
        if (this.selectedOptions.length) {
            showFeedBack($(this), true);
            showFeedBack($(form.Actor), true);
        }
    });

    $(form.Actor).change(function () {
        if (this.selectedOptions.length) {
            showFeedBack($(this), true);
            showFeedBack($(form.ActorProd), true);
        }
    });
}

function selectProdAssignDes(handler) {
    $('#selectProd>select').change(function (event) {
        if (this.value != "") {
            handler(this.value);
            showFeedBack($(this), true);
        } else {
            showFeedBack($(this), false);
            let fila = $('#formBody .row');
            if (fila.children().length > 0) fila.remove();
        }
    });
}

/**
 * Validacion del formulario del eliminacion del persona del sistema
 */
function delPersonValidation(handlerDirector, handlerActor) {
    let formDirector = document.forms.formDelPersonDirector;
    let formActor = document.forms.formDelPersonActor;
    //Formulario de Director
    $(formDirector).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        //Select de directores
        if (!this.selectDelDirector.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.selectDelDirector;
            showFeedBack($(this.selectDelDirector), false);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handlerDirector(this.selectDelDirector.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    //Formulario de actor
    $(formActor).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        //Select de actores
        if (!this.selectDelActor.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.selectDelActor;
            showFeedBack($(this.selectDelActor), false);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            handlerActor(this.selectDelActor.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $(formDirector.selectDelDirector).change(defaultCheckElement);
    $(formActor.selectDelActor).change(defaultCheckElement);

    formDirector.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let selects = $(this).find('select');
        selects.removeClass('is-valid is-invalid');
    }));
    formActor.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let selects = $(this).find('select');
        selects.removeClass('is-valid is-invalid');
    }));
}

export { newCategoryValidation, newProductionValidation, newPersonValidation, delCategoryValidation, delProductionValidation, assignDesValidation, delPersonValidation, selectProdAssignDes }
