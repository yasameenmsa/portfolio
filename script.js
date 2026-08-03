document.getElementById("year").textContent = new Date().getFullYear();

const stage = document.querySelector(".orbit-stage");
const items = document.querySelectorAll(".orbit-item");
const overlay = document.getElementById("detail-overlay");
const dock = document.getElementById("fly-dock");
const closeBtn = document.getElementById("detail-close");

const roleDetails = {
  physio: {
    img: "assets/physio.png",
    title: "Physiotherapist",
    tag: "Healing through movement",
    desc: "Evidence-based physiotherapy: assessing injuries, designing rehab programs, using manual therapy, and coaching patients back to pain-free movement.",
    points: ["Patient assessment", "Rehab programs", "Manual therapy", "Injury prevention"],
    courses: ["BSc Physiotherapy", "Manual Therapy Diploma", "Sports Rehabilitation Certificate"],
    projects: ["Physiotherapy Kit", "PT Exam Guide", "Clinic Tools"],
  },
  frontend: {
    img: "assets/frontend.png",
    title: "Front End Developer",
    tag: "Interfaces people love",
    desc: "Building fast, responsive, accessible websites and web apps with modern HTML, CSS, and JavaScript.",
    points: ["Responsive design", "Modern JS", "Accessibility", "Pixel-perfect UI"],
    courses: ["JavaScript Complete Course", "Responsive Web Design", "React & TypeScript"],
    projects: ["Shop (E-commerce)", "THE5Husson", "Cinematic Landing Kit"],
  },
  fullstack: {
    img: "assets/fullstack.png",
    title: "Full Stack Developer",
    tag: "Front to back, end to end",
    desc: "Building complete web applications — from the interface users see to the databases and APIs behind it.",
    points: ["Frontend & UI", "Backend & APIs", "Databases", "Deployment"],
    courses: ["Full Stack Web Development", "Node.js & Express", "Databases & SQL"],
    projects: ["Yasmin Life OS", "AIScratchStudio", "RemakeMyStory"],
  },
  n8n: {
    img: "assets/n8n.png",
    title: "n8n Developer",
    tag: "Workflows that work for you",
    desc: "Designing and building n8n automation: AI agents, chatbots, and integrations that connect your tools together.",
    points: ["AI agents & chatbots", "API integrations", "Complex workflows", "Error handling"],
    courses: ["n8n Advanced Automation", "AI Agents Masterclass", "API Integration Essentials"],
    projects: ["Telegram Brain Bot", "Vault Backup Automation", "Life OS Workflows"],
  },
  ai: {
    img: "assets/ai.png",
    title: "AI Developer",
    tag: "Intelligence baked into products",
    desc: "Creating AI-powered products: assistants, RAG pipelines, and LLM-powered features that save people real time.",
    points: ["LLM apps & assistants", "RAG pipelines", "Prompt engineering", "AI product design"],
    courses: ["LLM Engineering", "RAG in Production", "Prompt Engineering"],
    projects: ["Telegram Brain Bot (DeepSeek)", "RemakeMyStory", "AI Experiments in AIScratchStudio"],
  },
  automation: {
    img: "assets/automation.png",
    title: "Automation Developer",
    tag: "Boring work, automated",
    desc: "Removing busywork by automating repetitive tasks, data flows, and business processes end to end.",
    points: ["Process automation", "Data flows", "Scheduled tasks", "System integrations"],
    courses: ["Python for Automation", "CI/CD Pipelines", "Workflow Design"],
    projects: ["Vault Backup", "SendMassages (Clinic)", "Life OS Task Automation"],
  },
};

items.forEach((item) => {
  const bubble = item.querySelector(".orbit-bubble");
  bubble.addEventListener("click", (e) => {
    e.preventDefault();
    const key = bubble.getAttribute("href").slice(6);
    openDetails(item, key);
  });
});

function openDetails(item, key) {
  const data = roleDetails[key];
  if (!data) return;

  stage.classList.add("paused");
  items.forEach((i) => i.classList.remove("selected"));
  item.classList.add("selected");

  const bubble = item.querySelector(".orbit-bubble");
  const rect = bubble.getBoundingClientRect();

  dock.innerHTML = "";
  dock.appendChild(bubble.querySelector("img").cloneNode());
  dock.style.left = rect.left + "px";
  dock.style.top = rect.top + "px";
  dock.style.width = rect.width + "px";
  dock.style.height = rect.height + "px";
  dock.style.transform = "none";
  dock.style.opacity = "1";

  void dock.offsetWidth;

  const tx = 24 - rect.left;
  const ty = window.innerHeight - rect.height - 24 - rect.top;
  dock.style.transform = `translate(${tx}px, ${ty}px)`;

  document.getElementById("detail-img").src = data.img;
  document.getElementById("detail-img").alt = data.title;
  document.getElementById("detail-title").textContent = data.title;
  document.getElementById("detail-tag").textContent = data.tag;
  document.getElementById("detail-desc").textContent = data.desc;

  const list = document.getElementById("detail-points");
  list.innerHTML = "";
  data.points.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });

  const courses = document.getElementById("detail-courses");
  courses.innerHTML = "";
  data.courses.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = c;
    courses.appendChild(li);
  });

  const projects = document.getElementById("detail-projects");
  projects.innerHTML = "";
  data.projects.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = p;
    projects.appendChild(li);
  });

  overlay.classList.add("open");
}

function closeDetails() {
  overlay.classList.remove("open");
  dock.style.opacity = "0";
  setTimeout(() => {
    dock.style.transform = "none";
    dock.innerHTML = "";
  }, 300);
  stage.classList.remove("paused");
  items.forEach((i) => i.classList.remove("selected"));
}

closeBtn.addEventListener("click", closeDetails);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeDetails();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDetails();
});
