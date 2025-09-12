// Exemplos de uso da API DarkPaste
// Execute com: node examples/api-usage.js

const BASE_URL = 'https://seu-projeto.vercel.app'; // Substitua pela sua URL

// Função para fazer requisições
async function makeRequest(endpoint, method = 'GET', data = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Exemplo 1: Enviar email anônimo
async function sendAnonymousEmail() {
  console.log('📧 Enviando email anônimo...');
  
  const emailData = {
    to: 'destinatario@exemplo.com',
    subject: 'Teste do DarkPaste',
    body: 'Este é um email de teste enviado através do DarkPaste - sistema totalmente anônimo e privado.',
    from: 'remetente@exemplo.com' // Opcional, será anonimizado
  };

  const result = await makeRequest('/api/send', 'POST', emailData);
  
  if (result && result.success) {
    console.log('✅ Email enviado com sucesso!');
    console.log(`ID Anônimo: ${result.anonymousId}`);
    console.log(`Timestamp: ${new Date(result.timestamp)}`);
  } else {
    console.log('❌ Erro ao enviar email:', result?.error);
  }
}

// Exemplo 2: Verificar estatísticas
async function getStats() {
  console.log('📊 Obtendo estatísticas...');
  
  const result = await makeRequest('/api/stats');
  
  if (result && result.success) {
    console.log('✅ Estatísticas obtidas:');
    console.log(`Total de emails: ${result.stats.totalEmails}`);
    console.log(`Emails ativos: ${result.stats.activeEmails}`);
    console.log(`Uptime: ${result.stats.uptime} segundos`);
    console.log(`Versão: ${result.stats.version}`);
  } else {
    console.log('❌ Erro ao obter estatísticas:', result?.error);
  }
}

// Exemplo 3: Verificar saúde do sistema
async function checkHealth() {
  console.log('🏥 Verificando saúde do sistema...');
  
  const result = await makeRequest('/api/health');
  
  if (result && result.success) {
    console.log('✅ Sistema operacional:');
    console.log(`Status: ${result.status}`);
    console.log(`Modo escuro: ${result.darkMode}`);
    console.log(`Privacidade: ${result.privacy}`);
    console.log(`Email configurado: ${result.emailConfigured}`);
  } else {
    console.log('❌ Erro ao verificar saúde:', result?.error);
  }
}

// Exemplo 4: Enviar email com dados sensíveis (criptografado)
async function sendSensitiveEmail() {
  console.log('🔒 Enviando email sensível...');
  
  const sensitiveData = {
    to: 'admin@empresa.com',
    subject: 'Relatório Confidencial',
    body: `
      Dados confidenciais:
      - Usuário: João Silva
      - CPF: 123.456.789-00
      - Salário: R$ 15.000,00
      - Departamento: TI
      
      Este email é totalmente criptografado e anônimo.
    `
  };

  const result = await makeRequest('/api/send', 'POST', sensitiveData);
  
  if (result && result.success) {
    console.log('✅ Email sensível enviado com segurança!');
    console.log(`ID Anônimo: ${result.anonymousId}`);
    console.log('🔐 Dados criptografados com AES-256');
  } else {
    console.log('❌ Erro ao enviar email sensível:', result?.error);
  }
}

// Exemplo 5: Teste de stress (múltiplos emails)
async function stressTest() {
  console.log('⚡ Iniciando teste de stress...');
  
  const emails = [];
  for (let i = 0; i < 5; i++) {
    emails.push({
      to: `teste${i}@exemplo.com`,
      subject: `Teste ${i + 1}`,
      body: `Este é o teste número ${i + 1} do DarkPaste.`
    });
  }

  const promises = emails.map(email => makeRequest('/api/send', 'POST', email));
  const results = await Promise.all(promises);
  
  const successCount = results.filter(r => r && r.success).length;
  console.log(`✅ ${successCount}/${emails.length} emails enviados com sucesso`);
}

// Função principal
async function main() {
  console.log('🔒 DarkPaste - Exemplos de Uso da API\n');
  
  // Verificar saúde primeiro
  await checkHealth();
  console.log('');
  
  // Obter estatísticas
  await getStats();
  console.log('');
  
  // Enviar email simples
  await sendAnonymousEmail();
  console.log('');
  
  // Enviar email sensível
  await sendSensitiveEmail();
  console.log('');
  
  // Teste de stress
  await stressTest();
  console.log('');
  
  // Estatísticas finais
  await getStats();
  
  console.log('\n🎉 Todos os exemplos executados!');
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  sendAnonymousEmail,
  getStats,
  checkHealth,
  sendSensitiveEmail,
  stressTest
};
