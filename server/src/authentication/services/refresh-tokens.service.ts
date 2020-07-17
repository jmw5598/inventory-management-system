import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  public async findByRefreshTokenAndUserId(refreshToken: string, userId: number): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({ 
      refreshToken: refreshToken, 
      user: { id: userId }
    });
  }

  public async findNonBlacklistedByUserId(userId: number): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({
      isBlacklisted: false,
      user: { id: userId }
    });
  }

  public async createNewRefreshToken(userId: number): Promise<RefreshToken> {
    const refreshToken: RefreshToken = this.refreshTokenRepository.create({
      refreshToken: uuid(),
      user: { id: userId }
    });
    return this.refreshTokenRepository.save(refreshToken);
  }
}
