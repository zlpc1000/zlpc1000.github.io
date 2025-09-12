# ⚡ Quick Start - DarkPaste

## 🚀 Instalação Rápida

```bash
# 1. Clone o projeto
git clone https://github.com/seu-usuario/darkpaste.git
cd darkpaste

# 2. Execute o setup automático
node setup.js

# 3. Configure o .env.local
# Edite o arquivo .env.local com suas configurações de SMTP

# 4. Teste localmente
npm run dev
```

## 🌐 Deploy Rápido no Vercel

```bash
# 1. Instale o Vercel CLI
npm i -g vercel

# 2. Faça login
vercel login

# 3. Configure variáveis de ambiente
vercel env add SMTP_HOST
vercel env add SMTP_USER  
vercel env add SMTP_PASS

# 4. Deploy
vercel --prod
```

## 📧 Configuração do Gmail (2 minutos)

1. **Ative 2FA no Google**
2. **Gere senha de app:**
   - Google Account → Segurança → Senhas de app
   - Selecione "Email" → "Outro" → Digite "DarkPaste"
3. **Use no .env.local:**
   ```env
   SMTP_USER=seu_email@gmail.com
   SMTP_PASS=sua_senha_de_app_gerada
   ```

## 🔒 Recursos de Privacidade

- ✅ **Criptografia AES-256** - Padrão militar
- ✅ **Anonimização total** - Zero rastreamento
- ✅ **Auto-destruição** - Dados apagados em 24h
- ✅ **Sem logs pessoais** - Apenas IDs anônimos
- ✅ **Headers de segurança** - Privacidade máxima

## 📡 API Endpoints

```bash
# Enviar email
POST /api/send
{
  "to": "destinatario@exemplo.com",
  "subject": "Assunto",
  "body": "Mensagem"
}

# Estatísticas
GET /api/stats

# Health check
GET /api/health
```

## 🧪 Teste Rápido

```bash
# Teste local
curl -X POST http://localhost:3000/api/send \
  -H "Content-Type: application/json" \
  -d '{"to":"teste@exemplo.com","subject":"Teste","body":"Email de teste"}'

# Teste em produção
curl -X POST https://seu-projeto.vercel.app/api/send \
  -H "Content-Type: application/json" \
  -d '{"to":"teste@exemplo.com","subject":"Teste","body":"Email de teste"}'
```

## 🎯 Uso Básico

1. **Acesse a interface web**
2. **Digite o email de destino**
3. **Escreva o assunto e mensagem**
4. **Clique em "Enviar Email Anônimo"**
5. **Pronto! Email enviado com privacidade máxima**

## 🛡️ Garantias de Segurança

- **Criptografia**: AES-256-CBC com IV aleatório
- **Anonimização**: IPs e dados pessoais não são rastreados
- **Armazenamento**: Apenas em memória, sem persistência
- **Limpeza**: Auto-destruição após 24 horas
- **Headers**: Configurações de privacidade máxima

## 🚨 Aviso Importante

Este sistema é para fins educacionais e de privacidade. Use com responsabilidade e conforme as leis locais.

---

**🔒 DarkPaste - Privacidade máxima em 5 minutos!**
