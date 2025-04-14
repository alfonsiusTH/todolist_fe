<template>
  <div class="sidebar-container">
    <div class="sidebar-header">
      <div class="logo">
        <img src="../assets/svg/cursor-svgrepo-com.svg" style="width: 30px; height: 50px;" alt="">
      </div>
      <div class="description">
        <span class="first">Do-it</span>
        <span class="second">Add Your Task Now</span>
      </div>
    </div>
    <div class="sidebar-menu-container">
      <ul class="menu-container">
        <li class="nav-link">
          <router-link to="/" class="nav-link" active-class="active">
            <i class="bi bi-clipboard2-data fs-3"></i>
            Your Tasks
          </router-link>
        </li>
        <li class="nav-link">
          <router-link to="/add" class="nav-link" active-class="active">
            <i class="bi bi-folder-plus fs-3"></i>
            Add Tasks
          </router-link>
        </li>
        <li class="nav-link">
          <router-link to="/completed" class="nav-link" active-class="active">
            <i class="bi bi-clipboard-check fs-3"></i>
            Completed Tasks
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponents',
}
</script>

<style scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 280px;
  min-height: 100vh;
  padding: 1em 1%;
  position: fixed;
  background-color: var(--white-color);
}

.sidebar-header {
  display: flex;
  gap: 1.2em;
  padding: 0.5em;
  border-bottom: 3px solid var(--main-color);
  margin-bottom: 2.3em;
}

.description {
  display: flex;
  flex-direction: column;
}

.description .first {
  color: var(--font-color);
}

.description .second {
  color: var(--main-color);
}

.sidebar-menu-container {
  display: flex;
  align-items: center;
}

.menu-container {
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 1em;
  color: var(--font-color);
}

.menu-container li {
  display: flex;
  align-items: center;
}

.menu-container .nav-link {
  text-decoration: none;
  color: var(--font-color);
  display: flex;
  align-items: center;
  gap: 0.5em;
  width: 100%;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.nav-link.active {
  color: var(--main-color);
}

.nav-link.active i {
  color: var(--main-color);
}
</style>
