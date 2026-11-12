const body = document.body
const btnTheme = document.querySelector('#theme-toggle')
const themeIcon = document.querySelector('.theme-toggle__icon')
const btnHamburger = document.querySelector('.fa-bars')

// clean up the junk class the old script used to add
body.classList.remove('null')

// apply saved theme, otherwise keep the hardcoded class on <body>
const media = window.matchMedia('(prefers-color-scheme: light)')
const savedTheme = localStorage.getItem('portfolio-theme')

const applyTheme = (theme) => {
  body.classList.remove('light', 'dark')
  body.classList.add(theme)
}

// saved choice wins, otherwise follow the OS
applyTheme(
  savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : media.matches ? 'light' : 'dark'
)

// follow live OS changes, but only if the user never picked manually
media.addEventListener('change', (e) => {
  if (!localStorage.getItem('portfolio-theme')) {
    applyTheme(e.matches ? 'light' : 'dark')
    syncIcon()
  }
})

const syncIcon = () => {
  if (themeIcon) {
    themeIcon.textContent = body.classList.contains('dark') ? '🌙' : '☀️'
  }
}
syncIcon()

if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    const next = body.classList.contains('dark') ? 'light' : 'dark'
    body.classList.remove('dark', 'light')
    body.classList.add(next)
    localStorage.setItem('portfolio-theme', next)
    syncIcon()
  })
}

// only wire this up if a hamburger actually exists
if (btnHamburger) {
  btnHamburger.addEventListener('click', () => {
    const navUl = document.querySelector('.nav__list')
    const isOpen = btnHamburger.classList.contains('fa-bars')
    btnHamburger.classList.toggle('fa-bars', !isOpen)
    btnHamburger.classList.toggle('fa-times', isOpen)
    if (navUl) navUl.classList.toggle('display-nav-list', isOpen)
  })
}

// back-to-top arrow (this never ran before because of the crash above)
const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top')
  if (!btnScrollTop) return
  const y = window.scrollY || document.documentElement.scrollTop
  btnScrollTop.style.display = y > 500 ? 'block' : 'none'
}
document.addEventListener('scroll', scrollUp)
scrollUp()

// Enable theme transitions only after page has fully loaded
// This prevents the wonky staggered fade-in on initial load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('theme-ready')
  }, 100) // Small delay to ensure all elements are rendered
})