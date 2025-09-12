import { NextApiRequest, NextApiResponse } from 'next';
import { DarkEmailService } from '../../lib/email';
import { DarkCrypto } from '../../lib/crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configurações de privacidade máxima
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  
  // CORS para permitir acesso de qualquer origem (anonimização)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Método não permitido',
      anonymous: true 
    });
  }

  try {
    const { to, subject, body, from } = req.body;

    // Validações básicas
    if (!to || !subject || !body) {
      return res.status(400).json({
        error: 'Campos obrigatórios: to, subject, body',
        anonymous: true
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        error: 'Email de destino inválido',
        anonymous: true
      });
    }

    // Limitações de segurança
    if (body.length > 10000) {
      return res.status(400).json({
        error: 'Corpo do email muito longo (máximo 10.000 caracteres)',
        anonymous: true
      });
    }

    if (subject.length > 200) {
      return res.status(400).json({
        error: 'Assunto muito longo (máximo 200 caracteres)',
        anonymous: true
      });
    }

    // Envia email anônimo
    const result = await DarkEmailService.sendAnonymousEmail({
      to,
      subject,
      body,
      from: from || undefined
    });

    if (result.success) {
      // Log mínimo (sem dados pessoais)
      console.log(`Email anônimo enviado - ID: ${result.anonymousId} - Timestamp: ${Date.now()}`);
      
      return res.status(200).json({
        success: true,
        message: 'Email enviado com sucesso',
        anonymousId: result.anonymousId,
        timestamp: Date.now(),
        privacy: 'maximum'
      });
    } else {
      return res.status(500).json({
        error: 'Erro interno do servidor',
        anonymous: true
      });
    }

  } catch (error) {
    console.error('Erro na API de envio:', error);
    
    return res.status(500).json({
      error: 'Erro interno do servidor',
      anonymous: true
    });
  }
}
