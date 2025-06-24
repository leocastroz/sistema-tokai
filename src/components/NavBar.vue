<template>
  <div id="navbar" @mouseover="isHovered = true" @mouseleave="isHovered = false">
  <!-- <div id="navbar" :style="{ background: account?.data.session.user.user_metadata.bg_color }"
    @mouseover="isHovered = true" @mouseleave="isHovered = false"> -->
    <div class="h-full flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between  border-b-[2px] h-20" style="border-bottom: 3px dashed;border-image: linear-gradient(to right, #42F8B7, #43C2F8, #EA42F8) 1;">
          <div>
            
            <img v-if="account?.data.session.user.user_metadata.base_photo == ''"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscuhvdtB4YZO11JgFkbpLCQSgFMydCLHZWQ&s" alt="logo" class="w-11 absolute ml-[15px] mt-[-22px] rounded-md" />
            <img v-else :src="account?.data.session.user.user_metadata.base_photo" alt="logo" class="w-11 absolute ml-[15px] mt-[-22px] rounded-md" />
          </div>
          <div v-show="isHovered" class="grid items-start w-full">
            <p v-if="account?.data.session.user.user_metadata.empresa" class="font-bold text-[12px] inline text-white pl-[70px] animate__animated animate__fadeIn animate__delay-0.8s uppercase"
              v-text="account?.data.session.user.user_metadata.empresa.length > 30 ? account?.data.session.user.user_metadata.empresa.substring(0, 30) + '...' : account?.data.session.user.user_metadata.empresa">
            </p>
            <p v-if="account?.data.session.user.user_metadata.cpf" class="text-gray-400 text-xs pl-[70px] animate__animated animate__fadeIn animate__delay-0.4s">
              {{ account?.data.session.user.user_metadata.cpf }}
            </p>
            <p v-else class="text-gray-400 text-xs pl-[70px] animate__animated animate__fadeIn animate__delay-0.4s">
              {{ account?.data.session.user.user_metadata.cnpj }}
            </p>
          </div>
        </div>
        <div class="flex flex-col">
          <!-- <p></p> -->
          <div v-for="(item, index) in navbarItemsForUser" :key="index" class="nav-item m-3 cursor-pointer tracking-wider" :class="{ active: activeIndex === index }"
            @click="navigate(item.to, index)">
            <div class="flex items-center py-[10px] text-start">
              <img class="ml-[15px]" :src="item.icon" alt="image" width="20" height="20">
              <!-- <i :class="item.icon" class="h-3 ml-4"></i> -->
              <p class="animate__animated animate__fadeIn animate__delay-0.4s h-4 text-[11px] ml-12 fixed"
                v-show="isHovered">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div @click="$emit('cancel')" id="finalizar"
        class="m-3 h-9 items-center flex cursor-pointer tracking-wider">
        <i class="fas fa-power-off text-sm p-2 ml-[10px]"></i>
        <span class="animate__animated animate__fadeIn animate__delay-0.5s text-[13px] text-xs font-normal"
          v-show="isHovered">Finalizar sessão</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BeakerIcon } from '@heroicons/vue/24/solid'
import navbarItems from '../mock/navbarItems.js';
import { supabase } from "../clients/supabase";
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";

let isHovered = ref(false);
const emit = defineEmits(['cancel']);
const activeIndex = ref(0);
const router = useRouter();

const navigate = (to, index) => {
  activeIndex.value = index;
  if (to) {
    router.push(to);
  }
};

// --------------- FILTRO DE MENU POR PLANO (medicinal, coach, academia, etc) ---------------
const navbarItemsForUser = computed(() => {
  return navbarItems[sessionData.type_plan] || [];
});

let sessionData = reactive({ type_plan: '' }); // --- devem ser reativos
let sessionData_plano = reactive({ data_plano: '' });  // --- devem ser reativos

const account = ref();
const getSession = async () => {
  const currentDate = new Date().toISOString();
  let { data, error } = await supabase.auth.getSession();
  account.value = await supabase.auth.getSession();
  sessionData.type_plan = data.session.user.user_metadata.type_plan;  // --- devem ser reativos
  sessionData_plano = data.session.user.user_metadata.data_plano;  // --- devem ser reativos
  // console.log('TIPO DE PLANO DO PROJETO ->', sessionData.type_plan);
  // --------------- FILTRO DE DATA PARA FINALIZAR PLANO ---------------
  if (currentDate >= sessionData_plano) {
    // console.log('bems', sessionData_plano);
  }
  else {
    // console.log('TESTE', sessionData_plano);
  }
}
getSession();
</script>

<style scoped>
#navbar {
  box-shadow: 0px 0px 1px 1px #363636;
  width: 80px;
  color: #fff;
  transition: width 0.4s;
  border-radius: 0 20px 20px 0;
  background-color: #1d1f20;
}

#navbar:hover {
  width: 270px;
}


.nav-item:hover {
  border-radius: 20px;
  background-color: #ededed28;
  color: #fff;
}

.nav-item.active {
  border-radius: 20px;
  background-image: linear-gradient(to right, #016dff 0%, #55cbff 100%);
  /* box-shadow: 0px 0px 1px 1px #00d2ff; */
  color: #fff;
}

#finalizar {
  font-size: 11px;
  border-radius: 20px;
  background-image: radial-gradient(circle farthest-corner at 10% 20%, #ed0320de 20.8%, #f27901d6 74.4%);
}
</style>
