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

export async function getVendas() {
  // console.log('caindo aqui', user_id);
  try {
    const response = await supabase.get(`/rest/v1/vendas_postorota`);
    return response.data;

  } catch (error) {
    throw new Error(`Erro ao obter os vendas_postorota: ${error.message}`);
  }
}

// export async function getVendas(user_id) {
//   try {
//     const response = await supabase.get(`/rest/v1/vendas_postorota?select=*&user_id=eq.${user_id}`);
//     return response.data;

//   } catch (error) {
//     throw new Error(`Erro ao obter os vendas_postorota: ${error.message}`);
//   }
// }

export async function postVendas(newCollaborator) {
  try {
    const response = await supabase.post('/rest/v1/vendas_postorota', newCollaborator);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao adicionar o funcionário: ${error.message}`);
  }
}

export async function deleteProfessor(professorId) {
  try {
    await supabase.delete(`/rest/v1/vendas_postorota?id=eq.${professorId}`);
  } catch (error) {
    throw new Error(`Erro ao excluir o funcionário: ${error.message}`);
  }
}

export async function putVendas(professorId, data) {   
  try {
    await supabase.put(`/rest/v1/vendas_postorota?id=eq.${professorId}`, data);
  } catch (error) {
    throw new Error(`Erro ao editar um professor: ${error.message}`);
  }
}

export default supabase;