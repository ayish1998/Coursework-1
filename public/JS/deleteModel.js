const openDeleteForm = document.getElementsByClassName("delete-btn");
const deleteModals = document.getElementsByClassName("admin-delete-modal");

function openDeleteModal(id) {
    Array.from(deleteModals).forEach((modal) => {
        const modalId = modal.getAttribute("id");
        if (id == modalId) {
            modal.classList.remove("hidden");
            const closeDeleteForm = modal.querySelector(".close-delete-form");
            closeDeleteForm.addEventListener("click", () => {
                closeDeleteModal(id);
            });
        }
    });
}

function closeDeleteModal(id) {
    Array.from(deleteModals).forEach((modal) => {
        const modalId = modal.getAttribute("id");
        if (id == modalId) {
            modal.classList.add("hidden");
        }
    });
}

Array.from(openDeleteForm).forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (event) => {
        const id = event.target.dataset.userId;
        openDeleteModal(id);
    });
});
