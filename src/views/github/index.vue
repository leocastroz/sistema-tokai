 <script setup>
 import { ref, onMounted } from 'vue';
 import { supabase } from '@/clients/supabase';
 import axios from 'axios';

 const newImagesContent = ref([{ text: "" }]);
 let userId = ref(null);
 let fileContent = ref({});

 const token = import.meta.env.VITE_TOKENGIT;
 const owner = import.meta.env.VITE_OWNER;
 const repo = import.meta.env.VITE_REPO;
 const path = import.meta.env.VITE_PATH;

 const getUserId = async () => {
   let { data, error } = await supabase.auth.getSession();
   if (data && data.session && data.session.user) {
     userId.value = data.session.user.id;
     console.log('userId no github page', userId.value);
   } else {
     console.error('Erro ao obter o ID do usuário:', error);
   }
 };

 const fetchFileSHA = async () => {
   try {
     const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
       headers: {
         'Authorization': `token ${token}`,
         'Accept': 'application/vnd.github.v3+json'
       }
     });
     return response.data.sha;
   } catch (error) {
     if (error.response && error.response.status === 404) {
       return null;
     }
     console.error('Erro ao buscar o SHA do arquivo:', error.response ? error.response.data : error.message);
     throw error;
   }
 };

 const fetchFileContent = async () => {
   try {
     const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
       headers: {
         'Authorization': `token ${token}`,
         'Accept': 'application/vnd.github.v3+json'
       }
     });
     fileContent.value = JSON.parse(atob(response.data.content));
     if (fileContent.value[userId.value] && fileContent.value[userId.value].length > 0) {
       newImagesContent.value = fileContent.value[userId.value].map(item => ({ text: item.textos.name }));
     } else {
       newImagesContent.value = [{ text: "" }];
     }
   } catch (error) {
     console.error('Erro ao buscar o conteúdo do arquivo:', error.response ? error.response.data : error.message);
   }
 };

 const updateFileOnGitHub = async (newContent) => {
   try {
     const sha = await fetchFileSHA();
     const updateResponse = await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
       message: 'Atualiza campo do usuário no arquivo JSON',
       content: btoa(newContent),
       sha: sha
     }, {
       headers: {
         'Authorization': `token ${token}`,
         'Accept': 'application/vnd.github.v3+json'
       }
     });
     console.log('Arquivo atualizado com sucesso:', updateResponse.data);
   } catch (error) {
     console.error('Erro ao atualizar o arquivo:', error.response ? error.response.data : error.message);
   }
 };

 const updateFile = () => {
   fileContent.value[userId.value] = newImagesContent.value.map(item => ({ textos: { name: item.text } }));
   const content = JSON.stringify(fileContent.value, null, 2);
   updateFileOnGitHub(content);
 };

 const addNewField = () => {
   newImagesContent.value.push({ text: "" });
 };

 onMounted(async () => {
   await getUserId();
   if (userId.value) {
     fetchFileContent();
   }
 });
 </script>