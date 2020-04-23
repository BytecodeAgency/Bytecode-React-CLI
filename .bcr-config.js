// This file is used for development of this package.
// Do NOT copy-paste this file for use in your own projects
module.exports = {
    options: {
        NativeNoRedux: {
            path: "src/nativeNoRedux",
            template: "reactNativeNoRedux",
        },
        NativeWithRedux: {
            path: "src/nativeWithRedux",
            template: "reactNativeWithRedux",
        },
        WebNoRedux: {
            path: "src/webNoRedux",
            template: "reactWebNoRedux",
        },
        WebWithRedux: {
            path: "src/nativeWithRedux",
            template: "reactWebWithRedux",
        },
        ReduxDomain: {
            path: "src/store",
            template: "reduxDomain",
            additionalInstructions:
                "Don't forget to add your domain to the `src/store/rootReducer.ts` file and the StoreState type",
        },
    },
};
