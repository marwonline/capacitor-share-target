import {Plugins} from '@capacitor/core';
const {Filesystem} = Plugins;

import {isFileAsset, ShareAsset, ShareTargetEventData} from "./definitions";



function getFileUri(asset: ShareAsset): string | undefined{
  if (isFileAsset(asset)) {
    return asset.uri;
  }
  return undefined;
}

/**
 * This method will load a file associated to a given asset.
 * @param asset The asset.
 * @returns A base64 encoded version of the string.
 */
export async function loadFile(asset: ShareAsset): Promise<string | undefined> {
  const uri = getFileUri(asset);
  if (!uri) {
    return;
  }
  const result = await Filesystem.readFile({
    path: uri
    // Not providing a directory leads to resolving content URIs.
    // Not providing an encoding leads to receiving a base64 string.
  });
  return result.data;
}

/**
 * This method will load all files associated to a given event.
 * @param data The event which was invoked.
 * @returns The enriched data.
 */
export async function loadAllFiles(data: ShareTargetEventData): Promise<ShareTargetEventData> {
  const resultData = {...data};
  resultData.items = await Promise.all(data.items.map(async (asset: ShareAsset) => {
    if (isFileAsset(asset)) {
      return  {
        ...asset,
        base64: await loadFile(asset),
      }
    }
    return {
      ...asset
    }
  }));
  return resultData;
}
