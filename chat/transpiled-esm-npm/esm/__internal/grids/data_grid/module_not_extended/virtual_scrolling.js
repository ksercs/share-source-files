import { dataSourceAdapterExtender, virtualScrollingModule } from '../../../grids/grid_core/virtual_scrolling/m_virtual_scrolling';
import gridCore from '../m_core';
import dataSourceAdapterProvider from '../m_data_source_adapter';
gridCore.registerModule('virtualScrolling', virtualScrollingModule);
dataSourceAdapterProvider.extend(dataSourceAdapterExtender);