document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadLogin();
});

function loadNavbar() {
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar').innerHTML = data);
}

function loadLogin() {
    fetch('components/login.html')
        .then(response => response.text())
        .then(data => document.getElementById('content').innerHTML = data)
        .then(() => {
            document.getElementById('loginForm').addEventListener('submit', (e) => {
                e.preventDefault();
                login();
            });
        });
}

function loadCommunity() {
    fetch('components/community.html')
        .then(response => response.text())
        .then(data => document.getElementById('content').innerHTML = data);
}

function selectCommunity(community) {
    // Logic to load community specific content
    document.getElementById('publications').innerHTML = `<h3>${community.charAt(0).toUpperCase() + community.slice(1)} Publications</h3>`;
    // Fetch and display publications
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Logic to authenticate user
    alert('Logged in as ' + username);
}

function interact(action, id) {
    // Logic to handle interactions
    alert(`Action: ${action}, ID: ${id}`);
}
