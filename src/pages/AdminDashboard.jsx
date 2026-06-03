import { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Package, MessageSquare, 
  Settings, Search, Plus, X, Menu,
  Users, DollarSign, Clock, Trash2,
  Filter, ListFilter, Edit2, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, Image as ImageIcon, LogOut,
  TrendingUp, TrendingDown, Bell, HelpCircle, Calendar, ArrowUpRight,
  MoreVertical, Check, Eye, EyeOff
} from 'lucide-react';
import { 
  fetchDashboardStats, fetchOrders, fetchProducts, 
  fetchMessages, fetchHeroBanners, createProduct, updateProduct, deleteProduct, fetchCategories,
  fetchSiteSettings, updateSiteSettings, deleteCategory, createCategory, updateCategory 
} from '../api';
import BannerForm from '../components/BannerForm';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalMessages: 0, totalSales: 0 });
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null });
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [bannerType, setBannerType] = useState('MAIN');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  // Mobile UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const loadTabContent = useCallback(async () => {
    try {
      if (activeTab === 'Dashboard') {
        const s = await fetchDashboardStats();
        setStats(s);
        const recentOrders = await fetchOrders();
        setData(recentOrders.slice(0, 10));
      } else if (activeTab === 'Orders') {
        const orders = await fetchOrders();
        setData(orders);
      } else if (activeTab === 'Products') {
        const params = selectedCategory !== 'All Categories' ? { category: selectedCategory } : {};
        const products = await fetchProducts(params);
        setData(products);
      } else if (activeTab === 'Messages') {
        const messages = await fetchMessages();
        setData(messages);
      } else if (activeTab === 'Categories') {
        const cats = await fetchCategories();
        setData(cats);
      } else if (activeTab === 'Hero Banner') {
        const banners = await fetchHeroBanners();
        setData(banners);
      }
    } catch (err) {
      console.error("Error loading tab content", err);
    }
  }, [activeTab, selectedCategory]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    loadTabContent();
  }, [activeTab, selectedCategory, loadTabContent]);

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDeleteProduct = async (id) => {
    setConfirmModal({
      show: true,
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteProduct(id);
          alert("Product deleted successfully!");
          loadTabContent();
        } catch (err) {
          console.error("Error deleting product", err);
          alert("Failed to delete product.");
        }
        setConfirmModal({ show: false });
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/admin-login';
  };

  const handleAddBanner = (type) => {
    setBannerType(type);
    setShowBannerModal(true);
  };

  const navGroups = [
    {
      title: 'Menu',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Orders', icon: ShoppingBag },
        { name: 'Categories', icon: ListFilter },
        { name: 'Products', icon: Package },
      ]
    },
    {
      title: 'Insights',
      items: [
        { name: 'Messages', icon: MessageSquare, badge: stats.totalMessages > 0 ? stats.totalMessages.toString() : null },
        { name: 'Hero Banner', icon: ImageIcon },
      ]
    },
    {
      title: 'General',
      items: [
        { name: 'Settings', icon: Settings },
        { name: 'Help Desk', icon: HelpCircle },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf7] to-[#f4f0ea] text-slate-800 font-sans relative pb-20">
      
      {/* Top Header */}
      <header className="h-20 px-6 lg:px-10 flex items-center justify-between border-b border-black/5 bg-white/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <span className="font-black text-lg italic tracking-tighter">D</span>
            </div>
            <span className="text-xl font-black tracking-tight text-black">DjangoAdmin Pro</span>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {['Dashboard', 'Products', 'Settings', 'Orders', 'Staff', 'Live Website'].map(tab => {
              // Map prompt tabs to actual tabs for functionality
              let actualTab = tab;
              if (tab === 'Settings') actualTab = 'Settings';
              if (tab === 'Live Website') {
                return (
                  <a 
                    key={tab}
                    href="/"
                    target="_blank"
                    className="text-[13px] font-bold tracking-wide transition-all text-slate-400 hover:text-black"
                  >
                    {tab}
                  </a>
                )
              }
              
              return (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(actualTab)}
                  className={`text-[13px] font-bold tracking-wide transition-all ${
                    activeTab === actualTab 
                    ? 'text-black' 
                    : 'text-slate-400 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
           <button className="text-slate-400 hover:text-black transition-colors"><Search size={20} /></button>
           <button className="text-slate-400 hover:text-black transition-colors relative">
              <Bell size={20} />
              <span className="absolute 1 top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
           </button>
           
           <div className="h-8 w-px bg-slate-200" />

           <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogout}>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-white">
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Jane Doe" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-black text-black leading-none mb-1">Jane Doe</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Super Admin</p>
              </div>
              <ChevronDown size={16} className="text-slate-400 group-hover:text-black transition-colors" />
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 min-w-0">
        
        {activeTab === 'Dashboard' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
             
             {/* 2x3 Metric Cards Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Card 1: Map */}
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                   <div className="relative z-10 space-y-2">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 mb-4"><LayoutDashboard size={20} /></div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Sessions (Global)</p>
                      <h2 className="text-4xl font-black text-black tracking-tighter">1.52kk</h2>
                   </div>
                   <div className="relative z-10 flex gap-1 mt-6">
                      {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white -ml-2 first:ml-0 z-10" />)}
                   </div>
                </div>

                {/* Card 2: Revenue */}
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between group">
                   <div className="space-y-2">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 mb-4"><DollarSign size={20} /></div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Revenue</p>
                      <div className="flex items-center gap-3">
                         <h2 className="text-4xl font-black text-black tracking-tighter">$1.21M</h2>
                         <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-lg">3.5% +</span>
                      </div>
                   </div>
                   <div className="mt-6 flex justify-end">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-black group-hover:text-white transition-all cursor-pointer"><ArrowUpRight size={14} strokeWidth={2}/></div>
                   </div>
                </div>

                {/* Card 3: Users */}
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between">
                   <div className="space-y-2">
                      <div className="flex justify-between items-start">
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 mb-4"><Users size={20} /></div>
                         <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg flex items-center gap-1">This Month <ChevronDown size={12}/></span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Users</p>
                      <h2 className="text-4xl font-black text-black tracking-tighter">98k+</h2>
                   </div>
                   <div className="flex gap-1 mt-6">
                      {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white -ml-2 first:ml-0" />)}
                   </div>
                </div>

                {/* Card 4: Active Products */}
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between">
                   <div className="space-y-2">
                      <div className="flex justify-between items-start">
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 mb-4"><Package size={20} /></div>
                         <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg flex items-center gap-1">This Month <ChevronDown size={12}/></span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Products</p>
                      <h2 className="text-4xl font-black text-black tracking-tighter">{stats.totalProducts}</h2>
                   </div>
                   <div className="flex gap-1 mt-6">
                      {[1,2].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white -ml-2 first:ml-0" />)}
                   </div>
                </div>

                {/* Card 5: Net Revenue */}
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between">
                   <div className="space-y-2">
                      <div className="flex justify-between items-start">
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 mb-4"><TrendingUp size={20} /></div>
                         <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg flex items-center gap-1">This Month <ChevronDown size={12}/></span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Net Revenue</p>
                      <h2 className="text-4xl font-black text-black tracking-tighter">15.7M</h2>
                   </div>
                   <div className="flex gap-1 mt-6">
                      {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white -ml-2 first:ml-0" />)}
                   </div>
                </div>

                {/* Card 6: Open Tickets */}
                <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between">
                   <div className="space-y-2">
                      <div className="flex justify-between items-start">
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-800 mb-4"><MessageSquare size={20} /></div>
                         <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg flex items-center gap-1">This Month <ChevronDown size={12}/></span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Open Tickets</p>
                      <h2 className="text-4xl font-black text-black tracking-tighter">{stats.totalMessages}</h2>
                   </div>
                   <div className="flex gap-1 mt-6">
                      {[1,2].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white -ml-2 first:ml-0" />)}
                   </div>
                </div>

             </div>

             {/* Middle Action Bar */}
             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-2 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100">
                <div className="flex overflow-x-auto scrollbar-hide gap-2 p-1">
                   <button className="bg-black text-white px-6 py-2.5 rounded-2xl text-[12px] font-bold tracking-wide whitespace-nowrap shadow-md">Activity Logs</button>
                   <button className="bg-transparent text-slate-500 hover:text-black px-6 py-2.5 rounded-2xl text-[12px] font-bold tracking-wide whitespace-nowrap transition-colors">User Signups</button>
                   <button className="bg-transparent text-slate-500 hover:text-black px-6 py-2.5 rounded-2xl text-[12px] font-bold tracking-wide whitespace-nowrap transition-colors">Orders</button>
                   <button className="bg-transparent text-slate-500 hover:text-black px-6 py-2.5 rounded-2xl text-[12px] font-bold tracking-wide whitespace-nowrap transition-colors">Task Queue</button>
                </div>
                
                <div className="flex items-center gap-4 px-2 lg:px-0 lg:pr-2 pb-2 lg:pb-0">
                   <div className="relative flex-1 lg:w-64">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" placeholder="Search Admin Logs or Users" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-2xl text-xs focus:outline-none focus:border-slate-200 transition-colors" />
                   </div>
                   <button onClick={() => setShowAddModal(true)} className="bg-black hover:bg-slate-800 text-white px-6 py-2.5 rounded-2xl text-[12px] font-bold tracking-wide whitespace-nowrap transition-colors flex items-center gap-2 shadow-lg shadow-black/10">
                      <Plus size={16} /> Add SuperUser
                   </button>
                </div>
             </div>

             {/* Bottom Section: Activity Log */}
             <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-black text-black tracking-tight">Recent Activity Log</h3>
                   <button className="text-slate-400 hover:text-black text-[11px] font-bold tracking-widest uppercase flex items-center gap-1 transition-colors">
                      View Full Audit Trail <ArrowUpRight size={14} />
                   </button>
                </div>
                
                {/* List replacing the table for minimalist feel */}
                <div className="space-y-4">
                   {data.slice(0, 4).map((order, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500"><ShoppingBag size={18} /></div>
                            <div>
                               <p className="text-sm font-bold text-black">New Order {order.id}</p>
                               <p className="text-[11px] font-medium text-slate-500">Processed by System • {order.customer_name}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-black text-black">{order.total_amount}</p>
                            <span className="text-[10px] font-bold text-slate-400">{new Date(order.created_at).toLocaleDateString()}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Calendar Date Picker Row */}
             <div className="flex overflow-x-auto scrollbar-hide gap-3 py-4">
                {[
                  {day: 'Mon', date: '12'}, {day: 'Tue', date: '13'}, {day: 'Wed', date: '14', active: true},
                  {day: 'Thu', date: '15'}, {day: 'Fri', date: '16'}, {day: 'Sat', date: '17'}, {day: 'Sun', date: '18'},
                  {day: 'Mon', date: '19'}, {day: 'Tue', date: '20'}
                ].map((d, i) => (
                  <div key={i} className={`flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all shadow-sm ${
                     d.active ? 'bg-black text-white shadow-xl shadow-black/20 scale-105' : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
                  }`}>
                     <span className={`text-[10px] font-bold uppercase tracking-wider ${d.active ? 'text-white/70' : 'text-slate-400'}`}>{d.day}</span>
                     <span className={`text-lg font-black ${d.active ? 'text-white' : 'text-black'}`}>{d.date}</span>
                  </div>
                ))}
             </div>

          </div>
        )}

        {/* Existing Functional Views mapped to the new layout */}
        {activeTab === 'Orders' && <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"><h1 className="text-2xl font-black text-black tracking-tight mb-8">Logs & Orders</h1><OrderList orders={data} /></div>}
        {activeTab === 'Categories' && <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"><CategoryList categories={data} loadData={loadTabContent} onEdit={(cat) => { setEditingCategory(cat); setShowCategoryModal(true); }} setConfirmModal={setConfirmModal} /></div>}
        {activeTab === 'Products' && <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"><h1 className="text-2xl font-black text-black tracking-tight mb-8">Apps & Products</h1><ProductList products={data} onEdit={handleEditProduct} onDelete={handleDeleteProduct} /></div>}
        {activeTab === 'Messages' && <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"><h1 className="text-2xl font-black text-black tracking-tight mb-8">User Messages</h1><MessageList messages={data} /></div>}
        {activeTab === 'Hero Banner' && <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"><h1 className="text-2xl font-black text-black tracking-tight mb-8">Documentation & Banners</h1><BannerList banners={data} onAdd={handleAddBanner} /></div>}
        {activeTab === 'Settings' && <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"><h1 className="text-2xl font-black text-black tracking-tight mb-8">Site Settings</h1><SettingsView /></div>}
        
      </main>

      {/* Modals Styled to match */}
      {showAddModal && <ModalContainer><ProductForm categories={categories} editingProduct={editingProduct} onDiscard={() => setShowAddModal(false)} onSave={() => { setShowAddModal(false); loadTabContent(); }} /></ModalContainer>}
      {showCategoryModal && <ModalContainer><CategoryForm editingCategory={editingCategory} onDiscard={() => setShowCategoryModal(false)} onSave={() => { setShowCategoryModal(false); loadTabContent(); }} /></ModalContainer>}
      {showBannerModal && <ModalContainer><BannerForm type={bannerType} onDiscard={() => setShowBannerModal(false)} onSave={() => { setShowBannerModal(false); loadTabContent(); }} /></ModalContainer>}
      {confirmModal.show && <ConfirmModal {...confirmModal} onCancel={() => setConfirmModal({ show: false })} />}
    </div>
  );
};

const StatCard = ({ title, value, trend, isUp, lastMonth, icon: Icon }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-blue-600/[0.03] transition-all group relative overflow-hidden">
    <div className="flex justify-between items-start relative z-10">
      <div className="space-y-4">
        <p className="text-[11px] uppercase tracking-widest font-black text-slate-400">{title}</p>
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">{value}</h2>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
            isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
          }`}>
            {isUp ? <ArrowUpRight size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        </div>
        <p className="text-[11px] font-bold text-slate-400">
          Last month: <span className="text-slate-600">{lastMonth}</span>
        </p>
      </div>
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
        <Icon size={24} strokeWidth={1.5} />
      </div>
    </div>
    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-blue-600/[0.01] rounded-full group-hover:scale-150 transition-transform duration-700" />
  </div>
);

const RevenueChart = () => (
  <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-50 p-10 shadow-sm space-y-10 relative overflow-hidden group">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-black text-slate-800 tracking-tight">Revenue analytics</h3>
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600">
        This Week <ChevronDown size={14} />
      </div>
    </div>
    <div className="h-64 flex items-end justify-between gap-4 relative">
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[30, 25, 20, 15, 10, 5, 0].map(val => (
          <div key={val} className="w-full flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-300 w-6">{val}k</span>
            <div className="flex-1 h-px bg-slate-50"></div>
          </div>
        ))}
      </div>
      {[
        { day: 'Fri', val: '60%' }, { day: 'Sat', val: '45%' }, { day: 'Sun', val: '80%', highlight: true },
        { day: 'Mon', val: '40%' }, { day: 'Thu', val: '55%' }, { day: 'Wen', val: '70%' }, { day: 'Thus', val: '58%' },
      ].map(bar => (
        <div key={bar.day} className="flex-1 flex flex-col items-center gap-4 group/bar cursor-pointer relative z-10">
          {bar.highlight && (
            <div className="absolute -top-12 bg-blue-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black shadow-xl shadow-blue-600/40 animate-bounce">
              $22,430
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
            </div>
          )}
          <div className={`w-full max-w-[44px] rounded-t-2xl transition-all duration-500 group-hover/bar:scale-x-110 ${bar.highlight ? 'bg-blue-600' : 'bg-blue-600/10'}`} style={{ height: bar.val }}>
             {bar.highlight && <div className="w-2 h-2 bg-white/50 rounded-full mx-auto mt-2 shadow-md"></div>}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{bar.day}</span>
        </div>
      ))}
    </div>
    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/[0.01] rounded-full group-hover:scale-150 transition-transform duration-1000" />
  </div>
);

const IncomeChart = () => (
  <div className="bg-white rounded-[2.5rem] border border-slate-50 p-10 shadow-sm space-y-8 flex flex-col relative overflow-hidden group">
    <div className="space-y-2">
      <h3 className="text-xl font-black text-slate-800 tracking-tight">Total Income</h3>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">View weekly performance</p>
    </div>
    <div className="flex items-center gap-6 pt-4">
       <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profit</span></div>
       <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-800 rounded-full"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loss</span></div>
    </div>
    <div className="flex-1 flex items-end justify-between gap-3 pt-6">
       {[
         { m: 'Jan', p: '40%', l: '30%' }, { m: 'Feb', p: '60%', l: '20%' }, { m: 'Mar', p: '45%', l: '40%' }, { m: 'Apr', p: '55%', l: '35%' },
         { m: 'May', p: '70%', l: '25%' }, { m: 'Jun', p: '85%', l: '15%' }, { m: 'Jul', p: '65%', l: '30%' }, { m: 'Aug', p: '75%', l: '20%' },
       ].map(d => (
         <div key={d.m} className="flex flex-col items-center gap-3 flex-1 group/bar">
            <div className="w-full flex flex-col rounded-lg overflow-hidden bg-slate-50 h-40 transition-all duration-500 group-hover/bar:scale-105">
               <div className="bg-blue-600 w-full" style={{ height: d.p }}></div>
               <div className="bg-slate-800 w-full" style={{ height: d.l }}></div>
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase">{d.m}</span>
         </div>
       ))}
    </div>
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/[0.01] rounded-full group-hover:scale-150 transition-transform duration-1000" />
  </div>
);

const RecentOrdersTable = ({ orders }) => (
  <div className="overflow-x-auto custom-scrollbar-horizontal -mx-6 lg:-mx-10 px-6 lg:px-10">
    <table className="w-full text-left min-w-[1000px]">
       <thead>
          <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
             <th className="pb-6 w-10"><input type="checkbox" className="rounded-lg border-slate-200 text-blue-600 focus:ring-blue-600/20" /></th>
             <th className="pb-6">Order Id</th>
             <th className="pb-6">Date</th>
             <th className="pb-6">Customer</th>
             <th className="pb-6">Category</th>
             <th className="pb-6">Status</th>
             <th className="pb-6 text-right">Total</th>
          </tr>
       </thead>
       <tbody className="divide-y divide-slate-50">
          {orders.map((order, i) => (
            <tr key={i} className="group hover:bg-slate-50/50 transition-all duration-300">
               <td className="py-6"><input type="checkbox" className="rounded-lg border-slate-200 text-blue-600 focus:ring-blue-600/20" /></td>
               <td className="py-6 text-sm font-black text-slate-800">#{order.id.toString().padStart(5, '0')}</td>
               <td className="py-6 text-[13px] font-bold text-slate-400">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
               <td className="py-6 text-[13px] font-black text-slate-800">{order.customer_name}</td>
               <td className="py-6 text-[13px] font-bold text-slate-400">Products ({order.items?.length || 0})</td>
               <td className="py-6">
                  <span className={`px-4 py-1.5 rounded-2xl text-[10px] font-black tracking-tight ${
                    order.is_delivered ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                     {order.is_delivered ? 'COMPLETED' : 'PENDING'}
                  </span>
               </td>
               <td className="py-6 text-sm font-black text-slate-900 text-right">{order.total_amount}</td>
            </tr>
          ))}
       </tbody>
    </table>
  </div>
);

const ModalContainer = ({ children }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 lg:p-10 overflow-y-auto">
    <div className="my-auto w-full max-w-4xl animate-in zoom-in fade-in duration-500">
      {children}
    </div>
  </div>
);

// Reuse list components with new blue styling
const OrderList = ({ orders }) => (
  <div className="space-y-6">
     <RecentOrdersTable orders={orders} />
     <div className="pt-10 flex items-center justify-between border-t border-slate-50">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {orders.length} orders</p>
        <div className="flex gap-2">
           <button className="p-2 border border-slate-100 rounded-xl hover:border-blue-600 transition-colors"><ChevronLeft size={16}/></button>
           <button className="w-9 h-9 bg-blue-600 text-white rounded-xl text-xs font-black">1</button>
           <button className="p-2 border border-slate-100 rounded-xl hover:border-blue-600 transition-colors"><ChevronRight size={16}/></button>
        </div>
     </div>
  </div>
);

const ProductList = ({ products, onEdit, onDelete }) => (
  <div className="space-y-10">
    <div className="overflow-x-auto custom-scrollbar-horizontal -mx-6 lg:-mx-10 px-6 lg:px-10">
      <table className="w-full text-left min-w-[1000px]">
        <thead>
          <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
            <th className="pb-6 w-10"><input type="checkbox" className="rounded-lg border-slate-200 text-blue-600" /></th>
            <th className="pb-6">Product Info</th>
            <th className="pb-6">Category</th>
            <th className="pb-6">Status</th>
            <th className="pb-6 text-center">Stock</th>
            <th className="pb-6 text-right">Price</th>
            <th className="pb-6 text-right px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.map((p) => (
            <tr key={p.id} className="group hover:bg-slate-50/50 transition-all">
              <td className="py-6"><input type="checkbox" className="rounded-lg border-slate-200 text-blue-600" /></td>
              <td className="py-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm"><img src={p.image} className="w-full h-full object-cover" alt="" /></div>
                  <div>
                    <p className="text-sm font-black text-slate-800 line-clamp-1">{p.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {p.article_no || 'N/A'}</p>
                  </div>
                </div>
              </td>
              <td className="py-6 text-[13px] font-bold text-slate-400">{typeof p.category === 'object' ? p.category.name : p.category}</td>
              <td className="py-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tight ${p.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                  {p.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                </span>
              </td>
              <td className="py-6 text-[13px] font-black text-slate-800 text-center">{p.stock}</td>
              <td className="py-6 text-[13px] font-black text-slate-900 text-right">{p.price}</td>
              <td className="py-6 text-right px-4">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onEdit(p)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm"><Edit2 size={16} /></button>
                  <button onClick={() => onDelete(p.id)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CategoryList = ({ categories, loadData, onEdit, setConfirmModal }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {categories.map((cat) => (
      <div key={cat.id} className="bg-white border border-slate-50 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-blue-600/[0.02] transition-all group">
         <div className="aspect-[4/3] bg-slate-50 rounded-2xl overflow-hidden mb-6 relative border border-slate-100">
            {cat.image ? <img src={cat.image} className="w-full h-full object-cover" alt="" /> : <div className="w-full h-full flex items-center justify-center text-slate-200"><ImageIcon size={40}/></div>}
            <div className="absolute top-4 right-4 flex items-center gap-2">
               <button onClick={() => onEdit(cat)} className="p-2 bg-white/90 backdrop-blur shadow-lg rounded-xl text-slate-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 duration-300"><Edit2 size={16}/></button>
            </div>
         </div>
         <div className="flex items-center justify-between gap-4">
            <div>
               <h4 className="font-black text-slate-800 tracking-tight">{cat.name}</h4>
               <div className="flex items-center gap-2 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${cat.is_published ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat.is_published ? 'Published' : 'Draft'}</span>
               </div>
            </div>
            <button 
               onClick={async () => {
                 try { await updateCategory(cat.id, { is_published: !cat.is_published }); loadData(); } catch (err) { console.error(err); }
               }}
               className={`p-2 rounded-xl transition-all ${cat.is_published ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}
            >
               <Check size={18} strokeWidth={3} />
            </button>
         </div>
      </div>
    ))}
  </div>
);

const MessageList = ({ messages }) => (
  <div className="space-y-6">
    {messages.map((m) => (
      <div key={m.id} className="bg-white border border-slate-50 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-600/[0.03] transition-all group flex flex-col sm:flex-row gap-8">
         <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
            <Users size={24} strokeWidth={1.5} />
         </div>
         <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
               <div>
                  <div className="flex items-center gap-3">
                     <h4 className="text-xl font-black text-slate-800 tracking-tight">{m.name}</h4>
                     {!m.is_read && <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse tracking-widest">NEW</span>}
                  </div>
                  <p className="text-[13px] font-bold text-slate-400 mt-1">{m.email}</p>
               </div>
               <div className="flex flex-col items-end">
                  <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full mb-1">{m.subject}</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{new Date(m.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
               </div>
            </div>
            <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl">
               <p className="text-slate-600 text-sm leading-relaxed font-medium italic">"{m.message}"</p>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
               <button className="px-6 py-2.5 bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Delete</button>
               <button className="px-10 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">Reply Now</button>
            </div>
         </div>
      </div>
    ))}
  </div>
);

const BannerList = ({ banners, onAdd }) => {
  const sections = [
    { title: 'Main Hero', type: 'MAIN', data: banners.filter(b => b.banner_type === 'MAIN') },
    { title: 'New Arrival', type: 'NEW_ARRIVAL', data: banners.filter(b => b.banner_type === 'NEW_ARRIVAL') },
    { title: 'Best Seller', type: 'BEST_SELLER', data: banners.filter(b => b.banner_type === 'BEST_SELLER') },
  ];

  return (
    <div className="space-y-12">
      {sections.map(sec => (
        <div key={sec.title} className="space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">{sec.title} Sections</h3>
              <button onClick={() => onAdd(sec.type)} className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] hover:underline">+ ADD BANNER</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sec.data.map(b => (
                <div key={b.id} className="bg-white border border-slate-50 rounded-[2rem] p-5 shadow-sm group">
                   <div className="aspect-video bg-slate-50 rounded-2xl overflow-hidden mb-5 relative border border-slate-100">
                      <img src={b.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                         <h4 className="text-white font-black text-sm tracking-tight line-clamp-1">{b.title}</h4>
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                      <div className="flex gap-2">
                         <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Settings size={16}/></button>
                         <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                      </div>
                   </div>
                </div>
              ))}
              {sec.data.length === 0 && (
                <button onClick={() => onAdd(sec.type)} className="aspect-video border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-blue-600 hover:text-blue-600 transition-all">
                   <Plus size={32} strokeWidth={1}/>
                   <span className="text-[10px] font-black uppercase tracking-widest">Add First Banner</span>
                </button>
              )}
           </div>
        </div>
      ))}
    </div>
  );
};

const ProductForm = ({ categories, onSave, onDiscard, editingProduct }) => {
  const [formData, setFormData] = useState({
    name: '', volume_no: '', article_no: '', category: categories[0]?.id || '', 
    price: '', old_price: '', discount_percent: 0, stock: 10,
    description: '', badge: 'New', 
  });

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([null, null, null]);
  const [previews, setPreviews] = useState({ main: null, gallery: [null, null, null] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        volume_no: editingProduct.volume_no || '',
        article_no: editingProduct.article_no || '',
        category: editingProduct.category?.id || editingProduct.category_id || editingProduct.category || categories[0]?.id || '',
        price: editingProduct.price || '',
        old_price: editingProduct.old_price || '',
        discount_percent: editingProduct.discount_percent || 0,
        stock: editingProduct.stock || 0,
        description: editingProduct.description || '',
        badge: editingProduct.badge || 'New',
      });
      setPreviews({
        main: editingProduct.image,
        gallery: editingProduct.gallery?.map(img => img.image) || [null, null, null]
      });
    }
  }, [editingProduct, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setPreviews(prev => ({ ...prev, main: URL.createObjectURL(file) }));
    }
  };

  const handleGalleryChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newGallery = [...galleryImages];
      newGallery[index] = file;
      setGalleryImages(newGallery);
      const newPreviews = [...previews.gallery];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, gallery: newPreviews }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || (!mainImage && !editingProduct?.image)) {
      alert("Required: Title, Price, Main Image");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (mainImage) data.append('image', mainImage);
      galleryImages.forEach((img, idx) => { if (img) data.append(`gallery_image_${idx}`, img); });

      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        alert("Updated!");
      } else {
        await createProduct(data);
        alert("Created!");
      }
      onSave();
    } catch (err) {
      console.error(err);
      alert("Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden group">
      <div className="flex justify-between items-center relative z-10">
        <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{editingProduct ? 'Edit' : 'Create'} Product</h3>
        <button onClick={onDiscard} className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><X size={24}/></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
         <div className="space-y-8">
            <FormInput label="Product Title" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Drawstring Tote Bag" />
            <div className="grid grid-cols-2 gap-6">
               <FormSelect label="Category" name="category" value={formData.category} onChange={handleChange} options={categories.map(c => ({ label: c.name, value: c.id }))} />
               <FormSelect label="Badge" name="badge" value={formData.badge} onChange={handleChange} options={[{label:'New', value:'New'}, {label:'Best', value:'Best Seller'}, {label:'Sale', value:'Sale'}]} />
            </div>
            <div className="grid grid-cols-2 gap-6">
               <FormInput label="Price (PKR)" name="price" value={formData.price} onChange={handleChange} placeholder="3500" />
               <FormInput label="Stock Level" name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="10" />
            </div>
            <FormTextarea label="Product Description" name="description" value={formData.description} onChange={handleChange} placeholder="Tell us more about this piece..." />
         </div>

         <div className="space-y-8">
            <div>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Main Visual</p>
               <div className="aspect-video bg-slate-50 border border-slate-100 rounded-[2rem] relative overflow-hidden flex items-center justify-center group/img">
                  {previews.main ? <img src={previews.main} className="w-full h-full object-cover" /> : <ImageIcon size={48} strokeWidth={1} className="text-slate-200" />}
                  <input type="file" onChange={handleMainImageChange} className="hidden" id="main-up" accept="image/*" />
                  <label htmlFor="main-up" className="absolute inset-0 bg-blue-600/60 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer">
                     <span className="text-white text-xs font-black uppercase tracking-[0.2em] border-2 border-white px-8 py-3 rounded-2xl">Upload Photo</span>
                  </label>
               </div>
            </div>
            <div>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Gallery Showcase</p>
               <div className="grid grid-cols-3 gap-4">
                  {[0,1,2].map(idx => (
                    <div key={idx} className="aspect-square bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden group/gal flex items-center justify-center">
                       {previews.gallery[idx] ? <img src={previews.gallery[idx]} className="w-full h-full object-cover" /> : <Plus size={24} className="text-slate-200" />}
                       <input type="file" onChange={(e) => handleGalleryChange(idx, e)} className="hidden" id={`gal-${idx}`} accept="image/*" />
                       <label htmlFor={`gal-${idx}`} className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover/gal:opacity-100 transition-all flex items-center justify-center cursor-pointer"><Edit2 size={16} className="text-white" /></label>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="flex justify-end gap-4 pt-10 border-t border-slate-50 relative z-10">
         <button onClick={onDiscard} className="px-8 py-3.5 text-xs font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">Discard Changes</button>
         <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]">
            {loading ? 'Processing...' : 'Save Product'}
         </button>
      </div>
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/[0.02] rounded-full pointer-events-none" />
    </div>
  );
};

const CategoryForm = ({ editingCategory, onSave, onDiscard }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setPreview(editingCategory.image);
      setIsPublished(editingCategory.is_published);
    }
  }, [editingCategory]);

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Name required");
    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('is_published', isPublished);
      if (image) data.append('image', image);

      if (editingCategory) { await updateCategory(editingCategory.id, data); } 
      else { await createCategory(data); }
      onSave();
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 w-full max-w-lg shadow-2xl space-y-10">
       <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{editingCategory ? 'Modify' : 'New'} Category</h3>
       <div className="space-y-8">
          <FormInput label="Category Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Unstitched" />
          <div>
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Cover Image</p>
             <div className="aspect-video bg-slate-50 border border-slate-100 rounded-[2rem] relative overflow-hidden flex items-center justify-center group">
                {preview ? <img src={preview} className="w-full h-full object-cover" /> : <ImageIcon size={40} className="text-slate-200" />}
                <input type="file" onChange={(e) => { setImage(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); }} className="hidden" id="cat-up" accept="image/*" />
                <label htmlFor="cat-up" className="absolute inset-0 bg-blue-600/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                   <span className="text-white text-[10px] font-black uppercase tracking-widest border-2 border-white px-6 py-2.5 rounded-xl">Pick Image</span>
                </label>
             </div>
          </div>
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
             <span className="text-sm font-black text-slate-800 uppercase tracking-tight">Active Status</span>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="sr-only peer" />
                <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
             </label>
          </div>
       </div>
       <div className="flex gap-4 pt-6 border-t border-slate-50">
          <button onClick={onDiscard} className="flex-1 py-3.5 text-xs font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all">
             {loading ? 'Wait...' : 'Confirm'}
          </button>
       </div>
    </div>
  );
};

