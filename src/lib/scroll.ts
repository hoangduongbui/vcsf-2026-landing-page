/** Smooth-scroll to a section, leaving room for the fixed header. */
export function scrollToSection(id: string, offset = 60) {
  const el = id === 'top' ? null : document.getElementById(id)
  window.scrollTo({
    top: el ? el.getBoundingClientRect().top + window.scrollY - offset : 0,
    behavior: 'smooth',
  })
}

export const EASE = 'cubic-bezier(.2,.7,.2,1)'
