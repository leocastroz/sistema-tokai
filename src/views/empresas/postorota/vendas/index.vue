<template>
  <div>
    <div class="flex justify-between items-center">
      <p class="text-xl w-full font-extrabold text-white animate__animated animate__fadeIn">POSTO ROTA - VENDAS</p>
      <!-- <div v-show="!isModalEditVisible && !isModalRegisterVisible" class="w-full flex justify-end items-center animate__animated animate__fadeIn">
        <div class="text-gray-400 text-sm flex items-center justify-between w-60 py-3 px-4 drop-shadow-lg" style="box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;border-radius:5px;" v-show="!isModalEditVisible && !isModalRegisterVisible">
          <p>STATUS -</p>
          <div class="flex items-center justify-center">
            <label class="px-1 text-xs">ativos</label>
            <input class="cursor-pointer" type="radio" value="true" v-model="selectedStatus">
          </div>
          <div class="flex items-center justify-center">
            <label class="px-1 text-xs">inativos</label>
            <input class="cursor-pointer" type="radio" value="false" v-model="selectedStatus">
          </div>
        </div>
        <button @click="toggleModalRegister" v-show="!isModalEditVisible && !isModalRegisterVisible"
          class="plano text-white font-normal py-2 px-2 flex items-center rounded-md text-[14px] drop-shadow-lg animate__animated animate__fadeIn" style="border-radius: 20px;background-image: linear-gradient(to right, #016dff 0%, #55cbff 100%);padding: 10px;margin: 0 0 0 20px;">
          <i class="fa-solid fa-circle-plus px-2"></i>
          <p>CADASTRAR VENDA</p>
        </button>
      </div> -->
    </div>

    <div v-if="false" class="w-full flex justify-start mt-10 animate__animated animate__fadeIn">
      <div
        class="text-gray-400 text-sm flex items-center justify-between w-60 py-3 px-4 drop-shadow-lg" style=" box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;border-radius:5px;"
        v-show="!isModalEditVisible && !isModalRegisterVisible">
        <p>STATUS -</p>
        <div class="flex items-center justify-center">
          <label class="px-1 text-xs">ativos</label>
          <input class="cursor-pointer" type="radio" value="true" v-model="selectedStatus">
        </div>
        <div class="flex items-center justify-center">
          <label class="px-1 text-xs">inativos</label>
          <input class="cursor-pointer" type="radio" value="false" v-model="selectedStatus">
        </div>
        <!-- <select v-model="selectedStatus" class="border text-xs rounded ml-1 py-1 px-2 cursor-pointer text-gray-400 bg-[#1d1f20] border-none">
            <option value="true">ATIVOS</option>
            <option value="false">INATIVOS</option>
      </select> -->
      </div>
    </div>

    <div v-show="modalDelete" class="text-white bg-orange-600">
      deseja excluir
      
      {{ nameModal }}
      <button @click="modalDelete = false">No</button>
    </div>

    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme"  />
    </Notivue>

    <schedule v-show="!isModalEditVisible && !isModalRegisterVisible" :tgringaRoupas="tgringaRoupas"
      :formatDate="formatDate" @delete="onDeleteModal" @edit="toggleModalEdit" @venda="toggleModalVenda" :searchQuery="searchQuery" @toggleStatus="toggleStatus" :selectedStatus="selectedStatus" />
    <!-- <schedule v-show="!isModalEditVisible && !isModalRegisterVisible" :tgringaRoupas="tgringaRoupas"
      :formatDate="formatDate" @delete="onDeleteEmployee" @edit="toggleModalEdit" :searchQuery="searchQuery"
      @toggleStatus="toggleStatus" :selectedStatus="selectedStatus" /> -->
    <register v-show="isModalRegisterVisible" :professor="newCollaborator" @register="addNewEmployee"
      @cancel="toggleModalRegister" @uploadImage="selectedImageFile = $event" />

    <edit v-show="isModalEditVisible" :professor="editedProfessor" @update="updateEmployee" @cancel="toggleModalEdit"
      @uploadImage="handleImageUpload" @deleteImage="handleImageDelete" style="position: fixed;left: 0;top: 0;width: 100vw;height: 100vh;" />

    <venda v-show="isModalVendaVisible" :professor="vendaProfessor" :addproduto="newVenda" :listvendas="listaVendas" :produtos="produtosCliente"  @update="updateVendas" @cancel="toggleModalVenda" @register="addNewProduto"
      @uploadImage="handleImageUpload" @deleteImage="handleImageDelete" style="position: fixed;left: 0;top: 0;width: 100vw;height: 100vh;" />

  </div>
