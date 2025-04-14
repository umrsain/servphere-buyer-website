import { analytics } from "@/utils/analytics";


// UUID regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

export default async function middleware(request){

      // Get the pathname from the URL
  const pathname = request.nextUrl.pathname
  
  // Remove leading slash to get the path segment
  const path = pathname.startsWith('/') ? pathname.substring(1) : pathname

     // Check if the path is exactly a UUID and nothing else
  if (UUID_REGEX.test(path) && !path.includes('/')) {

    try{

        console.log("REACHED HERE SUPPOSED TO ADD TO DB")
        analytics.track("page-view",{
            page: `/${path}`,

        })        
    } catch(error) {
        // RUN SILENTLY
        console.log("ERROR BLOCK")
        console.log(error)
    }
    
    // Your logic for when the path is exactly a store ID
    // For example, you might want to rewrite the request or add headers
    
    // Example: rewrite to a store page
    // return NextResponse.rewrite(new URL(`/store/${path}`, request.url))
  }
  /*
   
    console.log("TRACKING");

    const { nextUrl } = req;
    
    
    const authCookie = req.cookies.get("authjs.session-token");

    console.log(nextUrl.pathname)


    if (authCookie) 
        console.log("logged in")

    if (!authCookie && nextUrl.pathname!== "/") {
        console.log("Xnot logged in")
        return Response.redirect(new URL('/', nextUrl));
    }
  
    
    try{
        analytics.track("page-view",{
            page: '/store/:path*',

        })        
    } catch(error) {
        // RUN SILENTLY
        console.log(error)
    }

    
    */
    

}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],}