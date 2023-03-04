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

function newProductionValidation(handler) {
    let form = document.forms.formNewProduction;

    $(form).attr('novalidate', true);
    $(form).addClass('needs-validation');

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        let newDate;
        let imagentemp;

        if (this.selectType.value) {

            showFeedBack($(this.radioTypeP), true);
        } else {
            isValid = false;
            firstInvalidElement = this.radioTypeP;
            showFeedBack($(this.radioTypeP), false);
        }

        if (!this.newproCategories.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.newproCategories;

            showFeedBack($(this.newproCategories), false);
        } else {
            showFeedBack($(this.newproCategories), true);
        }

        if (!this.Pimage.checkValidity()) {
            isValid = false;
            firstInvalidElement = this.Pimage;

            showFeedBack($(this.Pimage), false);
        } else {
            showFeedBack($(this.Pimage), true);
        }

        // $(form.Pimage).change(function (event) {
        //     const selectedFile = event.target.files[0];
        //     console.log("holaddd");
        //     // Mostrar una vista previa de la imagen
        //     const reader = new FileReader();
        //     reader.onload = function (event) {
        //         // const previewImage = document.createElement("img");
        //         // previewImage.src = event.target.result;

        //         // let prueba = $('body');

        //         // prueba.append(`<img src='${event.target.result}'>`);

        //         imagentemp = event.target.result;
        //         console.log(imagentemp);
        //         // document.body.appendChild(previewImage);
        //     };
        //     reader.readAsDataURL(selectedFile);
        // });

        if (this.Pdate.checkValidity()) {
            newDate = DateFormat(this.Pdate.value);

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


            handler(this.Ptitle.value, this.Nacionalidad.value, newDate, this.PSynopsis.value, imagentemp, categorias, directores, actores, this.selectType.value);
            // form.reset();
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

    $(form.Nacionalidad).change(defaultCheckElement);
    $(form.Ptitle).change(defaultCheckElement);
    $(form.selectType).change(defaultCheckElement);
    $(form.Pdate).change(defaultCheckElement);

    $(form.Pimage).change(function () {
        if (!this.checkValidity()) {
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

function newPersonValidation(handler) {
    let form = document.forms.formNewPerson;

    $(form).attr('novalidate', true);
    // $(form).addClass('needs-validation');

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        let newDate;

        if (this.Pdate.checkValidity()) {
            newDate = DateFormat(this.Pdate.value);

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

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            //this.Pimage.value
            handler(this.PersonName.value, this.PersonLastName1.value, this.PersonLastName2.value, newDate, undefined, this.selectType.value);
        }
        event.preventDefault();
        event.stopPropagation();

        // this.classList.add('was-validated');
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.selectType).change(defaultCheckElement);
    $(form.PersonName).change(defaultCheckElement);
    $(form.PersonLastName1).change(defaultCheckElement);
    $(form.PersonLastName2).change(defaultCheckElement);

}


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
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));

    $(form.selectDelProd).change(defaultCheckElement);

}

export { showFeedBack, defaultCheckElement, newCategoryValidation, newProductionValidation, newPersonValidation, delCategoryValidation, delProductionValidation }
