import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { method, headers, body } = req;
  const url = req.url.replace('/api/proxy', 'https://api.abacatepay.com');

  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        host: 'api.abacatepay.com',
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}