import { job, deleteJob} from './data.js';

let noteContainer = document.querySelector(".note-div");

function getNotes() {
    if (!noteContainer) return;

    noteContainer.innerHTML = job.map((item, index) => {
        // Only show if there is a message
        if (!item.user_message) return '';

        return `
            <div class="note-card">
                <div class="card-image">
                    <img src="https://picsum.photos/seed/${item.id}/300/300" alt="random casual image">
                </div>
                <div class="card-content">
                    <h3 class="company-name">${item.company_name}</h3>
                    <p class="user-note">${item.user_message}</p>
                </div>
                <div class="card-action">
                    <button class="edit">+ Edit Notes</button>
                    <button class="delete" data-id="${item.id}"> Delete Notes</button>
                </div>
            </div>
        `;
    }).join('');
}

noteContainer.addEventListener('click', (e) => {
    // Check if the button we clicked is a delete button
    if (e.target.classList.contains('delete')) {
        const idToDelete = e.target.getAttribute('data-id');
        deleteJob(idToDelete);
    }
});

getNotes();
