export const configurableExecutableBuilder = (initialState, retryConfig, mutators = {}, executor) => {
    const build = (state, config) => {
        const wrapper = {};

        for (const [name, handler] of Object.entries(mutators)) {
            wrapper[name] = (...args) => {
                const [newState, newConfig] = handler(state, config, ...args);
                return build(newState, newConfig);
            };
        }

        wrapper.run = () => executor(state, config);

        return wrapper;
    };

    return build(initialState, retryConfig);
};