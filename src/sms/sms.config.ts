import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SmsConfig {
  token: string;
  senderName?: string;
  identifierId?: string;
  baseUrl: string;
  callbackBaseUrl?: string;
}

@Injectable()
export class SmsConfigService implements OnModuleInit {
  private config: SmsConfig;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.validateConfig();
  }

  private validateConfig(): void {
    const token = this.configService.get<string>('AFRO_TOKEN');
    const senderName = this.configService.get<string>('AFRO_SENDER_NAME');
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');

    // In development, SMS can be optional (will log instead of sending)
    if (!token && nodeEnv === 'production') {
      throw new Error(
        'SMS configuration error: AFRO_TOKEN environment variable is required in production',
      );
    }

    // If no token provided in development, use dummy config
    if (!token) {
      this.config = {
        token: 'development-token',
        senderName: senderName || 'Tatek Gym',
        identifierId: undefined,
        baseUrl: 'https://api.afromessage.com/api',
        callbackBaseUrl: undefined,
      };
      return;
    }

    // Sender name is optional for beta testing - if not provided, AfroMessage will use default
    // Callback URL is optional - if not provided, status updates won't be received
    const callbackBaseUrl = this.configService.get<string>('AFRO_CALLBACK_BASE_URL');
    
    this.config = {
      token,
      senderName, // Can be undefined for beta testing
      identifierId: this.configService.get<string>('AFRO_IDENTIFIER_ID'),
      baseUrl: 'https://api.afromessage.com/api',
      callbackBaseUrl, // Optional - e.g., https://your-domain.com
    };
  }

  getConfig(): SmsConfig {
    if (!this.config) {
      this.validateConfig();
    }
    return this.config;
  }

  getToken(): string {
    return this.getConfig().token;
  }

  getSenderName(): string | undefined {
    return this.getConfig().senderName;
  }

  getIdentifierId(): string | undefined {
    return this.getConfig().identifierId;
  }

  getBaseUrl(): string {
    return this.getConfig().baseUrl;
  }

  getCallbackBaseUrl(): string | undefined {
    return this.getConfig().callbackBaseUrl;
  }

  getCallbackUrl(path: string): string | undefined {
    const baseUrl = this.getCallbackBaseUrl();
    if (!baseUrl) return undefined;
    // Ensure baseUrl doesn't end with / and path starts with /
    const cleanBase = baseUrl.replace(/\/$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  }
}

