import React, { useState } from 'react';
import { uploadImage, assetUrl } from '../api/client';

export function Modal({ title, onClose, children }) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <Modal title="Please confirm" onClose={onCancel}>
      <p>{message}</p>
      <div className="admin-modal-footer">
        <button className="admin-btn" onClick={onCancel}>Cancel</button>
        <button className="admin-btn danger" onClick={onConfirm}>Confirm</button>
      </div>
    </Modal>
  );
}

const TONES = {
  Active: 'green', Confirmed: 'green', Returned: 'blue', Read: 'blue', Responded: 'green',
  Pending: 'amber', Inactive: 'red', Cancelled: 'red',
};
export function StatusBadge({ status }) {
  return <span className={`admin-badge ${TONES[status] || ''}`}>{status}</span>;
}

export function DataTable({ columns, rows, empty = 'Nothing here yet.' }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>{columns.map((c) => <th key={c.header}>{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="admin-empty">{empty}</td></tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {columns.map((c) => (
                  <td key={c.header} className={c.wrap ? 'wrap' : ''}>{c.render(row)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

export function ImageUpload({ value, folder, onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const { url } = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      {value && <img src={assetUrl(value)} alt="" className="admin-thumb" style={{ width: 120, height: 80, marginBottom: 6 }} />}
      <input type="file" accept="image/*" onChange={pick} disabled={busy} />
      {busy && <span style={{ marginLeft: 8, fontSize: 12 }}>Uploading…</span>}
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
}

// loads a list and exposes reload + error handling for admin screens
export function useLoader(fetcher) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const reload = React.useCallback(() => {
    fetcher().then((d) => { setData(d); setError(''); }).catch((e) => setError(e.message));
  }, [fetcher]);
  React.useEffect(() => { reload(); }, [reload]);
  return { data, error, reload, setData };
}

export function PageHeader({ title, sub, children }) {
  return (
    <>
      <h1 className="admin-page-title">{title}</h1>
      {sub && <p className="admin-page-sub">{sub}</p>}
      {children && <div className="admin-toolbar">{children}</div>}
    </>
  );
}
