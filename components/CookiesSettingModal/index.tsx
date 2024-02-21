import { Button, RadixDialog } from "@/components"

export default function CookiesSettingModal({
  isCookieSettingsOpen,
  setIsCookieSettingsOpen,
}: {
  isCookieSettingsOpen: boolean
  setIsCookieSettingsOpen: (val: boolean) => void
}) {
  return (
    <RadixDialog
      variant={"cookieSettings"}
      isOpen={isCookieSettingsOpen}
      setIsOpen={() => {}}
    >
      <h1 className="mb-4 text-xl font-bold">Cookie setting</h1>

      <div>
        <div className="flex items-center justify-between">
          <h2>PREFERENCE COOKIES</h2>
          <button>cirlce</button>
        </div>
        <article>
          <p>
            Functionality cookies enable the website to provide enhanced
            functionality and personalisation according to the criteria that you
            have selected (for example, the language or products selected for
            purchase). If you do not allow these cookies then some or all of
            these services may not function properly.
          </p>
        </article>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2>STATISTICS COOKIES</h2>
          <button>cirlce</button>
        </div>
        <article>
          <p>
            Analytical cookies are used to measure and analyse our website
            audience (visitor volume, pages viewed, average browsing time,
            etc.). All information these cookies collect is aggregated and
            therefore anonymous. By accepting these cookies, you are helping us
            to improve the performance of our website.
          </p>
        </article>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2>MARKETING COOKIES</h2>
          <button>cirlce</button>
        </div>
        <article>
          <p>
            These cookies are aimed at creating profiles relating to the user
            and are used to show you promotional messages that are in line with
            the preferences you have displayed while navigating on the network.
            They do not store directly personal information, but are based on
            uniquely identifying your browser and internet device. If you do not
            allow these cookies, you will experience less targeted advertising
            as you browse the Internet.
          </p>
        </article>
      </div>

      <div className="mt-3 flex flex-col items-center gap-4 md:flex-row md:justify-end">
        <Button
          variant={"tertiary"}
          className="w-full md:w-fit"
          onClick={() => setIsCookieSettingsOpen(false)}
        >
          Save Preferences
        </Button>

        <Button
          variant={"quaternary"}
          className="w-full md:w-fit"
          onClick={() => setIsCookieSettingsOpen(false)}
        >
          Accept All
        </Button>
      </div>
    </RadixDialog>
  )
}
