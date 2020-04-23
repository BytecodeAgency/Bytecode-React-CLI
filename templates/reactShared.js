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

module.exports.mainConnected = (name) => `import React from 'react';
// import { ... } from './${name}.components'; // TODO: Remove or include imports
import { ${name}Container } from './${name}.styles';
import ${name}Props from './${name}.types';
import connect${name} from './${name}.connector';

export const ${name}: React.FC<${name}Props> = ({ text }) => {
    return (
        <${name}Container>
            {text}
        </${name}Container>
    );
};

const Connected${name} = connect${name}(${name});

export default Connected${name};
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

const mapStateToProps = (state: ReduxState) => ({
    // Map state to props
});
const mapDispatchToProps = {};

const conenct${name} = <T>(Component: T) => connect(mapStateToProps, mapDispatchToProps)(${name});

export default connect${name};
`;
