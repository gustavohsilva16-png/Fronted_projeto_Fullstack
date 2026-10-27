const API = "http://localhost:3000/pessoas";
const formulario = document.getElementById("formCadastro");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("Idade"); // Atenção ao seu HTML onde o 'I' é maiúsculo!
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  // 1. Pega os valores digitados e remove espaços extras
  const nome = campoNome.value.trim();
  const idade = Number(campoIdade.value);

  // 2. Validações antes de enviar para o servidor
  if (!nome || !Number.isInteger(idade) || idade < 0 || idade > 130) {
    mensagem.textContent = "Informe um nome e uma idade válida.";
    return;
  }

  try {
    mensagem.textContent = "";

    // 3. Faz a requisição POST para cadastrar uma nova pessoa
    const resposta = await fetch(API, {
      method: "POST", // Método POST serve para criar novos registros
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, idade }) // O JSON Server gera o 'id' automaticamente
    });

    if (!resposta.ok) {
      throw new Error("Não foi possível cadastrar a pessoa.");
    }

    // 4. Se der tudo certo, volta para a tela da tabela
    window.location.href = "index.html";

  } catch (erro) {
    mensagem.textContent = erro.message;
  }
});