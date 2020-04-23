const { main, components, types } = require("./reactShared");

const reactWebNoRedux = (name) => {
    const files = {};
    files[`${name}.tsx`] = main(name);
    files[`${name}.test.tsx`] = tests(name);
    files[`${name}.types.ts`] = types(name);
    files[`${name}.components.tsx`] = components(name);
    files[`${name}.styles.ts`] = styles(name);
    return files;
};

module.exports = reactWebNoRedux;

const styles = (name) => `import styled from 'styled-components';

export const ${name}Container = styled.div\`
    margin: 10px;
\`
`;
const tests = (name) => `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${name} from './${name}';

describe('${name}', () => {
    it('should render', async () => {
        const testText = 'testText';
        render(<${name} text={testText}/>);
        expect(await screen.findByText(testText)).toBeDefined();
    });
});
`
