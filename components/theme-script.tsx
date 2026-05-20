export function ThemeScript() {
  const code = `
    (() => {
      try {
        const stored = localStorage.getItem('dmjjc-theme');
        const theme = stored === 'light' || stored === 'dark'
          ? stored
          : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        document.documentElement.classList.toggle('light', theme === 'light');
        document.documentElement.style.colorScheme = theme;
      } catch (_) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
