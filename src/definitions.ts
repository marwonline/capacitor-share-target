declare global {
  interface PluginRegistry {
    ShareTargetPlugin?: IShareTargetPlugin;
  }
}

export type ShareTargetEventName = 'text' | 'image';

export interface ShareAsset {
  assetType: string;
  mimeType: string;
}

export interface TextAsset extends ShareAsset {
  assetType: 'text';
  text: string;
}

export interface ImageAsset extends ShareAsset {
  assetType: 'image';
}


export interface ShareTargetEventData {
  items: ShareAsset[];
}

export interface IShareTargetPlugin {
  addListener: (eventName: ShareTargetEventName, handler: (data: ShareTargetEventData) => void) => void;
}