</template>

<script setup>
import { Notivue, Notification, pastelTheme, push } from 'notivue'
import Swal from 'sweetalert2';
// import { deleteCliente, getVendas, postClient, putClient } from '@/service/postorota/vendasPostoRotaService.js';
import { getProfessor, editProfessor, getProdutoById } from '@/service/postorota/produtosPostoRotaService.js';
import { getVendas, postVendas, putVendas } from '@/service/postorota/vendasPostoRotaService.js';
import { ref, onMounted, onBeforeMount } from 'vue';
import { supabase } from '@/clients/supabase';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'vue-router';
import register from './register.vue';
import schedule from './schedule.vue';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import edit from './edit.vue';
import venda from './venda.vue';

const searchQuery = ref('');
const router = useRouter();
let nameModal = ref('');
let modalDelete = ref(false);

// ----------------- VALIDANDO PLANO ------------------
let userPlan = localStorage.getItem('userPlan');
onBeforeMount(() => {
  if (userPlan === 'shop' || userPlan === 'admin') {
    router.push('/dashboard');
  }
});

function onDeleteModal(professor) {
  Swal.fire({
    title: "Tem certeza?",
    text: "Você não poderá reverter isso!",
    // icon: "warning",
    imageUrl: "../../../public/img/trash.png",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      onDeleteEmployee(professor.id);
      // sendMessage();
    }
  });
}

// ----------------------------------------------------
async function getUserId() {
  let { data, error } = await supabase.auth.getSession();
  return data.session.user.id
}
// ----------------------------------------------------

async function uploadImageForProfessor(imageFile) {
  try {
    let userId = localStorage.getItem('userId');
    const { data, error } = await supabase.storage
      .from('avatar' + '/' + userId)
      .upload(uuidv4(), imageFile, {
        cacheControl: '3600',
        contentType: imageFile.type,
      });

    if (error) {
      console.error('Erro ao fazer upload:', error);
      return null;
    }

    console.log('Upload bem-sucedido!', data);
    newCollaborator.value.fileName = data.path;
    return data;
  } catch (err) {
    console.error('Erro ao fazer upload:', err.message);
    return null;
  }
}

const tgringaRoupas = ref([]);
const selectedStatus = ref('true');
onMounted(async () => {
  fetchProfessor();
});

async function handleImageUpload(newImageFile, oldFileName) {
  if (oldFileName) {
    await deleteImage(oldFileName);
  }
  if (newImageFile) {
    const uploadResult = await uploadImageForProfessor(newImageFile);
    if (uploadResult) {
      editedProfessor.value.fileName = uploadResult.path;
    }
  }
}

async function toggleStatus(professorId) {
  const professorToToggle = tgringaRoupas.value.find((professor) => professor.id === professorId);
  if (professorToToggle) {
    professorToToggle.status = !professorToToggle.status;
    try {
      const response = await putClient(professorToToggle.id, professorToToggle);
      fetchProfessor();
      push.success('Status atualizado com sucesso!');
    } catch (error) {
      push.error('Erro ao atualizar status!');
      console.error("Error:", error.message);
    }
  }
}

let isModalRegisterVisible = ref(false)
let isModalEditVisible = ref(false);
let isModalVendaVisible = ref(false);
let editedProfessor = ref({ nome: "", formacao: "", whatsapp: "", descricao: "", cpf: "", data_nascimento: "", email: "", entrada: "sistema", tipo: "", fileName: "" });
let vendaProfessor = ref({ nome: "", whatsapp: "", descricao: "", marca: "", totalModelo: "", campoDesconto: "", tipo: "", valor: "", fileName: "" });

let produtosCliente = ref([]);
let raposa = ref('');

let listaVendas = ref([]);

function formatDate(date) {
  return format(new Date(date), 'dd /MM/yyyy ~ HH:mm', { locale: ptBR });
}

