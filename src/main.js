import './index.css';
import { store } from './store.js';
import { renderNavbar } from './components/Navbar.js';
import { renderDashboardView } from './components/DashboardView.js';
import { renderCalendarView } from './components/CalendarView.js';
import { renderTheoryPlannerView } from './components/TheoryPlannerView.js';
import { renderLabPlannerView } from './components/LabPlannerView.js';
import { renderExcelView } from './components/ExcelView.js';
import { renderSettingsView } from './components/SettingsView.js';
import {
  renderConfirmModal,
  openTheoryModal,
  openLabModal,
  openNightPYQModal,
} from './components/Modals.js';
import { openBadgesModal } from './components/BadgesModal.js';
import { openTaskModal } from './components/TaskModal.js';
import { openAuthModal } from './components/AuthModal.js';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root not found in document.');
}

// Build root layout structure
root.innerHTML = `
  <div class="min-h-screen bg-[#0B0B0B] text-white flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
    <div id="navbar-container"></div>
    <main id="main-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 w-full"></main>
    <div id="modal-container"></div>
    <div id="confirm-modal-container"></div>
  </div>
`;

const navbarContainer = document.getElementById('navbar-container');
const mainContent = document.getElementById('main-content');
const modalContainer = document.getElementById('modal-container');
const confirmModalContainer = document.getElementById('confirm-modal-container');

// Actions object passed to views
const actions = {
  setActiveTab: (tab) => store.setActiveTab(tab),
  setSelectedDate: (date) => store.setSelectedDate(date),
  setToggles: (updates) => store.setToggles(updates),
  setExamDates: (updates) => store.setExamDates(updates),
  updateLabExam: (labKey, date, isCompleted) => store.updateLabExam(labKey, date, isCompleted),
  markLabExamCompleted: (labKey, completed) => store.markLabExamCompleted(labKey, completed),
  toggleScheduleItem: (date, itemId) => store.toggleScheduleItem(date, itemId),
  resetDaySchedule: (date) => store.resetDaySchedule(date),

  // Custom Tasks
  addCustomTask: (task) => store.addCustomTask(task),
  updateCustomTask: (id, updates) => store.updateCustomTask(id, updates),
  deleteCustomTask: (id) => store.deleteCustomTask(id),
  toggleCustomTask: (id) => store.toggleCustomTask(id),
  seedRecommendedSchedule: (date) => store.seedRecommendedSchedule(date),
  clearDayTasks: (date) => store.clearDayTasks(date),

  addTheoryTopic: (topic) => store.addTheoryTopic(topic),
  updateTheoryTopic: (id, updates) => store.updateTheoryTopic(id, updates),
  deleteTheoryTopic: (id) => store.deleteTheoryTopic(id),
  reorderTheoryTopics: (topics) => store.reorderTheoryTopics(topics),
  carryUnfinishedTheoryTopics: (fromDate, toDate) => store.carryUnfinishedTheoryTopics(fromDate, toDate),

  addLabTopic: (topic) => store.addLabTopic(topic),
  updateLabTopic: (id, updates) => store.updateLabTopic(id, updates),
  deleteLabTopic: (id) => store.deleteLabTopic(id),
  reorderLabTopics: (topics) => store.reorderLabTopics(topics),

  exportToExcel: (filename) => store.exportToExcel(filename),
  importFromExcelFile: (file) => store.importFromExcelFile(file),

  saveToFirestore: () => store.saveToFirestore(),
  signOutUser: () => store.signOutUser(),

  showConfirmDialog: (config) => store.showConfirmDialog(config),
  closeConfirmDialog: () => store.closeConfirmDialog(),

  openAddTaskModal: (task = null, defaultDate = null) => {
    openTaskModal(modalContainer, task, defaultDate, actions);
  },
  openAuthModal: (defaultTab = 'login') => {
    openAuthModal(modalContainer, defaultTab);
  },
  openAddTheoryModal: (topic = null, defaultDate = null) => {
    openTheoryModal(modalContainer, topic, defaultDate, actions);
  },
  openAddLabModal: (topic = null, defaultLab = undefined) => {
    openLabModal(modalContainer, topic, defaultLab, actions);
  },
  openNightPYQModal: () => {
    openNightPYQModal(modalContainer, actions);
  },
  openBadgesModal: () => {
    openBadgesModal(modalContainer, store.getState());
  },
};

function renderApp() {
  const state = store.getState();

  // 1. Navbar
  renderNavbar(
    navbarContainer,
    state,
    (tab) => store.setActiveTab(tab),
    () => actions.openAuthModal('login'),
    () => store.exportToExcel(),
    () => openBadgesModal(modalContainer, state),
    () => actions.openAddTaskModal(null, state.selectedDate),
    () => store.signOutUser()
  );

  // 2. Main View
  if (state.activeTab === 'dashboard') {
    renderDashboardView(mainContent, state, actions);
  } else if (state.activeTab === 'calendar') {
    renderCalendarView(mainContent, state, actions);
  } else if (state.activeTab === 'theory') {
    renderTheoryPlannerView(mainContent, state, actions);
  } else if (state.activeTab === 'lab') {
    renderLabPlannerView(mainContent, state, actions);
  } else if (state.activeTab === 'excel') {
    renderExcelView(mainContent, state, actions);
  } else if (state.activeTab === 'settings') {
    renderSettingsView(mainContent, state, actions);
  }

  // 3. Confirm Dialog
  renderConfirmModal(confirmModalContainer, state, actions);
}

// Initial render
renderApp();
window.StudyPlannerLoaded = true;

// Subscribe to state changes
store.subscribe(() => {
  renderApp();
});
