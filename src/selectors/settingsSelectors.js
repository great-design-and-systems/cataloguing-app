import { ItemType } from '../api/item/';
export function fundsForDropdown(settings) {
  const funds = settings.funds.map(fund => { return { label: fund, value: fund }; });
  funds.unshift({ label: '-- select --', value: '' });
  return funds;
}

export function currenciesForDropdown(settings) {
  const currencies = settings.currencies.map(cur => { return { label: cur, value: cur }; });
  currencies.unshift({ label: '-- select --', value: '' });
  return currencies;
}

export function resourceTypesForDropdown(settings) {
  const resourceTypes = settings.resourceTypes.map(resourceType => { return { label: resourceType, value: resourceType }; });
  resourceTypes.unshift({ label: '-- select --', value: '' });
  return resourceTypes;
}

export function resourceTypesDefaultsForDropdown() {
  const resourceTypes = Object.keys(ItemType).map(field => Object.assign({}, { value: ItemType[field], label: field }));
  resourceTypes.unshift({ label: '-- select --', value: '' });
  return resourceTypes;
}
