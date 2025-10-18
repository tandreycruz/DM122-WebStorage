const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("[app.js] form trigged!");
    console.log("email: ", form.email.value);
    window.localStorage.setItem('email', form.email.value);
    console.log("[app.js] email saved!");
})