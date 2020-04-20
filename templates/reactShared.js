module.exports.main = (name) => `import React from 'react';
// import { ... } from './${name}.components'; // TODO: Remove or include imports
import { ${name}Container } from './${name}.styles';
import ${name}Props from './${name}.types';

const ${name}: React.FC<${name}Props> = ({ text }) => {
    return (
        <${name}Container>
            {text}
        </${name}Container>
    );
};

export default ${name};
`;

module.exports.tests = (name) => `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${name} from './${name}';

describe('${name}', () => {
    it('should render', () => {
        const testText = 'testText';
        render(<${name} text="test"/>);
        expect(screen.findByText(testText)).toBeDefined();
    });
});
`;

module.exports.testsEnzyme = (name) => `import React from 'react';
import { mount } from 'enzyme';
import ${name} from './${name}';

describe('${name}', () => {
    it('should render', () => {
        const wrapper = mount(<${name} text="test"/>);
        expect(wrapper.type()).toEqual(${name});
    });
});
`;

module.exports.components = (name) => `import React from 'react';

// Use this file to compose Styled Components so that
// your main .tsx file can focus on just the logic.
// See this as your local containers for just ${name}
// to avoid cluttering components and containers everywhere.

`;

module.exports.types = (name) => `export default interface ${name}Props {
    text: string
}
`;

module.exports.connector = (name) => `import { connect } from 'react-redux';
import ${name} from './${name}';

const mapStateToProps = (state: ReduxState) => ({
    // Map state to props
});
const mapDispatchToProps = {};
const Connected${name} = connect(mapStateToProps, mapDispatchToProps)(${name});

export default Connected${name};
`;
