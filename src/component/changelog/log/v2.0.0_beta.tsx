import LogSection from '../LogSection';

export function v2_0_0_beta() {
  return (
    <>
      <LogSection version='v2.0.0 beta' publishDate='03/18/2022'>
        <ul>
          <li>Refactoring code by <i>ReactJS</i>, <i>Material UI</i>, and <i>NestJS</i>.</li>
          <li>Re-optimize front-end styles.</li>
          <li>Data are no longer stored in JSON files and are put into a database.</li>
          <li>Better responsive design for devices of all scales.</li>
          <li>
            No more operations through commands on Console.
            Now use a series of forms to control and monitor tasks.
          </li>
          <li>Now a task can be removed.</li>
          <li>
            Every "task type" has an expected duration, and the progress bar will reach 100% when duration
            beyonds its expectation.
          </li>
        </ul>
      </LogSection>
    </>
  );
}