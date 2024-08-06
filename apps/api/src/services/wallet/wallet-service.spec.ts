import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { DepositWalletDto } from './dto/deposit-wallet.dto';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('WalletController', () => {
  let walletController: WalletController;
  let walletService: WalletService;

  // Mock the WalletService
  const mockWalletService = {
    depositWallet: jest.fn(),
    getWallet: jest.fn(),
    deleteWallet: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: mockWalletService,
        },
      ],
    }).compile();

    walletController = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);
  });

  describe('depositWallet', () => {
    it('should call depositWallet on WalletService and return reference_id', async () => {
      const depositWalletDto: DepositWalletDto = { userId: 1, amount: 100 };
      const mockReferenceId = uuidv4();
      jest.spyOn(walletService, 'depositWallet').mockResolvedValue({ reference_id: mockReferenceId });

      const result = await walletController.depositWallet(depositWalletDto);

      expect(walletService.depositWallet).toHaveBeenCalledWith(depositWalletDto);
      expect(result).toEqual({ reference_id: mockReferenceId });
    });

    it('should handle invalid input (negative amount)', async () => {
      const depositWalletDto: DepositWalletDto = { userId: 1, amount: -100 };
      jest.spyOn(walletService, 'depositWallet').mockRejectedValue(new Error('Invalid amount'));

      await expect(walletController.depositWallet(depositWalletDto)).rejects.toThrow('Invalid amount');
    });

    it('should handle invalid input (zero amount)', async () => {
      const depositWalletDto: DepositWalletDto = { userId: 1, amount: 0 };
      jest.spyOn(walletService, 'depositWallet').mockRejectedValue(new Error('Invalid amount'));

      await expect(walletController.depositWallet(depositWalletDto)).rejects.toThrow('Invalid amount');
    });
  });

  describe('getWallet', () => {
    it('should return the wallet if found', async () => {
      const mockWallet = { userId: 1, balance: 100 };
      jest.spyOn(walletService, 'getWallet').mockResolvedValue(mockWallet);

      const result = await walletController.getWallet(1);

      expect(walletService.getWallet).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockWallet);
    });

    it('should throw NotFoundException if wallet not found', async () => {
      jest.spyOn(walletService, 'getWallet').mockRejectedValue(new NotFoundException('Wallet not found.'));

      await expect(walletController.getWallet(1)).rejects.toThrow(NotFoundException);
    });

    it('should handle invalid userId', async () => {
      const invalidUserId = 'invalid' as unknown as number;
      jest.spyOn(walletService, 'getWallet').mockRejectedValue(new Error('Invalid userId'));

      await expect(walletController.getWallet(invalidUserId)).rejects.toThrow('Invalid userId');
    });
  });

  
});
