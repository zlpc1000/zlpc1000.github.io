import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configurações de privacidade máxima
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  
  // CORS para permitir acesso de qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Método não permitido',
      anonymous: true 
    });
  }

  try {
    // Verifica se as variáveis de ambiente estão configuradas
    const hasEmailConfig = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    
    return res.status(200).json({
      success: true,
      status: 'operational',
      darkMode: true,
      privacy: 'maximum',
      emailConfigured: hasEmailConfig,
      timestamp: Date.now(),
      version: '1.0.0',
      features: {
        encryption: 'AES-256',
        anonymity: 'complete',
        logging: 'minimal',
        storage: 'temporary'
      }
    });

  } catch (error) {
    console.error('Erro na API de health:', error);
    
    return res.status(500).json({
      error: 'Erro interno do servidor',
      anonymous: true
    });
  }
}
