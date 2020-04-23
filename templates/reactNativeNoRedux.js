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

const styles = (name) => `import styled from 'styled-components/native';

export const ${name}Container = styled.Text\`
    margin: 10px;
\`
`;

const tests = (name) => `import React from 'react';
import { mount } from 'enzyme';
import ${name} from './${name}';

describe('${name}', () => {
    it('should render', () => {
        const wrapper = mount(<${name} text={testText}/>);
        expect(wrapper.type()).toEqual(${name});
    });
});
`;
