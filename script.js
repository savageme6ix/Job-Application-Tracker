import { job, saveJob, deleteJob } from './data.js';

const form = document.querySelector(".form");
const formwrapper = document.querySelector(".form-wrapper");
const body = document.querySelector(".body");
const searchFeature = document.querySelector("#searchInput")
const modal = document.querySelector("#deleteModal");
const confirmBtn = document.querySelector("#confirmDelete");
const cancelBtn = document.querySelector("#cancelDelete");
let currentIdToDelete = null; // holds the ID while the modal is open   

function getStatusClass(status) {
    if (!status) return '';
    const s = status.toLowerCase();
    if (s === 'waiting') return 'waiting';
    if (s === 'interview') return 'interview';
    if (s === 'rejected') return 'rejected';
    return '';
}

function tableData(dataToRender = job) {
    if (!body) return;
    if (dataToRender.length === 0) {
        body.innerHTML = `<tr class="empty-state"><td colspan="5">No matches found</td></tr>`;
        return;
    }

    let tHtml = "";
    dataToRender.forEach((item) => {
        const statusClass = getStatusClass(item.job_status);
        tHtml += `
            <tr>
                <td>${item.company_name}</td>
                <td>${item.user_role}</td>
                <td>${item.user_date}</td>
                <td><span class="status-badge ${statusClass}">${item.job_status}</span></td>
                <td style="text-align:right;"><button type="button" class='delete-job' data-id="${item.id}">Delete</button></td>
            </tr>`;
    });
    body.innerHTML = tHtml;
}

function openModal(id) {
    currentIdToDelete = id;
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    currentIdToDelete = null;
}

function executeDelete() {
    if (currentIdToDelete !== null) {
        deleteJob(currentIdToDelete);
        const searchTerm = searchFeature?.value?.toLowerCase().trim() || "";
        if (searchTerm) {
            const filtered = job.filter(item =>
                item.company_name.toLowerCase().includes(searchTerm) ||
                item.job_status.toLowerCase().includes(searchTerm)
            );
            tableData(filtered);
        } else {
            tableData();
        }
    }
    closeModal();
}

body.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-job')) {
        const id = event.target.getAttribute('data-id');
        openModal(id);
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

if (modal && confirmBtn && cancelBtn) {
    confirmBtn.addEventListener('click', executeDelete);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}
tableData();