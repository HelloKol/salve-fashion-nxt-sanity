import { gql, useQuery } from "@apollo/client"
import type { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"
import { graphqlClientPrivate } from "@/utils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { email } = req.body
  // Get the user's IP address from the x-forwarded-for header
  const forwardedFor = req.headers["x-forwarded-for"]

  const userIP = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor || req.connection.remoteAddress

  console.log(userIP, "<<<req")

  try {
    const response = await graphqlClientPrivate.request(
      gql`
        mutation customerRecover($email: String!) {
          customerRecover(email: $email) {
            customerUserErrors {
              message
            }
          }
        }
      `,
      {
        variables: { email: email },
      }
    )

    console.log(response, "<<<req")

    // const data = await response.json()
    res.status(200).json({
      hello: `hellooo`,
    })
  } catch (error) {
    console.error("Error making reset password request:", error)
    res.status(500).json({ error: "Error making reset password request" })
  }
}
