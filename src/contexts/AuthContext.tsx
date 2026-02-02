import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    user: any;
    company: any;
    token: string | null;
    isAuthenticated: boolean;
    login: (data: any) => void;
    signup: (data: any) => void;
    logout: () => void;
    updateCompany: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [company, setCompany] = useState<any>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedCompany = localStorage.getItem('company');
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedCompany) setCompany(JSON.parse(storedCompany));
    }, []);

    const login = (data: any) => {
        const { user, company, token } = data;
        setUser(user);
        setCompany(company);
        setToken(token);
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('company', JSON.stringify(company));
    };

    const signup = (data: any) => {
        const { user, company, token } = data;
        setUser(user);
        setCompany(company);
        setToken(token);
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('company', JSON.stringify(company));
    };

    const logout = () => {
        setUser(null);
        setCompany(null);
        setToken(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        localStorage.removeItem('company');
    };

    const updateCompany = (data: any) => {
        setCompany(data);
        localStorage.setItem('company', JSON.stringify(data));
    };

    return (
        <AuthContext.Provider value={{
            user,
            company,
            token,
            isAuthenticated: !!token,
            login,
            signup,
            logout,
            updateCompany
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
