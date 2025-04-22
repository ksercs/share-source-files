import { isClient, registerCustomComponents, renderTrialPanel } from './trial_panel.client';
export function showTrialPanel(buyNowUrl, licensingDocUrl, version, customStyles) {
  if (isClient()) {
    renderTrialPanel(buyNowUrl, licensingDocUrl, version, customStyles);
  }
}
export function registerTrialPanelComponents(customStyles) {
  if (isClient()) {
    registerCustomComponents(customStyles);
  }
}