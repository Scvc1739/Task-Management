export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-100 to-sky-200 animate-gradient">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {children}
      </div>
    </div>
  );
}
