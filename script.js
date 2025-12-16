let jobObj = "";
let job=[];

let form = document.querySelector(".form");
function getFormData(event){

    event.preventDefault();
    
    let formData = new FormData(form);
    console.log(Object.fromEntries(formData));
}

form.addEventListener("submit", getFormData)
