//
//  ShareViewController.swift
//  TextShare
//
//  Created by Martin Sommer on 16.05.20.
//  Copyright © 2020 Max Lynch. All rights reserved.
//

import UIKit
import Social
import MobileCoreServices


/**
 * This share extensions is a small app which handles share attempts to the capacitor app.
 *
 * Inpired by http://www.deegeu.com/ios-share-extension-with-swift/
 */
class ShareViewController: SLComposeServiceViewController {
    // Add this "App Group" to your capacitor app in order to connect the sand boxes and make sharing happening.
    let appGroupName = "group.com.github.marwonline.capacitor.share.target"
    
    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return true
    }

    override func didSelectPost() {
        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
    
        // Make sure we have a valid extension item
        if let content = extensionContext!.inputItems[0] as? NSExtensionItem {
            let contentType = kUTTypeImage as String
             
            // Verify the provider is valid
            if let contents = content.attachments {
                // look for images
                for attachment in contents {
                    if attachment.hasItemConformingToTypeIdentifier(contentType) {
                        attachment.loadItem(forTypeIdentifier: contentType, options: nil) { data, error in
                            let url = data as! NSURL
                            if let imageData = NSData(contentsOf: url as URL) {
                                // Save the image
                                // TODO: Save to a file
                                self.saveImage(imageData: imageData, contentType: contentType)
                            }
                        }
                    }
                }
            }
        }
        
        // Inform the host that we're done, so it un-blocks its UI. Note: Alternatively you could call super's -didSelectPost, which will similarly complete the extension context.
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
                
    }

    override func configurationItems() -> [Any]! {
        // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
        return []
    }
    
    func saveImage(imageData: NSData, contentType: String) {
        if let prefs = UserDefaults(suiteName: appGroupName) {
            prefs.removeObject(forKey: "image")
            prefs.set(imageData, forKey: "image")
            prefs.set(contentType, forKey: "mimeType")
        }
    }

}
