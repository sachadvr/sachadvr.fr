import 'react'

declare module 'react' {
  // React 18.2 ne connaît pas `fetchPriority` (typé seulement à partir de React 19)
  // et avertit dans la console pour toute prop camelCase inconnue. L'attribut doit
  // donc être écrit en minuscules pour être transmis tel quel au DOM.
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}
