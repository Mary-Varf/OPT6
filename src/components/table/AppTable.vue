<template>
    <div class="container app-table">
        <TableSettings />
        <table class="table"
        >
            <TableHeader
                v-for="header in sortedHeaders"
                :key="header.type"
                :header="header"
                @change-start="changeStartCol"
                @drop="handleDropCol($event, header.colPosition)"
                @dragenter.prevent
                @dragover.prevent
            />
            <template v-for="row in sortRows"
                      :key="row.id"
            >
                <TableRow @on-drop-row="onDropRow"
                          @on-drag-row="onDragRow"
                          @on-drag-enter="onDragEnter"
                          :id="row.id"
                          :showTopPlaceholder="row.rowPosition == this.enter && showTopPlaceholder"
                          :showDownPlaceholder="row.rowPosition == this.enter && showDownPlaceholder"
                          :row="sortedRow(row)" />
            </template>
        </table>
    </div>
</template>

<script>
import AppAdditional from '@/components/UI/AppAdditional.vue'
import AppPopup from '@/components/UI/AppPopup.vue'
import TableRow from '@/components/table/TableRow.vue'
import TotalBlock from '@/components/table/TotalBlock.vue'
import TableSettings from "@/components/table/TableSettings.vue";
import {mapActions, mapGetters, mapState} from "vuex";
import TableHeader from "@/components/table/TableHeader.vue";
export default {
    name: 'AppTable',
    components: {TableHeader, TableSettings, TotalBlock, TableRow, AppPopup, AppAdditional },
    props: {
    },
    data() {
        return {
            shownPopup: -1,
            updatedHeaders: [],
            updatedContent: [],
            startColPosition: 0,
            startRowPosition: 0,
            showTopPlaceholder: false,
            showDownPlaceholder: false,
            enter: 0,
        }
    },
    computed: {
        ...mapState({
            headers: state=>state.headers,
            content: state=>state.content,
        }),
        ...mapGetters({
            sortedHeaders: 'sortedHeaders',
            sortRows: 'sortRows',
        }),
    },
    methods: {
        ...mapActions({
            filterByColPosition: 'filterByColPosition',
            updateHeaders: 'updateHeaders',
            updateContent: 'updateContent',
        }),
        sortedRow(row) {
            let newRow = [];
            let keys = Object.keys(row);

            this.sortedHeaders.forEach(header=> {
                newRow.push({
                    name: keys.find(key=>key==header.type),
                    value: row[header.type],
                    inputType: header.inputType
                })
            })

            return newRow;
        },
        handleDropCol(event, newPosition) {
            let updatedHeaders = [...this.headers].map(header => {
                let newHeader = {};
                if (header.colPosition === this.startColPosition) {
                    newHeader = {
                        ...header,
                        colPosition: newPosition,
                    }
                } else if (newPosition <= header.colPosition) {
                    newHeader = {
                        ...header,
                        colPosition: ++header.colPosition,
                    }
                } else {
                    return header;
                }
                return newHeader;
            })
            this.updateHeaders(updatedHeaders)
        },
        changeStartCol(startColPosition) {
            this.startColPosition = startColPosition;
        },
        onDropRow(colPosition) {
            this.showTopPlaceholder = false;
            this.showDownPlaceholder = false;

            let i = this.startRowPosition;

            let newContent = [...this.content].map(row => {
                let updatedRow = {};

                if (row.rowPosition == this.enter || row.rowPosition == this.startRowPosition) {
                    updatedRow = {
                        ...row,
                        rowPosition: row.rowPosition == this.startRowPosition ? this.enter : this.startRowPosition,
                    }
                } else {
                    updatedRow = row;
                }
                return updatedRow;
            });
            this.updateContent(newContent);
            console.log(newContent)
        },
        onDragRow(colPosition) {
            this.startRowPosition = colPosition;
        },
        onDragEnter(colPosition) {
            this.enter = colPosition;
            if (colPosition < this.startRowPosition) {
                this.showTopPlaceholder = true;
            } else if (colPosition > this.startRowPosition) {
                this.showDownPlaceholder = true;
            }
        }
    }
}
</script>

<style scoped>
.empty {
    border: 2px solid red;
    height: 30px;
}

.a-table__header {
    position: relative;
}

.a-table__row {
    display: flex;
    position: relative;
}
.app-table {
    position: relative;
    padding: 32px 15px 25px 0;
}
.app-settings {
    position: absolute;
    top: 9px;
    right: 15px;
}
.table {
    border-top: 1px solid var(--border);
    position: relative;
}
.a-table__row div {
    padding: 10px 0;
    position: relative;
    overflow: hidden;
}
</style>
