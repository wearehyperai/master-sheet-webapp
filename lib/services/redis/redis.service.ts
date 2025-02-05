import { createClient } from 'redis';
const redisClient = createClient({
    username: 'default',
    password: 'iTvKU9fKgLm4oBBd6ZrPrekcVyIzvY5v',
    socket: {
        host: 'redis-19477.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19477
    },
});

redisClient.on('error', err => {
    console.log(`error time ${new Date().toLocaleTimeString('en-IN')}`);
    return console.log('Redis Client Error', err);
});

export async function connectRedis() {
    try {
        await redisClient.connect();
        console.log("Connected to redis");
    } catch (e) {
        console.log("Error Redis : " + e);
    }
}

export default redisClient;