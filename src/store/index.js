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
                .sort((a, b) => a.colPosition - b.colPosition)
                .filter(header=>header.colPosition >= 0);
        },
        sortRows(state) {
            return [...state.content].sort((a, b) => a.rowPosition - b.rowPosition);
        },
        tableWidth(state) {
            return [...state.headers]
                .filter(header=>header.colPosition >= 0)
                .reduce((acc, header) => {
                return acc + header.width
            }, 0);
        },
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
            console.log(headers)
            commit('setHeaders', headers);
        },
        updateContent({state, commit}, content) {
            console.log(content)
            commit('setContent', content);
        },
        filterByColPosition({state, commit}) {
            commit('setHeaders', 0);
        }
    },
})