const { main, tests, types, connector } = require("./reactShared");

const reactNoRedux = (name) => {
    const files = {};
    files[`${name}.tsx`] = main(name);
    files[`${name}.test.tsx`] = tests(name);
    files[`${name}.types.tsx`] = types(name);
    files[`${name}.components.tsx`] = components(name);
    files[`${name}.connector.tsx`] = connector(name);
    return files;
};

module.exports = reactNoRedux;

const components = (name) => `import styled from 'styled-components';

export const ${name}Container = styled.div\`
    margin: 10px;
\`
`;
