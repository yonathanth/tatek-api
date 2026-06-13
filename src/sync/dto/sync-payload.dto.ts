import {
  IsNotEmpty,
  IsArray,
  IsDateString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ServiceSyncDto } from './service-sync.dto';
import { MemberSyncDto } from './member-sync.dto';
import { AttendanceSyncDto } from './attendance-sync.dto';
import { TransactionSyncDto } from './transaction-sync.dto';
import { HealthMetricSyncDto } from './health-metric-sync.dto';
import { StaffSyncDto } from './staff-sync.dto';
import { StaffAttendanceSyncDto } from './staff-attendance-sync.dto';
import { PaymentMethodSyncDto } from './payment-method-sync.dto';

export class SyncPayloadDto {
  @ApiProperty({ example: '2026-05-16T09:03:42.527Z' })
  @IsNotEmpty()
  @IsDateString()
  timestamp: string;

  @ApiProperty({ type: [ServiceSyncDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceSyncDto)
  services: ServiceSyncDto[];

  @ApiProperty({ type: [MemberSyncDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberSyncDto)
  members: MemberSyncDto[];

  @ApiProperty({ type: [AttendanceSyncDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceSyncDto)
  attendance: AttendanceSyncDto[];

  @ApiProperty({ type: [TransactionSyncDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionSyncDto)
  transactions: TransactionSyncDto[];

  @ApiPropertyOptional({
    type: [PaymentMethodSyncDto],
    description:
      'Desktop payment method lookup table used by transaction paymentMethodId values',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodSyncDto)
  paymentMethods?: PaymentMethodSyncDto[];

  @ApiProperty({ type: [HealthMetricSyncDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HealthMetricSyncDto)
  healthMetrics: HealthMetricSyncDto[];

  @ApiPropertyOptional({ type: [StaffSyncDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StaffSyncDto)
  staff?: StaffSyncDto[];

  @ApiPropertyOptional({ type: [StaffAttendanceSyncDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StaffAttendanceSyncDto)
  staffAttendance?: StaffAttendanceSyncDto[];
}
