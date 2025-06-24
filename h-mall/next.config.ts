import type { NextConfig } from 'next'
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_HOST;


interface SVGExcludeRule {
  test?: RegExp
  exclude?: Array<RegExp | string>
}

interface SVGRLoader {
  loader: string
  options: { icon?: boolean; svgo?: boolean }
}

interface SVGRRule {
  test: RegExp
  issuer: RegExp
  use: SVGRLoader[]
}

const nextConfig: NextConfig & { serverExternalPackages?: string[] } = {
  reactStrictMode: true,

  webpack(config) {
    const rules = config.module?.rules
    if (Array.isArray(rules)) {
      rules.forEach((rule) => {
        const r = rule as SVGExcludeRule
        if (
          r.test instanceof RegExp &&
          r.test.toString().includes('svg') &&
          Array.isArray(r.exclude)
        ) {
          r.exclude.push(/\.svg$/i)
        }
      })
    }

    const svgrRule = {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: { icon: true, svgo: true },
        },
      ],
    } as SVGRRule

    config.module?.rules?.push(svgrRule)

    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your.cdn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: supabaseHost!,
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig