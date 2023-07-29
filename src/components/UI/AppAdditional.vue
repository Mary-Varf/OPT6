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
    height: 15px;
    background-image: url('../../assets/icons/ellipsis.svg');
    background-size: 3px 13px;
    background-position: -2px 5px;
    background-repeat: no-repeat;
    cursor: pointer;
}
.icon--additional:hover,
.icon--additional:focus {
    background-image: url('../../assets/icons/ellipsisDark.svg');
}
@media(max-width: 1025px) {
    .icon--additional {
        height: 15px;
        background-position: 0px 3px;
        margin-bottom: 5px;
    }

}
</style>
