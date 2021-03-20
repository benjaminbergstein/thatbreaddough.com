module.exports = {
  exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
    return {
      '/': { page: '/' },
      '/sourdough-calculator/index.html': { page: '/sourdough-calculator' },
      '/timer/index.html': { page: '/sourdough-timer' },
      '/sourdough-timer/index.html': { page: '/sourdough-timer' },
    }
  },
  trailingSlash: true,
}
