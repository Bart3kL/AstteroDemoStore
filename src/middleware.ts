import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	if (request.cookies.get("userAccessToken")) {
		const url = request.nextUrl.clone();
		url.pathname = "/account";

		return NextResponse.redirect(url.href);
	}
}

export const config = {
	matcher: ["/account/login", "/account/register"],
};
