
export default actions = store => ({
    setUser : (state, user) => {
        store.setState({
            userInfo : user
        });
    }
});