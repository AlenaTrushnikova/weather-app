import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';

configure({ adapter: new Adapter() });

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

beforeAll(() => {
  App.prototype.componentDidMount = () => {
    // can omit or add custom logic
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test("get user's current location", () => {
  const app = shallow(<App />);
  app.instance().fetchUserLocation({
    lat: Number.MAX_SAFE_INTEGER,
    long: Number.MAX_SAFE_INTEGER,
  });
  expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
});

test("get user's current location not called", () => {
  const app = shallow(<App />);
  app.instance().fetchUserLocation({
    lat: 1,
    long: 1,
  });
  expect(mockGeolocation.getCurrentPosition).not.toHaveBeenCalled();
});
