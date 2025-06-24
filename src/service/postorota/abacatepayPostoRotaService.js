export async function createPixCharge(amount, externalId) {
  try {
    const response = await fetch('https://www.broexsistema.com/api/proxy/v1/billing/create', {
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
            externalId: externalId,
            name: 'Assinatura de Programa Fitness',
            description: 'Acesso ao programa fitness premium por 1 mês.',
            quantity: 1,
            sequence: 1,
            price: amount // Valor da cobrança em centavos (ex: R$10,00 -> 1000)
          }
        ],
        returnUrl: 'https://www.broexsistema.com?',
        completionUrl: 'https://www.broexsistema.com?clearStorage=true',
        customerId: externalId,
      })
    });

    const data = await response.json();
    console.log('RESPOSTA DO DATA API DE CRIACAO DE PAGAMENTO');

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

export async function checkPaymentStatus(paymentId) {
  try {
    const response = await fetch(`https://www.broexsistema.com/api/proxy/charges/${paymentId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh",
      },
    });

    const data = await response.json();

    if (data.status === "paid") {
      await supabase.from("payments").update({ status: "paid" }).eq("id", paymentId);
    }
    return data;
  } catch (error) {
    throw new Error(`Erro ao verificar status do pagamento: ${error.message}`);
  }
};

// export async function listPaymentsStatus() {
//   try {
//     const response = await fetch('https://api.abacatepay.com/v1/billing/list', {
//       method: 'GET',
//       mode:"no-cors",
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Authorization": "Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh",
//       },
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error(`Erro ao listar status de pagamentos: ${error.message}`);
//   }
// };

export async function listPaymentsStatus() {
  try {
    const response = await fetch('https://broex-v2.vercel.app/api/list', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer abc_dev_JWdrte1zLxnCfjmWJFhuUpPh'
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Erro ao listar status de pagamentos: ${error.message}`);
  }
};