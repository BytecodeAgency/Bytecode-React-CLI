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

const action = (name) => `action`;
const actionTest = (name) => `actionTest`;
const reducer = (name) => `reducer`;
const reducerTest = (name) => `reducerTest`;
const types = (name) => `import ${capitalizeFirstLetter(name)}Actions from './${name}.constants.ts';

export default interface ${capitalizeFirstLetter(name)}State {
    errors: string[] | null;
}

interface DispatchArguments<T, R> { // TODO: Improve interface, use the built-in Redux Dispatch
    type: T;
    payload?: R;
}
type Dispatch<T, R> = (argument: DispatchArguments<T, R>) => void;

export type ${capitalizeFirstLetter(name)}Dispatch = ${capitalizeFirstLetter(name)}AddError // | More types

export type ${capitalizeFirstLetter(name)}AddError = Dispatch<${capitalizeFirstLetter(name)}Actions.AddError, string>
`;

const constants = (name) => `export default enum ${capitalizeFirstLetter(name)}Actions {
    AddError = "AddError",
}`;

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
