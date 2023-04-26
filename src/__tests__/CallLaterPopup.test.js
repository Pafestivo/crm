import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CallLaterPopUp from '../components/CallLaterPopUp';
import { updateCustomerOnServer, addScheduleToServer, updateScheduleOnServer ,getCustomerScheduleFromServer } from '../server-requests';

jest.mock('../server-requests', () => ({
  updateCustomerOnServer: jest.fn(),
  addScheduleToServer: jest.fn(),
  updateScheduleOnServer: jest.fn(),
  getCustomerScheduleFromServer: jest.fn()
}));

describe('handle schedules properly', () => {

  const user = userEvent.setup();
  const customer = { 
    id: 1, 
    name: 'Test Customer', 
    email: 'test@example.com', 
    phone: '0523453336', 
    status: 'Pick a status'
  };

  test('add schedule properly', async () => {
    render(
      <CallLaterPopUp
        setLoading={jest.fn()}
        customer={customer}
        handleStatusUpdate={jest.fn()}
        setCallLater={jest.fn()}
        setSchedules={jest.fn()}
        schedule={null}
        edit={false}
        isMainPage={true}
      />
    );
    await waitFor(async () => {

      const dateField = screen.getByTestId('date-field');
      const timeField = screen.getByTestId('time-field');
      
      await user.type(dateField, '4023-04-28');
      await user.type(timeField, '08:33 AM');
    })

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    expect(updateCustomerOnServer).toHaveBeenCalled();
    expect(addScheduleToServer).toHaveBeenCalled();
  });

  test('edit schedule properly', async () => {
    const schedule = {
      id: 1,
      date: '04/27/23',
      time: '08:33',
    }
    render(
      <CallLaterPopUp
        setLoading={jest.fn()}
        customer={customer}
        handleStatusUpdate={jest.fn()}
        setCallLater={jest.fn()}
        setSchedules={jest.fn()}
        schedule={schedule}
        edit={true}
        isMainPage={false}
      />
    );
    await waitFor(async () => {

      const dateField = screen.getByTestId('date-field');
      const timeField = screen.getByTestId('time-field');
      
      await user.type(dateField, '4023-04-28');
      await user.type(timeField, '08:33 AM');
    })

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    expect(updateScheduleOnServer).toHaveBeenCalledWith(1, '04/28/23', '08:33');
    expect(getCustomerScheduleFromServer).toHaveBeenCalledWith(1);
  });
});

