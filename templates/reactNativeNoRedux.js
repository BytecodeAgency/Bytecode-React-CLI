const { main, testsEnzyme, types } = require("./reactShared");

const reactWebNoRedux = (name) => {
    const files = {};
    files[`${name}.tsx`] = main(name);
    files[`${name}.test.tsx`] = testsEnzyme(name);
    files[`${name}.types.ts`] = types(name);
    files[`${name}.styles.ts`] = styles(name);
    return files;
};

module.exports = reactWebNoRedux;

const styles = (name) => `import styled from 'styled-components/native';

export const ${name}Container = styled.Text\`
    margin: 10px;
\`
`;
