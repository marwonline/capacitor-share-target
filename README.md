# Capacitor Share Target Plugin
[Ionic Capacitor](https://capacitor.ionicframework.com/) plugin to make your app a native share target

**ATTENTION:**
This project does not deliver a ready to use solution, yet. 
Feel free to contribute.

## Installation 

`yarn add @marwonline/capacitor-share-target`

### Android

#### Adjust your Activity
To use the plugin on Android, you must register it in `MainActivity.java`.
```java
// Other imports...

import com.github.marwonline.capacitor.sharetarget.ShareTargetPlugin;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      add(ShareTargetPlugin.class);
    }});
  }
}
```
And also register the Intents you want to listen in your `app/src/main/AndroidManifest.xml`:
(Copied from https://developer.android.com/training/sharing/receive#kotlin)
```xml
<manifest >
    <application>
        <!-- add this here -->
        <activity android:name=".ui.MyActivity" >
            <!-- for text and URI sharing -->
            <intent-filter>
                <action android:name="android.intent.action.SEND" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="text/plain" />
            </intent-filter>
            <!-- for image sharing -->
            <intent-filter>
                <action android:name="android.intent.action.SEND" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="image/*" />
            </intent-filter>
            <!-- multiple image sharing -->
            <intent-filter>
                <action android:name="android.intent.action.SEND_MULTIPLE" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="image/*" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

#### Adjust your app code

Add the following snippet near your app initialization logic. The Capacitor core will make sure that 
all intents are processed, even if your event handler is registered later.

```typescript
import {Plugins} from '@capacitor/core';
import {IShareTargetPlugin, ShareTargetEventData} from "@marwonline/capacitor-share-target/src"; 
const ShareTargetPlugin = Plugins.ShareTargetPlugin as IShareTargetPlugin;

if (ShareTargetPlugin) {
  ShareTargetPlugin.addListener(
    'text',
    (data: ShareTargetEventData) => {
      alert(JSON.stringify(data));
    }
  );
  ShareTargetPlugin.addListener(
    'image',
    (data: ShareTargetEventData) => {
      alert(JSON.stringify(data));
    }
  );
}
```

## Development

### Build the demo app

You can find a demo app called "DevNull" in github repository https://github.com/marwonline/capacitor-share-target-example. 
It's a normal Capacitor app and you can build it with the provided npm/yarn scripts:

```bash
cd capacitor-share-target-example
yarn install
npx cap update android
yarn build_and_install_android
```

It's also possible to link the repository for local development. With the following
commands the local source will be used for this plugin instead of the repository source code.

```bash
cd capacitor-share-target
yarn link
cd capacitor-share-target-example
yarn link @marwonline/capacitor-share-target
``` 

To remove the link use the following script:
```bash
cd capacitor-share-target-example && yarn unlink @marwonline/capacitor-share-target && yarn install --force
```

### References

[How to trigger custom intents on Android](https://developer.android.com/guide/components/intents-common#AdbIntents)