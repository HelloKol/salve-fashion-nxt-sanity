import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function instagramAccount(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { accessToken } = req.query;
  if (!accessToken)
    return res.status(400).json({ message: "Access token is required." });

  const fields = `id,username,account_type`;
  const url = `https://graph.instagram.com/me?fields=${fields}&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Instagram account:", error);
    res.status(500).json({ error: "Error fetching Instagram account" });
  }
}
