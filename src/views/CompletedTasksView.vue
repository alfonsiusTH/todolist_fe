<template>
  <div class="d-flex w-100">
    <SidebarComponents />
    <div class="menu">
      <div class="menu-header">
        <span>Good Job!</span>
        <h2>You have completed all your task</h2>
      </div>
      <div class="menu-body">
        <LoadingSpinner v-if="isLoading" />
        <div v-else-if="Array.isArray(tasksData) && tasksData.length === 0" class="no-data">
          <span class="fw-bold fs-4">No Completed Tasks</span>
        </div>
        <div v-else class="d-flex flex-column w-100">
          <div v-for="(completedTasks, index) in tasksData.slice().reverse()" :key="completedTasks.id" class="items">
            <div class="number">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="tasks-name-container">
              <span class="tasks-name">{{ completedTasks.tasks_name }}</span>
            </div>
            <div class="action-button">
              <button class="btn p-0 border-0">
                <i class="bi bi-check-circle-fill fs-5 done-icon"></i>
              </button>
              <router-link :to="{ path:`/detail/${completedTasks.id}`, query: { from: 'completed' } }" class="btn p-0 border-0">
                <i class="bi bi-eye fs-5"></i>
              </router-link>
              <router-link :to="{ path:`/edit/${completedTasks.id}`, query: { from: 'completed' }}" class="btn p-0 border-0">
                <i class="bi bi-pencil fs-5"></i>
              </router-link>
              <button class="btn p-0 border-0" @click="deleteData(completedTasks.id)">
                <i class="bi bi-trash fs-5"></i>
              </button>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarComponents from '@/components/SidebarComponents.vue'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'CompletedTasksView',
  components: {
    SidebarComponents,
    LoadingSpinner
  },
  data() {
    return {
      tasksData: [],
      isLoading: false,
    }
  },
  mounted() {
    this.completedData()
  },
  methods: {
    async completedData() {
      this.isLoading = true
      const header = {
        Accept: 'application/json',
      }

      try {
        await axios
          .get('http://127.0.0.1:8000/api/tasks', {
            headers: header,
          })
          .then((response) => {
            this.tasksData = response.data.data.filter((data) => data.is_completed === 1)
            // console.log(response.data.data.filter((data) => data.is_completed === 1))
            this.isLoading = false
          })
          .catch((err) => console.log(err, 'error to fetch data'))
      } catch (error) {
        console.log(error, 'Error to get data')
      }
    },
    async deleteData(id) {
      this.isLoading = true
      const header = {
        Accept: 'application/json',
      }

      try {
        await axios
          .delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
            headers: header,
          })
          .then((response) => {
            this.tasksData = response.data.tasks
            this.isLoading = false
            this.completedData()
          })
          .catch((err) => console.log(err, 'error to fetch data'))
      } catch (error) {
        console.log(error, 'Error to get data')
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
  width: 100%;
  height: 100vh;
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
  justify-content: center;
  padding: 0 5%;
  position: relative;
  margin-top: 2em;
}

.menu-body .items {
  display: flex;
  align-items: center;
  background-color: var(--white-color);
  width: 100%;
  height: 1em;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1em;
}

.action-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
}

.action-button .done-text {
  cursor: pointer;
  padding: 0.3em;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  color: var(--main-color);
  transition: all 0.3s ease-in-out;
}

.items .number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 20px;
  margin-right: 20px;
  color: var(--white-color);
  border-radius: 50%;
  background-color: var(--main-color);
}

.tasks-name-container {
  display: flex;
  width: 100%;
}

.no-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  min-height: 150px;
  margin-top: 8em;
  background-color: var(--white-color);
  border-radius: 15px;
  box-shadow: -1px 10px 71px -13px rgba(71, 0, 109, 0.67);
  -webkit-box-shadow: -1px 10px 71px -13px rgba(0, 0, 0, 0.67);
  -moz-box-shadow: -1px 10px 71px -13px rgba(0, 0, 0, 0.67);
}

.action-button .done-text:hover {
  background-color: var(--main-color);
  color: var(--white-color);
}

.action-button .done-icon {
  color: var(--green-color);
}

.action-button .btn .bi-eye {
  color: var(--main-color);
}

.action-button .btn .bi-pencil {
  color: var(--main-color);
}

.action-button .btn .bi-trash {
  color: var(--main-color);
}
</style>
