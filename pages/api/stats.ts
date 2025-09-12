import { NextApiRequest, NextApiResponse } from 'next';
import { DarkEmailService } from '../../lib/email';

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
    // Retorna apenas estatísticas anônimas e agregadas
    const stats = DarkEmailService.getAnonymousStats();
    
    return res.status(200).json({
      success: true,
      stats: {
        ...stats,
        uptime: Math.floor(stats.uptime / 1000), // em segundos
        privacy: 'maximum',
        version: '1.0.0',
        features: [
          'Criptografia AES-256',
          'Anonimização completa',
          'Sem logs de identificação',
          'Armazenamento temporário',
          'Auto-limpeza de dados'
        ]
      },
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Erro na API de estatísticas:', error);
    
    return res.status(500).json({
      error: 'Erro interno do servidor',
      anonymous: true
    });
  }
}
