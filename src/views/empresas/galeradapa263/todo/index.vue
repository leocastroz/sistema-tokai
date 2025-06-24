<template>
  <div class="container">
    <div class="column" v-for="(column, index) in columns" :key="index">
      <h2>{{ column.title }}</h2>
      <div 
        class="dropzone" 
        @dragover.prevent
        @drop="dropItem(index)"
      >
        <!-- <pre>{{ column.items.length }}</pre> -->
        <!-- <img v-if="!column.items.length" src="../../../public/img/not-data.png" alt="No result found" /> -->
        <div 
          v-for="item in column.items" 
          :key="item.id" 
          class="item" 
          draggable="true" 
          @dragstart="dragStart(item, index)"
          @dragend="dragEnd"
          @click="toggleMenu(item)"
        >
          <div style="display: flex;justify-content: space-between;align-items: center;">
            <p class="eli-case">{{ item.name }}</p>
            <!-- <pre>{{ column.identy }}</pre> -->
            <i class="fa-solid fa-compress"></i>
          </div>
         
          
          <div style="display:flex;font-size: 10px;margin:20px 0 0 0;justify-content:space-between;">
            <p class="nome-criador">{{ item.created_by }}</p>
            <p>{{ formatDate(item.created_at) }}</p>
          </div>
        </div>
        
      </div>
      <input 
        v-model="column.newItem" 
        placeholder="adicionar item" 
        @keyup.enter="addItem(index)"
      />
    </div>

    <transition name="menu-slide">
      <div v-if="isMenuOpen" class="menu">
      <!-- <i @click="toggleMenu" class="fas fa-times" style="color:#000;cursor:pointer;"></i> -->
        <div class="links-menu">
          <div>
            <label>ID:</label>
            <input v-model="selectedItem.id" type="text" readonly disabled/>
          </div>
          <div>
            <label>User ID:</label>
            <input v-model="selectedItem.user_id" type="text" disabled />
          </div>
          <div>
            <label>Status:</label>
            <input v-model="selectedItem.status" type="text" disabled />
          </div>
          <div>
            <label>Name:</label>
            <input v-model="selectedItem.name" type="text" />
          </div>
          <div>
            <label>ID Column:</label>
            <input v-model="selectedItem.id_colum" type="text" disabled />
          </div>
          <button @click="updateItemInAPI(selectedItem, selectedItem.status, 'interno')">Atualizar</button>
          <i @click="toggleMenu" class="fas fa-times" style="color:#000;cursor:pointer;"></i>
        </div>
      </div>
    </transition>

    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme"  />
    </Notivue>
  </div>
</template>

<script setup>
import { Notivue, Notification, pastelTheme, push } from 'notivue';
import { ref, onMounted } from 'vue';
import { addClient, editStructure, getClient, deleteClient } from '@/service/galeradapa263/todoGaleraDaPa263Service.js';
import { useToast } from "vue-toastification";
import { supabase } from '@/clients/supabase';

const toast = useToast();

const columns = ref([
  { identy: 0, title: 'BACKLOG', items: [], newItem: '' },
  { identy: 1, title: 'PARA FAZER', items: [], newItem: '' },
  { identy: 2, title: 'TESTANDO / PAUSADO', items: [], newItem: '' },
  { identy: 3, title: 'FINALIZADO', items: [], newItem: '' },
]);

const isMenuOpen = ref(false);

// Função para alternar o menu
const toggleMenu = (item) => {
  console.log('item ->>', item);
  selectedItem.value = item;
  isMenuOpen.value = !isMenuOpen.value;
};

const draggedItem = ref(null);
const draggedFrom = ref(null);

const newCarteira = ref({
  status: "",
  name: "",
});

// const formatDate = (date) => {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date(date).toLocaleDateString('pt-BR', options);
// };

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const selectedItem = ref(null);

