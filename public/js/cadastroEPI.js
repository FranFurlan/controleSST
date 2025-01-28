import { db } from './firebase-config.js'; 
import { addDoc, collection, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

//console.log("Firestore DB:", db);

//const db = getFirestore();
const epiForm = document.getElementById("epi-form");
const epiTableBody = document.querySelector("#epi-table tbody");

// Função para cadastrar EPI no Firestore
const cadastrarEPI = async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const ca = document.getElementById("ca").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value);
  const validity = document.getElementById("validity").value;
  const entryDate = document.getElementById("entry_date").value;

  if (!name || !ca || isNaN(quantity) || !validity || !entryDate) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    await addDoc(collection(db, "epis"), {
      name,
      ca,
      quantity,
      validity,
      entryDate,
      createdAt: new Date()
    });   
    epiForm.reset(); // Limpa o formulário
  } catch (error) {
    console.error("Erro ao cadastrar EPI:", error);
  }
};

// Função para formatar a validade
const formatarValidade = (validity) => {
  const hoje = new Date();
  const validade = new Date(validity);

  if (validade < hoje) return { status: "Expirado", className: "expired" };
  if ((validade - hoje) / (1000 * 60 * 60 * 24) <= 30) return { status: "Próximo da Validade", className: "near-expiry" };
  return { status: "Válido", className: "valid" };
};

// Função para excluir um EPI do Firestore
const excluirEPI = async (id) => {
    try {
      await deleteDoc(doc(db, "epis", id));
      alert("EPI excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir EPI:", error);
    }
};

// Função para exibir os EPIs na tabela
const carregarTabelaEPIs = () => {
  const episRef = collection(db, "epis");

  // Atualiza a tabela em tempo real
  onSnapshot(episRef, (snapshot) => {
    epiTableBody.innerHTML = ""; 
    snapshot.forEach((doc) => {
      const { name, ca, quantity, validity, entryDate } = doc.data();
      const { status, className } = formatarValidade(validity);

      const row = `
        <tr>
          <td>${name}</td>
          <td>${ca}</td>
          <td>${quantity}</td>
          <td>${validity}</td>
          <td>${entryDate}</td>
          <td class="valid-status ${className}">${status}</td>
          <td>
            <button class="delete-btn" data-id="${doc.id}">
              🗑️
            </button>
          </td>
        </tr>
      `;
      epiTableBody.innerHTML += row;
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            excluirEPI(id);
        });
    });
  });
};

// Inicializa eventos
epiForm.addEventListener("submit", cadastrarEPI);
carregarTabelaEPIs();

document.getElementById("home"),addEventListener("click", () => {
    window.location.href = "mainAdm.html";
})