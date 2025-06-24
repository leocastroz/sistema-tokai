<template>
  <div v-if="lateralModal"
    class="bg-black text-white aboslute absolute top-16 right-12 w-64 rounded-md z-40 animate__animated animate__fadeIn">
    <img src="/img/profile.svg" class="mx-2" alt="logo" width="60" />
    Email - {{ account?.data.session.user.email }} <br />
    Role - {{ account?.data.session.user.user_metadata.type_plan }}<br />
    Plano - {{ account?.data.session.user.user_metadata.plano }}<br />
    <router-link to="/configuracoes" class="text-white" @click="() => (lateralModal = false)">Configuração</router-link>
  </div>

  <div v-if="modal"
    class="fixed w-screen bg-gray-900 bg-opacity-80 h-screen z-40 animate__animated animate__fadeIn flex items-center justify-center">
    <div class="bg-gradient-to-b from-green-400 to-green-900 w-96 grid p-3 rounded-md">
      <div class="flex justify-end w-full">
        <p @click="close" class="text-green-900 text-xl items-end cursor-pointer">
          <i class="fa-solid fa-circle-xmark"></i>
        </p>
      </div>
      <input v-model="empresaNome" type="text" placeholder="Nome empresa"
        class="bg-white mt-4 p-2 text-gray-400 rounded border-solid border-[1px] border-gray-200 w-full" />
      <input v-model="CpfCnpj" type="text" placeholder="CPF | CNPJ"
        class="bg-white mt-4 p-2 text-gray-400 rounded border-solid border-[1px] border-gray-200 w-full" />
      <input v-model="suaSenha" type="text" placeholder="Nova senha"
        class="bg-white mt-4 p-2 text-gray-400 rounded border-solid border-[1px] border-gray-200 w-full" />
      <div class="grid gap-3 my-5">
        <label class="bg-[#727c85] text-white p-2 rounded-md">
          <input type="radio" value="radial-gradient(circle at 10% 20%,#525252 0%,#000 90.1%)" v-model="bgColor"
            :checked="selectedColor ===
              'radial-gradient(circle at 10% 20%,#525252 0%,#000 90.1%)'
              " />
          Padrão
        </label>
        <label class="bg-[#000] text-white p-2 rounded-md">
          <input type="radio" value="radial-gradient(circle at 10% 20%,#000 0%,#000 90.1%)" v-model="bgColor" :checked="selectedColor ===
            'radial-gradient(circle at 10% 20%,#000 0%,#000 90.1%)'
            " />
          Azul
        </label>
        <label class="bg-[#8981ff] text-white p-2 rounded-md">
          <input type="radio" value="radial-gradient(circle at 10% 20%,#362daf 0%,#8981ff 90.1%);" v-model="bgColor"
            :checked="selectedColor ===
              'radial-gradient(circle at 10% 20%,#362daf 0%,#8981ff 90.1%);'
              " />
          Roxo
        </label>
      </div>

      <button @click="confirmModal = true"
        class="my-5 p-3 bg-green-400 text-white rounded-full w-full cursor-pointer hover:bg-green-500">
        Atualizar dados
      </button>
    </div>

    <div v-if="confirmModal"
      class="fixed w-screen bg-gray-900 bg-opacity-70 h-screen z-40 animate__animated animate__fadeInRight flex items-center justify-center">
      <div class="bg-gray-300 w-45 grid p-3 rounded-md">
        <p class="text-center font-bold text-[14px] my-2 uppercase">
          Tem certeza de que deseja atualizar os dados?
        </p>
        <p class="text-center text-[13px] my-2 w-64 mx-auto">
          ao confirmar, será finalizada sua sessão para alterar seus dados.
        </p>
        <div class="flex justify-evenly my-4">
          <button @click="updateFirstName"
            class="text-xs py-2 px-4 bg-gray-400 text-gray-500 rounded-full cursor-pointer hover:bg-gray-400 hover:text-gray-300">
            Confirmar
          </button>
          <button @click="confirmModal = false"
            class="text-xs py-2 px-4 bg-gray-400 text-gray-500 rounded-full cursor-pointer hover:bg-gray-400 hover:text-gray-300">
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <div v-if="modalReset"
      class="fixed w-screen bg-gray-900 bg-opacity-70 h-screen z-40 animate__animated animate__fadeInRight flex items-center justify-center">
      <div class="bg-gray-300 w-45 grid p-3 rounded-md">
        <p class="text-center font-bold text-[14px] my-2 uppercase">
          finalizando sessão !
        </p>
        <p class="text-center text-[13px] my-2 w-64 mx-auto">
          aguarde <i class="fa-solid fa-spinner fa-spin-pulse"></i>
        </p>
        <img src="" alt="" />
      </div>
    </div>
  </div>

  <div id="min-content" class="about animate__animated animate__fadeIn">
    <NavBar :setActiveIndex="setActiveIndex" @navigate="navigateTo" @cancel="modalTeste" />

    <div v-if="testeMoldaLeonardo"
      class="absolute w-full overflow-y-hidden overflow-x-hidden h-full bg-black bg-opacity-50 z-40 flex items-center justify-center animate__animated animate__fadeIn">
      <div class="bg-[#161b22] rounded-lg drop-shadow-lg w-1/4 grid border-[1px] border-gray-400">
        <div class="flex items-center justify-between px-3">
          <p class="text-center text-[13px] my-3 text-white">
            Finalizando sessão
          </p>
          <i @click="falseTeste"
            class="fa-solid fa-xmark cursor-pointer text-gray-400 hover:text-red-400 p-1 rounded"></i>
        </div>
        <p class="px-3 text-gray-500 text-[13px] py-4">
          Finalizando sua sessão, você perderá o acesso e será nescessário uma
          nova autenticação.
        </p>
        <div class="flex my-2 items-center justify-center gap-5">
          <p class="text-center text-[13px] my-2 py-[3px] px-4 rounded bg-red-500 text-red-100 cursor-pointer"
            @click="falseTeste">
            cancelar
          </p>
          <p class="text-center text-[13px] my-2 py-[3px] px-4 rounded bg-green-400 text-slate-800 cursor-pointer"
            @click="logout">
            confirmar
          </p>
        </div>
      </div>
    </div>
    <div class="but">
      <!-- <div v-if="topBar" class="base-top about animate__animated animate__fadeInDown">
        <p><i class="fa-regular fa-calendar-days" style="margin-right: 5px;"></i> {{ currentDate }}</p>
        <p>© 2024. Todos os direitos reservados à Tokai LTDA.</p>
        <div class="flex items-center mr-1">
          <div class="flex items-center cursor-pointer h-[5vh] bg-gray-800 px-4 mr-5 " @click="openLateral">
            <p
              class="text-[10px] text-white font-extrabold uppercase text-ellipsis overflow-hidden truncate  tw-whitespace-nowrap w-40">
              {{ account?.data.session.user.user_metadata.empresa }}</p>
            <img src="/img/profile.svg" class="mx-2 rounded-md" alt="logo" width="35">
            <i class="fa-solid fa-chevron-down text-white"></i>
          </div>
          <p class="cursor-pointer" @click="openModal"><i class="fa-solid fa-gear"></i></p>
        </div>
      </div> -->
      <!-- <p class="cursor-pointer" @click="openModal"><i class="fa-solid fa-gear"></i></p> -->
      <div class="px-16">
        <div class="text-white py-2 gap-8 mb-10 flex">
          <div class="plano shadow-md flex items-center px-5">
            <div class="pr-2">
              <img :class="[`ativo${account?.data?.session?.user?.user_metadata?.type_plan}`]" :src="account?.data?.session?.user?.user_metadata?.type_plan === 'essencial'
                ? DiamondGreen
                : account?.data?.session?.user?.user_metadata?.type_plan === 'enterprise'
                  ? DiamondBlue
                  : account?.data?.session?.user?.user_metadata?.type_plan === 'posto' || 'frentista'
                    ? DiamondBlue
                    : account?.data?.session?.user?.user_metadata?.type_plan === 'premium'
                      ? DiamondPurple
                      : ''
                " width="40" />
              <!-- <img
                class="icon-plano"
                src="../../assets/diamond-purple.png"
                alt="diamante"
                width="40"
              /> -->
            </div>
            <div class="flex justify-between w-full mx-2">
              <h1 class="text-md font-bold">
                Plano
                <span style="text-transform: uppercase"
                  :class="[`letter${account?.data.session.user.user_metadata.type_plan}`]">{{
                    account?.data.session.user.user_metadata.type_plan
                  }}</span>
              </h1>
              <p class="text-[13px] text-gray-400">
                limites são aplicados para seu plano atual
                <!-- <pre>{{ account }}</pre> -->
                <span :class="[`letter${account?.data?.session?.user?.user_metadata?.type_plan}`]">{{
                  account?.data.session.user.user_metadata.type_plan
                }}</span>
              </p>
            </div>
          </div>
          <div class="perfil p-4 text-start shadow-md flex items-center cursor-pointer"
            @click="$router.push('/configuracoes')">
            <div class="pr-2">
              <!-- <pre>{{ account }}</pre> -->
              <img v-if="account?.data.session.user.user_metadata.base_photo == ''" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscuhvdtB4YZO11JgFkbpLCQSgFMydCLHZWQ&s" alt="logo" width="40" class="rounded-md" />
              <img v-else :src="account?.data.session.user.user_metadata.base_photo" alt="logo" width="40" class="rounded-md" />
            </div>
            <div class="pl-2">
              <h1 class="text-md font-bold">Seu perfil</h1>
              <p class="text-[13px] text-gray-400 uppercase">
                {{ account?.data?.session?.user?.user_metadata?.empresa }}
              </p>
            </div>
          </div>
          <!-- <div class="hamburger" @click="toggleMenu">
            <i class="fa-solid fa-bell"></i>
          </div> -->
        </div>

        <pre v-for="list in listCompras" style="color: #fff;">
          <p>TEST {{ list }}</p>
        </pre>

        <div v-if="validPagamento" class="modal-pagamento">
          Ainda bloqueado, aguarde o pagamento ser confirmado
          Ja fez o pagamento, clique aqui para confirmar
          <a :href="payurl" target="_blank" style="background-color: red;">Clique aqui</a>
          <button @click="logout">recarregar</button>
        </div>

        <div v-if="isMenuOpen" @click="isMenuOpen = false;"
          style="background-color: #0000007d;width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;z-index: 9;transition: transform 0.5s ease-in-out;">
          <transition name="menu-slide">
            <div v-if="isMenuOpen" class="menu">
              <div class="links-menu">
                <div style="color: red;">
                  Notificacoes
                  <!-- <a href="https://www.instagram.com/tokai_motos/?utm_source=ig_web_button_share_sheet"><i class="fab fa-instagram"></i> Instagram</a>
                      <a href="https://api.whatsapp.com/send?phone=559481393411&text=Olá Tokai Motos, preciso de suporte" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp</a> -->
                </div>
                <i @click="toggleMenu = false;" class="fas fa-times" style="color:#000;cursor:pointer;"></i>
              </div>
              <RouterLink @click="toggleMenu" to="/">Home</RouterLink>
              <RouterLink @click="toggleMenu" to="/lancamentos">Lançamentos</RouterLink>
              <RouterLink @click="toggleMenu" to="/aditivos">Aditivos</RouterLink>
              <RouterLink @click="toggleMenu" to="/oleos">Óleos</RouterLink>
              <RouterLink @click="toggleMenu" to="/suspensao">Suspensão</RouterLink>
              <RouterLink @click="toggleMenu" to="/motor">Motor</RouterLink>
              <RouterLink @click="toggleMenu" to="/pneus">Pneus</RouterLink>
              <RouterLink @click="toggleMenu" to="/transmissoes">Transmissões</RouterLink>
              <RouterLink @click="toggleMenu" to="/rodas">Rodas</RouterLink>
              <RouterLink @click="toggleMenu" to="/freios">Freios</RouterLink>
              <RouterLink @click="toggleMenu" to="/eletrica">Baterias</RouterLink>
              <RouterLink @click="toggleMenu" to="/acessorios">Carenagens</RouterLink>
              <RouterLink @click="toggleMenu" to="/meus-pedidos"><i class="fas fa-shopping-cart"></i> Meus pedidos
              </RouterLink>
            </div>
          </transition>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { listPaymentsStatus, createPixCharge, checkPaymentStatus } from "../../service/postorota/abacatepayPostoRotaService.js";
