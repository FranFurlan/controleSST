import { collection, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { auth, db } from './firebase-config.js';

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      try {
        // Realiza o login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Obtém os dados do usuário do Firestore
        const userDocRef = doc(collection(db, "users"), user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          alert(`Bem-vindo, ${userData.role}!`);

          // Redireciona com base na função do usuário
          if (userData.role === "admin") {
            window.location.href = "mainAdm.html";
          } else if (userData.role === "funcionario") {
            window.location.href = "mainAll.html";
          }
        } else {
          alert("Dados do usuário não encontrados.");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        alert("Erro ao fazer login: " + error.message);
      }
    });
  }
});
// Redefinir senha
document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordButton = document.getElementById("forgotPasswordButton");
  if (forgotPasswordButton) {
    forgotPasswordButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = prompt("Digite seu email para redefinir a senha:");
      if (!email) {
          alert("Email é obrigatório para redefinir a senha.");
          return;
      }

      try {
          await sendPasswordResetEmail(auth, email);
          alert("Um email para redefinir a senha foi enviado.");
      } catch (error) {
          console.error("Erro ao redefinir senha:", error.message);
          alert("Erro ao redefinir senha: " + error.message);
      }
    });
  }
});

// Logout do usuário
document.getElementById("logoutButton").addEventListener("click", async () => {
  try {
      await signOut(auth);
      console.log("Usuário deslogado.");
      alert("Você foi deslogado com sucesso.");
      window.location.href="login.html";
  } catch (error) {
      console.error("Erro ao deslogar:", error.message);
      alert("Erro ao deslogar: " + error.message);
  }
});