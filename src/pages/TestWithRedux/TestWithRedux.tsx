import React from 'React';
import { connect } from 'react-redux';
import { TestWithReduxContainer } from './TestWithRedux.components';
import TestWithReduxProps from './import TestWithRedux.types';

export const TestWithRedux: React.FC<TestWithReduxProps> = ({ text }) => {
	return (
		<TestWithReduxContainer>
			{text}
		</TestWithReduxContainer>
	);
};

const mapStateToProps = (state: ReduxState) => ({ // TODO: Add the ReduxState type
	name: state.name,
});
const mapDispatchToProps = {};
const ConnectedTestWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TestWithRedux);

export default ConnectedTestWithRedux;
