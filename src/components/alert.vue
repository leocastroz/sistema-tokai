<!-- TEMPO DE EXPIRAÇÃO -->
<template>
  <div
    class="absolute flex items-center justify-between right-10 bottom-5 w-14 h-14 py-2 overflow-hidden px-4 bg-green-400 transition-all border-solid border-[1px] border-gray-200 drop-shadow-md duration-500 ease-out hover:w-80 cursor-pointer rounded-full hover:opacity-100 text-green-800"
    @mouseover="showText = true" @mouseleave="showText = false">
    <div class="opacity-50">
      <div v-show="showText" class="text-[13px] transition-all duration-700 ease-out">Seu plano expira dia {{
        formatDate(account?.data.session.user.user_metadata.data_plano) }} <a href=""
          class="text-black hover:bg-black hover:text-white underline underline-offset-2">contratar plano</a></div>
    </div>
    <i class="fa-solid fa-bell fa-beat mr-[2px] text-[18px]"></i>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from "@/clients/supabase";

let showText = ref(false);


// console.log('PEGANDO DADOS', account)


const account = ref();
const getSession = async () => {
  const currentDate = new Date().toISOString();
  let { data, error } = await supabase.auth.getSession();
  account.value = await supabase.auth.getSession();
  // sessionData.type_plan = data.session.user.user_metadata.type_plan;  // --- devem ser reativos
  // sessionData_plano = data.session.user.user_metadata.data_plano;  // --- devem ser reativos

  // --------------- FILTRO DE DATA PARA FINALIZAR PLANO ---------------
  // if (currentDate >= sessionData_plano) {
  //   console.log('igual')
  // }
  // else {
  //   console.log('TESTE')
  // }
}
getSession();

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('pt-BR', options);
};
</script>