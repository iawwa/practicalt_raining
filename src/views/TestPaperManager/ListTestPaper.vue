<template>

  <el-container>
    <el-main>
      <el-table :data="testData.list.data" style="width: 100%;height:550px">
        <el-table-column label="试卷ID" prop="eid" style="width: 10%;" />
        <el-table-column label="试卷名字" prop="ename" style="width: 15%;" />
        <el-table-column label="描述" prop="edescribe" style="width: 30%;" />
        <el-table-column label="教师ID" prop="tid" style="width: 10%;" />
        <el-table-column align="right" style="width: 25%;">
          <template #header>
            <div style="display: flex; align-items: center;">
              <el-input v-model="search" size="small" placeholder="Type to search"></el-input>
              <el-button @click="getData" style="margin-left: 5%;background-color: greenyellow"  :icon="Search" ></el-button>
            </div>

          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">打开</el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next" :total="50" />
      </div>
    </el-footer>

  </el-container>


</template>



<script lang="ts">
import API from "../../axios/request";
import { ElInput } from "element-plus";
import {Search} from "@element-plus/icons-vue";

export default {
  data() {
    return {
      search: "",
      testData: {
        list: []
      }
    };
  },
  computed: {
    Search() {
      return Search
    },
    ElInput
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getData() {
      API({
        url: '/selectExamination',
        method: 'get',
        params: {
          page: 1,
          limit: 12,
          keyword: this.search,
        }
      }).then((res) => {
        this.testData.list = res.data;
      });
    }
  },
  mounted() {
    // 在mounted钩子中调用getData
    this.getData();
  }
};
</script>
