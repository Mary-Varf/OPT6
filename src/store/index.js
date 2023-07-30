import { createStore } from 'vuex'
import Data from '@/data'
import $ from 'jquery'

export default createStore({
    state: () => ({
        headers: Data.headers,
        content: Data.content,
        options: Data.options,
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
        async postContent({ state, commit }) {
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
                await $.ajax({
                    url: 'ajax/json.php',
                    method: 'get',
                    dataType: 'json',
                    data: state.content,
                    success: function (data) {
                        showNotification()
                        alert(data.text) /* выведет "Текст" */
                        alert(data.error) /* выведет "Ошибка" */
                    }
                })
            } else {
                commit('setInvalidRowID', invalidRow)
                commit('setStateIsAddedNewItem', true)
            }
        },
        async getContent({ state, commit }) {
            await $.getJSON('ajax/content.json', (data) => {
                let content = []
                $.each(data, function (key, val) {
                    content.push(val)
                })
                state.content = content
            })

            commit('setStateDataIsLoaded', false)
        },
        async getOptions({ state, commit }) {
            await $.getJSON('ajax/options.json', (data) => {
                let options = []
                $.each(data, function (key, val) {
                    options.push(val)
                })
                state.options = options
            })

            commit('setStateDataIsLoaded', false)
        },
        async getHeaders({ state, commit }) {
            await $.getJSON('ajax/headers.json', (data) => {
                let headers = []
                $.each(data, function (key, val) {
                    headers.push(val)
                })
                state.headers = headers
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
