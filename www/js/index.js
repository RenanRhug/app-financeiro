document.addEventListener("DOMContentLoaded", () => {
    const descricaoInput = document.getElementById("descricao");
    const valorInput = document.getElementById("valor");
    const tipoSelect = document.getElementById("tipo");
    const adicionarBtn = document.getElementById("adicionar");
    const listaTransacoes = document.getElementById("lista-transacoes");

    const totalEntradasEl = document.getElementById("total-entradas");
    const totalSaidasEl = document.getElementById("total-saidas");
    const saldoEl = document.getElementById("saldo");

    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    
  function atualizarUI() {
    listaTransacoes.innerHTML = "";

    let entradas = 0;
    let saidas = 0;

    transacoes.forEach((t, index) => {
        const li = document.createElement("li");

       
        const texto = document.createElement("span");
        texto.textContent = `${t.descricao} - R$ ${t.valor.toFixed(2)}`;

      
        const badge = document.createElement("span");
        badge.textContent = t.tipo === "entrada" ? "💰 Entrada" : "💸 Saída";
        badge.className = `badge ${t.tipo}`;

        
        const removerBtn = document.createElement("button");
        removerBtn.textContent = "🗑️";
        removerBtn.style.fontSize = "1.3rem";
        removerBtn.onclick = () => removerTransacao(index);

    
        li.appendChild(texto);
        li.appendChild(badge);
        li.appendChild(removerBtn);

        listaTransacoes.appendChild(li);

        
        if (t.tipo === "entrada") {
            entradas += t.valor;
        } else {
            saidas += t.valor;
        }

        const saldoAtual = entradas - saidas;
        saldoEl.textContent = saldoAtual.toFixed(2);

        
        if (saldoAtual < 0) {
            saldoEl.classList.add("negativo");
            saldoEl.classList.remove("positivo");
        } else if (saldoAtual > 0) {
            saldoEl.classList.add("positivo");
            saldoEl.classList.remove("negativo");
        } else {
            saldoEl.classList.remove("positivo", "negativo");
        }

    });

    totalEntradasEl.textContent = entradas.toFixed(2);
    totalSaidasEl.textContent = saidas.toFixed(2);
    saldoEl.textContent = (entradas - saidas).toFixed(2);

    localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

    
    function adicionarTransacao() {
        const descricao = descricaoInput.value.trim();
        const valor = parseFloat(valorInput.value);
        const tipo = tipoSelect.value;

        if (!descricao || isNaN(valor) || valor <= 0) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        transacoes.push({ descricao, valor, tipo });
        descricaoInput.value = "";
        valorInput.value = "";
        tipoSelect.value = "entrada";

        atualizarUI();
    }

 
    function removerTransacao(index) {
        transacoes.splice(index, 1);
        atualizarUI();
    }

    adicionarBtn.addEventListener("click", adicionarTransacao);

    atualizarUI();
});
