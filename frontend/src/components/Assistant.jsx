import { useState } from 'react';
import { ragAPI } from '../services/api';

export default function Assistant() {
  const [query, setQuery] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    const newLog = [...chatLog, { role: 'user', text: query }];
    setChatLog(newLog);
    setQuery('');
    setLoading(true);
    try {
      const res = await ragAPI.query(query);
      setChatLog([...newLog, { role: 'ai', text: res.data.answer, sources: res.data.sources }]);
    } catch (error) {
      setChatLog([...newLog, { role: 'ai', text: "Error al consultar la base de datos documental." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-h-[800px] bg-white rounded-lg shadow">
      <div className="p-4 border-b bg-slate-50 rounded-t-lg">
        <h2 className="text-xl font-bold">Consultas Semánticas (RAG)</h2>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {chatLog.length === 0 ? (
          <p className="text-slate-400 text-center mt-10">Haz una pregunta sobre los documentos almacenados...</p>
        ) : (
          chatLog.map((msg, i) => (
            <div key={i} className={`p-4 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-slate-100'}`}>
              <p>{msg.text}</p>
              {msg.sources && msg.sources.length > 0 && (
                <p className="text-xs text-slate-500 mt-2 font-mono">Fuentes: {msg.sources.join(', ')}</p>
              )}
            </div>
          ))
        )}
        {loading && <p className="text-slate-400 text-sm p-4">Analizando documentos...</p>}
      </div>
      <form onSubmit={handleChatSubmit} className="p-4 border-t flex gap-2">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ej: ¿Qué experiencia tiene Camila Rojas?" className="flex-1 border rounded p-2 focus:outline-blue-500" disabled={loading} />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50" disabled={loading}>Enviar</button>
      </form>
    </div>
  );
}
