import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaCalendarCheck,
  FaCircleCheck,
  FaUserPen,
  FaTrashCan,
  FaMagnifyingGlass,
  FaCheckDouble,
  FaCircleExclamation,
} from "react-icons/fa6";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import {
  getSystemOverview,
  getAccounts,
  updateAccount,
  deleteAccount,
} from "../../services/adminService";

function AdminDashboard() {

  
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingAppointments: 0,
    doneAppointments: 0,
  });
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Edit/Delete modal state
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [overviewData, accountsData] = await Promise.all([
        getSystemOverview(),
        getAccounts(),
      ]);
      setStats({
        totalUsers: overviewData.totalUsers || 0,
        pendingAppointments: overviewData.pendingAppointments || 0,
        doneAppointments: overviewData.doneAppointments || 0,
      });
      setAccounts(accountsData.users || accountsData || []);
    } catch (err) {
      console.error("Error fetching overview", err);
      toast.error("Failed to load overview analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.type.toLowerCase(),
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await updateAccount(editingUser.id, editForm);
      toast.success("Account details updated successfully.");
      setEditingUser(null);
      fetchDashboardData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update account.");
    }
  };

  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAccount(deletingUser.id);
      toast.success("Account removed permanently.");
      setDeletingUser(null);
      fetchDashboardData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account.");
    }
  };

  const filteredAccounts = accounts.filter((acc) => {
    const matchesFilter = filter === "all" ? true : acc.type.toLowerCase() === filter;
    const matchesSearch =
      acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout showSOS={false}>

          {/* Page Headers */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">System Monitoring</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Live analytics of all active users, logs, and slot checking parameters.</p>
            </div>
            <Button onClick={fetchDashboardData} variant="secondary" className="md:w-auto w-full">
              Refresh Monitor
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Total Registered */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-650 dark:text-teal-400 text-xl">
                <FaUsers />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Registered Accounts</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.totalUsers}</h3>
              </div>
            </div>

            {/* Pending Appointments */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400 text-xl">
                <FaCalendarCheck />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Pending Bookings</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.pendingAppointments}</h3>
              </div>
            </div>

            {/* Done Appointments */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                <FaCircleCheck />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Fulfilled Bookings</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{stats.doneAppointments}</h3>
              </div>
            </div>

          </div>

          {/* Account Register Listing Table */}
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
            
            {/* Table Header Filter Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Global Accounts Registry</h3>
              
              <div className="flex flex-col sm:flex-row gap-3">
                
                {/* Search Bar */}
                <div className="relative">
                  <FaMagnifyingGlass className="absolute left-3.5 top-3.5 text-slate-450 dark:text-slate-500 text-sm" />
                  <input
                    type="text"
                    placeholder="Search name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition"
                  />
                </div>

                {/* Filter Selector */}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-bold outline-none cursor-pointer"
                >
                  <option value="all">All Accounts</option>
                  <option value="patient">Patients Only</option>
                  <option value="doctor">Doctors Only</option>
                  <option value="admin">Administrators</option>
                </select>

              </div>
            </div>

            {/* Registry List Table view */}
            {loading ? (
              <div className="py-20 text-center text-slate-500">
                <span className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                <p className="mt-2 text-xs font-bold">Querying credentials...</p>
              </div>
            ) : filteredAccounts.length === 0 ? (
              <div className="py-16 text-center text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <p className="text-sm">No registered user accounts found matching query filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs uppercase font-extrabold tracking-wider">
                      <th className="py-4 px-2">User details</th>
                      <th className="py-4 px-2">Role</th>
                      <th className="py-4 px-2">Contact</th>
                      <th className="py-4 px-2">Joined Date</th>
                      <th className="py-4 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                    {filteredAccounts.map((account) => (
                      <tr key={account.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition duration-150">
                        <td className="py-4 px-2 font-bold text-slate-800 dark:text-slate-200">{account.name}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                            account.type === "ADMIN"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                              : account.type === "DOCTOR"
                              ? "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300"
                              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                          }`}>
                            {account.type}
                          </span>
                        </td>
                        <td className="py-4 px-2 font-mono text-xs text-slate-550 dark:text-slate-400">{account.email}</td>
                        <td className="py-4 px-2 text-xs text-slate-500">{new Date(account.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 px-2 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(account)}
                              className="p-2 rounded-lg bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-slate-700 transition"
                              title="Edit user details"
                            >
                              <FaUserPen className="text-xs" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(account)}
                              className="p-2 rounded-lg bg-rose-50 dark:bg-slate-800 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-slate-750 transition"
                              title="Delete account permanently"
                            >
                              <FaTrashCan className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>


      {/* Edit Modal Dialog */}
      {editingUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
          <div className="w-[92%] max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-teal-600 mb-4">
              <FaUserPen className="text-2xl" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Modify User details</h3>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Registered Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-teal-650 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-teal-655 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-2">System Privilege Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-100 outline-none cursor-pointer focus:border-teal-660"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor / Specialist</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-650 dark:text-slate-300 transition hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white transition shadow-sm"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
          <div className="w-[92%] max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <FaCircleExclamation className="text-2xl animate-pulse" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete user account?</h3>
            </div>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
              This will permanently delete the registered account for <strong className="text-slate-800 dark:text-slate-200">"{deletingUser.name}"</strong>, removing all associated doctor/patient profiles and booking histories. This operation is irreversible.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-650 dark:text-slate-300 transition hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}

export default AdminDashboard;
