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
    // $(form.description).change(defaultCheckElement);

}

function DateFormat(Pdate) {
    let date = new Date(Pdate).toLocaleDateString();
    date = date.split('/');
    if (date[0] <= 9) date[0] = "0" + date[0];
    if (date[1] <= 9) date[1] = "0" + (date[1]);
    let newDate = date.join('/');
    return newDate;
}

function checkFileExtension(file, allowedExtensions) {
    let fileExtension = file.name.split('.').pop().toLowerCase();

    return allowedExtensions.some((extension) => {
        return extension === fileExtension
    });
}
let map;
/**
 * Validacion de nuevo Produccion 
 */
function newProductionValidation(handler) {
    let form = document.forms.formNewProduction;

    $(form).attr('novalidate', true);
    // $(form).addClass('needs-validation');
    let locations = [];

    map = L.map('mapid').setView([38.990831799999995, -3.9206173000000004], 15);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);

    map.on('click', function (event) {
        L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
        locations.push(new Coordinate(event.latlng.lat, event.latlng.lng));
    });

    let formGeoCoder = $('#fGeocoder');
    let addresses = $('#geocoderAddresses');

    formGeoCoder.submit(function (event) {
        let formGeoC = $(this);
        $.get(this.action + '?' + formGeoC.serialize()).then(
            function (data) {
                let list = $('<div class="list-group"></div>');
                data.forEach((address) => {
                    list.append(`<a href="#" data-lat="${address.lat}" data-lon="${address.lon}" class="list-group-item list-group-item-action">
                        ${address.display_name}</a>`);
                });
                addresses.empty();
                addresses.append(list);
                list.find('a').click(function (event) {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');

                    map.setView(new L.LatLng(this.dataset.lat, this.dataset.lon), 15);

                    L.marker([this.dataset.lat, this.dataset.lon]).addTo(map);

                    locations.push(new Coordinate(this.dataset.lat, this.dataset.lon));
                    console.log(L);
                    event.preventDefault();
                    event.stopPropagation();
                })
            }, function (error) {
                addresses.empty();
                addresses.append(`<div class="text-danger">
                    <i class="fas fa-exclamation-circle"></i>
                    No se ha podido establecer la conexión con el servidor de mapas.
                </div>`);
            }
        );

        event.preventDefault();
        event.stopPropagation();
    })

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        let imagentemp;

        if (this.selectType.value) {

            showFeedBack($(this.selectType), true);
        } else {
            isValid = false;
            firstInvalidElement = this.selectType;
            showFeedBack($(this.selectType), false);
        }

        if (!this.newproCategories.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.newproCategories;

            showFeedBack($(this.newproCategories), false);
        } else {
            showFeedBack($(this.newproCategories), true);
        }

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

        if (this.Pdate.checkValidity()) {
            // newDate = DateFormat(this.Pdate.value);

            showFeedBack($(this.Pdate), true);
        } else {
            isValid = false;
            firstInvalidElement = this.Pdate;
            showFeedBack($(this.Pdate), false);
        }


        if (this.Nacionalidad.checkValidity()) {

            showFeedBack($(this.Nacionalidad), true);
        } else {
            isValid = false;
            firstInvalidElement = this.Nacionalidad;
            showFeedBack($(this.Nacionalidad), false);
        }

        if (!this.Ptitle.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.Ptitle;
            showFeedBack($(this.Ptitle), false);
        } else {
            showFeedBack($(this.Ptitle), true);

        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            let categorias = [...this.newproCategories.selectedOptions].map(function (option) {
                return option.value;
            });

            let directores = [...this.newproDirector.selectedOptions].map(function (option) {
                return option.value;
            });

            let actores = [...this.newproActor.selectedOptions].map(function (option) {
                return option.value;
            });


            handler(this.Ptitle.value, this.Nacionalidad.value, new Date(this.Pdate.value), this.PSynopsis.value, imagentemp, categorias, directores, actores, locations, this.selectType.value);

            locations = [];
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

    // $(form.newproActor).change(defaultCheckElement);
    // $(form.newproActor).change(defaultCheckElement);
    // $(form.newproDirector).change(defaultCheckElement);

    // $(form.PSynopsis).change(defaultCheckElement);

}


