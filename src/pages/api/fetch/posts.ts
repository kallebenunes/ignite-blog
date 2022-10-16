import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  console.log(req.body);
  console.log('Chamou o api route');
  // try {
  //   // const response = fetch(req.query.next_page_url);
  // } catch (error) {}
  res.status(200).json({ name: 'John Doe' });
}
