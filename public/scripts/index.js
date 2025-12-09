// ===== Scroll Smooth =====
document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== Contact Form =====
const inquireForm = document.querySelector("#inquire");
if (inquireForm) {
    inquireForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameEl = document.querySelector("#name");
        const emailEl = document.querySelector(".email");
        const messageEl = document.querySelector("#message");

        const name = nameEl ? nameEl.value : "";
        const email = emailEl ? emailEl.value : "";
        const message = messageEl ? messageEl.value : "";

        try {
            const res = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            const data = await res.json();

            if (data.status === "ok") {
                alert("Message is sent! Thanks!");
                e.target.reset();
            } else {
                alert("Error sending message.");
            }
        } catch (err) {
            console.error('Contact submit failed', err);
            alert('Error sending message.');
        }
    });
}

// ===== Register Form =====
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;

        try {
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, password })
            });

            const data = await res.json();

            if (data.status === "ok") {
                alert("Account created!");
                e.target.reset();
            } else {
                alert("Error, try again.");
            }
        } catch (err) {
            console.error('Register submit failed', err);
            alert('Error, try again.');
        }
    });
}


//====== LOG IN FORM =======//
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.status === "ok") {
            alert("Logged in!");
            window.location.href = "/shop"; // redirect to shop
        } else {
            alert("Invalid email or password.");
        }
    });
}





// ===== Schedule Changer =====
const Fall24Btn = document.getElementById('24-fall');
const Fall25Btn = document.getElementById('25-fall');
const Spring25Btn = document.getElementById('25-spring');

const Fall24Schedule = document.querySelector('.fall24');
const Fall25Schedule = document.querySelector('.fall25');
const Spring25Schedule = document.querySelector('.spring25');

if (Fall24Schedule && Fall25Schedule && Spring25Schedule) {
    Fall24Schedule.style.display = 'none';
    Fall25Schedule.style.display = 'block';
    Spring25Schedule.style.display = 'none';

    Fall24Btn.onclick = () => {
        Fall24Schedule.style.display = 'block';
        Fall25Schedule.style.display = 'none';
        Spring25Schedule.style.display = 'none';
    };

    Fall25Btn.onclick = () => {
        Fall25Schedule.style.display = 'block';
        Fall24Schedule.style.display = 'none';
        Spring25Schedule.style.display = 'none';
    };

    Spring25Btn.onclick = () => {
        Spring25Schedule.style.display = 'block';
        Fall24Schedule.style.display = 'none';
        Fall25Schedule.style.display = 'none';
    };
}
