/**
 * This function centers a pop-up with a certain id.
 * @param {string} id pop-up id
 */
function centerPopup(id) {
    let popup = document.getElementById(id);
    let popupContainer = document.getElementById('pop-up-container');
    popupContainer.style.display = 'block';
    popup.style.display = 'flex';
    setTimeout(function() {
        popup.classList.add('center-pop-up')
        document.body.style.overflow = 'hidden';
    }, 0);
}


/**
 * This function opens the add-task popup.
 * @param {string} statusId task status ID
 */
function openAddTaskPopup(status) {
    clearForm();
    centerPopup('add-task-pop-up');
    // This should actually change the onsubmit attribute of the form once the form supports it
    let createTaskButton = document.getElementById('create-task-button');
    createTaskButton.setAttribute('onclick', `createTaskFromBoard('${status}'); validateInputs(['input-title', 'input-due-date', 'input-category'])`);
    addInputEventListener('add-task');
    renderAssignedToList();
}


/**
 * This function opens a task in a pop-up.
 * @param {number} taskId 
 */
function openTask(taskId) {
    fillOpenTaskPopup(taskId);
    centerPopup('open-task-pop-up');
}


/**
 * This function fills the pop-up for opening a task using a template.
 * @param {number} taskId 
 */
function fillOpenTaskPopup(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let openTaskPopup = document.getElementById('open-task-pop-up');
    openTaskPopup.setAttribute('onclick', 'doNotClose(event)');
    openTaskPopup.innerHTML = openTaskPopupTemplate(task);
}


/**
 * This function opens a pop-up for selecting where the task should be moved.
 * @param {Event} event 
 * @param {number} taskId 
 */
function openMoveTaskPopup(event, taskId) {
    event.stopPropagation();
    draggedTaskId = taskId;
    centerPopup('move-task-pop-up');
}


/**
 * This function moves a task to a different status (column [or row]) from the pop-up.
 * @param {string} status 
 */
function moveTaskFromPopup(status) {
    removePopup('move-task-pop-up');
    moveTaskToStatus(draggedTaskId, status);
    renderTasks(tasks);
}


/**
 * This function checks the collaborator checkbox in the list of assigned users.
 * @param {number} userId
 * @param {string} idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function checkOrUncheckCollaboratorBox(userId, idPrefix) {
    let collaboratorIndex = temporaryCollaborators.findIndex(collaboratorId => collaboratorId === userId);
    let checkBox = document.getElementById(`${idPrefix}-collaborator-checkbox-${userId}`);
    let collaboratorOption = document.getElementById(`${idPrefix}-collaborator-option-${userId}`);
    if (collaboratorIndex > -1) {
        temporaryCollaborators.splice(collaboratorIndex, 1);
        checkBox.src = 'assets/img/checkbox-icon-unchecked.svg';
    } else {
        checkBox.src = 'assets/img/checkbox-icon-checked-white.svg';
        temporaryCollaborators.push(userId);
    }
    collaboratorOption.classList.toggle('collaborator-focus');
    renderInitalAvatarsLargeInPopup(idPrefix);
}


/**
 * This function renders the large initial avatars below the drop-down list in a pop-up.
 * @param {string} idPrefix idPrefix prefix for selecting the correct element ids, either 'add-task' or 'edit-task'
 */
function renderInitalAvatarsLargeInPopup(idPrefix) {
    let initialAvatarsLargeContainer = document.getElementById(`${idPrefix}-initial-avatars-large-container`);
    initialAvatarsLargeContainer.innerHTML = generateCollaboratorAvatars(getTemporaryCollaborators());
}


/**
 * This functions opens a pop-up for editing a contact.
 * @param {string} contactEMail e-mail address of a contact
 * @param {number} index index of a contact in the contacts array
 */
function editContact(contactEMail, index) {
    let contact = contacts.find(contact => contact.eMail === contactEMail);
    let openEditAddContactPopup = document.getElementById('edit-add-contact-pop-up');
    openEditAddContactPopup.setAttribute('onclick', 'doNotClose(event)');
    openEditAddContactPopup.innerHTML = contactEditForm(contact, index);
    centerPopup('edit-add-contact-pop-up');
}


/**
 * This functions opens a pop-up for adding a contact.
 * @param {string} contactEMail e-mail address of a contact
 * @param {number} index index of a contact in the contacts array
 */
function openAddContactPopup(contactEMail, index) {
    let contact = contacts.find(contact => contact.eMail === contactEMail);
    let openEditAddContactPopup = document.getElementById('edit-add-contact-pop-up');
    openEditAddContactPopup.setAttribute('onclick', 'doNotClose(event)');
    openEditAddContactPopup.innerHTML = addContactForm(contact, index);
    centerPopup('edit-add-contact-pop-up');
}


/**
 * This functions opens a menu from which you can delete or edit a contact.
 * @param {number} index index of a contact in the contacts array
 * @param {string} email e-mail address of a contact
 */
function openMoreMenu(index, email) {
    let screen = document.querySelector('.contacts-content-container');
    document.querySelector('body').style.overflow = 'hidden';
    screen.innerHTML += contactsMoreMenu(index, email);
    animateMoreMenuIn();
    addMoreMenuOverlay();
}


/**
 * This function adds an overlay for the small menu that contains buttons for deleting or editing a contact.
 */
function addMoreMenuOverlay() {
    document.querySelector('body').innerHTML += '<div id="overlay-more-menu" onclick="animateMoreMenuOut()"></div>';
}


/**
 * This function animates the small menu that contains buttons for deleting or editing a contact by sliding it into the window.
 */
function animateMoreMenuIn() {
    document.getElementById('contacts-more-menu').classList.add('animate-more-menu-in');
}


/**
 * This function animates the small menu that contains buttons for deleting or editing a contact by sliding it out of the window.
 */
function animateMoreMenuOut() {
    document.getElementById('contacts-more-menu').classList.remove('animate-more-menu-in');
    document.getElementById('contacts-more-menu').classList.add('animate-more-menu-out');
    setTimeout(removeMoreMenu, 225);
}


/**
 * This function removes the small menu that contains buttons for deleting or editing a contact.
 */
function removeMoreMenu() {
    removeChildByQuerySelectors('.contacts-content-container', '#contacts-more-menu');
    removeChildByQuerySelectors('body', '#overlay-more-menu');
    document.querySelector('body').style.overflow = 'unset';
}


/**
 * This function displays a success message when a contact has been added successfully.
 */
function animateSuccessMessage() {
    document.querySelector('.outer-container').style.overflow = 'hidden';
    document.querySelector('.contacts-success-message').style.display = 'flex';
    document.querySelector('.contacts-success-message').classList.add('animate-success-message')
    setTimeout(removeAnimationSuccessMessage, 1800);
}


/**
 * This function removes the success message that is displayed when a contact has been added successfully.
 */
function removeAnimationSuccessMessage() {
    document.querySelector('.contacts-success-message').classList.remove('animate-success-message')
    document.querySelector('.outer-container').style.overflow = 'unset';
    document.querySelector('.contacts-success-message').style.display = 'none';
}