<template>
  <div>
    <div class="flex justify-between items-center">
      <p
        class="text-xl w-full font-extrabold text-white animate__animated animate__fadeIn"
      >
        TOKAI - MARCAS
      </p>
      <div
        v-show="!isModalEditVisible && !isModalRegisterVisible"
        class="w-full flex justify-end items-center animate__animated animate__fadeIn"
      >
        <div
          class="text-gray-400 text-sm flex items-center justify-between w-60 py-3 px-4 drop-shadow-lg"
          style="
            box-shadow: 0px 0px 1px 1px #363636;
            background-color: #1d1f20;
            border-radius: 5px;
          "
          v-show="!isModalEditVisible && !isModalRegisterVisible"
        >
          <p>STATUS -</p>
          <div class="flex items-center justify-center">
            <label class="px-1 text-xs">ativos</label>
            <input
              class="cursor-pointer"
              type="radio"
              value="true"
              v-model="selectedStatus"
            />
          </div>
          <div class="flex items-center justify-center">
            <label class="px-1 text-xs">inativos</label>
            <input
              class="cursor-pointer"
              type="radio"
              value="false"
              v-model="selectedStatus"
            />
          </div>
        </div>
        <button
          @click="toggleModalRegister"
          v-show="!isModalEditVisible && !isModalRegisterVisible"
          class="plano text-white font-normal py-2 px-2 flex items-center rounded-md text-[14px] drop-shadow-lg animate__animated animate__fadeIn"
        >
          <i class="fa-solid fa-circle-plus px-2"></i>
          <p>NOVO CADASTRO</p>
        </button>
      </div>
    </div>

    <div
      v-if="false"
      class="w-full flex justify-start mt-10 animate__animated animate__fadeIn"
    >
      <div
        class="text-gray-400 text-sm flex items-center justify-between w-60 py-3 px-4 drop-shadow-lg"
        style="
          box-shadow: 0px 0px 1px 1px #363636;
          background-color: #1d1f20;
          border-radius: 5px;
        "
        v-show="!isModalEditVisible && !isModalRegisterVisible"
      >
        <p>STATUS -</p>
        <div class="flex items-center justify-center">
          <label class="px-1 text-xs">ativos</label>
          <input
            class="cursor-pointer"
            type="radio"
            value="true"
            v-model="selectedStatus"
          />
        </div>
        <div class="flex items-center justify-center">
          <label class="px-1 text-xs">inativos</label>
          <input
            class="cursor-pointer"
            type="radio"
            value="false"
            v-model="selectedStatus"
          />
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
      <Notification :item="item" :theme="pastelTheme" />
    </Notivue>

    <schedule
      v-show="!isModalEditVisible && !isModalRegisterVisible"
      :tgringaRoupas="tgringaRoupas"
      :getDataTable="getDataTable"
      :formatDate="formatDate"
      @delete="onDeleteModal"
      @edit="toggleModalEdit"
      :searchQuery="searchQuery"
      @toggleStatus="toggleStatus"
      :selectedStatus="selectedStatus"
    />
    <!-- <schedule v-show="!isModalEditVisible && !isModalRegisterVisible" :tgringaRoupas="tgringaRoupas"
      :formatDate="formatDate" @delete="onDeleteEmployee" @edit="toggleModalEdit" :searchQuery="searchQuery"
      @toggleStatus="toggleStatus" :selectedStatus="selectedStatus" /> -->
    <register
      v-show="isModalRegisterVisible"
      :professor="newCollaborator"
      @register="addNewEmployee"
      @push-marca="pushedmarca"
      @cancel="toggleModalRegister"
      @uploadImage="selectedImageFile = $event"
    />
    <edit
      v-show="isModalEditVisible"
      :professor="editedProfessor"
      @update="updateEmployee"
      @push-marca="pushedmarca"
      @cancel="toggleModalEdit"
      @uploadImage="handleImageUpload"
      @deleteImage="handleImageDelete"
      style="position: fixed; left: 0; top: 0; width: 100vw; height: 100vh"
    />
  </div>
</template>

<script setup>
import { Notivue, Notification, pastelTheme, push } from "notivue";
import Swal from "sweetalert2";
import {
  deleteMarca,
  getMarca,
  addMarca,
  editMarca,
} from "@/service/galeradapa263/marcasGaleraDaPa263Service.js";
import { ref, onMounted } from "vue";
import { supabase } from "@/clients/supabase";
import { ptBR } from "date-fns/locale";
import register from "./register.vue";
import schedule from "./schedule.vue";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import edit from "./edit.vue";

