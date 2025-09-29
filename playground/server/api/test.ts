export default defineEventHandler(() => {
  const { logger } = useNuxtLogger()

  logger.level = Number.POSITIVE_INFINITY

  // Level NEGATIVE_INFINITY
  logger.silent('server silent')

  // Level 0
  logger.fatal('server fatal')
  logger.error('server error')

  // Level 1
  logger.warn('server warn')

  // Level 2
  logger.log('server log')

  // Level 3
  logger.success('server success')
  logger.fail('server fail')
  logger.ready('server ready')
  logger.start('server start')
  logger.info('server info')

  // Level 4
  logger.debug('server debug')

  // Level 5
  logger.trace('server trace')

  // Level POSITIVE_INFINITY
  logger.verbose('server verbose')

  return 'Test'
})
