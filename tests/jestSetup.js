/* eslint-env jest */
/* eslint import/no-extraneous-dependencies: 0 */

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';

// React 16 Enzyme adapter required
Enzyme.configure({ adapter: new Adapter() });

// Mock out _.debounce with a pass-through function because debounce is not
// compatible with jest.runAllTimers. This removes the timeout function of debounce
// when running tests.
jest.mock('lodash.debounce', () => fn => fn);

global.shallow = shallow;
global.mount = mount;
global.fetch = fetch;