const toggleModalRegister = () => {
  isModalRegisterVisible.value = !isModalRegisterVisible.value;
  newCollaborator.value.nome = '';
  newCollaborator.value.formacao = '';
  newCollaborator.value.email = '';
  newCollaborator.value.entrada = 'sistema';
  newCollaborator.value.whatsapp = '';
  newCollaborator.value.descricao = '';
  newCollaborator.value.cpf = '';
  newCollaborator.value.data_nascimento = '';
  newCollaborator.value.tipo = '';
  newCollaborator.value.fileName = '';
}

const toggleModalVenda = (professorObj) => {
  console.log('VALOR DE PROFESSOROBJ', professorObj);
  if (professorObj) {
    raposa.value = professorObj.cliente_hash;
    fetchVendasRealizadas();
    fetchMeusProdutos();
    if (professorObj.id) {
      const professorToEdit = tgringaRoupas.value.find((professor) => professor.id === professorObj.id);
      console.log('O VALOR DE IDEDIT', professorToEdit);
      if (professorToEdit) {
        vendaProfessor.value = { ...professorToEdit };
      }
    } else {
      vendaProfessor.value = { produto: "", nome: "", whatsapp: "", descricao: "", marca: "", campoDesconto: "", valor: "", tipo: "" };
    }
    newVenda.value.cliente_id = professorObj.cliente_hash;
    newVenda.value.nome = professorObj.nome;
  } else {
    vendaProfessor.value = { produto: "", nome: "", whatsapp: "", descricao: "", marca: "", totalModelo: "", campoDesconto: "", valor: "", tipo: "" };
    newVenda.value.cliente_id = "";
  }
  isModalVendaVisible.value = !isModalVendaVisible.value;
}

const toggleModalEdit = (professorId = null) => {
  console.log('professorId', professorId);
  // router.push('/professor');
  if (professorId) {
    const professorToEdit = tgringaRoupas.value.find((professor) => professor.id === professorId);
    if (professorToEdit) {
      editedProfessor.value = { ...professorToEdit };
    }
  } else {
    editedProfessor.value = { nome: "", formacao: "", whatsapp: "", descricao: "", cpf: "", email: "", entrada: "sistema", data_nascimento: "", tipo: "" };
  }
  isModalEditVisible.value = !isModalEditVisible.value;
};

async function updateEmployee() {
  if (!editedProfessor.value.nome || !editedProfessor.value.formacao || !editedProfessor.value.whatsapp || !editedProfessor.value.descricao || !editedProfessor.value.cpf || !editedProfessor.value.email || !editedProfessor.value.entrada || !editedProfessor.value.data_nascimento || !editedProfessor.value.tipo) {
    push.error('Todos os campos são obrigatório!');
    console.error("Error: Todos os campos são obrigatórios");
    return;
  }
  try {
    const response = await putClient(editedProfessor.value.id, editedProfessor.value);
    isModalEditVisible.value = false;
    fetchProfessor();
    push.success('Dados editados com sucesso!');
  } catch (error) {
    push.error('Erro ao tentar atualizar dados');
    console.error("Error:", error.message);
  }
}

async function updateVendas() {
  if (!vendaProfessor.value.nome || !vendaProfessor.value.whatsapp || !vendaProfessor.value.descricao || !vendaProfessor.value.marca || !vendaProfessor.value.totalModelo || !vendaProfessor.value.campoDesconto || !vendaProfessor.value.tipo) {
    push.error('Todos os campos são obrigatório!');
    console.error("Error: Todos os campos são obrigatórios");
    return;
  }
  try {
    const response = await putVendas(vendaProfessor.value.id, vendaProfessor.value);
    isModalVendaVisible.value = false;
    fetchMeusProdutos();
    push.success('Vendas editados com sucesso!');
  } catch (error) {
    push.error('Erro ao tentar atualizar vendas');
    console.error("Error:", error.message);
  }
}


async function fetchProfessor() {
  try {
    let user_id = await getUserId()
    const data = await getVendas(user_id);
    tgringaRoupas.value = data;
    console.log('VALOR DE TGRINGA', tgringaRoupas.value);
  } catch (error) {
    console.log(error)
  }
}

