// @ts-expect-error
import { editorFactoryModule } from '../../../../ui/grid_core/ui.grid_core.editor_factory';
import gridCore from '../module_core';
gridCore.registerModule('editorFactory', editorFactoryModule);