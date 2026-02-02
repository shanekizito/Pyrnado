import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageHeaderContextType {
    title: string | null;
    setTitle: (title: string | null) => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
    const [title, setTitle] = useState<string | null>(null);

    return (
        <PageHeaderContext.Provider value={{ title, setTitle }}>
            {children}
        </PageHeaderContext.Provider>
    );
}

export function usePageHeader() {
    const context = useContext(PageHeaderContext);
    if (context === undefined) {
        throw new Error('usePageHeader must be used within a PageHeaderProvider');
    }
    return context;
}
