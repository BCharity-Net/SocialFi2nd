import React from 'react'

const Hero: React.FC = () => {
  return (
    <div className="py-12 mb-4 bg-white border-b bg-hero">
      <div className="container px-5 mx-auto max-w-screen-xl">
        <div className="flex items-stretch py-8 w-full text-center sm:py-12 sm:text-left">
          <div className="flex-1 flex-shrink-0 space-y-3">
            <div className="text-2xl font-extrabold text-black sm:text-4xl">
              Welcome to BCharity 👋
            </div>
            <div className="leading-7 text-gray-700">
              Next generation community-driven composable, decentralized, and
              permissionless public good Web3.0 built on blockchains.
            </div>
            <div className="leading-7 text-gray-700">
              First-ever native utility crypto token for OnChain Volunteer
              Management globally --- Forever Heart Love on-chain!
            </div>
          </div>
          <div className="hidden flex-1 flex-shrink-0 w-full sm:block"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
