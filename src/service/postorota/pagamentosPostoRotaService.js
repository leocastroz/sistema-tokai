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

export async function getLista() {
  try {
    const response = await supabase.get(`/rest/v1/pagamentos_postorota`);
    return response.data;

  } catch (error) {
    throw new Error(`Erro ao obter os marca_postorota: ${error.message}`);
  }
}

export async function addItemLista(newCollaborator) {
  try {
    const response = await supabase.post('/rest/v1/pagamentos_postorota', newCollaborator);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao adicionar o funcionário: ${error.message}`);
  }
}

export async function deleteMarca(professorId) {
  try {
    await supabase.delete(`/rest/v1/pagamentos_postorota?id=eq.${professorId}`);
  } catch (error) {
    throw new Error(`Erro ao excluir o funcionário: ${error.message}`);
  }
}

export async function editItemLista(professorId, data) {   
  try {
    await supabase.put(`/rest/v1/pagamentos_postorota?id=eq.${professorId}`, data);
  } catch (error) {
    throw new Error(`Erro ao editar um professor: ${error.message}`);
  }
}

export async function apiAbacate() {
  try {
    const response = await axios.get('https://broex-v2.vercel.app/api/list', {
      headers: {
        accept: 'application/json',
        authorization: 'Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao obter os marca_postorota: ${error.message}`);
  }
}

export default supabase;