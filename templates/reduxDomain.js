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
const types = (name) => `types`;
const constants = (name) => `constants`;
