jest.mock('uuid', () => {
  const originalModule = jest.requireActual('uuid')
  return {
    __esModule: true,
    ...originalModule,
    v4: jest.fn(() => '634b59eb-dc11-48f0-ad46-ca2d85ef2a9d'),
  }
})
