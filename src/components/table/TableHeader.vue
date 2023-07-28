<template>
    <th class="header__item"
        :class="`col-${ header.type }`"
        :key="header.type"
        :style="{ width: header.width + 'px' }"
        :draggable="true"
        @dragstart='dragStart($event, header.colPosition)'
    >
        {{ header.name }}
    </th>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'TableHeader',
    props: {
        header: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters({
            sortedHeaders: 'sortedHeaders',
        }),
    },
    methods: {
        dragStart (event, startPosition) {
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            this.$emit('change-start', startPosition);
        },
    },
}
</script>

<style  scoped>
.header__item {
    padding: 10px 0 10px 10px;
    resize: horizontal;
    border-right: 1px solid red;
    overflow-x: hidden;
    white-space: nowrap;
    text-align: start;
    border-right: 1px solid var(--border);
}
.header__item::-webkit-resizer {
    background-color: transparent;
}
</style>