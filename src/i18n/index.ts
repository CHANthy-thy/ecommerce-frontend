import { dictionaries, type Lang } from './dictionaries'

export { type Lang }

export function getDictionary(lang: Lang) {
  return dictionaries[lang]
}

