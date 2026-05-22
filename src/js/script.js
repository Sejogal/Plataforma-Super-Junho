//

const senhaUniversal = "bi12copr";

const audio = new Audio("/src/media/main_theme_party_hard_soundtrack_mp3_33748.mp3");

function tocarMusica() {
    audio.play().catch((e) => {
        console.log(e);
    });
}
document.addEventListener("click", () => {
    tocarMusica();
}, { once: true });

//-------------------------------------------------------------------------

const dadosTime = []

let listaTimes = document.getElementById("listaTimes");

function abrirModal() {
    let modal = document.getElementById("modal");
    modal.classList.add("show");
   
}

const fecharModal = () => {
    let modal = document.getElementById("modal");
    modal.classList.remove("show");
}

function criarTime() {

    let nomeTime = document.getElementById("nomeTime").value;
    let pictureInput = document.getElementById("picture");

    if (pictureInput.files[0]) {

        let reader = new FileReader();

        reader.onload = function(e) {

            let imagemBase64 = e.target.result;

            dadosTime.push({
                id: dadosTime.length + 1,
                nomeDoTime: nomeTime,
                pontos: 0,
                picture: imagemBase64
            });

            localStorage.setItem(
                "dadosTimeMaster",
                JSON.stringify(dadosTime)
            );

            fecharModal();
            listaTimes.innerHTML = "";
            exibirTimes();
        }

        reader.readAsDataURL(pictureInput.files[0]);

    } else {

        dadosTime.push({
            id: dadosTime.length + 1,
            nomeDoTime: nomeTime,
            pontos: 0,
            picture: "https://cdn-icons-png.flaticon.com/512/616/616408.png"
        });

        localStorage.setItem(
            "dadosTimeMaster",
            JSON.stringify(dadosTime)
        );
        // window.location.href = "/";
        pictureInput.value = "";
        fecharModal();
        listaTimes.innerHTML = "";
        exibirTimes();
    }
}

function limparInputFile(){
    let pictureInput = document.getElementById("picture");
    pictureInput.value = "";
}

function exibirTimes() {
    const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];

    listaTimes.innerHTML = "";

    dadosTimeMaster.forEach((time) => {

        listaTimes.innerHTML += `
        <div>
            <img 
                style="border-radius:50%; border:2px solid #333;" 
                src="${time.picture}" 
                alt="${time.nomeDoTime}" 
                width="70" 
                height="70"
            >

            ${time.nomeDoTime}: ${time.pontos} pontos
        </div>
        `;
    });

    // listaTimes.style.borderBottom = "3px solid #333";
}
setInterval(exibirTimes, 1000); // Atualiza a exibição dos times a cada segundo



function iniciarJogo() {
    const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];
    
    if(dadosTimeMaster.length === 0) {
        alert("Crie um time para iniciar o jogo!");
    }
    else{
        window.location.href = "/src/templates/inicio.html";
    }
}

function deletarTime() {

    const senha = prompt("Digite a senha para deletar os times:"); 
    if (senha === senhaUniversal) {
        localStorage.removeItem("dadosTimeMaster");
        listaTimes.innerHTML = "";
        alert("Times deletados com sucesso!");
        // window.location.href = "/";
    } else {
        alert("Senha incorreta! Os times não foram deletados.");
    }

}

let dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || []; // Variavel que armazena os times na localStorage

function verifica(){
    if (dadosTimeMaster.length === 0) {
    document.getElementById("titleTime").innerHTML = "Nenhum time criado ainda!";
    btnIniciar.style.display = "none";
    }

}
setInterval(verifica, 100); // Verifica a cada segundo se há times criados para atualizar a interface


function acessarPainelAdm() {
    const senha = prompt("Digite a senha para acessar o painel de administração:");
    if (senha === senhaUniversal) {
        window.location.href = "/src/templates/adm/dashboard.html";
    } else {
        alert("Senha incorreta! Acesso negado.");
    } 
}

const enigmas = [
    {
        id: 1,
        pergunta: "Sou aberto todos os dias, ensino sem falar, guardo histórias antigas. O que sou?",
        resposta: "BÍBLIA "
    },
    { 
        id: 2,
        pergunta: "“Eles caminharam com Jesus. Digam seus nomes. (Num quadro ou bloco de nota invisível para os outros time)” ",
        resposta: "Paulo, Pedro, João, Tiago, Tomé, Mateus, Judas Iscariotes, Simão Zelote, Bartolomeu, Filipe, André e Judas Tadeu"
    },
    {
        id: 3,
        pergunta: "“Onde a voz ecoa sem boca?”",
        resposta: "COLUNA"
    },
    {
        id: 4,
        pergunta: "“O que é que tem lentes e vê tudo, mas não tem olhos?”",
        resposta: "PROJETOR"
    },
    {
        id: 5,
        pergunta: "Jogo da Velha no quadro",
        resposta: "JOGO DA VELHA"
    },
    {
        id: 6,
        pergunta: "“Hora do desafio KAHOOT”",
        resposta: "GARRAFA",
        imagem: "/src/img/kahoot.png"
    },
    {
        id: 7,
        pergunta: "“Hora do quiz Feira Comunitária”",
        resposta: "",
        imagem: "/src/media/qrcode_quiz-feira-comunit-ria.onrender.com.png"
    },
    {
        id: 8,
        pergunta: "“Desafio Travessia da Fé",
        resposta: "Objetivo: Passar objetos com olhos vendados (E a equipe só pode falar no máximo 10 vezes para ajudar o amigo a chegar no fim)",
    },
    {
        id: 9,
        pergunta: "“DESAFIO FINAL”",
        resposta: "As equipes irão pegar os 2 primeiros caractéres de cada resposta correta e formar a senha para desbloquear o prêmio.",
        imagem: "/src/img/desafio_final.png"
    }

]

let indiceAtual = 0; // Índice para controlar qual enigma está sendo exibido
function exibirEnigmas() {
    // Array - ID - - Argumento do array
    container.style.display = "none";

    const containerDesafios = document.getElementById("containerDesafios");
    containerDesafios.classList.add("containerDesafios");
    containerDesafios.innerHTML = "";

    containerDesafios.innerHTML += `
    <h2>Desafios</h2>
    <div>
        ${enigmas[indiceAtual].pergunta}
        ${enigmas[indiceAtual].imagem ? `<img src="${enigmas[indiceAtual].imagem}" alt="Imagem do desafio" style="max-width: 100%; height: auto;">` : ""}
    </div>
    <button onclick="proximoEnigma()" class="btn btn-primary">Seguinte</button>
    `;
    
}

function proximoEnigma() {
    indiceAtual++;
    
    if (indiceAtual < enigmas.length) {
        exibirEnigmas();
    } else {
        window.location.href = "podio.html";
    }
}