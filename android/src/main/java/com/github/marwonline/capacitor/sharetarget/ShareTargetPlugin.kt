package com.github.marwonline.capacitor.sharetarget

import android.content.Intent
import android.net.Uri
import android.os.Parcelable
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.NativePlugin
import com.getcapacitor.Plugin

@Suppress("unused")
@NativePlugin
class ShareTargetPlugin : Plugin() {

    companion object {
        enum class ShareType(val jsName: String) {
            TEXT("text"),
            IMAGE("image")
        }
    }

    /**
     * See documentation @see {https://developer.android.com/training/sharing/receive#kotlin}
     */
    override fun handleOnNewIntent(intent: Intent?) {

        when {
            intent?.action == Intent.ACTION_SEND -> {
                // handle it xD
                if (intent.type == "text/plain") {
                    handleSendText(intent)
                } else if (intent.type?.startsWith("image/") == true) {
                    handleSendImage(intent) // Handle single image being sent
                }

            }
            intent?.action == Intent.ACTION_SEND_MULTIPLE
                    && intent.type?.startsWith("image/") == true -> {
                handleSendMultipleImages(intent) // Handle multiple images being sent
            }
        }
    }

    /**
     * @see {https://developer.android.com/guide/components/intents-common#Messaging}
     */
    private fun handleSendText(intent: Intent) {
        intent.getStringExtra(Intent.EXTRA_TEXT)?.let { text ->
            val data = JSObject()
            data.put("items", JSArray().apply {
                put(
                        JSObject().apply {
                            put("assetType", "text")
                            put("mimeType", intent.type)
                            put("text", text)
                        }
                )
            })

            notifyListeners(ShareType.TEXT.jsName, data, true)
        }
    }

    private fun handleSendImage(intent: Intent) {
        (intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as? Uri)?.let {
            // Update UI to reflect image being shared
            uri ->

            val data = JSObject()
            data.put("items", JSArray().apply {
                put(
                        JSObject().apply {
                            put("assetType", "image")
                            put("mimeType", intent.type)
                            put("uri", uri)
                        }
                )
            })

            notifyListeners(ShareType.IMAGE.jsName, data, true)
        }
    }

    private fun handleSendMultipleImages(intent: Intent) {
        intent.getParcelableArrayListExtra<Uri>(Intent.EXTRA_STREAM)?.let {
            uris ->
            // Update UI to reflect multiple images being shared
            val data = JSObject()
            data.put("items", JSArray().apply {
                uris.forEach {
                    uri ->
                    put(
                            JSObject().apply {
                                put("assetType", "image")
                                put("mimeType", intent.type)
                                put("uri", uri)
                            }
                    )
                }
            })
            notifyListeners(ShareType.IMAGE.jsName, data, true)
        }
    }
}