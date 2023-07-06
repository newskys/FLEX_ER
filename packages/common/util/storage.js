const getObjectFromLocalStorage = async (key) => new Promise((resolve, reject) => {
  try {
    chrome.storage.local.get(key, (value) => {
      resolve(value[key]);
    });
  } catch (error) {
    reject(error);
  }
});
const saveObjectInLocalStorage = async (obj) => new Promise((resolve, reject) => {
  try {
    chrome.storage.local.set(obj, () => {
      resolve(null);
    });
  } catch (error) {
    reject(error);
  }
});

/**
 * Removes Object from Chrome Local StorageArea.
 *
 * @param {string or array of string keys} keys
 */
const removeObjectFromLocalStorage = async (keys) => new Promise((resolve, reject) => {
  try {
    chrome.storage.local.remove(keys, () => {
      resolve(null);
    });
  } catch (error) {
    reject(error);
  }
});

export default {
  getObjectFromLocalStorage,
  saveObjectInLocalStorage,
  removeObjectFromLocalStorage
}