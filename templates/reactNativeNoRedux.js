const { main, tests, types } = require("./reactShared");

const reactWebNoRedux = (name) => {
    const files = {};
    files[`${name}.tsx`] = main(name);
    files[`${name}.test.tsx`] = tests(name);
    files[`${name}.types.tsx`] = types(name);
    files[`${name}.styles.tsx`] = styles(name);
    return files;
};

module.exports = reactWebNoRedux;

const styles = (name) => `import styled from 'styled-components/native';

export const ${name}Container = styled.Text\`
    margin: 10px;
\`
`;
