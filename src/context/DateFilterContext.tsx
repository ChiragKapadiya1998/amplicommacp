import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Define the shape of the context state
interface DateFilterContextType {
    activePeriod: string;
    setActivePeriod: (period: string) => void;
    dateRange: { start: Date; end: Date } | null;
    setDateRange: (range: { start: Date; end: Date } | null) => void;
    compareDateRange: { start: Date; end: Date } | null;
    setCompareDateRange: (range: { start: Date; end: Date } | null) => void;
}

// Create the context
const DateFilterContext = createContext<DateFilterContextType | undefined>(undefined);

// Create a provider component
export const DateFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activePeriod, setActivePeriod] = useState<string>("1D");
    const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(null);
    const [compareDateRange, setCompareDateRange] = useState<{ start: Date; end: Date } | null>(null);

    return (
        <DateFilterContext.Provider
            value={{
                activePeriod,
                setActivePeriod,
                dateRange,
                setDateRange,
                compareDateRange,
                setCompareDateRange,
            }}
        >
            {children}
        </DateFilterContext.Provider>
    );
};

// Custom hook to use the context
export const useDateFilter = () => {
    const context = useContext(DateFilterContext);
    if (context === undefined) {
        throw new Error('useDateFilter must be used within a DateFilterProvider');
    }
    return context;
};
