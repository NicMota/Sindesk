import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*','/dashboard'],
}
interface JwtPayload {
  sub?: string;
  username?: string;
  verified?:boolean;
  role?:string;
  id?:string;
  exp?: number;
}
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token =  request.cookies.get('token')?.value;
  const {pathname} = request.nextUrl;
  if(pathname.startsWith('/dashboard/admin')){
    if(token){
      try{
        const decoded = jwtDecode<any>(token);

        if(decoded.role === 'ADMIN')
        {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL('/error/unauthorized', request.url));
        }
      }catch(e)
      {
        return new NextResponse('Token inválido', { status: 401 });
      }
    }else{
      return NextResponse.redirect(new URL('/login', request.url)); // Redirecionar para login
    }
  }
  if(pathname === '/dashboard' || pathname.startsWith ('/faq')) 
  {
    if(token)
      return NextResponse.next();
  }
  
  if(pathname === '/dashboard/create')
  {
    try{
      const user = jwtDecode<JwtPayload>(token);
      if(user.verified || user.role == "ADMIN")
          return NextResponse.next();
    }catch(err)
    {
      return new NextResponse('Token inválido', { status: 401 });
    }

  }
  
  return new NextResponse("unauthorized",{status:401});
}
 
  