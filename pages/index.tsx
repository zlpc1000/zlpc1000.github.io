import React, { useState } from 'react';
import Head from 'next/head';

interface EmailForm {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  anonymousId?: string;
  error?: string;
}

export default function Home() {
  const [form, setForm] = useState<EmailForm>({
    to: '',
    subject: '',
    body: '',
    from: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Erro de conexão'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Head>
        <title>DarkPaste - Email Anônimo Totalmente Privado</title>
        <meta name="description" content="Envie emails de forma totalmente anônima com criptografia máxima" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🔒</div>
                <div>
                  <h1 className="text-2xl font-bold text-green-400">DarkPaste</h1>
                  <p className="text-sm text-gray-400">Email Anônimo Totalmente Privado</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Nível de Privacidade</div>
                <div className="text-green-400 font-bold">MÁXIMO</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-800">
                <div className="text-green-400 text-2xl mb-3">🛡️</div>
                <h3 className="text-lg font-semibold mb-2">Criptografia AES-256</h3>
                <p className="text-gray-400 text-sm">Seus emails são criptografados com padrão militar</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-800">
                <div className="text-green-400 text-2xl mb-3">👤</div>
                <h3 className="text-lg font-semibold mb-2">Anonimização Total</h3>
                <p className="text-gray-400 text-sm">Nenhum dado pessoal é armazenado ou rastreado</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-800">
                <div className="text-green-400 text-2xl mb-3">⏰</div>
                <h3 className="text-lg font-semibold mb-2">Auto-Destruição</h3>
                <p className="text-gray-400 text-sm">Dados são automaticamente apagados após 24h</p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-gray-900 bg-opacity-50 p-8 rounded-lg border border-gray-800 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email de Destino *
                  </label>
                  <input
                    type="email"
                    name="to"
                    value={form.to}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-20 transition-all"
                    placeholder="destinatario@exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleInputChange}
                    required
                    maxLength={200}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-20 transition-all"
                    placeholder="Assunto do email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="body"
                    value={form.body}
                    onChange={handleInputChange}
                    required
                    maxLength={10000}
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-20 transition-all resize-none"
                    placeholder="Digite sua mensagem aqui..."
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {form.body.length}/10.000 caracteres
                  </div>
                </div>

                {/* Advanced Options */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                  >
                    {showAdvanced ? '▼' : '▶'} Opções Avançadas
                  </button>
                  
                  {showAdvanced && (
                    <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email de Origem (Opcional)
                      </label>
                      <input
                        type="email"
                        name="from"
                        value={form.from}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-20 transition-all"
                        placeholder="remetente@exemplo.com (será anonimizado)"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        ⚠️ Este email será anonimizado e não será rastreado
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>🔒</span>
                      <span>Enviar Email Anônimo</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Result */}
            {result && (
              <div className={`mt-6 p-6 rounded-lg border ${
                result.success 
                  ? 'bg-green-900 bg-opacity-30 border-green-600' 
                  : 'bg-red-900 bg-opacity-30 border-red-600'
              }`}>
                {result.success ? (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-green-400 text-xl">✅</span>
                      <h3 className="text-lg font-semibold text-green-400">Email Enviado com Sucesso!</h3>
                    </div>
                    <p className="text-gray-300 mb-2">{result.message}</p>
                    <div className="text-sm text-gray-400">
                      <p>ID Anônimo: <code className="bg-gray-800 px-2 py-1 rounded">{result.anonymousId}</code></p>
                      <p>Timestamp: {new Date().toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-red-400 text-xl">❌</span>
                      <h3 className="text-lg font-semibold text-red-400">Erro no Envio</h3>
                    </div>
                    <p className="text-gray-300">{result.error}</p>
                  </div>
                )}
              </div>
            )}

            {/* Privacy Notice */}
            <div className="mt-8 p-6 bg-gray-900 bg-opacity-30 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold text-green-400 mb-4">🔒 Garantias de Privacidade</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <ul className="space-y-2">
                  <li>• Criptografia AES-256 end-to-end</li>
                  <li>• Nenhum log de identificação pessoal</li>
                  <li>• IPs são anonimizados automaticamente</li>
                  <li>• Dados são auto-destruídos em 24h</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Sem armazenamento permanente</li>
                  <li>• Sem cookies de rastreamento</li>
                  <li>• Headers de privacidade máxima</li>
                  <li>• Código fonte auditável</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black bg-opacity-50 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-400 text-sm">
              <p>DarkPaste v1.0.0 - Sistema de Email Anônimo</p>
              <p className="mt-1">Desenvolvido com foco em privacidade e segurança máxima</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
