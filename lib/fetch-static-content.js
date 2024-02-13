const client = require("../utils/sanity")

const fs = require("fs")

const createDirectory = async () =>
  fs.promises.mkdir("./data", { recursive: true })

const fetchSiteSettings = async () => {
  console.log("asdasd", "<<")
  const data = await client.fetch(`
    *[_type == 'settings'][0] {
        ...
    }
  `)

  console.log(data, "<<")

  fs.writeFileSync("./data/settings.json", JSON.stringify(data))
}

;(async () => {
  await Promise.all([createDirectory(), fetchSiteSettings()])
})()
