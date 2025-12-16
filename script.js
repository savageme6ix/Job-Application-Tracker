let jobObj = "";
let job=[];
let form = document.querySelector(".form");
let nameData = document.querySelector(".Cname")
let roleData = document.querySelector(".Crole")
let statusData = document.querySelector(".Cstatus")
let dateData = document.querySelector(".Adate")
let body = document.querySelector(".body")
let formData;
function getFormData(event){

    event.preventDefault();
    formData = new FormData(form);
    console.log(Object.fromEntries(formData));
    job.push(Object.fromEntries(formData))
    console.log(job)
    tableData();
}

function tableData(){
    let tHtml;
    job.forEach((job)=>{
    tHtml += `
            <tr>
                <td class="Cname">${job.company_name}</td>
                <td class="Crole">${job.user_role}</td>
                <td class="Adate">${job.user_date}</td>
                <td class="Cstatus">${job.job_status}</td>
            </tr>
        `
    })
    console.log(tHtml)
    body.innerHTML = tHtml
}
form.addEventListener("submit", getFormData)

