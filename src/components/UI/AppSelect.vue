<template>
    <AppInput
        class="app-select__input"
        :class="`app-select__input-${rowId}`"
        name="name"
        autocomplete="off"
        :type="'text'"
        :value="getOptionName"
        @click="toggleList"
        @input="changeQuery"
    ></AppInput>
    <ul class="app-select__list" ref="list">
        <li
            class="app-select__item"
            :class="`app-select__item-${rowId}`"
            v-for="option in sortedArray"
            :key="option.id"
            @click="selectOption(option.id)"
            v-html="getBoldText(option.name)"
        ></li>
    </ul>
</template>

<script>
import AppInput from '@/components/UI/AppInput.vue';

export default {
    name: 'AppSelect',
    components: { AppInput },
    props: {
        options: {
            type: Array,
            required: true
        },
        modelValue: {
            type: Number
        },
        rowId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            query: '',
            selectedOption: null,
        }
    },
    computed: {
        sortedArray() {
            return this.options.filter((option) => {
                return option.name.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getOptionName() {
            if (this.selectedOption == null) {
                return '';
            }
            return this.options.find((item) => item.id === this.selectedOption)?.name ?? ''
        }
    },
    mounted() {
        this.selectedOption = this.modelValue;

        this.$nextTick(() => {
            document.addEventListener('click', (e) => this.handleClickOutsideSelect(e))
        })
    },
    methods: {
        handleClickOutsideSelect(e) {
            if (!e.target?.classList.contains(`app-select__item-${this.rowId}`)
                && !e.target?.classList.contains(`app-select__input-${this.rowId}`)) {
                this.$refs.list?.classList.remove('open');
            }
        },
        changeQuery(e) {
            this.query = e.target.value
        },
        toggleList() {
            this.$refs.list.classList.toggle('open')
        },
        selectOption(id) {
            this.toggleList();

            const option = this.options.find((option) => option.id === id)

            this.selectedOption = id;
            this.query = option.name;

            this.$emit('change-option', id);
        },
        getBoldText(name) {
            return name.toLowerCase().replace(this.query.toLowerCase(), `<b>${this.query}</b>`)
        }
    }
}
</script>

<style scoped>
.app-select {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 100;
}
.app-select__list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 160px;
    background: #fff;
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 100;
    margin: 8px 0 0;
    padding: 0;
    font-size: 14px;
    color: #424348;
    scrollbar-color: dark;
    scrollbar-width: thin;
    overscroll-behavior: contain;
    box-shadow:
        0 0 3px 0 #000,
        inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
}

.app-select__list::-webkit-scrollbar {
    width: 7px;
    background-color: #f8f9fa;
    padding: 5px;
}

.app-select__list::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #d9d9d9;
}

.app-select__list .app-select__item {
    position: relative;
    padding: 7px 10px;
    cursor: pointer;
    list-style-type: none;
    display: flex;
    align-self: flex-start;
    border: none;
}
.app-select__list .app-select__item *{
    font-size: 14px;
}

.app-select__list .app-select__item:hover {
    background-color: rgba(224, 229, 231, 0.5);
}
.app-select__list.open {
    display: block;
}
.app-select input {
    width: 100%;
}

@media(max-width: 1024px) {
    .app-select__list {
        margin-top: 0;
        line-height: 0.5;
        padding: 0;
        text-align: start;
        overflow-x: hidden;
        word-wrap: nowrap;
        align-items: start;
        border-radius: 5px;
        max-height: 145px;
    }
    ..app-select__list .app-select__item {
        font-size: 14px;
        padding: 10px 10px 11px;
    }
}
</style>
