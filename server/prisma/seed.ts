import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    const user = await prisma.user.create({
        data: {
            name: 'Saulo Klein Nery',
            email: 'saulin-from.train@gmail.com',
            avatarUrl: 'https://github.com/SaulinDoTrem.png'
        }
    });

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    await prisma.game.create({
        data: {
            date: new Date().toISOString(),
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    });

    await prisma.game.create({
        data: {
            date: new Date().toISOString(),
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'PT',

            guesses: {
                create: {
                    firstTeamPoints: 4,
                    secondTeamPoints: 5,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });
}

main();