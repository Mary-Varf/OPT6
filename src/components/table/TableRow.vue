<template>
    <tr class="empty"
        v-show="showTopPlaceholder || showDownPlaceholder"
    ></tr>
    <tr class="row"
        :draggable="true"
        @dragstart="onDragStart($event, rowPosition)"
        @dragenter="onDragEnter"
        @dragend="onDragEnd(rowPosition)"
        @dragover.prevent
    >
        <template v-for="cell in row"
                  :key="cell"
        >
            <td class="position-td"
                v-if="cell.name === 'rowPosition'"
            >
                <AppBurger></AppBurger>
                {{ cell.value }}
            </td>
            <td class="td-additional"
                v-if="cell.name === 'additional'"
            >
                <AppAdditional @click="toggleDeletePopup(cell.value)" />
                <AppPopup v-if="showDeletePopup">
                    <ul class="popup__ul">
                        <li class="popup__li" @click="deleteItem">Удалить</li>
                    </ul>
                </AppPopup>
            </td>
            <td v-if="cell.name === 'name'">
                <AppSelect :options="options" :model-value="row.value" />
            </td>
            <td v-if="cell.name==='price'">
                <AppInput type="number" :value="cell.value" :name="cell.name" />
            </td>
            <td v-if="cell.name==='quantity'">
                <AppInput :type="cell.inputType" :value="cell.value" :name="cell.name" />
            </td>
            <td v-if="cell.name==='itemName'">
                <AppInput :type="cell.inputType" :value="cell.value" :name="cell.name" />
            </td>
            <td v-if="cell.name==='total'">
                <AppInput :type="cell.inputType" :value="cell.value" :name="cell.name" />
            </td>
            <td v-if="cell.name==='addedDelivery'">
                <AppCheckbox type="checkbox" :value="cell.value" :name="cell.name" />
            </td>
            <td v-if="cell.name==='deliveryPrice'">
                <AppInput type="number" :value="cell.value" :name="cell.name" />
            </td>
            <td v-if="cell.name==='maxWeight'">
                <AppInput type="number" :value="cell.value" :name="cell.name" />
            </td>
        </template>
    </tr>
<!--    <tr class="empty"-->
<!--        v-show="showDownPlaceholder"-->
<!--    ></tr>-->
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
    name: 'TableRow',
    components: {
        AppCheckbox,
        AppSelect,
        AppInput,
        AppBurger,
        AppPopup,
        AppAdditional
    },
    props: {
        row: {
            type: Object,
            required: true
        },
        id: {
            type: Number,
            required: true,
        },
        showTopPlaceholder: {
            type: Boolean,
        },
        showDownPlaceholder: {
            type: Boolean,
        },
    },
    data() {
        return {
            sortedContent: [],
            showDeletePopup: false,
            rowStart: 0,
            isDragged: false,
            startCol: 0,
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
        total() {
            return this.row.price * this.row.quantity
        },
        rowPosition() {
            return this.row.find(el=>el.name=='rowPosition').value;
        },
    },
    methods: {
        ...mapActions({
            updateContent: 'updateContent',
        }),
        toggleDeletePopup() {
            this.showDeletePopup = !this.showDeletePopup
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
        onDragEnter() {
            this.$emit('onDragEnter', this.rowPosition);
        },
        onDragStart(e, position) {
            e.dataTransfer.dropEffect = 'move'
            e.dataTransfer.effectAllowed = 'move'

            this.startCol = position;
            console.log(this.startCol);
            this.$emit('onDragRow', this.startCol);
        },
        onDragEnd(newPosition) {
            this.$emit('onDropRow', newPosition);
        },
    }
}
</script>

<style scoped>
.td-additional {
    position: relative;
}

.row {
    border-bottom: 1px solid var(--border);
}
td {
    padding: 5px 10px;
    align-items: center;
    vertical-align: center;
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
.empty {
    height: 45px;
    border-radius: 5px;
    border: dashed 2px #a6b7d4;
    background-color: #fbfcfd;
}
</style>
