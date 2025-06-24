<template>
  <div class="primary animate__animated animate__fadeInLeft animate__delay-1s">
    <div class="about">
      <h3>Sistema Tokai</h3>
      <p>Entrar na sua conta</p>
      <form @submit.prevent="login" class="bg-re-300 w-[350px]">
        <input type="email" placeholder="Seu e-mail" id="email" v-model="email"
          class="bg-white mt-4 p-3 text-gray-400 rounded border-solid border-[1px] border-gray-200 w-full">
        <div class="flex justify-end">
          <input :type="passwordFieldType" placeholder="Sua senha" id="password" v-model="password"
            class="bg-white mt-4 p-3 text-gray-400 rounded border-solid border-[1px] border-gray-200 w-full">
          <button type="button" @click="togglePasswordVisibility" class="fixed my-7 mx-4 text-gray-400 bg-red-">
            <i :class="passwordIcon"></i>
          </button>
        </div>
        <button type="submit" class="flex items-center mt-4 p-3 justify-center gap-2 bg-[#333638] text-gray-400 rounded-full w-full cursor-pointer hover:bg-[#151617] hover:text-gray-300">
          <Loading v-if="loading" />
          <div class="">Entrar</div>
        </button>
      </form>
      <!-- <div class="more-items">
        <RouterLink to="/cadastro">Cadastrar-se !</RouterLink>
        <RouterLink to="/esqueci-minha-senha">Recuperar senha ?</RouterLink>
      </div> -->
      <p class="footer">© 2024 Todos os direitos reservados.</p>
      <!-- <button @click="doSomething">Do Confetti!</button> -->
    </div>

    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme"  />
    </Notivue>
  </div>
</template>

<script setup>
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import { Notivue, Notification, pastelTheme, push } from 'notivue';
import { supabase } from "../clients/supabase";
import Loading from "./Loading.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
// import { Toaster, toast } from "@steveyuowo/vue-hot-toast";
// import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";

const loading = ref(false);
let email = ref("");
let password = ref("");
let showPassword = ref(false);
const router = useRouter();

const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'));
const passwordIcon = computed(() => (showPassword.value ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'));

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const doSomething = () => {
  push.success('Confetti!');
  confetti();
};

async function login() {
  const notification = push.promise("Aguarde realizando login ...")
  loading.value = true;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    loading.value = false;
    notification.reject('Credenciais incorretas!')
    return
  } else {
    notification.resolve('Sucesso nas credenciais!')
    loading.value = false;
    router.push('/dashboard');
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('userPlan', data.user.user_metadata.type_plan);
    localStorage.setItem('userMeta', data.user.user_metadata.bg_color);
    localStorage.setItem('userCpf', data.user.user_metadata.cpf);
    localStorage.setItem('userCnpj', data.user.user_metadata.cnpj);
    localStorage.setItem('userEmpresa', data.user.user_metadata.empresa);
    localStorage.setItem('userDataPlano', data.user.user_metadata.data_plano);
    localStorage.setItem('userPhoto', data.user.user_metadata.base_photo);
    localStorage.setItem('empresaVinculo', data.user.user_metadata.empresa_uuid);
    localStorage.setItem('userAbacate', data.user.user_metadata.user_abacate);
    // localStorage.setItem('proximoPagamento', data.user.user_metadata.proximo_pagamento);
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


input[type="email"], input[type="password"] {
  background-color: #1d1f20;
  border: 0.1px solid #333638;
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
  border: 0.1px solid #1d1f20;
  border-radius: 10px;
  min-width: 400px;

  box-shadow: 0px 0px 1px 1px #363636;
  color: #969696;
  background-color: #1d1f20;
}

.about h3 {
  margin-top: 30px;
  font-weight: 700;
  font-size: 24px;
}

/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
  -webkit-box-shadow: 0 0 0 30px rgba(43, 43, 43, 0) inset !important;
  transition: background-color 5000s ease-in-out 0s;
}

/*Change text in autofill textbox*/
input:-webkit-autofill{
    -webkit-text-fill-color: rgb(255, 255, 255) !important;
}
</style>
