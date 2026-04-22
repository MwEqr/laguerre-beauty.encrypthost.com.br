import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, ShoppingBag, LogOut, Camera, Loader2, Package, CheckCircle, MapPin, Smartphone, CreditCard, AlertCircle } from 'lucide-react';
import { fetchOrders, uploadImage, updateProfile, getRepayUrl } from '../services/api';
import { useCart } from '../context/CartContext';

const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
};

export default function ProfilePage() {
  const { showNotification } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'perfil';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [repayingId, setRepayingId] = useState<number | null>(null);
  
  const [cepLoading, setCepLoading] = useState(false);
  const [cpfError, setCpfError] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.firstName && parsedUser.name) {
        const parts = parsedUser.name.trim().split(' ');
        parsedUser.firstName = parts[0];
        parsedUser.lastName = parts.slice(1).join(' ');
      }
      setUser(parsedUser);
      loadUserOrders(parsedUser.id);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const loadUserOrders = async (userId: string) => {
    setLoadingOrders(true);
    try {
      const data = await fetchOrders(userId);
      setOrders(data);
    } catch (err) {
      console.error("Erro ao buscar pedidos", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateUser = async (field: string, value: string) => {
    const newUser = { ...user, [field]: value };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    try {
      await updateProfile(newUser);
    } catch (e) {
      console.error("Erro ao salvar no servidor", e);
    }
  };

  // Funções de Máscara e Busca Automática
  const handleCpfChange = (value: string) => {
    let raw = value.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);
    
    const formatted = raw
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    handleUpdateUser('cpf', formatted);
    if (raw.length === 11) setCpfError(!validateCPF(raw));
    else setCpfError(false);
  };

  const handlePhoneChange = (value: string) => {
    let raw = value.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);
    
    let formatted = '';
    if (raw.length > 10) formatted = raw.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    else if (raw.length > 5) formatted = raw.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    else if (raw.length > 2) formatted = raw.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    else if (raw.length > 0) formatted = raw.replace(/^(\d*)/, '($1$2');
    else formatted = '';

    handleUpdateUser('phone', formatted);
  };

  const handleCepChange = async (value: string) => {
    let raw = value.replace(/\D/g, '');
    if (raw.length > 8) raw = raw.slice(0, 8);
    
    const formatted = raw.replace(/(\d{5})(\d)/, '$1-$2');
    handleUpdateUser('cep', formatted);

    if (raw.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (!data.erro) {
          const updatedUser = {
            ...user,
            cep: formatted,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          await updateProfile(updatedUser);
          showNotification('Endereço localizado!', 'success');
        }
      } catch (e) {
        console.error("Erro busca CEP");
      } finally {
        setCepLoading(false);
      }
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const res = await uploadImage(e.target.files[0]);
        if (res.url) {
          handleUpdateUser('avatar', res.url);
          showNotification('Foto de perfil atualizada!', 'success');
        }
      } catch (err) {
        showNotification('Erro ao subir foto', 'error');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const handleRepay = async (orderId: number) => {
    setRepayingId(orderId);
    try {
      const data = await getRepayUrl(orderId);
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        showNotification('Não foi possível gerar novo link de pagamento', 'error');
      }
    } catch (err) {
      showNotification('Erro ao processar requisição', 'error');
    } finally {
      setRepayingId(null);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-premium-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-sm shadow-sm border border-premium-100 p-8 flex flex-col items-center">
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full bg-premium-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative">
                  {uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-premium-300" />
                  )}
                </div>
                <label className="absolute bottom-1 right-1 bg-accent text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-accent-dark transition-colors border-2 border-white">
                  <Camera size={16} />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
              
              <h2 className="text-lg font-serif font-medium text-premium-900 capitalize text-center">{user.firstName} {user.lastName}</h2>
              <p className="text-xs text-premium-500 mb-6 text-center">{user.email}</p>

              <div className="w-full space-y-2 border-t border-premium-100 pt-6">
                <button 
                  onClick={() => setActiveTab('perfil')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium ${activeTab === 'perfil' ? 'bg-premium-900 text-white' : 'text-premium-600 hover:bg-premium-50'}`}
                >
                  <User className="w-4 h-4" /> Dados Pessoais
                </button>
                <button 
                  onClick={() => setActiveTab('pedidos')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium ${activeTab === 'pedidos' ? 'bg-premium-900 text-white' : 'text-premium-600 hover:bg-premium-50'}`}
                >
                  <ShoppingBag className="w-4 h-4" /> Meus Pedidos
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-colors text-sm font-medium text-red-600 hover:bg-red-50 mt-4"
                >
                  <LogOut className="w-4 h-4" /> Sair
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-sm shadow-sm border border-premium-100 p-8 min-h-[500px]">
              
              {activeTab === 'perfil' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif text-premium-900 mb-6">Meus Dados</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">Primeiro Nome</label>
                      <input 
                        type="text" 
                        value={user.firstName || ''} 
                        onChange={(e) => handleUpdateUser('firstName', e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">Sobrenome</label>
                      <input 
                        type="text" 
                        value={user.lastName || ''} 
                        onChange={(e) => handleUpdateUser('lastName', e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">E-mail de Cadastro</label>
                      <input type="email" value={user.email} readOnly className="w-full border border-premium-200 bg-premium-50 px-4 py-3 text-sm text-premium-400 rounded-sm outline-none cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">WhatsApp / Telefone</label>
                      <input 
                        type="text" 
                        value={user.phone || ''} 
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">CPF</label>
                      <input 
                        type="text" 
                        value={user.cpf || ''} 
                        onChange={(e) => handleCpfChange(e.target.value)}
                        className={`w-full border px-4 py-3 text-sm text-premium-900 rounded-sm outline-none transition-colors ${cpfError ? 'border-red-500' : 'border-premium-200 focus:border-accent'}`}
                        placeholder="000.000.000-00"
                      />
                      {cpfError && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> CPF Inválido</span>}
                    </div>
                    <div className="relative">
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">CEP</label>
                      <input 
                        type="text" 
                        value={user.cep || ''} 
                        onChange={(e) => handleCepChange(e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                        placeholder="00000-000"
                      />
                      {cepLoading && <Loader2 className="absolute right-3 top-[34px] w-4 h-4 animate-spin text-accent" />}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">Endereço (Rua/Avenida)</label>
                      <input 
                        type="text" 
                        value={user.address || ''} 
                        onChange={(e) => handleUpdateUser('address', e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">Número</label>
                      <input 
                        type="text" 
                        value={user.number || ''} 
                        onChange={(e) => handleUpdateUser('number', e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">Complemento</label>
                      <input 
                        type="text" 
                        value={user.complement || ''} 
                        onChange={(e) => handleUpdateUser('complement', e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">Cidade</label>
                      <input 
                        type="text" 
                        value={user.city || ''} 
                        onChange={(e) => handleUpdateUser('city', e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-premium-500 uppercase tracking-widest mb-2">Estado (UF)</label>
                      <input 
                        type="text" 
                        value={user.state || ''} 
                        onChange={(e) => handleUpdateUser('state', e.target.value)}
                        className="w-full border border-premium-200 bg-white px-4 py-3 text-sm text-premium-900 rounded-sm focus:border-accent outline-none" 
                        placeholder="Ex: SP"
                      />
                    </div>
                  </div>
                  <div className="mt-8 bg-green-50 border border-green-200 p-4 rounded-sm flex items-start gap-3 text-left">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-green-900">Sincronização Ativa</h4>
                      <p className="text-xs text-green-700 mt-1 text-left">As alterações feitas aqui serão aplicadas automaticamente no seu próximo Checkout.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pedidos' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif text-premium-900 mb-6">Histórico de Pedidos</h2>
                  
                  {loadingOrders ? (
                    <div className="flex flex-col items-center justify-center py-20 text-premium-400">
                      <Loader2 className="w-8 h-8 animate-spin mb-4 text-accent" />
                      <p>Carregando seus pedidos...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-premium-400 border-2 border-dashed border-premium-100 rounded-sm">
                      <Package className="w-16 h-16 mb-4 text-premium-200" />
                      <p className="text-lg font-serif text-premium-900 mb-2">Nenhum pedido encontrado</p>
                      <p className="text-sm">Você ainda não fez nenhuma compra na loja.</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {orders.map((order: any) => (
                        <div key={order.id} className="border border-premium-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                          <div className="bg-premium-900 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                              <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-1">Pedido #{order.id}</span>
                              <span className="text-xs text-white/70">{new Date(order.date_created).toLocaleDateString('pt-BR')} às {new Date(order.date_created).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                                order.status === 'cancelled' || order.status === 'refunded' ? 'bg-red-500/20 text-red-400' :
                                'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {order.status === 'completed' ? 'Entregue' : 
                               order.status === 'processing' ? 'Preparando Envio' : 
                               order.status === 'pending' ? 'Aguardando Pagamento' : 
                               order.status}
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-premium-100">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-[10px] font-bold text-premium-400 uppercase tracking-widest mb-1">Endereço de Entrega</p>
                                    <p className="text-sm text-premium-800 leading-relaxed">
                                      {order.address.street}, {order.address.number}<br />
                                      {order.address.city} - {order.address.state}<br />
                                      CEP: {order.address.postcode}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <User size={18} className="text-accent shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-[10px] font-bold text-premium-400 uppercase tracking-widest mb-1">Dados do Comprador</p>
                                    <p className="text-sm text-premium-800">{order.customer_name}</p>
                                    <p className="text-xs text-premium-500 mt-1">CPF: {order.cpf || 'Não informado'}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3 pt-2">
                                  <Smartphone size={18} className="text-accent shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-[10px] font-bold text-premium-400 uppercase tracking-widest mb-1">Contato</p>
                                    <p className="text-sm text-premium-800">{order.customer_phone || 'Não informado'}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <p className="text-[10px] font-bold text-premium-400 uppercase tracking-widest">Itens adquiridos</p>
                              {order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center text-sm">
                                  <div className="flex items-center gap-3">
                                    <span className="w-7 h-7 flex items-center justify-center bg-premium-50 text-premium-600 text-[10px] rounded-full font-bold border border-premium-100">{item.quantity}x</span>
                                    <span className="text-premium-800 font-medium">{item.name}</span>
                                  </div>
                                  <span className="font-bold text-premium-900 italic">R$ {parseFloat(item.total).toFixed(2).replace('.', ',')}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-premium-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                              <div className="flex items-center gap-3">
                                <CreditCard size={18} className="text-premium-400" />
                                <div>
                                  <p className="text-[10px] font-bold text-premium-400 uppercase tracking-widest mb-0.5">Pagamento</p>
                                  <p className="text-sm text-premium-800 font-medium">{order.payment_method || 'Não definido'}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-bold text-premium-400 uppercase tracking-widest mb-1">Total do Pedido</p>
                                <p className="text-2xl font-serif font-bold text-premium-900">R$ {parseFloat(order.total).toFixed(2).replace('.', ',')}</p>
                              </div>
                            </div>

                            {order.status === 'pending' && (
                                <button 
                                  onClick={() => handleRepay(order.id)}
                                  disabled={repayingId === order.id}
                                  className="w-full mt-6 bg-accent text-white py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-accent-dark transition-all flex items-center justify-center gap-2"
                                >
                                  {repayingId === order.id ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
                                  Finalizar Pagamento Agora
                                </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}