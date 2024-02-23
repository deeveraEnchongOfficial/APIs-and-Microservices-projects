import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Define a custom interface extending NextRequest to include a locals property
interface CustomNextRequest extends NextRequest {
    locals: { [key: string]: any }; // Define the locals property to hold custom data
}

// Secret key for JWT token verification (should be stored securely, possibly in environment variables)
const secretKey = 'your_secret_key';

export async function authenticate(req: CustomNextRequest) {
    // Extract the token from the request headers
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    // Check if the token exists
    if (!token) {
        // Token is missing, return unauthorized response
        return NextResponse.rewrite('/login'); // Redirect to login page or handle unauthorized access as required
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey) as { [key: string]: any };

        // Attach the user object to the request for use in subsequent middleware or routes
        req.locals = { user: decoded };

        // Continue with the request chain
        return NextResponse.next(req);
    } catch (error) {
        // Token verification failed, return unauthorized response
        return NextResponse.rewrite('/login'); // Redirect to login page or handle unauthorized access as required
    }
}
