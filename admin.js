// =====================================
// ADMIN PANEL - JOB MANAGEMENT
// =====================================


// -----------------------------
// PROTECT ADMIN PAGE
// -----------------------------
const role = localStorage.getItem("role");

if (role !== "admin") {
  window.location.href = "index.html";
}


// -----------------------------
// LOAD JOBS FROM LOCALSTORAGE
// -----------------------------
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];


// -----------------------------
// ADD JOB
// -----------------------------
function addJob() {

  const title = document.getElementById("jobTitle").value.trim();
  const company = document.getElementById("company").value.trim();
  const location = document.getElementById("location").value.trim();
  const salary = document.getElementById("salary").value.trim();

  if (!title || !company || !location || !salary) {
    alert("Please fill all fields!");
    return;
  }

  const newJob = { title, company, location, salary };

  jobs.push(newJob);

  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Job Added Successfully! ✅");

  renderAdminJobs();

  // Clear Fields
  document.getElementById("jobTitle").value = "";
  document.getElementById("company").value = "";
  document.getElementById("location").value = "";
  document.getElementById("salary").value = "";
}


// -----------------------------
// DELETE JOB
// -----------------------------
function deleteJob(index) {

  if (confirm("Are you sure you want to delete this job?")) {
    jobs.splice(index, 1);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderAdminJobs();
  }
}


// -----------------------------
// RENDER JOBS IN ADMIN PANEL
// -----------------------------
function renderAdminJobs() {

  const container = document.getElementById("adminJobs");
  if (!container) return;

  container.innerHTML = "";

  if (jobs.length === 0) {
    container.innerHTML = "<p>No jobs available.</p>";
    return;
  }

  jobs.forEach((job, index) => {
    container.innerHTML += `
      <div class="job-card">
        <h4>${job.title}</h4>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <button class="delete-btn" onclick="deleteJob(${index})">
          Delete
        </button>
      </div>
    `;
  });
}


// -----------------------------
// GO TO USER DASHBOARD
// -----------------------------
function goDashboard() {
  window.location.href = "dashboard.html";
}


// -----------------------------
// LOGOUT
// -----------------------------
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}


// -----------------------------
// AUTO LOAD ON PAGE OPEN
// -----------------------------
renderAdminJobs();