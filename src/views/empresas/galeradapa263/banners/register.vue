<template>
  <div v-show="isVisible" class="bg-zinc-900 p-6 rounded-xl drop-shadow-md text-gray-300 animate__animated animate__fadeIn">
    <h2 class="text-xl font-semibold mb-6 text-white">Cadastrar Novo Item</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
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

      <div class="space-y-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        <label for="descricao" class="block text-sm font-medium text-gray-400">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          v-model="professor.descricao"
          rows="3"
          class="w-full bg-zinc-800 rounded px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
        ></textarea>
      </div>

    </div>


    <div class="flex flex-wrap justify-between">
     

      <!-- <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">CATEGORIA</p>
        <select
          class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full cursor-pointer"
          v-model="professor.categoria" name="tipo" id="tipo">
          <option value="camisamasculina">Camisa masculina</option>
          <option value="camisafeminina">Camisa feminina</option>
          <option value="tenismasculino">Tênis masculino</option>
          <option value="tenisfeminino">Tênis feminino</option>
          <option value="tenismasculino">Sandália masculino</option>
          <option value="tenisfeminino">Sandália feminina</option>
          <option value="bone">Boné</option>
        </select>
      </div> -->

      <!-- <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">DESCRIÇÃO</p>
        <textarea class="resize-none bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full" v-model="professor.descricao" type="text" name="descricao" label="Formação *" id="descricao">
          </textarea>
      </div> -->
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
    
    <div class="m-2 w-full flex justify-end mb-4 gap-4">
      <button @click="registerProfessor" class="bg-blue-500 px-3 rounded text-white text-[13px] py-1 mr-2">
        Cadastrar Agora
      </button>
      <button @click="handleCancel" class="bg-gray-500 text-gray-300 px-3 rounded text-[13px] py-1 mr-2" type="button">
        Cancelar
      </button>
    </div>

    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme"  />
    </Notivue>
  </div>
</template>

<script setup>
import { Notivue, Notification, pastelTheme, push } from 'notivue';
import CutImage from './CutImage.vue'
import { ref } from 'vue';
const props = defineProps(['professor', 'marcas', 'isVisible']);
const emit = defineEmits(['register', 'cancel', 'push-marca', 'uploadImage']);

let fileInput = ref(null);
const imagemCortada = ref(false);
const tenhoImage = ref(false);
const selectedFile = ref('');
const previewImage = ref('');


const selectedItem = ref(null);


const executeInput = () => {
  fileInput.value.click();
};

const apagaImage = () => {
  imagemCortada.value = !imagemCortada.value;
  tenhoImage.value = !tenhoImage.value;
  props.professor.fileName = '';
  previewImage.value = '';
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  props.professor.fileName = selectedFile.value.name;

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
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

.previd {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
}

</style>