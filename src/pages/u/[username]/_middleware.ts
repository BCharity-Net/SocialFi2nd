import { Profile } from '@generated/types'
import generateMeta from '@lib/generateMeta'
import getIPFSLink from '@lib/getIPFSLink'
import { NextRequest } from 'next/server'
import parser from 'ua-parser-js'

export async function middleware(req: NextRequest) {
  const { headers } = req
  const url = req.nextUrl.clone()
  const username = url.pathname.replace('/u/', '')
  const ua = parser(headers.get('user-agent')!)

  if (!ua.os.name) {
    const result = await fetch(`${url.origin}/api/profile?handle=${username}`)
    const data = await result.json()
    const profile: Profile = data?.profile

    if (data?.success) {
      const title = profile?.name
        ? `${profile?.name} (@${profile?.handle}) • BCharity`
        : `@${profile?.handle} • BCharity`
      const description = profile?.bio ?? ''
      const image = profile
        ? `https://ik.imagekit.io/lensterimg/tr:n-avatar/${getIPFSLink(
            // @ts-ignore
            profile?.picture?.original?.url ??
              // @ts-ignore
              profile?.picture?.uri ??
              `https://avatar.tobi.sh/${profile?.ownedBy}_${profile?.handle}.png`
          )}`
        : 'https://assets.bcharity.xyz/images/og/logo.jpeg'

      return new Response(generateMeta(title, description, image), {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 's-maxage=86400'
        }
      })
    }
  }
}