const searchQuery = ref("");
let nameModal = ref("");
let modalDelete = ref(false);

// ----------------- VALIDANDO PLANO ------------------
// let userPlan = localStorage.getItem('userPlan');
// onBeforeMount(() => {
//   if (userPlan === 'shop' || userPlan === 'admin') {
//     router.push('/dashboard');
//   }
// });

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
  return data.session.user.id;
}
// ----------------------------------------------------

async function uploadImageForProfessor(imageFile) {
  try {
    let userId = localStorage.getItem("userId");
    const { data, error } = await supabase.storage
      .from("img_marca" + "/" + userId)
      .upload(uuidv4(), imageFile, {
        cacheControl: "3600",
        contentType: imageFile.type,
      });

    if (error) {
      console.error("Erro ao fazer upload:", error);
      return null;
    }

    console.log("Upload bem-sucedido!", data);
    newCollaborator.value.fileName = data.path;
    return data;
  } catch (err) {
    console.error("Erro ao fazer upload:", err.message);
    return null;
  }
}

const tgringaRoupas = ref([]);
const getDataTable = ref(false);
const marcas = ref([]);
const selectedStatus = ref("true");
onMounted(async () => {
  fetchProfessor();
  fecthMarca();
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
  const professorToToggle = tgringaRoupas.value.find(
    (professor) => professor.id === professorId
  );
  if (professorToToggle) {
    professorToToggle.status = !professorToToggle.status;
    try {
      const response = await editMarca(professorToToggle.id, professorToToggle);
      fetchProfessor();
      push.success("Status atualizado com sucesso!");
    } catch (error) {
      push.error("Erro ao atualizar status!");
      console.error("Error:", error.message);
    }
  }
}

let isModalRegisterVisible = ref(false);
let isModalEditVisible = ref(false);
let editedProfessor = ref({
  nome: "",
  descricao: "",
  marca: "",
  totalModelo: "",
  campoDesconto: "",
  tipo: "",
  valor: "",
  fileName: "",
});

function formatDate(date) {
  return format(new Date(date), "dd /MM/yyyy ~ HH:mm", { locale: ptBR });
}

const toggleModalRegister = () => {
  isModalRegisterVisible.value = !isModalRegisterVisible.value;
  newCollaborator.value.marca = "";
  // newCollaborator.value.descricao = '';
  // newCollaborator.value.marca = '';
  // newCollaborator.value.totalModelo = '',
  // newCollaborator.value.campoDesconto = '';
  // newCollaborator.value.valor = '';
  // newCollaborator.value.tipo = '';
  newCollaborator.value.link_img = "";
  newCollaborator.value.fileName = "";
};

const toggleModalEdit = (professorId = null) => {
  console.log("professorId", professorId);
  // router.push('/professor');
  if (professorId) {
    const professorToEdit = tgringaRoupas.value.find(
      (professor) => professor.id === professorId
    );
    if (professorToEdit) {
      editedProfessor.value = { ...professorToEdit };
    }
  } else {
    editedProfessor.value = {
      nome: "",
      descricao: "",
      marca: "",
      totalModelo: "",
      campoDesconto: "",
      valor: "",
      tipo: "",
    };
  }
  isModalEditVisible.value = !isModalEditVisible.value;
};

async function updateEmployee() {
  // if (!editedProfessor.value.nome || !editedProfessor.value.descricao || !editedProfessor.value.marca || !editedProfessor.value.totalModelo || !editedProfessor.value.campoDesconto || !editedProfessor.value.valor || !editedProfessor.value.tipo) {
  //   push.error('Todos os campos são obrigatório!');
  //   console.error("Error: Todos os campos são obrigatórios");
  //   return;
  // }

  // const notification = push.promise("Editando dados, aguarde...");

  try {
    // await new Promise((resolve, reject) =>
    //   setTimeout(Math.random() > 0.5 ? resolve : reject, 2000)
    // )
    const response = await editMarca(
      editedProfessor.value.id,
      editedProfessor.value
    );
    isModalEditVisible.value = false;
    fetchProfessor();
    // notification.resolve('Dados apagados com sucesso!');
    push.success("Dados editados com sucesso!");
  } catch (error) {
    // notification.reject('Erro ao tentar atualizar dados.');
    push.error("Erro ao tentar atualizar dados");
    console.error("Error:", error.message);
  }
}
async function fetchProfessor() {
  getDataTable.value = true;
  try {
    let user_id = await getUserId();
    const data = await getMarca(user_id);
    tgringaRoupas.value = data;
    getDataTable.value = false;
  } catch (error) {
    console.log(error);
    // isLoading.value = false;
  }
}

async function fecthMarca() {
  try {
    let user_id = await getUserId();
    const data = await getMarca(user_id);
    marcas.value = data;
    console.log("marcas", marcas.value);
  } catch (error) {
    console.log(error);
    // isLoading.value = false;
  }
}

async function handleImageDelete(fileName) {
  if (fileName) {
    await deleteImage(fileName);
  }

  selectedImageFile.value = null;
  editedProfessor.value.fileName = "";
}

async function deleteImage(professor, fileName) {
  try {
    let user_id = await getUserId();
    const { data, error } = await supabase.storage
      .from("img_marca" + "/" + user_id + "/" + professor)
      .remove([fileName && professor]);
    if (error) {
      throw error;
    }
    console.log("Imagem deletada com sucesso:", data);
  } catch (error) {
    console.error("Erro ao deletar a imagem:", error.message);
  }
}

async function onDeleteEmployee(professorId) {
  // const notification = push.promise("Apagando dados, aguarde...");
  try {
    // await new Promise((resolve, reject) =>
    //   setTimeout(Math.random() > 0.5 ? resolve : reject, 2000)
    // )
    // notification.resolve('Dados apagados com sucesso!');
    push.success("Dados apagados com sucesso!");

    const professorToDelete = tgringaRoupas.value.find(
      (professor) => professor.id === professorId
    );
    if (professorToDelete && professorToDelete.fileName) {
      await deleteImage(professorToDelete.fileName);
    }
    await deleteMarca(professorId);
    fetchProfessor();
  } catch (error) {
    push.error("Erro ao tentar apagar dados.");
    // notification.reject('Erro ao tentar apagar dados.');
    console.error(error.message);
  }
}

const selectedImageFile = ref(null);

const newCollaborator = ref({
  marca: "",
  link_img: "",
  fileName: "",
  // descricao: "",
  // marca: "",
  // totalModelo: "",
  // campoDesconto: "",
  // valor: "",
  // tipo: "",
  // fileName: "",
  // image_one: "",
  // selectedImageFile: null,
});

async function pushedmarca() {
  fecthMarca();
}

async function addNewEmployee() {
  // if (!newCollaborator.value.nome || !newCollaborator.value.descricao || !newCollaborator.value.marca || !newCollaborator.value.totalModelo || !newCollaborator.value.campoDesconto || !newCollaborator.value.valor || !newCollaborator.value.tipo || !selectedImageFile.value) {
  //   push.error('Todos os campos são obrigatório!');
  //   console.error("Error: Todos os campos são obrigatórios");
  //   return;
  // }
  try {
    let imageUrl = null;
    if (selectedImageFile.value) {
      const uploadResult = await uploadImageForProfessor(
        selectedImageFile.value
      );
      if (uploadResult) {
        imageUrl = uploadResult.url;
      } else {
        push.error("Erro ao fazer upload da imagem!");
        throw new Error("Erro ao fazer upload da imagem");
      }
    }
    // let userIn = await getUserId();
    const newEmployeeData = {
      // user_id: userIn,
      // descricao: newCollaborator.value.descricao,
      // marca: newCollaborator.value.marca,
      // totalModelo: newCollaborator.value.totalModelo,
      // campoDesconto: newCollaborator.value.campoDesconto,
      // valor: newCollaborator.value.valor,
      // tipo: newCollaborator.value.tipo,
      // image_one: newCollaborator.value.image_one,
      // imageUrl: imageUrl,
      marca: newCollaborator.value.marca,
      link_img: newCollaborator.value.link_img,
      fileName: newCollaborator.value.fileName,
    };
    const response = await addMarca(newEmployeeData);
    newCollaborator.value = { marca: "", link_img: "", fileName: "" };
    // selectedImageFile.value = null;
    isModalRegisterVisible.value = false;
    push.success("Marca adicionada com sucesso!");
    fetchProfessor();
  } catch (error) {
    push.error("Erro ao tentar adicionar marca!");
    console.error("Error:", error.message);
  }
}
</script>

<style>
.swal2-popup {
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
