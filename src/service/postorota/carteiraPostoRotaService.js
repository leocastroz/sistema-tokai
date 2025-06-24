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

// CARTEIRA

export async function getCarteira(user_id) {
  try {
    const response = await supabase.get(`/rest/v1/carteira_postorota?select=*&user_id=eq.${user_id}`);
    return response.data;

  } catch (error) {
    throw new Error(`Erro ao obter valor da carteira: ${error.message}`);
  }
}

export async function addCarteira(newCarteira) {
  try {
    const response = await supabase.post('/rest/v1/carteira_postorota', newCarteira);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao adicionar o funcionário: ${error.message}`);
  }
}

export async function deleteCarteira(user_id) {
  try {
    const response = await supabase.delete(`/rest/v1/carteira_postorota?user_id=eq.${user_id}`);
    // console.log('response delete ',response);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao excluir o funcionário: ${error.message}`);
  }
}

export default supabase;