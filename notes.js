import { job } from './data.js';

let noteContainer = document.querySelector(".note-div");

// --- MODAL SELECTORS ---
const modal = document.querySelector("#deleteModal");
const confirmBtn = document.querySelector("#confirmDelete");
const cancelBtn = document.querySelector("#cancelDelete");
let currentIdToDelete = null; // holds the ID while the modal is open

function getNotes() {
    if (!noteContainer) return;

    const jobsWithNotes = job.filter(item => item.user_message && item.user_message.trim() !== "");

   if (jobsWithNotes.length === 0) {
        noteContainer.innerHTML = `<h1 class="empty-msg">You Have No Notes</h1>`;
        return; // Important: Stop the function here!
    }
    
    noteContainer.innerHTML = jobsWithNotes.map((item) => {
        return `
            <div class="note-card">
                <div class="card-image">
                    <img src="https://picsum.photos/seed/${item.id}/300/300" alt="random image">
                </div>
                <div class="card-content">
                    <h3 class="company-name">${item.company_name}</h3>
                    <p class="user-note">${item.user_message}</p>
                </div>
                <div class="card-action">
                    <button class="edit" data-id="${item.id}">+ Edit Notes</button>
                    <button class="delete" data-id="${item.id}"> Delete Notes</button>
                </div>
            </div>
        `;
    }).join('');
}

// --- MODAL CORE LOGIC ---

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
        // Find the specific job in the main array *** find index is a new method i found, it  returns the index of the first element in an array that satisfies a provided testing function. If no elements satisfy the function, it returns -1. 
        const jobIndex = job.findIndex(item => item.id === currentIdToDelete);
         // if an element has satisfied the function
        if (jobIndex !== -1) {
            job[jobIndex].user_message = ""; 
            localStorage.setItem('jobObj', JSON.stringify(job));
            getNotes(); // Refresh UI
        }
    }
    closeModal();
}

// --- EVENT LISTENERS ---

noteContainer.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');

    if (e.target.classList.contains('delete')) {
        openModal(id); // opens the UI
    }
    
    if (e.target.classList.contains('edit')) {
        handleEdit(e.target, id);
    }
});

// Modal Buttons
confirmBtn.addEventListener('click', executeDelete);
cancelBtn.addEventListener('click', closeModal);

function handleEdit(button, id) {
    const card = button.closest('.note-card');
    const noteElement = card.querySelector('.user-note');

    //  Check if user is currently editing or saving
    const isEditing = noteElement.contentEditable === "true";

    if (!isEditing) {
         // --- START EDITING ---
        noteElement.contentEditable = "true";
        noteElement.focus(); // focus ** didnt know bout that
        button.textContent = "💾 Save Note";
        button.classList.add("saving-mode"); // Add a class for styling
    } else {
         // --- SAVE CHANGES ---
        noteElement.contentEditable = "false";
        button.textContent = "+ Edit Notes";
        button.classList.remove("saving-mode");
        //  Update the main 'job' array
        const jobIndex = job.findIndex(item => item.id === id);
        if (jobIndex !== -1) {
            job[jobIndex].user_message = noteElement.innerText; // Get the new text
             //  Persist to LocalStorage
            localStorage.setItem('jobObj', JSON.stringify(job));
        }
    }
}

getNotes();