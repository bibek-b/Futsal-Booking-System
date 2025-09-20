import { create } from 'zustand';

export const useActiveSectionStore = create((set) => ({
    activeSection: '/',
    setActiveSection: (section) => set({activeSection: section})
}))