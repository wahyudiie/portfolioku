// Scroll Reveal Animation Logic
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of the element is visible
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// Initialize animations
if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", reveal);
} else {
    reveal();
}
// Contact Form Submission Handling
const form = document.getElementById("my-form");

if (form) {
    async function handleSubmit(event) {
        event.preventDefault();
        const status = document.getElementById("form-status");
        const btn = document.getElementById("submit-btn");
        const data = new FormData(event.target);
        
        btn.disabled = true;
        btn.innerText = "Sending...";

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                const name = data.get("name");
                status.innerHTML = `Pesan terkirim! Terima kasih ${name}.`;
                status.style.color = "var(--primary)";
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Oops! Ada masalah saat mengirim pesan.";
                    }
                    status.style.color = "red";
                })
            }
        }).catch(error => {
            status.innerHTML = "Oops! Ada masalah koneksi.";
            status.style.color = "red";
        }).finally(() => {
            btn.disabled = false;
            btn.innerText = "Send Message";
        });
    }
    form.addEventListener("submit", handleSubmit);
}
