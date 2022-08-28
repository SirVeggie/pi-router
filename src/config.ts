import 'dotenv/config';

export const config = {
    PORT: process.env.PORT!,
    PC_MAC: process.env.PC_MAC!,
    TV_MAC: process.env.TV_MAC!
};

const keys = Object.keys(config);
for (let i = 0; i < keys.length; i++) {
    if (config[keys[i] as keyof typeof config] === undefined) {
        throw `.env is missing ${keys[i]}`;
    }
}