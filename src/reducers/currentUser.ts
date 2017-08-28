import { SetCurrentUserAction } from '~/actions';
import { IRole } from '~/models';

export interface ICurrentUserState {
	roleId: IRole | null;
	token: string | null;
}

function createInitialState(): ICurrentUserState {
	const roleId = localStorage.getItem('roleId');
	if (roleId == null) {
		localStorage.removeItem('token');
	}
	const token = localStorage.getItem('token');
	return {
		roleId: roleId == null ? null : +roleId as IRole,
		token
	};
}

const initialState = createInitialState();

type HandledActions =
	SetCurrentUserAction;

export function currentUser(state = initialState, action: HandledActions) {
	switch (action.type) {
		case 'SET_CURRENT_USER': {
			const { roleId, token } = action.payload;
			if (roleId == null) {
				localStorage.removeItem('roleId');
			} else {
				localStorage.setItem('roleId', roleId.toString());
			}
			if (token == null) {
				localStorage.removeItem('token');
			} else {
				localStorage.setItem('token', token);
			}
			return { roleId, token };
		}
		default:
			return state;
	}
}
