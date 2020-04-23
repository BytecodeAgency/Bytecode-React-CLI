const { main, tests, types } = require("./reactShared");

const reactWebNoRedux = (name) => {
    const files = {};
    files[`${name}.tsx`] = main(name);
    files[`${name}.test.tsx`] = tests(name);
    files[`${name}.types.ts`] = types(name);
    files[`${name}.styles.ts`] = styles(name);
    return files;
};

module.exports = reactWebNoRedux;

const styles = (name) => `import styled from 'styled-components';

export const ${name}Container = styled.div\`
    margin: 10px;
\`
`;
