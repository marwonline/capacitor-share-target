declare global {
  interface PluginRegistry {
    ShareTargetPlugin?: IShareTargetPlugin;
  }
}
/**
 * Type which events names are possible.
 */
export type ShareEventType = 'text' | 'file';

export interface IShareTargetPlugin {
  addListener: (eventName: ShareEventType, handler: (data: ShareTargetEventData) => void) => void;
}

/**
 * Container for every share event. This will hold one or more share assets.
 */
export interface ShareTargetEventData {
  items: ShareAsset[];
}

export type ShareType = 'text' | 'image' | 'video' | 'raw';

/**
 * Base object for a shared item.
 */
export interface ShareAsset {
  assetType: string;
  mimeType: string;
}

export interface TextAsset extends ShareAsset {
  assetType: 'text';
  mimeType: 'text/plain';
  text: string;
}

/**
 * TypeGuard to check if an asset is an instance of TextAsset.
 * @param asset
 */
export function isTextAsset(asset: ShareAsset): asset is TextAsset {
  return asset.assetType === 'text';
}

export interface FileAsset extends ShareAsset {
  assetType: ShareType;
  /**
   * System specific content URI. Use loadFile or loadAllFiles to get the data.
   */
  uri: string;
  /**
   * This method will hold the file data as base64 string once this event was
   * processed via loadAllFiles. This property is undefined otherwise.
   */
  base64?: string;
}

/**
 * TypeGuard to check if an asset is an instance of FileAsset.
 * @param asset
 */
export function isFileAsset(asset: ShareAsset): asset is FileAsset {
  return asset.assetType === 'image';
}



