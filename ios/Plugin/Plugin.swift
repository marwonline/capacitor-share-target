import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 *
 * See also https://medium.com/@ales.musto/making-a-share-extension-that-accepts-text-and-urls-in-combination-with-coredata-swift-3-a0139c0f9800
 */
@objc(ShareTarget)
public class ShareTarget: CAPPlugin {
    
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }
        
}
