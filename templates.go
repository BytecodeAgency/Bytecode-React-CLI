package main

const templateMainFileNoRedux = `import React from 'React';
import { {{.ComponentName}}Container } from './{{.ComponentName}}.components';
import {{.ComponentName}}Props from './{{.ComponentName}}.types';

const {{.ComponentName}}: React.FC<{{.ComponentName}}Props> = ({ text }) => {
	return (
		<{{.ComponentName}}Container>
			{text}
		</{{.ComponentName}}Container>
	);
};

export default {{.ComponentName}};
`

const templateMainFileWithRedux = `import React from 'React';
import { connect } from 'react-redux';
import { {{.ComponentName}}Container } from './{{.ComponentName}}.components';
import {{.ComponentName}}Props from './{{.ComponentName}}.types';

export const {{.ComponentName}}: React.FC<{{.ComponentName}}Props> = ({ text }) => {
	return (
		<{{.ComponentName}}Container>
			{text}
		</{{.ComponentName}}Container>
	);
};

const mapStateToProps = (state: ReduxState) => ({ // TODO: Add the ReduxState type
	name: state.name,
});
const mapDispatchToProps = {};
const Connected{{.ComponentName}} = connect(
	mapStateToProps,
	mapDispatchToProps,
)({{.ComponentName}});

export default Connected{{.ComponentName}};
`

const templateTestFileNoRedux = `import React from 'react';
import { mount } from 'enzyme';
import {{.ComponentName}} from './{{.ComponentName}}';

describe('{{.ComponentName}}', () => {
	it('should render', () => {
		const wrapper = mount(<{{.ComponentName}} text="test"/>);
		expect(wrapper.type()).toEqual({{.ComponentName}});
	});
});
`

const templateTestFileWithRedux = `import React from 'react';
import { mount } from 'enzyme';
import { {{.ComponentName}} } from './{{.ComponentName}}';

describe('{{.ComponentName}} without Redux', () => {
	it('should render', () => {
		const wrapper = mount(<{{.ComponentName}} text="test"/>);
		expect(wrapper.type()).toEqual({{.ComponentName}});
	});
});
`

const templateTypesFile = `interface {{.ComponentName}}Props {
	text: string
}

export default {{.ComponentName}}Props;
`

const templateComponentsFile = `import styled from 'styled-components';

export const {{.ComponentName}}Container = styled.div` + "`" + `
	margin: 10px;
` + "`;\n"
