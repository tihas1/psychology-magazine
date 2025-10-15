// ✅ Defensive check to avoid JS errors if elements are missing
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open'); // ✅ Toggle instead of only add
  });
}


if (closeSidebar && sidebar) {
  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}
