import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SUPAURL;
const API_KEY = import.meta.env.VITE_SUPAKEY;
const PGO_KEY = import.meta.env.VITE_ABACATEPAY;

const supabase = axios.create({
  baseURL: BASE_URL,
  headers: {
    'apikey': API_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export async function createPixCharge(userId, amount) {
  try {
    const response = await fetch('/api/v1/billing/create', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Authorization': 'Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh',
      },
      body: JSON.stringify({
        frequency: 'ONE_TIME',
        methods: ['PIX'],
        products: [
          {
            externalId: 'prod-1234',
            name: 'Assinatura de Programa Fitness',
            description: 'Acesso ao programa fitness premium por 1 mês.',
            quantity: 1,
            price: amount // Valor da cobrança em centavos (ex: R$10,00 -> 1000)
          }
        ],
        returnUrl: 'https://example.com/billing',
        completionUrl: 'https://example.com/completion',
        customer: { email: 'leonardo@gmail.com' }
      })
    });

    const data = await response.json();

    if (data.id) {
      // Salvar cobrança no Supabase
      const { error } = await supabase
        .from("payments")
        .insert([
          {
            user_id: userId,
            amount: amount / 100, // Convertendo centavos para reais
            status: "pending",
            due_date: new Date(),
            pix_code: data.pix_code,
            pix_qrcode: data.pix_qrcode,
          },
        ]);

      if (error) console.error("Erro ao salvar pagamento:", error);
    }

    return data;
  } catch (error) {
    throw new Error(`Erro ao criar cobrança PIX: ${error.message}`);
  }
}

export async function checkPaymentStatus (paymentId) {
  try {
    const response = await fetch(`/api/charges/${paymentId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh",
      },
    });

    const data = await response.json();

    if (data.status === "paid") {
      await supabase
        .from("payments")
        .update({ status: "paid" })
        .eq("id", paymentId);
    }
    return data;
  } catch (error) {
    throw new Error(`Erro ao verificar status do pagamento: ${error.message}`);
  }
};

export async function listPaymentsStatus() {
  try {
    const response = await fetch('/api/v1/billing/list', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Erro ao listar status de pagamentos: ${error.message}`);
  }
};

export default supabase;