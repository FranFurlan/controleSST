import { db } from './firebase-config.js'; 
import { addDoc, collection, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

//console.log("Firestore DB:", db);

//const db = getFirestore();
const fForm = document.getElementById("f-form");
const fTableBody = document.querySelector("#f-table tbody");

// Função para cadastrar Funcionario no Firestore
const cadastrarFuncionario = async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const register = document.getElementById("reg").value;
  const func = document.getElementById("func").value;
  const obra = document.getElementById("obra").value;
  const add = document.getElementById("add").value;

  if (!name || !cpf || !register || !func || !obra || !add) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    await addDoc(collection(db, "funcionarios"), {
      name,
      cpf,
      register,
      func,
      obra,
      add,
      createdAt: new Date()
    });   
    fForm.reset(); // Limpa o formulário
  } catch (error) {
    console.error("Erro ao cadastrar EPI:", error);
  }
};

// Função para excluir um Funcionário do Firestore
const excluirFunc = async (id) => {
    try {
      await deleteDoc(doc(db, "funcionarios", id));
      alert("Funcionário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir EPI:", error);
    }
};

// Função para exibir os Funcionários na tabela
const carregarTabelaFuncs = () => {
  const funcRef = collection(db, "funcionarios");

  // Atualiza a tabela em tempo real
  onSnapshot(funcRef, (snapshot) => {
    fTableBody.innerHTML = ""; 
    snapshot.forEach((doc) => {
      const { name, cpf, register, func, obra, add } = doc.data();
      const row = `
        <tr>
          <td>${name}</td>
          <td>${cpf}</td>
          <td>${register}</td>
          <td>${func}</td>
          <td>${obra}</td>
          <td>${add}</td>
          <td>
            <button class="delete-btn" data-id="${doc.id}">
              🗑️
            </button>
          </td>
        </tr>
      `;
      fTableBody.innerHTML += row;
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            excluirFunc(id);
        });
    });
  });
};

// Inicializa eventos
fForm.addEventListener("submit", cadastrarFuncionario);
carregarTabelaFuncs();

document.getElementById("home"),addEventListener("click", () => {
    window.location.href = "mainAdm.html";
})