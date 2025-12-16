let jobObj = "";
let job=[];
let form = document.querySelector(".form");
let formData;
function getFormData(event){

    event.preventDefault();
    formData = new FormData(form);
    // console.log(Object.fromEntries(formData));
    job.push(Object.fromEntries(formData))
    console.log(job)
}

form.addEventListener("submit", getFormData)

