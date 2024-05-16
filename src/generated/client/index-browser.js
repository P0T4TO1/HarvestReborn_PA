
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.10.2
 * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
 */
Prisma.prismaVersion = {
  client: "5.10.2",
  engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TicketScalarFieldEnum = {
  id_ticket: 'id_ticket',
  tipo: 'tipo',
  estado: 'estado',
  prioridad: 'prioridad',
  motivo: 'motivo',
  descripcion: 'descripcion',
  fecha_inicio: 'fecha_inicio',
  fecha_cierre: 'fecha_cierre',
  respuesta: 'respuesta',
  id_user: 'id_user'
};

exports.Prisma.TicketComentarioScalarFieldEnum = {
  id_comentario: 'id_comentario',
  id_ticket: 'id_ticket',
  comentario: 'comentario',
  fecha: 'fecha'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  apellidos: 'apellidos',
  email: 'email'
};

exports.Prisma.RespuestasFaqScalarFieldEnum = {
  id_faqRespuesta: 'id_faqRespuesta',
  id_prefrec: 'id_prefrec',
  respuesta: 'respuesta'
};

exports.Prisma.PreguntasFrecuentesScalarFieldEnum = {
  id_prefrec: 'id_prefrec',
  pregunta: 'pregunta',
  tipo: 'tipo'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Tipo = exports.$Enums.Tipo = {
  INCIDENCIA: 'INCIDENCIA',
  PETICION: 'PETICION',
  QUEJA: 'QUEJA',
  RECLAMACION: 'RECLAMACION'
};

exports.Estado = exports.$Enums.Estado = {
  ABIERTO: 'ABIERTO',
  EN_PROCESO: 'EN_PROCESO',
  CERRADO: 'CERRADO'
};

exports.Prioridad = exports.$Enums.Prioridad = {
  BAJA: 'BAJA',
  MEDIA: 'MEDIA',
  ALTA: 'ALTA',
  INMEDIATA: 'INMEDIATA'
};

exports.TipoPregunta = exports.$Enums.TipoPregunta = {
  GENERAL: 'GENERAL',
  CUENTA: 'CUENTA',
  NEGOCIO: 'NEGOCIO',
  CLIENTE: 'CLIENTE',
  DUENONEGOCIO: 'DUENONEGOCIO',
  ORDENES: 'ORDENES',
  PRODUCTOS: 'PRODUCTOS',
  INVENTARIO: 'INVENTARIO',
  CHAT: 'CHAT',
  PUBLICACIONES: 'PUBLICACIONES',
  TECNICO: 'TECNICO'
};

exports.Prisma.ModelName = {
  Ticket: 'Ticket',
  TicketComentario: 'TicketComentario',
  User: 'User',
  RespuestasFaq: 'RespuestasFaq',
  PreguntasFrecuentes: 'PreguntasFrecuentes'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions or Edge Middleware',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)