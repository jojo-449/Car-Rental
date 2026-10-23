import React, { useCallback, useState } from 'react';
import { bookingsApi, testimonialsApi, contactApi, adminApi, pagesApi, authApi } from '../api';
import { formatDate, formatMoney } from '../utils/cars';
import { ConfirmDialog, DataTable, Field, PageHeader, StatusBadge, useLoader } from './ui';

// runs an async action, surfaces errors, then reloads
function useAction(reload) {
  const [error, setError] = useState('');
  const run = async (fn) => {
    try {
      await fn();
      setError('');
      reload();
    } catch (e) {
      setError(e.message);
    }
  };
  return [error, run];
}

export function BookingsPage() {
  const [filter, setFilter] = useState('');
  const fetcher = useCallback(() => bookingsApi.adminAll(filter), [filter]);
  const { data, error, reload } = useLoader(fetcher);
  const [actionError, run] = useAction(reload);
  const set = (id, status) => run(() => bookingsApi.adminStatus(id, status));

  const columns = [
    { header: '#', render: (r) => r.id },
    { header: 'Customer', render: (r) => (<>{r.user?.full_name}<br /><small>{r.user?.email}</small></>) },
    { header: 'Vehicle', render: (r) => r.car?.title },
    { header: 'Dates', render: (r) => `${formatDate(r.from_date)} → ${formatDate(r.to_date)}` },
    { header: 'Total', render: (r) => formatMoney(r.total_cost) },
    { header: 'Message', wrap: true, render: (r) => r.message || '—' },
    { header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      header: 'Actions',
      render: (r) => (
        <div className="admin-actions">
          {r.status === 'Pending' && <button className="admin-btn success" onClick={() => set(r.id, 'Confirmed')}>Confirm</button>}
          {['Pending', 'Confirmed', 'Active'].includes(r.status) && <button className="admin-btn danger" onClick={() => set(r.id, 'Cancelled')}>Cancel</button>}
          {['Confirmed', 'Active'].includes(r.status) && <button className="admin-btn" onClick={() => set(r.id, 'Returned')}>Mark returned</button>}
        </div>
      ),
    },
  ];
  return (
    <>
      <PageHeader title="Bookings" sub="Confirm or cancel customer bookings">
        <select className="admin-select" style={{ width: 180 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All statuses</option>
          {['Pending', 'Confirmed', 'Active', 'Returned', 'Cancelled'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </PageHeader>
      {(error || actionError) && <p className="admin-error">{error || actionError}</p>}
      <DataTable columns={columns} rows={data || []} />
    </>
  );
}

export function TestimonialsAdmin() {
  const fetcher = useCallback(() => testimonialsApi.adminAll(), []);
  const { data, error, reload } = useLoader(fetcher);
  const [actionError, run] = useAction(reload);
  const [deleting, setDeleting] = useState(null);
  const columns = [
    { header: 'User', render: (r) => r.user?.full_name || r.user_id },
    { header: 'Testimonial', wrap: true, render: (r) => r.content },
    { header: 'Posted', render: (r) => formatDate(r.created_at) },
    { header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      header: 'Actions',
      render: (r) => (
        <div className="admin-actions">
          <button className="admin-btn" onClick={() => run(() => testimonialsApi.setStatus(r.id, r.status === 'Active' ? 'Inactive' : 'Active'))}>
            {r.status === 'Active' ? 'Deactivate' : 'Activate'}
          </button>
          <button className="admin-btn danger" onClick={() => setDeleting(r)}>Delete</button>
        </div>
      ),
    },
  ];
  return (
    <>
      <PageHeader title="Testimonials" sub="Activate or deactivate customer testimonials" />
      {(error || actionError) && <p className="admin-error">{error || actionError}</p>}
      <DataTable columns={columns} rows={data || []} />
      {deleting && <ConfirmDialog message="Delete this testimonial?" onCancel={() => setDeleting(null)} onConfirm={() => { run(() => testimonialsApi.remove(deleting.id)); setDeleting(null); }} />}
    </>
  );
}

export function QueriesPage() {
  const fetcher = useCallback(() => contactApi.queries(), []);
  const { data, error, reload } = useLoader(fetcher);
  const [actionError, run] = useAction(reload);
  const [deleting, setDeleting] = useState(null);
  const columns = [
    { header: 'From', render: (r) => (<>{r.name}<br /><small>{r.email}{r.phone_number ? ` · ${r.phone_number}` : ''}</small></>) },
    { header: 'Message', wrap: true, render: (r) => r.message },
    { header: 'Received', render: (r) => formatDate(r.created_at) },
    { header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      header: 'Actions',
      render: (r) => (
        <div className="admin-actions">
          <select className="admin-select" style={{ width: 120 }} value={r.status} onChange={(e) => run(() => contactApi.setQueryStatus(r.id, e.target.value))}>
            {['Pending', 'Read', 'Responded'].map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="admin-btn danger" onClick={() => setDeleting(r)}>Delete</button>
        </div>
      ),
    },
  ];
  return (
    <>
      <PageHeader title="Contact Queries" sub="Enquiries from the Contact Us form" />
      {(error || actionError) && <p className="admin-error">{error || actionError}</p>}
      <DataTable columns={columns} rows={data || []} />
      {deleting && <ConfirmDialog message="Delete this enquiry?" onCancel={() => setDeleting(null)} onConfirm={() => { run(() => contactApi.removeQuery(deleting.id)); setDeleting(null); }} />}
    </>
  );
}

export function SubscribersPage() {
  const fetcher = useCallback(() => contactApi.subscribers(), []);
  const { data, error, reload } = useLoader(fetcher);
  const [actionError, run] = useAction(reload);
  const [deleting, setDeleting] = useState(null);
  const columns = [
    { header: 'Email', render: (r) => r.email },
    { header: 'Subscribed', render: (r) => formatDate(r.created_at) },
    { header: 'Actions', render: (r) => <button className="admin-btn danger" onClick={() => setDeleting(r)}>Remove</button> },
  ];
  return (
    <>
      <PageHeader title="Subscribers" sub="Newsletter subscribers" />
      {(error || actionError) && <p className="admin-error">{error || actionError}</p>}
      <DataTable columns={columns} rows={data || []} />
      {deleting && <ConfirmDialog message={`Remove ${deleting.email}?`} onCancel={() => setDeleting(null)} onConfirm={() => { run(() => contactApi.removeSubscriber(deleting.id)); setDeleting(null); }} />}
    </>
  );
}

export function UsersPage() {
  const fetcher = useCallback(() => adminApi.users(), []);
  const { data, error } = useLoader(fetcher);
  const columns = [
    { header: 'Name', render: (r) => r.full_name },
    { header: 'Email', render: (r) => r.email },
    { header: 'Phone', render: (r) => r.phone_number || '—' },
    { header: 'Country', render: (r) => r.country || '—' },
    { header: 'Role', render: (r) => <StatusBadge status={r.is_admin ? 'Active' : 'Pending'} /> },
    { header: 'Registered', render: (r) => formatDate(r.created_at) },
  ];
  // role badge reads better as text
  columns[4].render = (r) => <span className={`admin-badge ${r.is_admin ? 'blue' : ''}`}>{r.is_admin ? 'Admin' : 'Customer'}</span>;
  return (
    <>
      <PageHeader title="Registered Users" sub="Details of everyone who has signed up" />
      {error && <p className="admin-error">{error}</p>}
      <DataTable columns={columns} rows={data || []} />
    </>
  );
}

export function PagesAdmin() {
  const fetcher = useCallback(() => pagesApi.list(), []);
  const { data, error, reload } = useLoader(fetcher);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');

  const save = async (e) => {
    e.preventDefault();
    try {
      await pagesApi.update(editing.page_type, { title: editing.title, content: editing.content });
      setMsg(`"${editing.title}" saved`);
      setEditing(null);
      reload();
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <>
      <PageHeader title="Page Content" sub="Edit About Us, Terms, Privacy and Contact details" />
      {(error || msg) && <p className={error ? 'admin-error' : ''} style={{ fontSize: 13 }}>{error || msg}</p>}
      {!editing && (
        <DataTable
          columns={[
            { header: 'Page', render: (r) => r.page_type },
            { header: 'Title', render: (r) => r.title },
            { header: 'Updated', render: (r) => formatDate(r.updated_at) },
            { header: 'Actions', render: (r) => <button className="admin-btn" onClick={() => { setMsg(''); setEditing(r); }}>Edit</button> },
          ]}
          rows={data || []}
        />
      )}
      {editing && (
        <form className="admin-card" onSubmit={save}>
          <Field label="Title">
            <input className="admin-input" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          </Field>
          <Field label="Content">
            <textarea className="admin-textarea" style={{ minHeight: 240 }} required value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
          </Field>
          <div className="admin-modal-footer">
            <button type="button" className="admin-btn" onClick={() => setEditing(null)}>Cancel</button>
            <button type="submit" className="admin-btn primary">Save</button>
          </div>
        </form>
      )}
    </>
  );
}

export function AdminPassword() {
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState({ text: '', error: false });
  const submit = async (e) => {
    e.preventDefault();
    try {
      await authApi.changePassword(oldPw, newPw);
      setOldPw('');
      setNewPw('');
      setMsg({ text: 'Password updated', error: false });
    } catch (err) {
      setMsg({ text: err.message, error: true });
    }
  };
  return (
    <>
      <PageHeader title="Change Password" sub="Update your admin password" />
      <form className="admin-card" style={{ maxWidth: 420 }} onSubmit={submit}>
        <Field label="Current password">
          <input className="admin-input" type="password" required value={oldPw} onChange={(e) => setOldPw(e.target.value)} />
        </Field>
        <Field label="New password (min 8 characters)">
          <input className="admin-input" type="password" required minLength={8} value={newPw} onChange={(e) => setNewPw(e.target.value)} />
        </Field>
        {msg.text && <p className={msg.error ? 'admin-error' : ''} style={{ fontSize: 13 }}>{msg.text}</p>}
        <button type="submit" className="admin-btn primary">Update password</button>
      </form>
    </>
  );
}