/**
 * Validacion de nueva persona
 */
function newPersonValidation(handler) {
    let form = document.forms.formNewPerson;

    $(form).attr('novalidate', true);
    // $(form).addClass('needs-validation');

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        let newDate;

        if (this.Pdate.checkValidity()) {
            // newDate = DateFormat(this.Pdate.value);

            showFeedBack($(this.Pdate), true);
        } else {
            isValid = false;
            firstInvalidElement = this.Pdate;
            showFeedBack($(this.Pdate), false);
        }

        if (this.PersonLastName2.checkValidity()) {

            showFeedBack($(this.PersonLastName2), true);
        } else {
            isValid = false;
            firstInvalidElement = this.PersonLastName2;
            showFeedBack($(this.PersonLastName2), false);
        }
        if (this.PersonLastName1.checkValidity()) {

            showFeedBack($(this.PersonLastName1), true);
        } else {
            isValid = false;
            firstInvalidElement = this.PersonLastName1;
            showFeedBack($(this.PersonLastName1), false);
        }

        if (this.PersonName.checkValidity()) {

            showFeedBack($(this.PersonName), true);
        } else {
            isValid = false;
            firstInvalidElement = this.PersonName;
            showFeedBack($(this.PersonName), false);
        }

        if (this.selectType.checkValidity()) {

            showFeedBack($(this.selectType), true);
        } else {
            isValid = false;
            firstInvalidElement = this.selectType;
            showFeedBack($(this.selectType), false);
        }

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
    // $(form).addClass('needs-validation');

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

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
    // $(form).addClass('needs-validation');

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

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

    $('.directorButton').click(function (event) {

        let directorAssign = [...form.Director.selectedOptions].map(function (option) {
            return option.value;
        });

        let directorDeassign = [...form.DirectorProd.selectedOptions].map(function (option) {
            return option.value;
        });

        if (directorAssign.length == 0 && directorDeassign.length == 0) {
            showFeedBack($(form.Director), false);
            showFeedBack($(form.DirectorProd), false);
        } else {
            handlerDirectors(directorAssign, directorDeassign, prod);
        }
    });

    $('.actorButton').click(function (event) {
        let actorAssign = [...form.Actor.selectedOptions].map(function (option) {
            return option.value;
        });

        let actorDeassign = [...form.ActorProd.selectedOptions].map(function (option) {
            return option.value;
        });

        if (actorAssign.length == 0 && actorDeassign.length == 0) {
            showFeedBack($(form.Actor), false);
            showFeedBack($(form.ActorProd), false);
        } else {
            handlerActors(actorAssign, actorDeassign, prod);
        }
    });
}

/**
 * Validacion del formulario del eliminacion del persona del sistema
 */
function delPersonValidation(handlerDirector, handlerActor) {
    let formDirector = document.forms.formDelPersonDirector;
    let formActor = document.forms.formDelPersonActor;

    $(formDirector).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

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


    $(formActor).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

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

/**
 * Validacion de Login
 * @param {*} handler 
 */
function loginValidation(handler) {
    let form = document.forms.formLogin;
    $(form).attr('novalidate', true);
    $(form).submit(function (event) {

        let isValid = true;
        let firstInvalidElement = null;

        if (form.username.checkValidity()) {
            showFeedBack($(this.username), true);
        } else {
            isValid = false;
            firstInvalidElement = this.username;
            showFeedBack($(this.username), false);
        }

        if (form.password.checkValidity()) {
            showFeedBack($(this.password), true);
        } else {
            isValid = false;
            firstInvalidElement = this.password;
            showFeedBack($(this.password), false);
        }

        if (!isValid) {
            firstInvalidElement.focus();
        } else {

            handler(form.username.value, form.password.value);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $(form.username).change(defaultCheckElement);
    $(form.password).change(defaultCheckElement);
}

export { newCategoryValidation, newProductionValidation, newPersonValidation, delCategoryValidation, delProductionValidation, assignDesValidation, delPersonValidation, loginValidation, map }
