import { ArrowLeft, Download } from 'lucide-react';
import { documentAPI } from '../services/api';

export default function DocumentViewer({ doc, onClose }) {

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <div className="flex items-center mb-6">
        <button onClick={onClose} className="text-blue-600 hover:text-blue-800 mr-4 flex items-center transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1" /> Volver
        </button>
        <h2 className="text-3xl font-bold">{doc.filename}</h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Left side: Metadata */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow overflow-y-auto">
          <h3 className="text-xl font-bold mb-6 text-slate-800 border-b pb-2">Información Extraída</h3>
          <div className="mb-6">
            <p className="text-sm text-slate-500 uppercase font-semibold mb-1">Categoría</p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{doc.category}</span>
          </div>
          <div className="mb-6">
            <p className="text-sm text-slate-500 uppercase font-semibold mb-1">Resumen</p>
            <p className="text-slate-700 leading-relaxed">{doc.summary || "No hay resumen disponible."}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 uppercase font-semibold mb-2">Datos Estructurados (JSON)</p>
            <div className="bg-slate-50 border rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-slate-800">
                {JSON.stringify(doc.extracted_data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        {/* Right side: Actions */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-6 text-slate-800 border-b pb-2">Acciones</h3>
            <button 
              onClick={async () => {
                try {
                  const response = await documentAPI.download(doc.id);
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', doc.filename);
                  document.body.appendChild(link);
                  link.click();
                  link.parentNode.removeChild(link);
                } catch (error) {
                  console.error("Error al descargar:", error);
                  alert("Error al descargar el archivo.");
                }
              }}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 flex items-center justify-center transition-colors font-medium cursor-pointer"
            >
              <Download className="w-5 h-5 mr-2" />
              Descargar Archivo Original
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