async function fetchMeusProdutos() {
  try {
    let user_id = await getUserId()
    const data = await getProfessor(user_id);
    console.log('MEUS PRODUTOS ->', data);
    produtosCliente.value = data;
  } catch (error) {
    console.log(error)
  }
}

async function fetchVendasRealizadas() {
  try {
    let user_id = raposa.value;
    const data = await getVendas(user_id);
    listaVendas.value = data;
  } catch (error) {
    console.log(error)
  }
}

// AJUSTAR O DELETE DA IMAGEM (limpando o campo da tabela no banco - fileName)
async function handleImageDelete(fileName) {
  if (fileName) {
    await deleteImage(fileName);
  }
  selectedImageFile.value = null;
  editedProfessor.value.fileName = '';
}

// limpar campo ao deletar
async function deleteImage(professor, fileName) {
  try {
    let user_id = await getUserId()
    const { data, error } = await supabase.storage.from('avatar' + '/' + user_id + '/' + professor).remove([fileName && professor]);
    if (error) {
      throw error;
    }
    console.log('Imagem deletada com sucesso:', data);
  } catch (error) {
    console.error('Erro ao deletar a imagem:', error.message);
  }
}

async function onDeleteEmployee(professorId) {
  try {
    const professorToDelete = tgringaRoupas.value.find((professor) => professor.id === professorId);
    console.log('VALOR DE PROFESSOR', professorToDelete);
    if (professorToDelete && professorToDelete.fileName) {
      console.log('CAINDO AQUI DENTRO !!')
      await deleteImage(professorToDelete.fileName);
    }
    await deleteCliente(professorId);
    push.success('Dados apagados com sucesso!');
    await deleteCliente(professorId);
    fetchProfessor();
  } catch (error) {
    push.error('Erro ao tentar apagar dados.');
    console.error(error.message);
  }
}

const selectedImageFile = ref(null);
const newCollaborator = ref({
  nome: "",
  formacao: "",
  whatsapp: "",
  descricao: "",
  cpf: "",
  email: "",
  entrada: "sistema",
  data_nascimento: "",
  tipo: "",
  fileName: "",
  selectedImageFile: null,
});


const newVenda = ref({
  cliente_id: "",
  quantidade: "",
  produto: "",
  nome: "",
  whatsapp: "",
  descricao: "",
  marca: "",
  totalModelo: "",
  campoDesconto: "",
  valor: "",
  tipo: "",
  fileName: "",
  selectedImageFile: null,
});

async function addNewEmployee() {
  // if (!newCollaborator.value.nome || !newCollaborator.value.whatsapp || !newCollaborator.value.descricao || !newCollaborator.value.cpf || !newCollaborator.value.email || !newCollaborator.value.entrada || !newCollaborator.value.data_nascimento || !newCollaborator.value.tipo || !selectedImageFile.value) {
  //   push.error('Todos os campos são obrigatório!');
  //   console.error("Error: Todos os campos são obrigatórios");
  //   return;
  // }
  try {
    // let imageUrl = null;
    // if (selectedImageFile.value) {
    //   const uploadResult = await uploadImageForProfessor(selectedImageFile.value);
    //   if (uploadResult) {
    //     imageUrl = uploadResult.url;
    //   } else {
    //     push.error('Erro ao fazer upload da imagem!');
    //     throw new Error("Erro ao fazer upload da imagem");
    //   }
    // }
    let userIn = await getUserId();
    let calc = Math.floor(10000 + Math.random() * 90000).toString();
    const newEmployeeData = {
      user_id: userIn,
      cliente_hash: calc,
      nome: newCollaborator.value.nome,
      formacao: newCollaborator.value.formacao,
      whatsapp: newCollaborator.value.whatsapp,
      descricao: newCollaborator.value.descricao,
      cpf: newCollaborator.value.cpf,
      email: newCollaborator.value.email,
      entrada: newCollaborator.value.entrada,
      tipo: newCollaborator.value.tipo,
      fileName: newCollaborator.value.fileName,
      // imageUrl: imageUrl
    };
    const response = await postClient(newEmployeeData);
    newCollaborator.value = { nome: "", formacao: "", whatsapp: "", descricao: "", cpf: "", data_nascimento: "", email: "", entrada: "sistema", tipo: "", fileName: "", selectedImageFile: null };
    selectedImageFile.value = null;
    isModalRegisterVisible.value = false;
    // notification.resolve('Dados adicionados com sucesso!');
    push.success('Dados adicionados com sucesso!');
    fetchProfessor();
  } catch (error) {
    // notification.reject('Erro ao tentar adicionar dados.');
    push.error('Erro ao tentar adicionar dados');
    console.error("Error:", error.message);
  }
}


