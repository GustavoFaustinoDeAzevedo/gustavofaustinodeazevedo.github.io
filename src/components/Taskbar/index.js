/**
 * Entry point for Taskbar-related UI components.
 * Default export is the Taskbar component.
 * Named exports include subcomponents for StartMenu, TaskbarItems, Clock, and LanguageSelector.
 */

// re-export default Taskbar component
export { default } from './components/Taskbar'

// named exports for the rest of the utility components
export { default as StartMenu } from './components/StartMenu'
export { default as TaskbarItems } from './components/TaskbarItems'
export { default as Clock } from './components/Clock'
export { default as LanguageSelector } from './components/LanguageSelector'
