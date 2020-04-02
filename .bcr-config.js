// This file is used for development of this package.
// Do NOT copy-paste this file for use in your own projects
module.exports = {
    options: {
        ComponentShared: {
            path: "src/shared/components",
            template: "reactWebNoRedux",
        },
        PageNative: {
            path: "src/native/screens",
            template: "reactNativeNoRedux",
        },
        PageWeb: { path: "src/web/pages", template: "reactWebWithRedux" },
        ReduxDomain: {
            path: "src/store",
            template: "reduxDomain",
            additionalInstructions:
                "Don't forget to add your domain to the `src/store/rootReducer.ts` file and the StoreState type",
        },
    },
};
