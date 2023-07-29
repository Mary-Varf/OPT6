<template>
    <div class="container app-table" v-if="isDesktop">
        <div>
            <TableSettings />
        </div>

        <div class="table-container" ref="tableContainer">
            <table class="table" :width="tableWidth" @wheel="handleWheel">
                <TableHeader
                    v-for="header in sortedHeaders"
                    :key="header.type"
                    :header="header"
                    @change-start="changeStartCol"
                    @drop="handleDropCol($event, header.colPosition)"
                    @dragenter.prevent
                    @dragover.prevent
                />

                <template v-for="row in sortRows" :key="row.id">
                    <TableRow
                        @on-drop-row="onDropRow"
                        @on-drag-row="onDragRow"
                        @on-drag-enter="onDragEnter"
                        :id="row.id"
                        :showBottomPlaceholder="
                            !isDragHeader &&
                            row.rowPosition == this.enterPosition &&
                            showBottomPlaceholder
                        "
                        :showTopPlaceholder="
                            !isDragHeader &&
                            row.rowPosition == this.enterPosition &&
                            showTopPlaceholder
                        "
                        :row="sortedRow(row)"
                    />
                </template>
            </table>

            <TotalBlock />
        </div>
    </div>

    <template v-else>
        <transition-group name="list">
            <div class="card container" v-for="card in sortRows" :key="card.id" :id="card.id">
                <template v-for="header in sortedHeaders" :key="header.id">
                    <TableHeader v-show="header.id != 0" :header="header" />

                    <TableCell
                        :cell="getCell(header, card)"
                        :row-id="card.id"
                        v-show="header.id != 0"
                    >
                    </TableCell>
                </template>
            </div>
        </transition-group>
        <TotalBlock />
    </template>
</template>

<script>
import TableHeader from '@/components/table/TableHeader.vue'
import AppAdditional from '@/components/UI/AppAdditional.vue'
import AppPopup from '@/components/UI/AppPopup.vue'
import TableRow from '@/components/table/TableRow.vue'
import TotalBlock from '@/components/table/TotalBlock.vue'
import TableSettings from '@/components/table/TableSettings.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { desktopWidth } from '@/enums'
import TableCell from '@/components/table/TableCell.vue'

export default {
    name: 'AppTable',
    components: {
        TableCell,
        TableHeader,
        TableSettings,
        TotalBlock,
        TableRow,
        AppPopup,
        AppAdditional
    },
    props: {},
    data() {
        return {
            startColPosition: 0,
            startRowPosition: 0,
            showTopPlaceholder: false,
            showBottomPlaceholder: false,
            enterPosition: 0,
            scroll: 0,
            isDragHeader: false
        }
    },
    computed: {
        ...mapState({
            headers: (state) => state.headers,
            content: (state) => state.content,
            isDesktop: (state) => state.isDesktop
        }),
        ...mapGetters({
            sortedHeaders: 'sortedHeaders',
            sortRows: 'sortRows',
            tableWidth: 'tableWidth'
        })
    },
    mounted() {
        this.setStateIsDesktop(window.screen.width > desktopWidth)
    },
    methods: {
        ...mapActions({
            filterByColPosition: 'filterByColPosition',
            updateHeaders: 'updateHeaders',
            updateContent: 'updateContent'
        }),
        ...mapMutations({
            setStateIsDesktop: 'setStateIsDesktop'
        }),
        sortedRow(row) {
            let newRow = []
            let keys = Object.keys(row)

            this.sortedHeaders.forEach((header) => {
                newRow.push({
                    name: keys.find((key) => key == header.type),
                    value: row[header.type],
                    inputType: header.inputType
                })
            })

            return newRow
        },
        handleWheel(e) {
            if (e.target.tagName !== 'LI') {
                const tableContainer = this.$refs.tableContainer
                this.scroll =
                    this.scroll + e.deltaY >= 0 && this.scroll + e.deltaY <= this.tableWidth
                        ? this.scroll + e.deltaY
                        : this.scroll

                e.preventDefault()

                tableContainer.scrollLeft = this.scroll
            }
        },
        handleDropCol(event, newPosition) {
            if (this.isDesktop) {
                this.isDragHeader = false
                let updatedHeaders = [...this.headers].map((header) => {
                    let newHeader = {}
                    if (header.colPosition === this.startColPosition) {
                        newHeader = {
                            ...header,
                            colPosition: newPosition
                        }
                    } else if (newPosition <= header.colPosition) {
                        newHeader = {
                            ...header,
                            colPosition: ++header.colPosition
                        }
                    } else {
                        return header
                    }
                    return newHeader
                })
                this.updateHeaders(updatedHeaders)
            }
        },
        changeStartCol(startColPosition) {
            this.isDragHeader = true
            this.startColPosition = startColPosition
        },
        onDropRow() {
            if (this.isDesktop) {
                this.showTopPlaceholder = false
                this.showBottomPlaceholder = false

                let newContent = [...this.content].map((row) => {
                    let updatedRow = {}

                    if (
                        row.rowPosition == this.enterPosition ||
                        row.rowPosition == this.startRowPosition
                    ) {
                        updatedRow = {
                            ...row,
                            rowPosition:
                                row.rowPosition == this.startRowPosition
                                    ? this.enterPosition
                                    : this.startRowPosition
                        }
                    } else {
                        updatedRow = row
                    }
                    return updatedRow
                })
                this.updateContent(newContent)
            }
        },
        onDragRow(colPosition) {
            this.startRowPosition = colPosition
        },
        onDragEnter(colPosition) {
            if (this.isDesktop) {
                this.enterPosition = colPosition

                if (colPosition < this.startRowPosition && !this.isDragHeader) {
                    this.showTopPlaceholder = true
                } else if (colPosition > this.startRowPosition && !this.isDragHeader) {
                    this.showBottomPlaceholder = true
                }
            }
        },
        getCell(header, card) {
            return this.sortedRow(card).find((el) => el.name === header.type)
        }
    }
}
</script>

<style scoped>
.list-item {
    display: inline-block;
    margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
    transition: all 0.3s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}

.app-table {
    padding: 32px 15px 25px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
}
.table-container {
    overflow-x: hidden;
    height: 100%;
    width: 100%;
}
.table-container.marginBottom {
    padding-bottom: 300px;
}
.app-settings {
    position: absolute;
    top: 10px;
    right: 15px;
}
.total-container {
    align-self: flex-end;
}
.table {
    border-top: 1px solid var(--border);
    position: relative;
    table-layout: fixed;
    margin-bottom: 20px;
}
.a-table__row div {
    padding: 10px 0;
    position: relative;
    overflow: hidden;
}
.app-table::-webkit-scrollbar {
    width: 7px;
    background-color: #f8f9fa;
    padding: 5px;
}

.app-table::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #d9d9d9;
}
.card {
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
    padding: 12px 15px 9px;
}
@media (max-width: 1023px) {
    .table-container.marginBottom {
        padding-bottom: 0;
    }
}
</style>
