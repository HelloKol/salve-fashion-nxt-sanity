import type { NextApiRequest, NextApiResponse } from "next";
import { graphqlClient } from "@/utils/graphql";
import { ORDER_HISTORY } from "@/services/queries/customer";

export default async function orderHistory(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { customerAccessToken } = req.query;

  if (!customerAccessToken)
    return res.status(400).json({ message: "Customer token is required." });

  try {
    const result: any = await graphqlClient.request(ORDER_HISTORY, {
      customerAccessToken,
      first: 10,
    });
    const orders = result.customer.orders.edges;
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching order history." });
  }
}
