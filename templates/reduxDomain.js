const reduxDomain = (name) => {
    const files = {};
    files[`${name}.actions.ts`] = action(name);
    files[`${name}.actions.test.ts`] = actionTest(name);
    files[`${name}.reducer.ts`] = reducer(name);
    files[`${name}.reducer.test.ts`] = reducerTest(name);
    files[`${name}.types.ts`] = types(name);
    files[`${name}.constants.ts`] = constants(name);
    return files;
};

module.exports = reduxDomain;

const action = (name) => `import { Dispatch } from 'react-redux;
import DomainActions from './domain.constants';

const domainAddError = (error: string) => (dispatch: Dispatch) => {
    return dispatch({
        type: DomainActions.AddError,
        payload: {
            error,
        }
    })
}
`.replace(/domain/g, name).replace(/Domain/g, cap(name));

const actionTest = (name) => `actionTest
`.replace(/domain/g, name).replace(/Domain/g, cap(name));

const reducer = (name) => `import DomainActions from './domain.constants';
import DomainState, { DomainDispatches } from './domain.types'

const initialState: DomainState = {
    errors: null,
}

const domainReducer = (state: DomainState = initialState, action: DomainDispatches) => {
    switch (action.type) {
        case DomainActions.AddError:
            return {
                ...state,
                errors: [
                    ...state.errors,
                    action.payload.error,
                ],
            };
        default:
            return state;
    }
}
`.replace(/domain/g, name).replace(/Domain/g, cap(name));

const reducerTest = (name) => `reducerTest
`.replace(/domain/g, name).replace(/Domain/g, cap(name));

const types = (name) => `import DomainActions from './domain.constants'

export default interface DomainState {
    errors: string[] | null; // TODO: Add errors to Dispatch type, as per Flux conventions
}

interface DomainDispatch<Action, PayloadType> {
    type: ActionType;
    payload: PayloadType;
}

type DomainAddError = DomainDispatch<DomainActions.AddError, { error: string }>

export type DomainDispatches = DomainAddError // | Add more types here
`.replace(/domain/g, name).replace(/Domain/g, cap(name));

const constants = (name) => `enum DomainActions {
    AddError = "AddError",
}

export default DomainActions
`.replace(/domain/g, name).replace(/Domain/g, cap(name));

const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1);
