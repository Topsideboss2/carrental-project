import { PrismaService } from '@carrental/prisma';
import { Injectable } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class ReportService {
  constructor(private readonly prismaService: PrismaService) {}

  async dashboardReport() {
    const today = new Date();
    const thisWeekStart = new Date();
    thisWeekStart.setDate(today.getDate() - today.getDay()); // Start of the current week (Sunday)
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const thisYearStart = new Date(today.getFullYear(), 0, 1);

    const totalClients = await this.prismaService.user.count();
    const newClientsToday = await this.prismaService.user.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });
    const newClientsThisWeek = await this.prismaService.user.count({
      where: {
        createdAt: {
          gte: thisWeekStart,
        },
      },
    });
    const newClientsThisMonth = await this.prismaService.user.count({
      where: {
        createdAt: {
          gte: thisMonthStart,
        },
      },
    });
    const newClientsThisYear = await this.prismaService.user.count({
      where: {
        createdAt: {
          gte: thisYearStart,
        },
      },
    });

    // Calculate percentage change
    const calculatePercentageChange = (
      previousCount: number,
      currentCount: number
    ) => {
      if (previousCount === 0) {
        return 100; // Handle division by zero
      }
      const change = ((currentCount - previousCount) / previousCount) * 100;
      return change;
    };

    // Determine the status (increase or decrease)
    const getStatus = (percentageChange: number) => {
      if (percentageChange > 0) {
        return 'increase';
      } else if (percentageChange < 0) {
        return 'decrease';
      } else {
        return 'no change';
      }
    };

    const monthlyUsers = await this.getMonthlyUsers();

    const monthlyReservations = await this.getMonthlyReservations();

    return {
      totalClients,
      newClientsToday: {
        clients: newClientsToday,
        percentage: calculatePercentageChange(totalClients, newClientsToday),
        status: getStatus(
          calculatePercentageChange(totalClients, newClientsToday)
        ),
      },
      newClientsThisWeek: {
        clients: newClientsThisWeek,
        percentage: calculatePercentageChange(totalClients, newClientsThisWeek),
        status: getStatus(
          calculatePercentageChange(totalClients, newClientsThisWeek)
        ),
      },
      newClientsThisMonth: {
        clients: newClientsThisMonth,
        percentage: calculatePercentageChange(
          totalClients,
          newClientsThisMonth
        ),
        status: getStatus(
          calculatePercentageChange(totalClients, newClientsThisMonth)
        ),
      },
      newClientsThisYear: {
        clients: newClientsThisYear,
        percentage: calculatePercentageChange(totalClients, newClientsThisYear),
        status: getStatus(
          calculatePercentageChange(totalClients, newClientsThisYear)
        ),
      },
      monthlyUsers,
      monthlyReservations
    };
  }

  async getMonthlyUsers(today = new Date()) {
    const monthlyUsers = [];
    const currentYear = today.getFullYear();

    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(currentYear, month, 1);
      const monthEnd = new Date(currentYear, month + 1, 0);

      const usersInMonth = await this.prismaService.user.count({
        where: {
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      });

      const monthName = monthStart.toLocaleString('en-us', { month: 'long' });
      monthlyUsers.push({
        name: `${monthName} ${currentYear}`,
        users: usersInMonth,
      });
    }
    return monthlyUsers;
  }

  async getMonthlyReservations(today = new Date()) {
    const monthlyReservations = [];
    const currentYear = today.getFullYear();

    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(currentYear, month, 1);
      const monthEnd = new Date(currentYear, month + 1, 0);

      const completedReservationsInMonth =
        await this.prismaService.reservation.count({
          where: {
            status: ReservationStatus.RETURNED,
            createdAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        });

      const rejectedReservationsInMonth =
        await this.prismaService.reservation.count({
          where: {
            status: ReservationStatus.REJECTED,
            createdAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        });

      const canceledReservationsInMonth =
        await this.prismaService.reservation.count({
          where: {
            status: ReservationStatus.CANCELLED,
            createdAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        });

      const processingReservationsInMonth =
        await this.prismaService.reservation.count({
          where: {
            status:
              ReservationStatus.APPROVED ||
              ReservationStatus.COMPLETED ||
              ReservationStatus.DELIVERING ||
              ReservationStatus.PAID,
            createdAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        });

      const monthName = monthStart.toLocaleString('en-us', { month: 'long' });
      monthlyReservations.push({
        name: `${monthName} ${currentYear}`,
        completed: completedReservationsInMonth,
        rejected: rejectedReservationsInMonth,
        cancelled: canceledReservationsInMonth,
        processing: processingReservationsInMonth,
      });
    }
    return monthlyReservations;
  }

  async userReport(userId: string) {
    const totalReservations = await this.prismaService.reservation.count({
      where: {
        userId
      }
    })

    const completeReservations = await this.prismaService.reservation.count({
      where: {
        userId,
        status: ReservationStatus.RETURNED
      }
    })

    const pendingReservations = await this.prismaService.reservation.count({
      where: {
        userId,
        status: ReservationStatus.APPROVED || ReservationStatus.PENDING_PAYMENT || ReservationStatus.PAID || ReservationStatus.DELIVERING
      }
    })

    const canceledReservations = await this.prismaService.reservation.count({
      where: {
        userId,
        status: ReservationStatus.CANCELLED
      }
    })

    const rejectedReservations = await this.prismaService.reservation.count({
      where: {
        status: ReservationStatus.REJECTED
      }
    })

    return {
      totalReservations,
      completeReservations,
      pendingReservations,
      canceledReservations,
      rejectedReservations
    }
  }
}
