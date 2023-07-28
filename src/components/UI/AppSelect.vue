<template>
    <div class="app-select">
        <AppInput
            class="app-select__input"
            name="name"
            autocomplete="off"
            :type="'text'"
            :value="query"
            v-model="getOptionName"
            @click="toggleList"
            @input="changeQuery"
        ></AppInput>
        <ul class="app-select__list" ref="list">
            <li
                class="app-select__item"
                v-for="option in sortedArray"
                :key="option.id"
                @click="selectOption(option.id)"
                v-html="getBoldText(option.name)"
            ></li>
        </ul>
    </div>
</template>

<script>
import AppInput from '@/components/UI/AppInput.vue'

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
        }
    },
    data() {
        return {
            query: '',
            selectedOption: 0
        }
    },
    computed: {
        sortedArray() {
            return this.options.filter((option) => {
                return option.name.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getOptionName() {
            return this.options.find((item) => item.id === this.modelValue)?.name ?? ''
        }
    },
    methods: {
        changeQuery(e) {
            this.query = e.target.value
        },
        toggleList() {
            this.$refs.list.classList.toggle('open')
        },
        selectOption(id) {
            this.selectedOption = id
            const option = this.options.find((option) => option.id === id)
            this.query = option.name
            this.toggleList()
        },
        getBoldText(name) {
            return name.toLowerCase().replace(this.query.toLowerCase(), `<b>${this.query}</b>`)
        }
    }
}
</script>

<style scoped>
.app-select {
    position: relative;
    display: block;
    width: 100%;
}
.app-select__list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 10px;
    max-height: 205px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 100;
    margin: 10px 0 0;
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
    border-top: 1px solid rgba(224, 229, 231, 0.5);
    padding: 10px 15px;
    cursor: pointer;
    list-style-type: none;
    display: flex;
    align-self: flex-start;
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
</style>