import { getLista, addItemLista, apiAbacate, editItemLista } from '../../service/postorota/pagamentosPostoRotaService.js';
import Swal from 'sweetalert2';
import DiamondBlue from '@/assets/diamond-blue.png'
import DiamondGreen from '@/assets/diamond-green.png'
import DiamondPurple from '@/assets/diamond-purple.png'
import { Toaster, toast } from "@steveyuowo/vue-hot-toast";
import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";
// import { useToast } from "vue-toastification";
import { supabase } from "@/clients/supabase";
import NavBar from "@/components/NavBar.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { id } from "date-fns/locale";

// const toast = useToast();

let userMeta = localStorage.getItem("userMeta");
let userId = localStorage.getItem("userId");
let userCpfCnpj = localStorage.getItem("userCpfCnpj");
let userEmpresa = localStorage.getItem("userEmpresa");
let userDataPlano = localStorage.getItem("userDataPlano");
let selectedColor = ref(userMeta);
let empresaNome = ref("");
let suaSenha = ref("");
let CpfCnpj = ref("");
let bgColor = ref("");


const userCompare = ref("");
const listCompras = ref([]);
const validPagamento = ref(false);

const getUseraba = localStorage.getItem("userAbacate");
userCompare.value = getUseraba;

async function addItemCompra(amount, produto_id, externalId, quantity, custormerName, custormerCellphone, custormerTaxId, custormerEmail) {
  const newEmployeeData = {
    paid_amount: amount,
    status: 'pago',
    user_abacate_id: userCompare.value,
    methods: 'pix',
    data_pagamento: '',
    url: 'https://www.google.com',
    products_id: produto_id,
    products_external_id: externalId,
    quantity: quantity,
    customer_name: custormerName,
    customer_cellphone: custormerCellphone,
    customer_cpf: custormerTaxId,
    customer_email: custormerEmail
  };
  const response = await addItemLista(newEmployeeData);
  console.log('response', response);
}

