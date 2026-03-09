// ===========================================
// ONLINE JOB PORTAL - FINAL ROLE BASED APP.JS
// ===========================================


// -----------------------------
// LOGIN FUNCTION (USER + ADMIN)
function login() {
  alert("Login function triggered");
}
// -----------------------------
function login() {

  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const role = document.getElementById("role")?.value;
  const error = document.getElementById("error");

  if (!error) return;

  error.innerText = "";

  const namePattern = /^[A-Za-z\s]+$/;
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  // ===== VALIDATION =====
  if (!name || !email || !password || !role) {
    error.innerText = "All fields including role are required.";
    return;
  }

  if (!namePattern.test(name)) {
    error.innerText = "Name must contain only letters.";
    return;
  }

  if (!emailPattern.test(email)) {
    error.innerText = "Enter a valid email address.";
    return;
  }

  if (password.length < 6) {
    error.innerText = "Password must be at least 6 characters.";
    return;
  }

  // ===== ADMIN LOGIN =====
 if (role === "admin") {

  localStorage.setItem("username", name);
  localStorage.setItem("role", "admin");

  window.location.href = "admin.html";
  return;
}

  // ===== USER LOGIN =====
  if (role === "user") {

    localStorage.setItem("username", name);
    localStorage.setItem("role", "user");

    alert("User Login Successful ✅");

    window.location.replace("./dashboard.html");
    return;
  }
}


// -----------------------------
// LOGOUT FUNCTION
// -----------------------------
function logout() {
  localStorage.clear();
  window.location.replace("./index.html");
}


// -----------------------------
// PAGE PROTECTION (IMPORTANT)
// -----------------------------
(function protectPages() {

  const currentPage = window.location.pathname.split("/").pop();
  const role = localStorage.getItem("role");

  // Protect admin page
  if (currentPage === "admin.html" && role !== "admin") {
    window.location.replace("./index.html");
  }

  // Protect dashboard page
  if (currentPage === "dashboard.html" && role !== "user") {
    window.location.replace("./index.html");
  }

})();


// -----------------------------
// DEFAULT JOB LIST (ONLY FIRST TIME)
// -----------------------------
const defaultJobs = [

  { title:"Frontend Developer", company:"Infosys", location:"Chennai", salary:"5 LPA" },
  { title:"Backend Developer", company:"TCS", location:"Bangalore", salary:"6 LPA" },
  { title:"Full Stack Developer", company:"Wipro", location:"Hyderabad", salary:"8 LPA" },
  { title:"UI/UX Designer", company:"Zoho", location:"Chennai", salary:"4 LPA" },
  { title:"Data Analyst", company:"HCL", location:"Mumbai", salary:"7 LPA" },
  { title:"Java Developer", company:"Tech Mahindra", location:"Pune", salary:"6 LPA" },
  { title:"Python Developer", company:"Capgemini", location:"Hyderabad", salary:"7 LPA" },
  { title:"DevOps Engineer", company:"Accenture", location:"Chennai", salary:"9 LPA" },
  { title:"Cloud Engineer", company:"IBM", location:"Delhi", salary:"10 LPA" },
  { title:"Cyber Security Analyst", company:"L&T", location:"Bangalore", salary:"11 LPA" },
  { title:"Mobile App Developer", company:"Paytm", location:"Noida", salary:"8 LPA" },
  { title:"React Developer", company:"Flipkart", location:"Bangalore", salary:"9 LPA" },
  { title:"Angular Developer", company:"Amazon", location:"Hyderabad", salary:"8 LPA" },
  { title:"System Administrator", company:"Oracle", location:"Pune", salary:"6 LPA" },
  { title:"Network Engineer", company:"Airtel", location:"Chennai", salary:"5 LPA" },
  { title:"Business Analyst", company:"Deloitte", location:"Mumbai", salary:"10 LPA" },
  { title:"HR Executive", company:"Reliance", location:"Mumbai", salary:"4 LPA" },
  { title:"Marketing Manager", company:"Byjus", location:"Delhi", salary:"7 LPA" },
  { title:"Graphic Designer", company:"Zomato", location:"Gurgaon", salary:"5 LPA" },
  { title:"Content Writer", company:"Freshworks", location:"Hyderabad", salary:"4 LPA" },
  { title:"Sales Executive", company:"Tata Motors", location:"Chennai", salary:"3 LPA" },
  { title:"Database Administrator", company:"Cognizant", location:"Bangalore", salary:"9 LPA" },
  { title:"AI/ML Engineer", company:"Google India", location:"Bangalore", salary:"18 LPA" },
  { title:"Blockchain Developer", company:"Infosys", location:"Pune", salary:"12 LPA" },
  { title:"QA Engineer", company:"Mindtree", location:"Hyderabad", salary:"6 LPA" },
  { title:"Project Manager", company:"Wipro", location:"Mumbai", salary:"14 LPA" },
  { title:"Technical Support Engineer", company:"HCL", location:"Chennai", salary:"4 LPA" },
  { title:"Data Scientist", company:"TCS", location:"Bangalore", salary:"15 LPA" },
  { title:"Software Architect", company:"Accenture", location:"Hyderabad", salary:"20 LPA" },
  { title:"IT Recruiter", company:"Capgemini", location:"Pune", salary:"5 LPA" }

];


// -----------------------------
// LOAD JOBS (DO NOT RESET)
// -----------------------------
let jobs = JSON.parse(localStorage.getItem("jobs"));

if (!jobs || jobs.length === 0) {
  jobs = defaultJobs;
  localStorage.setItem("jobs", JSON.stringify(jobs));
}


// -----------------------------
// RENDER JOBS (USER DASHBOARD)
// -----------------------------
function renderJobs() {

  const container = document.getElementById("jobs");
  if (!container) return;

  const search = document.getElementById("search")?.value.toLowerCase() || "";
  const location = document.getElementById("location")?.value || "";

  container.innerHTML = "";

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search) &&
    (location === "" || job.location === location)
  );

  if (filtered.length === 0) {
    container.innerHTML = "<p>No jobs found.</p>";
    return;
  }

  filtered.forEach((job) => {
    container.innerHTML += `
      <div class="job-card">
        <h4>${job.title}</h4>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <button class="apply-btn" onclick="applyJob('${job.title}')">
          Apply
        </button>
      </div>
    `;
  });
}


// -----------------------------
// APPLY JOB
// -----------------------------
function applyJob(title) {
  alert("Successfully Applied for " + title + " 🎉");
}


// -----------------------------
// AUTO LOAD JOBS
// -----------------------------
if (document.getElementById("jobs")) {
  renderJobs();
}
console.log("Selected role:", role);