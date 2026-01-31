// notes.js
import { job } from './data.js';

let noteContainer = document.querySelector(".note-div");

function getNotes() {
    if (!noteContainer) return;
    console.log(job)
    let allNotesHtml = "";
    job.forEach((item) => {
        if (item.user_message) {
            allNotesHtml += `<p> ${item.company_name} ${item.user_message}</p>`;
        }
    });
    noteContainer.innerHTML = allNotesHtml;
}

getNotes();