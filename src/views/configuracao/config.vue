<template>
  <div class="planu grid gap-4">
    <div class="text-white">
      <input type="radio" v-model="selected" value="cpf" @change="handleSelectionChange"> CPF
      <input type="radio" v-model="selected" value="cnpj" @change="handleSelectionChange"> CNPJ

      <div v-if="selected === 'cpf'" class="w-full mt-2">
        <p class="text-[13px] py-1 text-white">SEU CPF: *</p>
        <input v-maska="'###.###.###-##'" class="bg-[#6464648c] capitalize rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 focus:outline-none w-full" v-model="cpf" type="text" placeholder="Seu CPF" />
      </div>

      <div v-if="selected === 'cnpj'" class="w-full mt-2">
        <p class="text-[13px] py-1 text-white">SEU CNPJ: *</p>
        <input v-maska="'##.###.###/####-##'" class="bg-[#6464648c] capitalize rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 focus:outline-none w-full" v-model="cnpj" type="text" placeholder="Seu CNPJ" />
      </div>
    </div>

    <div class="w-full">
      <p class="text-[13px] py-1 text-white">NOME DA EMPRESA: *</p>
      <input class="bg-[#6464648c] capitalize rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 focus:outline-none w-full" v-model="empresaNome" type="text" placeholder="Nome Empresa" />
    </div>

    <div class="w-full">
      <p class="text-[13px] py-1 text-white">SUA SENHA: *</p>
      <input class="bg-[#6464648c] capitalize rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 focus:outline-none w-full" v-model="suaSenha" type="text" placeholder="Sua Senha" />
    </div>

    <!-- <div class="w-full">
      <p class="text-[13px] py-1 text-white">SEU PERFIL: *</p>
      <input type="file" @change="handleFileUpload" accept="image/png, image/jpeg" class="bg-[#6464648c] rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 rounded px-2 py-1 text-gray-400 focus:outline-none w-full">
    </div> -->


    <button @click="confirmModal" class="bg-blue-500 rounded-full text-white my-5 p-3 text-white w-full cursor-pointer hover:bg-blue-600 hover:text-white">
      Editar meus dados
    </button>
  </div>
  <Notivue v-slot="item">
    <Notification :item="item" :theme="pastelTheme"  />
  </Notivue>
</template>

<script setup>
import { vMaska } from "maska/vue";
import { Notivue, Notification, pastelTheme, push } from 'notivue';
import { supabase } from "@/clients/supabase";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Swal from 'sweetalert2'

let userMeta = localStorage.getItem('userMeta');
let userId = localStorage.getItem('userId');
let userCpf = localStorage.getItem('userCpf');
let userCnpj = localStorage.getItem('userCnpj');
let userEmpresa = localStorage.getItem('userEmpresa');
let userBasePhoto = localStorage.getItem('userPhoto');
let selectedColor = ref(userMeta);
let empresaNome = ref('');
let suaSenha = ref('');
let cpf = ref('');
let cnpj = ref('');
let bgColor = ref('');
let basePhoto = ref('');
let selected = ref('');

onMounted(() => {
  empresaNome.value = userEmpresa;
  cpf.value = userCpf;
  cnpj.value = userCnpj;
  basePhoto.value = userBasePhoto;

  if (cnpj.value) {
    selected.value = 'cnpj';
  } else {
    selected.value = 'cpf';
  }
});

const handleSelectionChange = () => {
  if (selected.value === 'cpf') {
    cnpj.value = '';
  } else {
    cpf.value = '';
  }
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    basePhoto.value = reader.result;
  };
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    push.error("Erro ao finalizar sessão!");
    console.log(error);
  } else {
    push.success("Sessão finalizada com sucesso!");
    router.push("/");
  }
};

const updateFirstName = async () => {
  try {
    let updateData = {};
    if (empresaNome.value) updateData.empresa = empresaNome.value;
    if (cpf.value) {
      updateData.cpf = cpf.value;
      updateData.cnpj = '';
    }
    if (cnpj.value) {
      updateData.cnpj = cnpj.value;
      updateData.cpf = '';
    }
    if (suaSenha.value) updateData.password = suaSenha.value;
    // if (basePhoto.value) updateData.base_photo = basePhoto.value;
    updateData.base_photo = '';
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      ...updateData,
      user_metadata: updateData
    });

    setTimeout(() => {
      logout();
      router.push('/login');
    }, 1200);

    if (error) {
      push.error("Erro ao finalizar sessão!");
      console.error('Error updating first name:', error);
    } else {
      console.log('First name updated successfully:', data);
    }
  } catch (error) {
    console.error('Error updating first name:', error);
  }
}

const router = useRouter();
const activeIndex = ref(0);

function confirmModal() {
  Swal.fire({
    title: "Tem certeza?",
    text: "Você será deslogado para atualizar seus dados!",
    // imageUrl: "../../../public/img/trash.png",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, atualizar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      updateFirstName();
    }
  });
}
</script>

<style>
.planu {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px #363636;
  background-color: #1d1f20;
  padding: 30px;
}

input::file-selector-button {
  padding: 0.3em 0.6em;
  /* border: thin solid grey; */
  border-radius: 5px;
  background-image: linear-gradient(to right, #016dff 0%, #55cbff 100%);
  /* box-shadow: 0px 0px 1px 1px #00d2ff; */
   color: #fff;
   cursor: pointer;
}

/* .plano::file-selector-button {
  font-weight: bold;
  color: dodgerblue;
  padding: 0.5em;
  border: thin solid grey;
  border-radius: 3px;
} */
</style>