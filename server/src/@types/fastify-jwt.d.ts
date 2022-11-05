import '@fastify/jwt';

declare module '@fastify/jwt' {
   interface FastifyJwt{
    user:{
        sub: string;
        name: string;
        avatarUrl: string;
    }
   } 
}