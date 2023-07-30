<template>
    <tr v-show="showTopPlaceholder">
        <td :colspan="row.length"><div class="empty"></div></td>
    </tr>

    <tr
        class="row"
        :class="{'row__error': this.id === this.invalidRowID}"
        :draggable="true"
        @dragstart="onDragStart($event, rowPosition)"
        @dragenter="onDragEnter"
        @dragend="onDragEnd(rowPosition)"
        @dragover.prevent
    >
        <template v-for="cell in row" :key="cell.name">
            <TableCell :row-id="id" :cell="cell" />
        </template>
    </tr>

    <tr v-show="showBottomPlaceholder">
        <td :colspan="row.length"><div class="empty"></div></td>
    </tr>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import TableCell from '@/components/table/TableCell.vue'

export default {
    name: 'TableRow',
    components: { TableCell },
    props: {
        row: {
            type: Object,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        showBottomPlaceholder: {
            type: Boolean
        },
        showTopPlaceholder: {
            type: Boolean
        }
    },
    data() {
        return {
            startCol: 0
        }
    },
    computed: {
        ...mapState({
            headers: (state) => state.headers,
            content: (state) => state.content,
            invalidRowID: (state)=> state.invalidRowID
        }),
        ...mapGetters({
            sortedHeaders: 'sortedHeaders'
        }),
        rowPosition() {
            return this.row.find((el) => el.name == 'rowPosition').value
        }
    },
    methods: {
        onDragEnter() {
            this.$emit('on-drag-enter', this.rowPosition)
        },
        onDragStart(e, position) {
            e.dataTransfer.dropEffect = 'move'
            e.dataTransfer.effectAllowed = 'move'

            this.startCol = position
            this.$emit('on-drag-row', this.startCol)
        },
        onDragEnd(newPosition) {
            this.$emit('on-drop-row', newPosition)
        }
    }
}
</script>

<style scoped>
.empty {
    height: 44px;
    border-radius: 5px;
    background-color: #fbfcfd;
    margin-bottom: -1px;
    background-image: url("data:image/svg+xml;utf8,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' style='fill: none; stroke: lightsteelblue; stroke-width: 4; stroke-dasharray: 7 7'/></svg>");
}
.row__error {
    background-color: #fadee2;
}
</style>
