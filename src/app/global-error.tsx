'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', padding: '40px', textAlign: 'center', background: '#f8fafc', color: '#0f172a' }}>
        <div style={{ maxWidth: '480px', margin: '60px auto', background: '#ffffff', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Critical Application Error</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
            {error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Refresh App
          </button>
        </div>
      </body>
    </html>
  );
}
