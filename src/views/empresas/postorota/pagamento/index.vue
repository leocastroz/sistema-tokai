<template>
  <div class="animate__animated animate__fadeInLeft">
    <button @click="generatePayment" class="text-white">Gerar Cobrança</button>
    <div v-if="pixData" class="text-white">
      <img :src="pixData.pix_qrcode" alt="QR Code PIX" />
      <p>Código PIX: {{ pixData.pix_code }}</p>
    </div>
    <br>
    <div v-for="payment in listPayments" class="text-white grid gap-3 mt-10">
      <pre>Status: {{ payment.status }}</pre>
      <pre>Quantia (valor): {{ payment.amount }}</pre>
      <pre>createdAt: {{ payment.createdAt }}</pre>
    </div>

    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme"  />
    </Notivue>
  </div>
</template>

<script setup>
import { supabase } from '@/clients/supabase';
// import { createPixCharge, checkPaymentStatus, listPaymentsStatus } from '@/service/postorota/pagamentosPostoRotaService.js';
import { Notivue, Notification, pastelTheme, push } from 'notivue';
import { ref, onMounted } from 'vue';

const pixData = ref(null);
let listPayments = ref([]);
const paymentStatus = ref(null);
let statusCheckInterval = null;


async function getUserId() {
  let { data, error } = await supabase.auth.getSession();
  return data.session.user.id;
}


const getPaymentsStatus = async () => {
  try {
    const list = await listPaymentsStatus();
    listPayments.value = list.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

const generatePayment = async () => {
  try {
    const userId = await getUserId();
    const amount = 100; // Valor em centavos (R$1,00)
    // const status = 'pending';
    // const due_date = new Date().toISOString();
    
    const response = await createPixCharge(userId, amount);
    console.log('RESPONSE DO GERADOR PIX ->:', response);
    // const resonseSupa = await pagamentosTabela(userId, amount, status, due_date);
    // console.log('responseSupa:', resonseSupa);
    
    if (response) {
      pixData.value = response;
      // Verificar status do pagamento após gerar o PIX
      statusCheckInterval = setInterval(async () => {
        listPaymentsStatus();
        // const list = await listPaymentsStatus()
        // listPayments.value = list;
        // console.log('Lista de pagamentos:', list.data);
        const status = await checkPaymentStatus(response.data.id);
        paymentStatus.value = status;
        console.log('Status do pagamento:', status);
        if (status.status === 'paid') {
          clearInterval(statusCheckInterval);
          push.success("Pagamento confirmado!");
        }
      }, 5000); // Verifica a cada 5 segundos
    }
  } catch (error) {
    push.error("Erro ao gerar cobrança!");
    console.error("Error:", error.message);
  }
};

onMounted(async () => {
  getPaymentsStatus();
});
</script>