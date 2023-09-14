import { create } from 'zustand'
import { createSelectorFunctions } from 'auto-zustand-selectors-hook'


export const useShowDetailsStoreBase = create<{ selected: number | null }>((set) => ({ selected: null }))

export const useShowDetailsStore = createSelectorFunctions(useShowDetailsStoreBase)