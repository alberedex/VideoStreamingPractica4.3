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
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));


}


function newProductionValidation(handler) {
    let form = document.forms.formNewProduction;

    $(form).attr('novalidate', true);
    $(form).addClass('needs-validation');

    form.addEventListener('submit', function(event) {
        let isValid = true;
        let firstInvalidElement = null;
        let typePro;
        let newDate;

        if(this.radioTypeP.value){
            console.log("dentro");
            
            if(this.radioTypeP[0].checked){
                console.log("peli");
                typePro = "Movie";
                
            }else{
                console.log("serie");
                typePro = "Serie";

            }
            showFeedBack($(this.radioTypeP), true);
        }else{
            showFeedBack($(this.radioTypeP), false);
        }

        if(!this.Pimage.checkValidity()){
            isValid = false;
            firstInvalidElement = this.Pimage;

            showFeedBack($(this.Pimage),false);
        }else{
            showFeedBack($(this.Pimage),true);
        }

        if(this.Pdate.checkValidity()){
            // let PdateTrans = Pdate.value 
            let date = new Date(this.Pdate.value).toLocaleDateString();
            date = date.split('/');
            if(date[0] <= 9) date[0]="0"+date[0]; 
            if(date[1] <= 9) date[1]="0"+date[1];
            newDate = date.join('/');

            showFeedBack($(this.Pdate),true);
        }else{
            isValid = false;
            firstInvalidElement = this.Pdate;
            showFeedBack($(this.Pdate),false);
        }

        $(form.newproActor).change(defaultCheckElement);
        $(form.newproActor).change(defaultCheckElement);
        $(form.newproDirector).change(defaultCheckElement);
        $(form.newproCategories).change(defaultCheckElement);
        $(form.PSynopsis).change(defaultCheckElement);

        $(form.Nacionalidad).change(defaultCheckElement);
        $(form.Ptitle).change(defaultCheckElement);


        console.log(form.Pimage.files[0]);

        if (!isValid) {
            firstInvalidElement.focus();
        } else {
            //title, nationality, publication, synopsis, image
            handler(this.Ptitle.value, this.Nacionalidad.value,newDate ,this.PSynopsis.value,this.Pimage.value);
        }
        event.preventDefault();
        event.stopPropagation();

        this.classList.add('was-validated');
    }, false);

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));


}

export { showFeedBack, defaultCheckElement, newCategoryValidation, newProductionValidation }
