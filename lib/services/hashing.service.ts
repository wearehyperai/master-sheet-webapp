import bcrypt from 'bcrypt';
const saltRounds = 8;

export const getHashData = async (credential: string): Promise<string> => {
    return await bcrypt.hash(credential, saltRounds);
}

export const compareHashData = (credential: string, storedHash: string): boolean => {
    return bcrypt.compareSync(credential, storedHash);
}