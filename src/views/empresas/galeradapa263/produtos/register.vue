<template>
  <div v-show="isVisible" class="bg-zinc-900 p-6 rounded-xl drop-shadow-md text-gray-300 animate__animated animate__fadeIn">
    <h2 class="text-xl font-semibold mb-6 text-white">Cadastrar Novo Item</h2>
    
    <!-- Grid principal -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <!-- NOME -->
      <div class="space-y-2">
        <label for="nome" class="block text-sm font-medium text-gray-400">NOME</label>
        <input
          id="nome"
          v-model="professor.nome"
          type="text"
          class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <!-- MARCA -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-400">MARCA</label>
        <div class="custom-select w-full">
          <div @click="toggleDropdown" class="select-header bg-zinc-800 border border-zinc-700 text-gray-300 rounded">
            {{ selectedItem ? selectedItem.marca : 'Selecione um item' }}
            <span class="arrow" :class="{ 'arrow-up': isOpen }">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </div>
          <div v-if="isOpen" class="options-container bg-zinc-800 border border-zinc-700 rounded-b">
            <div class="options-list">
              <div v-for="marca in reversedMarcas" :key="marca.id" @click="selectItem(marca)" class="option hover:bg-zinc-700">
                {{ marca.marca }}
              </div>
            </div>
            <div class="add-item text-emerald-500 hover:bg-zinc-700" @click="addItem">
              Adicionar item
            </div>
          </div>
        </div>
      </div>

      <!-- DESTAQUE -->
      <div class="space-y-2">
        <label for="destaque" class="block text-sm font-medium text-gray-400">DESTAQUE</label>
        <div class="relative">
          <select
            id="destaque"
            v-model="professor.destaque"
            class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- TOTAL MODELO -->
      <div class="space-y-2">
        <label for="totalModelo" class="block text-sm font-medium text-gray-400">
          TOTAL MODELO <span class="text-white">(no estoque)</span>
        </label>
        <input
          id="totalModelo"
          v-model="professor.totalModelo"
          type="text"
          min="0"
          max="99"
          class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <!-- VALOR -->
      <div class="space-y-2">
        <label for="valor" class="block text-sm font-medium text-gray-400">VALOR</label>
        <div class="relative">
          <input
            id="valor"
            v-model="formattedCarteiraTotal"
            type="text"
            placeholder="R$ 0,00"
            class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button 
            @click="clearMoney" 
            class="absolute inset-y-0 right-0 px-3 flex items-center justify-center bg-red-500 text-white font-medium rounded-r hover:bg-red-600 transition-colors"
          >
            X
          </button>
        </div>
      </div>

      <!-- CODIGO PRODUTO -->
      <div class="space-y-2">
        <label for="codProduto" class="block text-sm font-medium text-gray-400">
          CODIGO PRODUTO <span class="text-emerald-500">*</span>
        </label>
        <input
          id="codProduto"
          v-model="professor.codProduto"
          type="text"
          min="0"
          max="99"
          class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <!-- CAMPO DESCONTO -->
      <div class="space-y-2">
        <label for="campoDesconto" class="block text-sm font-medium text-gray-400">CAMPO DESCONTO</label>
        <div class="relative">
          <input
            id="campoDesconto"
            v-model="professor.campoDesconto"
            type="number"
            class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            @input="formatDiscountField"
          />
          <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
            %
          </span>
        </div>
      </div>

      <!-- TIPO -->
      <div class="space-y-2">
        <label for="tipo" class="block text-sm font-medium text-gray-400">TIPO</label>
        <div class="relative">
          <select
            id="tipo"
            v-model="professor.tipo"
            class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="ervamate">Erva Mate</option>
            <option value="bombaterere">Bomba Terere</option>
            <option value="copoterere">Copo Terere</option>
            <option value="garrafasinox">Garrafas Inox</option>
            <option value="canivetesfacas">Canivetes e Facas</option>
            <option value="bonestexasfarm">Bones Texas Farm</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- ESTRELAS -->
      <div class="space-y-2">
        <label for="estrela" class="block text-sm font-medium text-gray-400">ESTRELAS</label>
        <div class="relative">
          <select
            id="estrela"
            v-model="professor.estrela"
            class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="1">1 estrela</option>
            <option value="2">2 estrelas</option>
            <option value="3">3 estrelas</option>
            <option value="4">4 estrelas</option>
            <option value="5">5 estrelas</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- DESCRIÇÃO - Ocupa 2 colunas -->
      <div class="space-y-2 md:col-span-2">
        <label for="descricao" class="block text-sm font-medium text-gray-400">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          v-model="professor.descricao"
          rows="3"
          class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
        ></textarea>
      </div>
    </div>

    <!-- Seção de imagens -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-t border-zinc-700 pt-6">
      <!-- Já possuo uma imagem -->
      <div class="space-y-4">
        <div class="flex items-center">
          <h3 class="text-white font-medium">Já possuo uma imagem para</h3>
          <button 
            v-if="!previewImage && !imagemCortada" 
            @click="imagemPronta" 
            class="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>

        <!-- <div class="m-2">
          <p>image_one:</p>
          <input
            class="bg-gray-200 rounded drop-shadow-lg border-solid border-[1px] border-slate-400 px-2 py-1 text-gray-500 focus:outline-none"
            v-model="professor.image_one" type="text" name="image_one" label="Formação *" id="image_one" readonly />
          <input type="file" @change="onFileChange" />
          <div v-if="imagePreview">
            <img class="previd" :src="imagePreview" alt="Image Preview" />
            <button @click="removeImage">Remove Image</button>
          </div>
        </div> -->
        
        <div v-if="imagemCortada" class="animate__animated animate__fadeIn">
          <div v-if="previewImage" class="mb-3">
            <img :src="previewImage" class="w-52 h-auto rounded border border-zinc-700" alt="Preview" />
            <input type="hidden" v-model="professor.fileName">
            <button 
              @click="apagaImage" 
              class="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm transition-colors"
            >
              Excluir
            </button>
          </div>
          
          <div 
            v-else 
            @click="executeInput" 
            class="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500 transition-colors"
          >
            <div class="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-zinc-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-sm font-medium text-gray-300 mb-1">Selecionar arquivo</p>
              <p class="text-xs text-gray-500">.png | .jpeg</p>
            </div>
            <input 
              ref="fileInput"
              type="file" 
              class="hidden" 
              @change="handleFileChange" 
              accept="image/png, image/jpeg"
            >
          </div>
        </div>
      </div>
      
      <!-- Corte sua imagem -->
      <div v-if="!tenhoImage" class="flex items-start">
        <CutImage />
      </div>
    </div>

    <!-- Botões de ação -->
    <div class="flex justify-end gap-3 border-t border-zinc-700 pt-6">
      <button 
        @click="handleCancel" 
        class="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-gray-300 rounded transition-colors"
      >
        Cancelar
      </button>
      <button 
        @click="registerProfessor" 
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
      >
        Cadastrar Agora
      </button>
    </div>

    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme" />
    </Notivue>
  </div>
