<template>
  <div id="UserInfo" class="page-wrapper">
    <!-- 选择器 -->
    <h1 class="main-title">选择学生</h1>
    <div class="wrapper">
      <el-tabs type="border-card">
        <el-tab-pane label="级联选择">
          <GroupSelector :selectorData="selectorData" />
          <el-button
            type="primary"
            @click="fetchUserInfo('id', selectorData.userId)"
            >搜索</el-button
          >
        </el-tab-pane>
        <el-tab-pane label="按学号搜索">
          <StudentSearcher v-model="searchContent" />
          <el-button
            type="primary"
            @click="fetchUserInfo('account', searchContent)"
            >搜索</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 选择器 -->

    <h1 class="main-title">详细信息</h1>
    <div class="wrapper userInfo-wrapper" v-if="studentInfo.id">
      <el-row :gutter="20" class="top">
        <el-col :md="12">
          <div class="userInfo-card">
            <div class="title">用户信息</div>
            <hr />
            <div class="info-item">
              <label>姓名:</label>
              <span>{{ studentInfo.name }}</span>
            </div>
            <div class="info-item">
              <label>学号:</label>
              <span>{{ studentInfo.account }}</span>
            </div>
            <div class="info-item">
              <label>手机号:</label>
              <span>{{ studentInfo.phone }}</span>
            </div>
            <div class="info-item">
              <label>注册日期:</label>
              <span>{{
                $moment(studentInfo.createdAt).format('YYYY-MM-DD')
              }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12">
          <div class="roomInfo-card">
            <PanelGroup :userInfo="studentInfo" />
          </div>
        </el-col>
      </el-row>
      <div class="bottom main-card" style="margin-top: 20px">
        <div class="process-item">
          <span
            >早起概率：<span
              >该学生的早起概率是{{
                Number((studentInfo.getupProb * 100).toFixed(2))
              }}%
              <span v-if="Number((studentInfo.getupProb * 100).toFixed(2)) > 60"
                >该学生是早起型学生</span
              ><span v-else>该学生是晚起型学生</span></span
            ></span
          >

          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="Number((studentInfo.getupProb * 100).toFixed(2))"
          ></el-progress>
        </div>
        <div class="process-item">
          <span
            >早归概率：<span
              >该学生的早归概率是{{
                Number((studentInfo.backProb * 100).toFixed(2))
              }}%
              <span v-if="Number((studentInfo.backProb * 100).toFixed(2)) > 60"
                >该学生是早归型学生</span
              ><span v-else>该学生是晚归型学生</span><span></span></span
          ></span>

          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="Number((studentInfo.backProb * 100).toFixed(2))"
            status="success"
          ></el-progress>
        </div>
        <div class="process-item">
          <span
            >打扫频率：<span
              >该学生的打扫频率是{{
                Number((studentInfo.cleanProb * 100).toFixed(2))
              }}%
              <span v-if="Number((studentInfo.cleanProb * 100).toFixed(2)) > 60"
                >该学生是勤奋打扫型学生</span
              ><span v-else>该学生是懒惰型学生</span></span
            ></span
          >

          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="Number((studentInfo.cleanProb * 100).toFixed(2))"
            status="warning"
          ></el-progress>
        </div>
      </div>
    </div>
    <div class="no-data-tips main-card wrapper" v-else>请选择用户</div>
  </div>
</template>

<script>
import GroupSelector from '@/components/GroupSelector'
import StudentSearcher from './components/StudentSearcher'
import PanelGroup from './components/PanelGroup'

import { getStudentInfoByIdOrAccount } from '@/api/user'
export default {
  name: 'UserInfo',
  components: {
    GroupSelector,
    StudentSearcher,
    PanelGroup,
  },
  data() {
    return {
      selectorData: {
        buildingId: null,
        floorId: null,
        roomId: null,
        userId: null,
      },
      searchContent: '',
      studentInfo: {},
    }
  },
  methods: {
    fetchUserInfo(type, value) {
      getStudentInfoByIdOrAccount({ type, value }).then((res) => {
        this.studentInfo = res.data
      })
    },
  },
  mounted() {
    if (this.$route.query.userId) {
      this.fetchUserInfo('id', this.$route.query.userId)
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 40px 0;
}
.el-tab-pane {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
>>> .el-tabs__content {
  padding: 40px 20px;
  width: 100%;
}

.userInfo-wrapper {
  .top {
    .roomInfo-card {
      background-color: #fff;
      padding: 30px;
    }
    .userInfo-card {
      background-color: #fff;
      padding: 30px;
      height: 223px;
      box-sizing: content-box;
      .title {
        font-weight: bold;
        color: $color-primary;
        font-size: 22px;
        margin-bottom: 20px;
      }
      .info-item {
        margin: 20px 0;
      }
      :nth-child(3) {
        margin-top: 40px;
      }
    }
  }
  .bottom {
    .process-item {
      span {
        display: block;
        margin: 10px 0;
      }
    }
    :first-child span {
      margin-top: 0px;
    }
  }
}
</style>
