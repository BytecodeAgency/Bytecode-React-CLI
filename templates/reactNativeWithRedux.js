const { main, tests, types, connector } = require("./reactShared");

const reactWebWithRedux = (name) => {
    const files = {};
    files[`${name}.tsx`] = main(name);
    files[`${name}.test.tsx`] = tests(name);
    files[`${name}.types.tsx`] = types(name);
    files[`${name}.components.tsx`] = components(name);
    files[`${name}.connector.tsx`] = connector(name);
    return files;
};

module.exports = reactWebWithRedux;

const components = (name) => `import styled from 'styled-components/native';

export const ${name}Container = styled.Text\`
    margin: 10px;
\`
`;
