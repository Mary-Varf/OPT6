<template>
    <div class="popup"
        :class="className"
    >
        <slot></slot>
    </div>
</template>

<script>
import { Position } from '@/enums'
export default {
    name: 'AppPopup',
    props: {
        position: {
            type: String,
            default: Position.Left
        },
    },
    computed: {
        className() {
            let className = 'popup--left';

            if (this.position == Position.Right) {
                className = 'popup--right';
            }
            return className;
        },
    },
}
</script>

<style>
.popup {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    border-radius: 5px;
    box-shadow:
        0 0 3px 0 var(--black),
        inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
    background-color: var(--white);
    min-width: 179px;
    z-index: 10;
}
.popup--left {
    left: 0;
}
.popup--right {
    right: 0;
}

.popup__ul {
    display: flex;
    flex-direction: column;
}
.popup__li {
    padding: 7px 10px;
    font-size: 14px;
    cursor: pointer;
}
.popup__li:hover {
    color: #ae0a0a;
}

.popup__ul::-webkit-scrollbar {
    width: 7px;
    background-color: #f8f9fa;
    padding: 5px;
}

.popup__ul::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #d9d9d9;
}
</style>
