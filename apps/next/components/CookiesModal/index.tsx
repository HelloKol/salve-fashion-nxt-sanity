import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Button, RadixDialog, CookiesSettingModal } from "@/components"

export default function CookiesModal() {
  const [cookies, setCookie] = useCookies(["cookie-consent"])
  const [cookieModalOpen, setCookieModalOpen] = useState(true)
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false)
  const cookieValid: string = cookies["cookie-consent"]

  useEffect(() => {
    if (cookieValid) return setCookieModalOpen(false)
    return setCookieModalOpen(true)
  }, [])

  const handleClose = () => {
    const currentYear = new Date()
    const nextYear = new Date()
    nextYear.setFullYear(currentYear.getFullYear() + 1)

    setCookie("cookie-consent", "hasAckowledged", {
      expires: nextYear,
      sameSite: "strict",
      path: "/",
    })
    setTimeout(() => {
      setCookieModalOpen(false)
    }, 500)
  }

  return (
    <>
      <RadixDialog
        variant={"consentCookie"}
        isOpen={cookieModalOpen}
        setIsOpen={() => {}}
      >
        <h1 className="mb-4 text-xl font-bold">Before you start shopping</h1>
        <article>
          <p>
            We use first- and third-party cookies including other tracking
            technologies from third party publishers to give you the full
            functionality of our website, to customize your user experience,
            perform analytics and deliver personalized advertising on our
            websites, apps and newsletters across internet and via social media
            platforms. For that purpose, we collect information about user,
            browsing patterns and device.
          </p>
          <p>
            By clicking &quot;Accept all cookies&quot;, you accept this, and
            agree that we share this information with third parties, such as our
            advertising partners. If you prefer, you can choose to continue with
            &quot;Only required cookies&quot;. But keep in mind that blocking
            some types of cookies may impact how we can deliver tailored content
            that you might like.
          </p>
        </article>

        <Button
          variant={"quaternary"}
          className="mt-3 w-full"
          onClick={handleClose}
        >
          Accept all cookies
        </Button>

        <Button
          variant={"quaternary"}
          className="mt-3 w-full"
          onClick={handleClose}
        >
          Reject all cookies
        </Button>

        <Button
          variant={"tertiary"}
          className="mt-6 w-full"
          onClick={() => setIsCookieSettingsOpen(true)}
        >
          Cookie settings
        </Button>
      </RadixDialog>

      <CookiesSettingModal
        isCookieSettingsOpen={isCookieSettingsOpen}
        setIsCookieSettingsOpen={setIsCookieSettingsOpen}
      />
    </>
  )
}
