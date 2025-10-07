import type { LogObject } from 'consola'
import type { NullableMappedPosition } from 'source-map'

export interface LogData {
  logObject: LogObject
  trace?: NullableMappedPosition
}
