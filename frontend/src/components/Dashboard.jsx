export default function Dashboard({ stats }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Métricas del Sistema</h2>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-slate-500 text-sm">Total Documentos</p>
          <p className="text-4xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-emerald-500">
          <p className="text-slate-500 text-sm">Procesados Exitosamente</p>
          <p className="text-4xl font-bold">{stats.processed}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-slate-500 text-sm">Errores de Extracción</p>
          <p className="text-4xl font-bold">{stats.errors}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Distribución por Categoría</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.categories || {}).map(([cat, count]) => (
            <div key={cat} className="p-4 border rounded-lg bg-slate-50 text-center">
              <p className="text-slate-500 text-sm mb-1">{cat}</p>
              <p className="text-2xl font-bold text-slate-800">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
