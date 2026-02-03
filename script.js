import { job, saveJob } from './data.js';

const form = document.querySelector(".form");
const formwrapper = document.querySelector(".form-wrapper");
const body = document.querySelector(".body");

function tableData() {
    if (!body) return;
    let tHtml = ""; 
    job.forEach((item, index) => {
        tHtml += `
            <tr>
                <td>${item.company_name}</td>
                <td>${item.user_role}</td>
                <td>${item.user_date}</td>
                <td>${item.job_status}</td>
            </tr>`;
    });
    body.innerHTML = tHtml;
}

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        saveJob(Object.fromEntries(formData));
        tableData();
        clearForm();
    });
}

function clearForm(){
    form.reset();
    form.style.display = "none";
    formwrapper.style.display = "none";
}

    document.querySelector(".job-form").addEventListener('click',()=>{
        form.style.display="flex"
        formwrapper.style.display="flex"
    })

if (formwrapper) {
    formwrapper.addEventListener('click', (e) => {
        // If the user clicked the background (the wrapper) 
        // and NOT the form or its children...
        if (e.target === formwrapper) {
            clearForm();
        }
    });
}

tableData();