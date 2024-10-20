<template>
  <div>
    <el-button type="primary" @click="openAddDialog">新增会议</el-button>
    <el-table :data="meetings" style="width: 100%" v-if="meetingsLoaded">
      <el-table-column prop="title" label="会议主题" />
      <el-table-column prop="mstartTime" label="开始时间" :formatter="formatDateTime" />
      <el-table-column prop="medTime" label="结束时间" :formatter="formatDateTime" />
      <el-table-column prop="maddress" label="会议地点" />
      <el-table-column prop="contacter" label="联系人" />
      <el-table-column prop="contactWay" label="联系方式" />
      <el-table-column prop="remark" label="会议议程" />
      <el-table-column prop="status" label="会议状态" :formatter="formatStatus" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteMeeting(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else>加载中...</div>

    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <el-form :model="form" label-width="120px">
        <el-form-item label="会议主题">
          <el-input v-model="form.title" required />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="form.mstartTime" type="datetime" required />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="form.medTime" type="datetime" required />
        </el-form-item>
        <el-form-item label="会议地点">
          <el-input v-model="form.maddress" required />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacter" required />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.contactWay" required />
        </el-form-item>
        <el-form-item label="会议议程">
          <el-input v-model="form.remark" type="textarea" />
        </el-form-item>
        <el-form-item label="会议状态">
          <el-select v-model="form.status" placeholder="请选择会议状态">
            <el-option label="草稿箱" value="0"></el-option>
            <el-option label="未开始" value="1"></el-option>
            <el-option label="进行中" value="2"></el-option>
            <el-option label="逾期" value="3"></el-option>
            <el-option label="结束" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveMeeting">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMeetings, createMeeting, updateMeeting, deleteMeeting } from "@/api/test/demo";
import moment from 'moment';

export default {
  data() {
    return {
      meetings: [],
      meetingsLoaded: false,
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: null,
        createUser: null,
        createDept: null,
        createTime: null,
        updateUser: null,
        updateTime: null,
        status: null,
        isDeleted: null,
        tenantId: null,
        title: '',
        attach: '',
        mstartTime: '',
        medTime: '',
        maddress: '',
        contacter: '',
        contactWay: '',
        remark: '',
      },
    };
  },
  methods: {
    fetchMeetings() {
      getMeetings().then(response => {
        this.meetings = response.data.data;
        this.meetingsLoaded = true;
      }).catch(_ => { // eslint-disable-line no-unused-vars
        this.$message.error('获取会议列表失败');
        this.meetingsLoaded = true;
      });
    },
    openAddDialog() {
      this.dialogTitle = '新增会议';
      this.form = {
        id: null,
        createUser: null,
        createDept: null,
        createTime: null,
        updateUser: null,
        updateTime: null,
        status: null,
        isDeleted: 0,
        tenantId: null,
        title: '',
        attach: '',
        mstartTime: '',
        medTime: '',
        maddress: '',
        contacter: '',
        contactWay: '',
        remark: '',
      };
      this.dialogVisible = true;
    },
    openEditDialog(meeting) {
      this.dialogTitle = '编辑会议';
      this.form = { ...meeting };
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    saveMeeting() {
      if (this.form.id) {
        updateMeeting(this.form).then(() => {
          this.$message.success('会议更新成功');
          this.fetchMeetings();
          this.closeDialog();
        }).catch(_ => { // eslint-disable-line no-unused-vars
          this.$message.error('操作失败');
        });
      } else {
        createMeeting(this.form).then(() => {
          this.$message.success('会议创建成功');
          this.fetchMeetings();
          this.closeDialog();
        }).catch(_ => { // eslint-disable-line no-unused-vars
          this.$message.error('操作失败');
        });
      }
    },
    deleteMeeting(id) {
      deleteMeeting(id).then(() => {
        this.$message.success('会议删除成功');
        this.fetchMeetings();
      }).catch(_ => { // eslint-disable-line no-unused-vars
        this.$message.error('删除失败');
      });
    },
    formatStatus(row) {
      const statusMap = ['草稿箱', '未开始', '进行中', '逾期', '结束'];
      return statusMap[row.status];
    },
    formatDateTime(row, column) {
      const date = row[column.property];
      return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
    }
  },
  created() {
    this.fetchMeetings();
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
