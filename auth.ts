
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY , AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,Google],
  callbacks: {
    async signIn({user,account,profile}){
      let existingUser;

      if (account?.provider === "github") {
        existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
      } else if (account?.provider === "google") {
        existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: profile?.sub, // Google uses 'sub' instead of 'id'
        });
      }

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: account?.provider === "github" ? profile?.id : profile?.sub,
          name: user?.name,
          username: profile?.login || profile?.email?.split("@")[0], // Google doesn't provide a username
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || "",
          provider: account?.provider, // Store the provider info
        });
      }

      return true;
    },


    async jwt({ token, account, profile }) {
      if (account && profile) {
        let user;

        if (account.provider === "github") {
          user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });
        } else if (account.provider === "google") {
          user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: profile?.sub,
          });
        }

        token.id = user?._id;
      }
      return token;
    },

    async session({session,token}){
      Object.assign(session,{id: token.id});
      return session;
    }
  }
})