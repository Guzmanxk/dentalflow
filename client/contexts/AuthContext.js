import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();

  // Configurar axios com interceptor
  useEffect(() => {
    const token = localStorage.getItem('dentaflow_token');
    if (token) {
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Verificar token na inicialização
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('dentaflow_token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/verify');
          setUser(response.data.clinic);
          setToken(token);
        } catch (error) {
          console.error('Token inválido:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      const { token, clinic } = response.data;
      
      // Salvar token no localStorage
      localStorage.setItem('dentaflow_token', token);
      localStorage.setItem('token', token); // Manter compatibilidade
      
      // Configurar axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(clinic);
      
      toast.success('Login realizado com sucesso!');
      
      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      const message = error.response?.data?.error || 'Erro ao fazer login';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (clinicData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', clinicData);

      const { token, clinic } = response.data;
      
      localStorage.setItem('dentaflow_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(clinic);
      
      toast.success('Clínica registrada com sucesso!');
      
      // Redirecionar para dashboard
      router.push('/dashboard');
      
      return { success: true };
    } catch (error) {
      console.error('Erro no registro:', error);
      const message = error.response?.data?.error || 'Erro ao registrar clínica';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('dentaflow_token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    router.push('/');
    toast.success('Logout realizado com sucesso!');
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await axios.put('/api/auth/profile', profileData);
      
      setUser(response.data.clinic);
      toast.success('Perfil atualizado com sucesso!');
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      const message = error.response?.data?.error || 'Erro ao atualizar perfil';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      await axios.put('/api/auth/password', {
        currentPassword,
        newPassword
      });
      
      toast.success('Senha alterada com sucesso!');
      return { success: true };
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      const message = error.response?.data?.error || 'Erro ao alterar senha';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      setUser(response.data.clinic);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      logout();
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 