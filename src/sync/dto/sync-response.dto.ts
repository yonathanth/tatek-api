import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SyncResultDto {
  @ApiProperty({ type: [Number] })
  successful: number[];

  @ApiProperty({ type: [Number] })
  failed: number[];
}

export class DetailedSyncResultsDto {
  @ApiPropertyOptional({ type: () => SyncResultDto })
  services?: SyncResultDto;

  @ApiPropertyOptional({ type: () => SyncResultDto })
  members?: SyncResultDto;

  @ApiPropertyOptional({ type: () => SyncResultDto })
  attendance?: SyncResultDto;

  @ApiPropertyOptional({ type: () => SyncResultDto })
  transactions?: SyncResultDto;

  @ApiPropertyOptional({ type: () => SyncResultDto })
  paymentMethods?: SyncResultDto;

  @ApiPropertyOptional({ type: () => SyncResultDto })
  healthMetrics?: SyncResultDto;

  @ApiPropertyOptional({ type: () => SyncResultDto })
  staff?: SyncResultDto;

  @ApiPropertyOptional({ type: () => SyncResultDto })
  staffAttendance?: SyncResultDto;
}

export class SyncResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 2 })
  membersSynced: number;

  @ApiProperty({ example: 3 })
  attendanceSynced: number;

  @ApiProperty({ example: 4 })
  transactionsSynced: number;

  @ApiProperty({ example: 1 })
  paymentMethodsSynced: number;

  @ApiProperty({ example: 5 })
  servicesSynced: number;

  @ApiProperty({ example: 2 })
  healthMetricsSynced: number;

  @ApiProperty({ example: 1 })
  staffSynced: number;

  @ApiProperty({ example: 1 })
  staffAttendanceSynced: number;

  @ApiPropertyOptional({ type: [String] })
  errors?: string[];

  @ApiProperty({ example: '2026-05-16T09:03:42.527Z' })
  timestamp: string;

  @ApiPropertyOptional({ type: () => DetailedSyncResultsDto })
  results?: DetailedSyncResultsDto;
}
