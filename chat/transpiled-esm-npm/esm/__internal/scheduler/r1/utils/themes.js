import { current, isCompact, isFluent, isMaterial, isMaterialBased } from '../../../../ui/themes';
export const getThemeType = () => {
  const theme = current();
  return {
    isCompact: isCompact(theme),
    isMaterial: isMaterial(theme),
    isFluent: isFluent(theme),
    isMaterialBased: isMaterialBased(theme)
  };
};