async function criandoProduto() {
  let externalId = userCompare.value;
  let amount = 300;
  const data = await createPixCharge(amount, externalId);
}

const payurl = ref("");

const dataNextPay = ref("");

async function VerificarPagamento() {
  console.log('VERIFICANDO PAGAMENTO');
  const postoRotaPagamentos = await getLista();

  const userLog = await supabase.auth.getSession();
  let proximoPagamento = userLog.data.session.user.id;
  const dooness = await supabase.auth.admin.getUserById(proximoPagamento);

  const idUser = userLog.data.session.user.id;

  const { data, error } = await apiAbacate();
  const listData = data;
  console.log('LISTA DE PAAGAMENTO ABACATE', listData);

  const VerificarPagamentoAbacate = listData.filter(item =>
      item.products.some(product =>
        product.externalId == userCompare.value)
    );

  const totalItemsPagos = VerificarPagamentoAbacate.filter(item =>
    item.status === "PAID"
  );

  if (totalItemsPagos.length > postoRotaPagamentos.length) {
    const ultimoItemGerado = VerificarPagamentoAbacate.slice().find(item =>
      item.status === "PAID"
    );

    let amount = ultimoItemGerado.amount;
    let produto_id = ultimoItemGerado.products[0].id;
    let externalId = ultimoItemGerado.products[0].externalId;
    let quantity = ultimoItemGerado.products[0].quantity;
    let custormerName = ultimoItemGerado.customer.metadata.name;
    let custormerCellphone = ultimoItemGerado.customer.metadata.cellphone;
    let custormerTaxId = ultimoItemGerado.customer.metadata.taxId;
    let custormerEmail = ultimoItemGerado.customer.metadata.email;
    addItemCompra(amount, produto_id, externalId, quantity, custormerName, custormerCellphone, custormerTaxId, custormerEmail);

    const novaData = new Date();
    novaData.setMinutes(novaData.getMinutes() + 2); // Adiciona 3 minutos
    novaData.setHours(novaData.getHours() - 3); // Ajusta para GMT-3 horas

    const { data, error } = await supabase.auth.admin.updateUserById(idUser, {
      user_metadata: {
        proximo_pagamento: novaData.toISOString(),
      }
    });

    dataNextPay.value = data.user.user_metadata.proximo_pagamento;
    console.log('ATUALIZANDO DATA DO PROXIMO PAGAMENTO -->', dataNextPay.value);
    // localStorage.setItem("proximoPagamento", dataNextPay.value);

  } else if (totalItemsPagos.length == postoRotaPagamentos.length) {
    console.log('TODOS OS ITENS FORAM PAGOS');
    getListaCompras();
  }
}

