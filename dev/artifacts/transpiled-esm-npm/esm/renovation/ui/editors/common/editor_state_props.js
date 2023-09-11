import devices from '../../../../core/devices';
export var EditorStateProps = {
  hoverStateEnabled: true,
  activeStateEnabled: true,
  get focusStateEnabled() {
    return devices.real().deviceType === 'desktop' && !devices.isSimulator();
  }
};