/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'bg': 'var(--color-bg)',
        'bot-msg-text': 'var(--bot-msg-text)',
        'bot-msg-bg': 'var(--bot-msg-bg)',
        'msg-input-bg': 'var(--msg-input-bg)',
        'msg-input-text': 'var(--msg-input-text)',
        'msg-input-placeholder': 'var(--msg-input-placeholder)',
        'gray': '#BDBDBD',
      },
      boxShadow: {
        sm: '0 2px 5px 0'
      }
    },
  },
  plugins: [],
}

