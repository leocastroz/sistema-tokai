<template>
  <div v-show="isVisible" class="bg-red-300 p-5 rounded-xl drop-shadow-md text-gray-400 animate__animated animate__fadeIn" style="box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;">
    <div class="flex flex-wrap justify-between">
      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-full mb-4">
        <p class="text-[13px] py-1">MARCA</p>
        <input
          class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full" v-model="professor.marca" type="text" name="name" label="Nome completo *" id="nome" />
      </div>
      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">LINK IMG</p>
        <textarea class="resize-none bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full" v-model="professor.link_img" type="text" name="descricao" label="Formação *" id="descricao">
          </textarea>
      </div>
    </div>
    
    <div class="flex w-full justify-around py-5">
      <div class="grid justify-center items-center">
        <div class="justify-center items-center py-5">
          <p><span class="text-white">Já possuo</span> uma imagem para <span v-if="!previewImage" @click="imagemPronta" class="bg-blue-500 py-1 px-2 rounded-full text-md cursor-pointer text-white mx-1">+</span></p>
          <div v-if="imagemCortada" class="animate__animated animate__fadeIn">
            <img :src="previewImage" class="w-52 rounded" />
            <input type="hidden" v-model="professor.fileName">
       
            <div v-if="!previewImage" @click="executeInput" class="my-4 bg-[#151617] hover:bg-[#6464648c] hover:border hover:border-1 border-[#6464648c] border border-1 hover:border-gray-500 rounded-md cursor-pointer flex flex-col items-center justify-between p-3">
              <!-- SUBIR IMAGEM -->
              <img src="@/assets/nuvem.svg" alt="upload" class="w-14 mb-3">
              <p>Selecionar arquivo</p>
              <p class="text-xs">.png | jpeg</p>
              <input v-show="false" type="file" name="upload" class="prove inline-block z-10 w-full top-0 left-0 opacity-0 rounded-xs cursor-pointer" @change="handleFileChange" accept="image/png, image/jpeg" ref="fileInput">
              <!-- SUBIR IMAGEM -->
            </div>
            <button v-if="previewImage" @click="apagaImage" class="bg-red-500 text-red-100 px-2 rounded my-3">excluir</button>
          </div>
        </div>
      </div>
      <div v-if="!tenhoImage" class="flex items-center">
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
import { ref, computed } from 'vue';
const props = defineProps(['professor', 'isVisible']);
const emit = defineEmits(['register', 'cancel', 'push-marca', 'uploadImage']);

let fileInput = ref(null);
const imagemCortada = ref(false);
const tenhoImage = ref(false);
const selectedFile = ref('');
const previewImage = ref('');
const imagePreview = ref('');

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
      props.professor.image_one = e.target.result;
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    push.error('Faça upload de um arquivo de imagem válido');
  }
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

select option {
  cursor: pointer;
}

select option[value] {
  border-radius: 30px;
  background: #747474;
  color: #b9b9b9;
}

.previd {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
}

/* custom select */
/* 
.custom-select {
  position: relative;
  width: 200px;
  font-family: Arial, sans-serif;
}

.select-header {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: white;
  z-index: 1;
}

.options-list {
  max-height: 200px;
  overflow-y: auto;
}

.option {
  padding: 10px;
  cursor: pointer;
}

.option:hover, .option.selected {
  background-color: #f0f0f0;
}

.add-item {
  padding: 10px;
  border-top: 1px solid #ccc;
  cursor: pointer;
  color: blue;
}

.add-item:hover {
  background-color: #f0f0f0;
}
 */
</style>