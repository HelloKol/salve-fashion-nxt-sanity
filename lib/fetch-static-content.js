const client = require("../utils/sanity")

const fs = require("fs")

const createDirectory = async () =>
  fs.promises.mkdir("./data", { recursive: true })

const fetchSiteSettings = async () => {
  const data = await client.fetch(`
    *[_type == 'settings'][0] {
      ...,
      footer {
        credit,
        columns[] {
          title,
          links[] {
            _key,
            title,
            "externalLink": url,
            "internalLink": *[_id == ^.reference._ref][0] {
              dynamicRoute,
              "slug": slug.current,
            },
            _type
          },
        },
      }
    }
  `)

  fs.writeFileSync("./data/settings.json", JSON.stringify(data))
}

;(async () => {
  await Promise.all([createDirectory(), fetchSiteSettings()])
})()
