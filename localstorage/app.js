const form = document.querySelector("form");
const main = document.querySelector("main");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("[app.js] form trigged!");
    console.log("email: ", form.email.value);
    window.localStorage.setItem('email', form.email.value);
    console.log("[app.js] email saved!");
    loadSavedData();
});

function loadSavedData() {
    console.log("[app.js] fetching email");
    const email = window.localStorage.getItem("email");
    if (!email) {
        console.error("[app.js] no email found!");
        return;
    }
    console.log(`[app.js] ${email}`);
    const spanEmail = document.querySelector('.email');
    spanEmail.textContent = email;
}

loadSavedData();