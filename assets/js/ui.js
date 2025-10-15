document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('open');
});
document.getElementById('closeSidebar').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
});
