module.exports.main = (name) => `import React from 'react';
import { ${name}Container } from './${name}.components';
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

// TODO: Use react-testing-library
module.exports.tests = (name) => `import React from 'react';
import { mount } from 'enzyme';
import ${name} from './${name}';

describe('${name}', () => {
    it('should render', () => {
        const wrapper = mount(<${name} text="test"/>);
        expect(wrapper.type()).toEqual(${name});
    });
});
`;

module.exports.types = (name) => `export default interface ${name}Props {
    text: string
}
`;

module.exports.connector = (name) => `import { connect } from 'react-redux';
import ${name} from '${name}';

const mapStateToProps = (state: ReduxState) => ({
    // Map state to props
});
const mapDispatchToProps = {};
const Connected${name} = connect(mapStateToProps, mapDispatchToProps)(${name});

export default Connected${name};
`;
