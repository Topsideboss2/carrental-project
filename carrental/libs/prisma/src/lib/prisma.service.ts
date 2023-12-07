/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.setupPrismaMiddleware(); // Call the method to set up the middleware
    await this.$connect();
  }

  private setupPrismaMiddleware() {
    this.$use(async (params, next) => {
      // Check incoming query type
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        // Change to findFirst - you cannot filter
        // by anything except ID / unique with findUnique
        params.action = 'findFirst';
        // Add 'deleted' filter
        // ID filter maintained
        params.args.where['deletedAt'] = null;
      }

      if (params.action === 'findMany') {
        // Find many queries
        if (params.args.where) {
          if (params.args.where.deletedAt === undefined) {
            // Exclude deleted records if they have not been explicitly requested
            params.args.where['deletedAt'] = null;
          }
        } else {
          params.args['where'] = { deletedAt: null };
        }
      }

      // Soft deletes
      if (params.action === 'delete') {
        // Delete queries
        // Change action to an update
        params.action = 'update';
        params.args['data'] = { deletedAt: new Date() };
      }

      return next(params);
    });
  }
}
