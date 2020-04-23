const {
    mainConnected,
    components,
    types,
    connector,
} = require("./reactShared");

const reactWebWithRedux = (name) => {
    const files = {};
    files[`${name}.tsx`] = mainConnected(name);
    files[`${name}.test.tsx`] = tests(name);
    files[`${name}.types.ts`] = types(name);
    files[`${name}.styles.ts`] = styles(name);
    files[`${name}.components.tsx`] = components(name);
    files[`${name}.connector.ts`] = connector(name);
    return files;
};

module.exports = reactWebWithRedux;

const styles = (name) => `import styled from 'styled-components';

export const ${name}Container = styled.div\`
    margin: 10px;
\`
`;

const tests = (name) => `import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
    it('should render', () => {
        const testText = 'testText';
        render(<${name} text={testText}/>);
        expect(screen.findByText(testText)).toBeDefined();
    });
});
`;
