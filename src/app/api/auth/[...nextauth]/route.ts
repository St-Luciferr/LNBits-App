import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
// configure your providers
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };