function cadastrarUsuario() {
    const novoUser = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        rua: document.getElementById('rua').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        isAdmin: false
    };
    fetch('/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUser)
    })
    .then(res => {
        if (res.ok) { alert('Usuário cadastrado com sucesso!'); window.location.href = 'login.html'; }
        else { alert('Erro ao cadastrar.'); }
    })
    .catch(() => alert("Erro na requisição."));
}