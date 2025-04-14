<template>
  <div id="home" class="d-flex w-100">
    <SidebarComponents />
    <div class="menu">
      <div class="menu-header">
        <span>Wanna Edit a task?</span>
        <h2>Edit your task here</h2>
      </div>
      <div class="menu-body">
        <div v-if="isLoading" class="loading-overlay">
          <LoadingSpinner class="position-absolute" />
        </div>
        <div class="form-container">
          <form @submit.prevent="updateTasks" class="w-100">
            <label for="name" class="tasks-label">Tasks Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="tasksData.tasks_name"
              required
            />
            <div v-if="!isLoading && isSubmit">
              <div v-if="!tasksData.tasks_name">
                <p class="text-danger">Task Name is required</p>
              </div>
            </div>

            <label for="description" class="tasks-label">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              rows="4"
              v-model="tasksData.tasks_description"
            ></textarea>

            <label for="priority" class="tasks-label">Priority</label>
            <select
              v-model="tasksData.tasks_priority"
              name="priority"
              class="form-control"
              required
            >
              <option v-for="(priority, index) in priorities" :key="index" :value="priority">
                {{ priority }}
              </option>
            </select>
            <div v-if="!isLoading && isSubmit">
              <div v-if="!tasksData.tasks_priority">
                <p class="text-danger">Task Priority is required</p>
              </div>
            </div>

            <label for="date" class="tasks-label">Due Date</label>
            <input
              v-model="tasksData.due_date"
              type="date"
              class="form-control"
              id="date"
              required
            />
            <div v-if="!isLoading && isSubmit">
              <div v-if="!tasksData.due_date">
                <p class="text-danger">Deadline is required</p>
              </div>
            </div>

            <div class="form-button">
              <button type="submit" class="btn update-btn">Update</button>
              <button type="submit" class="btn cancel-btn" @click="handleBack()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <div class="back-button">
        <button @click="handleBack()" class="btn back-btn bg-danger border-0">
          <i class="bi bi-house-up fs-5 text-white"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarComponents from '@/components/SidebarComponents.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import router from '@/router'
import axios from 'axios'

export default {
  name: 'EditPage',
  props: ['id'],
  components: {
    SidebarComponents,
    LoadingSpinner,
  },
  data() {
    return {
      tasksData: {
        tasks_name: '',
        tasks_description: '',
        tasks_priority: '',
        due_date: '',
      },
      originalData: {},
      priorities: ['Important', 'Not Really Important', 'Not Important'],
      isLoading: false,
      isSubmit: false,
    }
  },
  mounted() {
    this.isLoading = true
    this.isSubmit = true
    const tasksId = this.$route.params.id
    axios
      .get('http://127.0.0.1:8000/api/tasks/' + tasksId, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        this.tasksData = response.data.data
        this.originalData = { ...response.data.data }
        this.isLoading = false
        this.isSubmit = false
      })
      .catch((err) => console.log(err, 'error to fetch data'))
  },
  methods: {
    async updateTasks() {
      this.isSubmit = true

      const sameData =
        this.tasksData.tasks_name === this.originalData.tasks_name &&
        this.tasksData.tasks_description === this.originalData.tasks_description &&
        this.tasksData.tasks_priority === this.originalData.tasks_priority &&
        this.tasksData.due_date === this.originalData.due_date

      if (sameData) {
        this.isSubmit = false
        alert('No changes made')
        return
      }

      this.isLoading = true
      const tasksId = this.$route.params.id
      const header = {
        Accept: 'application/json',
      }
      try {
        await axios
          .put('http://127.0.0.1:8000/api/tasks/' + tasksId, this.tasksData, {
            headers: header,
          })
          .then((response) => {
            this.tasksData = response.data.tasks
            this.handleBack()
            this.isLoading = false
            this.isSubmit = false
          })
          .catch((err) => console.log(err, 'error to update data'))
      } catch (error) {
        console.log(error, 'Error to update data')
      }
    },
    async handleBack() {
      const from = this.$route.query.from

      if (from === 'completed') {
        this.$router.push({ path: '/completed' })
      } else {
        this.$router.push({ path: '/' })
      }
    },
  },
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  margin-left: 19em;
  z-index: 1;
  width: 100%;
  background: var(--main-color);
}

.menu-header {
  display: flex;
  flex-direction: column;
  padding: 2em 5%;
  line-height: 1.5em;
  color: var(--white-color);
}

.menu-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 65vh;
  justify-content: center;
  padding: 0 5%;
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 10;
  left: 50;
  width: 45%;
  height: 92%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 1em 4%;
  width: 50%;
  background-color: var(--white-color);
  border-radius: 10px;
  box-shadow: -1px 10px 71px -13px rgba(71, 0, 109, 0.67);
  -webkit-box-shadow: -1px 10px 71px -13px rgba(0, 0, 0, 0.67);
}

.form-container textarea {
  resize: none;
}

.tasks-label {
  color: var(--font-color);
  margin: 0.5em 0;
}

.form-button {
  margin-top: 1em;
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 0.5em;
}

.form-button .update-btn {
  background-color: var(--green-color);
  color: var(--white-color);
}

.form-button .cancel-btn {
  background-color: var(--red-color);
  color: var(--white-color);
}

.back-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  border: none;
}
</style>
