export let job = JSON.parse(localStorage.getItem('jobObj')) || [];

export function saveJob(newJob) {
    job.push(newJob);
    localStorage.setItem('jobObj', JSON.stringify(job));
}