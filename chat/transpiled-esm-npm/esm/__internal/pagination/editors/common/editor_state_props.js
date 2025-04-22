import devices from '../../../../core/devices';
export const EditorStateDefaultProps = {
  hoverStateEnabled: true,
  activeStateEnabled: true,
  focusStateEnabled: devices.real().deviceType === 'desktop' && !devices.isSimulator()
};