import createStore from 'redux-zero';

const initialData = {
    userInfo: {
        name : "aaaaa"
    },
};

const store = createStore(initialData);

export default store;