async function getListaCompras() {
  try {
    const { data, error } = await listPaymentsStatus();
    const listData = data;

    // Verifico se no abacatepay tem algum pagamento pendente
    const VerificarPagamentoAbacate = listData.filter(item =>
      item.products.some(product =>
        product.externalId == userCompare.value)
    );

    const hasPendingStatus = VerificarPagamentoAbacate.some(item =>
      item.status === "PENDING"
    );

    console.log('HAS PENDING STATUS -->', hasPendingStatus);


    if (hasPendingStatus) {
      // console.log('TEM PENDENCIA NO ABACATEPAY');

      const itemPending = VerificarPagamentoAbacate.filter(item =>
        item.status === "PENDING"
      );

      console.log('ITEM COM PENDENCIA DE PAGAMENTO -->', itemPending);

      if (itemPending.length > 0) {
        payurl.value = itemPending[0].url;
        validPagamento.value = true;
        console.log('URL DO PAGAMENTO -->', payurl.value);
      }


    } else {
      console.log('NÃO TEM PENDENCIA NO ABACATEPAY');
      //  ###############################
      const now = new Date();
      now.setHours(now.getHours() - 3);
      const horaAtual = now.toISOString();

      const newlOG = await supabase.auth.getSession();
      let getts = newlOG.data.session.user.id;
      const dataSive = await supabase.auth.admin.getUserById(getts);

      let olimpus = dataSive.data.user.user_metadata.proximo_pagamento;

      console.log('DATA DO PROXIMO PAGAMENTO -->', olimpus);
      if (horaAtual > olimpus) {
        console.log('DATA ATUAL E MAIOR QUE O PROXIMO PAGAMENTO', olimpus);
        criandoProduto();
      } else {
        console.log("PAGAMENTO 100%");
        validPagamento.value = false;
      }
    }
  } catch (error) {
    console.log(error)
  }
}


