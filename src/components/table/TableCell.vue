<template>
    <td>
        <AppBurger v-if="cell.inputType === 'rowPosition'">{{ cell.value }}</AppBurger>

        <template v-if="cell.inputType === 'additional'">
            <AppAdditional @click="toggleDeletePopup(cell.value)" />
            <AppPopup v-if="showDeletePopup">
                <ul class="popup__ul">
                    <li class="popup__li" @click="deleteItem">Удалить</li>
                </ul>
            </AppPopup>
        </template>
        
        <div style="position:relative;">
            <AppSelect v-if="cell.inputType === 'select'"
                       :options="options"
                       :model-value="cell.value"
                       @change-option="updateContentVal"
            />
        </div>

        <AppInput v-if="cell.inputType === 'text' || cell.inputType === 'number'"
                  :type="cell.inputType"
                  :value="cell.value"
                  :name="cell.name"
                  @update="setNewVal"
                  @blur="updateContentVal(newVal)"
        />

        <AppCheckbox v-if="cell.inputType === 'checkbox'"
                     :checked="cell.value"
                     :name="cell.name"
                     @update-checkbox="updateCheckbox"
        />
    </td>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import AppPopup from '@/components/UI/AppPopup.vue'
import AppAdditional from '@/components/UI/AppAdditional.vue'
import AppBurger from '@/components/UI/AppBurger.vue'
import AppInput from '@/components/UI/AppInput.vue'
import AppSelect from '@/components/UI/AppSelect.vue'
import AppCheckbox from "@/components/UI/AppCheckbox.vue";

export default {
    name: 'TableCell',
    components: {
        AppCheckbox,
        AppSelect,
        AppInput,
        AppBurger,
        AppPopup,
        AppAdditional,
    },
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            showDeletePopup: false,
            newVal: null,
        }
    },
    computed: {
        ...mapState({
            headers: state=>state.headers,
            options: state=>state.options,
            content: state=>state.content,
        }),
        ...mapGetters({
            sortedHeaders: 'sortedHeaders',
        }),
    },
    methods: {
        ...mapActions({
            updateContent: 'updateContent',
        }),
        toggleDeletePopup() {
            this.showDeletePopup = !this.showDeletePopup
        },
        setNewVal(newVal) {
            this.newVal = newVal;
        },
        updateCheckbox({id, checked}) {
            console.log(checked)
            this.updateContentVal(checked);
        },
        updateContentVal(newVal) {
            let newContent = [...this.content].map(el => {
                if (el.id === this.id) {
                    return {
                        ...el,
                        [this.cell.name]: newVal,
                    }
                } else {
                    return el;
                }
            })

            this.updateContent(newContent)
        },
        deleteItem() {
            let newHeaders = [...this.content]
                .filter(item=>item.id!==this.id)
                .map((item, index) => {
                    return {
                        ...item,
                        rowPosition: ++index,
                    }
                })

            this.updateContent(newHeaders);
            this.toggleDeletePopup();
        },
    },
}
</script>

<style scoped>

.td-additional {
    position: relative;
}

td {
    padding: 1px 10px 1px 12px;
    align-items: center;
    vertical-align: center;
    boreder: 1px solid var(--white);
    position: relative;
}
.position-td {
    display: flex;
    height: 100%;
    align-self: center;
    justify-self: center;
    flex-wrap: nowrap;
    align-items: center;
    gap: 5px;
    position: relative;
    vertical-align: center;
    padding-top: 15px;
    cursor: pointer;
}
.popup__li {
    text-align: start;
}
td.resize {
    border-right: 1px solid #b6b3b3;
}

@media(max-width: 1025px) {
    td {
        padding: 0;
        margin: 0 0 15px;
    }
    .popup {
        bottom: -5px;
    }
}
</style>