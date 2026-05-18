//

const senhaUniversal = "bi12copr";

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

        fecharModal();
        listaTimes.innerHTML = "";
        exibirTimes();
    }
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
                width="50" 
                height="50"
            >

            ${time.nomeDoTime}: ${time.pontos} pontos
        </div>
        `;
    });

    listaTimes.style.borderBottom = "3px solid #333";
}
exibirTimes();


function iniciarJogo() {
    const dadosTimeMaster = JSON.parse(localStorage.getItem("dadosTimeMaster")) || [];

    if(dadosTimeMaster.length === 0) {
    alert("Crie um time para iniciar o jogo!");
    }
    else{
         window.location.href = "templates/inicio.html";
    }
}

function deletarTime() {

    const senha = prompt("Digite a senha para deletar os times:"); 
    if (senha === senhaUniversal) {
        localStorage.removeItem("dadosTimeMaster");
        listaTimes.innerHTML = "";
        alert("Times deletados com sucesso!");
    } else {
        alert("Senha incorreta! Os times não foram deletados.");
    }

}