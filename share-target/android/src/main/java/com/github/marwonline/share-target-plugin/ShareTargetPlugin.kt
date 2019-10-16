package com.staffbase.capacitor.demo

import android.content.Intent
import android.net.Uri
import android.os.Parcelable
import com.getcapacitor.NativePlugin
import com.getcapacitor.Plugin

@NativePlugin
class SharePlugin : Plugin() {


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