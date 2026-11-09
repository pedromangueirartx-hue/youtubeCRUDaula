const userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (!userLogado || !userLogado.isAdmin) { alert('Acesso negado!'); window.location.href = 'index.html'; }
function carregarUsuarios() { fetch('/usuarios').then(res => res.json()).then(renderizarTabela); }
function buscarPorCpf() {
    const cpf = document.getElementById('buscaCpf').value;
    if (!cpf) return carregarUsuarios();
    fetch(`/usuarios?cpf=${cpf}`).then(res => res.json()).then(renderizarTabela);
}
function renderizarTabela(usuarios) {
    const tbody = document.getElementById('tabelaUsuarios');
    tbody.innerHTML = '';
    usuarios.forEach(u => {
        let botaoApagar = (String(u.id) === String(userLogado.id)) 
            ? `<button class="btn-disabled" disabled>Apagar</button>` 
            : `<button style="background-color:#606060;" onclick="deletarUsuario('${u.id}')">Apagar</button>`;
        tbody.innerHTML += `<tr>
            <td>${u.nome} ${u.sobrenome}</td>
            <td>${u.cpf}</td><td>${u.email}</td>
            <td style="display: flex; gap: 5px;">
                <button class="btn-edit" onclick="prepararEdicao('${u.id}')">Editar</button>
                ${botaoApagar}
            </td>
        </tr>`;
    });
}
function deletarUsuario(id) {
    if (String(id) === String(userLogado.id)) { alert("Você não pode apagar o seu próprio utilizador!"); return; }
    if (confirm("Tem certeza que deseja apagar?")) { fetch(`/usuarios/${id}`, { method: 'DELETE' }).then(() => carregarUsuarios()); }
}
function prepararEdicao(id) {
    fetch(`/usuarios/${id}`).then(res => res.json()).then(u => {
        document.getElementById('editId').value = u.id;
        document.getElementById('editNome').value = u.nome;
        document.getElementById('editCpf').value = u.cpf;
        document.getElementById('editEmail').value = u.email;
        document.getElementById('editSecao').style.display = 'block';
    });
}
function salvarEdicao() {
    const id = document.getElementById('editId').value;
    const dados = { nome: document.getElementById('editNome').value, cpf: document.getElementById('editCpf').value, email: document.getElementById('editEmail').value };
    fetch(`/usuarios/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) })
    .then(() => { cancelarEdicao(); carregarUsuarios(); });
}
function cancelarEdicao() { document.getElementById('editSecao').style.display = 'none'; }
function sair() { localStorage.removeItem('userLogado'); window.location.href = 'login.html'; }
carregarUsuarios();