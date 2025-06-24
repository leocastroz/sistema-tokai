<template>
  <div>
    <div v-for="(user, index) in filteredUsers" :key="user.id" style="display: flex;align-items: center;gap: 10px;padding: 10px;">
      <!-- <button @click="openModal(user)" style="background-color: gray;padding: 10px;border-radius: 10px;cursor: pointer;color: #fff;">Criar</button> -->
      <!-- <button v-if="user.user_metadata.checklist && user.user_metadata.checklist.length > 0" @click="responderChecklist(user)" style="background-color: blue;">Responder</button> -->
      <!-- <button v-if="user.user_metadata.checklist && user.user_metadata.checklist.length > 0" @click="showResults(user)">Ver Resultados</button> -->
      <button v-if="user.user_metadata.checklist && user.user_metadata.checklist.length > 0" @click="showAllChecklists(user)" style="background-color: goldenrod;padding: 10px;border-radius: 10px;cursor: pointer;">todos os checklist</button>
      {{ user.email }}
    </div>

    <!-- Criar form Modal -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Criar form Usuário</h2>
        <div v-if="checklist[0]" v-for="(question, qIndex) in Object.values(checklist[0]).filter(q => typeof q === 'object')" :key="qIndex" class="question-box">
          <h4>{{ question.titleCard }}</h4>
          <h3>{{ question.title }}</h3>
          <div v-for="option in question.options" :key="option.id">
            <input type="radio" :name="question.title" :value="option.value" /> {{ option.title }}
          </div>
        </div>
        <div class="new-question">
          <h3>Adicionar Nova Pergunta</h3>
          <!-- {{ checklist[0][0] }} -->
          <div style="display: grid;gap: 10px;">
            <input v-if="!checklist[0][0]" v-model="newQuestion.titleCard" placeholder="Título do forms: checklist diario" style="border: 1px solid gray;" />
            <input v-model="newQuestion.title" placeholder="Título da Pergunta" style="border: 1px solid gray;" />
            <div v-if="!checklist[0][0]">
              <input v-model="newQuestion.opcional" type="checkbox" /> Opcional
            </div>
          </div>
          <!-- <select v-model="newQuestion.type">
            <option value="multi-two">Multi-Two</option>
            <option value="multi-four">Multi-Four</option>
          </select> -->
          
          <div v-for="(option, index) in newQuestion.options" :key="index" style="padding: 10px 0;gap: 10px;display: flex;">
            <input v-model="option.title" placeholder="Ex: Sim" style="border: 1px solid gray;" />
            <input v-model="option.value" placeholder="Valor da Opção, ex: 1" style="border: 1px solid gray;" />
          </div>
          <div style="display: flex;justify-content: cente;gap: 20px;">
            <button @click="addOption" style="background-color: gray;color: #fff;">+ 1 Opção de resposta</button>
            <button @click="addQuestion" style="background-color: greenyellow;">Cria form</button>
          </div>
        </div>
        <button @click="updateUser(selectedUser.id)" style="background-color: burlywood;">Cadastrar para o usuario</button>
      </div>
    </div>

    <!-- Respond Modal -->
    <!-- <div v-if="isRespondModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeRespondModal">&times;</span>
        <h2>Responder Checklist</h2>
        <div v-for="(checklist, index) in selectedUserChecklists" :key="index">
          <button @click="selectChecklist(index)">Checklist {{ index + 1 }}</button>
        </div>
        <div v-if="selectedChecklistIndex !== null">
          <div v-for="(question, qIndex) in Object.values(selectedUserChecklists[selectedChecklistIndex]).filter(q => typeof q === 'object')" :key="qIndex" class="question-box">
            <h3>{{ question.title }}</h3>
            <div v-for="option in question.options" :key="option.id">
              <input type="radio" :name="question.title" :value="option.value" v-model="question.selectedOption" @change="selectOption(question, option)" /> {{ option.title }}
            </div>
          </div>
          <button :disabled="!isChecklistComplete" @click="submitChecklist(selectedUser.id)" class="tw-bg-red">Enviar</button>
        </div>
      </div>
    </div> -->

    <!-- Results Modal -->
    <div v-if="isResultsModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeResultsModal">&times;</span>
        <h2>Resultados do Checklist</h2>
        <div v-if="selectedUserChecklist" v-for="(question, qIndex) in Object.values(selectedUserChecklist).filter(q => typeof q === 'object')" :key="qIndex" class="question-box">
          <h3>{{ question.title }}</h3>
          <div v-for="option in question.options" :key="option.id">
            <input type="radio" :name="question.title" :value="option.value" v-model="question.selectedOption" disabled /> {{ option.title }}
          </div>
        </div>
      </div>
    </div>

    <!-- All Checklists Modal -->
    <div v-if="isAllChecklistsModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAllChecklistsModal">&times;</span>
        <h2>Todos os Checklists</h2>
        <div v-for="(checklist, index) in selectedUserChecklists" :key="index">
          <div>
            <h3>{{ checklist[0].titleCard }}</h3>
            <button @click="deleteChecklist(index)">Apagar</button>
          </div>
          <div v-for="(question, qIndex) in Object.values(checklist).filter(q => typeof q === 'object')" :key="qIndex" class="question-box">
            <h4>{{ question.title }}</h4>
            <div v-for="option in question.options" :key="option.id">
              <input type="radio" :name="question.title" :value="option.value" v-model="question.selectedOption" disabled /> {{ option.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from "@/clients/supabase";

const filteredUsers = ref([]);
const isModalOpen = ref(false);
const isRespondModalOpen = ref(false);
const isResultsModalOpen = ref(false);
const isAllChecklistsModalOpen = ref(false);
const selectedUser = ref(null);
const selectedUserChecklists = ref([]);
const selectedChecklistIndex = ref(null);
const selectedUserChecklist = ref([]);
const checklist = ref([{}]);

const newQuestion = ref({
  titleCard: '',
  title: '',
  // type: 'multi-two',
  options: [
    { id: '1', select: false, title: '', value: '' },
    { id: '2', select: false, title: '', value: '' }
  ],
  selectedOption: null,
  done: false,
  opcional: false,
  create_at: new Date(),
  done_at: null
});

const addOption = () => {
  const newOptionId = newQuestion.value.options.length + 1;
  newQuestion.value.options.push({ id: newOptionId.toString(), select: false, title: '', value: '' });
};

const addQuestion = () => {
  const newQuestionIndex = Object.keys(checklist.value[0]).filter(key => key !== 'done').length;
  checklist.value[0][newQuestionIndex.toString()] = { ...newQuestion.value };
  resetNewQuestion();
};

const resetNewQuestion = () => {
  newQuestion.value = {
    // titleCard: newQuestion.value.titleCard,
    title: '',
    // type: 'multi-two',
    options: [
      { id: '1', select: false, title: '', value: '' },
      { id: '2', select: false, title: '', value: '' }
    ],
    selectedOption: null,
    done: false,
    opcional: false,
    create_at: new Date(),
    done_at: null
  };
};

const openModal = (user) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};

// const responderChecklist = (user) => {
//   selectedUser.value = user;
//   selectedUserChecklists.value = user.user_metadata.checklist;
//   isRespondModalOpen.value = true;
// };

const closeRespondModal = () => {
  isRespondModalOpen.value = false;
  selectedUser.value = null;
  selectedChecklistIndex.value = null;
};

// const showResults = (user) => {
//   selectedUser.value = user;
//   selectedUserChecklist.value = user.user_metadata.checklist[0];
//   console.log('selectedUserChecklist', selectedUserChecklist.value);
//   isResultsModalOpen.value = true;
// };

const closeResultsModal = () => {
  isResultsModalOpen.value = false;
  selectedUser.value = null;
  selectedUserChecklist.value = [];
};

const showAllChecklists = (user) => {
  selectedUser.value = user;
  selectedUserChecklists.value = user.user_metadata.checklist;
  isAllChecklistsModalOpen.value = true;
};

const closeAllChecklistsModal = () => {
  isAllChecklistsModalOpen.value = false;
  selectedUser.value = null;
};

// const selectChecklist = (index) => {
//   selectedChecklistIndex.value = index;
// };

// const selectOption = (question, option) => {
//   question.options.forEach(opt => opt.select = false);
//   option.select = true;
//   question.selectedOption = option.value;
// };

const isChecklistComplete = computed(() => {
  if (selectedChecklistIndex.value === null) return false;
  return Object.values(selectedUserChecklists.value[selectedChecklistIndex.value]).filter(q => typeof q === 'object').every(question => question.selectedOption !== null);
});

// const submitChecklist = async (userId) => {
//   try {
//     selectedUserChecklists.value[selectedChecklistIndex.value].done = true;
//     const updateData = {
//       user_metadata: {
//         checklist: selectedUserChecklists.value
//       }
//     };

//     const { data, error } = await supabase.auth.admin.updateUserById(userId, updateData);
//     if (error) {
//       toast.error("Erro ao finalizar sessão!");
//       console.error('Error updating user:', error);
//     } else {
//       console.log('User updated successfully:', data);
//       closeRespondModal();
//     }
//   } catch (error) {
//     console.error('Error updating user:', error);
//   }
// };

const updateUser = async (userId) => {
  try {
    const user = selectedUser.value;
    const newChecklist = { ...checklist.value[0] };

    if (user.user_metadata.checklist) {
      user.user_metadata.checklist.push(newChecklist);
    } else {
      user.user_metadata.checklist = [newChecklist];
    }

    const updateData = {
      user_metadata: {
        checklist: user.user_metadata.checklist
      }
    };

    const { data, error } = await supabase.auth.admin.updateUserById(userId, updateData);
    if (error) {
      console.error('Error updating user:', error);
    } else {
      console.log('User updated successfully:', data);
      closeModal();
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
  resetNewQuestion();
};

const deleteChecklist = async (index) => {
  try {
    selectedUserChecklists.value.splice(index, 1);
    const updateData = {
      user_metadata: {
        checklist: selectedUserChecklists.value
      }
    };

    const { data, error } = await supabase.auth.admin.updateUserById(selectedUser.value.id, updateData);
    if (error) {
      console.error('Error deleting checklist:', error);
    } else {
      console.log('Checklist deleted successfully:', data);
    }
  } catch (error) {
    console.error('Error deleting checklist:', error);
  }
};

const getUsers = async () => {
  let userId = localStorage.getItem('userId');
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Erro ao listar usuários:', error);
    return [];
  }

  return users.filter(user => user.user_metadata?.empresa_uuid === userId);
};

onMounted(async () => {
  filteredUsers.value = await getUsers();
});
</script>

<style>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>