import { Button } from "@/components"
import { useRouter } from "next/router"

const navigationLinks = [
  { href: "/account/order", text: "Orders" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

export default function AccountNavigation() {
  const router = useRouter()

  return (
    <ul className="col-span-full flex gap-2 sm:gap-4">
      {navigationLinks.map((link, index) => (
        <li key={index}>
          <Button
            href={link.href}
            variant="tertiary"
            isActive={router.pathname.includes(link.href)}
          >
            {link.text}
          </Button>
        </li>
      ))}
    </ul>
  )
}