const SettingsView = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [files, setFiles] = useState({ logo: null, favicon: null });

  const loadSettings = async () => {
    try { const data = await fetchSiteSettings(); setSettings(data); } 
    catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { loadSettings(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(settings).forEach(key => { if (key !== 'logo' && key !== 'favicon' && settings[key] !== null) formData.append(key, settings[key]); });
      if (files.logo) formData.append('logo', files.logo);
      if (files.favicon) formData.append('favicon', files.favicon);
      await updateSiteSettings(settings.id, formData);
      alert("Saved!");
      loadSettings();
    } catch (err) { alert("Failed."); } finally { setSaving(false); }
  };

  if (loading) return <div className="p-20 text-center animate-pulse text-slate-300">Loading System...</div>;

  return (
    <div className="max-w-4xl space-y-12">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
             <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Identity & Branding</p>
             <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] space-y-8">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center p-4">
                      {files.logo ? <img src={URL.createObjectURL(files.logo)} className="w-full h-full object-contain" /> : <img src={settings.logo} className="w-full h-full object-contain" />}
                   </div>
                   <input type="file" onChange={(e) => setFiles({...files, logo: e.target.files[0]})} className="hidden" id="logo-up" /><label htmlFor="logo-up" className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 cursor-pointer hover:border-blue-600 transition-all uppercase tracking-widest shadow-sm">Update Logo</label>
                </div>
                <FormInput label="Brand Store Name" value={settings.brand_name} onChange={(e) => setSettings({...settings, brand_name: e.target.value})} />
             </div>
          </div>

          <div className="space-y-8">
             <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Operational Config</p>
             <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] space-y-8">
                <div className="grid grid-cols-2 gap-6">
                   <FormInput label="Shipping Fee" type="number" value={settings.shipping_fee} onChange={(e) => setSettings({...settings, shipping_fee: e.target.value})} />
                   <FormInput label="Tax Rate (%)" type="number" value={settings.tax_percent} onChange={(e) => setSettings({...settings, tax_percent: e.target.value})} />
                </div>
                <div className="pt-4 border-t border-slate-200">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-slate-800 uppercase tracking-tight">Announcement Bar</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" checked={settings.show_announcement} onChange={(e) => setSettings({...settings, show_announcement: e.target.checked})} className="sr-only peer" />
                         <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      </label>
                   </div>
                   <FormInput label="Promotion Text" value={settings.announcement_text} onChange={(e) => setSettings({...settings, announcement_text: e.target.value})} />
                </div>
             </div>
          </div>
       </div>

       <div className="flex justify-end gap-6 pt-10 border-t border-slate-50">
          <button onClick={handleSave} disabled={saving} className="bg-slate-900 hover:bg-black text-white px-16 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all disabled:opacity-50">
             {saving ? 'Syncing...' : 'Apply All Global Changes'}
          </button>
       </div>
    </div>
  );
};

