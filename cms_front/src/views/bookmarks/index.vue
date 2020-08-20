<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Date"
        width="160px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Title"
        min-width="150px"
      >
        <template slot-scope="{ row }">
          <span
            class="link-type"
            @click="handleUpdate(row)"
          >{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            Edit
          </el-button>
          <el-button
            v-if="isAdmin"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Edit"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 100%; padding:0 40px;"
      >
        <el-form-item label=" URL">
          <a
            :href="temp.url"
            style="display:block;white-space:nowrap;overflow:hidden;color:#42b983"
            target="_blank"
          >{{ temp.url }}</a>
        </el-form-item>
        <el-form-item
          label="Title"
          prop="title"
          class="bookmark_title"
        >
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item
          label="Desc"
          prop="desc"
        >
          <el-input
            v-model="temp.desc"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, updateBookmark } from '@/api/bookmark'

export default {
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      temp: {
        id: undefined,
        url: '',
        title: '',
        desc: ''
      },
      dialogFormVisible: false,
      rules: {
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.roles.includes('admin')
    }
  },
  created() {
    this.getList()
  },
  methods: {
    sortChange() {
      this.list = this.list.reverse()
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {}
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { id, title, desc } = this.temp
          updateBookmark({ id, title, desc }).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }
}
</script>
<style>
.el-form-item.is-required.bookmark_title > .el-form-item__label:before {
  margin-left: -12px;
}
</style>
