// netlify/functions/login.js

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Invalid JSON' }),
    };
  }

  const email = (body.email || '').trim();
  const password = (body.password || '').trim();

  const DEMO_EMAIL = 'demo@groww.dev';
  const DEMO_PASSWORD = 'password123';

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const token = 'demo-token-' + Date.now();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
    };
  }

  return {
    statusCode: 401,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Invalid email or password.' }),
  };
};
