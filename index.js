function addEventListeners() {
  document.querySelectorAll('.more-btn').forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      closeAllMenus();
      btn.nextElementSibling.style.display = 'block';
    }
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      if (confirm('삭제하시겠습니까?')) {
        btn.closest('.web-item').remove();
        saveSites(); // 삭제 후 저장
      }
    }
  });
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.onclick = function(e) {
      e.stopPropagation();
      editingItem = btn.closest('.web-item');
      const name = editingItem.querySelector('span').innerText;
      const url = editingItem.querySelector('a').href;
      const icon = editingItem.querySelector('img').src;
      document.getElementById('editName').value = name;
      document.getElementById('editURL').value = url;
      document.getElementById('editIcon').value = icon;
      document.getElementById('editModal').style.display = 'flex';
      closeAllMenus();
    }
  });
}

document.getElementById('saveEditBtn').onclick = function() {
  if (!editingItem) return;
  const name = document.getElementById('editName').value.trim();
  const url = document.getElementById('editURL').value.trim();
  const icon = document.getElementById('editIcon').value.trim();
  if (!name || !url) {
    alert('이름과 URL을 입력하세요!');
    return;
  }
  editingItem.querySelector('span').innerText = name;
  editingItem.querySelector('a').href = url;
  editingItem.querySelector('img').src = icon || 'https://cdn-icons-png.flaticon.com/512/565/565547.png';
  editingItem.querySelector('img').alt = name;
  closeEditModal();
  saveSites(); // 수정 후 저장
}
