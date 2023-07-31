import { createStore } from 'vuex'
import $ from 'jquery'

export default createStore({
    state: () => ({
        headers: [],
        content: [],
        options: [],
        isDesktop: true,
        isAddedNewItem: false,
        dataIsLoaded: false,
        invalidRowID: -1,
        isShownSaveNotification: false
    }),
    getters: {
        sortedHeaders(state) {
            return [...state.headers]
                .sort((a, b) => a.colPosition - b.colPosition)
                .filter((header) => header.colPosition >= 0)
        },
        sortRows(state) {
            return [...state.content].sort((a, b) => a.rowPosition - b.rowPosition)
        },
        tableWidth(state) {
            return [...state.headers]
                .filter((header) => header.colPosition >= 0)
                .reduce((acc, header) => {
                    return acc + header.width
                }, 0)
        },
        lastRowId(state) {
            return state.content.reduce((acc, el) => (acc > el.id ? acc : el.id), 0)
        },
        weight(state) {
            return state.content?.reduce((acc, el) => {
                return acc + convertToNumber(el.maxWeight)
            }, 0)
        },
        quantity(state) {
            return state.content?.reduce((acc, el) => {
                return acc + convertToNumber(el.quantity)
            }, 0)
        },
        deliveryPrice(state) {
            return state.content?.reduce((acc, el) => {
                return (
                    acc +
                    (convertToNumber(el.addedDelivery)
                        ? convertToNumber(el.deliveryPrice) * convertToNumber(el.quantity)
                        : 0)
                )
            }, 0)
        },
        totalPrice(state) {
            return (
                state.content?.reduce((acc, el) => {
                    return acc + convertToNumber(el.quantity) * convertToNumber(el.price)
                }, 0) +
                state.content?.reduce((acc, el) => {
                    return (
                        acc +
                        (convertToNumber(el.addedDelivery)
                            ? convertToNumber(el.deliveryPrice) * convertToNumber(el.quantity)
                            : 0)
                    )
                }, 0)
            )
        },
        price(state) {
            return state.content?.reduce((acc, el) => {
                return acc + convertToNumber(el.quantity) * convertToNumber(el.price)
            }, 0)
        }
    },
    mutations: {
        setHeaders(state, headers) {
            state.headers = headers
        },
        setContent(state, content) {
            state.content = content
        },
        setStateIsDesktop(state, isDesktop) {
            state.isDesktop = isDesktop
        },
        setStateIsAddedNewItem(state, isAddedNewItem) {
            state.isAddedNewItem = isAddedNewItem
        },
        setStateDataIsLoaded(state, dataIsLoaded) {
            state.dataIsLoaded = dataIsLoaded
        },
        setInvalidRowID(state, invalidRowID) {
            state.invalidRowID = invalidRowID
        },
        setStateIsShownSaveNotification(state, isShownSaveNotification) {
            state.isShownSaveNotification = isShownSaveNotification
        }
    },
    actions: {
        deleteItem({ state, commit }, id) {
            commit('setStateIsAddedNewItem', false)
            const showNotification = () => {
                commit('setStateIsShownSaveNotification', true)
                setTimeout(() => {
                    commit('setStateIsShownSaveNotification', false)
                }, 2000)
            }

            fetch('https://daily-podcast.ru/items/' + id, { method: 'DELETE' }).then(() =>
                showNotification()
            )
        },
        async postContent({ state, commit }, newItem) {
            const invalidRow = getErrorID(state.content)
            const showNotification = () => {
                commit('setStateIsShownSaveNotification', true)
                setTimeout(() => {
                    commit('setStateIsShownSaveNotification', false)
                }, 2000)
            }

            if (invalidRow == -1) {
                commit('setInvalidRowID', -1)
                commit('setStateIsAddedNewItem', false)

                showNotification()

                fetch('https://daily-podcast.ru/endpoints/postRow.php', {
                    method: 'POST',
                    body: JSON.stringify(newItem)
                    /*на бэке проверять если элемент с этим id существует, то переписываем его, если нет, создаем новую строку*/
                })
                    .then((response) => {
                        console.log(response)
                        showNotification()
                    })
                    .catch((e) => console.log(e))
            } else {
                commit('setInvalidRowID', invalidRow)
                commit('setStateIsAddedNewItem', true)
            }
        },
        async getContent({ state, commit }) {
            commit('setStateDataIsLoaded', true)

            await fetch('https://daily-podcast.ru/endpoints/content.php', {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    state.content = response
                })

            commit('setStateDataIsLoaded', false)
        },
        async getOptions({ state, commit }) {
            commit('setStateDataIsLoaded', true)

            await fetch('https://daily-podcast.ru/endpoints/options.php', {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    state.options = response
                })

            commit('setStateDataIsLoaded', false)
        },
        async getHeaders({ state, commit }) {
            commit('setStateDataIsLoaded', true)

            await fetch('https://daily-podcast.ru/endpoints/headers.php', {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    state.headers = response
                })

            commit('setStateDataIsLoaded', false)
        },
        updateHeaders({ commit }, headers) {
            commit('setHeaders', headers)
        },
        updateContent({ commit }, content) {
            commit('setContent', content)
        },
        filterByColPosition({ commit }) {
            commit('setHeaders', 0)
        },
        addEmptyRow({ state, commit }, id) {
            commit('setContent', [
                ...state.content,
                {
                    id,
                    rowPosition: ++state.content.length,
                    name: null,
                    price: 0,
                    quantity: 0,
                    itemName: null,
                    total: 0,
                    additional: true,
                    addedDelivery: true,
                    deliveryPrice: 0,
                    maxWeight: 0
                }
            ])
        }
    }
})

const getErrorID = (content) => {
    let rowIdWithError = -1

    content.map((el) => {
        Object.values(el).map((val) => {
            rowIdWithError =
                val == null || val == undefined || (val == '' && val != 0) ? el.id : rowIdWithError
        })
    })

    return rowIdWithError
}

const convertToNumber = (str) => {
    return ++str ?? 0
}
