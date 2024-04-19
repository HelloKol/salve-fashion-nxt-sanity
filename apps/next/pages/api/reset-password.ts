import { gql } from "@apollo/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { graphqlClientPrivate } from "@/utils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { email } = req.body
  // Get the user's IP address from the x-forwarded-for header
  const forwardedFor = req.headers["x-forwarded-for"]

  Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor || req.connection.remoteAddress

  try {
    await graphqlClientPrivate.request(
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

    res.status(200).json({
      hello: `hellooo`,
    })
  } catch (error) {
    console.error("Error making reset password request:", error)
    res.status(500).json({ error: "Error making reset password request" })
  }
}
