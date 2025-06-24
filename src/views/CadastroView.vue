<template>
  <div class="primary animate__animated animate__fadeInLeft">
    <div class="about">
      <h3>Sistema Tokai</h3>
      <p>Cadastrar sua conta</p>
      <div class="inputContainer">
        <input type="email" placeholder="Seu email" id="email" v-model="email" class="custom-placeholder">
      </div>
      <div class="inputContainer">
        <input type="password" placeholder="Sua senha" id="password" v-model="password">
      </div>
      <div class="inputContainer">
        <input type="empresaName" placeholder="Nome empresa" id="empresaName" v-model="empresaName">
      </div>
      <div class="inputContainer">
        <input placeholder="Numero contato" id="phone" v-model="phone" v-maska="'+55 (##) #####-####'" type="text">
      </div>
      <!-- <div class="inputContainer">
        <input type="number" placeholder="CPF | CNPJ" id="cpfCnpj" v-model="cpfCnpj">
      </div> -->
      <div>
        <input type="radio" v-model="selected" value="cpf"> Cpf
        <input type="radio" v-model="selected" value="cnpj"> Cnpj

        <input class="maska" v-maska="'###.###.###-##'" v-model="cpf" v-if="selected === 'cpf'">
        <input class="maska" v-maska="'##.###.###/####-##'" v-model="cnpj" v-if="selected === 'cnpj'">
      </div>
      <div class="inputContainer">
        <input type="typePlan" placeholder="plano" id="typePlan" v-model="typePlan">
      </div>
      <button @click="createAccount">Criar usuário</button>
      <div class="more-items">
        <RouterLink to="/login">Fazer meu Login !</RouterLink>
      </div>
      <p class="footer">© 2024 Todos os direitos reservados.</p>
    </div>
  </div>
</template>
  
<script setup>
import { vMaska } from "maska/vue";
import { supabase } from "../clients/supabase";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { ref } from "vue";

const toast = useToast();
const router = useRouter();
let empresaName = ref("");
let phone = ref("");
let password = ref("");
let email = ref("");
let cpf = ref("");
let cnpj = ref("");
const selected = ref('cpf');

async function createAccount() {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  let data_plano = currentDate.toISOString();

  // pegando hora atual com GTM -3 horas
  const now = new Date();
  now.setMinutes(now.getMinutes() + 2); // Adiciona 3 minutos
  now.setHours(now.getHours() - 3); // Ajusta para GMT-3 horas

  const { user, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        empresa: empresaName.value,
        phone: phone.value,
        cpf: cpf.value,
        cnpj: cnpj.value,
        data_plano: data_plano,
        type_plan: typePlan.value,
        base_photo: '',
        user_abacate: '',
        proximo_pagamento: now.toISOString(),
        // sequency: 0,
      }
    }
  }).then((res) => {
    // console.log('PEGANDO O ID DO SUPABASE ->', res.data.user.id);
    const userId = res.data.user.id;

    const url = '/api/v1/customer/create';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh'
      },
      body: JSON.stringify({
        name: empresaName.value,
        cellphone: phone.value,
        email: email.value,
        taxId: cpf.value
      })
    };

    fetch(url, options)
      .then(res => res.json())
      .then(async data => {
        const apiResponse = data;
        // console.log('REST CASE ->', apiResponse.data.id);
        const userAbacateId = apiResponse.data.id;

        const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: {
            user_abacate: userAbacateId
          }
        });

        if (updateError) {
          console.error('Erro ao atualizar user_abacate:', updateError);
        } else {
          console.log('user_abacate atualizado com sucesso:', updateData);
        }
      })
      .catch(err => console.error(err));
    
    // fetch(url, options)
    //   .then(res => res.json())
    //   .then(data => {
    //     const apiResponse = data;
    //     console.log('REST CASE ->', apiResponse.data.id);
    //     const userAbacateId = apiResponse.data.id;

    //     const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    //       user_metadata: {
    //         user_abacate: userAbacateId
    //       }
    //     });
    //   })
    //   .catch(err => console.error(err));

    
    empresaName.value = "";
    phone.value = "";
    password.value = "";
    email.value = "";
    cpf.value = "";
  });

  if (error) {
    toast.error("Erro ao utilizar este email!");
    console.log(error);
    empresa.value = "";
    password.value = "";
    email.value = "";
  } else {
    // toast.info("Verifique seu email!");
    router.push('/login');
    // console.log('verifique seu email', user);

    // const url = '/api/v1/customer/create';
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     accept: 'application/json',
    //     'content-type': 'application/json',
    //     authorization: 'Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh'
    //   },
    //   body: JSON.stringify({
    //     name: empresaName.value,
    //     cellphone: phone.value,
    //     email: email.value,
    //     taxId: cpf.value
    //   })
    // };
    
    // fetch(url, options)
    //   .then(res => res.json())
    //   .then(data => {
    //     const apiResponse = data;
    //     console.log('REST CASE ->', apiResponse.data.id);
    //   })
    //   .catch(err => console.error(err));

    
    // empresaName.value = "";
    // phone.value = "";
    // password.value = "";
    // email.value = "";
    // cpf.value = "";
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
  mask-image: linear-gradient(to top, transparent 1%, black 30%);
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
