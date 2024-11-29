// Define routes
const routes = {
    "/": "index.html",
    "/about": "pages/its-ws-about.html",
    "/contact": "pages/its-ws-contact-us.html"
};

// Load external partials (header/footer)
function loadPartials() {
    fetch("/partials/header.html")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("header_sec").innerHTML = data;
        });
    fetch("/partials/footer.html")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("footer_sec").innerHTML = data;
        });
}

// Function to load pages dynamically
function loadPage(route) {
    const file = routes[route] || routes["/"];
    fetch(file)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Page not found: ${file}`);
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById("main-content").innerHTML = data;
        })
        .catch((error) => {
            console.error("Error loading page:", error);
            document.getElementById("main-content").innerHTML = `<h2>Error 404: Page not found</h2>`;
        });
}

// Initial page load
let currentRoute = window.location.pathname;
if (!routes[currentRoute]) {
    currentRoute = "/";
    window.history.replaceState({}, "", "/");
}
loadPartials();
loadPage(currentRoute);

// Handle link navigation
document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-route]");
    if (link) {
        event.preventDefault();
        const route = link.getAttribute("data-route");
        window.history.pushState({}, "", route);
        loadPage(route);
    }
});

// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
    loadPage(window.location.pathname);
});
