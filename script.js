const text = "Innovator | AI Student | Developer";
let i = 0;

function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 50);
    }
}

typing();
const dob = new Date("2006-05-03");
const age = new Date().getFullYear() - dob.getFullYear();
document.getElementById("age").innerText = age + " years";

// ===== ADMIN AUTHENTICATION =====
let isAdmin = false;
const ADMIN_EMAIL = "hari@admin.com";
const ADMIN_PASSWORD = "hari@1234";

// ===== LOGIN MODAL FUNCTIONS =====
function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
}

function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ===== LOGIN FUNCTION =====
function login() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    if (user === "" || pass === "") {
        alert("Please enter email and password");
        return;
    }

    if (user === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
        isAdmin = true;
        localStorage.setItem("adminEmail", ADMIN_EMAIL);
        alert("Admin Login Successful!");
        enableAdminMode();
        closeLoginModal();
    } else {
        isAdmin = false;
        alert("Invalid credentials!");
    }
}

// ===== AUTO LOGIN CHECK =====
window.addEventListener('load', function() {
    if (localStorage.getItem("adminEmail") === ADMIN_EMAIL) {
        isAdmin = true;
        enableAdminMode();
    }
});

// ===== ENABLE ADMIN MODE =====
function enableAdminMode() {
    document.getElementById("adminPanel").style.display = "block";
    document.querySelector(".login-btn").textContent = "Logout";
    document.querySelector(".login-btn").onclick = logout;
}

// ===== LOGOUT FUNCTION =====
function logout() {
    isAdmin = false;
    localStorage.removeItem("adminEmail");
    document.getElementById("adminPanel").style.display = "none";
    document.querySelector(".login-btn").textContent = "Login";
    document.querySelector(".login-btn").onclick = openLoginModal;
    alert("Logged out successfully");
}

// ===== SETTINGS MODAL FUNCTIONS =====
function openSettingsModal() {
    if (!isAdmin || localStorage.getItem("adminEmail") !== ADMIN_EMAIL) {
        return alert("Only " + ADMIN_EMAIL + " can access settings!");
    }
    document.getElementById("settingsModal").style.display = "block";
    loadSettings();
}

function closeSettingsModal() {
    document.getElementById("settingsModal").style.display = "none";
}

// ===== LOAD SETTINGS =====
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem("portfolioSettings")) || {};
    document.getElementById("portfolioTitle").value = settings.title || "Harish Masilamani";
    document.getElementById("tagline").value = settings.tagline || "Innovator | AI Student | Developer";
    document.getElementById("phone").value = settings.phone || "9360012403";
    document.getElementById("email").value = settings.email || "harishmasilamani96@gmail.com";
    document.getElementById("college").value = settings.college || "Selvam College of Technology, Namakkal";
    document.getElementById("linkedin").value = settings.linkedin || "https://www.linkedin.com/in/harish-masilamani-00b42b37a";
    document.getElementById("instagram").value = settings.instagram || "https://www.instagram.com/__solo__harish__/?hl=en";
    document.getElementById("profilePhoto").value = settings.profilePhoto || "profile.jpg";
}

// ===== SAVE SETTINGS =====
function saveSettings() {
    if (!isAdmin || localStorage.getItem("adminEmail") !== ADMIN_EMAIL) {
        return alert("Only " + ADMIN_EMAIL + " can change settings!");
    }
    
    const settings = {
        title: document.getElementById("portfolioTitle").value,
        tagline: document.getElementById("tagline").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        college: document.getElementById("college").value,
        linkedin: document.getElementById("linkedin").value,
        instagram: document.getElementById("instagram").value,
        profilePhoto: document.getElementById("profilePhoto").value
    };
    
    localStorage.setItem("portfolioSettings", JSON.stringify(settings));
    applySettings(settings);
    alert("Settings saved successfully!");
    closeSettingsModal();
}

// ===== APPLY SETTINGS =====
function applySettings(settings) {
    // Update title
    document.title = settings.title + " | Portfolio";
    const titleSpan = document.querySelector("h1 span");
    if (titleSpan) titleSpan.textContent = settings.title.split(" ")[0];
    
    // Update tagline
    const h3 = document.getElementById("typing");
    if (h3) h3.textContent = settings.tagline;
    
    // Update profile photos
    if (settings.profilePhoto) {
        const profilePics = document.querySelectorAll(".profile-pic");
        profilePics.forEach(pic => {
            pic.src = settings.profilePhoto;
        });
    }
    
    // Update contact info
    const contactInfo = document.querySelector(".contact-info");
    if (contactInfo) {
        contactInfo.innerHTML = `
            <p>📞 ${settings.phone}</p>
            <p>📧 ${settings.email}</p>
            <p><a href="${settings.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn Profile</a></p>
            <p><a href="${settings.instagram}" target="_blank"><i class="fab fa-instagram"></i> Instagram Profile</a></p>
        `;
    }
    
    // Update college
    const collegeCard = document.querySelector(".about-card:nth-child(6) p");
    if (collegeCard) collegeCard.textContent = settings.college;
}

