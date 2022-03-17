import { SERVER_DOMAIN } from '../env';

module Api {
  /**
   * users
   */
  export const getUserOngoingTask = SERVER_DOMAIN + '/supervisor/users/ongoing_task';
  export const getAllTasks = SERVER_DOMAIN + '/supervisor/users/tasks';

  /**
   * tasks
   */
  export const createTask = SERVER_DOMAIN + '/supervisor/tasks/';
  export const updateOngoingTaskStatus = SERVER_DOMAIN + '/supervisor/tasks/';

  /**
   * task-types
   */
  export const getTaskTypes = SERVER_DOMAIN + '/supervisor/task-types';

  /**
   * subjects
   */
  export const getSubjects = SERVER_DOMAIN + '/supervisor/subjects';
}

export default Api;