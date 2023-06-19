
<template>
    <div v-bind:class="dynamicClass" v-bind:id="dynamicid">
        测试
    </div>
    <button :disabled="isButton">按钮</button>
    <button :disabled="!isButton">按钮</button>
    <div v-bind="Object_test">ceshi1</div>
</template>
<script>
export default
    {
        data() {
            return {
                dynamicClass: "appclass",
                dynamicid: "appid",
                isButton: false,
                Object_test: {
                    id: "appid",
                    class: "appclass"
                }
            }
        }
    }
</script>
<style>
.appclass {
    color: red;

}

#appid {
    color: blue;
}
</style>