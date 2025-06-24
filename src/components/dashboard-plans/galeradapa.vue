<template>
  <div class="mt-5">
    <div class="mt-5 grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8">
      <div class="cardin flex rounded-lg drop-shadow-lg">
        <div class="flex items-center justify-around w-full m-5">
          <p
            class="text-[25px] text-white font-bold p-4 py-1 rounded-full border-solid border-[1px] border-gray-700">
            {{ professores.length }}
          </p>
          <div>
            <p class="font-bold text-[13px] text-white">CLIENTES CADASTRADOS</p>
            <p class="text-xs text-gray-400">cadastros realizados</p>
          </div>
        </div>
      </div>
      <div class="cardin flex rounded-lg drop-shadow-lg">
        <div class="flex items-center justify-around w-full m-5">
          <p
            class="text-[25px] text-white font-bold p-4 py-1 rounded-full border-solid border-[1px] border-gray-700">
            {{ activeProfessorsCount }}
          </p>
          <div>
            <p class="font-bold text-[13px] text-white">CLIENTES ATIVOS</p>
            <p class="text-xs text-gray-400">clientes ativos no banco</p>
          </div>
        </div>
      </div>
      <div class="cardin flex rounded-lg drop-shadow-lg">
        <div class="flex items-center justify-around w-full m-5">
          <p
            class="text-[25px] text-white font-bold p-4 py-1 rounded-full border-solid border-[1px] border-gray-700">
            {{ inactiveProfessorsCount }}
          </p>
          <div>
            <p class="font-bold text-[13px] text-white">CLIENTES INATIVOS</p>
            <p class="text-xs text-gray-400">clientes inativos no banco</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8">
      <div class="cardin flex rounded-lg drop-shadow-lg">
        <div class="flex items-center justify-around w-full m-5">
          <p
            class="text-[25px] text-white font-bold p-4 py-1 rounded-full border-solid border-[1px] border-gray-700">
            {{ produtos.length }}
          </p>
          <div>
            <p class="font-bold text-[13px] text-white">PRODUTOS CADASTRADOS</p>
            <p class="text-xs text-gray-400">cadastros realizados</p>
          </div>
        </div>
      </div>
      <div class="cardin flex rounded-lg drop-shadow-lg">
        <div class="flex items-center justify-around w-full m-5">
          <p
            class="text-[25px] text-white font-bold p-4 py-1 rounded-full border-solid border-[1px] border-gray-700">
            {{ activeProductsCount }}
          </p>
          <div>
            <p class="font-bold text-[13px] text-white">PRODUTOS ATIVOS</p>
            <p class="text-xs text-gray-400">produtos ativos no banco</p>
          </div>
        </div>
      </div>
      <div class="cardin flex rounded-lg drop-shadow-lg">
        <div class="flex items-center justify-around w-full m-5">
          <p
            class="text-[25px] text-white font-bold p-4 py-1 rounded-full border-solid border-[1px] border-gray-700">
            {{ inactiveProductsCount }}
          </p>
          <div>
            <p class="font-bold text-[13px] text-white">PRODUTOS INATIVOS</p>
            <p class="text-xs text-gray-400">produtos inativos no banco</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-10 p-10 rounded-xl text-white drop-shadow-lg text-justify" style="border-radius: 20px;
    background-image: linear-gradient(to right, #016dff 0%, #55cbff 100%);"
      v-if="true"><img src="/img/confete.gif" alt="confete" width="50">
      <b>Bem-vindo</b> ao sistema de gerenciamento Tokai. Aqui você pode gerenciar seus dados de forma rápida e
      segura.
      <br><br>
      Atualmente, estamos passando por uma atualização de sistema, por isso, algumas funcionalidades podem estar
      indisponíveis ou com uso limitado. Pedimos encarecidamente desculpas aos nosso usuários e agradeçemos a
      compreensão.
      <br><br>
      Sobre o ocorrido: "temos uma nova funcionalidade para cadastro de produtos e serviços, que está em modo MVP. Ainda
      estamos trabalhando para melhorar a experiência do usuário e aprimorar a usabilidade".
      <br><br>
      <div class="flex justify-between">
        <div class="flex items-center opacity-50">
          <i class="fa-solid fa-bolt"></i>
          <p class="px-2 text-xs">nota de atualização v0.1.1</p>
        </div>
        <div class="flex items-center bg-gray-100 px-3 py-2 text-xs rounded-md text-gray-400  hover:bg-black hover:text-white cursor-pointer drop-shadow-lg">
          <i class="fa-solid fa-bug px-1"></i>
          <p class="text-xs">reportar problema</p>
        </div>
      </div>
    </div>


    <div class="mt-10 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4" v-if="false">
      <div>
        <chart class="col-span-2" />
      </div>
      <div>
        p
      </div>
      <div class="rounded bg-gray-50 border-solid border-[1px] border-gray-200 drop-shadow-lg h-[500px]">
        Ações rápidas
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCliente } from '@/service/galeradapa263/clientesGaleraDaPa263Service.js';
import { getProfessor } from '@/service/galeradapa263/produtosGaleraDaPa263Service.js';
import { ref, onMounted, computed, reactive } from 'vue';
import { supabase } from '@/clients/supabase';
import chart from '@/components/chart.vue';


async function getUserId() {
  let { data, error } = await supabase.auth.getSession();
  return data.session.user.id
}

onMounted(async () => {
  fetchProfessor();
  fetchProdutos();
});


const professores = ref([]);

async function fetchProfessor() {
  try {
    let user_id = await getUserId()
    const data = await getCliente(user_id);
    professores.value = data;
  } catch (error) {
    console.log(error)
    // isLoading.value = false;
  }
}

const produtos = ref([]);

async function fetchProdutos() {
  try {
    let user_id = await getUserId()
    const data = await getProfessor(user_id);
    produtos.value = data;
    // console.log('ASDASD', data);
  } catch (error) {
    console.log(error)
    // isLoading.value = false;
  }
}

const activeProfessorsCount = computed(() => {
  return professores.value.filter(professor => professor.status).length;
});

const inactiveProfessorsCount = computed(() => {
  return professores.value.filter(professor => !professor.status).length;
});

const activeProductsCount = computed(() => {
  return produtos.value.filter(produtos => produtos.status).length;
});

const inactiveProductsCount = computed(() => {
  return produtos.value.filter(produtos => !produtos.status).length;
});


let sessionData_plano = reactive({ data_plano: '' });
const account = ref();
const getSession = async () => {
  const currentDate = new Date().toISOString();
  let { data, error } = await supabase.auth.getSession();
  account.value = await supabase.auth.getSession();
  sessionData_plano = data.session.user.user_metadata.data_plano;

  console.log(sessionData_plano)
  if (currentDate >= sessionData_plano) {
    console.log('igual')
  }
  else {
    console.log('TESTE')
  }
}
getSession();
</script>
<style scoped>
.cardin {
  box-shadow: 0px 0px 1px 1px #363636;
  background-color: #1d1f20;
}
</style>