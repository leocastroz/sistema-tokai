<template>
  <div class="primary animate__animated animate__fadeIn">
    <div class="about">
      <p style="color: #fff">Novo acesso para empresa</p>
      <div class="inputContainer">
        <input type="email" placeholder="Email do usuario" id="email" v-model="email" class="custom-placeholder" autocomplete="off">
      </div>
      <div class="inputContainer">
        <input type="password" placeholder="Senha para o usuario" id="password" v-model="password" autocomplete="off">
      </div>
      <div class="inputContainer">
        <input type="username" placeholder="Nome de perfil" id="username" v-model="username" autocomplete="off">
      </div>
      <div class="inputContainer">
        <select id="typePlan" v-model="typePlan">
          <option disabled selected value="">Selecione o tipo de plano</option>
          <option value="admin" disabled>Administrador</option>
          <option value="dev" disabled>Desenvolvedor</option>
          <option value="frentista">Frentista</option>
        </select>
      </div>
      <input placeholder="CPF" v-model="cpfCnpj" v-maska="'###.###.###-##'" autocomplete="off">
      <button @click="createAccount" class="bg-blue-500 rounded-full text-white my-5 p-3 text-white cursor-pointer hover:bg-blue-600 hover:text-white">Criar usuário</button>
    </div>
  </div>
</template>
  
<script setup>
import { vMaska } from "maska/vue";
import { supabase } from "@/clients/supabase";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const toast = useToast();
const router = useRouter();
let username = ref("");
let password = ref("");
let email = ref("");
let cpfCnpj = ref("");
let typePlan = ref("");
// let base_photo = ref("");
let userId = localStorage.getItem('userId');

async function createAccount() {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 2);
  let data_plano = currentDate.toISOString();

	const { user, error } = await supabase.auth.signUp({
		email: email.value,
		password: password.value,
		options: {
			data: {
				username: username.value,
				cpf_cnpj: cpfCnpj.value,
        plano: 'admin', //free // admin // coach // florist // medical // journalist
        time_plan: data_plano,
        type_plan: typePlan.value, // adminsistema// cadastro aqui -> //free // admin // coach // florist // medical //
        status_plan: true, // true // false
        base_photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHwUGFzxYoWzGK6bZ1xJUHO_jJ0-MrTtHplf3BvVCtL-EVNfVOIkmONBRHIhcKk3jp7Q&usqp=CAU',
        // bg_color: 'radial-gradient(circle at 10% 20%,rgb(114,124,133) 0%,#3a3a3a 90.1%)',
        bg_color: '#1e90ff',
        item_color: '#ffffff9f',
        active_bg_color: '#e6e6e642',
        active_item_color: '#ffffff',
        empresa_uuid: userId, // id da empresa que cadastra
        checklist: []
			}
		}
	})
	if (error) {
    toast.error("Erro ao utilizar este email!");
		console.log(error);
    empresa.value = "";
    password.value = "";
    email.value = "";
	} else {
    toast.info("Cadastro realizado com sucesso!");
    // router.push('/login');
		// console.log('verifique seu email', user);
    empresa.value = "";
    password.value = "";
    email.value = "";
	}
}

onMounted(() => {
  let userId = localStorage.getItem('userId');
  console.log('userId', userId);
});
</script>

<style scoped>
.footer {
  margin-top: 30px;
  font-size: 11px;
  color: #52535A;
}

/* input {
  background-color: #1C1D26;
  border: 0.2px solid #292929;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  color: #6D6D70;
} */

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
  display: grid;
}

.about img {
  -webkit-mask-image: linear-gradient(to top, transparent 1%, black 30%);
  mask-image: linear-gradient(to top, transparent 1%, black 30%);
}

.footer {
  bottom: 0;
  padding: 25px;
  font-size: 11px;
  color: #f5f5f5;
}

input, select {
  background-color: #6464648c;
  /* border: 0.1px solid #e6e6e6; */
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  color: #f5f5f5;
  width: 100%;
}

input[type="email"] {
  background-color: #6464648c;
  color: #f5f5f5;
  /* border: 0.1px solid #e6e6e6; */
}

::-ms-reveal {
  filter: invert(100%);
}

.custom-placeholder::before {
  content: attr(data-placeholder);
  color: #f5f5f5;
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
