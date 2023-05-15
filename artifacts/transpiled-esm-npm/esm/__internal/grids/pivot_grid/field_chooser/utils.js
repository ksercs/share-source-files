import { SORT_ORDER } from './const';
export var reverseSortOrder = sortOrder => sortOrder === SORT_ORDER.descending ? SORT_ORDER.ascending : SORT_ORDER.descending;