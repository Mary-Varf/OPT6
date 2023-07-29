<template>
    <AppSettings @click="toggleOpenPopup">
        <AppPopup v-if="isOpenedSettingsPopup"
                  :position="positionRight"
        >
            <ul class="popup__ul">
                <li class="popup__li" @click="openSubPopup">
                    Отображение столбцов
                    <span class="right-arrow"></span>
                </li>
            </ul>
        </AppPopup>
        <AppPopup v-if="isOpenedSubPopup"
                  :position="positionRight"
        >
            <ul class="popup__ul sub">
                <li class="popup__li" @click="openSubPopup">
                    <span class="left-arrow"></span>
                    Отображение столбцов
                </li>
                <ul class="checkboxes">
                    <li class="popup__li" v-for="header in headers">
                        <AppCheckbox :checked="isChecked(header.id)"
                                     :id="header.id"
                                     @update-checkbox="updateColPosition"
                        >{{header.name}}</AppCheckbox>
                    </li>
                </ul>
            </ul>
        </AppPopup>
    </AppSettings>
</template>

<script>
import {mapState} from 'vuex';
import {Position} from "@/enums";
import AppCheckbox from "@/components/UI/AppCheckbox.vue";
import AppSettings from "@/components/UI/AppSettings.vue";
import AppPopup from "@/components/UI/AppPopup.vue";

export default {
    name: 'TableSettings',
    components: { AppCheckbox, AppSettings, AppPopup },
    data() {
        return {
            newHeaders: [],
            positionRight: Position.Right,
            isOpenedSettingsPopup: false,
            isOpenedSubPopup: false,
        }
    },
    computed: {
        ...mapState({
            headers: state=>state.headers,
        }),
    },
    methods: {
        toggleOpenPopup() {
            this.isOpenedSettingsPopup = !this.isOpenedSettingsPopup;
        },
        openSubPopup() {
            this.isOpenedSubPopup = !this.isOpenedSubPopup;
        },
        isChecked(id) {
            return !!this.headers.find(header=> header.id === id && header.colPosition >= 0);
        },
        updateColPosition({id, checked}) {
            let maxColPos = 0;
            this.headers.forEach(header=>{
                maxColPos = header.colPosition > maxColPos ? header.colPosition : maxColPos;
            })
            const updatedHeaders = this.headers.map(header=> {
                if (header.id === id) {
                    return {
                        ...header,
                        colPosition: checked ? ++maxColPos : -1,
                    }
                } else {
                    return header;
                }
            })
            this.$store.commit('setHeaders', updatedHeaders);
        },
    }
}
</script>

<style scoped>
.popup__ul {
    overflow-y: scroll;
    z-index: 100;
}
.popup__li {
    position: relative;
    align-items: center;
}
.right-arrow, .left-arrow {
    position: absolute;
    width: 4px;
    height: 10px;
    transform: translateY(-50%);
    background-image: url("@/assets/icons/rightArrow.svg");
}
.right-arrow {
    right: 10px;
    top: 50%;
}
.left-arrow {
    left: 10px;
    top: 10px;
    transform: rotate(180deg);
}
.popup__li:has(.left-arrow) {
    padding-left: 25px;
    font-weight: 600;
}
.sub {
    width: 197px;
}
</style>