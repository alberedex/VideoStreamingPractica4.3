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
    $(form).addClass('needs-validation');
    form.addEventListener('submit', (event) => {
        if (form.checkValidity()) {

            console.log("es correcto");

            handler(form.nombreCategoria.value, form.description.value);
        }
        event.preventDefault();
        event.stopPropagation();
        console.log("despues de if")
        form.classList.add('was-validated');
    }, false);

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalidfeedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));


}

export { showFeedBack, defaultCheckElement, newCategoryValidation }
