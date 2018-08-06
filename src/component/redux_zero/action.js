
export default actions = store => ({
    getUser : state => {
        return state.userInfo;
    },
    setUser : (state, user) => {
        store.setState({
            userInfo : user
        });
    }
});