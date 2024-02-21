/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "googleusercontent.com",
          "oaidalleapiprodscus.blob.core.windows.net",
          "cdn.openai.com",
          'replicate.delivery',
          "content.proxyapi.ru"
        ]
      },
}

module.exports = nextConfig
