<template>
  <div class="primary animate__animated animate__fadeInLeft">
    <div class="about">
      <h3>Sistema Tokai</h3>
      <p>Trocar senha da conta</p>
      <div class="inputContainer">
        <input
          type="email"
          placeholder="seu email"
          id="forgotPasswordEmail"
          v-model="forgotPasswordEmail"
          class="custom-placeholder"
        />
      </div>
      <button @click="sendPasswordResetEmail">Receber resgate</button>
      <div class="more-items">
        <RouterLink to="/login">Fazer login ?</RouterLink>
        <RouterLink to="/cadastro">Cadastrar-se !</RouterLink>
      </div>
      <p class="footer">© 2024 Todos os direitos reservados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../clients/supabase";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
let forgotPasswordEmail = ref("");

async function sendPasswordResetEmail() {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    forgotPasswordEmail.value
  );
  if (error) {
    if (error.status === 429) {
      toast.error("Muitas tentativas, tente novamente mais tarde!");
      forgotPasswordEmail.value = "";
    } else {
      toast.error("Erro ao enviar resgate!");
      forgotPasswordEmail.value = "";
    }

  } else {
    toast.success("Resgate enviado ao email!");
    router.push('/login');
    console.log("Resgate enviado ao email!");
    forgotPasswordEmail.value = "";
  }
}
</script>

<style scoped>

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

.about h3 {
  margin-top: 30px;
  font-weight: 700;
  font-size: 24px;
}
</style>
