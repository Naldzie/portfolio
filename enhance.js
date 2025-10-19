// -------- Floating Action Button (FAB) navigation --------
const fab = document.getElementById("fab");
const fabPopup = document.getElementById("fab-popup");
fab.addEventListener("click", () => {
  fabPopup.classList.toggle("show");
});
document.body.addEventListener("click", (e) => {
  if (!fab.contains(e.target) && !fabPopup.contains(e.target)) {
    fabPopup.classList.remove("show");
  }
});
// ---- Animate Circular Skill Dots ----
function animateSkillDots() {
  const skillItems = document.querySelectorAll(".skill-item");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const percent = parseInt(item.dataset.percent);
        const circle = item.querySelector(".skill-dot-circle");
        const percentText = item.querySelector(".skill-percent");
        let progress = 0;

        function animate() {
          progress++;
          const deg = (progress / 100) * 360;
          circle.style.background = `conic-gradient(var(--cyan-glow) ${deg}deg, rgba(255,255,255,0.1) ${deg}deg)`;
          percentText.textContent = progress + "%";
          if (progress < percent) {
            requestAnimationFrame(animate);
          } else {
            item.classList.add("visible");
          }
        }

        requestAnimationFrame(animate);
        observer.unobserve(item);
      }
    });
  }, { threshold: 0.4 });

  skillItems.forEach(item => observer.observe(item));
}

window.addEventListener("DOMContentLoaded", animateSkillDots);


// -------- Skill Bar animation --------
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  bars.forEach(bar => {
    const pct = bar.getAttribute('data-percent');
    bar.style.width = pct + '%';
  });
}
window.addEventListener('DOMContentLoaded', animateSkillBars);

// -------- Timeline card expand/collapse --------
document.querySelectorAll('.timeline-card').forEach(card => {
  card.addEventListener('click', function() {
    this.classList.toggle("expanded");
  });
  card.addEventListener('keydown', function(e){
    if (e.key === "Enter") this.classList.toggle("expanded");
  });
});

// -------- Project Modal --------
const modal = document.getElementById("projectModal");
const modalInfo = document.getElementById("modalProjectInfo");
const closeModal = document.getElementById("closeModal");
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener("click", function () {
    let idx = card.getAttribute("data-project");
    let info = [
      `<h3>Responsive Web Portfolio</h3><p>This project: elegant cyber-modern portfolio built with animated backgrounds, neon-glow shadows, and fully responsive layouts.</p>`,
      `<h3>Color Theme Experiments</h3><p>Websites switching between dark, blue, and RGB themes, showing how palette can affect digital moods.</p>`,
      `<h3>Hackathon Group Apps</h3><p>Group project apps for student events; designed and coded in a fast-paced collaborative environment.</p>`,
    ];
    modalInfo.innerHTML = info[idx-1];
    modal.classList.add("show");
  });
});
closeModal.addEventListener("click", () => modal.classList.remove("show"));
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.classList.remove("show");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

// -------- Contact success animation --------
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("formMsg");
    let txt = "Message sent! (Demo only)";
    let curr = 0;
    msg.style.display = "block"; msg.textContent = "";
    let interval = setInterval(() => {
      msg.textContent += txt[curr];
      curr++;
      if (curr >= txt.length) {
        clearInterval(interval);
        setTimeout(() => {
          msg.style.display = "none"; form.reset();
        }, 1800);
      }
    }, 40);
  });
}
