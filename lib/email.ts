import nodemailer from 'nodemailer';
import { DarkCrypto } from './crypto';

export interface EmailData {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

export interface EncryptedEmail {
  id: string;
  encrypted: string;
  key: string;
  iv: string;
  timestamp: number;
  expiresAt: number;
}

export class DarkEmailService {
  private static readonly STORAGE_DURATION = 24 * 60 * 60 * 1000; // 24 horas
  private static emailStorage: Map<string, EncryptedEmail> = new Map();

  /**
   * Configura o transporter do nodemailer com configurações anônimas
   */
  private static createTransporter() {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  /**
   * Envia email de forma totalmente anônima
   */
  static async sendAnonymousEmail(emailData: EmailData): Promise<{
    success: boolean;
    messageId?: string;
    error?: string;
    anonymousId?: string;
  }> {
    try {
      // Criptografa o email
      const { encrypted, key, iv, id } = DarkCrypto.encryptEmail(emailData);
      
      // Armazena temporariamente (será limpo automaticamente)
      const encryptedEmail: EncryptedEmail = {
        id,
        encrypted,
        key,
        iv,
        timestamp: Date.now(),
        expiresAt: Date.now() + this.STORAGE_DURATION
      };
      
      this.emailStorage.set(id, encryptedEmail);

      // Configura email anônimo
      const transporter = this.createTransporter();
      
      const mailOptions = {
        from: process.env.ANONYMOUS_FROM || 'anonymous@darkpaste.com',
        to: emailData.to,
        subject: `[ANÔNIMO] ${emailData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a1a1a; color: #fff; padding: 20px; border-radius: 8px;">
              <h2 style="color: #00ff00; margin: 0 0 20px 0;">🔒 Email Anônimo</h2>
              <div style="background: #2a2a2a; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p style="margin: 0; color: #ccc;">${emailData.body}</p>
              </div>
              <div style="border-top: 1px solid #333; padding-top: 15px; margin-top: 20px;">
                <p style="font-size: 12px; color: #666; margin: 0;">
                  Este email foi enviado através do DarkPaste - Sistema de Email Anônimo<br>
                  ID da mensagem: ${id}<br>
                  Timestamp: ${new Date().toISOString()}
                </p>
              </div>
            </div>
          </div>
        `,
        headers: {
          'X-Anonymous-ID': id,
          'X-DarkPaste': 'true',
          'X-Privacy-Level': 'maximum'
        }
      };

      const result = await transporter.sendMail(mailOptions);
      
      // Limpa dados sensíveis da memória após envio
      setTimeout(() => {
        this.emailStorage.delete(id);
      }, 1000);

      return {
        success: true,
        messageId: result.messageId,
        anonymousId: id
      };

    } catch (error) {
      console.error('Erro ao enviar email anônimo:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Recupera email criptografado (apenas para debug/teste)
   */
  static getEncryptedEmail(id: string, key: string, iv: string): EmailData | null {
    const encryptedEmail = this.emailStorage.get(id);
    if (!encryptedEmail) {
      return null;
    }

    try {
      return DarkCrypto.decryptEmail(encryptedEmail.encrypted, key, iv);
    } catch (error) {
      console.error('Erro ao descriptografar email:', error);
      return null;
    }
  }

  /**
   * Limpa emails expirados
   */
  static cleanupExpiredEmails(): void {
    const now = Date.now();
    for (const [id, email] of this.emailStorage.entries()) {
      if (email.expiresAt < now) {
        this.emailStorage.delete(id);
      }
    }
  }

  /**
   * Gera estatísticas anônimas
   */
  static getAnonymousStats(): {
    totalEmails: number;
    activeEmails: number;
    uptime: number;
  } {
    this.cleanupExpiredEmails();
    
    return {
      totalEmails: this.emailStorage.size,
      activeEmails: Array.from(this.emailStorage.values()).filter(
        email => email.expiresAt > Date.now()
      ).length,
      uptime: Date.now() - (process.env.START_TIME ? parseInt(process.env.START_TIME) : Date.now())
    };
  }
}
