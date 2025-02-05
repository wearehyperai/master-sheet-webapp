import { pack, unpack } from 'msgpackr';

export const serialize = (data: any): Buffer => {
    return pack(data);
}

export const deSerialize = (data: Buffer): any => {
    const list: any = unpack(data);
    return list;
}