import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface ICredential {
  email: string;
  password: string
}

export async function POST(request: Request) {
  const credential: ICredential = await request.json();
  const token = jwt.sign({ email: credential.email }, 'fldkalfl', { expiresIn: '1h' });
  return Response.json({token});
}