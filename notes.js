import { job} from './data.js';

let noteArray = JSON.parse(localStorage.getItem('noteObj')) || [];
let noteContainer = document.querySelector(".note-div");
function save() {
        job.map((item, index) => {
        noteArray.push({company_name:item.company_name, id:item.id, user_message:item.user_message})
        localStorage.setItem('noteObj', JSON.stringify(noteArray));
        console.log(noteArray)
        
    })
}
save();
function getNotes(){

noteContainer.innerHTML = noteArray.map((job)=>{
    if(!noteArray) return '';
    
        return `
            <div class="note-card">
                <div class="card-image">
                    <img src="https://picsum.photos/seed/${job.id}/300/300" alt="random casual image">
                </div>
                <div class="card-content">
                    <h3 class="company-name">${job.company_name}</h3>
                    <p class="user-note">${job.user_message}</p>
                </div>
                <div class="card-action">
                    <button class="edit">+ Edit Notes</button>
                    <button class="delete" data-id="${job.id}"> Delete Notes</button>
                </div>
            </div>
        `;
        
}).join('');

}

function deleteJob(id) {
    // Create a new array without the item we want to delete
    const updatedNotes = job.filter(item => item.id !== id);
    
    // Update localStorage
    localStorage.setItem('noteObj', JSON.stringify(updatedNotes));
    
    // Refresh the page to show the changes
    window.location.reload(); 
}

noteContainer.addEventListener('click', (e) => {
    // Check if the button we clicked is a delete button
    if (e.target.classList.contains('delete')) {
        const idToDelete = e.target.getAttribute('data-id');
        deleteJob(idToDelete);
    }
});

getNotes();