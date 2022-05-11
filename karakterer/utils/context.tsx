import { Context, useContext as fetchContext, createContext as newContext } from 'react';

export function useContext<T>(c: Context<T | undefined>) {
    const context = fetchContext(c);

    if (context === undefined) {
        throw new Error('Use of context must be within context provider');
    }

    return context;
}

export function createContext<T>() {
    return newContext<T | undefined>(undefined);
}
