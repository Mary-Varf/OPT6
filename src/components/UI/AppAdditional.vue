<template>
    <div class="icon--additional"></div>
</template>

<script>
export default {
    name: 'AppAdditional'
}
</script>

<style scoped>
.icon--additional {
    width: 10px;
    height: 18px;
    background-image: url('../../assets/icons/ellipsis.svg');
    background-size: 3px 13px;
    background-position: 0px 3px;
    margin-left: -2px;
    background-repeat: no-repeat;
    cursor: pointer;
}
.icon--additional:hover,
.icon--additional:focus {
    background-image: url('../../assets/icons/ellipsisDark.svg');
}
@media (max-width: 1023px) {
    .icon--additional {
        height: 16px;
        background-position: 0px 3px;
        margin-bottom: 4px;
    }
}
</style>
