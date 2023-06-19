<template>
    <h3>列表渲染</h3>
    <p v-for="(name,index) in names" style="color: aqua;">{{name}}-{{index}}</p>
    <div v-for="item of result">
        <p>{{item.title}}</p>
        <img :src="item.avator">
    </div>
    <div>
        <p v-for="(value,key,index) of userinfo">{{value}}-{{key}}-{{index}}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            names: ["iawwa", "bal", "han", "himmal", "lin"],
            result:[{
                "id":1,
                "title":"iawwa",
                "avator":"https://pic.qyer.com/avatar/002/25/77/30/200?v=1560226451"
            },{
                "id":2,
                "title":"bal",
                "avator":"https://pic.qyer.com/avatar/011/07/08/69/200?v=1572185180"
            },{
                "id":3,
                "title":"han",
                "avator":"https://pic.qyer.com/avatar/009/88/48/58/200?v=1507386782"
            }
            ],
            userinfo:{
                name:"iawwa",
                age:18,
                sex:"male"
            }
        }
    }
}
</script>


