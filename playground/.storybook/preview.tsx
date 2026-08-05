import { applyStaleGeneratedIconsRedirect } from '../../storybook/generatedIconsRedirect';
import '../../config/css-variables/tokens.css';
import '../../config/css-variables/industrial-surfaces.css';
import '../../blocks/_shared/marquee-keyframes.css';
import '../../storybook/engine-styles';
import '../src/index.css';
import { createPreview } from '../../storybook/createPreview';

applyStaleGeneratedIconsRedirect();

const preview = createPreview();
export default preview;
