import { Platform } from 'react-native';
const majorVersionIOS = parseInt(String(Platform.Version), 10);
export const isAutoFillSupported = (Platform.OS === 'ios' && majorVersionIOS >= 12);
export default { isAutoFillSupported };
//# sourceMappingURL=device.js.map