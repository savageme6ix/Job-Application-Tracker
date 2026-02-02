export let job = JSON.parse(localStorage.getItem('jobObj')) || [];

export function saveJob(newJob) {
    const jobWithId = { 
        ...newJob, 
        id: crypto.randomUUID() 
    };
    job.push(jobWithId);
    localStorage.setItem('jobObj', JSON.stringify(job));
}