import { makeAssertion } from '../utils'

export default [
  makeAssertion(
    'table',
    `
    <table>
      <caption>
        Front-end web developer course 2021
      </caption>
      <thead>
        <tr>
          <th scope="col">Person</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Chris</th>
        </tr>
      </tbody>
    </table>
    `,
    'Front-end web developer course 2021'
  ),
  makeAssertion(
    '[aria-labelledby="age"]',
    `
    <table>
      <caption>
        Front-end web developer course 2021
      </caption>
      <thead>
        <tr>
          <th scope="col" id="person">Person</th>
          <th scope="col" id="most-interest-in">Most interest in</th>
          <th scope="col" id="age">Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th aria-labelledby="person">Chris</th>
          <td aria-labelledby="most-interest-in">HTML tables</td>
          <td aria-labelledby="age">22</td>
        </tr>
      </tbody>
    </table>
    `,
    'Age'
  ),
  makeAssertion(
    '[headers="age"]',
    `
    <table>
      <caption>
        Front-end web developer course 2021
      </caption>
      <thead>
        <tr>
          <th scope="col" id="person">Person</th>
          <th scope="col" id="most-interest-in">Most interest in</th>
          <th scope="col" id="age">Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th headers="person">Chris</th>
          <td headers="most-interest-in">HTML tables</td>
          <td headers="age">22</td>
        </tr>
      </tbody>
    </table>
    `,
    '22'
  )
]
