<template>
  <div class="animate__animated animate__fadeInLeft">
    <p class="text-xl font-extrabold text-white">CARTEIRA</p>
    <!-- <pre>{{ carteira }}</pre> -->
    <div >
      <input type="text" v-model="formattedCarteiraTotal" class="bg-red-300">
      <button @click="addNewCarteira" v-if="!hasCarteira" class="animate__animated animate__fadeInLeft animate__delay-1s text-white">concluir</button>

      <button v-else @click="deleteCarteiraById(carteira)" class="text-white animate__animated animate__fadeInLeft animate__delay-1s">deletar</button>
    </div>
    <div class="text-white">
      SALDO CARTEIRA - {{ formattedCarteira }}
    </div>
  </div>
</template>

<script setup>
import { supabase } from '@/clients/supabase';
import { addCarteira, getCarteira, deleteCarteira} from '@/service/postorota/carteiraPostoRotaService.js';
import { useToast } from "vue-toastification";
import { ref, computed, onMounted } from 'vue';

const toast = useToast();
const carteira = ref([]);
const newCarteira = ref({
  carteiraTotal: "",
});

const hasCarteira = computed(() => {
  return carteira.value.length >= 1;
});

const formattedCarteiraTotal = computed({
  get: () => {
    return newCarteira.value.carteiraTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  },
  set: (newValue) => {
    newCarteira.value.carteiraTotal = parseFloat(newValue.replace(/\D/g, '')) / 100;
  }
});

const formattedCarteira = computed(() => {
  return carteira.value[0]?.carteiraTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

// ----------------------------------------------------
async function getUserId() {
  let {data, error} = await supabase.auth.getSession();
  return data.session.user.id
}
// ----------------------------------------------------


async function fetchCarteira() {
  try {
    let user_id = await getUserId()
    const data = await getCarteira(user_id);
    carteira.value = data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteCarteiraById(carteira) {
  console.log('id', carteira[0]);
  const id = carteira[0].user_id;
  try {
    await deleteCarteira(id);
    fetchCarteira();
    toast.success("Sucesso ao deletar!");
  } catch (error) {
    toast.error("Erro ao deletar!");
    console.error("Error:", error.message);
  }
}

async function addNewCarteira() {
  try {
    let userIn = await getUserId();
    console.log('valor', newCarteira.value.carteiraTotal);

    // Oculta imediatamente usando v-show
    document.querySelector('button').style.display = 'none';

    const newEmployeeData = {
      user_id: userIn,
      carteiraTotal: newCarteira.value.carteiraTotal
    };
    fetchCarteira();
    const response = await addCarteira(newEmployeeData);
    newCarteira.value = { carteiraTotal: "" };
    toast.success("Sucesso ao adicionar!");
  } catch (error) {
    toast.error("Erro ao adicionar!");
    console.error("Error:", error.message);
  }
}
onMounted(async () => {
  fetchCarteira();
});
</script>
