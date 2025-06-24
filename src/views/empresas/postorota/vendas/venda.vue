<template>
  <div v-show="isVisible" class="bg-gray-50 rounded-xl drop-shadow-lg text-gray-400 border-gray-200 animate__animated animate__fadeIn" style="box-shadow: 0px 0px 1px 1px #363636;background-color: #1d1f20;overflow:hidden !important;">
    <div class="grid grid-flow-row-dense grid-cols-3">
      
      <div class="m-2 col-span-1">
        <p class="text-[13px]">PRODUTOS</p>
        <select
          class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full cursor-pointer"
          v-model="addproduto.produto" name="produto" id="produto"
          @change="updateTotalModelo">
          <option value="" disabled selected>Selecione um produto</option>
          <option v-for="produto in produtos" :key="produto.id" :value="produto.id" :disabled="produto.status !== true && produto.totalModelo !== 0 || produto.status == true && produto.totalModelo == 0">
            <p>
              {{ produto.nome }}
              <span v-if="produto.status !== true && produto.totalModelo !== 0">- (inativado)</span>
              <span v-else-if="produto.status === true && produto.totalModelo == 0">- (sem estoque)</span>
              <span v-else-if="produto.status === true && produto.totalModelo !== 0">- (disponivel {{ produto.totalModelo }})</span>
            </p>
          </option>
        </select>
      </div>

      <div v-if="totalModelo > 0" class="m-2 col-span-1">
        <p class="text-[13px]">QUANTIDADE: *</p>
        <select
          class="bg-[#6464648c] rounded drop-shadow-lg px-2 py-1 text-gray-400 focus:outline-none w-full cursor-pointer"
          v-model.number="addproduto.quantidade" name="quantidade" id="quantidade">
          <option value="" disabled selected>Quantidade que deseja vender ?</option>
          <option v-for="n in parseInt(totalModelo)" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
      </div>
    </div>

    <div class="m-2 gap-4">
      <button @click="registerVenda" class="bg-blue-500 px-3 rounded text-white text-[13px] py-1 mr-2">
        vender
      </button>
      <button @click="$emit('cancel')" class="bg-gray-500 py-1 px-3 rounded text-gray-300 text-[13px] mr-2"
        type="button">
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['professor', 'addproduto', 'listvendas', 'produtos', 'isVisible']);
const emit = defineEmits(['update', 'cancel', 'register', 'uploadImage', 'deleteImage']);
let totalModelo = ref(0);
const selectedFile = ref(null);

const registerVenda = async () => {
  // if (!props.professor.fileName) {
  //   return;
  // }
  try {
    const formData = new FormData();
    formData.append('file', props.professor.fileName);
    emit('register', formData);
    totalModelo.value = 0;
    selectedFile.value = null;
    previewImage.value = '';
  } catch (error) {
    console.error('Erro durante o upload:', error);
  }
};

const updateTotalModelo = () => {
  const selectedProduto = props.produtos.find(produto => produto.id === props.addproduto.produto);
  totalModelo.value = selectedProduto ? parseInt(selectedProduto.totalModelo) : 0;
};
</script>

<style scoped>
.grounded {
  background-repeat: no-repeat;
  background-size: cover;
}
</style>