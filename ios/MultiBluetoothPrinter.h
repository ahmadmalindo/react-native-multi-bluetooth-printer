
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNMultiBluetoothPrinterSpec.h"

@interface MultiBluetoothPrinter : NSObject <NativeMultiBluetoothPrinterSpec>
#else
#import <React/RCTBridgeModule.h>

@interface MultiBluetoothPrinter : NSObject <RCTBridgeModule>
#endif

@end
