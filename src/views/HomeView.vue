<template>
  <div id="home" class="d-flex w-100">
    <SidebarComponents />
    <div class="menu">
      <div class="menu-header">
        <span>Your main focus</span>
        <h2>Don't forget your task</h2>
        <br />
        <router-link
          to="/add"
          class="menu-body text-decoration-none nav-link"
          active-class="active"
        >
          <div class="dot-icon">
            <span class="dot-1"></span>
            <span class="dot-2"></span>
            <span class="dot-3"></span>
          </div>
          <span class="btn add-btn">Add your tasks</span>
          <i class="bi bi-plus-circle fs-5 add-icon"></i>
          <i class="bi bi-table fs-5 table-icon"></i>
        </router-link>
      </div>
      <div class="menu-inner-body">
        <LoadingSpinner v-if="isLoading" />
        <div v-else-if="Array.isArray(tasksData) && tasksData.length === 0" class="menu-items-no-data">
          <span class="fw-bold fs-4">No Tasks</span>
        </div>
        <div v-else class="w-100 mt-2">
          <div v-for="(data, index) in tasksData.slice().reverse()" :key="data.id" class="menu-items-data">
            <div class="no">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="tasks-name-container">
              <span class="tasks-name">{{ data.tasks_name }}</span>
            </div>
            <div class="action-button">
              <button type="submit" name="done" class="done-tasks btn p-0 border-0" @click="markAsDone(data.id)">
                <span class="done-text">Done</span>
              </button>
              <router-link :to="'/detail/' + data.id" class="btn p-0 border-0">
                <i class="bi bi-eye fs-5"></i>
              </router-link>
              <router-link class="btn p-0 border-0" :to="'/edit/' + data.id">
                <i class="bi bi-pencil fs-5"></i>
              </router-link>
              <button class="btn p-0 border-0" @click="deleteData(data.id)">
                <i class="bi bi-trash fs-5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SidebarComponents from '@/components/SidebarComponents.vue'
import router from '@/router'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    SidebarComponents,
    LoadingSpinner,
  },
  data() {
    return {
      tasksData: [],
      isLoading: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
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
            // console.log(response.data.tasks.filter((data) => data.is_completed === 0))
            this.tasksData = response.data.data.filter((data) => data.is_completed === 0)
            this.isLoading = false
          })
          .catch((err) => console.log(err, 'error to fetch data'))
      } catch (error) {
        console.log(error, 'Error to get data')
      }
    },
    async markAsDone(id) {
      const header = {
        Accept: 'application/json',
      }
      try {
        await axios
          .put(`http://127.0.0.1:8000/api/tasks/${id}/done`, {
            headers: header,
          })
          .then((response) => {
            // console.log(response.data.tasks.filter((data) => data.is_completed === 1))
            this.tasksData = response.data.tasks
            router.push({
              path: '/completed',
            })
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
            this.getData()
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
  align-items: center;
  justify-content: center;
  padding: 0 2%;
  width: 100%;
  position: relative;
}

.menu-body:active span {
  background-color: var(--white-color);
  color: var(--font-color);
  border: none;
}

.menu-body .add-btn {
  background-color: var(--white-color);
  padding: 0.6em 9%;
  text-align: start;
  width: 100%;
  color: var(--font-color);
}

.menu-body .add-icon {
  position: absolute;
  z-index: 1;
  right: 9%;
  cursor: pointer;
  color: var(--main-color);
}

.menu-body .table-icon {
  position: absolute;
  right: 5%;
  cursor: pointer;
  color: var(--main-color);
}

.menu-body .dot-icon .dot-1 {
  content: '';
  display: inline-block;
  position: absolute;
  top: 40%;
  left: 4%;
  width: 10px;
  height: 10px;
  background-color: var(--rounded-one);
  font-size: 50px;
  border-radius: 50%;
}

.menu-body .dot-icon .dot-2 {
  content: '';
  display: inline-block;
  position: absolute;
  top: 40%;
  left: 6%;
  width: 10px;
  height: 10px;
  background-color: var(--rounded-two);
  font-size: 50px;
  border-radius: 50%;
  font-size: 50px;
}

.menu-body .dot-icon .dot-3 {
  content: '';
  display: inline-block;
  position: absolute;
  top: 40%;
  left: 8%;
  width: 10px;
  height: 10px;
  background-color: var(--rounded-three);
  font-size: 50px;
  border-radius: 50%;
  font-size: 50px;
}

.menu-inner-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 10%;
}

.menu-items-no-data {
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

.menu-items-data {
  display: flex;
  align-items: center;
  background-color: var(--white-color);
  height: 1em;
  padding: 1.5rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 5px;
}

.menu-items-data .no {
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

.action-button .done-text:hover {
  background-color: var(--main-color);
  color: var(--white-color);
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
