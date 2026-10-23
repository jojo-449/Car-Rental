import React, { useCallback, useEffect, useState } from 'react';
import { brandsApi, carsApi, categoriesApi } from '../api';
import { assetUrl } from '../api/client';
import { FEATURES, formatMoney } from '../utils/cars';
import { ConfirmDialog, DataTable, Field, ImageUpload, Modal, PageHeader, StatusBadge, useLoader } from './ui';

const blank = {
  title: '', overview: '', brand_id: '', category_id: '', price_per_day: '', fuel_type: 'Petrol',
  model_year: new Date().getFullYear(), seating_capacity: 5, transmission: 'Automatic', image_url: '',
  is_featured: false, is_slider: false, is_available: true,
  ...Object.fromEntries(FEATURES.map(([k]) => [k, false])),
};

export default function Vehicles() {
  const [showAll, setShowAll] = useState(true);
  const fetcher = useCallback(() => carsApi.list({ available_only: showAll ? 'false' : 'true' }), [showAll]);
  const { data, error, reload } = useLoader(fetcher);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [formError, setFormError] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    brandsApi.list().then(setBrands).catch(() => {});
    categoriesApi.list().then(setCategories).catch(() => {});
  }, []);

  const set = (k, v) => setEditing((e) => ({ ...e, [k]: v }));

  const startEdit = (car) =>
    setEditing({ ...blank, ...car, brand_id: car.brand_id, category_id: car.category_id ?? '', overview: car.overview || '', image_url: car.image_url || '' });

  const save = async (e) => {
    e.preventDefault();
    setFormError('');
    const payload = {
      ...Object.fromEntries(Object.keys(blank).map((k) => [k, editing[k]])),
      brand_id: Number(editing.brand_id),
      category_id: editing.category_id === '' ? null : Number(editing.category_id),
      price_per_day: Number(editing.price_per_day),
      model_year: Number(editing.model_year),
      seating_capacity: Number(editing.seating_capacity),
      overview: editing.overview || null,
      image_url: editing.image_url || null,
    };
    try {
      if (editing.id) await carsApi.update(editing.id, payload);
      else await carsApi.create(payload);
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const toggleAvailability = async (car) => {
    try {
      await carsApi.update(car.id, { is_available: !car.is_available });
      reload();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const remove = async () => {
    try {
      await carsApi.remove(deleting.id);
      setActionError('');
    } catch (err) {
      setActionError(err.message);
    }
    setDeleting(null);
    reload();
  };

  const columns = [
    { header: 'Image', render: (r) => (r.image_url ? <img className="admin-thumb" src={assetUrl(r.image_url)} alt="" /> : '—') },
    { header: 'Title', render: (r) => r.title },
    { header: 'Brand', render: (r) => r.brand?.name },
    { header: 'Category', render: (r) => r.category?.name || '—' },
    { header: 'Price/day', render: (r) => formatMoney(r.price_per_day) },
    { header: 'Flags', render: (r) => [r.is_featured && 'Featured', r.is_slider && 'Slider'].filter(Boolean).join(', ') || '—' },
    { header: 'Status', render: (r) => <StatusBadge status={r.is_available ? 'Active' : 'Inactive'} /> },
    {
      header: 'Actions',
      render: (r) => (
        <div className="admin-actions">
          <button className="admin-btn" onClick={() => startEdit(r)}>Edit</button>
          <button className="admin-btn" onClick={() => toggleAvailability(r)}>{r.is_available ? 'Disable' : 'Enable'}</button>
          <button className="admin-btn danger" onClick={() => setDeleting(r)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Vehicles" sub="Post and manage the rental fleet">
        <label style={{ fontSize: 13 }}>
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> Include unavailable
        </label>
        <button className="admin-btn primary" onClick={() => setEditing({ ...blank })}>+ Post Vehicle</button>
      </PageHeader>
      {(error || actionError) && <p className="admin-error">{error || actionError}</p>}
      <DataTable columns={columns} rows={data || []} />

      {editing && (
        <Modal title={editing.id ? 'Edit Vehicle' : 'Post Vehicle'} onClose={() => setEditing(null)}>
          <form onSubmit={save}>
            <Field label="Title">
              <input className="admin-input" required value={editing.title} onChange={(e) => set('title', e.target.value)} />
            </Field>
            <div className="admin-grid-2">
              <Field label="Brand">
                <select className="admin-select" required value={editing.brand_id} onChange={(e) => set('brand_id', e.target.value)}>
                  <option value="">Select…</option>
                  {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </Field>
              <Field label="Category">
                <select className="admin-select" value={editing.category_id} onChange={(e) => set('category_id', e.target.value)}>
                  <option value="">None</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Price per day">
                <input className="admin-input" type="number" min="0" step="0.01" required value={editing.price_per_day} onChange={(e) => set('price_per_day', e.target.value)} />
              </Field>
              <Field label="Fuel type">
                <select className="admin-select" value={editing.fuel_type} onChange={(e) => set('fuel_type', e.target.value)}>
                  {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'].map((f) => <option key={f}>{f}</option>)}
                </select>
              </Field>
              <Field label="Model year">
                <input className="admin-input" type="number" min="1990" max="2100" required value={editing.model_year} onChange={(e) => set('model_year', e.target.value)} />
              </Field>
              <Field label="Seating capacity">
                <input className="admin-input" type="number" min="1" max="20" required value={editing.seating_capacity} onChange={(e) => set('seating_capacity', e.target.value)} />
              </Field>
              <Field label="Transmission">
                <select className="admin-select" value={editing.transmission} onChange={(e) => set('transmission', e.target.value)}>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </Field>
            </div>
            <Field label="Overview">
              <textarea className="admin-textarea" value={editing.overview} onChange={(e) => set('overview', e.target.value)} />
            </Field>
            <Field label="Image">
              <ImageUpload value={editing.image_url} folder="cars" onChange={(url) => set('image_url', url)} />
            </Field>
            <div className="admin-checks">
              {[['is_featured', 'Featured on home'], ['is_slider', 'Show in hero slider'], ['is_available', 'Available for rent']].map(([k, l]) => (
                <label key={k}><input type="checkbox" checked={editing[k]} onChange={(e) => set(k, e.target.checked)} /> {l}</label>
              ))}
            </div>
            <strong style={{ fontSize: 13 }}>Accessories</strong>
            <div className="admin-checks" style={{ marginTop: 6 }}>
              {FEATURES.map(([k, l]) => (
                <label key={k}><input type="checkbox" checked={editing[k]} onChange={(e) => set(k, e.target.checked)} /> {l}</label>
              ))}
            </div>
            {formError && <p className="admin-error">{formError}</p>}
            <div className="admin-modal-footer">
              <button type="button" className="admin-btn" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="admin-btn primary">Save</button>
            </div>
          </form>
        </Modal>
      )}
      {deleting && <ConfirmDialog message={`Delete "${deleting.title}" and its bookings?`} onCancel={() => setDeleting(null)} onConfirm={remove} />}
    </>
  );
}
