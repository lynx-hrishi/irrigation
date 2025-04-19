fetch('/static/header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header').innerHTML = data;

        // Attach the event listener after the header is loaded
        const menu = document.getElementById('menu');
        const sidebar = document.querySelector('.sidebar');

        if (menu && sidebar) {
            menu.addEventListener('click', function() {
                console.log("Sidebar toggle function triggered.");
                sidebar.style.display = "flex";
            });
        }

        const closeMenu = document.getElementById('closeMenu');
        closeMenu.addEventListener('click', () => {
            sidebar.style.display = 'none';
        })
})
.catch(error => console.error('Error loading header:', error));