// ===== LOAD AND APPLY SETTINGS ON PAGE LOAD =====
window.addEventListener('load', function() {
    const settings = JSON.parse(localStorage.getItem("portfolioSettings"));
    if (settings) {
        applySettings(settings);
    }
    displayProjects();
    displayResumeStatus();
});

// ===== PROJECTS MANAGEMENT =====
function openProjectsModal() {
    if (!isAdmin || localStorage.getItem("adminEmail") !== ADMIN_EMAIL) {
        return alert("Only " + ADMIN_EMAIL + " can manage projects!");
    }
    document.getElementById("projectsModal").style.display = "block";
    displayProjectsList();
}

function closeProjectsModal() {
    document.getElementById("projectsModal").style.display = "none";
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDesc").value = "";
    document.getElementById("projectImage").value = "";
}

function addProject() {
    if (!isAdmin || localStorage.getItem("adminEmail") !== ADMIN_EMAIL) {
        return alert("Only " + ADMIN_EMAIL + " can add projects!");
    }

    const title = document.getElementById("projectTitle").value.trim();
    const desc = document.getElementById("projectDesc").value.trim();
    const image = document.getElementById("projectImage").value.trim();

    if (!title || !desc) {
        alert("Please enter project title and description");
        return;
    }

    let projects = JSON.parse(localStorage.getItem("portfolioProjects")) || [];
    projects.push({
        id: Date.now(),
        title: title,
        description: desc,
        image: image || "https://via.placeholder.com/250x200?text=" + encodeURIComponent(title)
    });

    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
    alert("Project added successfully!");
    
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDesc").value = "";
    document.getElementById("projectImage").value = "";
    
    displayProjectsList();
    displayProjects();
}

function deleteProject(id) {
    if (!isAdmin) return alert("Only admin can delete projects!");
    
    if (confirm("Delete this project?")) {
        let projects = JSON.parse(localStorage.getItem("portfolioProjects")) || [];
        projects = projects.filter(p => p.id !== id);
        localStorage.setItem("portfolioProjects", JSON.stringify(projects));
        displayProjectsList();
        displayProjects();
    }
}

function displayProjectsList() {
    const projects = JSON.parse(localStorage.getItem("portfolioProjects")) || [];
    const list = document.getElementById("projectsList");
    
    if (projects.length === 0) {
        list.innerHTML = "<p>No projects yet</p>";
        return;
    }

    list.innerHTML = projects.map(project => `
        <div class="project-item">
            <div class="project-item-content">
                <strong>${project.title}</strong>
                <p>${project.description}</p>
                ${project.image ? `<small>Image: ${project.image}</small>` : ''}
            </div>
            <button onclick="deleteProject(${project.id})" class="btn secondary" style="padding: 5px 10px; font-size: 12px;">Delete</button>
        </div>
    `).join('');
}

function displayProjects() {
    const projects = JSON.parse(localStorage.getItem("portfolioProjects")) || [];
    const grid = document.querySelector(".project-grid");
    
    if (projects.length === 0) return;

    grid.innerHTML = projects.map(project => `
        <div class="project-card">
            ${project.image ? `<img src="${project.image}" alt="${project.title}" class="project-image">` : ''}
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        </div>
    `).join('');
}

// ===== RESUME MANAGEMENT =====
function openResumeModal() {
    if (!isAdmin || localStorage.getItem("adminEmail") !== ADMIN_EMAIL) {
        return alert("Only " + ADMIN_EMAIL + " can manage resume!");
    }
    document.getElementById("resumeModal").style.display = "block";
    
    const resumeUrl = localStorage.getItem("portfolioResume");
    document.getElementById("resumeUrl").value = resumeUrl || "";
}

function closeResumeModal() {
    document.getElementById("resumeModal").style.display = "none";
}

function saveResume() {
    if (!isAdmin || localStorage.getItem("adminEmail") !== ADMIN_EMAIL) {
        return alert("Only " + ADMIN_EMAIL + " can save resume!");
    }

    const resumeUrl = document.getElementById("resumeUrl").value.trim();

    if (!resumeUrl) {
        alert("Please enter resume URL");
        return;
    }

    localStorage.setItem("portfolioResume", resumeUrl);
    alert("Resume saved successfully!");
    displayResumeStatus();
}

function displayResumeStatus() {
    const resumeUrl = localStorage.getItem("portfolioResume");
    const status = document.getElementById("resumeStatus");

    if (resumeUrl) {
        status.innerHTML = `
            <p>✅ Resume uploaded</p>
            <a href="${resumeUrl}" target="_blank" class="btn primary" style="display: inline-block; padding: 8px 16px; margin-top: 10px;">Download Resume 📥</a>
        `;
        
        // Add resume button to about section if not already there
        const aboutSection = document.querySelector(".about-container");
        if (aboutSection && !document.getElementById("resumeDownloadBtn")) {
            const resumeBtn = document.createElement("a");
            resumeBtn.id = "resumeDownloadBtn";
            resumeBtn.href = resumeUrl;
            resumeBtn.target = "_blank";
            resumeBtn.className = "btn primary";
            resumeBtn.style.marginTop = "20px";
            resumeBtn.innerHTML = "📥 Download Resume";
            aboutSection.appendChild(resumeBtn);
        }
    } else {
        status.innerHTML = "<p>No resume uploaded</p>";
    }
}
