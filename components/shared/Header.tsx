import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image 
            src="/assets/images/logo.png" width={160} height={70}
            alt="Evently logo" 
          />
        </Link>

        <div>
        <Link href="/about" className="w-36">
          <p>About</p>
        </Link>
        </div>
      </div>
    </header>
  )
}

export default Header