const isMenuOpen = ref(false);

// Função para alternar o menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Erro ao finalizar sessão!");
    console.log(error);
  } else {
    toast.success("Sessão finalizada com sucesso!");
    router.push("/");
    localStorage.clear();
    console.log("Sign out success");
  }
};

// const getUsers = async () => {
//   const {
//     data: { users },
//     error,
//   } = await supabase.auth.admin.listUsers();
//   console.log("usuários", users);
//   return users;
// };

// console.log(getUsers());

const updateFirstName = async () => {
  try {
    let updateData = {};

    if (empresaNome.value) {
      updateData.empresa = empresaNome.value;
    }
    if (CpfCnpj.value) {
      updateData.cpf_cnpj = CpfCnpj.value;
    }
    if (suaSenha.value) {
      updateData.password = suaSenha.value;
    }
    if (bgColor.value) {
      updateData.bg_color = bgColor.value;
    }
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      ...updateData,
      user_metadata: updateData,
    });
    modalReset.value = true;
    confirmModal.value = false;
    if (error) {
      toast.error("Erro ao finalizar sessão!");
      console.error("Error updating first name:", error);
    } else {
      console.log("First name updated successfully:", data);
      setTimeout(() => {
        logout();
        router.push("/login");
      }, 1200);
    }
  } catch (error) {
    console.error("Error updating first name:", error);
  }
};
const testeMoldaLeonardo = ref(false);
const modalReset = ref(false);
const confirmModal = ref(false);
const modal = ref(false);
const topBar = ref(true);
const router = useRouter();
const activeIndex = ref(0);
const currentDate = ref(new Date().toLocaleDateString());
const setActiveIndex = (index) => {
  activeIndex.value = index;
};

