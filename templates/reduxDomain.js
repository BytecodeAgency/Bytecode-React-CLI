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

const action = (name) =>
    `import { DomainDispatcher as Dispatch } from './domain.types';
import DomainActions from './domain.constants';

export const domainAddError = (error: string) => (dispatch: Dispatch) => {
    return dispatch({
        type: DomainActions.AddError,
        payload: {
            error,
        }
    })
}
`
        .replace(/domain/g, name)
        .replace(/Domain/g, cap(name));

const actionTest = (name) =>
    `import { domainAddError } from './domain.actions';

describe('domainAddError', () => {
    it('should dispatch correctly', () => {
        const mockDispatch: jest.Mock = jest.fn((): void => {});
        const testError = 'this is a test error';
        domainAddError(testError)(mockDispatch)
        expect(mockDispatch.mock.calls).toHaveLength(1);
        expect(mockDispatch.mock.calls[0][0].payload.error).toEqual(testError);
    });
});
`
        .replace(/domain/g, name)
        .replace(/Domain/g, cap(name));

const reducer = (name) =>
    `import DomainActions from './domain.constants';
import DomainState, { DomainDispatches } from './domain.types'

export const initialState: DomainState = {
    errors: [],
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
    };
};

export default domainReducer;
`
        .replace(/domain/g, name)
        .replace(/Domain/g, cap(name));

const reducerTest = (name) =>
    `import domainReducer, { initialState } from './domain.reducer'
import DomainActions from './domain.constants';

describe('domainReducer', () => {
    it('should correctly handle AddError', () => {
        const newError = 'this is the new test error';
        const action = {
            type: DomainActions.AddError,
            payload: {
                error: newError,
            }
        }
        const state = domainReducer(initialState, action);
        expect(state.errors.length).toBe(1)
        expect(state.errors[0]).toEqual(newError);
    })
});
`
        .replace(/domain/g, name)
        .replace(/Domain/g, cap(name));

const types = (name) =>
    `import DomainActions from './domain.constants'

export default interface DomainState {
    errors: string[]; // TODO: Add errors to Dispatch type, as per Flux conventions
}

interface DomainDispatch<Action, Payload> {
    type: Action;
    payload: Payload;
}

type DomainAddError = DomainDispatch<DomainActions.AddError, { error: string }>

export type DomainDispatches = DomainAddError // | Add more types here
export type DomainDispatcher = (args: DomainDispatches) => void;
`
        .replace(/domain/g, name)
        .replace(/Domain/g, cap(name));

const constants = (name) =>
    `enum DomainActions {
    AddError = "AddError",
}

export default DomainActions
`
        .replace(/domain/g, name)
        .replace(/Domain/g, cap(name));

const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1);
