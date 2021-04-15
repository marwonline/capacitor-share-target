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
            FILE("file")
        }
    }

    /**
     * See documentation @see {https://developer.android.com/training/sharing/receive#kotlin}
     */
    override fun handleOnNewIntent(intent: Intent?) {
        when {
            intent?.action == Intent.ACTION_SEND -> {
                handleSendItem(intent)
            }
            intent?.action == Intent.ACTION_SEND_MULTIPLE -> {
                handleSendMultipleItems(intent) // Handle multiple images being sent
            }
        }
    }

    private fun getMimeType(uri: Uri): String? {
        val cr = context.contentResolver
        return cr.getType(uri)
    }

    private fun getJSObject(uri: Uri): JSObject {
        val mimeType = getMimeType(uri)
        val data = JSObject()

        data.put("mimeType", mimeType)
        data.put("uri", uri)

        when {
            mimeType?.toString()?.startsWith("image/") == true -> {
                data.put("assetType", "image")
            }
            mimeType?.toString()?.startsWith("video/") == true -> {
                data.put("assetType", "video")
            }
            else -> {
                data.put("assetType", "raw")
            }
        }

        return data
    }

    private fun getJSObject(text: String): JSObject {
        return JSObject().apply{
            put("mimeType", "text/plain")
            put("assetType", "text")
            put("text", text)
        }
    }

    /**
     * @see {https://developer.android.com/guide/components/intents-common#Messaging}
     */
    private fun handleSendItem(intent: Intent)  {
        val data = JSObject()

        if (intent.type == "text/plain") {
            intent.getStringExtra(Intent.EXTRA_TEXT)?.let { text ->

                data.put("items", JSArray().apply {
                    put(getJSObject(text))
                })

                notifyListeners(ShareType.TEXT.jsName, data, true)
            }
        } else {
            (intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as? Uri)?.let {
                uri ->

                data.put("items", JSArray().apply {
                    put(getJSObject(uri))
                })

                notifyListeners(ShareType.FILE.jsName, data, true)
            }
        }
    }

    private fun handleSendMultipleItems(intent: Intent) {
        intent.getParcelableArrayListExtra<Uri>(Intent.EXTRA_STREAM)?.let {
            uris ->

            val data = JSObject()
            data.put("items", JSArray().apply {
                uris.forEach {
                    uri ->
                    put(getJSObject(uri))
                }
            })

            notifyListeners(ShareType.FILE.jsName, data, true)
        }
    }
}
