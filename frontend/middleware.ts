import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*','/dashboard'],
}
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token =  request.cookies.get('token')?.value;
  if(token)
    return NextResponse.next();
  

  

  return new NextResponse("unauthorized",{status:401});
}
 
  