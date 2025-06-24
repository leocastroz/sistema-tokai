<template>
  <div class="w-full">
    <p class="py-4"><span class="text-white">Corte sua imagem</span>, antes do upload <span @click="imagemPronta" class="bg-blue-500 py-1 px-2 rounded-full text-md cursor-pointer text-white mx-1">+</span></p>
    <input v-show="false" type="file" accept="image/png, image/jpeg" ref="fileInput" @change="onFileChange" />
    <div v-if="mostrarModal" class="w-full absolute top-0 left-0 flex justify-center bg-[#151617] border border-1 border-gray-500 rounded-md p-5" style="    height: -webkit-fill-available !important;">
    
      <div v-if="imageUrl">
        <vue-cropper ref="cropper" :src="imageUrl" :options="cropperOptions" style="width: 400px; height: 400px;" />
        <div class="flex items-center justify-center gap-10 my-3">
          <p @click="cropImage" class="bg-blue-300 py-1 px-3 rounded-md cursor-pointer">Cortar imagem</p>
          <p @click="cancelarCrop" class="bg-blue-500 py-1 px-3 rounded-md cursor-pointer">Cancelar corte</p>
        </div>
        <p v-if="cropWidth && cropHeight">Dimensões do corte: {{ cropWidth }}px x {{ cropHeight }}px</p>
      </div>
    </div>
    <div v-if="croppedImageUrl" class="w-full h-full absolute top-0 left-0 grid justify-center bg-[#151617] border border-1 border-gray-500 rounded-md p-5">
      <img :src="croppedImageUrl" alt="Imagem cortada"  style="width: 400px; height: 400px;" />
      <div class="flex items-center justify-center gap-10 my-3">
        <a @click="baixarNow" :href="croppedImageUrl" :download="imageName" class="cursor-pointer">Baixar imagem cortada</a>
        <p @click="cancelarCrop" class="bg-red-300 cursor-pointer">cancelar</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

const imageUrl = ref(null);
const croppedImageUrl = ref(null);
const imageName = ref(null);
const cropperOptions = {
  aspectRatio: 1,
  viewMode: 1,
};

const mostrarModal = ref(false);

const cropper = ref(null);

const fileInput = ref(null);

const imagemPronta = () => {
  fileInput.value.click();
};

const cancelarCrop = () => {
  mostrarModal.value = false;
  imageUrl.value = '';
  croppedImageUrl.value = false;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const onFileChange = (e) => {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };
  reader.readAsDataURL(files[0]);
  imageName.value = files[0].name;
  mostrarModal.value = true;
};

const baixarNow = () => {
  mostrarModal.value = false;
  croppedImageUrl.value = false;
}

const cropImage = () => {
  if (!cropper.value) return;
  const canvas = cropper.value.getCroppedCanvas();
  croppedImageUrl.value = canvas.toDataURL('image/png');
  imageUrl.value = false;

  const cropData = cropper.value.getData();
  cropWidth.value = Math.round(cropData.width);
  cropHeight.value = Math.round(cropData.height);
};
// const cropImage = () => {
//   if (!cropper.value) return;
//   const canvas = cropper.value.getCroppedCanvas();
//   croppedImageUrl.value = canvas.toDataURL('image/png');
//   imageUrl.value = false;
// };

onMounted(() => {
  cropper.value = cropper;
});
</script>