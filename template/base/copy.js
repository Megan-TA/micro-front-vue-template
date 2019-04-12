const copy = require('recursive-copy')

const task = [
  {
    src: 'applications/app-base/dist',
    dest: 'dist'
  }
]

task.forEach(({ src, dest }) => {
  copy(src, dest, (error) => {
    error &&
      console.error('[Copy failed]', `src: ${src}, dest: ${dest}`, error)
  })
})
