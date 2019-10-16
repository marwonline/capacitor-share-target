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
        enum class ShareTargetEventName(val jsName: String) {
            TEXT("text"),
            IMAGE("image")
        }
    }

    // See documentation https://developer.android.com/training/sharing/receive#kotlin

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
            intent?.action == Intent.ACTION_SEND_MULTIPLE -> {

            }
        }
    }

    private fun handleSendText(intend: Intent) {
        val data = JSObject()
        data.put("items", JSArray().apply {
            put(
                    JSObject().apply {
                        put("mimeType", intend.type)
                    }
            )
        })

        notifyListeners(ShareTargetEventName.TEXT.jsName, data)
    }

    private fun handleSendImage(intent: Intent) {
        (intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as? Uri)?.let {
            // Update UI to reflect image being shared
        }
    }

    private fun handleSendMultipleImages(intent: Intent) {
        intent.getParcelableArrayListExtra<Parcelable>(Intent.EXTRA_STREAM)?.let {
            // Update UI to reflect multiple images being shared
        }
    }


}