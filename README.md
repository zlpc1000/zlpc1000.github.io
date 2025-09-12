# 🔒 DarkPaste - Email Anônimo Totalmente Privado

Sistema de email totalmente privado e anônimo com backend no Vercel, oferecendo privacidade máxima similar ao Tor.

## ✨ Características

- **🔐 Criptografia AES-256**: Todos os emails são criptografados com padrão militar
- **👤 Anonimização Total**: Nenhum dado pessoal é armazenado ou rastreado
- **⏰ Auto-Destruição**: Dados são automaticamente apagados após 24 horas
- **🌐 Backend Vercel**: Infraestrutura serverless e escalável
- **🚫 Zero Logs**: Nenhum log de identificação pessoal
- **🛡️ Headers de Segurança**: Configurações de privacidade máxima

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/darkpaste.git
cd darkpaste
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações de SMTP.

## ⚙️ Configuração

### Variáveis de Ambiente Necessárias

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app
ANONYMOUS_FROM=anonymous@darkpaste.com
```

### Configuração do Gmail

Para usar o Gmail como provedor SMTP:

1. Ative a verificação em 2 etapas na sua conta Google
2. Gere uma "Senha de app" específica para este projeto
3. Use essa senha na variável `SMTP_PASS`

## 🚀 Deploy no Vercel

1. Instale o Vercel CLI:
```bash
npm i -g vercel
```

2. Faça login no Vercel:
```bash
vercel login
```

3. Configure as variáveis de ambiente no dashboard do Vercel:
```bash
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add ANONYMOUS_FROM
```

4. Deploy:
```bash
vercel --prod
```

## 📡 API Endpoints

### POST /api/send
Envia um email anônimo.

**Body:**
```json
{
  "to": "destinatario@exemplo.com",
  "subject": "Assunto do email",
  "body": "Conteúdo da mensagem",
  "from": "remetente@exemplo.com" // opcional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email enviado com sucesso",
  "anonymousId": "abc123def456",
  "timestamp": 1700000000000,
  "privacy": "maximum"
}
```

### GET /api/stats
Retorna estatísticas anônimas do sistema.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalEmails": 150,
    "activeEmails": 12,
    "uptime": 86400,
    "privacy": "maximum",
    "version": "1.0.0"
  }
}
```

### GET /api/health
Verifica o status do sistema.

**Response:**
```json
{
  "success": true,
  "status": "operational",
  "darkMode": true,
  "privacy": "maximum",
  "emailConfigured": true
}
```

## 🔒 Recursos de Privacidade

### Criptografia
- **AES-256-CBC**: Criptografia simétrica de alta segurança
- **IV Aleatório**: Cada email usa um Initialization Vector único
- **Chaves Temporárias**: Chaves são geradas e descartadas automaticamente

### Anonimização
- **Sem Logs Pessoais**: Apenas IDs anônimos são registrados
- **Headers de Privacidade**: Configurações para evitar rastreamento
- **CORS Aberto**: Permite acesso de qualquer origem (anonimização)

### Armazenamento
- **Temporário**: Dados são armazenados apenas em memória
- **Auto-Limpeza**: Limpeza automática de emails expirados
- **Sem Persistência**: Nenhum dado é salvo em disco

## 🛡️ Segurança

- **Validação de Input**: Sanitização de todos os dados de entrada
- **Rate Limiting**: Proteção contra spam (implementar conforme necessário)
- **Headers de Segurança**: X-Frame-Options, X-Content-Type-Options, etc.
- **Código Auditável**: Código fonte aberto para auditoria

## 📱 Interface

A interface web oferece:
- Design dark moderno
- Formulário intuitivo
- Feedback em tempo real
- Opções avançadas
- Garantias de privacidade visíveis

## 🔧 Desenvolvimento

```bash
# Modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Deploy no Vercel
npm run deploy
```

## 📄 Licença

MIT License - Veja o arquivo LICENSE para detalhes.

## ⚠️ Aviso Legal

Este sistema é desenvolvido para fins educacionais e de privacidade. O usuário é responsável por cumprir todas as leis locais e regulamentações sobre envio de emails. Não nos responsabilizamos pelo uso indevido desta ferramenta.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

---

**DarkPaste** - Privacidade máxima, anonimato total. 🔒