const deleteItem = async (itemId) => {
  await deleteClient(itemId);
  columns.value.forEach((column) => {
    column.items = column.items.filter((item) => item.id !== itemId);
  });
  closeModal();
};

const addItem = async (columnIndex) => {
  if (!columns.value[columnIndex].newItem) return;

  newCarteira.value.status = columnIndex;
  newCarteira.value.name = columns.value[columnIndex].newItem;

  const { id: newItemId, id_colum } = await addNewStructure();

  const item = {
    id: newItemId,
    name: columns.value[columnIndex].newItem,
    id_colum: id_colum,
  };

  columns.value[columnIndex].items.push(item);
  columns.value[columnIndex].newItem = '';
};

const dragStart = (item, columnIndex) => {
  draggedItem.value = item;
  draggedFrom.value = columnIndex;
};

const dragEnd = () => {
  draggedItem.value = null;
  draggedFrom.value = null;
};

const dropItem = async (columnIndex) => {
  if (!draggedItem.value) return;

  columns.value[draggedFrom.value].items = columns.value[draggedFrom.value].items.filter(
    (item) => item.id !== draggedItem.value.id
  );

  columns.value[columnIndex].items.push(draggedItem.value);

  await updateItemInAPI(draggedItem.value, columnIndex);

  draggedItem.value = null;
  draggedFrom.value = null;
};

async function fetchProfessor() {
  try {
    let user_id = await getUserId();
    const data = await getClient(user_id);
    console.log('DATA TESTE structure ->', data);
  } catch (error) {
    console.log(error);
  }
}

const getItemsFromAPI = async () => {
  let user_id = await getUserId();
  try {
    const response = await fetch(`https://lxnpvnkyzugssfajidyw.supabase.co/rest/v1/todo_galeradapa263?select=*&user_id=eq.${user_id.id}`, {
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bnB2bmt5enVnc3NmYWppZHl3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjgyMTU0OCwiZXhwIjoyMDUyMzk3NTQ4fQ.X3AwzNw7U2FWgUwf3GgDfWPP2YjhxrbA3n4PTzyu61Q',
      },
    });
    const data = await response.json();
    console.log('Fetched items:', data);
    columns.value.forEach((column) => {
      column.items = [];
    });

    data.forEach((item) => {
      columns.value[item.status].items.push(item);
    });
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

async function getUserId() {
  let { data, error } = await supabase.auth.getSession();
  // return data.session.user.id;
  return data.session.user;
}

async function addNewStructure() {
  try {
    let userIn = await getUserId();
    console.log('PEPE BUSINES', userIn);
    console.log('status', newCarteira.value.status);
    console.log('name', newCarteira.value.name);
    const idColum = Date.now();
    const newEmployeeData = {
      user_id: userIn.id,
      status: newCarteira.value.status,
      name: newCarteira.value.name,
      id_colum: idColum,
      created_by: userIn.email,
    };
    const response = await addClient(newEmployeeData);
    console.log('RESPONSE DO ADD CARD!! -->', response);

    if (response.status === 201) {
      const newItemId = response.data.id;
      // columns.value[columnIndex].newItem = '';
      
      newCarteira.value = { status: "", name: "" };
      fetchProfessor();
      toast.success("Sucesso ao adicionar!");
      columns.value[columnIndex].newItem = '';
      return { id: newItemId, id_colum: idColum };
    } else {
      getItemsFromAPI();
      fetchProfessor();
      newCarteira.value = { status: "", name: "" };
      toast.error("Erro ao adicionar!");
      console.error("Error:", error.message);
    }
  } catch (error) {
    getItemsFromAPI();
    fetchProfessor();
    newCarteira.value = { status: "", name: "" };
    // toast.error("Erro ao adicionar!");
    console.error("Error:", error.message);
  }
}

const updateItemInAPI = async (item, columnIndex, tipo) => {
  console.log('item no UPDATE', tipo); 
  let userIn = await getUserId();
  console.log('item.id', item);
  let id = item.id;
  let tipoEdit = tipo;
  try {
    const data = {
      id: item.id,
      user_id: userIn.id,
      status: columnIndex,
      name: item.name,
      id_colum: item.id_colum
    };
    await editStructure(id, data);
    console.log('Updated item:', data);
    fetchProfessor();
    tipoEdit === 'interno' ? push.success('Item atualizado com sucesso!') : push.success('Posição atualizada com sucesso!');
  } catch (error) {
    push.error('Erro ao atualizar posição, tente novamente.')
    console.error('Error updating item:', error);
  }
};

onMounted(getItemsFromAPI);
</script>

<style>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: -36.5px !important;
  width: 50%;
  height: 100vh;
  right: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.609);
}

