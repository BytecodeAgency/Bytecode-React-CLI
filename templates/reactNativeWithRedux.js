const {
    mainConnected,
    testsEnzyme,
    components,
    types,
    connector,
} = require("./reactShared");

const reactWebWithRedux = (name) => {
    const files = {};
    files[`${name}.tsx`] = mainConnected(name);
    files[`${name}.test.tsx`] = testsEnzyme(name);
    files[`${name}.types.ts`] = types(name);
    files[`${name}.styles.ts`] = styles(name);
    files[`${name}.components.tsx`] = components(name);
    files[`${name}.connector.ts`] = connector(name);
    return files;
};

module.exports = reactWebWithRedux;

const styles = (name) => `import styled from 'styled-components/native';

export const ${name}Container = styled.Text\`
    margin: 10px;
\`
`;
