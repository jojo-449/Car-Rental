import React, { useCallback, useState } from 'react';
import { brandsApi, categoriesApi } from '../api';
import { assetUrl } from '../api/client';
import { ConfirmDialog, DataTable, Field, ImageUpload, Modal, PageHeader, useLoader } from './ui';

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// shared list + modal form for brands and categories
function NamedCrud({ title, sub, api, imageKey, folder, withDescription }) {
  const fetcher = useCallback(() => api.list(), [api]);
  const { data, error, reload } = useLoader(fetcher);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [formError, setFormError] = useState('');
  const [actionError, setActionError] = useState('');

  const blank = { name: '', description: '', [imageKey]: '' };

  const save = async (e) => {
    e.preventDefault();
    setFormError('');
    const payload = { name: editing.name, [imageKey]: editing[imageKey] || null };
    if (withDescription) {
      payload.description = editing.description || null;
      payload.slug = slugify(editing.name);
    }
    try {
      if (editing.id) await api.update(editing.id, payload);
      else await api.create(payload);
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const remove = async () => {
    try {
      await api.remove(deleting.id);
      setDeleting(null);
      setActionError('');
      reload();
    } catch (err) {
      setDeleting(null);
      setActionError(err.message);
    }
  };

  const columns = [
    { header: 'Image', render: (r) => (r[imageKey] ? <img className="admin-thumb" src={assetUrl(r[imageKey])} alt="" /> : '—') },
    { header: 'Name', render: (r) => r.name },
    ...(withDescription ? [{ header: 'Description', wrap: true, render: (r) => r.description || '—' }] : []),
    {
      header: 'Actions',
      render: (r) => (
        <div className="admin-actions">
          <button className="admin-btn" onClick={() => setEditing({ ...blank, ...r })}>Edit</button>
          <button className="admin-btn danger" onClick={() => setDeleting(r)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader title={title} sub={sub}>
        <span />
        <button className="admin-btn primary" onClick={() => setEditing({ ...blank })}>+ Add</button>
      </PageHeader>
      {(error || actionError) && <p className="admin-error">{error || actionError}</p>}
      <DataTable columns={columns} rows={data || []} />
      {editing && (
        <Modal title={editing.id ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`} onClose={() => setEditing(null)}>
          <form onSubmit={save}>
            <Field label="Name">
              <input className="admin-input" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            {withDescription && (
              <Field label="Description">
                <input className="admin-input" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </Field>
            )}
            <Field label="Image">
              <ImageUpload value={editing[imageKey]} folder={folder} onChange={(url) => setEditing({ ...editing, [imageKey]: url })} />
            </Field>
            {formError && <p className="admin-error">{formError}</p>}
            <div className="admin-modal-footer">
              <button type="button" className="admin-btn" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="admin-btn primary">Save</button>
            </div>
          </form>
        </Modal>
      )}
      {deleting && (
        <ConfirmDialog
          message={`Delete "${deleting.name}"? Vehicles linked to it may be removed too.`}
          onCancel={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
    </>
  );
}

export const BrandsPage = () => (
  <NamedCrud title="Brands" sub="Manage vehicle brands" api={brandsApi} imageKey="logo_url" folder="brands" />
);
export const CategoriesPage = () => (
  <NamedCrud title="Categories" sub="Manage 'Explore by Category' entries" api={categoriesApi} imageKey="image_url" folder="categories" withDescription />
);
