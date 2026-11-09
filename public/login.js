function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    fetch('/usuarios')
    .then(res => res.json())
    .then(dados => {
        const usuario = dados.find(user => user.email === email && user.senha === senha);
        if (usuario) {
            localStorage.setItem('userLogado', JSON.stringify(usuario));
            window.location.href = 'index.html';
        } else { alert("E-mail ou Senha incorretos!"); }
    })
    .catch(() => alert("Erro ao conectar com o servidor."));
}