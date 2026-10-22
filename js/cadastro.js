const API = "http://localhost:3000/pessoas";
const formulario = document.getElementById("formEditar");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const mensagem = document.getElementById("mensagem");

const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));

async function carregarPessoa() {
    // Adicionado o 'return' para interromper a execução se o ID for inválido
    if (!Number.isInteger(id) || id <= 0) {
        mensagem.textContent = "ID inválido. Volte à listagem.";
        formulario.hidden = true;
        return;
    }

    try {
        // Busca o registro diretamente pelo ID
        const resposta = await fetch(`${API}/${id}`);

        if (!resposta.ok) {
            throw new Error("Pessoa não encontrada");
        }

        const pessoa = await resposta.json();

        campoNome.value = pessoa.nome;
        campoIdade.value = pessoa.idade;

    } catch (error) {
        mensagem.textContent = error.message;
        formulario.hidden = true;
    }
}

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const idade = Number(campoIdade.value);

    if (!nome || !Number.isInteger(idade) || idade < 0 || idade >= 130) {
        mensagem.textContent = "Informe um nome e uma idade válida";
        return;
    }

    try {
        mensagem.textContent = "";
        const resposta = await fetch(`${API}/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, idade })
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível atualizar a pessoa");
        }

        window.location.href = "index.html";
    } catch (error) {
        mensagem.textContent = error.message;
    }
});

carregarPessoa();