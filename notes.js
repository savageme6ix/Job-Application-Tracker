import { job } from './data.js';

let noteContainer = document.querySelector(".note-div");

function getNotes() {
    if (!noteContainer) return;

    noteContainer.innerHTML = job.map((item, index) => {
        // Only show if there is a message
        if (!item.user_message) return '';

        return `
            <div class="note-card">
                <div class="card-image">
                    <img src="https://picsum.photos/seed/${index + 40}/300/300" alt="random casual image">
                </div>
                <div class="card-content">
                    <h3 class="company-name">${item.company_name}</h3>
                    <p class="user-note">${item.user_message}</p>
                </div>
            </div>
        `;
    }).join('');
}

getNotes();