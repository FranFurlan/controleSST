import { createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { collection, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { auth, db } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("signup-role").value;

      try {
        // Cria o usuário com email e senha
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Salva os dados adicionais no Firestore
        await setDoc(doc(collection(db, "users"), user.uid), {
          email: email,
          role: role,
        });

        alert("Cadastro realizado com sucesso!");
        signupForm.reset();
        window.location.href = "login.html";
      } catch (error) {
        console.error("Erro ao cadastrar:", error.message);
        alert("Erro ao cadastrar: " + error.message);
      }
    });
  }
});


/// cadastro ///

//  document.getElementById("signup-form").addEventListener("submit", async (e) => {
//    e.preventDefault();
//
//    const email = document.getElementById("email").value;
//    const password = document.getElementById("password").value;
//    const role = document.getElementById("signup-role").value;

//    createUserWithEmailAndPassword(auth, email, password, role)
//      .then((userCredential)=> {
//        const user = userCredential.user;
//        console.log('logado', user);
//        window.location.href = "login.html";
//      })
//      .cach((error)=>{
//        const errorCode = error.code;
//        const errorMessage = error.message;
//        console.error(`erro: ${errorCode} - ${errorMessage}`);
//      });
//  });
       
//// logout////
//document.getElementById("logout-button").addEventListener("click", async () => {
//  await auth.signOut();
//  alert("Você saiu com sucesso.");
//  window.location.href = "login.html";
//});
