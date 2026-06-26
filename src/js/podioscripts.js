const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];


function ordenarTimesPorPontos(times) {
    return [...times].sort((a, b) => b.pontos - a.pontos);
}

function exibirPodio() {
    const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];

    const ordenados = ordenarTimesPorPontos(dadosTimeMaster);

    const podio = document.getElementById("podio");
    const restoPodio = document.getElementById("restoPodio");

    podio.innerHTML = "";
    restoPodio.innerHTML = "";

    const top3 = ordenados.slice(0, 3);
    const resto = ordenados.slice(3);

    // PODIO (1º, 2º, 3º corretamente)
    if (top3[0]) {
        podio.innerHTML += `
        <div class="podio-item primeiro">
            <div class="posicao">1</div>
            <img src="${top3[0].picture}">
            <h3>${top3[0].nomeDoTime}</h3>
            <p>${top3[0].pontos} pts</p>
        </div>`;
    }

    if (top3[1]) {
        podio.innerHTML += `
        <div class="podio-item segundo">
            <div class="posicao">2</div>
            <img src="${top3[1].picture}">
            <h3>${top3[1].nomeDoTime}</h3>
            <p>${top3[1].pontos} pts</p>
        </div>`;
    }

    if (top3[2]) {
        podio.innerHTML += `
        <div class="podio-item terceiro">
            <div class="posicao">3</div>
            <img src="${top3[2].picture}">
            <h3>${top3[2].nomeDoTime}</h3>
            <p>${top3[2].pontos} pts</p>
        </div>`;
    }

    // RESTO
    resto.forEach((time) => {
        restoPodio.innerHTML += `
        <div class="item">
            <img src="${time.picture}">
            <div>
                <h4>${time.nomeDoTime}</h4>
                <span>${time.pontos} pts</span>
            </div>
        </div>`;
    });
}

exibirPodio();

function mostrarTextoSuspense() {
    const textoElement = document.getElementById("textoSuspense");
    let index = 0;
    const intervalo = setInterval(() => {
        if (index < textosSuspense.length) {
            textoElement.textContent = textosSuspense[index];
            index++;
        } else {
            clearInterval(intervalo);
        }
    }, 4000); // Altera o texto a cada 4 segundos
}

mostrarTextoSuspense();

    let podioContainer = document.getElementById("podioContainer");
    let containerSuspense = document.getElementById("containerSuspense");

    //Exibir o pódio após 25 segundos (tempo para criar suspense)
    //    setTimeout(() => {
    //     podioContainer.classList.remove("hidden");
    //     podioContainer.classList.add("podio-container");
    //     containerSuspense.classList.add("hidden");
    //     audioSuspense.pause();
    //     audio.play();
    //    }, 25000);

    document.addEventListener("click", () => {
        podioContainer.classList.remove("hidden");
        podioContainer.classList.add("podio-container");
        containerSuspense.classList.remove("containerSuspense");
        containerSuspense.classList.add("hidden");
        audioSuspense.pause();
        audio.play();
    }, { once: true });

    const textosSuspense = [
        "Calculando resultados...",
        "Analisando desempenho dos times...",
        "Quase lá...",
        "Preparando o pódio...",
        `Será que o time ${dadosTimeMaster[0] ? dadosTimeMaster[0].nomeDoTime : "X"} vai ganhar?`,
        `E o time ${dadosTimeMaster[1] ? dadosTimeMaster[1].nomeDoTime : "Y"}?`,
        `O time ${dadosTimeMaster[2] ? dadosTimeMaster[2].nomeDoTime : "Z"} está na disputa...`,
        "A tensão está no ar..."
    ];


    