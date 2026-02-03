import { job } from './data.js';

let noteContainer = document.querySelector(".note-div");

function getNotes() {
    if (!noteContainer) return;

    // filter the main job list to only show items that HAVE a message ** the trim is to cut off spaces and ensure the user hasnt just input blank spaces
    const jobsWithNotes = job.filter(item => item.user_message && item.user_message.trim() !== "");

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

// This function only clears the NOTE, not the JOB
function deleteNoteOnly(id) {
    // Find the specific job in the main array *** find index is a new method i found, it  returns the index of the first element in an array that satisfies a provided testing function. If no elements satisfy the function, it returns -1. 
    const jobIndex = job.findIndex(item => item.id === id);
    // if an element has satisfied the function
    if (jobIndex !== -1) {
        // Clear the message string
        job[jobIndex].user_message = ""; 
        
        // Save the main job list back to localStorage
        localStorage.setItem('jobObj', JSON.stringify(job));
        
        // Refresh the UI
        window.location.reload();
    }
}

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
            console.log("Saved new note:");
        }
    }
}

noteContainer.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');

    if (e.target.classList.contains('delete')) {
        deleteNoteOnly(id);
    }
    
    if (e.target.classList.contains('edit')) {
        // passing the button itself (e.target) and the ID
        handleEdit(e.target, id);
    }
});

getNotes();