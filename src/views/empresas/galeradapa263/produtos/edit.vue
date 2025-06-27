<template>
  <div 
    v-show="isVisible" 
    class="bg-zinc-900 rounded-xl drop-shadow-lg text-gray-300 border border-zinc-700 animate__animated animate__fadeIn"
    style="box-shadow: 0px 0px 1px 1px #363636; overflow-y: auto; max-height: 100vh;"
  >
    <!-- Cabeçalho com tabs -->
    <div class="border-b border-zinc-700">
      <div class="flex">
        <button 
          @click="activeTab = 'form'"
          class="px-5 py-4 text-sm font-medium transition-colors"
          :class="activeTab === 'form' ? 'border-b-2 border-emerald-500 text-white' : 'text-gray-400 hover:text-gray-300'"
        >
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Editar Produto</span>
          </div>
        </button>
        <button 
          @click="activeTab = 'preview'" 
          class="px-5 py-4 text-sm font-medium transition-colors"
          :class="activeTab === 'preview' ? 'border-b-2 border-emerald-500 text-white' : 'text-gray-400 hover:text-gray-300'"
        >
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Pré-visualização</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Formulário -->
    <div v-if="activeTab === 'form'" class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Coluna 1: Informações Básicas -->
        <div class="space-y-5">
          <h3 class="text-sm uppercase tracking-wider text-emerald-500 font-semibold">Informações Básicas</h3>
          
          <!-- Nome -->
          <div class="space-y-2">
            <label for="nome" class="block text-sm font-medium">NOME</label>
            <input 
              id="nome"
              v-model="professor.nome" 
              type="text" 
              placeholder="Nome do produto"
              class="w-full bg-zinc-800 rounded-md px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <!-- Código do Produto -->
          <div class="space-y-2">
            <label for="codProduto" class="block text-sm font-medium">CÓDIGO DO PRODUTO</label>
            <input 
              id="codProduto"
              v-model="professor.codProduto" 
              type="text"
              placeholder="Ex: PROD-001"
              class="w-full bg-zinc-800 rounded-md px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <!-- Marca -->
          <div class="space-y-2">
            <label for="marca" class="block text-sm font-medium">MARCA</label>
            <div class="relative">
              <select
                id="marca"
                v-model="professor.marca"
                class="w-full bg-zinc-800 rounded-md px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="" disabled>Selecione uma marca</option>
                <option v-for="marca in marcas" :key="marca.id" :value="marca.marca">{{ marca.marca }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna 2: Detalhes do Produto -->
        <div class="space-y-5">
          <h3 class="text-sm uppercase tracking-wider text-emerald-500 font-semibold">Detalhes do Produto</h3>
          
          <!-- Descrição -->
          <div class="space-y-2">
            <label for="descricao" class="block text-sm font-medium">DESCRIÇÃO</label>
            <textarea 
              id="descricao"
              v-model="professor.descricao" 
              rows="4"
              placeholder="Descreva o produto..."
              class="w-full bg-zinc-800 rounded-md px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Categoria -->
          <div class="space-y-2">
            <label for="tipo" class="block text-sm font-medium">CATEGORIA</label>
            <div class="relative">
              <select
                id="tipo"
                v-model="professor.tipo"
                class="w-full bg-zinc-800 rounded-md px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="" disabled>Selecione uma categoria</option>
                <option value="lancamentos">Lançamento</option>
                <option value="oleos">Óleos</option>
                <option value="suspensao">Suspensão</option>
                <option value="motor">Motor</option>
                <option value="pneus">Pneus</option>
                <option value="kittransmissao">Kit transmissão</option>
                <option value="eletrica">Elétrica</option>
                <option value="carenagens">Carenagens</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna 3: Preço e Estoque -->
        <div class="space-y-5">
          <h3 class="text-sm uppercase tracking-wider text-emerald-500 font-semibold">Preço e Estoque</h3>
          
          <!-- Valor -->
          <div class="space-y-2">
            <label for="valor" class="block text-sm font-medium">VALOR</label>
            <div class="relative">
              <input
                id="valor"
                v-model="formattedCarteiraTotal"
                type="text"
                placeholder="R$ 0,00"
                class="w-full bg-zinc-800 rounded-md px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-10"
              />
              <button 
                @click="clearMoney" 
                class="absolute inset-y-0 right-0 px-3 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-r-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Campo Desconto -->
          <div class="space-y-2">
            <label for="campoDesconto" class="block text-sm font-medium">DESCONTO</label>
            <div class="relative">
              <input
                id="campoDesconto"
                v-model="professor.campoDesconto"
                type="number"
                min="0"
                max="99"
                placeholder="0"
                @input="formatDiscountField"
                class="w-full bg-zinc-800 rounded-md px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-10"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                %
              </div>
            </div>
          </div>

          <!-- Total Modelo -->
          <div class="space-y-2">
            <label for="totalModelo" class="block text-sm font-medium">ESTOQUE DISPONÍVEL</label>
            <input 
              id="totalModelo"
              v-model="professor.totalModelo" 
              type="number"
              min="0"
              placeholder="0"
              class="w-full bg-zinc-800 rounded-md px-3 py-2 text-gray-300 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Classificação e Destaque -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-zinc-700">
        <!-- Estrelas -->
        <div class="space-y-2">
          <label for="estrela" class="block text-sm font-medium">CLASSIFICAÇÃO (ESTRELAS)</label>
          <div class="flex items-center space-x-1">
            <template v-for="i in 5" :key="i">
              <button 
                @click="professor.estrela = String(i)"
                class="focus:outline-none transition-colors"
              >
                <svg 
                  :class="i <= parseInt(professor.estrela) ? 'text-yellow-400' : 'text-zinc-600 hover:text-zinc-500'" 
                  class="w-8 h-8" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </button>
            </template>
            <span class="ml-2 text-sm text-gray-400">{{ professor.estrela }} de 5</span>
          </div>
        </div>

        <!-- Destaque -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">DESTAQUE NA PÁGINA INICIAL</label>
          <div class="flex items-center space-x-4">
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                v-model="professor.destaque" 
                value="true"
                class="form-radio h-5 w-5 text-emerald-500 focus:ring-emerald-500 border-zinc-600 bg-zinc-800"
              />
              <span class="ml-2 text-gray-300">Sim</span>
            </label>
            <label class="inline-flex items-center">
              <input 
                type="radio" 
                v-model="professor.destaque" 
                value="false"
                class="form-radio h-5 w-5 text-emerald-500 focus:ring-emerald-500 border-zinc-600 bg-zinc-800"
              />
              <span class="ml-2 text-gray-300">Não</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Imagem do Produto -->
      <div class="mt-6 pt-6 border-t border-zinc-700">
        <h3 class="text-sm uppercase tracking-wider text-emerald-500 font-semibold mb-4">Imagem do Produto</h3>
        
        <div v-if="professor.image_one" class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="relative w-40 h-40 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
            <img :src="professor.image_one" alt="Preview" class="w-full h-full object-contain" />
          </div>
          <div class="space-y-3">
            <p class="text-sm text-gray-400">
              <span class="font-medium text-white">Arquivo atual:</span> {{ professor.fileName || 'Sem nome de arquivo' }}
            </p>
            <div v-show="false" class="flex space-x-3">
              <button
                @click="executeInput" 
                class="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
                <span>Substituir</span>
              </button>
              <button 
                @click="removeImage" 
                class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <span>Remover</span>
              </button>
            </div>
          </div>
        </div>
        
        <div 
          v-else 
          class="border-2 border-dashed border-zinc-700 rounded-lg p-8 hover:border-emerald-500 transition-colors"
          @click="executeInput"
        >
          <div class="text-center cursor-pointer">
            <svg class="mx-auto h-12 w-12 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <div class="mt-4">
              <p class="text-sm text-gray-300">Arraste e solte um arquivo ou clique para selecionar</p>
              <p class="mt-1 text-xs text-gray-500">PNG, JPG ou JPEG (máx. 5MB)</p>
            </div>
          </div>
          <input 
            ref="fileInput" 
            type="file" 
            accept="image/png, image/jpeg" 
            @change="onFileChange" 
            class="hidden" 
          />
        </div>
      </div>
    </div>

    <!-- Pré-visualização -->
    <div v-if="activeTab === 'preview'" class="p-6">
      <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Imagem e informações básicas -->
          <div class="flex flex-col items-center">
            <div class="w-64 h-64 bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center p-4">
              <img 
                v-if="professor.image_one" 
                :src="professor.image_one" 
                alt="Imagem do produto" 
                class="w-full h-full object-contain"
                @error="handleImageError"
              />
              <div v-else class="flex flex-col items-center justify-center text-gray-400">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="mt-2 text-sm">Sem imagem</p>
              </div>
            </div>
            
            <!-- Código do produto -->
            <div class="mt-3 bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
              Cód: {{ professor.codProduto || 'N/A' }}
            </div>
            
            <!-- Nome do produto -->
            <h2 class="mt-3 text-xl font-bold text-gray-800 text-center">
              {{ professor.nome || 'Nome do Produto' }}
            </h2>
            
            <!-- Estrelas -->
            <div class="flex mt-2">
              <template v-for="i in 5" :key="i">
                <svg 
                  :class="i <= parseInt(professor.estrela) ? 'text-yellow-500' : 'text-gray-300'" 
                  class="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </template>
            </div>

            <!-- Destaque badge -->
            <div v-if="professor.destaque === 'true'" class="mt-3 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
              Produto em Destaque
            </div>
          </div>
          
          <!-- Detalhes do produto -->
          <div class="flex-1 bg-white rounded-lg shadow-lg p-6 text-gray-800">
            <div class="space-y-4">
              <!-- Marca e Categoria -->
              <div class="flex flex-wrap gap-2 mb-2">
                <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                  {{ professor.marca || 'Sem marca' }}
                </span>
                <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                  {{ getCategoriaLabel(professor.tipo) || 'Sem categoria' }}
                </span>
              </div>
              
              <!-- Descrição -->
              <div>
                <h3 class="text-sm font-medium text-gray-500">Descrição:</h3>
                <p class="mt-1 text-gray-700">{{ professor.descricao || 'Sem descrição disponível para este produto.' }}</p>
              </div>
              
              <hr class="my-4 border-gray-200" />
              
              <!-- Informações adicionais -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Disponibilidade:</h3>
                  <p class="mt-1 font-medium" :class="parseInt(professor.totalModelo) > 0 ? 'text-emerald-600' : 'text-red-600'">
                    {{ parseInt(professor.totalModelo) > 0 ? 'Em estoque' : 'Fora de estoque' }}
                  </p>
                </div>
                
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Quantidade:</h3>
                  <p class="mt-1">{{ professor.totalModelo || '0' }} unidades</p>
                </div>
              </div>
              
              <hr class="my-4 border-gray-200" />
              
              <!-- Preço e botão de compra -->
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Preço:</h3>
                  <div class="flex items-center">
                    <p class="text-2xl font-bold text-emerald-600">
                      {{ formattedCarteiraTotal || 'R$ 0,00' }}
                    </p>
                    
                    <div v-if="professor.campoDesconto && parseInt(professor.campoDesconto) > 0" class="ml-3 flex flex-col">
                      <span class="text-xs text-gray-500 line-through">
                        {{ calculateOriginalPrice() }}
                      </span>
                      <span class="text-xs font-medium text-red-600">
                        {{ professor.campoDesconto }}% OFF
                      </span>
                    </div>
                  </div>
                </div>
                
                <button class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botões de ação -->
    <div class="border-t border-zinc-700 p-4 flex justify-between items-center">
      <div class="text-sm text-gray-400">
        <span v-if="activeTab === 'form'">Preencha todos os campos necessários</span>
        <span v-else>Visualize como o produto aparecerá para os clientes</span>
      </div>
      
      <div class="flex space-x-3">
        <button 
          @click="$emit('cancel')" 
          class="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-gray-200 rounded transition-colors"
        >
          Cancelar
        </button>
        <button 
          @click="handleUpdate" 
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors flex items-center space-x-2"
          :disabled="textoButton !== 'Atualizar'"
        >
          <span v-if="textoButton === 'Atualizar'">
            <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            {{ textoButton }}
          </span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ textoButton }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['professor', 'marcas', 'isVisible']);
