<template>
  <div v-show="isVisible" class="bg-gray-50 rounded-xl drop-shadow-lg text-gray-400 border-gray-200 animate__animated animate__fadeIn" style=" box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;overflow:hidden !important;">
    <div class="flex flex-wrap justify-between">
      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-full mb-4">
        <p class="text-[13px] py-1">NOME COMPLETO: *</p>
        <input class="bg-[#6464648c] capitalize rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 focus:outline-none w-full" v-model="professor.nome" type="text" name="name" label="Nome completo *" id="nome" />
      </div>

      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-full mb-4">
        <p class="text-[13px] py-1">PROFISSAO: *</p>
        <input class="bg-[#6464648c] capitalize rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 focus:outline-none w-full" v-model="professor.formacao" type="text" name="formacao" label="Formacao *" id="formacao" />
      </div>

      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-full mb-4">
        <p class="text-[13px] py-1">EMAIL: *</p>
        <input class="bg-[#6464648c] lowercase rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 focus:outline-none w-full" v-model="professor.email" type="text" name="email" label="Email *" id="email" placeholder="Ex: teste@gmail.com" />
      </div>


      <div class="m-2 col-span-1">
        <p class="text-[13px]">NÚMERO TEL: *</p>
        <input
          class="bg-[#6464648c] rounded drop-shadow-lg border-solid border-[1px] border-slate-400 px-2 py-1 text-gray-400 focus:outline-none w-full"
          v-model="professor.whatsapp" v-maska="'+55 (##) #####-####'" type="text" name="name" label="Nome completo *" id="whatsapp" />
      </div>
      <!-- <div class="m-2">
            <p>Número:</p>
            <input
              class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full  focus:outline-none"
              v-model="professor.whatsapp" type="text" name="name" label="Nome completo *" id="whatsapp" />
          </div> -->
      <div class="m-2 col-span-1">
        <p class="text-[13px]">DESCRIÇÃO</p>
        <input class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full"
          v-model="professor.descricao" type="text" name="descricao" label="Formação *" placeholder="Formação"
          id="descricao" />
      </div>

      <div class="m-2 col-span-1">
        <p class="text-[13px]">CPF</p>
        <input class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full"
          v-model="professor.cpf" type="text" name="cpf" label="cpf *" placeholder="CPF" id="cpf" v-maska="'###.###.###-##'" />
      </div>

      <!-- <div class="m-2 col-span-1">
        <p class="text-[13px]">DATA DE NASCIMENTO: *</p>
        <input class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full"
          v-model="professor.data_nascimento" type="text" name="data_nascimento" label="Formação *"
          placeholder="data_nascimento" id="campoDescodata_nascimentonto" />
      </div> -->

      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">DATA DE NASCIMENTO: *</p>
        <div class="relative">
          <input
            class="bg-[#6464648c] rounded drop-shadow-lg border-solid border-[1px] border-slate-400 p-2 text-gray-400 focus:outline-none w-full"
            v-model="professor.data_nascimento"
            v-maska="'##/##/####'"
            name="data_nascimento"
            label="data_nascimento *"
            id="data_nascimento"
          />
        </div>
      </div>

      <div class="m-2 col-span-1">
        <p class="text-[13px]">GÊNERO</p>
        <select
          class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full cursor-pointer"
          v-model="professor.tipo" name="tipo" id="tipo">
          <option value="masculino">MASCULINO</option>
          <option value="feminino">FEMININO</option>
          <option value="outros">OUTROS</option>
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
          <p class="py-1">Whatsapp: {{ professor.whatsapp }}</p>
          <p class="py-1">cpf: {{ professor.cpf }}</p>
          <p class="py-1">DATA DE NASCIMENTO: {{ professor.data_nascimento }}</p>
          <p class="py-1">Tipo: {{ professor.tipo }}</p>
        </div>
      </div>

      <div v-if="professor.fileName" class=" max-w-[320px] mx-auto flex justify-around">
        <div>
          <button  @click="handleDeleteImage"
            class="bg-red-500 py-1 px-3 rounded text-white text-[13px] mr-2" type="button">
            Deletar Imagem
          </button>
          <!-- <input v-if="!professor.fileName || isImageDeleted" class="m-2" type="file" name="upload"  @change="handleFileChange"> -->
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
import { vMaska } from "maska/vue";
import { ref, computed } from 'vue';

const props = defineProps(['professor', 'isVisible']);
const emit = defineEmits(['update', 'cancel', 'uploadImage', 'deleteImage']);
let fileInput = ref(null);

const professorImageURL = (professor) => {
  let userId = localStorage.getItem('userId');
  return `${import.meta.env.VITE_AVATAR_URL}${userId}/${professor.fileName}`;
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

const clearMoney = () => {
  props.professor.valor = '';
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

</style>