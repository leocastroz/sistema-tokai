<template>
  <div v-show="isVisible" class="bg-red-300 p-5 rounded-xl drop-shadow-md text-gray-400 animate__animated animate__fadeIn" style="box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;">
    <div class="flex flex-wrap justify-between">
      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-full mb-4">
        <p class="text-[13px] py-1">NOME</p>
        <input
          class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full" v-model="professor.nome" type="text" name="name" label="Nome completo *" id="nome" />
      </div>

      <div class="custom-select">
        <div @click="toggleDropdown" class="select-header">
          {{ selectedItem ? selectedItem.marca : 'Selecione um item' }}
          <span class="arrow" :class="{ 'arrow-up': isOpen }"><i class="fa-solid fa-chevron-down"></i></span>
        </div>
        <div v-if="isOpen" class="options-container">
          <div class="options-list">
            <div v-for="marca in reversedMarcas" :key="marca.id" @click="selectItem(marca)" class="option" :class="{ 'selected': selectedItem === marca }">
              {{ marca.marca }}
            </div>
          </div>
          <div class="add-item" @click="addItem">
            Adicionar item
          </div>
        </div>
      </div>


      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">TOTAL MODELO <span class="text-white">(no estoque)</span></p>
        <input class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full"
          v-model="professor.totalModelo" type="text"  min="0"
          max="99" name="totalModelo" label="totalModelo *" id="totalModelo" />
      </div>
      <!-- <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">VALOR</p>
        <input class="bg-[#6464648c] rounded drop-shadow-lgpx-2 py-1 text-gray-400 focus:outline-none w-full" 
        v-model="formattedCarteiraTotal" type="text" name="campoDesconto" label="campoDesconto *" id="campoDesconto" />
      </div> -->
      <div class="m-2">
        <p>image_one:</p>
        <input
          class="bg-gray-200 rounded drop-shadow-lg border-solid border-[1px] border-slate-400 px-2 py-1 text-gray-500 focus:outline-none"
          v-model="professor.image_one" type="text" name="image_one" label="Formação *" id="image_one" readonly />
        <input type="file" @change="onFileChange" />
        <div v-if="imagePreview">
          <img class="previd" :src="imagePreview" alt="Image Preview" />
          <button @click="removeImage">Remove Image</button>
        </div>
      </div>
      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">VALOR</p>
        <div class="relative">
          <input
            class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full" v-model="formattedCarteiraTotal" type="text" name="campoDesconto" label="campoDesconto *" id="campoDesconto" placeholder="R$ 0,00"
          />
          <span @click="clearMoney" class="absolute inset-y-0 right-0 rounded px-3 text-xs flex items-center text-black font-bold bg-red-400 justify-center cursor-pointer">
            X
          </span>
        </div>
      </div>
      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">CAMPO DESCONTO aa</p>
        <div class="relative">
          <input
            class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full"
            v-model="professor.campoDesconto"
            type="number"
            min="0"
            max="99"
            name="campoDesconto"
            label="campoDesconto *"
            id="campoDesconto"
            @input="formatDiscountField"
          />
          <span class="absolute inset-y-0 right-0 pr-3 flex items-center text-white">
            %
          </span>
        </div>
      </div>
      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">TIPO</p>
        <select
          class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full cursor-pointer"
          v-model="professor.tipo" name="tipo" id="tipo">
          <option value="camisamasculina">Camisa masculina</option>
          <option value="camisafeminina">Camisa feminina</option>
          <option value="tenismasculino">Tênis masculino</option>
          <option value="tenisfeminino">Tênis feminino</option>
          <option value="tenismasculino">Sandália masculino</option>
          <option value="tenisfeminino">Sandália feminina</option>
          <option value="bone">Boné</option>
        </select>
        <!-- <input
          class="bg-gray-50 rounded drop-shadow-lg border-solid border-[1px] border-slate-400 px-2 py-1 text-gray-400 focus:outline-none w-full"
          v-model="professor.tipo" type="text" name="tipo" label="tipo *" id="tipo" /> -->
      </div>
      <div class="m-2 w-full sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4">
        <p class="text-[13px] py-1">DESCRIÇÃO</p>
        <textarea class="resize-none bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full" v-model="professor.descricao" type="text" name="descricao" label="Formação *" id="descricao">
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
import { addMarca } from '@/service/postorota/marcasPostoRotaService.js';
import { Notivue, Notification, pastelTheme, push } from 'notivue';
import CutImage from './CutImage.vue'
import { ref, computed } from 'vue';
const props = defineProps(['professor', 'marcas', 'isVisible']);
const emit = defineEmits(['register', 'cancel', 'push-marca', 'uploadImage']);

let fileInput = ref(null);
const imagemCortada = ref(false);
const tenhoImage = ref(false);
const selectedFile = ref('');
const previewImage = ref('');
const imagePreview = ref('');
const isOpen = ref(false);
const selectedItem = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectItem = (item) => {
  isOpen.value = !isOpen.value
  selectedItem.value = item;
  props.professor.marca = item.marca;
}

const reversedMarcas = computed(() => {
  return props.marcas.slice().reverse();
});

async function addItem() {
  isOpen.value = !isOpen.value
  const marca = prompt('Digite o nome da nova marca');
  if (marca) {
    const newEmployeeData = {
      marca: marca,
    };
    const response = await addMarca(newEmployeeData);
    console.log('response', response);
    emit('push-marca', response);
  }
};

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

const removeImage = () => {
  props.professor.image_one = '';
  imagePreview.value = '';
};

const formatDiscountField = (event) => {
  let inputValue = event.target.value;
  // Remove todos os caracteres não numéricos, exceto %
  inputValue = inputValue.replace(/[^\d%]/g, '');
  // Remove todos os % exceto o primeiro
  /*inputValue = inputValue.replace(/%/g, (match, offset, string) => {
    return offset === string.indexOf('%') ? '%' : '';
  });*/
  // Limita o campo a dois números
  inputValue = inputValue.substring(0, 2);
  props.professor.campoDesconto = inputValue; // Atualiza o valor do campo de desconto
};

// const formattedCarteiraTotal = computed({
//   get: () => props.professor.valor,
//   set: (newValue) => {
//     const value = parseFloat(newValue.replace(/\D/g, '')) / 100;
//     const formatter = new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL',
//     });
//     props.professor.valor = formatter.format(value);
//   },
// });


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

// const formattedCarteiraTotal = computed({
//   get: () => props.professor.valor,
//   set: (newValue) => {
//     const value = parseFloat(newValue.replace(/\D/g, '')) / 100;
//     props.professor.valor = value;
//   },
// });

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

const clearMoney = () => {
  props.professor.valor = '';
};

const registerProfessor = async () => {
  // if (!props.professor.fileName) {
  //   return;
  // }
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


/*  */

</style>