.modal-content-modal {
  background-color: red !important; /* Fallback color */
  /* background-color: #fefefe; */
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.nome-criador {
  /* max-width: 150px;
  white-space: nowrap;                  
  overflow: hidden;
  text-overflow:  ellipsis;
  color: #ffffff7a; */


}

.eli-case {
  width: 100%; /* Defina a largura desejada */
  max-height: 50px; /* Altura máxima */
  overflow: hidden; /* Oculta o texto excedente */
  text-overflow: ellipsis; /* Adiciona os "..." */
  display: -webkit-box; /* Usa flexibilidade do layout */
  -webkit-line-clamp: 8; /* Limita o número de linhas */
  -webkit-box-orient: vertical; /* Define a orientação do texto */
  white-space: normal; /* Permite quebra de linha */
  line-height: 1.5; /* Ajusta o espaçamento entre linhas */
}

.column input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f6f6f6;
  padding: 10px;
}

.container {
  display: flex;
  gap: 20px;
  width: 100%;
}
.column {
  display: grid;
  flex: 1;
  background-image: linear-gradient(to right, #016dff 0%, #55cbff 100%);
  /* background: #fff; */
  border: 1px solid #ffffff82;
  border-radius: 8px;
  padding: 10px;
  height: max-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 20px;
}

.dropzone::-webkit-scrollbar {
  width: 5px;               /* width of the entire scrollbar */
}

.dropzone::-webkit-scrollbar-track {
  background: transparent;        /* color of the tracking area */
}

.dropzone::-webkit-scrollbar-thumb {
  background-color: white;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid transparent;  /* creates padding around scroll thumb */
}


.column h2 {
  text-align: center;
}
.item {
  background: #1d202045;
  margin: 8px 0;
  padding: 10px;
  border-radius: 4px;
  cursor: grab;
  color: #d9d9d9;
}

.item i {
  color: #ffffff4d;
  display: none;
}

.item:hover {
  display: block;
  background: #1d202061;
}


.item:hover i {
  display: block;
}

.item.dragging {
  opacity: 0.5;
}
.dropzone {
  padding: 10px;
  min-height: 50px;
  border: 2px dashed #dddddd66;
  border-radius: 4px;
  overflow-y: scroll;
  height: 500px;
}





.menu-slide-enter-active, .menu-slide-leave-active {
  transition: transform 0.5s ease;
}

.menu-slide-enter {
  transform: translateX(30%); /* Começa mais próximo para uma transição suave */
}

.menu-slide-leave-to {
  transform: translateX(100%); /* Transição de saída para a esquerda está mantida */
}

.links-menu {
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 1rem 0rem;
  border-bottom: 1px solid #0f0f1738;
  display: grid;
}

.links-menu div {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
}

.menu {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff !important;
  height: -webkit-fill-available;
  z-index: 9;
  flex-direction: column;
  border-radius: 5px;
  position: fixed;
  display: flex;
  width: 50%;
  top: 0;
  right: 0;
  animation: fadeInRight 0.5s;
}


.menu a {
  padding: 15px;
  text-decoration: none;
  color: #333;
}

</style>