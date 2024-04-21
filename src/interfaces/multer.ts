import type { FastifyRequest } from 'fastify';
import type { GetFileName, GetDestination, File } from 'fastify-multer/lib/interfaces';

export interface IMulterLimits {
  fieldNameSize?: number;
  fieldSize?: number;
  fields?: number;
  fileSize?: number;
  files?: number;
  parts?: number;
  headerPairs?: number;
}

export interface IMulterFilter {
  (req: FastifyRequest, file: File): Promise<boolean>;
}

export interface IMulterOptions {
  destination?: string | GetDestination;
  filename?: string | GetFileName;
  filters?: IMulterFilter[];
  limits: IMulterLimits;
}
