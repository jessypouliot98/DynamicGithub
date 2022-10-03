import fs from 'fs';
import pfs from 'fs/promises';

const DB_FILE = 'db.json';

export const initDB = async () => {
  if (fs.existsSync(DB_FILE)) {
    return;
  }

  await pfs.writeFile(DB_FILE, JSON.stringify({}));
}

export const loadEntry = async (key: string) => {
  const data = await pfs.readFile(DB_FILE, { encoding: 'utf-8' });
  const json = JSON.parse(data);

  return json[key];
}

export const saveEntry = async (key: string, value: any) => {
  const data = await pfs.readFile(DB_FILE, { encoding: 'utf-8' });
  const json = JSON.parse(data);

  json[key] = value;

  await pfs.writeFile(DB_FILE, JSON.stringify(json));
}
