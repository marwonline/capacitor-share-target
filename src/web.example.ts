import { WebPlugin } from '@capacitor/core';
import { ShareTargetPluginPlugin } from './definitions';

export class ShareTargetPluginWeb extends WebPlugin implements ShareTargetPluginPlugin {
  constructor() {
    super({
      name: 'ShareTargetPlugin',
      platforms: ['web']
    });
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return options;
  }
}

const ShareTargetPlugin = new ShareTargetPluginWeb();

export { ShareTargetPlugin };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(ShareTargetPlugin);
