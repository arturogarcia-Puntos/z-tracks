export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://z-tracks.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, code_verifier, redirect_uri } = req.body;

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id: '3b2fb99532',
      client_secret: 'f18a4bcf8c',
      code_verifier
    });

    const response = await fetch('https://zecore.zebrands.mx/api/method/frappe.integrations.oauth2.get_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
      body: params.toString()
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
