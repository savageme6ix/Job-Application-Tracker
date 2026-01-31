import { job, saveJob } from './data.js';

const form = document.querySelector(".form");
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
    });
}

tableData();