<template>
  <div class="primary">
    <div class="about">
      <h3>Sistema Tokai</h3>
      <p>Cadastrar sua conta</p>
      <div class="inputContainer">
        <input type="email" placeholder="seu (email cadastrado)" id="existingEmail" v-model="existingEmail"
          class="custom-placeholder">
      </div>
      <div class="inputContainer">
        <input type="password" placeholder="sua (nova senha)" id="newPassword" v-model="newPassword"
          class="custom-placeholder">
      </div>
      <button @click="updateUserPassword">Atualizar dados</button>
      <div class="more-items">
        <RouterLink to="/login">Fazer meu Login !</RouterLink>
      </div>
      <p class="footer">© 2023 Todos os direitos reservados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../clients/supabase";
import { useRouter } from "vue-router";

let existingEmail = ref("");
let newPassword = ref("");


async function updateUserPassword() {
  const { data, error } = await supabase.auth.updateUser({
    email: existingEmail.value,
    password: newPassword.value,
  });

  if (error) {
    console.log(error);
  } else {
    console.log("Password updated successfully.");
  }
}

</script>

<style scoped>
.footer {
  margin-top: 30px;
  font-size: 11px;
  color: #52535A;
}

.primary {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

input {
  background-color: #1C1D26;
  border: 0.2px solid #292929;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  color: #6D6D70;
}

::-ms-reveal {
  filter: invert(100%);
}

.custom-placeholder::before {
  content: attr(data-placeholder);
  color: #933636;
}

.invisible-placeholder::placeholder {
  color: transparent;
}

.about {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #000;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border: 0.1px solid #f0f0f0;
  border-radius: 10px;
  min-width: 400px;
}

.about img {
  -webkit-mask-image: linear-gradient(to top, transparent 1%, black 30%);
}

.more-items {
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 30px 50px 10px 50px;
}

.footer {
  bottom: 0;
  padding: 25px;
  font-size: 11px;
  color: #a9a9a9;
}

.inputContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.primary {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

input {
  background-color: #ffffff;
  border: 0.1px solid #e6e6e6;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  color: #6D6D70;
  width: 80%;
}

input[type="email"] {
  background-color: #ffffff;
  border: 0.1px solid #e6e6e6;
}

::-ms-reveal {
  filter: invert(100%);
}

.custom-placeholder::before {
  content: attr(data-placeholder);
  color: #933636;
}

.invisible-placeholder::placeholder {
  color: transparent;
}

.about h3 {
  margin-top: 30px;
  font-weight: 700;
  font-size: 24px;
}
</style>