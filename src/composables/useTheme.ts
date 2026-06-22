import { computed, ref, watch } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_THEME = 'shopmart_theme'

const themeFromStorage = (() => {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_THEME) : null
  return v === 'dark' || v === 'light' ? (v as Theme) : 'light'
})()

const stateTheme = ref<Theme>(themeFromStorage)

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
}

applyTheme(stateTheme.value)

export function useTheme() {
  function setTheme(t: Theme) {
    stateTheme.value = t
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_THEME, t)
    applyTheme(t)
  }

  const theme = computed(() => stateTheme.value)

  watch(stateTheme, (t) => {
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_THEME, t)
    applyTheme(t)
  })

  return {
    theme,
    setTheme,
    isDark: computed(() => stateTheme.value === 'dark'),
    toggle() {
      setTheme(stateTheme.value === 'dark' ? 'light' : 'dark')
    },
  }
}

