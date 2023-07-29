<template>
    <div class="icon--burger"><slot></slot></div>
</template>

<script>
export default {
    name: 'AppBurger'
}
</script>

<style scoped>
.icon--burger {
    width: 11px;
    height: 18px;
    background-image: url('../../assets/icons/burger.svg');
    background-position: 2px 3px;
    background-repeat: no-repeat;
    padding-left: 19px;
    align-items: center;
    text-align: start;
}
</style>
