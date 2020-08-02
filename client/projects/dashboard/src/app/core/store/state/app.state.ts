import { initialAuthenticationState, IAuthenticationState } from './authentication.state';
import { initialPlatformState, IPlatformState } from './platform.state';
import { initialProductItemState, IProductItemState } from './product-item.state';
import { initialStockroomState, IStockroomState } from './stockroom.state';
import { initialItemConditionState, IItemConditionState } from './item-condition.state';
import { initialCategoryState, ICategoryState } from './category.state';
import { initialPlanState, IPlanState } from './plan.state';
import { initialStockItemState, IStockItemState } from './stock-item.state';

export interface IAppState {  
  authentication: IAuthenticationState,
  stockrooms: IStockroomState,
  platforms: IPlatformState,
  itemConditions: IItemConditionState,
  categories: ICategoryState,
  plans: IPlanState,
  productItems: IProductItemState,
  stockItems: IStockItemState,
}

export const initialAppState: IAppState = {
  authentication: initialAuthenticationState,
  stockrooms: initialStockroomState,
  platforms: initialPlatformState,
  itemConditions: initialItemConditionState,
  categories: initialCategoryState,
  plans: initialPlanState,
  productItems: initialProductItemState,
  stockItems: initialStockItemState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
