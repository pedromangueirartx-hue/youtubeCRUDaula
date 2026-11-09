const userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (!userLogado) { window.location.href = 'login.html'; } 
else {
    document.getElementById('welcomeMsg').innerText = `Bem-vindo à plataforma, ${userLogado.nome}!`;
    let htmlNav = `<a href="#" onclick="sair()">Sair</a>`;
    if (userLogado.isAdmin) { htmlNav = `<a href="admin.html">Painel Admin</a> ` + htmlNav; }
    document.getElementById('navLinks').innerHTML = htmlNav;
}
function sair() { localStorage.removeItem('userLogado'); window.location.href = 'login.html'; }
