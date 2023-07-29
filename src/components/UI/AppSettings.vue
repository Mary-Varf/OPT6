<template>
    <div class="app-settings">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'AppSettings',
}
</script>

<style scoped>
.app-settings {
    width: 15px;
    height: 15px;
    background-image: url("@/assets/icons/settings.svg");
    background-repeat: no-repeat;
    cursor: pointer;
}
.app-settings:hover,
.app-settings:focus {
    background-image: url("@/assets/icons/settingsDark.svg");
}
</style>