<template>
<h3>
    条件渲染
</h3>
<div v-show="flag">你能看见我吗</div>
<div v-if="level==='A'">A</div>
<div v-else-if='level==="B"'>B</div>
<div v-else-if='level==="C"'>C</div>
<div v-else>Not ABC</div>
</template>
<script>
export default{
    data(){
        return{
            flag: true,
            level:"E"
        }
    }
}
</script>




