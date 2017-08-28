import IAction from '~/actions/IAction';
import { IRole } from '~/models';

export type SetCurrentUserAction = IAction<'SET_CURRENT_USER', { roleId: IRole | null, token: string | null }>;

export function setCurrentUser(roleId: IRole | null, token: string | null): SetCurrentUserAction {
	return { type: 'SET_CURRENT_USER', payload: { roleId, token } };
}
