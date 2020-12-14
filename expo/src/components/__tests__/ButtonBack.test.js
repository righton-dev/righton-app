/**
 * @format
 */
import React from 'react';
import 'react-native';

import ButtonBack from '../ButtonBack';

import renderer from 'react-test-renderer';

describe('<ButtonBack />', () => {
  let tree;

  beforeEach(() => {
    tree = renderer.create(<ButtonBack />).toJSON();
  });

  it('renders without crashing', () => {
    expect(tree).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
