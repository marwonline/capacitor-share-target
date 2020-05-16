
  Pod::Spec.new do |s|
    s.name = 'CapacitorShareTarget'
    s.version = '0.0.1'
    s.summary = 'desc'
    s.license = 'MIT'
    s.homepage = 'https://github.com/marwonline/capacitor-share-target'
    s.author = 'Martin Sommer'
    s.source = { :git => 'github.com/marwonline/capacitor-share-target', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
  end
