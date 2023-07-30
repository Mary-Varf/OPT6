<template>
    <input class="app-input" :value="value" :type="type" @input="updateInput" />
</template>

<script>
export default {
    name: 'AppInput',
    props: {
        value: {
            type: [String, Number]
        },
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        updateInput(e) {
            this.$emit('update', e.target.value)
        }
    }
}
</script>

<style scoped>
.app-input {
    border-radius: 5px;
    border: solid 1px #ccc;
    padding: 6px 6px 8px 15px;
    background-color: var(--white);
    width: 100%;
    margin: 5px 0;
    font-size: 16px;
}
.app-input:hover,
.app-input:focus {
    border: 1px solid var(--ashblue);
    outline: none;
}
.input__error {
    border: 1px solid var(--wine);
}
@media (max-width: 1023px) {
    .app-input {
        padding: 6px 6px 7px 14px;
        font-size: 16px;
    }
}
</style>
