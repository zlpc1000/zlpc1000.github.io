#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔒 DarkPaste - Configuração Inicial\n');

// Verifica se o Node.js está instalado
const nodeVersion = process.version;
console.log(`✅ Node.js ${nodeVersion} detectado`);

// Verifica se o npm está disponível
try {
  const npmVersion = require('child_process').execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm ${npmVersion} detectado`);
} catch (error) {
  console.log('❌ npm não encontrado. Instale o Node.js primeiro.');
  process.exit(1);
}

// Cria arquivo .env.local se não existir
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('\n📝 Criando arquivo .env.local...');
  
  const envContent = `# Configurações do SMTP para envio de emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app

# Email que aparecerá como remetente (será anonimizado)
ANONYMOUS_FROM=anonymous@darkpaste.com

# Timestamp de inicialização (para estatísticas)
START_TIME=${Date.now()}

# Configurações de segurança
NODE_ENV=development`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Arquivo .env.local criado');
} else {
  console.log('✅ Arquivo .env.local já existe');
}

// Instala dependências
console.log('\n📦 Instalando dependências...');
try {
  require('child_process').execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependências instaladas com sucesso');
} catch (error) {
  console.log('❌ Erro ao instalar dependências:', error.message);
  process.exit(1);
}

console.log('\n🎉 Configuração concluída!');
console.log('\n📋 Próximos passos:');
console.log('1. Edite o arquivo .env.local com suas configurações de SMTP');
console.log('2. Execute: npm run dev');
console.log('3. Acesse: http://localhost:3000');
console.log('\n🚀 Para deploy no Vercel:');
console.log('1. Execute: npm i -g vercel');
console.log('2. Execute: vercel login');
console.log('3. Configure as variáveis de ambiente no dashboard do Vercel');
console.log('4. Execute: vercel --prod');
console.log('\n🔒 DarkPaste está pronto para uso!');
