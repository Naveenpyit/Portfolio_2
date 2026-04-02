import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

function readStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s === 'light' || s === 'dark') return s
  } catch {
    /* ignore */
  }
  // Default to dark when there is no stored preference.
  return 'dark'
}

export function applyThemeToDocument(theme: ThemeMode) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

type UiState = { menuOpen: boolean; activeId: string; theme: ThemeMode }

const initialState: UiState = {
  menuOpen: false,
  activeId: 'home',
  theme: readStoredTheme(),
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMenuOpen: (s, a: PayloadAction<boolean>) => {
      s.menuOpen = a.payload
    },
    setActiveId: (s, a: PayloadAction<string>) => {
      s.activeId = a.payload
    },
    setTheme: (s, a: PayloadAction<ThemeMode>) => {
      s.theme = a.payload
    },
    toggleTheme: (s) => {
      s.theme = s.theme === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { setMenuOpen, setActiveId, setTheme, toggleTheme } = uiSlice.actions
export default uiSlice.reducer
