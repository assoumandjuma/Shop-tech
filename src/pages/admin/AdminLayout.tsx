import  { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useAuth } from '../../context/AuthContext';

function AdminLayout() {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Sidebar */}
        <aside className="lg:col-span-1 bg-white shadow-md lg:h-screen lg:sticky lg:top-0 overflow-y-auto">
          <AdminSidebar />
        </aside>
        
        {/* Main Content */}
        <main className="lg:col-span-4 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
 