const lateralModal = ref(false);

const close = () => {
  modal.value = false;
  topBar.value = true;
};

const openLateral = () => {
  lateralModal.value = !lateralModal.value;
};

const openModal = () => {
  modal.value = true;
  topBar.value = false;
};

const falseTeste = () => {
  testeMoldaLeonardo.value = false;
  topBar.value = true;
};

const modalTeste = () => {
  Swal.fire({
    title: "Finalizar sessão!",
    text: "Gostaria de finalizar sua sessão?",
    // icon: "warning",
    // imageUrl: "../../../public/img/trash.png",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, finalizar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
    }
  });
};

const navigateTo = (to) => {
  router.push({ path: to });
};







onMounted(() => {
  // getClientData();
  setTimeout(() => {
    VerificarPagamento();
  }, 1000);

  // Configura um intervalo para chamar a função VerificarPagamento a cada 30 segundos
  
  // setInterval(() => {
  //   VerificarPagamento();
  // }, 30000);

  // VerificarPagamento();
  // getListaCompras();
  // getSession();

});

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
.modal-pagamento {
  background-color: #6a8949b8;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  transition: transform 0.5s ease-in-out;
}

.plano {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px #363636;
  background-color: #1d1f20;
}

.perfil {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px #363636;
  background-color: #1d1f20;
}

.perfil:hover {
  border-radius: 10px;
  background-color: #1d1f2000;
}

.base-top {
  font-size: 11px;
  color: #ffffff;
  background-color: #0a1b14;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 5vh;
}

#min-content {
  height: 100vh;
  display: flex;
}

#min-content .but {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.letteressencial {
  color: #00ff00;
}

.letterelementar {
  color: #6aceff;
}

.letterpremium {
  color: #d815ff;
}

.ativoessencial {
  filter: drop-shadow(0 0 30px #00ff00);
  animation: rotation 30s infinite linear;
}

.ativoelementar {
  filter: drop-shadow(0 0 30px #0000ff);
  animation: rotation 30s infinite linear;
}

.ativopremium {
  filter: drop-shadow(0 0 30px #d815ff);
  animation: rotation 30s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}


.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.5s ease;
}

.menu-slide-enter {
  transform: translateX(30%);
  /* Começa mais próximo para uma transição suave */
}

.menu-slide-leave-to {
  transform: translateX(100%);
  /* Transição de saída para a esquerda está mantida */
}

.links-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 1rem 0rem;
  border-bottom: 1px solid #0f0f1738;
}

.menu {
  box-shadow: 0px 0px 1px 1px #363636;
  background-color: #1d1f20 !important;
  height: -webkit-fill-available;
  z-index: 9;
  flex-direction: column;
  border-radius: 5px;
  position: fixed;
  display: flex;
  width: 20%;
  top: 0;
  right: 0;
  animation: fadeInRight 0.5s;
  border-left: 3px dashed;
  border-image: linear-gradient(to top, rgb(66, 248, 183), rgb(67, 194, 248), rgb(234, 66, 248)) 1 / 1 / 0 stretch;
}


.menu a {
  padding: 15px;
  text-decoration: none;
  color: #ffffff;
}
</style>
