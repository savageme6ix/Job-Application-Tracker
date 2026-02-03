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
        clear();
        clearTextArea();
        clearForm();
    });
}

function clear(){
    let inputElements = document.querySelectorAll('input');
    inputElements.forEach((el)=>{
        el.value = ""
    })
}

function clearTextArea(){
    let textareas = document.querySelectorAll('textarea');
    textareas.forEach((el)=>{
        el.value = ""
    })
}

    document.querySelector(".job-form").addEventListener('click',()=>{
        form.style.display="flex"
        formwrapper.style.display="flex"
    })
    // if(form.style.display = "flex"){
    //     formwrapper.addEventListener('click', ()=>{
    //         form.style.display = "none"
    //         formwrapper.style.display = "none"
    //     })
    // }
function clearForm(){
        form.style.display="none"
        formwrapper.style.display="none"
}

tableData();