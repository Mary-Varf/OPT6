<template>
    <td>
        <AppBurger v-if="cell.inputType === 'rowPosition'" class="td-burger">{{
            cell.value
        }}</AppBurger>

        <template v-if="cell.inputType === 'additional'">
            <AppAdditional @click="toggleDeletePopup(cell.value)" />
            <AppPopup v-if="showDeletePopup">
                <ul class="popup__ul">
                    <li class="popup__li" @click="deleteItem">Удалить</li>
                </ul>
            </AppPopup>
        </template>

        <div style="position: relative">
            <AppSelect
                v-if="cell.inputType === 'select'"
                :input-class="error ? 'input__error' : ''"
                :row-id="rowId"
                :options="options"
                :input-name="cell.inputType"
                :model-value="cell.value"
                @change-option="updateContentVal"
            />
        </div>

        <AppInput
            v-if="cell.inputType === 'text' || cell.inputType === 'number'"
            :class="{ input__error: error }"
            :type="cell.inputType"
            :value="cell.value"
            :name="cell.name"
            @update="updateContentVal"
        />

        <AppCheckbox
            v-if="cell.inputType === 'checkbox'"
            :checked="cell.value"
            :name="cell.name"
            @update-checkbox="updateCheckbox"
        />
    </td>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import AppPopup from '@/components/UI/AppPopup.vue'
import AppAdditional from '@/components/UI/AppAdditional.vue'
import AppBurger from '@/components/UI/AppBurger.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppSelect from '@/components/UI/AppSelect.vue'
import AppCheckbox from '@/components/UI/AppCheckbox.vue'

export default {
    name: 'TableCell',
    components: {
        AppCheckbox,
        AppSelect,
        AppInput,
        AppBurger,
        AppPopup,
        AppAdditional
    },
    props: {
        cell: {
            type: Object,
            required: true
        },
        rowId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            showDeletePopup: false,
            newVal: null,
            error: false
        }
    },
    computed: {
        ...mapState({
            headers: (state) => state.headers,
            options: (state) => state.options,
            content: (state) => state.content,
            isAddedNewItem: (state) => state.isAddedNewItem,
            invalidRowID: (state) => state.invalidRowID
        }),
        ...mapGetters({
            sortedHeaders: 'sortedHeaders',
            lastRowId: 'lastRowId'
        })
    },
    methods: {
        ...mapActions({
            updateContent: 'updateContent',
            postDeleteItem: 'deleteItem',
            postContent: 'postContent'
        }),
        ...mapMutations({
            setStateIsAddedNewItem: 'setStateIsAddedNewItem'
        }),
        toggleDeletePopup() {
            this.showDeletePopup = !this.showDeletePopup
        },
        setNewVal(newVal) {
            this.newVal = newVal
        },
        updateCheckbox({ checked }) {
            this.updateContentVal(checked)
        },
        setError(newState) {
            this.error = newState
        },
        updateContentVal(newVal) {
            this.setError(false)
            if (this.lastRowId !== this.rowId) {
                this.setStateIsAddedNewItem(false)
            }

            if (newVal == undefined || newVal == null || newVal == '') {
                this.setError(true)
            }

            let newContent = [...this.content].map((el) => {
                if (el.id === this.rowId) {
                    return {
                        ...el,
                        [this.cell.name]: newVal
                    }
                } else {
                    return el
                }
            })

            this.updateContent(newContent)
            this.postContent([...this.content].find((el) => el.id === this.rowId))
        },
        deleteItem() {
            let newHeaders = [...this.content]
                .filter((item) => item.id !== this.rowId)
                .map((item, index) => {
                    return {
                        ...item,
                        rowPosition: ++index
                    }
                })

            this.updateContent(newHeaders)
            this.toggleDeletePopup()
            this.postDeleteItem(this.rowId)
        }
    }
}
</script>

<style scoped>
td {
    padding: 0px 8px 0px 12px;
    align-items: center;
    vertical-align: center;
    boreder: 1px solid var(--white);
    position: relative;
    font-size: 16px;
}
.popup__li {
    text-align: start;
}
td.resize {
    border-right: 1px solid #b6b3b3;
}
.td-burger {
    margin-top: -3px;
}
.popup {
    bottom: -18px;
    transform: translateX(10px);
}
@media (max-width: 1023px) {
    td {
        padding: 0;
        margin: 0 0 10px;
    }
    .popup {
        bottom: -3px;
        transform: translate(0px, 100%);
    }
    .popup__li {
        padding: 4px 10px 8px;
    }
}
</style>
