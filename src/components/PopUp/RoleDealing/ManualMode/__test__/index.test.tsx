import React from 'react';

import { render, screen, user } from 'helpers/testingHelpers/test-utils';

import ManualMode from '..';

const resetMode = jest.fn();

describe('<ManualMode />', () => {
  it('should show notification about role selection and disable "ИГРАТЬ" button untill required roles selected.', () => {
    render(<ManualMode resetMode={resetMode} />);

    screen.debug();
  });

  it('should change selection style when clicked on role', () => {});

  it('should disable role button if other player has this role', () => {});

  it('should remember role if selectedPlayer changed', () => {});

  it('', () => {});
});
