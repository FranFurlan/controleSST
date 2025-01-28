import { db } from './firebase-config.js'; 
import { addDoc, collection, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

//console.log("Firestore DB:", db);

//const db = getFirestore();
const oForm = document.getElementById("o-form");
const oTableBody = document.querySelector("#o-table tbody");

// Função para cadastrar Obra no Firestore
const cadastrarObra = async (e) => {
  e.preventDefault();

  const name = document.getElementById("nameO").value.trim();
  const cnpj = document.getElementById("cpf").value.trim();
  const end = document.getElementById("end").value;
  const tel1 = document.getElementById("tel1").value;
  const tel2 = document.getElementById("tel2").value;
  const tel3 = document.getElementById("tel3").value;

  if (!name || isNaN(cnpj) || !end || !tel1 || !tel2 || !tel3) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    await addDoc(collection(db, "obras"), {
      name,
      cnpj,
      end,
      tel1,
      tel2,
      tel3,
      createdAt: new Date()
    });   
    oForm.reset(); // Limpa o formulário
  } catch (error) {
    console.error("Erro ao cadastrar Obra:", error);
  }
};

// Função para excluir Obra do Firestore
const excluirFunc = async (id) => {
    try {
      await deleteDoc(doc(db, "obras", id));
      alert("Obra excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir EPI:", error);
    }
};

// Função para exibir obras na tabela
const carregarTabelaObras = () => {
  const obraRef = collection(db, "obras");

  // Atualiza a tabela em tempo real
  onSnapshot(obraRef, (snapshot) => {
    oTableBody.innerHTML = ""; 
    snapshot.forEach((doc) => {
      const { name, cnpj, end, tel1, tel2, tel3 } = doc.data();
      const row = `
        <tr>
          <td>${name}</td>
          <td>${cnpj}</td>
          <td>${end}</td>
          <td>${tel1}</td>
          <td>${tel2}</td>
          <td>${tel3}</td>
          <td>
            <button class="delete-btn" data-id="${doc.id}">
              🗑️
            </button>
          </td>
        </tr>
      `;
      oTableBody.innerHTML += row;
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            excluirObra(id);
        });
    });
  });
};

// Inicializa eventos
oForm.addEventListener("submit", cadastrarObra);
carregarTabelaObras();

document.getElementById("home"),addEventListener("click", () => {
    window.location.href = "mainAdm.html";
})