import Foundation
import Capacitor
import UIKit


/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitor.ionicframework.com/docs/plugins/ios
 *
 * See also https://medium.com/@ales.musto/making-a-share-extension-that-accepts-text-and-urls-in-combination-with-coredata-swift-3-a0139c0f9800
 */
@objc(ShareTarget)
public class ShareTarget: CAPPlugin {
    
    let appGroupName = "group.com.getcapacitor.Plugin"

    override public func load() {
        super.load()
        NotificationCenter.default.addObserver(
            forName: UIApplication.didBecomeActiveNotification,
            object: nil,
            queue: nil
        ) { _ in
            self.onViewWillAppear()
        }
    }
    
    public func onViewWillAppear() {
        let savedData = UserDefaults.init(suiteName: appGroupName)
        if savedData?.value(forKey: "image") != nil {
            if let url = savedData?.value(forKey: "image") as? String {
             
                let data: NSMutableDictionary! = NSMutableDictionary()
                data.setValue("image", forKey: "assetType")
                data.setValue("sa", forKey: "mimeType")
                data.setValue(url, forKey: "uri")
                self.notifyListeners(
                    "image",
                    data: data as? [String : Any],
                    retainUntilConsumed: true
                )
            }
        }
    }
        
}
