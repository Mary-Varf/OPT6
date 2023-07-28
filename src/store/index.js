import {createStore} from 'vuex';
import Data from "@/data";

export default createStore({
    state: () => ({
        headers: Data.headers,
        content: Data.content,
        options: Data.options,
    }),
    getters: {
        sortedHeaders(state) {
            return [...state.headers]
                .filter(header=>header.colPosition >= 0)
                .sort((a, b) =>a.colPosition - b.colPosition);
        },
        sortRows(state) {
            return [...state.content].sort((a, b) => a.rowPosition - b.rowPosition);
        }
    },
    mutations: {
        setHeaders(state, headers) {
            state.headers = headers;
        },
        setContent(state, content) {
            state.content = content;
        },
    },
    actions: {
        updateHeaders({state, commit}, headers) {
            commit('setHeaders', headers);
        },
        updateContent({state, commit}, content) {
            commit('setContent', content);
        },
        filterByColPosition({state, commit}) {
            commit('setHeaders', 0);
        }
    },
})