</template>

<script setup>
import { addMarca } from '@/service/galeradapa263/marcasGaleraDaPa263Service.js';
import { Notivue, Notification, pastelTheme, push } from 'notivue';
import CutImage from './CutImage.vue';
import { ref, computed } from 'vue';

const props = defineProps(['professor', 'marcas', 'isVisible']);
const emit = defineEmits(['register', 'cancel', 'push-marca', 'uploadImage']);

// Refs
const fileInput = ref(null);
const imagemCortada = ref(false);
const tenhoImage = ref(false);
const selectedFile = ref('');
const previewImage = ref('');
const imagePreview = ref('');
const isOpen = ref(false);
const selectedItem = ref(null);

// Dropdown functions
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectItem = (item) => {
  selectedItem.value = item;
  props.professor.marca = item.marca;
  isOpen.value = false;
};

const reversedMarcas = computed(() => {
  return props.marcas.slice().reverse();
});

// Add new marca
async function addItem() {
  isOpen.value = false;
  const marca = prompt('Digite o nome da nova marca');
  if (marca) {
    const newEmployeeData = {
      marca: marca,
    };
    const response = await addMarca(newEmployeeData);
    emit('push-marca', response);
  }
}

// Image handling functions
const executeInput = () => {
  fileInput.value.click();
};

const apagaImage = () => {
  imagemCortada.value = !imagemCortada.value;
  tenhoImage.value = !tenhoImage.value;
  props.professor.fileName = '';
  previewImage.value = '';
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      props.professor.image_one = base64Image;
      imagePreview.value = base64Image;
    };
    reader.readAsDataURL(file);
  } else {
    push.error('Faça upload de um arquivo de imagem válido');
  }
};

const removeImage = () => {
  props.professor.image_one = '';
  imagePreview.value = '';
};

// Format functions
const formatDiscountField = (event) => {
  let inputValue = event.target.value;
  inputValue = inputValue.replace(/[^ -]+/g, '');
  inputValue = inputValue.substring(0, 2);
  props.professor.campoDesconto = inputValue;
};

const formattedCarteiraTotal = computed({
  get: () => {
    let valor = props.professor.valor;
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  },
  set: (newValue) => {
    const value = parseFloat(newValue.replace(/\D/g, '')) / 100;
    props.professor.valor = value;
  },
});

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  props.professor.fileName = selectedFile.value.name;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Image = e.target.result;
    previewImage.value = base64Image;
    props.professor.image_one = base64Image;
    emit('uploadImage', selectedFile.value, previewImage.value);
  };
  reader.readAsDataURL(selectedFile.value);

  event.target.value = null;
};

const imagemPronta = () => {
  imagemCortada.value = !imagemCortada.value;
  tenhoImage.value = !tenhoImage.value;
};

const handleCancel = () => {
  if (imagemCortada.value) {
    imagemCortada.value = !imagemCortada.value;
    tenhoImage.value = !tenhoImage.value;
  }
  selectedItem.value = null;
  selectedFile.value = null;
  previewImage.value = '';
  emit('cancel');
};

const clearMoney = () => {
  props.professor.valor = '';
};

const registerProfessor = async () => {
  if (!props.professor.fileName) {
    return;
  }
  try {
    const formData = new FormData();
    formData.append('file', props.professor.fileName);
    emit('register', formData);
    selectedFile.value = null;
    previewImage.value = '';
  } catch (error) {
    console.error('Erro durante o upload:', error);
  }
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Custom select styling */
.custom-select {
  position: relative;
  width: 100%;
}

.select-header {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(180deg);
}

.options-container {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: 2px;
}

.options-list {
  max-height: 200px;
  overflow-y: auto;
}

.option {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.add-item {
  padding: 0.5rem 1rem;
  border-top: 1px solid #3f3f46;
  cursor: pointer;
  font-weight: 500;
}
</style>