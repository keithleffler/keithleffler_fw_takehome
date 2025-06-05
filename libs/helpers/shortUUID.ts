import { v4 as uuidv4 } from 'uuid';

export const shortUUID = (n=10) => {
  uuidv4().substring(0,n)
}
