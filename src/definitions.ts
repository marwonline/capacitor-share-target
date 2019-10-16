declare global {
  interface PluginRegistry {
    ShareTargetPlugin?: IShareTargetPlugin;
  }
}

export type ShareTargetEventName = 'text' | 'image';

export interface ShareAsset {
  mimeType: string;
}

export interface ShareTargetEventData {
  items: ShareAsset[];
}

export interface IShareTargetPlugin {
  addListener: (eventName: ShareTargetEventName, handler: (data: ShareTargetEventData) => void ) => void;
}
