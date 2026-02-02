import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface SignupData {
    email: string;
    name: string;
    password: string;
    companyName: string;
    country: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface OnboardingData {
    companyId: string;
    phone: string;
    address: string;
    businessType: string;
    monthlyVolume: string;
}

// Signup
export function useSignup() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    return useMutation({
        mutationFn: async (data: SignupData) => {
            const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, data);
            return response.data;
        },
        onSuccess: (data) => {
            signup(data);
            toast.success('Account created successfully!');
            navigate('/dashboard'); // Skip email verification for demo
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to create account');
        },
    });
}

// Login
export function useLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();

    return useMutation({
        mutationFn: async (data: LoginData) => {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, data);
            return response.data;
        },
        onSuccess: (data) => {
            login(data);
            toast.success('Welcome back!');
            // Navigation handled in the component to support "from" redirection
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Login failed');
        },
    });
}

// Verify Email
export function useVerifyEmail() {
    return useMutation({
        mutationFn: async (email: string) => {
            const response = await axios.post(`${API_BASE_URL}/api/auth/verify-email`, { email });
            return response.data;
        },
        onSuccess: (data) => {
            toast.success('Verification code sent to your email');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to send verification code');
        },
    });
}

// Complete Onboarding
export function useCompleteOnboarding() {
    const navigate = useNavigate();
    const { updateCompany } = useAuth();

    return useMutation({
        mutationFn: async (data: OnboardingData) => {
            const response = await axios.post(`${API_BASE_URL}/api/auth/complete-onboarding`, data);
            return response.data;
        },
        onSuccess: (data) => {
            updateCompany(data);
            toast.success('Onboarding completed!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to complete onboarding');
        },
    });
}

// Logout
export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { logout } = useAuth();

    return () => {
        logout();
        queryClient.clear();
        toast.success('Logged out successfully');
        navigate('/login');
    };
}

// Get current user
export function useCurrentUser() {
    const { user } = useAuth();
    return user;
}

// Get current company
export function useCurrentCompany() {
    const { company } = useAuth();
    return company;
}

// Check if authenticated
export function useIsAuthenticated() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated;
}

