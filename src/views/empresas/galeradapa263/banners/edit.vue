<template>
  <div v-show="isVisible" class="bg-gray-50 rounded-xl drop-shadow-lg text-gray-400 border-gray-200 animate__animated animate__fadeIn" style=" box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;overflow:hidden !important;">
    <div class="grid grid-flow-row-dense grid-cols-3">
      <div class="m-2 col-span-1">
        <p class="text-[13px]">NOME</p>
        <input class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full"
          v-model="professor.nome" type="text" name="name" label="Nome completo *" placeholder="Nome Completo"
          id="nome" />
      </div>
      
      <div class="m-2 col-span-1">
        <p class="text-[13px]">DESCRIÇÃO</p>
        <input class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full"
          v-model="professor.descricao" type="text" name="descricao" label="Formação *" placeholder="Formação"
          id="descricao" />
      </div>

      <div class="m-2 col-span-1">
        <p class="text-[13px]">CATEGORIA</p>
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
      </div>

    </div>
    <div class="grounded m-8 rounded-md">
      <p class="text-center  font-bold">PREVIEW DE DADOS</p>
      <div class="flex gap-5 items-center justify-center p-8 bg-[#e9e9e9] rounded-md max-w-[550px] mx-auto my-5 drop-shadow-lg">
        <div class="flex flex-col items-center justify-center">
          <img v-if="professor.fileName === ''" src="/img/no-img-edit.webp" alt=""
            class="rounded-xs mx-auto drop-shadow-md" width="260">
          <img :src="previewImage || professorImageURL(professor)" @error="handleImageError"
            class="rounded-md mx-auto drop-shadow-md" width="260" v-else />
          <p class="text-center py-1 px-3 rounded text-gray-500 relative">{{ professor.nome }}</p>
        </div>
        <div class="bg-[#9b9b9b21] p-5 rounded-md w-full text-gray-600">
          <p class="py-1">Descrição: {{ professor.descricao }}</p>
          <p class="py-1">Marca: {{ professor.marca }}</p>
          <p class="py-1">Total Modelo: {{ professor.totalModelo }}</p>
          <p class="py-1">Campo desconto: {{ professor.campoDesconto }}</p>
          <p class="py-1">Tipo: {{ professor.tipo }}</p>
          <img :src="professor.image_one" class="w-52" />
        </div>
      </div>

      <div v-if="professor.fileName" class=" max-w-[320px] mx-auto flex justify-around">
        <div>
          <button  @click="handleDeleteImage"
            class="bg-red-500 py-1 px-3 rounded text-white text-[13px] mr-2" type="button">
            Deletar Imagem
          </button>
          <input type="hidden" v-model="professor.fileName">
        </div>
      </div>

      <div v-if="!professor.fileName" class="justify-center items-center py-5">
        <div class="animate__animated animate__fadeIn">   
          <div  @click="executeInput" class="w-40 mx-auto my-4 bg-[#151617] hover:bg-[#151620] hover:border hover:border-1 border-[#6464648c] border border-1 hover:border-gray-500 rounded-md cursor-pointer flex items-center justify-between p-3">
            <!-- SUBIR IMAGEM -->
            <img src="@/assets/nuvem.svg" alt="upload" class="w-6">
            <div class="w-full flex flex-col text-end text-xs">
              <p>Selecionar arquivo</p>
              <p class="text-xs">.png | jpeg</p>
            </div>
            <input v-show="false" type="file" name="upload" accept="image/png, image/jpeg" ref="fileInput" @change="handleFileChange">
            <!-- SUBIR IMAGEM -->
          </div>
        </div>
      </div>
    </div>
    <div class="m-2 gap-4">
      <button @click="handleUpdate" class="bg-blue-500 py-1 px-3 rounded text-white text-[13px] mr-2" type="button">
        Atualizar
      </button>
      <button @click="$emit('cancel')" class="bg-gray-500 py-1 px-3 rounded text-gray-300 text-[13px] mr-2"
        type="button">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['professor', 'marcas', 'isVisible']);
const emit = defineEmits(['update', 'cancel', 'uploadImage', 'deleteImage']);
let fileInput = ref(null);

const professorImageURL = (professor) => {
  let userId = localStorage.getItem('userId');
  return `${import.meta.env.VITE_BANNERS_URL}${userId}/${professor.fileName}`;
};

const executeInput = () => {
  fileInput.value.click();
};

const imageError = ref(false);
const selectedFile = ref(null);
const isImageDeleted = ref(false);
const previewImage = ref('');


const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const uploadResult = await emit('uploadImage', file, props.professor.fileName);
    if (uploadResult) {
      props.professor.fileName = uploadResult.path;
    }
    previewImage.value = URL.createObjectURL(file);
  }
};


const handleImageError = () => {
  imageError.value = true;
};

const handleUpdate = async () => {
  if (selectedFile.value) {
    const uploadResult = await emit('uploadImage', selectedFile.value, props.professor.fileName);
    if (uploadResult) {
      props.professor.fileName = uploadResult.path;
    }
    previewImage.value = '';
  }
  emit('update');
};

const handleDeleteImage = () => {
  emit('deleteImage', props.professor.fileName);
  isImageDeleted.value = true;
  previewImage.value = '';
};
</script>

<style>
.grounded {
  /* background-image: url('../../assets/fundo.png'); */
  background-repeat: no-repeat;
  background-size: cover;
}
/* custom select */

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
</style>