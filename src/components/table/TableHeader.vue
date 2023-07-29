<template>
    <th class="header__item"
        :width="startWidth + 11"
        :draggable="true"
        fer="th"
        @mousedown="handleMouseDown"
        @mouseup="() => handleMouseUp"
        @mouseleave="removeClassTd"
        @dragstart='dragStart($event, header.colPosition)'
    >
        {{ header.name }}
    </th>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import JQuery from 'jquery';

export default {
    name: 'TableHeader',
    props: {
        header: {
            type: Object,
            required: true
        },
        lastItem: {
            type: Boolean,
        }
    },
    data() {
        return {
            startWidth: 0,
        }
    },
    computed: {
        ...mapState({
            headers: state=>state.headers,
        }),
        ...mapGetters({
            sortedHeaders: 'sortedHeaders',
        }),
    },
    mounted() {
        this.startWidth = this.header.width;
        this.$nextTick(() => {

        })
    },
    methods: {
        ...mapActions({
            updateHeaders: 'updateHeaders',
        }),
        dragStart (event, startPosition) {
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            this.$emit('change-start', startPosition);

            this.removeClassTd();
        },
        handleMouseDown(e) {
            this.startWidth = e.target.offsetWidth;

            this.addClassTd();
        },
        addClassTd() {
            Array.from(document.getElementsByTagName('tr')).forEach(tr => {
                tr.getElementsByTagName('td')[this.header.colPosition]?.classList.add('resize');
            })
            document.getElementsByClassName('header__item')[this.header.colPosition]?.classList.add('resize');
        },
        removeClassTd() {
            Array.from(document.getElementsByTagName('tr')).forEach(tr => {
                tr.getElementsByTagName('td')[this.header.colPosition]?.classList.remove('resize');
            })
            document.getElementsByClassName('header__item')[this.header.colPosition]?.classList.remove('resize');
        },
        handleMouseUp(e) {
            this.removeClassTd();

            if (this.startWidth === e.target.offsetWidth) {
                return;
            }
            console.log('header')
            this.updateHeaders(
                [...this.headers].map(el => {
                    if (el.id === this.header.id) {
                        return {
                            ...el,
                            width: e.target.offsetWidth
                        }
                    } else {
                        return el;
                    }
                })
            )
        },
    },
}
</script>

<style  scoped>
.header__item {
    padding: 10px 0 13px 11px;

    resize: horizontal;
    border-right: 1px solid red;
    overflow: hidden;
    white-space: nowrap;
    text-align: start;
    border-right: 1px solid var(--border);
    min-width: 100%;
    position: relative;
    letter-spacing: 0.5px;
}
.header__item::-webkit-resizer {
    background-color: transparent;
}
.header__item.resize {
    border-right: 1px solid #b6b3b3;
}
@media(max-width: 1025px) {
    .header__item {
        border: none;
        color: #8f8f8f;
        font-size: 10px;
        margin-bottom: 5px;
        font-weight: 400;
        padding: 0;
    }

}
</style>