declare global {
  interface PluginRegistry {
    ShareTargetPlugin?: IShareTargetPlugin;
  }
}

export type ShareType = 'text' | 'image';

export interface ShareAsset {
  assetType: string;
  mimeType: string;
}

export interface TextAsset extends ShareAsset {
  assetType: ShareType
  text: string;
}

export function isTextAsset(asset: ShareAsset): asset is TextAsset {
  return asset.assetType === 'text';
}

export interface ImageAsset extends ShareAsset {
  assetType: ShareType;
  uri: string;
  base64?: string;
}

export function isImageAsset(asset: ShareAsset): asset is ImageAsset {
  return asset.assetType === 'image';
}

export interface ShareTargetEventData {
  items: ShareAsset[];
}

export interface IShareTargetPlugin {
  addListener: (eventName: ShareType, handler: (data: ShareTargetEventData) => void) => void;
}
