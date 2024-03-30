import { Button } from "@/components"
import { useRouter } from "next/router"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

export default function AccountNavigation() {
  const router = useRouter()

  return (
    <ul className="col-span-12 flex gap-4">
      {navigationLinks.map((link, index) => (
        <li>
          <Button
            key={index}
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
