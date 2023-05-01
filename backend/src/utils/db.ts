// JSON File Key-Value Database

import fsPromises from "fs/promises";

let filePath: string;

// create a new database file if it does not exist
const init = async (path: string = "./db.json") => {
  try {
    const file = await fsPromises.open(path, "a+");
    if ((await file.readFile()).length === 0) {
      file.appendFile("{}");
    }
    filePath = path;
    file.close();
    return true;
  } catch (e) {
    return false;
  }
};

// delete the database file if not needed
const teardown = async () => {
  try {
    await fsPromises.unlink(filePath);
    filePath = "";
    return true;
  } catch (err) {
    return false;
  }
};

// set, get or remove an item with a given key
const setItem = async (key: string, value: any) => {
  try {
    const file = await fsPromises.readFile(filePath, "utf-8");
    const json = JSON.parse(file);
    json[key] = value;
    await fsPromises.writeFile(filePath, JSON.stringify(json, null, 2));
    return true;
  } catch (e) {
    return false;
  }
};

const getItem = async (key: string) => {
  try {
    const file = await fsPromises.readFile(filePath, "utf-8");
    const json = JSON.parse(file);
    return json[key];
  } catch (e) {
    return false;
  }
};

const removeItem = async (key: string) => {
  try {
    const file = await fsPromises.readFile(filePath, "utf-8");
    const json = JSON.parse(file);
    delete json[key];
    await fsPromises.writeFile(filePath, JSON.stringify(json));
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  init,
  teardown,
  setItem,
  getItem,
  removeItem,
};
