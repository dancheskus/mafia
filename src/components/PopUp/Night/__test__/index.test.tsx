import React from 'react';

import { render, screen, user } from 'helpers/testingHelpers/test-utils';

import Night from '..';

describe('<Night />', () => {
  it('should render shooting stage. Next button should navigate to don and sheriff stage. Back button goes back', () => {
    render(<Night />);

    expect(screen.getByText(/в кого стреляет мафия/i)).toBeInTheDocument();

    user.click(screen.getByRole('button', { name: /далее/i }));
    expect(screen.getByText(/дон ищет шерифа/i)).toBeInTheDocument();

    user.click(screen.getByRole('button', { name: /далее/i }));
    expect(screen.getByText(/шериф ищет черных игроков/i)).toBeInTheDocument();

    user.click(screen.getByTestId(/backToDonTimeButton/i));
    expect(screen.getByText(/дон ищет шерифа/i)).toBeInTheDocument();

    user.click(screen.getByTestId(/backToShootingButton/i));
    expect(screen.getByText(/в кого стреляет мафия/i)).toBeInTheDocument();
  });

  it('should kill "playerToKill" after "День" is pressed if checkForEnd.status is true', () => {});
});
