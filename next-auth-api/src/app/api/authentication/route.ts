import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';
// import { NextApiRequestWithUser } from '@/types'; // Define your custom type for the request

export default async function handler(req: any, res: NextApiResponse) {
  // Extract the JWT token from the request's Authorization header
  const token = req.headers.authorization?.replace('Bearer ', '');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secret14344');

    // If verification is successful, the user is authenticated
    return res.status(200).json({ message: 'User is authenticated', user: decodedToken });
  } catch (error) {
    // If verification fails, the token is invalid or expired
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
