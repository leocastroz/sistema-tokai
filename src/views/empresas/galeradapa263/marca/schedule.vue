<template>
  <div
    class="mt-5 drop-shadow-lg animate__animated animate__fadeIn" style="box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;border-radius:10px;">
    <div class="p-8 flex items-center">
      <div
        class="flex p-2 border-gray-300 focus:outline-none" style="box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;border-radius:10px 0 0 10px;">
        <span class="material-symbols-outlined text-gray-400">
          search
        </span>
      </div>
      <input type="text" v-model="searchQuery" placeholder="Pesquisar por marca"
        class="w-full placeholder:italic p-2 focus:outline-none text-white" style="box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;border-radius:0 10px 10px 0;" />
    </div>
    <div v-if="selectedStatus === 'true'">
      <div class="flex items-center py-2 px-4 justify-between">
        <div class="flex items-center">
          <div class="led led-on"></div>
          <h2 class="text-md font-bold text-[#969696] px-2">ATIVOS</h2>
        </div>
        <div class="w-48 flex justify-between">
          <div
            class="bg-gray-500 px-3 py-1 text-[9px] rounded text-gray-300 drop-shadow-md border-solid border-[1px] border-gray-700">
            <i class="fa-solid fa-chevron-left"></i>
            <button class="px-1" @click="prevPageTableOn" :disabled="activePageOn === 1">ANTERIOR</button>
          </div>
          <div
            class="bg-gray-500 px-3 py-1 text-[9px] rounded text-gray-300 drop-shadow-md border-solid border-[1px] border-gray-700">
            <button class="px-1" @click="nextPageTableOn" :disabled="activePageOn === totalPagesOn">PRÓXIMO</button>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>
      <table class="w-full">
        <thead class="border-solid border-b-[1px] border-[#363636] text-gray-500">
          <tr class="text-xs">
            <th class="text-center w-20 p-2">IMG</th>
            <!-- <th class="text-center w-20 p-2">ID</th> -->
            <!-- <th class="text-left w-72 px-3">Vinculado</th> -->
            <!-- <th class="text-left w-72 px-3">NOME</th> -->
            <!-- <th class="text-left w-64 px-3 ">Formação</th> -->
            <th class="text-left w-64 px-3 ">MARCA</th>
            <!-- <th class="text-left w-64 px-3 ">TOT. MODELO</th>
            <th class="text-left w-64 px-3 ">DESCONTO</th>
            <th class="text-left w-64 px-3 ">VALOR</th> -->
            <th class="w-56">AÇÕES</th>
          </tr>
        </thead>
        <tbody v-if="filteredProfessors.length > 0" class="text-[13px]">
          <tr v-for="professor in paginatedActiveProfessors" :key="professor.id"
            class="m-10 items-center text-gray-400" style="box-shadow: 0px 0px 1px 1px #363636;border-radius: 0 0 10px 10px;">
            <td class="flex justify-center w-20 animate__animated animate__fadeIn py-2">
              <img :src="professorImageURL(professor)" @error="setDefaultImage" class="w-11 rounded" />
            </td>
            <!-- <td class="text-center w-20 animate__animated animate__fadeIn">{{ professor.id }}</td> -->
            <!-- <td class="text-left w-72 px-3 animate__animated animate__fadeIn">{{ formatDate(professor.created_at) }}</td> -->
            <!-- <td class="text-left px-3 w-72 animate__animated animate__fadeIn">{{ professor.nome }}</td> -->
            <!-- <td class="text-left px-3 w-64 animate__animated animate__fadeIn">{{ professor.descricao }}</td> -->
            <td class="text-left px-3 w-64 animate__animated animate__fadeIn">{{ professor.marca }}</td>
            <!-- <td class="text-left px-3 w-64 animate__animated animate__fadeIn">{{ professor.totalModelo }}</td>
            <td class="text-left px-3 w-64 animate__animated animate__fadeIn">{{ professor.campoDesconto }}</td>
            <td class="text-left px-3 w-64 animate__animated animate__fadeIn">R$ {{ professor.valor % 1 === 0 ? professor.valor + ',00' : professor.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td> -->
            <td class="animate__animated animate__fadeIn w-56 text-center">
   
                <i @click="$emit('delete', professor)"
                  class="fa-solid fa-trash text-[13px] text-white bg-red-500 items-center p-2 mx-1 rounded drop-shadow-md cursor-pointer hover:bg-red-700 "></i>
                <i class="fa-solid fa-pen-to-square text-[13px] text-white bg-blue-500 items-center p-2 mx-1 rounded drop-shadow-md cursor-pointer hover:bg-blue-700"
                  @click="$emit('edit', professor.id)" v-tooltip="'editar'"></i>
                <i class="fa-solid fa-lock text-[13px] text-white items-center p-2 mx-1 rounded drop-shadow-md cursor-pointer hover:bg-gray-600"
                @click="$emit('toggleStatus', professor.id)"
                  :class="`material-symbols-outlined ${professor.status ? 'bg-gray-500' : 'bg-gray-500'}`"
                  v-tooltip="'desativar'"></i>
                <!-- <i  @click="openWhatsApp(professor.whatsapp)" class="fa-brands fa-whatsapp text-[18px] text-white bg-green-500 items-center p-1 mx-1 rounded drop-shadow-md cursor-pointer hover:bg-green-700"  v-tooltip="'editar'"></i> -->
        
            </td>
          </tr>
        </tbody>
        <tbody v-if="getDataTable == true">
          <tr>
            <td colspan="7" class="p-3 text-center text-gray-500">
              <p class="pt-4 text-gray-400">Buscando marcas...</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="activeProfessors.length === 0 && getDataTable == false" class="p-3 text-center text-gray-500">
        <img src="/img/no-data.svg" alt="Sem dados" width="600" class="mx-auto animate__animated animate__fadeIn">
        <p class="pt-4 text-gray-400">Ops.. nenhum dado encontrado.</p>
      </div>
    </div>

    <div v-else>

      <div class="flex items-center py-2 px-4 justify-between">
        <div class="flex items-center">
          <div class="led led-off"></div>
          <h2 class="text-md font-bold text-[#969696] px-2">INATIVOS</h2>
        </div>
        <div class="w-48 flex justify-between">
          <div
            class="bg-gray-500 px-3 py-1 text-[9px] rounded text-gray-300 drop-shadow-md border-solid border-[1px] border-gray-700">
            <i class="fa-solid fa-chevron-left"></i>
            <button class="px-1" @click="prevPageTableTwo" :disabled="activePage === 1">ANTERIOR</button>
          </div>
          <!-- <button @click="prevPageTableTwo" :disabled="activePage === 1">Anterior</button> -->
          <!--<button @click="nextPageTableTwo" :disabled="activePage === totalPages">Próximo</button> -->
          <div
            class="bg-gray-500 px-3 py-1 text-[9px] rounded text-gray-300 drop-shadow-md border-solid border-[1px] border-gray-700">
            <button class="px-1" @click="nextPageTableTwo" :disabled="activePage === totalPages">PRÓXIMO</button>
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <!-- <h2 class="text-xl font-bold text-[#969696] py-6 px-3">Inativos</h2> -->



      <table class="w-full">
        <thead class=" text-gray-500">
          <tr class="text-xs">
            <th class="text-center w-20 p-2">IMG</th>
            <!-- <th class="text-center w-20 p-2">ID</th> -->
            <!--<th class="text-left w-72 px-3">Vinculado</th> -->
            <!-- <th class="text-left w-72 px-3">NOME</th> -->
            <th class="text-left w-64 px-3 ">MARCA</th>
            <!-- <th class="text-left w-64 px-3 ">TOT. MODELO</th>
            <th class="text-left w-64 px-3 ">DESCONTO</th>
            <th class="text-left w-64 px-3 ">VALOR</th> -->
            <th class="w-56">AÇÕES</th>
          </tr>
        </thead>
        <tbody v-if="inactiveProfessors.length > 0" class="text-[13px]">
          <tr v-for="professor in paginatedInativeProfessors" :key="professor.id"
            class=" text-gray-400">
            <td class="flex justify-center w-20 animate__animated animate__fadeIn py-2">
              <img :src="professorImageURL(professor)" @error="setDefaultImage" class="w-11 rounded" />
            </td>
            <!-- <td class="text-center w-20 animate__animated animate__fadeIn">{{ professor.id }}</td> -->
            <!-- <td class="text-left w-72 px-3 animate__animated animate__fadeIn">{{ formatDate(professor.created_at) }}</td> -->
            <!-- <td class="text-left px-3 w-72 animate__animated animate__fadeIn">{{ professor.nome }}</td> -->
            <!-- <td class="text-left px-3 w-64 animate__animated animate__fadeIn">{{ professor.descricao }}</td> -->
            <td class="text-left px-3 w-64 animate__animated animate__fadeIn">{{ professor.marca }}</td>
            <!-- <td class="text-left px-3 w-64 animate__animated animate__fadeIn">{{ professor.totalModelo }}</td>
            <td class="text-left px-3 w-64 animate__animated animate__fadeIn">{{ professor.campoDesconto }}</td>
            <td class="text-left px-3 w-64 animate__animated animate__fadeIn">R$ {{ professor.valor % 1 === 0 ? professor.valor + ',00' : professor.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td> -->
            <td class="animate__animated animate__fadeIn w-56 text-center">
              <!-- <span  @click="$emit('delete', professor.id)" class="material-symbols-outlined text-[18px] text-white px-2 bg-red-300 items-center p-2 mx-1 rounded drop-shadow-md cursor-pointer hover:bg-red-500">
                delete_sweep
              </span>
              <span  @click="$emit('edit', professor.id)" class="material-symbols-outlined text-[18px] text-white px-2 bg-blue-300 items-center p-2 mx-1 rounded drop-shadow-md cursor-pointer hover:bg-blue-500">
                edit
              </span> -->
                <span @click="$emit('toggleStatus', professor.id)"
                  :class="`material-symbols-outlined text-[18px] text-white px-1 items-center p-1 mx-1 rounded drop-shadow-md cursor-pointer hover:bg-gray-500 ${professor.status ? 'bg-green-300' : 'bg-gray-300'}`"
                  v-tooltip="'ativar'">
                  key
                </span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="inactiveProfessors.length === 0" class="p-3 text-center text-gray-500">
        <img src="/img/no-data.svg" alt="Sem dados" width="600" class="mx-auto animate__animated animate__fadeIn">
        <p class="pt-4 text-gray-400">Ops.. nenhum dado encontrado.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watchEffect, ref, computed } from 'vue';

// ##################################################### PRIMEIRA TABELA DA (ATIVOS)
let activePageOn = ref(1);

let totalPagesOn = computed(() => Math.ceil(activeProfessors.value.length / 5));

let paginatedActiveProfessors = computed(() => {
  let start = (activePageOn.value - 1) * 5;
  let end = start + 5;
  return activeProfessors.value.slice(start, end);
});

// const openWhatsApp = (number) => {
//   const url = `https://api.whatsapp.com/send?phone=${number}&text=Ol%C3%A1!%20Estou%20com%20algumas%20d%C3%BAvidas.`;
//   window.open(url, '_blank');
//   emit('edit', number);
// };

const prevPageTableOn = () => {
  if (activePageOn.value > 1) {
    activePageOn.value--;
  }
};

const nextPageTableOn = () => {
  if (activePageOn.value < totalPagesOn.value) {
    activePageOn.value++;
  }
};
// ##################################################### PRIMEIRA TABELA DA (ATIVOS)

// ##################################################### SEGUNDA TABELA DA (ATIVOS)
let activePage = ref(1);

let totalPages = computed(() => Math.ceil(inactiveProfessors.value.length / 5));

let paginatedInativeProfessors = computed(() => {
  let start = (activePage.value - 1) * 5;
  let end = start + 5;
  return inactiveProfessors.value.slice(start, end);
});

const prevPageTableTwo = () => {
  if (activePage.value > 1) {
    activePage.value--;
  }
};

const nextPageTableTwo = () => {
  if (activePage.value < totalPages.value) {
    activePage.value++;
  }
};
// ##################################################### SEGUNDA TABELA DA (ATIVOS)


const props = defineProps({
  getDataTable: Function,
  tgringaRoupas: Array,
  formatDate: Function,
  searchQuery: String,
  selectedStatus: String,
});

const professorImageURL = (professor) => {
  if (!professor.fileName) {
    const img = '/img/no-img.webp'
    return `${img}`;
  }

  const userId = localStorage.getItem('userId');
  return `${import.meta.env.VITE_MARCA_URL}${userId}/${professor.fileName}`;
};

const searchQuery = ref('');

const filteredProfessors = ref([]);

const activeProfessors = computed(() => {
  return props.tgringaRoupas.filter(professor => professor.status && professor.marca.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const inactiveProfessors = computed(() => {
  return props.tgringaRoupas.filter(professor => !professor.status && professor.marca.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

watchEffect(() => {
  0
  filterProfessors();
});

function filterProfessors() {
  const query = searchQuery.value.toLowerCase();

  if (!query) {
    filteredProfessors.value = props.tgringaRoupas;
    return;
  }

  const filtered = props.tgringaRoupas.filter((professor) => {
    return professor.marca.toLowerCase().includes(query);
  });

  filteredProfessors.value = filtered;
}
</script>
<style scoped>
.led-on {
  margin: 20px auto;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #80FF00;
  box-shadow: inset #5bb600 0 -1px 10px 1px;
}

.led-off {
  margin: 20px auto;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #ff0000;
  box-shadow: inset #982e2e 0 -1px 10px 1px;
}
</style>