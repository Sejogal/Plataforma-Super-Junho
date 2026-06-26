async function carregarUsuarios() {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/dashboard/insurance-kpis"
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const usuarios = await response.json();

    console.log(usuarios);
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

carregarUsuarios();