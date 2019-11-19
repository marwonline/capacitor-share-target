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

export interface ImageAsset extends ShareAsset {
  assetType: ShareType;
  uri: string;
}

export interface ShareTargetEventData {
  items: ShareAsset[];
}

export interface IShareTargetPlugin {
  addListener: (eventName: ShareType, handler: (data: ShareTargetEventData) => void) => void;
}
