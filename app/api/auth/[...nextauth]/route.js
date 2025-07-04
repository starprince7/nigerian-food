import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

const handler = NextAuth({
  adapter: MongoDBAdapter(connectToDatabase()),
  providers: [
    // Google OAuth (future implementation)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    // Simple email-based authentication
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        name: { label: 'Name', type: 'text' }
      },
      async authorize(credentials) {
        await connectToDatabase();
        
        let user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          // Create new user if doesn't exist
          user = await User.create({
            email: credentials.email,
            name: credentials.name || 'Food Lover'
          });
        }
        
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image
        };
      }
    })
  ],
  
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  
  session: {
    strategy: 'jwt'
  }
});

export { handler as GET, handler as POST }; 