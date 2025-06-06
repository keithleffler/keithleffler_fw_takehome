import { v4 as uuidv4 } from 'uuid';

export const shortUUID = (n: number = 10): string => uuidv4().substring(0, n);
