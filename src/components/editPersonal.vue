<template>
    <div class="modal">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue"

export default defineComponent({
    name: "editPersonal",
});
</script>

<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
