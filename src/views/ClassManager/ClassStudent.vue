<template>
    <div style="padding: 10px">
        <div style="margin: 10px 0">
            <!--      搜索区域-->
            <el-input v-model="search" placeholder="请输入学生姓名" style="width: 20%" clearable/>
            <el-button type="primary" :icon="Search" @click="SearchStudent" style="margin-left: 5px">查询</el-button>
            <!-- 添加学生 -->
            <el-button type="primary" @click="dialogVisible = true" v-if="is_teacher"
                style="margin-left: 5px">添加学生</el-button>
        </div>

        <el-dialog v-model="dialogVisible" title="添加学生" width="60%" align-center>
            <!-- 新增 学生 表单 -->
            <!-- cid sid -->
            <el-form :model="info" label-width="120px">
                <el-form-item label="班级id">
                    <el-text>{{ this.$route.query.cid }}</el-text>
                </el-form-item>
                <el-form-item label="学生id">
                    <el-input v-model="info.sid" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addStudent">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 表格 -->
        <!-- sid userName sname sex age email phoneNumber -->
        <el-table :data="StudentListData" v-loading="loading" style="width: 100%;height:auto;">
            <el-table-column prop="sid" label="学生ID" sortable />
            <el-table-column prop="userName" label="学生账号" />
            <el-table-column prop="sname" label="学生姓名" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="phoneNumber" label="电话号码" />
            <el-table-column v-if="is_teacher" label="操作" width="120">
                <template #default="scope">
                    <el-button size="small" type="danger" style="background-color:#8c2222;border: 0px"
                        @click="handleDelete(scope.row.sid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
              style="margin-top: 0px;padding-top: 0px"
              :background="true"
              :page-size="pageSize"
              :total="total"
              layout=" prev, pager, next"
              @current-change="handleCurrentChange"
              class="pagination"
          />
    </div>
</template>
    
<script lang='ts'>
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import API from "../../axios/request";

export default {
    data() {
        return {
            // 0:管理员1:教师2:学生
            is_studnet: false,
            is_admin: false,
            is_teacher: false,
            // 添加学生信息
            info: {
                sid: "",
            },
            cid: "",
            sname:"",
            dialogVisible: false,
            // 根据学生姓名进行查询
            search: "",
            StudentListData: "",
            total: 0,
            currentPage: 1,
            pageSize: 12,
            loading: true,
        }
    },
    computed: {
        Search() {
            return Search
        },
        // ElInput, ElButton, CircleCloseFilled, ElDialog,
    },

    // 应该是数据封装的错误，传参问题，目前看不出来
    methods: {
        // 删除学生 sid cid
        handleDelete(sid) {
            API({
                url: '/student/tdelete',
                method: 'delete',
                data: {
                    cid: this.cid,
                    sid: sid
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                ElMessageBox.alert(res.data.msg, '提示', {
                    confirmButtonText: '确认',
                })
            })

            this.SearchStudentListData(this.currentPage);

        },
        // 添加学生
        addStudent() {
            this.dialogVisible = false
            API({
                url: `/student/addStuInSC`,
                method: 'post',
                data: {
                    sid: this.info.sid,
                    cid: this.cid,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                ElMessageBox.alert(res.data.msg, '提示', {
                    confirmButtonText: '确认',
                })
            })

            this.SearchStudentListData(this.currentPage);

        },
        //分页
        handleCurrentChange(number) {
          this.currentPage = number
          this.SearchStudentListData(number)
        },

        // 根据学生姓名查询
        SearchStudent() {
            this.sname=this.search
            API({
                url: '/student/tlists',
                method: 'get',
                params: {
                    sname: this.sname,
                }
            }).then((res) => {
                this.StudentListData = res.data;
                this.total = res.data.count
                console.log(this.sname);
                
            })
        },
        //根据cid展示信息
        SearchStudentListData(default_current_page = this.currentPage) {
            this.loading = true
            API({
                url: '/student/tlistall',
                method: 'get',
                params: {
                    cid: this.$route.query.cid,
                    pageNum: default_current_page,
                    pageSize: this.pageSize,
                }
            }).then((res) => {
                this.StudentListData = res.data;
                this.total = res.data.count
                console.log(this.StudentListData);
                
            })
            this.loading = false
        }
    },
    mounted() {
        // 在mounted钩子中调用getData
        this.SearchStudentListData(1);
        let current_role = this.$cookies.get("role");
        this.cid = this.$route.query.cid;
        switch (current_role) {
            case "student":
                {
                    this.is_studnet = true
                    break
                }
            case "teacher":
                {
                    this.is_teacher = true
                    break
                }
            case "manager": {
                this.is_admin = true
                break
            }
        }
        console.log("data" + this.$cookies.get("data"));
        console.log("role" + this.$cookies.get("role"))
        console.log("cid" + this.cid);

    }
};




</script>
    