import AppContext from '@components/utils/AppContext'
import Link from 'next/link'
import { FC, useContext } from 'react'

const Footer: FC = () => {
  const { staffMode } = useContext(AppContext)

  return (
    <footer
      className={`mt-4 leading-7 text-sm sticky flex flex-wrap px-3 lg:px-0 gap-x-[12px] ${
        staffMode ? 'top-28' : 'top-20'
      }`}
    >
      <span className="font-bold text-gray-500 dark:text-gray-300">
        © BCharity
      </span>
      <Link href="/about" prefetch={false}>
        <a href="/about">About</a>
      </Link>
      <Link href="/privacy" prefetch={false}>
        <a href="/privacy">Privacy</a>
      </Link>
      <a
        href="https://bcharity.net/discord"
        target="_blank"
        rel="noreferrer noopener"
      >
        Discord
      </a>
      <a
        href="https://lenster.xyz/open"
        target="_blank"
        rel="noreferrer noopener"
      >
        Open
      </a>
      <a
        href="https://lenster.xyz/donate"
        target="_blank"
        rel="noreferrer noopener"
      >
        Donate
      </a>
      <a
        href="https://status.lenster.xyz"
        target="_blank"
        rel="noreferrer noopener"
      >
        Status
      </a>
      <a
        href="https://snapshot.org/#/igive.eth"
        target="_blank"
        rel="noreferrer noopener"
      >
        Vote
      </a>
      <Link href="/thanks" prefetch={false}>
        <a href="/thanks">Thanks</a>
      </Link>
      <a
        href="https://gitlab.com/lenster/lenster"
        target="_blank"
        rel="noreferrer noopener"
      >
        GitHub
      </a>
      <a
        className="pr-3 hover:font-bold"
        href="https://vercel.com/?utm_source=Lenster&utm_campaign=oss"
        target="_blank"
        rel="noreferrer noopener"
      >
        ▲ Powered by Vercel
      </a>
    </footer>
  )
}

export default Footer
