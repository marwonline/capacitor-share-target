# Capacitor Share Target Plugin
[Capacitor](https://capacitor.ionicframework.com/) plugin to make your app a native share target

**ATTENTION:**
This project does not deliver a ready to use solution, yet. 
Feel free to contribute.

## Installation 

`yarn add @marwonline/capacitor-share-target`

### Android

To use the plugin on Android, you must register it in `MainActivity.java`.
```java
// Other imports...
import com.webviewOverlay.plugin.WebviewOverlayPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initializes the Bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            // Additional plugins you've installed go here
            add(SharePlugin.class);
        }});
    }
}
```
And also register the Intents you want to listen in your `AndroidManifest.xml`:
(Copied from https://developer.android.com/training/sharing/receive#kotlin)
```xml
<activity android:name=".ui.MyActivity" >
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="image/*" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.SEND_MULTIPLE" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="image/*" />
    </intent-filter>
</activity>
```