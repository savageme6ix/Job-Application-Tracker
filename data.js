export let job = JSON.parse(localStorage.getItem('jobObj')) || [];

export function deleteJob(id) {
    // Create a new array without the item we want to delete
    job = job.filter(item => item.id !== id);
    
    // Update localStorage
    localStorage.setItem('jobObj', JSON.stringify(job));
    
}

export function saveJob(newJob) {
    const jobWithId = { 
        ...newJob, 
        id: crypto.randomUUID() 
    };
    job.push(jobWithId);
    localStorage.setItem('jobObj', JSON.stringify(job));
}
