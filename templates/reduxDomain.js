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
import ${cap(name)}Actions from './${name}.constants.ts';

const ${name}AddError = (error: string) => (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: ${cap(name)}Actions.AddError,
        payload: {
            error,
        }
    })
}
`;
const actionTest = (name) => `actionTest`;
const reducer = (name) => `import ${cap(name)}Actions from './${name}.constants.ts';
import ${cap(name)}State, { ${cap(name)}Actions } from './${name}.types.ts'

const initialState: ${cap(name)}State {
    errors: null,
}

const ${name}Reducer = (state: ${cap(name)}State = initialState, action: ${cap(name)}Actions) => {
    switch (action.type) {
        case ${cap(name)}Actions.AddError:
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
`;
const reducerTest = (name) => `reducerTest`;
const types = (name) => `import ${cap(name)}Actions from './${name}.constants.ts'

export default interface ${cap(name)}State {
    errors: string[] | null; // TODO: Add errors to Dispatch type, as per Flux conventions
}

interface ${cap(name)}Dispatch<Action, PayloadType> {
    type: ActionType;
    payload: PayloadType;
}

type ${cap(name)}AddError = ${cap(name)}Dispatch<${cap(name)}Actions.AddError, { error: string }>

export type ${cap(name)}Dispatch = ${cap(name)}AddError | // Add more types here
`;

const constants = (name) => `export default enum ${cap(name)}Actions {
    AddError = "AddError",
}`;

const cap = (string) => string.charAt(0).toUpperCase() + string.slice(1);
