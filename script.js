import { job, saveJob, deleteJob } from './data.js';

const form = document.querySelector(".form");
const formwrapper = document.querySelector(".form-wrapper");
const body = document.querySelector(".body");
const searchFeature = document.querySelector("#searchInput")

 function tableData(dataToRender = job) {
    if (!body) return;
    if (dataToRender.length === 0) {
    body.innerHTML = `<tr><td colspan="4" style="text-align:center;">No matches found</td></tr>`;
    return;
}

    let tHtml = ""; 
    dataToRender.forEach((item) => {
        tHtml += `
            <tr>
                <td>${item.company_name}</td>
                <td>${item.user_role}</td>
                <td>${item.user_date}</td>
                <td>${item.job_status}</td>
                <td><button type="button" class='delete-job' data-id=${item.id}>Delete</button></td>
            </tr>`;
    });
    body.innerHTML = tHtml;
}

body.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-job')) {
        const id = event.target.getAttribute('data-id');
        deleteJob(id)
    }
});

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

if(searchFeature){
    searchFeature.addEventListener(('input'),(e)=>{
        const searchTerm = e.target.value.toLowerCase();

        const filterdJobs = job.filter(item=>{
            const nameMatch = item.company_name.toLowerCase().includes(searchTerm);
            const statusMatch = item.job_status.toLowerCase().includes(searchTerm);
            
            return nameMatch || statusMatch
        })
        // Re-render the table with only the filtered results
        tableData(filterdJobs)
    })
}


tableData();