const emit = defineEmits(['update', 'cancel', 'uploadImage', 'deleteImage', 'push-marca']);

// Estado local
const activeTab = ref('form');
const fileInput = ref(null);
const textoButton = ref('Atualizar');
const imageError = ref(false);
const selectedFile = ref(null);
const isImageDeleted = ref(false);
const previewImage = ref('');
const imagePreview = ref('');

// Funções auxiliares
const getCategoriaLabel = (tipo) => {
  const categorias = {
    'ervamate': 'Erva Mate',
    'copoterere': 'Copo Tereré',
    'bombaterere': 'Bomba Tereré',
    'garrafasinox': 'Garrafas Inox',
    'canivetesfacas': 'Canivetes e Facas',
    'bonestexasfarm': 'Bonés Texas Farm'
  };
  
  return categorias[tipo] || tipo;
};

const calculateOriginalPrice = () => {
  if (!props.professor || !props.professor.valor || !props.professor.campoDesconto) {
    return 'R$ 0,00';
  }
  
  const discount = parseInt(props.professor.campoDesconto) / 100;
  const originalPrice = props.professor.valor / (1 - discount);
  
  return originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const professorImageURL = (professor) => {
  let userId = localStorage.getItem('userId');
  return `${import.meta.env.VITE_AVATAR_URL}${userId}/${professor.fileName}`;
};

const executeInput = () => {
  fileInput.value.click();
};

const reversedMarcas = computed(() => {
  return props.marcas.slice().reverse();
});

const formattedCarteiraTotal = computed({
  get: () => {
    if (props.professor && props.professor.valor) {
      let valor = props.professor.valor;
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return '';
  },
  set: (newValue) => {
    const value = parseFloat(newValue.replace(/\D/g, '')) / 100;
    if (props.professor) {
      props.professor.valor = value;
    }
  },
});

// Manipuladores de eventos
const clearMoney = () => {
  props.professor.valor = '';
};

const formatDiscountField = (event) => {
  let inputValue = event.target.value;
  inputValue = inputValue.replace(/[^\d%]/g, '');
  inputValue = inputValue.substring(0, 2);
  props.professor.campoDesconto = inputValue;
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
    console.error('Faça upload de um arquivo de imagem válido');
  }
};

const removeImage = () => {
  props.professor.image_one = '';
  imagePreview.value = '';
};

const handleImageError = () => {
  imageError.value = true;
};

const handleUpdate = async () => {
  textoButton.value = 'Aguarde editando ...';
  if (selectedFile.value) {
    const uploadResult = await emit('uploadImage', selectedFile.value, props.professor.fileName);
    if (uploadResult) {
      props.professor.fileName = uploadResult.path;
    }
    previewImage.value = '';
  }
  emit('update');
  textoButton.value = 'Atualizar';
};

const handleDeleteImage = () => {
  emit('deleteImage', props.professor.fileName);
  isImageDeleted.value = true;
  previewImage.value = '';
};

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

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate__fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Estilização para radio buttons */
.form-radio {
  appearance: none;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  border-radius: 100%;
  background-color: #374151;
  border: 1px solid #4B5563;
}

.form-radio:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='4'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.form-radio:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
}
</style>