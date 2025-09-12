# 🚀 Guia de Deploy - DarkPaste

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta de email com SMTP habilitado (Gmail recomendado)
- Node.js instalado localmente

## 🔧 Configuração Local

1. **Clone e instale dependências:**
```bash
git clone https://github.com/seu-usuario/darkpaste.git
cd darkpaste
npm install
```

2. **Configure variáveis de ambiente:**
```bash
cp env.example .env.local
```

3. **Edite `.env.local` com suas configurações:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app
ANONYMOUS_FROM=anonymous@darkpaste.com
```

4. **Teste localmente:**
```bash
npm run dev
```

## 🌐 Deploy no Vercel

### Método 1: Via Dashboard (Recomendado)

1. **Acesse [vercel.com](https://vercel.com) e faça login**

2. **Importe o projeto:**
   - Clique em "New Project"
   - Conecte seu repositório GitHub
   - Selecione o repositório darkpaste

3. **Configure as variáveis de ambiente:**
   - Vá para "Settings" → "Environment Variables"
   - Adicione cada variável:
     ```
     SMTP_HOST = smtp.gmail.com
     SMTP_PORT = 587
     SMTP_USER = seu_email@gmail.com
     SMTP_PASS = sua_senha_de_app
     ANONYMOUS_FROM = anonymous@darkpaste.com
     START_TIME = 1700000000000
     NODE_ENV = production
     ```

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar
   - Seu site estará disponível em `https://seu-projeto.vercel.app`

### Método 2: Via CLI

1. **Instale o Vercel CLI:**
```bash
npm i -g vercel
```

2. **Faça login:**
```bash
vercel login
```

3. **Configure variáveis de ambiente:**
```bash
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add ANONYMOUS_FROM
vercel env add START_TIME
vercel env add NODE_ENV
```

4. **Deploy:**
```bash
vercel --prod
```

## 📧 Configuração do Gmail SMTP

### Para usar Gmail como provedor SMTP:

1. **Ative a verificação em 2 etapas:**
   - Acesse [myaccount.google.com](https://myaccount.google.com)
   - Vá para "Segurança"
   - Ative "Verificação em duas etapas"

2. **Gere uma senha de app:**
   - Ainda em "Segurança"
   - Procure por "Senhas de app"
   - Selecione "Email" e "Outro (nome personalizado)"
   - Digite "DarkPaste" como nome
   - Copie a senha gerada

3. **Use a senha de app:**
   - Use seu email normal em `SMTP_USER`
   - Use a senha de app em `SMTP_PASS`

## 🔒 Configurações de Segurança

### Headers de Privacidade (já configurados):
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- `X-Robots-Tag: noindex, nofollow`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### CORS Configurado:
- Permite acesso de qualquer origem (anonimização)
- Métodos permitidos: GET, POST, OPTIONS

## 🧪 Testando o Deploy

1. **Verifique o health check:**
```bash
curl https://seu-projeto.vercel.app/api/health
```

2. **Teste o envio de email:**
```bash
curl -X POST https://seu-projeto.vercel.app/api/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "teste@exemplo.com",
    "subject": "Teste",
    "body": "Email de teste do DarkPaste"
  }'
```

3. **Verifique estatísticas:**
```bash
curl https://seu-projeto.vercel.app/api/stats
```

## 🚨 Troubleshooting

### Erro de SMTP:
- Verifique se as credenciais estão corretas
- Confirme se a senha de app foi gerada corretamente
- Teste com outro provedor SMTP se necessário

### Erro de Build:
- Verifique se todas as dependências estão no `package.json`
- Confirme se o Node.js está na versão correta
- Verifique os logs de build no dashboard do Vercel

### Erro de Deploy:
- Confirme se todas as variáveis de ambiente estão configuradas
- Verifique se o repositório está conectado corretamente
- Consulte os logs de deploy no dashboard

## 📊 Monitoramento

### Logs do Vercel:
- Acesse o dashboard do Vercel
- Vá para "Functions" → "View Function Logs"
- Monitore erros e performance

### Métricas:
- Use `/api/stats` para estatísticas anônimas
- Use `/api/health` para verificar status

## 🔄 Atualizações

Para atualizar o sistema:

1. **Faça push das mudanças:**
```bash
git add .
git commit -m "Atualização do DarkPaste"
git push origin main
```

2. **O Vercel fará deploy automático**

3. **Verifique se tudo está funcionando**

## 🎯 Domínio Personalizado

Para usar um domínio personalizado:

1. **No dashboard do Vercel:**
   - Vá para "Settings" → "Domains"
   - Adicione seu domínio
   - Configure os DNS conforme instruções

2. **Certificado SSL será automático**

---

**🔒 DarkPaste está pronto para uso com privacidade máxima!**