const FormInput = ({ label, value, onChange, type = "text", placeholder, name }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      name={name}
      value={value || ''} 
      onChange={onChange} 
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3.5 text-[13px] font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all placeholder-slate-300 shadow-inner" 
    />
  </div>
);

const FormSelect = ({ label, value, onChange, options, name }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <select 
      name={name}
      value={value} 
      onChange={onChange} 
      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3.5 text-[13px] font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-inner appearance-none cursor-pointer"
    >
       {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const FormTextarea = ({ label, value, onChange, placeholder, name }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <textarea 
      name={name}
      value={value || ''} 
      onChange={onChange} 
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-[13px] font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all placeholder-slate-300 shadow-inner h-40 resize-none" 
    />
  </div>
);

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onCancel}></div>
    <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl relative z-10 space-y-8 text-center animate-in zoom-in fade-in duration-500">
       <div className="w-24 h-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-100">
          <Trash2 size={40} strokeWidth={1.5} />
       </div>
       <div className="space-y-4">
          <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{title}</h3>
          <p className="text-sm font-medium text-slate-400 leading-relaxed px-4">{message}</p>
       </div>
       <div className="flex flex-col gap-4 pt-4">
          <button onClick={onConfirm} className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-red-500/20 transition-all active:scale-[0.98]">Confirm Permanent Delete</button>
          <button onClick={onCancel} className="w-full py-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">No, Keep It</button>
       </div>
    </div>
  </div>
);

export default AdminDashboard;
