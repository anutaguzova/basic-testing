// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const myAccount: BankAccount = getBankAccount(50);
    expect(myAccount.getBalance()).toBe(50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => getBankAccount(100).withdraw(200)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const myAccount: BankAccount = getBankAccount(50);
    const accounttoTransfer: BankAccount = getBankAccount(0);
    expect(
      () => myAccount.transfer(60, accounttoTransfer).getBalance() >= 0,
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const myAccount: BankAccount = getBankAccount(50);
    expect(() => myAccount.transfer(50, myAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    // Write your test here
    const myAccount: BankAccount = getBankAccount(50);
    expect(myAccount.deposit(50).getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    // Write your test here
    const myAccount: BankAccount = getBankAccount(100);
    expect(myAccount.withdraw(50).getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const myAccount: BankAccount = getBankAccount(50);
    const accounttoTransfer: BankAccount = getBankAccount(0);
    expect(myAccount.transfer(50, accounttoTransfer).getBalance()).toBe(0);
    expect(accounttoTransfer.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const myAccount: BankAccount = getBankAccount(50);
    const balance = await myAccount.fetchBalance();
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const myAccount: BankAccount = getBankAccount(100);
    await myAccount.synchronizeBalance();
    expect(myAccount.getBalance()).toBeGreaterThanOrEqual(0);
    expect(myAccount.getBalance()).toBeLessThanOrEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const myAccount: BankAccount = getBankAccount(50);
    myAccount.fetchBalance = jest.fn().mockResolvedValueOnce(null);
    await expect(myAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
