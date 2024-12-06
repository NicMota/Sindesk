'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from 'cookies-next';
import axios from 'axios';

// Interface para o payload do JWT
interface JwtPayload {
  sub?: string;
  email?: string;
  username? : string;
  id?: string
  exp?: number;
}

// Interface para o contexto de autenticação
interface AuthContextType {
  user: JwtPayload | null;
  setToken: (token: string) => void;
}

// Criar o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para acessar o AuthContext
export function useAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};


// Provider para gerenciar o estado de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  // Função para definir o token JWT
  const setToken = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log(decoded);
      setUser(decoded); // Armazena as informações do usuário decodificadas
    } catch (error) {
      console.error('Token inválido', error);
      setUser(null); // Se o token for inválido, limpa o estado
    }
  };

  // Verifica se já existe um token armazenado em cookies ou localStorage
  useEffect(() => {
    const token = getCookie('token');
    
    console.log(token);
    if (token) {
      setToken(token); // Decodifica o token e define o usuário
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
