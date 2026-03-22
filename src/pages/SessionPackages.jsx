import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Package, Search, X, ChevronLeft, ChevronRight, Home, Save, Check } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';

const SessionPackages = () => {
  const [packages, setPackages] = useState([]);
  const [sports, setSports] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSport, setFilterSport] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

  const [form, setForm] = useState({
    sportId: '',
    coachId: '',
    facilityId: '',
    name: '',
    description: '',
    numberOfSessions: '',
    pricePerSession: '',
    totalPrice: '',
    discount: '0',
    validityDays: '90'
  });

  const [homeSessionPrices, setHomeSessionPrices] = useState({});
  const [savingHomePrice, setSavingHomePrice] = useState(null);
  const [homePriceSuccess, setHomePriceSuccess] = useState(null);

  const token = localStorage.getItem('access_token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchPackages();
    fetchSports();
    fetchCoaches();
    fetchFacilities();
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [pagination.page, filterSport, filterStatus, searchQuery]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit
      });
      if (filterSport) params.append('sportId', filterSport);
      if (filterStatus) params.append('status', filterStatus);
      if (searchQuery) params.append('search', searchQuery);

      const res = await axios.get(`${URL}/api/admin/session-packages?${params}`, { headers });
      if (res.data.success) {
        setPackages(res.data.data);
        setPagination(prev => ({ ...prev, total: res.data.pagination.total, totalPages: res.data.pagination.totalPages }));
      }
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError('Failed to load session packages');
    } finally {
      setLoading(false);
    }
  };

  const fetchSports = async () => {
    try {
      const res = await axios.get(`${URL}/api/sports`, { headers });
      if (res.data.success) {
        setSports(res.data.data);
        // Initialize home session prices from sport data
        const prices = {};
        res.data.data.forEach(sport => {
          prices[sport.id] = sport.homeSessionPrice || '';
        });
        setHomeSessionPrices(prices);
      }
    } catch (err) {
      console.error('Error fetching sports:', err);
    }
  };

  const updateHomeSessionPrice = async (sportId) => {
    setSavingHomePrice(sportId);
    setHomePriceSuccess(null);
    try {
      const price = homeSessionPrices[sportId];
      await axios.patch(`${URL}/api/admin/sports/${sportId}`, {
        homeSessionPrice: price === '' ? null : Number(price)
      }, { headers });
      setHomePriceSuccess(sportId);
      setTimeout(() => setHomePriceSuccess(null), 2000);
    } catch (err) {
      console.error('Error updating home session price:', err);
      alert(err.response?.data?.message || 'Failed to update price');
    } finally {
      setSavingHomePrice(null);
    }
  };

  const fetchCoaches = async () => {
    try {
      const res = await axios.get(`${URL}/api/admin/coaches?limit=50`, { headers });
      if (res.data.success) setCoaches(res.data.data);
    } catch (err) {
      console.error('Error fetching coaches:', err);
    }
  };

  const fetchFacilities = async () => {
    try {
      const res = await axios.get(`${URL}/api/admin/facilities?limit=50`, { headers });
      if (res.data.success) setFacilities(res.data.data);
    } catch (err) {
      console.error('Error fetching facilities:', err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate total price when sessions or price per session changes
      if (name === 'numberOfSessions' || name === 'pricePerSession' || name === 'discount') {
        const sessions = name === 'numberOfSessions' ? Number(value) : Number(updated.numberOfSessions);
        const price = name === 'pricePerSession' ? Number(value) : Number(updated.pricePerSession);
        const discount = name === 'discount' ? Number(value) : Number(updated.discount);
        if (sessions > 0 && price > 0) {
          const subtotal = sessions * price;
          const discountAmount = (subtotal * discount) / 100;
          updated.totalPrice = (subtotal - discountAmount).toFixed(2);
        }
      }

      return updated;
    });
  };

  const resetForm = () => {
    setForm({
      sportId: '',
      coachId: '',
      facilityId: '',
      name: '',
      description: '',
      numberOfSessions: '',
      pricePerSession: '',
      totalPrice: '',
      discount: '0',
      validityDays: '90'
    });
    setEditingPackage(null);
    setError('');
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setForm({
      sportId: pkg.sportId || '',
      coachId: pkg.coachId || '',
      facilityId: pkg.facilityId || '',
      name: pkg.name || '',
      description: pkg.description || '',
      numberOfSessions: String(pkg.numberOfSessions || ''),
      pricePerSession: String(pkg.pricePerSession || ''),
      totalPrice: String(pkg.totalPrice || ''),
      discount: String(pkg.discount || '0'),
      validityDays: String(pkg.validityDays || '90')
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        sportId: form.sportId,
        coachId: form.coachId || null,
        facilityId: form.facilityId || null,
        name: form.name,
        description: form.description,
        numberOfSessions: Number(form.numberOfSessions),
        pricePerSession: Number(form.pricePerSession),
        totalPrice: Number(form.totalPrice),
        discount: Number(form.discount),
        validityDays: Number(form.validityDays)
      };

      if (editingPackage) {
        await axios.put(`${URL}/api/admin/session-packages/${editingPackage.id}`, payload, { headers });
      } else {
        await axios.post(`${URL}/api/admin/session-packages`, payload, { headers });
      }

      setShowModal(false);
      resetForm();
      fetchPackages();
    } catch (err) {
      console.error('Error saving package:', err);
      setError(err.response?.data?.message || 'Failed to save session package');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (pkg) => {
    if (!window.confirm(`Are you sure you want to delete "${pkg.name}"?`)) return;

    try {
      await axios.delete(`${URL}/api/admin/session-packages/${pkg.id}`, { headers });
      fetchPackages();
    } catch (err) {
      console.error('Error deleting package:', err);
      alert(err.response?.data?.message || 'Failed to delete package');
    }
  };

  const handleToggleStatus = async (pkg) => {
    try {
      const newStatus = pkg.status === 'active' ? 'inactive' : 'active';
      await axios.put(`${URL}/api/admin/session-packages/${pkg.id}`, { status: newStatus }, { headers });
      fetchPackages();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const formatPrice = (amount) => {
    return `₦${Number(amount).toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4">
      {/* Home Session Pricing Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Home size={24} className="text-green-600" />
            Home Session Pricing
          </h2>
          <p className="text-gray-500 text-sm mt-1">Set the home session price for each sport. This price is shown to users when they book a home session.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sports.map(sport => (
            <div key={sport.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{sport.icon || '🏅'}</span>
                <span className="font-semibold text-gray-800">{sport.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₦</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={homeSessionPrices[sport.id] || ''}
                    onChange={(e) => setHomeSessionPrices(prev => ({ ...prev, [sport.id]: e.target.value }))}
                    placeholder="Set price"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  onClick={() => updateHomeSessionPrice(sport.id)}
                  disabled={savingHomePrice === sport.id}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    homePriceSuccess === sport.id
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-[#7042D2] text-white hover:bg-[#5e35b1]'
                  } disabled:opacity-50`}
                >
                  {savingHomePrice === sport.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : homePriceSuccess === sport.id ? (
                    <><Check size={14} /> Saved</>
                  ) : (
                    <><Save size={14} /> Save</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Session Packages</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage training packages for different sports</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-[#7042D2] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#5e35b1] transition-colors border-r-[4px] border-b-[3px] border-[#4a2a9e]"
        >
          <Plus size={18} />
          Create Package
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7042D2] text-sm"
          />
        </div>

        <select
          value={filterSport}
          onChange={(e) => {
            setFilterSport(e.target.value);
            setPagination(prev => ({ ...prev, page: 1 }));
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
        >
          <option value="">All Sports</option>
          {sports.map(sport => (
            <option key={sport.id} value={sport.id}>{sport.name}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPagination(prev => ({ ...prev, page: 1 }));
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-4">
          <p className="text-sm text-gray-500">Total Packages</p>
          <p className="font-semibold text-3xl">{pagination.total}</p>
        </div>
        <div className="border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="font-semibold text-3xl text-green-600">
            {packages.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="border border-black border-r-[6px] border-b-[4px] rounded-2xl py-2 px-4">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="font-semibold text-3xl text-gray-400">
            {packages.filter(p => p.status === 'inactive').length}
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7042D2]"></div>
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No session packages found</p>
          <p className="text-gray-400 text-sm mt-1">Create your first package to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              className="border border-black border-r-[6px] border-b-[4px] rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              {/* Top section */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-[#7042D2] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {pkg.Sport?.name || 'Unknown Sport'}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {pkg.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-1">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pkg.description || 'No description'}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sessions</span>
                    <span className="font-semibold">{pkg.numberOfSessions} sessions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price/Session</span>
                    <span className="font-semibold">{formatPrice(pkg.pricePerSession)}</span>
                  </div>
                  {Number(pkg.discount) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-semibold text-green-600">{pkg.discount}%</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Validity</span>
                    <span className="font-semibold">{pkg.validityDays} days</span>
                  </div>
                  {pkg.Coach?.User && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Coach</span>
                      <span className="font-semibold">{pkg.Coach.User.firstName} {pkg.Coach.User.lastName}</span>
                    </div>
                  )}
                  {pkg.Facility && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Facility</span>
                      <span className="font-semibold">{pkg.Facility.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom section */}
              <div>
                <div className="border-t border-gray-200 pt-3 mb-3">
                  <p className="text-2xl font-bold text-gray-800">{formatPrice(pkg.totalPrice)}</p>
                  <p className="text-xs text-gray-400">{pkg.numberOfSessions} Sessions</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(pkg)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm font-medium py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(pkg)}
                    className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
                      pkg.status === 'active'
                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-300 hover:bg-yellow-100'
                        : 'bg-green-50 text-green-700 border border-green-300 hover:bg-green-100'
                    }`}
                  >
                    {pkg.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(pkg)}
                    className="flex items-center justify-center p-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={pagination.page <= 1}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-bold">
                {editingPackage ? 'Edit Session Package' : 'Create Session Package'}
              </h3>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
              )}

              {/* Sport */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sport *</label>
                <select
                  name="sportId"
                  value={form.sportId}
                  onChange={handleFormChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                >
                  <option value="">Select a sport</option>
                  {sports.map(sport => (
                    <option key={sport.id} value={sport.id}>{sport.name}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. Football Training - Starter Pack"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder="e.g. 4 sessions of professional football training for beginners"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2] resize-none"
                />
              </div>

              {/* Coach (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coach (optional)</label>
                <select
                  name="coachId"
                  value={form.coachId}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                >
                  <option value="">No specific coach</option>
                  {coaches.map(coach => (
                    <option key={coach.id} value={coach.id}>
                      {coach.User?.firstName} {coach.User?.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Facility (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facility (optional)</label>
                <select
                  name="facilityId"
                  value={form.facilityId}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                >
                  <option value="">No specific facility</option>
                  {facilities.map(facility => (
                    <option key={facility.id} value={facility.id}>{facility.name}</option>
                  ))}
                </select>
              </div>

              {/* Number of Sessions & Price Per Session */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Sessions *</label>
                  <input
                    type="number"
                    name="numberOfSessions"
                    value={form.numberOfSessions}
                    onChange={handleFormChange}
                    required
                    min="1"
                    placeholder="e.g. 4"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Session (₦) *</label>
                  <input
                    type="number"
                    name="pricePerSession"
                    value={form.pricePerSession}
                    onChange={handleFormChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="e.g. 3000"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                  />
                </div>
              </div>

              {/* Discount & Validity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={form.discount}
                    onChange={handleFormChange}
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Validity (days)</label>
                  <input
                    type="number"
                    name="validityDays"
                    value={form.validityDays}
                    onChange={handleFormChange}
                    min="1"
                    placeholder="90"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                  />
                </div>
              </div>

              {/* Total Price (auto-calculated) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Price (₦)</label>
                <input
                  type="number"
                  name="totalPrice"
                  value={form.totalPrice}
                  onChange={handleFormChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7042D2]"
                />
                <p className="text-xs text-gray-400 mt-1">Auto-calculated from sessions × price - discount</p>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 py-2.5 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-[#7042D2] text-white rounded-xl font-semibold hover:bg-[#5e35b1] transition-colors disabled:opacity-50 border-r-[4px] border-b-[3px] border-[#4a2a9e]"
                >
                  {submitting ? 'Saving...' : editingPackage ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionPackages;
