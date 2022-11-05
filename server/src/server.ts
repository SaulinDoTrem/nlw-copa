import Fastify, { fastify } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import config from './config';

import { poolRoutes } from './routes/pool';
import { userRoutes } from './routes/user';
import { guessRoutes } from './routes/guess';
import { authRoutes } from './routes/auth';
import { gameRoutes } from './routes/game';

async function bootstrap() {
    try{
        const fastify = Fastify({
            logger: true,
        });
    
        await fastify.register(cors, {
            origin: true,
        });
    
    
        await fastify.register(jwt, {
            secret: config.JWT_ASSIGNATURE,
        });
    
        await fastify.register(poolRoutes);
        await fastify.register(authRoutes);
        await fastify.register(gameRoutes);
        await fastify.register(guessRoutes);
        await fastify.register(userRoutes);
    
        await fastify.listen({ port: 3333, host: '0.0.0.0' });
    } catch(e) {
        fastify.log.error(e);

        process.exit(1);
    }
    
}

bootstrap();