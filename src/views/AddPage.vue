<template>
  <div class="add-page d-flex w-100">
    <SidebarComponents />
    <div class="menu">
      <div class="menu-header">
        <span>Wanna add a task?</span>
        <h2>Add your task here</h2>
      </div>
      <div class="menu-body">
        <div class="form-container">
          <form v-on:submit.prevent class="w-100">
            <label for="name" class="tasks-label">Tasks Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Task Name"
              v-model="tasksData.tasks_name"
              required
            />
            <div v-if="isSubmit">
              <div v-if="!tasksData.tasks_name">
                <p class="text-danger">Task Name is required</p>
              </div>
            </div>

            <label for="description" class="tasks-label">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              placeholder="Description"
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
              <!-- <option value="Important">Important</option>
              <option value="Not Really Important">Not Really Important</option>
              <option value="Not Important">Not Important</option> -->
              <option value="" selected disabled hidden>Select Priority</option>
              <option v-for="(priority, index) in priorities" :key="index" :value="priority">
                {{ priority }}
              </option>
            </select>
            <div v-if="isSubmit">
              <div v-if="!tasksData.tasks_priority">
                <p class="text-danger">Task Priority is required</p>
              </div>
            </div>

            <label for="date" class="tasks-label">Date</label>
            <input
              v-model="tasksData.due_date"
              type="date"
              class="form-control"
              id="date"
              required
            />
            <div v-if="isSubmit">
              <div v-if="!tasksData.due_date">
                <p class="text-danger">Deadline is required</p>
              </div>
            </div>

            <div class="form-button">
              <button type="submit" class="btn add-btn" @click="submitData()">Add Task</button>
              <router-link to="/" class="text-decoration-none">
                <button type="submit" class="btn cancel-btn">Cancel</button>
              </router-link>
            </div>
          </form>
        </div>
      </div>
      <div class="back-button">
        <router-link to="/" class="btn back-btn bg-danger border-0">
          <i class="bi bi-house-up fs-5 text-white"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarComponents from '@/components/SidebarComponents.vue'
import router from '@/router'
import axios from 'axios'

export default {
  name: 'AddPage',
  components: {
    SidebarComponents,
  },
  data() {
    return {
      tasksData: {
        tasks_name: '',
        tasks_description: '',
        tasks_priority: '',
        due_date: '',
      },
      isSubmit: false,
      priorities: ['Important', 'Not Really Important', 'Not Important'],
    }
  },
  methods: {
    async submitData() {
      this.isSubmit = true
      const header = {
        Accept: 'application/json',
      }

      try {
        await axios
          .post('http://127.0.0.1:8000/api/tasks', this.tasksData, {
            headers: header,
          })
          .then((response) => {
            this.tasksData = {
              ...response.data.data,
            }
            // console.log(this.tasksData.tasks);
            router.push({
              path: '/',
            })
            this.isSubmit = false
          })
          .catch((error) => console.log(error.response.data, 'error to get data'))
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

.form-button .add-btn {
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
