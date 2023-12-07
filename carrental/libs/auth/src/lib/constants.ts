export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secretKey',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '1y',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'QbA82HMXWlFVRNcScgqZqDyyl0XzHBbuemp0RUDAk4GFvFv0pZasJur+G1M+NN2rvSX0YIuMmJ+HZChA9lMY6JnslFnWMpc9a9tbf5mR8BeaDwWV/iRJvp3tdH2LygUjX/AdHze5fbzDIToGcCFPYw1dDy2tERa5v4usbysII7M5H2y5JwAPv4SV5PHfHmwJui00L32wrSF1iOAaaHapkYRp708ho0K1/VXwxGnSImpDCYj2l/2ideLoYaCTum7VHSFoqRUVxe6NeUl/JApy4zDUKPjCa4MkvLTCPvquOgyhYKdPGXygJfxv4QWcd32O+svD3o/Z4R8OJCPeqm92fQ=='
};
