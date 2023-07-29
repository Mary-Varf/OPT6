<template>
    <th class="header__item"
        :width="startWidth + 10"
        :draggable="true"
        :ref="`th${header.id}`"
        @mousedown="handleMouseDown"
        @mouseleave="removeClassTd"
        @dragstart='dragStart($event, header.colPosition)'
    >
        {{ header.name }}
    </th>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'TableHeader',
    props: {
        header: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            startWidth: 0,
            isResized: true,
        }
    },
    computed: {
        ...mapState({
            headers: state=>state.headers,
            isDesktop: state=> state.isDesktop,
        }),
        ...mapGetters({
            sortedHeaders: 'sortedHeaders',
        }),
    },
    mounted() {
        this.startWidth = this.header.width;
        if (this.isDesktop) {
            this.$nextTick(() => {
                const node = this.$refs[`th${this.header.id}`];
                const resizeObserver  = new ResizeObserver(this.debounce((entries) => {

                    for (let entry of entries) {
                        const cr = entry.contentRect;
                        if (this.startWidth !== cr.width) {
                            this.updateHeaderWidth(cr.width);
                        }
                    }

                }), 300);
                if (node) {
                    resizeObserver.observe(node);
                }
            })
        }
    },
    methods: {
        ...mapActions({
            updateHeaders: 'updateHeaders',
        }),
        dragStart (event, startPosition) {
            if (this.isDesktop) {
                event.dataTransfer.dropEffect = 'move';
                event.dataTransfer.effectAllowed = 'move';
                this.$emit('change-start', startPosition);

                this.removeClassTd();
            }
        },
        handleMouseDown(e) {
            if (this.isDesktop) {
                this.startWidth = e.target.offsetWidth;
                this.isResized = true;

                this.addClassTd();
            }
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
        updateHeaderWidth(newWidth) {
            if (this.isDesktop) {
                this.isResized = false;

                this.updateHeaders(
                    [...this.headers].map(el => {
                        if (el.id === this.header.id) {
                            return {
                                ...el,
                                width: newWidth
                            }
                        } else {
                            return el;
                        }
                    })
                )
            }
        },
        debounce(func, wait, immediate) {
            let timeout;

            return function executedFunction() {
                const context = this;
                const args = arguments;

                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };

                const callNow = immediate && !timeout;

                clearTimeout(timeout);

                timeout = setTimeout(later, wait);

                if (callNow) func.apply(context, args);
            };
        }
    },
}
</script>

<style  scoped>
.header__item {
    padding: 10px 0 15px 11px;
    resize: horizontal;
    overflow: hidden;
    white-space: nowrap;
    text-align: start;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    min-width: 100%;
    position: relative;
    letter-spacing: 0.4px;
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
        margin-bottom: 1px;
        font-weight: 400;
        padding: 0;
        letter-spacing: 0px;
        margin-left: -1px;
    }

}
</style>