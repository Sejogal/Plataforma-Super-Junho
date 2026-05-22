
function gerirTimes() {
    const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];
    
    listaTimes.innerHTML = "";
    
    dadosTimeMaster.forEach((time) => {
        
        listaTimes.innerHTML += `
        <div>
            <img 
            style="border-radius:50%; border:2px solid #333;" 
            src="${time.picture}" 
            alt="${time.nomeDoTime}" 
            width="50" 
                height="50"
            >
            
            ${time.nomeDoTime}: ${time.pontos} pontos - <input type="number" id="pontos-${time.id}" placeholder="Pontos" />
            <button class="btn btn-success" onclick="adicionarPontosAoTime(${time.id}, parseInt(document.getElementById('pontos-${time.id}').value) || 0)">+</button>
            </div>
            `;
        });
        
        listaTimesAdm.style.borderBottom = "3px solid #333";
    }
    
gerirTimes();
    
function adicionarPontosAoTime(idTime, pontosParaAdicionar) {
        const times = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];

        const time = times.find(t => t.id === idTime);
        if (!time) {
            console.error("Time não encontrado:", idTime);
            return;
        }
        
        time.pontos = (time.pontos || 0) + pontosParaAdicionar;
        
        localStorage.setItem("dadosTimeMaster", JSON.stringify(times));
        exibirTimes(); // atualizar interface
    }


function verifica(){
    const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];

    if (dadosTimeMaster.length === 0) {
    document.getElementById("titleTime").innerHTML = "Nenhum time criado ainda!";
    }
}
setInterval(verifica, 100);