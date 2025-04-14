<template>
  <div id="home" class="d-flex w-100">
    <SidebarComponents />
    <div class="menu">
      <div class="menu-header">
        <span>There is your task</span>
        <h2>See your task here</h2>
      </div>
      <div class="menu-body">
        <div v-if="isLoading" class="loading-overlay">
          <LoadingSpinner class="position-absolute" />
        </div>
        <div class="form-container">
          <form class="w-100">
            <label for="name" class="tasks-label">Tasks Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="tasksData.tasks_name"
              disabled
            />

            <label for="description" class="tasks-label">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              rows="4"
              v-model="tasksData.tasks_description"
              disabled
            ></textarea>

            <label for="priority" class="tasks-label">Priority</label>
            <select
              v-model="tasksData.tasks_priority"
              name="priority"
              class="form-control"
              disabled
            >
              <option v-for="(priority, index) in priorities" :key="index" :value="priority">
                {{ priority }}
              </option>
            </select>

            <label for="date" class="tasks-label">Due Date</label>
            <input
              v-model="tasksData.due_date"
              type="date"
              class="form-control"
              id="date"
              disabled
            />
          </form>
        </div>
      </div>
    </div>
    <div class="back-button p-2">
      <button @click="handleBack()" class="btn back-btn bg-danger border-0">
        <i class="bi bi-house-up fs-5 text-white"></i>
      </button>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SidebarComponents from '@/components/SidebarComponents.vue'
import axios from 'axios'

export default {
  name: 'DetailPage',
  components: {
    SidebarComponents,
    LoadingSpinner
  },
  props: ['id'],
  data() {
    return {
      tasksData: {},
      priorities: ['Important', 'Not Really Important', 'Not Important'],
      isLoading : false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.isLoading = true
      const tasksId = this.$route.params.id
      axios
        .get(`http://localhost:8000/api/tasks/${tasksId}`, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((response) => {
          this.tasksData = response.data.data
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async handleBack() {
      const from = this.$route.query.from

      if ( from === 'completed' ) {
        this.$router.push({ path: '/completed' })
      } else {
        this.$router.push({ path: '/' })
      }
    }
  },
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  margin-left: 19em;
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
  height: 82%;
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
</style>
