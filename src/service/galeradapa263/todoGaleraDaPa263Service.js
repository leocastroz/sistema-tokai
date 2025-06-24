import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SUPAURL;
const API_KEY = import.meta.env.VITE_SUPAKEY;

const supabase = axios.create({
  baseURL: BASE_URL,
  headers: {
    'apikey': API_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// UTILIZAR PINIA PARA GUARDAR VARIÁVEL GLOBAL DE CONTEXTO


export async function getClient(user_id) {
  try {
    const response = await supabase.get(`/rest/v1/todo_galeradapa263?select=*&user_id=eq.${user_id}`);
    // console.log('response CLIENT STRUCTURE ->', response);
    return response.data;

  } catch (error) {
    throw new Error(`Erro ao obter os professores: ${error.message}`);
  }
}

export async function addClient(newCollaborator) {
  try {
    const response = await supabase.post('/rest/v1/todo_galeradapa263', newCollaborator);
    // console.log('response CLIENT POST estructure ->', response);
    return response;
  } catch (error) {
    throw new Error(`Erro ao adicionar o funcionário: ${error.message}`);
  }
}

export async function deleteClient(user_id) {
  try {
    await supabase.delete(`/rest/v1/todo_galeradapa263?id=eq.${user_id}`);
  } catch (error) {
    throw new Error(`Erro ao excluir o funcionário: ${error.message}`);
  }
}

export async function editStructure(itemId, data) {   
  // console.log('ITEM DATA ---->', data);
  try {
    await supabase.put(`/rest/v1/todo_galeradapa263?id=eq.${itemId}`, data);
  } catch (error) {
    throw new Error(`Erro ao editar um professor: ${error.message}`);
  }
}

export default supabase;