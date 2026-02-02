export let job = JSON.parse(localStorage.getItem('jobObj')) || [];

export function deleteJob(id) {
    // Create a new array without the item we want to delete
    const updatedJobs = job.filter(item => item.id !== id);
    
    // Update localStorage
    localStorage.setItem('jobObj', JSON.stringify(updatedJobs));
    
    // Refresh the page to show the changes
    window.location.reload(); 
}

export function saveJob(newJob) {
    const jobWithId = { 
        ...newJob, 
        id: crypto.randomUUID() 
    };
    job.push(jobWithId);
    localStorage.setItem('jobObj', JSON.stringify(job));
}