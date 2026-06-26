//

const senhaUniversal = "bi39copr";

const audio = new Audio("/src/media/main_theme_party_hard_soundtrack_mp3_33748.mp3");

audio.play();
audio.loop=true

const som_quiz = new Audio("/src/media/som_quiz.mp3")
const som_pre_quiz = new Audio("/src/media/som_pre_quiz.mp3")

const containerQuiz = document.getElementById("containerQuiz");
const container = document.getElementById("container");



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

        reader.onload = function (e) {

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

function limparInputFile() {
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


function exibirTimes2() {
    const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];

    listaTimes2.innerHTML = "";

    dadosTimeMaster.forEach((time) => {

        listaTimes2.innerHTML += `
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
setInterval(exibirTimes2, 1000); // Atualiza a exibição dos times a cada segundo

function iniciarJogo() {
    const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];

    if (dadosTimeMaster.length === 0) {
        alert("Crie um time para iniciar o jogo!");
    }
    else{
        audio.pause();
        som_pre_quiz.play();
        exibirTimes()
        containerQuiz.classList.remove("hidden");
        containerQuiz.classList.add("container");
        container.classList.add("hidden");
        document.getElementById("containerTime1").classList.add("hidden")
        document.getElementById("btnSobre").style.display ="none"
        contagemRegressiva()
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

function verifica() {
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
    // 1* RODADA - enigmas
    {
        titulo: "Categoria - Enigmas"
    },
    {
        id: 1,
        pergunta: "Sou aberto todos os dias, ensino sem falar, guardo histórias antigas. O que sou?",
        resposta: "BÍBLIA "
    },
    {
        id: 2,
        pergunta: "A soma do versículo e o capítulo é a resposta <br/> “Mas buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas”",
        resposta: "39"
    },
    {
        id: 3,
        pergunta: "“Eles caminharam com Jesus. Digam seus nomes.",
        resposta: "Paulo, Pedro, João, Tiago, Tomé, Mateus, Judas Iscariotes, Simão Zelote, Bartolomeu, Filipe, André e Judas Tadeu"
    },
    {
        id: 4,
        pergunta: "“Emito som todos os domingo mesmo sem boca?”",
        resposta: "COLUNA",
        imagem: "/src/img/coluna.png" //qrcode será imprimido
    },
    {
        id: 5,
        pergunta: "“Quanto mais escuro o ambiente, melhor eu trabalho.Transformo uma pequena imagem numa grande apresentação.Quem sou eu?”",
        resposta: "PROJETOR"
    },
    {
        id: 6,
        pergunta: "“Quando passei na Travessa comandante Bula vi 10 árvores a minha esquerda e quando regressei vi 10 árvores a minha direita. Quantas árvores eu vi no total ?”",
        resposta: "10"
    },
    // Segunda rodada Memória --------------------------------------------------------------------------
    {
        titulo: "Categoria - Memória",
        pergunta: "Decora a sequência (dos livros da biblia) ...."
    },

    // Terceira Rodada - Lógica -----------------------------------------------------------------
    {
        titulo: "Lógica",
    },
    {
        titulo: "Jogo da Velha no quadro",
        resposta: "X - O"
    },
    {
        
        titulo: "Liga Números",
        pergunta: "Os participantes devem ligar os números no quadro sem cruzar as linhas",
        imagem: "/src/media/jogos-logica-spj/liga-numeros-sem-chocar.png"
    },
    {
        
        titulo: "Move um pau",
        pergunta: "Os participantes devem mover um pau e completar a operação",
        imagem: "/src/media/jogos-logica-spj/mova-um-pau.png"
    },
    {
        titulo: "SUDOKU",
        pergunta: "Os participantes devem jogar no quadro....",
        imagem: "/src/media/jogos-logica-spj/sudoku.png"
    },
    {
       
        titulo: "Remova uma linha",
        pergunta: "Remova uma linha e faça um quadrado....",
        imagem: "/src/media/jogos-logica-spj/remove-uma-linha-e-quadrado .png"
    },
    {
    
        titulo: "Soma das letras",
        pergunta: "Remova uma linha e faça um quadrado....",
        imagem: "/src/media/4.png"
    },
    {
        //Sequência numérica
      
        titulo: "2, 4, 8, 16, ?",
        resposta: "32"
    },

    // Última rodada
    {
        titulo: "“Hora do desafio KAHOOT”",
        pergunta: "Leiam o QR CODE no objeto do Desafio - 4",
        imagem: "/src/img/kahoot.png"
    },
    // FIM
    {
        id: 100,
        titulo:"“DESAFIO FINAL”",
        pergunta: "As equipes irão pegar as 2 primeiras letras das respostas correta 1,2,4,5 e formar a senha para completar o desafio final.",
        resposta: "As equipes irão pegar os 2 primeiros caractéres das respostas correta 1,2,4,5 e formar a senha para desbloquear o prêmio.",
        imagem: "/src/img/desafio_final.png"
    }

]

let indiceAtual = 0; // Índice para controlar qual enigma está sendo exibido
function exibirEnigmas() {
    document.getElementById("containerQuiz").classList.add("hidden")

    // Array - ID - - Argumento do array
    container.style.display = "none";

    const containerDesafios = document.getElementById("containerDesafios");
    containerDesafios.classList.add("containerDesafios");
    containerDesafios.innerHTML = "";

    containerDesafios.innerHTML += `
    ${enigmas[indiceAtual].titulo ? `<h2>${enigmas[indiceAtual].titulo}</h2>`: `<h2>Desafio - ${enigmas[indiceAtual].id} </h2>`} 
    <div>
        ${enigmas[indiceAtual].pergunta ? enigmas[indiceAtual].pergunta : "" }
        ${enigmas[indiceAtual].imagem ? `<img src="${enigmas[indiceAtual].imagem}" alt="Imagem do desafio" style="width: 30%;">` : ""}
    </div>
    <br>
    <button onclick="proximoEnigma()" class="btn btn-primary">Seguinte</button>
    <svg xmlns="http://www.w3.org/2000/svg" onclick="mostrarResposta()" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>
    <a target="_blank" href="/src/templates/inicio.html">pódio</a>

    `;

}

function proximoEnigma() {
    indiceAtual++;

    if (indiceAtual < enigmas.length) {
        exibirEnigmas();
    } else {
        window.location.href = "/src/templates/podio.html";
    }
}

function mostrarResposta() {
    const resposta = enigmas[indiceAtual].resposta;
    alert(`Resposta: ${resposta}`);
}


//SOBRE O DEV
document.getElementById("btnSobre").addEventListener("click", () => {
    container.classList.add("hidden")
    containerTime.classList.add("hidden")
    document.getElementById("viewSobre").classList.remove("hidden")
    btnSobre.style.display = "none";
});
document.getElementById("btnBackSobre").addEventListener("click", () => {
    container.classList.remove("hidden")
    containerTime.classList.remove("hidden")
    document.getElementById("viewSobre").classList.add("hidden")
    btnSobre.style.display = "block";
});



function contagemRegressiva() {
        const contagemElement = document.getElementById("contagem");
        let tempoRestante = 22; // Tempo em segundos 

        setInterval(() => {
            if (tempoRestante > 0) {
                console.log(`O jogo começa em ${tempoRestante} segundos...`);
                contagemElement.textContent = `O jogo começa em ${tempoRestante} segundos...`;
                tempoRestante--;
            } else {
                som_pre_quiz.pause()
                som_quiz.play();
                console.log("O jogo começou!");
                contagemElement.textContent = "O jogo começou!";
                document.getElementById("containerTime").classList.add("hidden");
                document.getElementById("containerQuiz").classList.add("hidden");
                document.getElementById("containerDesafios").classList.remove("hidden");
                exibirEnigmas();
                clearInterval(this);
            }
        }, 1000);
}




