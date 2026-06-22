import { computed, ref, watch } from 'vue'
import { dictionaries, type Lang } from '@/i18n/dictionaries'

const STORAGE_LANG = 'shopmart_lang'

const langFromStorage = (() => {
  const v = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_LANG) : null
  return v === 'en' || v === 'kh' ? (v as Lang) : 'kh'
})()

const stateLang = ref<Lang>(langFromStorage)

function applyLangAttribute(lang: Lang) {
  if (typeof document !== 'undefined') document.documentElement.lang = lang
}

applyLangAttribute(stateLang.value)

export function useI18n() {
  function setLang(l: Lang) {
    stateLang.value = l
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_LANG, l)
    applyLangAttribute(l)
  }

  const t = (key: string, params: Record<string, string | number> = {}) => {
    const dict = dictionaries[stateLang.value]
    let value = dict[key] ?? key
    return value.replace(/\{\{(\w+)\}\}/g, (_, name) => String(params[name] ?? ''))
  }

  const lang = computed(() => stateLang.value)

  return {
    lang,
    setLang,
    t,
  }
}

watch(stateLang, (l) => {
  applyLangAttribute(l)
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_LANG, l)
})