async function addNewProduto() {
  // if (!newVenda.value.nome || !newVenda.value.whatsapp || !newVenda.value.descricao || !newVenda.value.marca || !newVenda.value.totalModelo || !newVenda.value.campoDesconto || !newVenda.value.valor || !newVenda.value.tipo || !selectedImageFile.value) {
  //   push.error('Todos os campos são obrigatório!');
  //   console.error("Error: Todos os campos são obrigatórios");
  //   return;
  // }
  console.log('VALOR DE RETORNO', newVenda.value);
  try {
    // let imageUrl = null;
    // if (selectedImageFile.value) {
    //   const uploadResult = await uploadImageForProfessor(selectedImageFile.value);
    //   if (uploadResult) {
    //     imageUrl = uploadResult.url;
    //   } else {
    //     push.error('Erro ao fazer upload da imagem!');
    //     throw new Error("Erro ao fazer upload da imagem");
    //   }
    // }
    let userIn = await getUserId();
    const newEmployeeData = {
      cliente_id: newVenda.value.cliente_id,
      quantidade: newVenda.value.quantidade,
      produto: newVenda.value.produto,
      nome: newVenda.value.nome,
      whatsapp: newVenda.value.whatsapp,
      descricao: newVenda.value.descricao,
      marca: newVenda.value.marca,
      totalModelo: newVenda.value.totalModelo,
      campoDesconto: newVenda.value.campoDesconto,
      valor: newVenda.value.valor,
      tipo: newVenda.value.tipo,
      fileName: newVenda.value.fileName,
      // imageUrl: imageUrl
    };
    const response = await postVendas(newEmployeeData);
    console.log('VALOR RESPONSE &&& ->', response);
    // const response2 = await editProfessor(newVenda.value.produto, { id: newVenda.value.produto, user_id: userIn, totalModelo: 999 }); /
    const response3 = await getProdutoById(userIn, newVenda.value.produto);
    console.log('VALOR RESPONSE 33333 ->', response3[0].totalModelo);
    let totalAtualProdutosId = response3[0].totalModelo - newVenda.value.quantidade;
    const response2 = await editProfessor(newVenda.value.produto, { id: newVenda.value.produto, user_id: userIn, totalModelo: totalAtualProdutosId }); 
    console.log('VALOR RESPONSE 22222 ->', response2);
    // raposa.value = newVenda.value.cliente_id;
    // console.log('VALOR DE RAPaaaaa', raposa.value);
    fetchMeusProdutos();
    fetchVendasRealizadas();
    newVenda.value = { cliente_id: "", produto: "", nome: "", whatsapp: "", descricao: "", marca: "", totalModelo: "", campoDesconto: "", valor: "", tipo: "", fileName: "", selectedImageFile: null };
    selectedImageFile.value = null;
    isModalRegisterVisible.value = false;
    // notification.resolve('Dados adicionados com sucesso!');
    push.success('Venda adicionada com sucesso!');
    fetchProfessor();
  } catch (error) {
    // notification.reject('Erro ao tentar adicionar dados.');
    push.error('Erro ao tentar adicionar dados');
    console.error("Error:", error.message);
  }
}
</script>

<!-- <style scoped>


.plano {
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px #363636;
  background-color: #1d1f20;
}

.plano:hover {
  background-color: #161718;
}
</style> -->

<style>
.swal2-popup  {
  /* background-color: red; */
  background-image: url("https://st.depositphotos.com/15722686/53877/i/450/depositphotos_538778342-stock-photo-abstract-liquid-background-popup-composition.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(50px);
  /* filter: blur(1px); */
  /* width: 400px !important; */
  border-radius: 20px;
}

.swal2-image {
  margin: 0;
  width: 150px;
}

/* .swal2-confirm{
  white-space: nowrap;
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 8px!important;
  background: #A8F0BE !important;
  color: #233568!important;
  width:100%;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
} */
</style>