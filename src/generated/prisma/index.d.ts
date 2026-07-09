
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model ContactMessage
 * 
 */
export type ContactMessage = $Result.DefaultSelection<Prisma.$ContactMessagePayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model PlanFeature
 * 
 */
export type PlanFeature = $Result.DefaultSelection<Prisma.$PlanFeaturePayload>
/**
 * Model NewsPost
 * 
 */
export type NewsPost = $Result.DefaultSelection<Prisma.$NewsPostPayload>
/**
 * Model Race
 * 
 */
export type Race = $Result.DefaultSelection<Prisma.$RacePayload>
/**
 * Model Testimonial
 * 
 */
export type Testimonial = $Result.DefaultSelection<Prisma.$TestimonialPayload>
/**
 * Model Coach
 * 
 */
export type Coach = $Result.DefaultSelection<Prisma.$CoachPayload>
/**
 * Model Athlete
 * 
 */
export type Athlete = $Result.DefaultSelection<Prisma.$AthletePayload>
/**
 * Model HomeSetting
 * 
 */
export type HomeSetting = $Result.DefaultSelection<Prisma.$HomeSettingPayload>
/**
 * Model HeroSlide
 * 
 */
export type HeroSlide = $Result.DefaultSelection<Prisma.$HeroSlidePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  COACH: 'COACH',
  MEMBER: 'MEMBER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PlanCategory: {
  RUNNING: 'RUNNING',
  TRIATLON: 'TRIATLON'
};

export type PlanCategory = (typeof PlanCategory)[keyof typeof PlanCategory]


export const NewsCategory: {
  RESULTADOS: 'RESULTADOS',
  NOTICIAS: 'NOTICIAS',
  ENTRENAMIENTO: 'ENTRENAMIENTO',
  COMUNIDAD: 'COMUNIDAD'
};

export type NewsCategory = (typeof NewsCategory)[keyof typeof NewsCategory]


export const RaceType: {
  TRIATLON: 'TRIATLON',
  DUATLON: 'DUATLON',
  ACUATLON: 'ACUATLON',
  RUNNING: 'RUNNING',
  CICLISMO: 'CICLISMO',
  NATACION: 'NATACION'
};

export type RaceType = (typeof RaceType)[keyof typeof RaceType]


export const RaceStatus: {
  UPCOMING: 'UPCOMING',
  REGISTRATION_OPEN: 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED: 'REGISTRATION_CLOSED',
  FINISHED: 'FINISHED'
};

export type RaceStatus = (typeof RaceStatus)[keyof typeof RaceStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PlanCategory = $Enums.PlanCategory

export const PlanCategory: typeof $Enums.PlanCategory

export type NewsCategory = $Enums.NewsCategory

export const NewsCategory: typeof $Enums.NewsCategory

export type RaceType = $Enums.RaceType

export const RaceType: typeof $Enums.RaceType

export type RaceStatus = $Enums.RaceStatus

export const RaceStatus: typeof $Enums.RaceStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactMessage`: Exposes CRUD operations for the **ContactMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactMessages
    * const contactMessages = await prisma.contactMessage.findMany()
    * ```
    */
  get contactMessage(): Prisma.ContactMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planFeature`: Exposes CRUD operations for the **PlanFeature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanFeatures
    * const planFeatures = await prisma.planFeature.findMany()
    * ```
    */
  get planFeature(): Prisma.PlanFeatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsPost`: Exposes CRUD operations for the **NewsPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsPosts
    * const newsPosts = await prisma.newsPost.findMany()
    * ```
    */
  get newsPost(): Prisma.NewsPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.race`: Exposes CRUD operations for the **Race** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Races
    * const races = await prisma.race.findMany()
    * ```
    */
  get race(): Prisma.RaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testimonial`: Exposes CRUD operations for the **Testimonial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Testimonials
    * const testimonials = await prisma.testimonial.findMany()
    * ```
    */
  get testimonial(): Prisma.TestimonialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.coach`: Exposes CRUD operations for the **Coach** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Coaches
    * const coaches = await prisma.coach.findMany()
    * ```
    */
  get coach(): Prisma.CoachDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.athlete`: Exposes CRUD operations for the **Athlete** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Athletes
    * const athletes = await prisma.athlete.findMany()
    * ```
    */
  get athlete(): Prisma.AthleteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.homeSetting`: Exposes CRUD operations for the **HomeSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HomeSettings
    * const homeSettings = await prisma.homeSetting.findMany()
    * ```
    */
  get homeSetting(): Prisma.HomeSettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.heroSlide`: Exposes CRUD operations for the **HeroSlide** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HeroSlides
    * const heroSlides = await prisma.heroSlide.findMany()
    * ```
    */
  get heroSlide(): Prisma.HeroSlideDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    ContactMessage: 'ContactMessage',
    Plan: 'Plan',
    PlanFeature: 'PlanFeature',
    NewsPost: 'NewsPost',
    Race: 'Race',
    Testimonial: 'Testimonial',
    Coach: 'Coach',
    Athlete: 'Athlete',
    HomeSetting: 'HomeSetting',
    HeroSlide: 'HeroSlide'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "contactMessage" | "plan" | "planFeature" | "newsPost" | "race" | "testimonial" | "coach" | "athlete" | "homeSetting" | "heroSlide"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      ContactMessage: {
        payload: Prisma.$ContactMessagePayload<ExtArgs>
        fields: Prisma.ContactMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findFirst: {
            args: Prisma.ContactMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findMany: {
            args: Prisma.ContactMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          create: {
            args: Prisma.ContactMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          createMany: {
            args: Prisma.ContactMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          delete: {
            args: Prisma.ContactMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          update: {
            args: Prisma.ContactMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          deleteMany: {
            args: Prisma.ContactMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          upsert: {
            args: Prisma.ContactMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          aggregate: {
            args: Prisma.ContactMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactMessage>
          }
          groupBy: {
            args: Prisma.ContactMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      PlanFeature: {
        payload: Prisma.$PlanFeaturePayload<ExtArgs>
        fields: Prisma.PlanFeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFeatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFeatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          findFirst: {
            args: Prisma.PlanFeatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFeatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          findMany: {
            args: Prisma.PlanFeatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>[]
          }
          create: {
            args: Prisma.PlanFeatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          createMany: {
            args: Prisma.PlanFeatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanFeatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>[]
          }
          delete: {
            args: Prisma.PlanFeatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          update: {
            args: Prisma.PlanFeatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          deleteMany: {
            args: Prisma.PlanFeatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanFeatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanFeatureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>[]
          }
          upsert: {
            args: Prisma.PlanFeatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanFeaturePayload>
          }
          aggregate: {
            args: Prisma.PlanFeatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanFeature>
          }
          groupBy: {
            args: Prisma.PlanFeatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanFeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanFeatureCountArgs<ExtArgs>
            result: $Utils.Optional<PlanFeatureCountAggregateOutputType> | number
          }
        }
      }
      NewsPost: {
        payload: Prisma.$NewsPostPayload<ExtArgs>
        fields: Prisma.NewsPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>
          }
          findFirst: {
            args: Prisma.NewsPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>
          }
          findMany: {
            args: Prisma.NewsPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>[]
          }
          create: {
            args: Prisma.NewsPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>
          }
          createMany: {
            args: Prisma.NewsPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>[]
          }
          delete: {
            args: Prisma.NewsPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>
          }
          update: {
            args: Prisma.NewsPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>
          }
          deleteMany: {
            args: Prisma.NewsPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>[]
          }
          upsert: {
            args: Prisma.NewsPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsPostPayload>
          }
          aggregate: {
            args: Prisma.NewsPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsPost>
          }
          groupBy: {
            args: Prisma.NewsPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsPostCountArgs<ExtArgs>
            result: $Utils.Optional<NewsPostCountAggregateOutputType> | number
          }
        }
      }
      Race: {
        payload: Prisma.$RacePayload<ExtArgs>
        fields: Prisma.RaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          findFirst: {
            args: Prisma.RaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          findMany: {
            args: Prisma.RaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>[]
          }
          create: {
            args: Prisma.RaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          createMany: {
            args: Prisma.RaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>[]
          }
          delete: {
            args: Prisma.RaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          update: {
            args: Prisma.RaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          deleteMany: {
            args: Prisma.RaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RaceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>[]
          }
          upsert: {
            args: Prisma.RaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RacePayload>
          }
          aggregate: {
            args: Prisma.RaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRace>
          }
          groupBy: {
            args: Prisma.RaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<RaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.RaceCountArgs<ExtArgs>
            result: $Utils.Optional<RaceCountAggregateOutputType> | number
          }
        }
      }
      Testimonial: {
        payload: Prisma.$TestimonialPayload<ExtArgs>
        fields: Prisma.TestimonialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestimonialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestimonialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          findFirst: {
            args: Prisma.TestimonialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestimonialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          findMany: {
            args: Prisma.TestimonialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>[]
          }
          create: {
            args: Prisma.TestimonialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          createMany: {
            args: Prisma.TestimonialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestimonialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>[]
          }
          delete: {
            args: Prisma.TestimonialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          update: {
            args: Prisma.TestimonialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          deleteMany: {
            args: Prisma.TestimonialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestimonialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestimonialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>[]
          }
          upsert: {
            args: Prisma.TestimonialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          aggregate: {
            args: Prisma.TestimonialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestimonial>
          }
          groupBy: {
            args: Prisma.TestimonialGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestimonialGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestimonialCountArgs<ExtArgs>
            result: $Utils.Optional<TestimonialCountAggregateOutputType> | number
          }
        }
      }
      Coach: {
        payload: Prisma.$CoachPayload<ExtArgs>
        fields: Prisma.CoachFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoachFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoachFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>
          }
          findFirst: {
            args: Prisma.CoachFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoachFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>
          }
          findMany: {
            args: Prisma.CoachFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>[]
          }
          create: {
            args: Prisma.CoachCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>
          }
          createMany: {
            args: Prisma.CoachCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CoachCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>[]
          }
          delete: {
            args: Prisma.CoachDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>
          }
          update: {
            args: Prisma.CoachUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>
          }
          deleteMany: {
            args: Prisma.CoachDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoachUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CoachUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>[]
          }
          upsert: {
            args: Prisma.CoachUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoachPayload>
          }
          aggregate: {
            args: Prisma.CoachAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoach>
          }
          groupBy: {
            args: Prisma.CoachGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoachGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoachCountArgs<ExtArgs>
            result: $Utils.Optional<CoachCountAggregateOutputType> | number
          }
        }
      }
      Athlete: {
        payload: Prisma.$AthletePayload<ExtArgs>
        fields: Prisma.AthleteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AthleteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AthleteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          findFirst: {
            args: Prisma.AthleteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AthleteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          findMany: {
            args: Prisma.AthleteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          create: {
            args: Prisma.AthleteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          createMany: {
            args: Prisma.AthleteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AthleteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          delete: {
            args: Prisma.AthleteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          update: {
            args: Prisma.AthleteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          deleteMany: {
            args: Prisma.AthleteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AthleteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AthleteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>[]
          }
          upsert: {
            args: Prisma.AthleteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AthletePayload>
          }
          aggregate: {
            args: Prisma.AthleteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAthlete>
          }
          groupBy: {
            args: Prisma.AthleteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AthleteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AthleteCountArgs<ExtArgs>
            result: $Utils.Optional<AthleteCountAggregateOutputType> | number
          }
        }
      }
      HomeSetting: {
        payload: Prisma.$HomeSettingPayload<ExtArgs>
        fields: Prisma.HomeSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HomeSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HomeSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>
          }
          findFirst: {
            args: Prisma.HomeSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HomeSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>
          }
          findMany: {
            args: Prisma.HomeSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>[]
          }
          create: {
            args: Prisma.HomeSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>
          }
          createMany: {
            args: Prisma.HomeSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HomeSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>[]
          }
          delete: {
            args: Prisma.HomeSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>
          }
          update: {
            args: Prisma.HomeSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>
          }
          deleteMany: {
            args: Prisma.HomeSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HomeSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HomeSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>[]
          }
          upsert: {
            args: Prisma.HomeSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeSettingPayload>
          }
          aggregate: {
            args: Prisma.HomeSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHomeSetting>
          }
          groupBy: {
            args: Prisma.HomeSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<HomeSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.HomeSettingCountArgs<ExtArgs>
            result: $Utils.Optional<HomeSettingCountAggregateOutputType> | number
          }
        }
      }
      HeroSlide: {
        payload: Prisma.$HeroSlidePayload<ExtArgs>
        fields: Prisma.HeroSlideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HeroSlideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HeroSlideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          findFirst: {
            args: Prisma.HeroSlideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HeroSlideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          findMany: {
            args: Prisma.HeroSlideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>[]
          }
          create: {
            args: Prisma.HeroSlideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          createMany: {
            args: Prisma.HeroSlideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HeroSlideCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>[]
          }
          delete: {
            args: Prisma.HeroSlideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          update: {
            args: Prisma.HeroSlideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          deleteMany: {
            args: Prisma.HeroSlideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HeroSlideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HeroSlideUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>[]
          }
          upsert: {
            args: Prisma.HeroSlideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HeroSlidePayload>
          }
          aggregate: {
            args: Prisma.HeroSlideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHeroSlide>
          }
          groupBy: {
            args: Prisma.HeroSlideGroupByArgs<ExtArgs>
            result: $Utils.Optional<HeroSlideGroupByOutputType>[]
          }
          count: {
            args: Prisma.HeroSlideCountArgs<ExtArgs>
            result: $Utils.Optional<HeroSlideCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    contactMessage?: ContactMessageOmit
    plan?: PlanOmit
    planFeature?: PlanFeatureOmit
    newsPost?: NewsPostOmit
    race?: RaceOmit
    testimonial?: TestimonialOmit
    coach?: CoachOmit
    athlete?: AthleteOmit
    homeSetting?: HomeSettingOmit
    heroSlide?: HeroSlideOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    features: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | PlanCountOutputTypeCountFeaturesArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountFeaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanFeatureWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    sessionVersion: number | null
  }

  export type UserSumAggregateOutputType = {
    sessionVersion: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    phone: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    sessionVersion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    phone: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    sessionVersion: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    passwordHash: number
    phone: number
    role: number
    isActive: number
    sessionVersion: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    sessionVersion?: true
  }

  export type UserSumAggregateInputType = {
    sessionVersion?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    phone?: true
    role?: true
    isActive?: true
    sessionVersion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    phone?: true
    role?: true
    isActive?: true
    sessionVersion?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    passwordHash?: true
    phone?: true
    role?: true
    isActive?: true
    sessionVersion?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    passwordHash: string | null
    phone: string | null
    role: $Enums.Role
    isActive: boolean
    sessionVersion: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    phone?: boolean
    role?: boolean
    isActive?: boolean
    sessionVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    phone?: boolean
    role?: boolean
    isActive?: boolean
    sessionVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    phone?: boolean
    role?: boolean
    isActive?: boolean
    sessionVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    passwordHash?: boolean
    phone?: boolean
    role?: boolean
    isActive?: boolean
    sessionVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "passwordHash" | "phone" | "role" | "isActive" | "sessionVersion" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      passwordHash: string | null
      phone: string | null
      role: $Enums.Role
      isActive: boolean
      sessionVersion: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly sessionVersion: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model ContactMessage
   */

  export type AggregateContactMessage = {
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  export type ContactMessageMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    message: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type ContactMessageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    message: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type ContactMessageCountAggregateOutputType = {
    id: number
    name: number
    email: number
    message: number
    read: number
    createdAt: number
    _all: number
  }


  export type ContactMessageMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    read?: true
    createdAt?: true
  }

  export type ContactMessageMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    read?: true
    createdAt?: true
  }

  export type ContactMessageCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    read?: true
    createdAt?: true
    _all?: true
  }

  export type ContactMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessage to aggregate.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactMessages
    **/
    _count?: true | ContactMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMessageMaxAggregateInputType
  }

  export type GetContactMessageAggregateType<T extends ContactMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateContactMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactMessage[P]>
      : GetScalarType<T[P], AggregateContactMessage[P]>
  }




  export type ContactMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactMessageWhereInput
    orderBy?: ContactMessageOrderByWithAggregationInput | ContactMessageOrderByWithAggregationInput[]
    by: ContactMessageScalarFieldEnum[] | ContactMessageScalarFieldEnum
    having?: ContactMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactMessageCountAggregateInputType | true
    _min?: ContactMessageMinAggregateInputType
    _max?: ContactMessageMaxAggregateInputType
  }

  export type ContactMessageGroupByOutputType = {
    id: string
    name: string
    email: string
    message: string
    read: boolean
    createdAt: Date
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  type GetContactMessageGroupByPayload<T extends ContactMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
        }
      >
    >


  export type ContactMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contactMessage"]>

  export type ContactMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contactMessage"]>

  export type ContactMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contactMessage"]>

  export type ContactMessageSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
  }

  export type ContactMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "message" | "read" | "createdAt", ExtArgs["result"]["contactMessage"]>

  export type $ContactMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      message: string
      read: boolean
      createdAt: Date
    }, ExtArgs["result"]["contactMessage"]>
    composites: {}
  }

  type ContactMessageGetPayload<S extends boolean | null | undefined | ContactMessageDefaultArgs> = $Result.GetResult<Prisma.$ContactMessagePayload, S>

  type ContactMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactMessageCountAggregateInputType | true
    }

  export interface ContactMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactMessage'], meta: { name: 'ContactMessage' } }
    /**
     * Find zero or one ContactMessage that matches the filter.
     * @param {ContactMessageFindUniqueArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactMessageFindUniqueArgs>(args: SelectSubset<T, ContactMessageFindUniqueArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactMessageFindUniqueOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactMessageFindFirstArgs>(args?: SelectSubset<T, ContactMessageFindFirstArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany()
     * 
     * // Get first 10 ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactMessageFindManyArgs>(args?: SelectSubset<T, ContactMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactMessage.
     * @param {ContactMessageCreateArgs} args - Arguments to create a ContactMessage.
     * @example
     * // Create one ContactMessage
     * const ContactMessage = await prisma.contactMessage.create({
     *   data: {
     *     // ... data to create a ContactMessage
     *   }
     * })
     * 
     */
    create<T extends ContactMessageCreateArgs>(args: SelectSubset<T, ContactMessageCreateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactMessages.
     * @param {ContactMessageCreateManyArgs} args - Arguments to create many ContactMessages.
     * @example
     * // Create many ContactMessages
     * const contactMessage = await prisma.contactMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactMessageCreateManyArgs>(args?: SelectSubset<T, ContactMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContactMessages and returns the data saved in the database.
     * @param {ContactMessageCreateManyAndReturnArgs} args - Arguments to create many ContactMessages.
     * @example
     * // Create many ContactMessages
     * const contactMessage = await prisma.contactMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContactMessages and only return the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContactMessage.
     * @param {ContactMessageDeleteArgs} args - Arguments to delete one ContactMessage.
     * @example
     * // Delete one ContactMessage
     * const ContactMessage = await prisma.contactMessage.delete({
     *   where: {
     *     // ... filter to delete one ContactMessage
     *   }
     * })
     * 
     */
    delete<T extends ContactMessageDeleteArgs>(args: SelectSubset<T, ContactMessageDeleteArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactMessage.
     * @param {ContactMessageUpdateArgs} args - Arguments to update one ContactMessage.
     * @example
     * // Update one ContactMessage
     * const contactMessage = await prisma.contactMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactMessageUpdateArgs>(args: SelectSubset<T, ContactMessageUpdateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactMessages.
     * @param {ContactMessageDeleteManyArgs} args - Arguments to filter ContactMessages to delete.
     * @example
     * // Delete a few ContactMessages
     * const { count } = await prisma.contactMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactMessageDeleteManyArgs>(args?: SelectSubset<T, ContactMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactMessages
     * const contactMessage = await prisma.contactMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactMessageUpdateManyArgs>(args: SelectSubset<T, ContactMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactMessages and returns the data updated in the database.
     * @param {ContactMessageUpdateManyAndReturnArgs} args - Arguments to update many ContactMessages.
     * @example
     * // Update many ContactMessages
     * const contactMessage = await prisma.contactMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContactMessages and only return the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContactMessage.
     * @param {ContactMessageUpsertArgs} args - Arguments to update or create a ContactMessage.
     * @example
     * // Update or create a ContactMessage
     * const contactMessage = await prisma.contactMessage.upsert({
     *   create: {
     *     // ... data to create a ContactMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactMessage we want to update
     *   }
     * })
     */
    upsert<T extends ContactMessageUpsertArgs>(args: SelectSubset<T, ContactMessageUpsertArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageCountArgs} args - Arguments to filter ContactMessages to count.
     * @example
     * // Count the number of ContactMessages
     * const count = await prisma.contactMessage.count({
     *   where: {
     *     // ... the filter for the ContactMessages we want to count
     *   }
     * })
    **/
    count<T extends ContactMessageCountArgs>(
      args?: Subset<T, ContactMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactMessageAggregateArgs>(args: Subset<T, ContactMessageAggregateArgs>): Prisma.PrismaPromise<GetContactMessageAggregateType<T>>

    /**
     * Group by ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactMessageGroupByArgs['orderBy'] }
        : { orderBy?: ContactMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactMessage model
   */
  readonly fields: ContactMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactMessage model
   */
  interface ContactMessageFieldRefs {
    readonly id: FieldRef<"ContactMessage", 'String'>
    readonly name: FieldRef<"ContactMessage", 'String'>
    readonly email: FieldRef<"ContactMessage", 'String'>
    readonly message: FieldRef<"ContactMessage", 'String'>
    readonly read: FieldRef<"ContactMessage", 'Boolean'>
    readonly createdAt: FieldRef<"ContactMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactMessage findUnique
   */
  export type ContactMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findUniqueOrThrow
   */
  export type ContactMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findFirst
   */
  export type ContactMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findFirstOrThrow
   */
  export type ContactMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findMany
   */
  export type ContactMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessages to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage create
   */
  export type ContactMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a ContactMessage.
     */
    data: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
  }

  /**
   * ContactMessage createMany
   */
  export type ContactMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactMessages.
     */
    data: ContactMessageCreateManyInput | ContactMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactMessage createManyAndReturn
   */
  export type ContactMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data used to create many ContactMessages.
     */
    data: ContactMessageCreateManyInput | ContactMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactMessage update
   */
  export type ContactMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a ContactMessage.
     */
    data: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
    /**
     * Choose, which ContactMessage to update.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage updateMany
   */
  export type ContactMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactMessages.
     */
    data: XOR<ContactMessageUpdateManyMutationInput, ContactMessageUncheckedUpdateManyInput>
    /**
     * Filter which ContactMessages to update
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to update.
     */
    limit?: number
  }

  /**
   * ContactMessage updateManyAndReturn
   */
  export type ContactMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data used to update ContactMessages.
     */
    data: XOR<ContactMessageUpdateManyMutationInput, ContactMessageUncheckedUpdateManyInput>
    /**
     * Filter which ContactMessages to update
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to update.
     */
    limit?: number
  }

  /**
   * ContactMessage upsert
   */
  export type ContactMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the ContactMessage to update in case it exists.
     */
    where: ContactMessageWhereUniqueInput
    /**
     * In case the ContactMessage found by the `where` argument doesn't exist, create a new ContactMessage with this data.
     */
    create: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
    /**
     * In case the ContactMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
  }

  /**
   * ContactMessage delete
   */
  export type ContactMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter which ContactMessage to delete.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage deleteMany
   */
  export type ContactMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessages to delete
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to delete.
     */
    limit?: number
  }

  /**
   * ContactMessage without action
   */
  export type ContactMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    price: number | null
    sortOrder: number | null
  }

  export type PlanSumAggregateOutputType = {
    price: number | null
    sortOrder: number | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    slug: string | null
    category: $Enums.PlanCategory | null
    name: string | null
    modality: string | null
    excerpt: string | null
    idealFor: string | null
    price: number | null
    currency: string | null
    imageUrl: string | null
    imageAlt: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    category: $Enums.PlanCategory | null
    name: string | null
    modality: string | null
    excerpt: string | null
    idealFor: string | null
    price: number | null
    currency: string | null
    imageUrl: string | null
    imageAlt: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    slug: number
    category: number
    name: number
    modality: number
    excerpt: number
    idealFor: number
    price: number
    currency: number
    imageUrl: number
    imageAlt: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    price?: true
    sortOrder?: true
  }

  export type PlanSumAggregateInputType = {
    price?: true
    sortOrder?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    slug?: true
    category?: true
    name?: true
    modality?: true
    excerpt?: true
    idealFor?: true
    price?: true
    currency?: true
    imageUrl?: true
    imageAlt?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    slug?: true
    category?: true
    name?: true
    modality?: true
    excerpt?: true
    idealFor?: true
    price?: true
    currency?: true
    imageUrl?: true
    imageAlt?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    slug?: true
    category?: true
    name?: true
    modality?: true
    excerpt?: true
    idealFor?: true
    price?: true
    currency?: true
    imageUrl?: true
    imageAlt?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    slug: string
    category: $Enums.PlanCategory
    name: string
    modality: string
    excerpt: string
    idealFor: string | null
    price: number
    currency: string
    imageUrl: string
    imageAlt: string
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    category?: boolean
    name?: boolean
    modality?: boolean
    excerpt?: boolean
    idealFor?: boolean
    price?: boolean
    currency?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    features?: boolean | Plan$featuresArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    category?: boolean
    name?: boolean
    modality?: boolean
    excerpt?: boolean
    idealFor?: boolean
    price?: boolean
    currency?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    category?: boolean
    name?: boolean
    modality?: boolean
    excerpt?: boolean
    idealFor?: boolean
    price?: boolean
    currency?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    slug?: boolean
    category?: boolean
    name?: boolean
    modality?: boolean
    excerpt?: boolean
    idealFor?: boolean
    price?: boolean
    currency?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "category" | "name" | "modality" | "excerpt" | "idealFor" | "price" | "currency" | "imageUrl" | "imageAlt" | "isActive" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | Plan$featuresArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      features: Prisma.$PlanFeaturePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      category: $Enums.PlanCategory
      name: string
      modality: string
      excerpt: string
      idealFor: string | null
      price: number
      currency: string
      imageUrl: string
      imageAlt: string
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    features<T extends Plan$featuresArgs<ExtArgs> = {}>(args?: Subset<T, Plan$featuresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly slug: FieldRef<"Plan", 'String'>
    readonly category: FieldRef<"Plan", 'PlanCategory'>
    readonly name: FieldRef<"Plan", 'String'>
    readonly modality: FieldRef<"Plan", 'String'>
    readonly excerpt: FieldRef<"Plan", 'String'>
    readonly idealFor: FieldRef<"Plan", 'String'>
    readonly price: FieldRef<"Plan", 'Int'>
    readonly currency: FieldRef<"Plan", 'String'>
    readonly imageUrl: FieldRef<"Plan", 'String'>
    readonly imageAlt: FieldRef<"Plan", 'String'>
    readonly isActive: FieldRef<"Plan", 'Boolean'>
    readonly sortOrder: FieldRef<"Plan", 'Int'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
    readonly updatedAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.features
   */
  export type Plan$featuresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    where?: PlanFeatureWhereInput
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    cursor?: PlanFeatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model PlanFeature
   */

  export type AggregatePlanFeature = {
    _count: PlanFeatureCountAggregateOutputType | null
    _avg: PlanFeatureAvgAggregateOutputType | null
    _sum: PlanFeatureSumAggregateOutputType | null
    _min: PlanFeatureMinAggregateOutputType | null
    _max: PlanFeatureMaxAggregateOutputType | null
  }

  export type PlanFeatureAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type PlanFeatureSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type PlanFeatureMinAggregateOutputType = {
    id: string | null
    planId: string | null
    text: string | null
    sortOrder: number | null
  }

  export type PlanFeatureMaxAggregateOutputType = {
    id: string | null
    planId: string | null
    text: string | null
    sortOrder: number | null
  }

  export type PlanFeatureCountAggregateOutputType = {
    id: number
    planId: number
    text: number
    sortOrder: number
    _all: number
  }


  export type PlanFeatureAvgAggregateInputType = {
    sortOrder?: true
  }

  export type PlanFeatureSumAggregateInputType = {
    sortOrder?: true
  }

  export type PlanFeatureMinAggregateInputType = {
    id?: true
    planId?: true
    text?: true
    sortOrder?: true
  }

  export type PlanFeatureMaxAggregateInputType = {
    id?: true
    planId?: true
    text?: true
    sortOrder?: true
  }

  export type PlanFeatureCountAggregateInputType = {
    id?: true
    planId?: true
    text?: true
    sortOrder?: true
    _all?: true
  }

  export type PlanFeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanFeature to aggregate.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanFeatures
    **/
    _count?: true | PlanFeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanFeatureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanFeatureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanFeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanFeatureMaxAggregateInputType
  }

  export type GetPlanFeatureAggregateType<T extends PlanFeatureAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanFeature[P]>
      : GetScalarType<T[P], AggregatePlanFeature[P]>
  }




  export type PlanFeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanFeatureWhereInput
    orderBy?: PlanFeatureOrderByWithAggregationInput | PlanFeatureOrderByWithAggregationInput[]
    by: PlanFeatureScalarFieldEnum[] | PlanFeatureScalarFieldEnum
    having?: PlanFeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanFeatureCountAggregateInputType | true
    _avg?: PlanFeatureAvgAggregateInputType
    _sum?: PlanFeatureSumAggregateInputType
    _min?: PlanFeatureMinAggregateInputType
    _max?: PlanFeatureMaxAggregateInputType
  }

  export type PlanFeatureGroupByOutputType = {
    id: string
    planId: string
    text: string
    sortOrder: number
    _count: PlanFeatureCountAggregateOutputType | null
    _avg: PlanFeatureAvgAggregateOutputType | null
    _sum: PlanFeatureSumAggregateOutputType | null
    _min: PlanFeatureMinAggregateOutputType | null
    _max: PlanFeatureMaxAggregateOutputType | null
  }

  type GetPlanFeatureGroupByPayload<T extends PlanFeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanFeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanFeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanFeatureGroupByOutputType[P]>
            : GetScalarType<T[P], PlanFeatureGroupByOutputType[P]>
        }
      >
    >


  export type PlanFeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    text?: boolean
    sortOrder?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFeature"]>

  export type PlanFeatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    text?: boolean
    sortOrder?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFeature"]>

  export type PlanFeatureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planId?: boolean
    text?: boolean
    sortOrder?: boolean
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["planFeature"]>

  export type PlanFeatureSelectScalar = {
    id?: boolean
    planId?: boolean
    text?: boolean
    sortOrder?: boolean
  }

  export type PlanFeatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planId" | "text" | "sortOrder", ExtArgs["result"]["planFeature"]>
  export type PlanFeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type PlanFeatureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }
  export type PlanFeatureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plan?: boolean | PlanDefaultArgs<ExtArgs>
  }

  export type $PlanFeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanFeature"
    objects: {
      plan: Prisma.$PlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      planId: string
      text: string
      sortOrder: number
    }, ExtArgs["result"]["planFeature"]>
    composites: {}
  }

  type PlanFeatureGetPayload<S extends boolean | null | undefined | PlanFeatureDefaultArgs> = $Result.GetResult<Prisma.$PlanFeaturePayload, S>

  type PlanFeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFeatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanFeatureCountAggregateInputType | true
    }

  export interface PlanFeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanFeature'], meta: { name: 'PlanFeature' } }
    /**
     * Find zero or one PlanFeature that matches the filter.
     * @param {PlanFeatureFindUniqueArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFeatureFindUniqueArgs>(args: SelectSubset<T, PlanFeatureFindUniqueArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanFeature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFeatureFindUniqueOrThrowArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFeatureFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFeatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanFeature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindFirstArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFeatureFindFirstArgs>(args?: SelectSubset<T, PlanFeatureFindFirstArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanFeature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindFirstOrThrowArgs} args - Arguments to find a PlanFeature
     * @example
     * // Get one PlanFeature
     * const planFeature = await prisma.planFeature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFeatureFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFeatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanFeatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanFeatures
     * const planFeatures = await prisma.planFeature.findMany()
     * 
     * // Get first 10 PlanFeatures
     * const planFeatures = await prisma.planFeature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planFeatureWithIdOnly = await prisma.planFeature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFeatureFindManyArgs>(args?: SelectSubset<T, PlanFeatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanFeature.
     * @param {PlanFeatureCreateArgs} args - Arguments to create a PlanFeature.
     * @example
     * // Create one PlanFeature
     * const PlanFeature = await prisma.planFeature.create({
     *   data: {
     *     // ... data to create a PlanFeature
     *   }
     * })
     * 
     */
    create<T extends PlanFeatureCreateArgs>(args: SelectSubset<T, PlanFeatureCreateArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanFeatures.
     * @param {PlanFeatureCreateManyArgs} args - Arguments to create many PlanFeatures.
     * @example
     * // Create many PlanFeatures
     * const planFeature = await prisma.planFeature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanFeatureCreateManyArgs>(args?: SelectSubset<T, PlanFeatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanFeatures and returns the data saved in the database.
     * @param {PlanFeatureCreateManyAndReturnArgs} args - Arguments to create many PlanFeatures.
     * @example
     * // Create many PlanFeatures
     * const planFeature = await prisma.planFeature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanFeatures and only return the `id`
     * const planFeatureWithIdOnly = await prisma.planFeature.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanFeatureCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanFeatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlanFeature.
     * @param {PlanFeatureDeleteArgs} args - Arguments to delete one PlanFeature.
     * @example
     * // Delete one PlanFeature
     * const PlanFeature = await prisma.planFeature.delete({
     *   where: {
     *     // ... filter to delete one PlanFeature
     *   }
     * })
     * 
     */
    delete<T extends PlanFeatureDeleteArgs>(args: SelectSubset<T, PlanFeatureDeleteArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanFeature.
     * @param {PlanFeatureUpdateArgs} args - Arguments to update one PlanFeature.
     * @example
     * // Update one PlanFeature
     * const planFeature = await prisma.planFeature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanFeatureUpdateArgs>(args: SelectSubset<T, PlanFeatureUpdateArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanFeatures.
     * @param {PlanFeatureDeleteManyArgs} args - Arguments to filter PlanFeatures to delete.
     * @example
     * // Delete a few PlanFeatures
     * const { count } = await prisma.planFeature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanFeatureDeleteManyArgs>(args?: SelectSubset<T, PlanFeatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanFeatures
     * const planFeature = await prisma.planFeature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanFeatureUpdateManyArgs>(args: SelectSubset<T, PlanFeatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanFeatures and returns the data updated in the database.
     * @param {PlanFeatureUpdateManyAndReturnArgs} args - Arguments to update many PlanFeatures.
     * @example
     * // Update many PlanFeatures
     * const planFeature = await prisma.planFeature.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlanFeatures and only return the `id`
     * const planFeatureWithIdOnly = await prisma.planFeature.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanFeatureUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanFeatureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlanFeature.
     * @param {PlanFeatureUpsertArgs} args - Arguments to update or create a PlanFeature.
     * @example
     * // Update or create a PlanFeature
     * const planFeature = await prisma.planFeature.upsert({
     *   create: {
     *     // ... data to create a PlanFeature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanFeature we want to update
     *   }
     * })
     */
    upsert<T extends PlanFeatureUpsertArgs>(args: SelectSubset<T, PlanFeatureUpsertArgs<ExtArgs>>): Prisma__PlanFeatureClient<$Result.GetResult<Prisma.$PlanFeaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureCountArgs} args - Arguments to filter PlanFeatures to count.
     * @example
     * // Count the number of PlanFeatures
     * const count = await prisma.planFeature.count({
     *   where: {
     *     // ... the filter for the PlanFeatures we want to count
     *   }
     * })
    **/
    count<T extends PlanFeatureCountArgs>(
      args?: Subset<T, PlanFeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanFeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanFeatureAggregateArgs>(args: Subset<T, PlanFeatureAggregateArgs>): Prisma.PrismaPromise<GetPlanFeatureAggregateType<T>>

    /**
     * Group by PlanFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFeatureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanFeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanFeatureGroupByArgs['orderBy'] }
        : { orderBy?: PlanFeatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanFeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanFeature model
   */
  readonly fields: PlanFeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanFeature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanFeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    plan<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlanFeature model
   */
  interface PlanFeatureFieldRefs {
    readonly id: FieldRef<"PlanFeature", 'String'>
    readonly planId: FieldRef<"PlanFeature", 'String'>
    readonly text: FieldRef<"PlanFeature", 'String'>
    readonly sortOrder: FieldRef<"PlanFeature", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PlanFeature findUnique
   */
  export type PlanFeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature findUniqueOrThrow
   */
  export type PlanFeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature findFirst
   */
  export type PlanFeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFeatures.
     */
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature findFirstOrThrow
   */
  export type PlanFeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeature to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFeatures.
     */
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature findMany
   */
  export type PlanFeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter, which PlanFeatures to fetch.
     */
    where?: PlanFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanFeatures to fetch.
     */
    orderBy?: PlanFeatureOrderByWithRelationInput | PlanFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanFeatures.
     */
    cursor?: PlanFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanFeatures.
     */
    distinct?: PlanFeatureScalarFieldEnum | PlanFeatureScalarFieldEnum[]
  }

  /**
   * PlanFeature create
   */
  export type PlanFeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The data needed to create a PlanFeature.
     */
    data: XOR<PlanFeatureCreateInput, PlanFeatureUncheckedCreateInput>
  }

  /**
   * PlanFeature createMany
   */
  export type PlanFeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanFeatures.
     */
    data: PlanFeatureCreateManyInput | PlanFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlanFeature createManyAndReturn
   */
  export type PlanFeatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * The data used to create many PlanFeatures.
     */
    data: PlanFeatureCreateManyInput | PlanFeatureCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanFeature update
   */
  export type PlanFeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The data needed to update a PlanFeature.
     */
    data: XOR<PlanFeatureUpdateInput, PlanFeatureUncheckedUpdateInput>
    /**
     * Choose, which PlanFeature to update.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature updateMany
   */
  export type PlanFeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanFeatures.
     */
    data: XOR<PlanFeatureUpdateManyMutationInput, PlanFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PlanFeatures to update
     */
    where?: PlanFeatureWhereInput
    /**
     * Limit how many PlanFeatures to update.
     */
    limit?: number
  }

  /**
   * PlanFeature updateManyAndReturn
   */
  export type PlanFeatureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * The data used to update PlanFeatures.
     */
    data: XOR<PlanFeatureUpdateManyMutationInput, PlanFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PlanFeatures to update
     */
    where?: PlanFeatureWhereInput
    /**
     * Limit how many PlanFeatures to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlanFeature upsert
   */
  export type PlanFeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * The filter to search for the PlanFeature to update in case it exists.
     */
    where: PlanFeatureWhereUniqueInput
    /**
     * In case the PlanFeature found by the `where` argument doesn't exist, create a new PlanFeature with this data.
     */
    create: XOR<PlanFeatureCreateInput, PlanFeatureUncheckedCreateInput>
    /**
     * In case the PlanFeature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanFeatureUpdateInput, PlanFeatureUncheckedUpdateInput>
  }

  /**
   * PlanFeature delete
   */
  export type PlanFeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
    /**
     * Filter which PlanFeature to delete.
     */
    where: PlanFeatureWhereUniqueInput
  }

  /**
   * PlanFeature deleteMany
   */
  export type PlanFeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanFeatures to delete
     */
    where?: PlanFeatureWhereInput
    /**
     * Limit how many PlanFeatures to delete.
     */
    limit?: number
  }

  /**
   * PlanFeature without action
   */
  export type PlanFeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanFeature
     */
    select?: PlanFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanFeature
     */
    omit?: PlanFeatureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanFeatureInclude<ExtArgs> | null
  }


  /**
   * Model NewsPost
   */

  export type AggregateNewsPost = {
    _count: NewsPostCountAggregateOutputType | null
    _avg: NewsPostAvgAggregateOutputType | null
    _sum: NewsPostSumAggregateOutputType | null
    _min: NewsPostMinAggregateOutputType | null
    _max: NewsPostMaxAggregateOutputType | null
  }

  export type NewsPostAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type NewsPostSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type NewsPostMinAggregateOutputType = {
    id: string | null
    title: string | null
    excerpt: string | null
    date: Date | null
    category: $Enums.NewsCategory | null
    imageUrl: string | null
    published: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsPostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    excerpt: string | null
    date: Date | null
    category: $Enums.NewsCategory | null
    imageUrl: string | null
    published: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsPostCountAggregateOutputType = {
    id: number
    title: number
    excerpt: number
    date: number
    category: number
    imageUrl: number
    published: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsPostAvgAggregateInputType = {
    sortOrder?: true
  }

  export type NewsPostSumAggregateInputType = {
    sortOrder?: true
  }

  export type NewsPostMinAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    date?: true
    category?: true
    imageUrl?: true
    published?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsPostMaxAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    date?: true
    category?: true
    imageUrl?: true
    published?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsPostCountAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    date?: true
    category?: true
    imageUrl?: true
    published?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsPost to aggregate.
     */
    where?: NewsPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsPosts to fetch.
     */
    orderBy?: NewsPostOrderByWithRelationInput | NewsPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsPosts
    **/
    _count?: true | NewsPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NewsPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NewsPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsPostMaxAggregateInputType
  }

  export type GetNewsPostAggregateType<T extends NewsPostAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsPost[P]>
      : GetScalarType<T[P], AggregateNewsPost[P]>
  }




  export type NewsPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsPostWhereInput
    orderBy?: NewsPostOrderByWithAggregationInput | NewsPostOrderByWithAggregationInput[]
    by: NewsPostScalarFieldEnum[] | NewsPostScalarFieldEnum
    having?: NewsPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsPostCountAggregateInputType | true
    _avg?: NewsPostAvgAggregateInputType
    _sum?: NewsPostSumAggregateInputType
    _min?: NewsPostMinAggregateInputType
    _max?: NewsPostMaxAggregateInputType
  }

  export type NewsPostGroupByOutputType = {
    id: string
    title: string
    excerpt: string
    date: Date
    category: $Enums.NewsCategory
    imageUrl: string | null
    published: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: NewsPostCountAggregateOutputType | null
    _avg: NewsPostAvgAggregateOutputType | null
    _sum: NewsPostSumAggregateOutputType | null
    _min: NewsPostMinAggregateOutputType | null
    _max: NewsPostMaxAggregateOutputType | null
  }

  type GetNewsPostGroupByPayload<T extends NewsPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsPostGroupByOutputType[P]>
            : GetScalarType<T[P], NewsPostGroupByOutputType[P]>
        }
      >
    >


  export type NewsPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    date?: boolean
    category?: boolean
    imageUrl?: boolean
    published?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsPost"]>

  export type NewsPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    date?: boolean
    category?: boolean
    imageUrl?: boolean
    published?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsPost"]>

  export type NewsPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    date?: boolean
    category?: boolean
    imageUrl?: boolean
    published?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsPost"]>

  export type NewsPostSelectScalar = {
    id?: boolean
    title?: boolean
    excerpt?: boolean
    date?: boolean
    category?: boolean
    imageUrl?: boolean
    published?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "excerpt" | "date" | "category" | "imageUrl" | "published" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["newsPost"]>

  export type $NewsPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsPost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      excerpt: string
      date: Date
      category: $Enums.NewsCategory
      imageUrl: string | null
      published: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsPost"]>
    composites: {}
  }

  type NewsPostGetPayload<S extends boolean | null | undefined | NewsPostDefaultArgs> = $Result.GetResult<Prisma.$NewsPostPayload, S>

  type NewsPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsPostCountAggregateInputType | true
    }

  export interface NewsPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsPost'], meta: { name: 'NewsPost' } }
    /**
     * Find zero or one NewsPost that matches the filter.
     * @param {NewsPostFindUniqueArgs} args - Arguments to find a NewsPost
     * @example
     * // Get one NewsPost
     * const newsPost = await prisma.newsPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsPostFindUniqueArgs>(args: SelectSubset<T, NewsPostFindUniqueArgs<ExtArgs>>): Prisma__NewsPostClient<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsPostFindUniqueOrThrowArgs} args - Arguments to find a NewsPost
     * @example
     * // Get one NewsPost
     * const newsPost = await prisma.newsPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsPostFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsPostClient<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsPostFindFirstArgs} args - Arguments to find a NewsPost
     * @example
     * // Get one NewsPost
     * const newsPost = await prisma.newsPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsPostFindFirstArgs>(args?: SelectSubset<T, NewsPostFindFirstArgs<ExtArgs>>): Prisma__NewsPostClient<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsPostFindFirstOrThrowArgs} args - Arguments to find a NewsPost
     * @example
     * // Get one NewsPost
     * const newsPost = await prisma.newsPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsPostFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsPostClient<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsPosts
     * const newsPosts = await prisma.newsPost.findMany()
     * 
     * // Get first 10 NewsPosts
     * const newsPosts = await prisma.newsPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsPostWithIdOnly = await prisma.newsPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsPostFindManyArgs>(args?: SelectSubset<T, NewsPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsPost.
     * @param {NewsPostCreateArgs} args - Arguments to create a NewsPost.
     * @example
     * // Create one NewsPost
     * const NewsPost = await prisma.newsPost.create({
     *   data: {
     *     // ... data to create a NewsPost
     *   }
     * })
     * 
     */
    create<T extends NewsPostCreateArgs>(args: SelectSubset<T, NewsPostCreateArgs<ExtArgs>>): Prisma__NewsPostClient<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsPosts.
     * @param {NewsPostCreateManyArgs} args - Arguments to create many NewsPosts.
     * @example
     * // Create many NewsPosts
     * const newsPost = await prisma.newsPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsPostCreateManyArgs>(args?: SelectSubset<T, NewsPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsPosts and returns the data saved in the database.
     * @param {NewsPostCreateManyAndReturnArgs} args - Arguments to create many NewsPosts.
     * @example
     * // Create many NewsPosts
     * const newsPost = await prisma.newsPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsPosts and only return the `id`
     * const newsPostWithIdOnly = await prisma.newsPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsPostCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsPost.
     * @param {NewsPostDeleteArgs} args - Arguments to delete one NewsPost.
     * @example
     * // Delete one NewsPost
     * const NewsPost = await prisma.newsPost.delete({
     *   where: {
     *     // ... filter to delete one NewsPost
     *   }
     * })
     * 
     */
    delete<T extends NewsPostDeleteArgs>(args: SelectSubset<T, NewsPostDeleteArgs<ExtArgs>>): Prisma__NewsPostClient<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsPost.
     * @param {NewsPostUpdateArgs} args - Arguments to update one NewsPost.
     * @example
     * // Update one NewsPost
     * const newsPost = await prisma.newsPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsPostUpdateArgs>(args: SelectSubset<T, NewsPostUpdateArgs<ExtArgs>>): Prisma__NewsPostClient<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsPosts.
     * @param {NewsPostDeleteManyArgs} args - Arguments to filter NewsPosts to delete.
     * @example
     * // Delete a few NewsPosts
     * const { count } = await prisma.newsPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsPostDeleteManyArgs>(args?: SelectSubset<T, NewsPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsPosts
     * const newsPost = await prisma.newsPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsPostUpdateManyArgs>(args: SelectSubset<T, NewsPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsPosts and returns the data updated in the database.
     * @param {NewsPostUpdateManyAndReturnArgs} args - Arguments to update many NewsPosts.
     * @example
     * // Update many NewsPosts
     * const newsPost = await prisma.newsPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsPosts and only return the `id`
     * const newsPostWithIdOnly = await prisma.newsPost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsPostUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsPost.
     * @param {NewsPostUpsertArgs} args - Arguments to update or create a NewsPost.
     * @example
     * // Update or create a NewsPost
     * const newsPost = await prisma.newsPost.upsert({
     *   create: {
     *     // ... data to create a NewsPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsPost we want to update
     *   }
     * })
     */
    upsert<T extends NewsPostUpsertArgs>(args: SelectSubset<T, NewsPostUpsertArgs<ExtArgs>>): Prisma__NewsPostClient<$Result.GetResult<Prisma.$NewsPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsPostCountArgs} args - Arguments to filter NewsPosts to count.
     * @example
     * // Count the number of NewsPosts
     * const count = await prisma.newsPost.count({
     *   where: {
     *     // ... the filter for the NewsPosts we want to count
     *   }
     * })
    **/
    count<T extends NewsPostCountArgs>(
      args?: Subset<T, NewsPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsPostAggregateArgs>(args: Subset<T, NewsPostAggregateArgs>): Prisma.PrismaPromise<GetNewsPostAggregateType<T>>

    /**
     * Group by NewsPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsPostGroupByArgs['orderBy'] }
        : { orderBy?: NewsPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsPost model
   */
  readonly fields: NewsPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsPost model
   */
  interface NewsPostFieldRefs {
    readonly id: FieldRef<"NewsPost", 'String'>
    readonly title: FieldRef<"NewsPost", 'String'>
    readonly excerpt: FieldRef<"NewsPost", 'String'>
    readonly date: FieldRef<"NewsPost", 'DateTime'>
    readonly category: FieldRef<"NewsPost", 'NewsCategory'>
    readonly imageUrl: FieldRef<"NewsPost", 'String'>
    readonly published: FieldRef<"NewsPost", 'Boolean'>
    readonly sortOrder: FieldRef<"NewsPost", 'Int'>
    readonly createdAt: FieldRef<"NewsPost", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsPost findUnique
   */
  export type NewsPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * Filter, which NewsPost to fetch.
     */
    where: NewsPostWhereUniqueInput
  }

  /**
   * NewsPost findUniqueOrThrow
   */
  export type NewsPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * Filter, which NewsPost to fetch.
     */
    where: NewsPostWhereUniqueInput
  }

  /**
   * NewsPost findFirst
   */
  export type NewsPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * Filter, which NewsPost to fetch.
     */
    where?: NewsPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsPosts to fetch.
     */
    orderBy?: NewsPostOrderByWithRelationInput | NewsPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsPosts.
     */
    cursor?: NewsPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsPosts.
     */
    distinct?: NewsPostScalarFieldEnum | NewsPostScalarFieldEnum[]
  }

  /**
   * NewsPost findFirstOrThrow
   */
  export type NewsPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * Filter, which NewsPost to fetch.
     */
    where?: NewsPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsPosts to fetch.
     */
    orderBy?: NewsPostOrderByWithRelationInput | NewsPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsPosts.
     */
    cursor?: NewsPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsPosts.
     */
    distinct?: NewsPostScalarFieldEnum | NewsPostScalarFieldEnum[]
  }

  /**
   * NewsPost findMany
   */
  export type NewsPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * Filter, which NewsPosts to fetch.
     */
    where?: NewsPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsPosts to fetch.
     */
    orderBy?: NewsPostOrderByWithRelationInput | NewsPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsPosts.
     */
    cursor?: NewsPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsPosts.
     */
    distinct?: NewsPostScalarFieldEnum | NewsPostScalarFieldEnum[]
  }

  /**
   * NewsPost create
   */
  export type NewsPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsPost.
     */
    data: XOR<NewsPostCreateInput, NewsPostUncheckedCreateInput>
  }

  /**
   * NewsPost createMany
   */
  export type NewsPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsPosts.
     */
    data: NewsPostCreateManyInput | NewsPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsPost createManyAndReturn
   */
  export type NewsPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * The data used to create many NewsPosts.
     */
    data: NewsPostCreateManyInput | NewsPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsPost update
   */
  export type NewsPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsPost.
     */
    data: XOR<NewsPostUpdateInput, NewsPostUncheckedUpdateInput>
    /**
     * Choose, which NewsPost to update.
     */
    where: NewsPostWhereUniqueInput
  }

  /**
   * NewsPost updateMany
   */
  export type NewsPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsPosts.
     */
    data: XOR<NewsPostUpdateManyMutationInput, NewsPostUncheckedUpdateManyInput>
    /**
     * Filter which NewsPosts to update
     */
    where?: NewsPostWhereInput
    /**
     * Limit how many NewsPosts to update.
     */
    limit?: number
  }

  /**
   * NewsPost updateManyAndReturn
   */
  export type NewsPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * The data used to update NewsPosts.
     */
    data: XOR<NewsPostUpdateManyMutationInput, NewsPostUncheckedUpdateManyInput>
    /**
     * Filter which NewsPosts to update
     */
    where?: NewsPostWhereInput
    /**
     * Limit how many NewsPosts to update.
     */
    limit?: number
  }

  /**
   * NewsPost upsert
   */
  export type NewsPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsPost to update in case it exists.
     */
    where: NewsPostWhereUniqueInput
    /**
     * In case the NewsPost found by the `where` argument doesn't exist, create a new NewsPost with this data.
     */
    create: XOR<NewsPostCreateInput, NewsPostUncheckedCreateInput>
    /**
     * In case the NewsPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsPostUpdateInput, NewsPostUncheckedUpdateInput>
  }

  /**
   * NewsPost delete
   */
  export type NewsPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
    /**
     * Filter which NewsPost to delete.
     */
    where: NewsPostWhereUniqueInput
  }

  /**
   * NewsPost deleteMany
   */
  export type NewsPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsPosts to delete
     */
    where?: NewsPostWhereInput
    /**
     * Limit how many NewsPosts to delete.
     */
    limit?: number
  }

  /**
   * NewsPost without action
   */
  export type NewsPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsPost
     */
    select?: NewsPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsPost
     */
    omit?: NewsPostOmit<ExtArgs> | null
  }


  /**
   * Model Race
   */

  export type AggregateRace = {
    _count: RaceCountAggregateOutputType | null
    _avg: RaceAvgAggregateOutputType | null
    _sum: RaceSumAggregateOutputType | null
    _min: RaceMinAggregateOutputType | null
    _max: RaceMaxAggregateOutputType | null
  }

  export type RaceAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type RaceSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type RaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    location: string | null
    type: $Enums.RaceType | null
    distance: string | null
    description: string | null
    registrationUrl: string | null
    status: $Enums.RaceStatus | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    location: string | null
    type: $Enums.RaceType | null
    distance: string | null
    description: string | null
    registrationUrl: string | null
    status: $Enums.RaceStatus | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RaceCountAggregateOutputType = {
    id: number
    name: number
    date: number
    location: number
    type: number
    distance: number
    description: number
    registrationUrl: number
    status: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RaceAvgAggregateInputType = {
    sortOrder?: true
  }

  export type RaceSumAggregateInputType = {
    sortOrder?: true
  }

  export type RaceMinAggregateInputType = {
    id?: true
    name?: true
    date?: true
    location?: true
    type?: true
    distance?: true
    description?: true
    registrationUrl?: true
    status?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RaceMaxAggregateInputType = {
    id?: true
    name?: true
    date?: true
    location?: true
    type?: true
    distance?: true
    description?: true
    registrationUrl?: true
    status?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RaceCountAggregateInputType = {
    id?: true
    name?: true
    date?: true
    location?: true
    type?: true
    distance?: true
    description?: true
    registrationUrl?: true
    status?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Race to aggregate.
     */
    where?: RaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Races to fetch.
     */
    orderBy?: RaceOrderByWithRelationInput | RaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Races from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Races.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Races
    **/
    _count?: true | RaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RaceMaxAggregateInputType
  }

  export type GetRaceAggregateType<T extends RaceAggregateArgs> = {
        [P in keyof T & keyof AggregateRace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRace[P]>
      : GetScalarType<T[P], AggregateRace[P]>
  }




  export type RaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaceWhereInput
    orderBy?: RaceOrderByWithAggregationInput | RaceOrderByWithAggregationInput[]
    by: RaceScalarFieldEnum[] | RaceScalarFieldEnum
    having?: RaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RaceCountAggregateInputType | true
    _avg?: RaceAvgAggregateInputType
    _sum?: RaceSumAggregateInputType
    _min?: RaceMinAggregateInputType
    _max?: RaceMaxAggregateInputType
  }

  export type RaceGroupByOutputType = {
    id: string
    name: string
    date: Date
    location: string
    type: $Enums.RaceType
    distance: string | null
    description: string | null
    registrationUrl: string | null
    status: $Enums.RaceStatus
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: RaceCountAggregateOutputType | null
    _avg: RaceAvgAggregateOutputType | null
    _sum: RaceSumAggregateOutputType | null
    _min: RaceMinAggregateOutputType | null
    _max: RaceMaxAggregateOutputType | null
  }

  type GetRaceGroupByPayload<T extends RaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RaceGroupByOutputType[P]>
            : GetScalarType<T[P], RaceGroupByOutputType[P]>
        }
      >
    >


  export type RaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    location?: boolean
    type?: boolean
    distance?: boolean
    description?: boolean
    registrationUrl?: boolean
    status?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["race"]>

  export type RaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    location?: boolean
    type?: boolean
    distance?: boolean
    description?: boolean
    registrationUrl?: boolean
    status?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["race"]>

  export type RaceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    location?: boolean
    type?: boolean
    distance?: boolean
    description?: boolean
    registrationUrl?: boolean
    status?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["race"]>

  export type RaceSelectScalar = {
    id?: boolean
    name?: boolean
    date?: boolean
    location?: boolean
    type?: boolean
    distance?: boolean
    description?: boolean
    registrationUrl?: boolean
    status?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "date" | "location" | "type" | "distance" | "description" | "registrationUrl" | "status" | "isActive" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["race"]>

  export type $RacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Race"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      date: Date
      location: string
      type: $Enums.RaceType
      distance: string | null
      description: string | null
      registrationUrl: string | null
      status: $Enums.RaceStatus
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["race"]>
    composites: {}
  }

  type RaceGetPayload<S extends boolean | null | undefined | RaceDefaultArgs> = $Result.GetResult<Prisma.$RacePayload, S>

  type RaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RaceCountAggregateInputType | true
    }

  export interface RaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Race'], meta: { name: 'Race' } }
    /**
     * Find zero or one Race that matches the filter.
     * @param {RaceFindUniqueArgs} args - Arguments to find a Race
     * @example
     * // Get one Race
     * const race = await prisma.race.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RaceFindUniqueArgs>(args: SelectSubset<T, RaceFindUniqueArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Race that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RaceFindUniqueOrThrowArgs} args - Arguments to find a Race
     * @example
     * // Get one Race
     * const race = await prisma.race.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RaceFindUniqueOrThrowArgs>(args: SelectSubset<T, RaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Race that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceFindFirstArgs} args - Arguments to find a Race
     * @example
     * // Get one Race
     * const race = await prisma.race.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RaceFindFirstArgs>(args?: SelectSubset<T, RaceFindFirstArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Race that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceFindFirstOrThrowArgs} args - Arguments to find a Race
     * @example
     * // Get one Race
     * const race = await prisma.race.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RaceFindFirstOrThrowArgs>(args?: SelectSubset<T, RaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Races that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Races
     * const races = await prisma.race.findMany()
     * 
     * // Get first 10 Races
     * const races = await prisma.race.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const raceWithIdOnly = await prisma.race.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RaceFindManyArgs>(args?: SelectSubset<T, RaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Race.
     * @param {RaceCreateArgs} args - Arguments to create a Race.
     * @example
     * // Create one Race
     * const Race = await prisma.race.create({
     *   data: {
     *     // ... data to create a Race
     *   }
     * })
     * 
     */
    create<T extends RaceCreateArgs>(args: SelectSubset<T, RaceCreateArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Races.
     * @param {RaceCreateManyArgs} args - Arguments to create many Races.
     * @example
     * // Create many Races
     * const race = await prisma.race.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RaceCreateManyArgs>(args?: SelectSubset<T, RaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Races and returns the data saved in the database.
     * @param {RaceCreateManyAndReturnArgs} args - Arguments to create many Races.
     * @example
     * // Create many Races
     * const race = await prisma.race.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Races and only return the `id`
     * const raceWithIdOnly = await prisma.race.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RaceCreateManyAndReturnArgs>(args?: SelectSubset<T, RaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Race.
     * @param {RaceDeleteArgs} args - Arguments to delete one Race.
     * @example
     * // Delete one Race
     * const Race = await prisma.race.delete({
     *   where: {
     *     // ... filter to delete one Race
     *   }
     * })
     * 
     */
    delete<T extends RaceDeleteArgs>(args: SelectSubset<T, RaceDeleteArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Race.
     * @param {RaceUpdateArgs} args - Arguments to update one Race.
     * @example
     * // Update one Race
     * const race = await prisma.race.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RaceUpdateArgs>(args: SelectSubset<T, RaceUpdateArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Races.
     * @param {RaceDeleteManyArgs} args - Arguments to filter Races to delete.
     * @example
     * // Delete a few Races
     * const { count } = await prisma.race.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RaceDeleteManyArgs>(args?: SelectSubset<T, RaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Races.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Races
     * const race = await prisma.race.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RaceUpdateManyArgs>(args: SelectSubset<T, RaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Races and returns the data updated in the database.
     * @param {RaceUpdateManyAndReturnArgs} args - Arguments to update many Races.
     * @example
     * // Update many Races
     * const race = await prisma.race.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Races and only return the `id`
     * const raceWithIdOnly = await prisma.race.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RaceUpdateManyAndReturnArgs>(args: SelectSubset<T, RaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Race.
     * @param {RaceUpsertArgs} args - Arguments to update or create a Race.
     * @example
     * // Update or create a Race
     * const race = await prisma.race.upsert({
     *   create: {
     *     // ... data to create a Race
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Race we want to update
     *   }
     * })
     */
    upsert<T extends RaceUpsertArgs>(args: SelectSubset<T, RaceUpsertArgs<ExtArgs>>): Prisma__RaceClient<$Result.GetResult<Prisma.$RacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Races.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceCountArgs} args - Arguments to filter Races to count.
     * @example
     * // Count the number of Races
     * const count = await prisma.race.count({
     *   where: {
     *     // ... the filter for the Races we want to count
     *   }
     * })
    **/
    count<T extends RaceCountArgs>(
      args?: Subset<T, RaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Race.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RaceAggregateArgs>(args: Subset<T, RaceAggregateArgs>): Prisma.PrismaPromise<GetRaceAggregateType<T>>

    /**
     * Group by Race.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RaceGroupByArgs['orderBy'] }
        : { orderBy?: RaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Race model
   */
  readonly fields: RaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Race.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Race model
   */
  interface RaceFieldRefs {
    readonly id: FieldRef<"Race", 'String'>
    readonly name: FieldRef<"Race", 'String'>
    readonly date: FieldRef<"Race", 'DateTime'>
    readonly location: FieldRef<"Race", 'String'>
    readonly type: FieldRef<"Race", 'RaceType'>
    readonly distance: FieldRef<"Race", 'String'>
    readonly description: FieldRef<"Race", 'String'>
    readonly registrationUrl: FieldRef<"Race", 'String'>
    readonly status: FieldRef<"Race", 'RaceStatus'>
    readonly isActive: FieldRef<"Race", 'Boolean'>
    readonly sortOrder: FieldRef<"Race", 'Int'>
    readonly createdAt: FieldRef<"Race", 'DateTime'>
    readonly updatedAt: FieldRef<"Race", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Race findUnique
   */
  export type RaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Race to fetch.
     */
    where: RaceWhereUniqueInput
  }

  /**
   * Race findUniqueOrThrow
   */
  export type RaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Race to fetch.
     */
    where: RaceWhereUniqueInput
  }

  /**
   * Race findFirst
   */
  export type RaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Race to fetch.
     */
    where?: RaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Races to fetch.
     */
    orderBy?: RaceOrderByWithRelationInput | RaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Races.
     */
    cursor?: RaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Races from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Races.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Races.
     */
    distinct?: RaceScalarFieldEnum | RaceScalarFieldEnum[]
  }

  /**
   * Race findFirstOrThrow
   */
  export type RaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Race to fetch.
     */
    where?: RaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Races to fetch.
     */
    orderBy?: RaceOrderByWithRelationInput | RaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Races.
     */
    cursor?: RaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Races from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Races.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Races.
     */
    distinct?: RaceScalarFieldEnum | RaceScalarFieldEnum[]
  }

  /**
   * Race findMany
   */
  export type RaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter, which Races to fetch.
     */
    where?: RaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Races to fetch.
     */
    orderBy?: RaceOrderByWithRelationInput | RaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Races.
     */
    cursor?: RaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Races from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Races.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Races.
     */
    distinct?: RaceScalarFieldEnum | RaceScalarFieldEnum[]
  }

  /**
   * Race create
   */
  export type RaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The data needed to create a Race.
     */
    data: XOR<RaceCreateInput, RaceUncheckedCreateInput>
  }

  /**
   * Race createMany
   */
  export type RaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Races.
     */
    data: RaceCreateManyInput | RaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Race createManyAndReturn
   */
  export type RaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The data used to create many Races.
     */
    data: RaceCreateManyInput | RaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Race update
   */
  export type RaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The data needed to update a Race.
     */
    data: XOR<RaceUpdateInput, RaceUncheckedUpdateInput>
    /**
     * Choose, which Race to update.
     */
    where: RaceWhereUniqueInput
  }

  /**
   * Race updateMany
   */
  export type RaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Races.
     */
    data: XOR<RaceUpdateManyMutationInput, RaceUncheckedUpdateManyInput>
    /**
     * Filter which Races to update
     */
    where?: RaceWhereInput
    /**
     * Limit how many Races to update.
     */
    limit?: number
  }

  /**
   * Race updateManyAndReturn
   */
  export type RaceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The data used to update Races.
     */
    data: XOR<RaceUpdateManyMutationInput, RaceUncheckedUpdateManyInput>
    /**
     * Filter which Races to update
     */
    where?: RaceWhereInput
    /**
     * Limit how many Races to update.
     */
    limit?: number
  }

  /**
   * Race upsert
   */
  export type RaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * The filter to search for the Race to update in case it exists.
     */
    where: RaceWhereUniqueInput
    /**
     * In case the Race found by the `where` argument doesn't exist, create a new Race with this data.
     */
    create: XOR<RaceCreateInput, RaceUncheckedCreateInput>
    /**
     * In case the Race was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RaceUpdateInput, RaceUncheckedUpdateInput>
  }

  /**
   * Race delete
   */
  export type RaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
    /**
     * Filter which Race to delete.
     */
    where: RaceWhereUniqueInput
  }

  /**
   * Race deleteMany
   */
  export type RaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Races to delete
     */
    where?: RaceWhereInput
    /**
     * Limit how many Races to delete.
     */
    limit?: number
  }

  /**
   * Race without action
   */
  export type RaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Race
     */
    select?: RaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Race
     */
    omit?: RaceOmit<ExtArgs> | null
  }


  /**
   * Model Testimonial
   */

  export type AggregateTestimonial = {
    _count: TestimonialCountAggregateOutputType | null
    _avg: TestimonialAvgAggregateOutputType | null
    _sum: TestimonialSumAggregateOutputType | null
    _min: TestimonialMinAggregateOutputType | null
    _max: TestimonialMaxAggregateOutputType | null
  }

  export type TestimonialAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type TestimonialSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type TestimonialMinAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    quote: string | null
    imageUrl: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestimonialMaxAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    quote: string | null
    imageUrl: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TestimonialCountAggregateOutputType = {
    id: number
    name: number
    role: number
    quote: number
    imageUrl: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TestimonialAvgAggregateInputType = {
    sortOrder?: true
  }

  export type TestimonialSumAggregateInputType = {
    sortOrder?: true
  }

  export type TestimonialMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    quote?: true
    imageUrl?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestimonialMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    quote?: true
    imageUrl?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TestimonialCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    quote?: true
    imageUrl?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TestimonialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testimonial to aggregate.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Testimonials
    **/
    _count?: true | TestimonialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestimonialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestimonialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestimonialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestimonialMaxAggregateInputType
  }

  export type GetTestimonialAggregateType<T extends TestimonialAggregateArgs> = {
        [P in keyof T & keyof AggregateTestimonial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestimonial[P]>
      : GetScalarType<T[P], AggregateTestimonial[P]>
  }




  export type TestimonialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestimonialWhereInput
    orderBy?: TestimonialOrderByWithAggregationInput | TestimonialOrderByWithAggregationInput[]
    by: TestimonialScalarFieldEnum[] | TestimonialScalarFieldEnum
    having?: TestimonialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestimonialCountAggregateInputType | true
    _avg?: TestimonialAvgAggregateInputType
    _sum?: TestimonialSumAggregateInputType
    _min?: TestimonialMinAggregateInputType
    _max?: TestimonialMaxAggregateInputType
  }

  export type TestimonialGroupByOutputType = {
    id: string
    name: string
    role: string
    quote: string
    imageUrl: string | null
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: TestimonialCountAggregateOutputType | null
    _avg: TestimonialAvgAggregateOutputType | null
    _sum: TestimonialSumAggregateOutputType | null
    _min: TestimonialMinAggregateOutputType | null
    _max: TestimonialMaxAggregateOutputType | null
  }

  type GetTestimonialGroupByPayload<T extends TestimonialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestimonialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestimonialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestimonialGroupByOutputType[P]>
            : GetScalarType<T[P], TestimonialGroupByOutputType[P]>
        }
      >
    >


  export type TestimonialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    quote?: boolean
    imageUrl?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["testimonial"]>

  export type TestimonialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    quote?: boolean
    imageUrl?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["testimonial"]>

  export type TestimonialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    quote?: boolean
    imageUrl?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["testimonial"]>

  export type TestimonialSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    quote?: boolean
    imageUrl?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TestimonialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "role" | "quote" | "imageUrl" | "isActive" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["testimonial"]>

  export type $TestimonialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Testimonial"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      role: string
      quote: string
      imageUrl: string | null
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["testimonial"]>
    composites: {}
  }

  type TestimonialGetPayload<S extends boolean | null | undefined | TestimonialDefaultArgs> = $Result.GetResult<Prisma.$TestimonialPayload, S>

  type TestimonialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestimonialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestimonialCountAggregateInputType | true
    }

  export interface TestimonialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Testimonial'], meta: { name: 'Testimonial' } }
    /**
     * Find zero or one Testimonial that matches the filter.
     * @param {TestimonialFindUniqueArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestimonialFindUniqueArgs>(args: SelectSubset<T, TestimonialFindUniqueArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Testimonial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestimonialFindUniqueOrThrowArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestimonialFindUniqueOrThrowArgs>(args: SelectSubset<T, TestimonialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Testimonial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindFirstArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestimonialFindFirstArgs>(args?: SelectSubset<T, TestimonialFindFirstArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Testimonial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindFirstOrThrowArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestimonialFindFirstOrThrowArgs>(args?: SelectSubset<T, TestimonialFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Testimonials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Testimonials
     * const testimonials = await prisma.testimonial.findMany()
     * 
     * // Get first 10 Testimonials
     * const testimonials = await prisma.testimonial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testimonialWithIdOnly = await prisma.testimonial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestimonialFindManyArgs>(args?: SelectSubset<T, TestimonialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Testimonial.
     * @param {TestimonialCreateArgs} args - Arguments to create a Testimonial.
     * @example
     * // Create one Testimonial
     * const Testimonial = await prisma.testimonial.create({
     *   data: {
     *     // ... data to create a Testimonial
     *   }
     * })
     * 
     */
    create<T extends TestimonialCreateArgs>(args: SelectSubset<T, TestimonialCreateArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Testimonials.
     * @param {TestimonialCreateManyArgs} args - Arguments to create many Testimonials.
     * @example
     * // Create many Testimonials
     * const testimonial = await prisma.testimonial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestimonialCreateManyArgs>(args?: SelectSubset<T, TestimonialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Testimonials and returns the data saved in the database.
     * @param {TestimonialCreateManyAndReturnArgs} args - Arguments to create many Testimonials.
     * @example
     * // Create many Testimonials
     * const testimonial = await prisma.testimonial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Testimonials and only return the `id`
     * const testimonialWithIdOnly = await prisma.testimonial.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestimonialCreateManyAndReturnArgs>(args?: SelectSubset<T, TestimonialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Testimonial.
     * @param {TestimonialDeleteArgs} args - Arguments to delete one Testimonial.
     * @example
     * // Delete one Testimonial
     * const Testimonial = await prisma.testimonial.delete({
     *   where: {
     *     // ... filter to delete one Testimonial
     *   }
     * })
     * 
     */
    delete<T extends TestimonialDeleteArgs>(args: SelectSubset<T, TestimonialDeleteArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Testimonial.
     * @param {TestimonialUpdateArgs} args - Arguments to update one Testimonial.
     * @example
     * // Update one Testimonial
     * const testimonial = await prisma.testimonial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestimonialUpdateArgs>(args: SelectSubset<T, TestimonialUpdateArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Testimonials.
     * @param {TestimonialDeleteManyArgs} args - Arguments to filter Testimonials to delete.
     * @example
     * // Delete a few Testimonials
     * const { count } = await prisma.testimonial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestimonialDeleteManyArgs>(args?: SelectSubset<T, TestimonialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Testimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Testimonials
     * const testimonial = await prisma.testimonial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestimonialUpdateManyArgs>(args: SelectSubset<T, TestimonialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Testimonials and returns the data updated in the database.
     * @param {TestimonialUpdateManyAndReturnArgs} args - Arguments to update many Testimonials.
     * @example
     * // Update many Testimonials
     * const testimonial = await prisma.testimonial.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Testimonials and only return the `id`
     * const testimonialWithIdOnly = await prisma.testimonial.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestimonialUpdateManyAndReturnArgs>(args: SelectSubset<T, TestimonialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Testimonial.
     * @param {TestimonialUpsertArgs} args - Arguments to update or create a Testimonial.
     * @example
     * // Update or create a Testimonial
     * const testimonial = await prisma.testimonial.upsert({
     *   create: {
     *     // ... data to create a Testimonial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Testimonial we want to update
     *   }
     * })
     */
    upsert<T extends TestimonialUpsertArgs>(args: SelectSubset<T, TestimonialUpsertArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Testimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialCountArgs} args - Arguments to filter Testimonials to count.
     * @example
     * // Count the number of Testimonials
     * const count = await prisma.testimonial.count({
     *   where: {
     *     // ... the filter for the Testimonials we want to count
     *   }
     * })
    **/
    count<T extends TestimonialCountArgs>(
      args?: Subset<T, TestimonialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestimonialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Testimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestimonialAggregateArgs>(args: Subset<T, TestimonialAggregateArgs>): Prisma.PrismaPromise<GetTestimonialAggregateType<T>>

    /**
     * Group by Testimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestimonialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestimonialGroupByArgs['orderBy'] }
        : { orderBy?: TestimonialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestimonialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestimonialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Testimonial model
   */
  readonly fields: TestimonialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Testimonial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestimonialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Testimonial model
   */
  interface TestimonialFieldRefs {
    readonly id: FieldRef<"Testimonial", 'String'>
    readonly name: FieldRef<"Testimonial", 'String'>
    readonly role: FieldRef<"Testimonial", 'String'>
    readonly quote: FieldRef<"Testimonial", 'String'>
    readonly imageUrl: FieldRef<"Testimonial", 'String'>
    readonly isActive: FieldRef<"Testimonial", 'Boolean'>
    readonly sortOrder: FieldRef<"Testimonial", 'Int'>
    readonly createdAt: FieldRef<"Testimonial", 'DateTime'>
    readonly updatedAt: FieldRef<"Testimonial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Testimonial findUnique
   */
  export type TestimonialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial findUniqueOrThrow
   */
  export type TestimonialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial findFirst
   */
  export type TestimonialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial findFirstOrThrow
   */
  export type TestimonialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial findMany
   */
  export type TestimonialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Filter, which Testimonials to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial create
   */
  export type TestimonialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * The data needed to create a Testimonial.
     */
    data: XOR<TestimonialCreateInput, TestimonialUncheckedCreateInput>
  }

  /**
   * Testimonial createMany
   */
  export type TestimonialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Testimonials.
     */
    data: TestimonialCreateManyInput | TestimonialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Testimonial createManyAndReturn
   */
  export type TestimonialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * The data used to create many Testimonials.
     */
    data: TestimonialCreateManyInput | TestimonialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Testimonial update
   */
  export type TestimonialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * The data needed to update a Testimonial.
     */
    data: XOR<TestimonialUpdateInput, TestimonialUncheckedUpdateInput>
    /**
     * Choose, which Testimonial to update.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial updateMany
   */
  export type TestimonialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Testimonials.
     */
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyInput>
    /**
     * Filter which Testimonials to update
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to update.
     */
    limit?: number
  }

  /**
   * Testimonial updateManyAndReturn
   */
  export type TestimonialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * The data used to update Testimonials.
     */
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyInput>
    /**
     * Filter which Testimonials to update
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to update.
     */
    limit?: number
  }

  /**
   * Testimonial upsert
   */
  export type TestimonialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * The filter to search for the Testimonial to update in case it exists.
     */
    where: TestimonialWhereUniqueInput
    /**
     * In case the Testimonial found by the `where` argument doesn't exist, create a new Testimonial with this data.
     */
    create: XOR<TestimonialCreateInput, TestimonialUncheckedCreateInput>
    /**
     * In case the Testimonial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestimonialUpdateInput, TestimonialUncheckedUpdateInput>
  }

  /**
   * Testimonial delete
   */
  export type TestimonialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Filter which Testimonial to delete.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial deleteMany
   */
  export type TestimonialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testimonials to delete
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to delete.
     */
    limit?: number
  }

  /**
   * Testimonial without action
   */
  export type TestimonialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
  }


  /**
   * Model Coach
   */

  export type AggregateCoach = {
    _count: CoachCountAggregateOutputType | null
    _avg: CoachAvgAggregateOutputType | null
    _sum: CoachSumAggregateOutputType | null
    _min: CoachMinAggregateOutputType | null
    _max: CoachMaxAggregateOutputType | null
  }

  export type CoachAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type CoachSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type CoachMinAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    bio: string | null
    imageUrl: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoachMaxAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    bio: string | null
    imageUrl: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CoachCountAggregateOutputType = {
    id: number
    name: number
    role: number
    bio: number
    imageUrl: number
    specialties: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CoachAvgAggregateInputType = {
    sortOrder?: true
  }

  export type CoachSumAggregateInputType = {
    sortOrder?: true
  }

  export type CoachMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    bio?: true
    imageUrl?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoachMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    bio?: true
    imageUrl?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CoachCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    bio?: true
    imageUrl?: true
    specialties?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CoachAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coach to aggregate.
     */
    where?: CoachWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coaches to fetch.
     */
    orderBy?: CoachOrderByWithRelationInput | CoachOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoachWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Coaches
    **/
    _count?: true | CoachCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoachAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoachSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoachMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoachMaxAggregateInputType
  }

  export type GetCoachAggregateType<T extends CoachAggregateArgs> = {
        [P in keyof T & keyof AggregateCoach]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoach[P]>
      : GetScalarType<T[P], AggregateCoach[P]>
  }




  export type CoachGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoachWhereInput
    orderBy?: CoachOrderByWithAggregationInput | CoachOrderByWithAggregationInput[]
    by: CoachScalarFieldEnum[] | CoachScalarFieldEnum
    having?: CoachScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoachCountAggregateInputType | true
    _avg?: CoachAvgAggregateInputType
    _sum?: CoachSumAggregateInputType
    _min?: CoachMinAggregateInputType
    _max?: CoachMaxAggregateInputType
  }

  export type CoachGroupByOutputType = {
    id: string
    name: string
    role: string
    bio: string
    imageUrl: string | null
    specialties: string[]
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: CoachCountAggregateOutputType | null
    _avg: CoachAvgAggregateOutputType | null
    _sum: CoachSumAggregateOutputType | null
    _min: CoachMinAggregateOutputType | null
    _max: CoachMaxAggregateOutputType | null
  }

  type GetCoachGroupByPayload<T extends CoachGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoachGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoachGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoachGroupByOutputType[P]>
            : GetScalarType<T[P], CoachGroupByOutputType[P]>
        }
      >
    >


  export type CoachSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    bio?: boolean
    imageUrl?: boolean
    specialties?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["coach"]>

  export type CoachSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    bio?: boolean
    imageUrl?: boolean
    specialties?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["coach"]>

  export type CoachSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    bio?: boolean
    imageUrl?: boolean
    specialties?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["coach"]>

  export type CoachSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    bio?: boolean
    imageUrl?: boolean
    specialties?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CoachOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "role" | "bio" | "imageUrl" | "specialties" | "isActive" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["coach"]>

  export type $CoachPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Coach"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      role: string
      bio: string
      imageUrl: string | null
      specialties: string[]
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["coach"]>
    composites: {}
  }

  type CoachGetPayload<S extends boolean | null | undefined | CoachDefaultArgs> = $Result.GetResult<Prisma.$CoachPayload, S>

  type CoachCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CoachFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CoachCountAggregateInputType | true
    }

  export interface CoachDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Coach'], meta: { name: 'Coach' } }
    /**
     * Find zero or one Coach that matches the filter.
     * @param {CoachFindUniqueArgs} args - Arguments to find a Coach
     * @example
     * // Get one Coach
     * const coach = await prisma.coach.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoachFindUniqueArgs>(args: SelectSubset<T, CoachFindUniqueArgs<ExtArgs>>): Prisma__CoachClient<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Coach that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CoachFindUniqueOrThrowArgs} args - Arguments to find a Coach
     * @example
     * // Get one Coach
     * const coach = await prisma.coach.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoachFindUniqueOrThrowArgs>(args: SelectSubset<T, CoachFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoachClient<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coach that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoachFindFirstArgs} args - Arguments to find a Coach
     * @example
     * // Get one Coach
     * const coach = await prisma.coach.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoachFindFirstArgs>(args?: SelectSubset<T, CoachFindFirstArgs<ExtArgs>>): Prisma__CoachClient<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coach that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoachFindFirstOrThrowArgs} args - Arguments to find a Coach
     * @example
     * // Get one Coach
     * const coach = await prisma.coach.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoachFindFirstOrThrowArgs>(args?: SelectSubset<T, CoachFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoachClient<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Coaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoachFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Coaches
     * const coaches = await prisma.coach.findMany()
     * 
     * // Get first 10 Coaches
     * const coaches = await prisma.coach.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coachWithIdOnly = await prisma.coach.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoachFindManyArgs>(args?: SelectSubset<T, CoachFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Coach.
     * @param {CoachCreateArgs} args - Arguments to create a Coach.
     * @example
     * // Create one Coach
     * const Coach = await prisma.coach.create({
     *   data: {
     *     // ... data to create a Coach
     *   }
     * })
     * 
     */
    create<T extends CoachCreateArgs>(args: SelectSubset<T, CoachCreateArgs<ExtArgs>>): Prisma__CoachClient<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Coaches.
     * @param {CoachCreateManyArgs} args - Arguments to create many Coaches.
     * @example
     * // Create many Coaches
     * const coach = await prisma.coach.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoachCreateManyArgs>(args?: SelectSubset<T, CoachCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Coaches and returns the data saved in the database.
     * @param {CoachCreateManyAndReturnArgs} args - Arguments to create many Coaches.
     * @example
     * // Create many Coaches
     * const coach = await prisma.coach.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Coaches and only return the `id`
     * const coachWithIdOnly = await prisma.coach.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CoachCreateManyAndReturnArgs>(args?: SelectSubset<T, CoachCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Coach.
     * @param {CoachDeleteArgs} args - Arguments to delete one Coach.
     * @example
     * // Delete one Coach
     * const Coach = await prisma.coach.delete({
     *   where: {
     *     // ... filter to delete one Coach
     *   }
     * })
     * 
     */
    delete<T extends CoachDeleteArgs>(args: SelectSubset<T, CoachDeleteArgs<ExtArgs>>): Prisma__CoachClient<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Coach.
     * @param {CoachUpdateArgs} args - Arguments to update one Coach.
     * @example
     * // Update one Coach
     * const coach = await prisma.coach.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoachUpdateArgs>(args: SelectSubset<T, CoachUpdateArgs<ExtArgs>>): Prisma__CoachClient<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Coaches.
     * @param {CoachDeleteManyArgs} args - Arguments to filter Coaches to delete.
     * @example
     * // Delete a few Coaches
     * const { count } = await prisma.coach.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoachDeleteManyArgs>(args?: SelectSubset<T, CoachDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoachUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Coaches
     * const coach = await prisma.coach.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoachUpdateManyArgs>(args: SelectSubset<T, CoachUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coaches and returns the data updated in the database.
     * @param {CoachUpdateManyAndReturnArgs} args - Arguments to update many Coaches.
     * @example
     * // Update many Coaches
     * const coach = await prisma.coach.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Coaches and only return the `id`
     * const coachWithIdOnly = await prisma.coach.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CoachUpdateManyAndReturnArgs>(args: SelectSubset<T, CoachUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Coach.
     * @param {CoachUpsertArgs} args - Arguments to update or create a Coach.
     * @example
     * // Update or create a Coach
     * const coach = await prisma.coach.upsert({
     *   create: {
     *     // ... data to create a Coach
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Coach we want to update
     *   }
     * })
     */
    upsert<T extends CoachUpsertArgs>(args: SelectSubset<T, CoachUpsertArgs<ExtArgs>>): Prisma__CoachClient<$Result.GetResult<Prisma.$CoachPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Coaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoachCountArgs} args - Arguments to filter Coaches to count.
     * @example
     * // Count the number of Coaches
     * const count = await prisma.coach.count({
     *   where: {
     *     // ... the filter for the Coaches we want to count
     *   }
     * })
    **/
    count<T extends CoachCountArgs>(
      args?: Subset<T, CoachCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoachCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Coach.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoachAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CoachAggregateArgs>(args: Subset<T, CoachAggregateArgs>): Prisma.PrismaPromise<GetCoachAggregateType<T>>

    /**
     * Group by Coach.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoachGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CoachGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoachGroupByArgs['orderBy'] }
        : { orderBy?: CoachGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoachGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoachGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Coach model
   */
  readonly fields: CoachFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Coach.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoachClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Coach model
   */
  interface CoachFieldRefs {
    readonly id: FieldRef<"Coach", 'String'>
    readonly name: FieldRef<"Coach", 'String'>
    readonly role: FieldRef<"Coach", 'String'>
    readonly bio: FieldRef<"Coach", 'String'>
    readonly imageUrl: FieldRef<"Coach", 'String'>
    readonly specialties: FieldRef<"Coach", 'String[]'>
    readonly isActive: FieldRef<"Coach", 'Boolean'>
    readonly sortOrder: FieldRef<"Coach", 'Int'>
    readonly createdAt: FieldRef<"Coach", 'DateTime'>
    readonly updatedAt: FieldRef<"Coach", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Coach findUnique
   */
  export type CoachFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * Filter, which Coach to fetch.
     */
    where: CoachWhereUniqueInput
  }

  /**
   * Coach findUniqueOrThrow
   */
  export type CoachFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * Filter, which Coach to fetch.
     */
    where: CoachWhereUniqueInput
  }

  /**
   * Coach findFirst
   */
  export type CoachFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * Filter, which Coach to fetch.
     */
    where?: CoachWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coaches to fetch.
     */
    orderBy?: CoachOrderByWithRelationInput | CoachOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coaches.
     */
    cursor?: CoachWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coaches.
     */
    distinct?: CoachScalarFieldEnum | CoachScalarFieldEnum[]
  }

  /**
   * Coach findFirstOrThrow
   */
  export type CoachFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * Filter, which Coach to fetch.
     */
    where?: CoachWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coaches to fetch.
     */
    orderBy?: CoachOrderByWithRelationInput | CoachOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coaches.
     */
    cursor?: CoachWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coaches.
     */
    distinct?: CoachScalarFieldEnum | CoachScalarFieldEnum[]
  }

  /**
   * Coach findMany
   */
  export type CoachFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * Filter, which Coaches to fetch.
     */
    where?: CoachWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coaches to fetch.
     */
    orderBy?: CoachOrderByWithRelationInput | CoachOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Coaches.
     */
    cursor?: CoachWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coaches.
     */
    distinct?: CoachScalarFieldEnum | CoachScalarFieldEnum[]
  }

  /**
   * Coach create
   */
  export type CoachCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * The data needed to create a Coach.
     */
    data: XOR<CoachCreateInput, CoachUncheckedCreateInput>
  }

  /**
   * Coach createMany
   */
  export type CoachCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Coaches.
     */
    data: CoachCreateManyInput | CoachCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Coach createManyAndReturn
   */
  export type CoachCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * The data used to create many Coaches.
     */
    data: CoachCreateManyInput | CoachCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Coach update
   */
  export type CoachUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * The data needed to update a Coach.
     */
    data: XOR<CoachUpdateInput, CoachUncheckedUpdateInput>
    /**
     * Choose, which Coach to update.
     */
    where: CoachWhereUniqueInput
  }

  /**
   * Coach updateMany
   */
  export type CoachUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Coaches.
     */
    data: XOR<CoachUpdateManyMutationInput, CoachUncheckedUpdateManyInput>
    /**
     * Filter which Coaches to update
     */
    where?: CoachWhereInput
    /**
     * Limit how many Coaches to update.
     */
    limit?: number
  }

  /**
   * Coach updateManyAndReturn
   */
  export type CoachUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * The data used to update Coaches.
     */
    data: XOR<CoachUpdateManyMutationInput, CoachUncheckedUpdateManyInput>
    /**
     * Filter which Coaches to update
     */
    where?: CoachWhereInput
    /**
     * Limit how many Coaches to update.
     */
    limit?: number
  }

  /**
   * Coach upsert
   */
  export type CoachUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * The filter to search for the Coach to update in case it exists.
     */
    where: CoachWhereUniqueInput
    /**
     * In case the Coach found by the `where` argument doesn't exist, create a new Coach with this data.
     */
    create: XOR<CoachCreateInput, CoachUncheckedCreateInput>
    /**
     * In case the Coach was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoachUpdateInput, CoachUncheckedUpdateInput>
  }

  /**
   * Coach delete
   */
  export type CoachDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
    /**
     * Filter which Coach to delete.
     */
    where: CoachWhereUniqueInput
  }

  /**
   * Coach deleteMany
   */
  export type CoachDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coaches to delete
     */
    where?: CoachWhereInput
    /**
     * Limit how many Coaches to delete.
     */
    limit?: number
  }

  /**
   * Coach without action
   */
  export type CoachDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coach
     */
    select?: CoachSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coach
     */
    omit?: CoachOmit<ExtArgs> | null
  }


  /**
   * Model Athlete
   */

  export type AggregateAthlete = {
    _count: AthleteCountAggregateOutputType | null
    _avg: AthleteAvgAggregateOutputType | null
    _sum: AthleteSumAggregateOutputType | null
    _min: AthleteMinAggregateOutputType | null
    _max: AthleteMaxAggregateOutputType | null
  }

  export type AthleteAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type AthleteSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type AthleteMinAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    bio: string | null
    imageUrl: string | null
    imageAlt: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AthleteMaxAggregateOutputType = {
    id: string | null
    name: string | null
    role: string | null
    bio: string | null
    imageUrl: string | null
    imageAlt: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AthleteCountAggregateOutputType = {
    id: number
    name: number
    role: number
    bio: number
    imageUrl: number
    imageAlt: number
    achievements: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AthleteAvgAggregateInputType = {
    sortOrder?: true
  }

  export type AthleteSumAggregateInputType = {
    sortOrder?: true
  }

  export type AthleteMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    bio?: true
    imageUrl?: true
    imageAlt?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AthleteMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    bio?: true
    imageUrl?: true
    imageAlt?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AthleteCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    bio?: true
    imageUrl?: true
    imageAlt?: true
    achievements?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AthleteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Athlete to aggregate.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Athletes
    **/
    _count?: true | AthleteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AthleteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AthleteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AthleteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AthleteMaxAggregateInputType
  }

  export type GetAthleteAggregateType<T extends AthleteAggregateArgs> = {
        [P in keyof T & keyof AggregateAthlete]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAthlete[P]>
      : GetScalarType<T[P], AggregateAthlete[P]>
  }




  export type AthleteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AthleteWhereInput
    orderBy?: AthleteOrderByWithAggregationInput | AthleteOrderByWithAggregationInput[]
    by: AthleteScalarFieldEnum[] | AthleteScalarFieldEnum
    having?: AthleteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AthleteCountAggregateInputType | true
    _avg?: AthleteAvgAggregateInputType
    _sum?: AthleteSumAggregateInputType
    _min?: AthleteMinAggregateInputType
    _max?: AthleteMaxAggregateInputType
  }

  export type AthleteGroupByOutputType = {
    id: string
    name: string
    role: string
    bio: string
    imageUrl: string | null
    imageAlt: string | null
    achievements: string[]
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: AthleteCountAggregateOutputType | null
    _avg: AthleteAvgAggregateOutputType | null
    _sum: AthleteSumAggregateOutputType | null
    _min: AthleteMinAggregateOutputType | null
    _max: AthleteMaxAggregateOutputType | null
  }

  type GetAthleteGroupByPayload<T extends AthleteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AthleteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AthleteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AthleteGroupByOutputType[P]>
            : GetScalarType<T[P], AthleteGroupByOutputType[P]>
        }
      >
    >


  export type AthleteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    bio?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    achievements?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    bio?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    achievements?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    bio?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    achievements?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["athlete"]>

  export type AthleteSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    bio?: boolean
    imageUrl?: boolean
    imageAlt?: boolean
    achievements?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AthleteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "role" | "bio" | "imageUrl" | "imageAlt" | "achievements" | "isActive" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["athlete"]>

  export type $AthletePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Athlete"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      role: string
      bio: string
      imageUrl: string | null
      imageAlt: string | null
      achievements: string[]
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["athlete"]>
    composites: {}
  }

  type AthleteGetPayload<S extends boolean | null | undefined | AthleteDefaultArgs> = $Result.GetResult<Prisma.$AthletePayload, S>

  type AthleteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AthleteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AthleteCountAggregateInputType | true
    }

  export interface AthleteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Athlete'], meta: { name: 'Athlete' } }
    /**
     * Find zero or one Athlete that matches the filter.
     * @param {AthleteFindUniqueArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AthleteFindUniqueArgs>(args: SelectSubset<T, AthleteFindUniqueArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Athlete that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AthleteFindUniqueOrThrowArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AthleteFindUniqueOrThrowArgs>(args: SelectSubset<T, AthleteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Athlete that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindFirstArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AthleteFindFirstArgs>(args?: SelectSubset<T, AthleteFindFirstArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Athlete that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindFirstOrThrowArgs} args - Arguments to find a Athlete
     * @example
     * // Get one Athlete
     * const athlete = await prisma.athlete.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AthleteFindFirstOrThrowArgs>(args?: SelectSubset<T, AthleteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Athletes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Athletes
     * const athletes = await prisma.athlete.findMany()
     * 
     * // Get first 10 Athletes
     * const athletes = await prisma.athlete.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const athleteWithIdOnly = await prisma.athlete.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AthleteFindManyArgs>(args?: SelectSubset<T, AthleteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Athlete.
     * @param {AthleteCreateArgs} args - Arguments to create a Athlete.
     * @example
     * // Create one Athlete
     * const Athlete = await prisma.athlete.create({
     *   data: {
     *     // ... data to create a Athlete
     *   }
     * })
     * 
     */
    create<T extends AthleteCreateArgs>(args: SelectSubset<T, AthleteCreateArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Athletes.
     * @param {AthleteCreateManyArgs} args - Arguments to create many Athletes.
     * @example
     * // Create many Athletes
     * const athlete = await prisma.athlete.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AthleteCreateManyArgs>(args?: SelectSubset<T, AthleteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Athletes and returns the data saved in the database.
     * @param {AthleteCreateManyAndReturnArgs} args - Arguments to create many Athletes.
     * @example
     * // Create many Athletes
     * const athlete = await prisma.athlete.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Athletes and only return the `id`
     * const athleteWithIdOnly = await prisma.athlete.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AthleteCreateManyAndReturnArgs>(args?: SelectSubset<T, AthleteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Athlete.
     * @param {AthleteDeleteArgs} args - Arguments to delete one Athlete.
     * @example
     * // Delete one Athlete
     * const Athlete = await prisma.athlete.delete({
     *   where: {
     *     // ... filter to delete one Athlete
     *   }
     * })
     * 
     */
    delete<T extends AthleteDeleteArgs>(args: SelectSubset<T, AthleteDeleteArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Athlete.
     * @param {AthleteUpdateArgs} args - Arguments to update one Athlete.
     * @example
     * // Update one Athlete
     * const athlete = await prisma.athlete.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AthleteUpdateArgs>(args: SelectSubset<T, AthleteUpdateArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Athletes.
     * @param {AthleteDeleteManyArgs} args - Arguments to filter Athletes to delete.
     * @example
     * // Delete a few Athletes
     * const { count } = await prisma.athlete.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AthleteDeleteManyArgs>(args?: SelectSubset<T, AthleteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Athletes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Athletes
     * const athlete = await prisma.athlete.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AthleteUpdateManyArgs>(args: SelectSubset<T, AthleteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Athletes and returns the data updated in the database.
     * @param {AthleteUpdateManyAndReturnArgs} args - Arguments to update many Athletes.
     * @example
     * // Update many Athletes
     * const athlete = await prisma.athlete.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Athletes and only return the `id`
     * const athleteWithIdOnly = await prisma.athlete.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AthleteUpdateManyAndReturnArgs>(args: SelectSubset<T, AthleteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Athlete.
     * @param {AthleteUpsertArgs} args - Arguments to update or create a Athlete.
     * @example
     * // Update or create a Athlete
     * const athlete = await prisma.athlete.upsert({
     *   create: {
     *     // ... data to create a Athlete
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Athlete we want to update
     *   }
     * })
     */
    upsert<T extends AthleteUpsertArgs>(args: SelectSubset<T, AthleteUpsertArgs<ExtArgs>>): Prisma__AthleteClient<$Result.GetResult<Prisma.$AthletePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Athletes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteCountArgs} args - Arguments to filter Athletes to count.
     * @example
     * // Count the number of Athletes
     * const count = await prisma.athlete.count({
     *   where: {
     *     // ... the filter for the Athletes we want to count
     *   }
     * })
    **/
    count<T extends AthleteCountArgs>(
      args?: Subset<T, AthleteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AthleteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Athlete.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AthleteAggregateArgs>(args: Subset<T, AthleteAggregateArgs>): Prisma.PrismaPromise<GetAthleteAggregateType<T>>

    /**
     * Group by Athlete.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AthleteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AthleteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AthleteGroupByArgs['orderBy'] }
        : { orderBy?: AthleteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AthleteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAthleteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Athlete model
   */
  readonly fields: AthleteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Athlete.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AthleteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Athlete model
   */
  interface AthleteFieldRefs {
    readonly id: FieldRef<"Athlete", 'String'>
    readonly name: FieldRef<"Athlete", 'String'>
    readonly role: FieldRef<"Athlete", 'String'>
    readonly bio: FieldRef<"Athlete", 'String'>
    readonly imageUrl: FieldRef<"Athlete", 'String'>
    readonly imageAlt: FieldRef<"Athlete", 'String'>
    readonly achievements: FieldRef<"Athlete", 'String[]'>
    readonly isActive: FieldRef<"Athlete", 'Boolean'>
    readonly sortOrder: FieldRef<"Athlete", 'Int'>
    readonly createdAt: FieldRef<"Athlete", 'DateTime'>
    readonly updatedAt: FieldRef<"Athlete", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Athlete findUnique
   */
  export type AthleteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete findUniqueOrThrow
   */
  export type AthleteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete findFirst
   */
  export type AthleteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Athletes.
     */
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete findFirstOrThrow
   */
  export type AthleteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Filter, which Athlete to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Athletes.
     */
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete findMany
   */
  export type AthleteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Filter, which Athletes to fetch.
     */
    where?: AthleteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Athletes to fetch.
     */
    orderBy?: AthleteOrderByWithRelationInput | AthleteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Athletes.
     */
    cursor?: AthleteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Athletes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Athletes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Athletes.
     */
    distinct?: AthleteScalarFieldEnum | AthleteScalarFieldEnum[]
  }

  /**
   * Athlete create
   */
  export type AthleteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The data needed to create a Athlete.
     */
    data: XOR<AthleteCreateInput, AthleteUncheckedCreateInput>
  }

  /**
   * Athlete createMany
   */
  export type AthleteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Athletes.
     */
    data: AthleteCreateManyInput | AthleteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Athlete createManyAndReturn
   */
  export type AthleteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The data used to create many Athletes.
     */
    data: AthleteCreateManyInput | AthleteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Athlete update
   */
  export type AthleteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The data needed to update a Athlete.
     */
    data: XOR<AthleteUpdateInput, AthleteUncheckedUpdateInput>
    /**
     * Choose, which Athlete to update.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete updateMany
   */
  export type AthleteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Athletes.
     */
    data: XOR<AthleteUpdateManyMutationInput, AthleteUncheckedUpdateManyInput>
    /**
     * Filter which Athletes to update
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to update.
     */
    limit?: number
  }

  /**
   * Athlete updateManyAndReturn
   */
  export type AthleteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The data used to update Athletes.
     */
    data: XOR<AthleteUpdateManyMutationInput, AthleteUncheckedUpdateManyInput>
    /**
     * Filter which Athletes to update
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to update.
     */
    limit?: number
  }

  /**
   * Athlete upsert
   */
  export type AthleteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * The filter to search for the Athlete to update in case it exists.
     */
    where: AthleteWhereUniqueInput
    /**
     * In case the Athlete found by the `where` argument doesn't exist, create a new Athlete with this data.
     */
    create: XOR<AthleteCreateInput, AthleteUncheckedCreateInput>
    /**
     * In case the Athlete was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AthleteUpdateInput, AthleteUncheckedUpdateInput>
  }

  /**
   * Athlete delete
   */
  export type AthleteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
    /**
     * Filter which Athlete to delete.
     */
    where: AthleteWhereUniqueInput
  }

  /**
   * Athlete deleteMany
   */
  export type AthleteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Athletes to delete
     */
    where?: AthleteWhereInput
    /**
     * Limit how many Athletes to delete.
     */
    limit?: number
  }

  /**
   * Athlete without action
   */
  export type AthleteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Athlete
     */
    select?: AthleteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Athlete
     */
    omit?: AthleteOmit<ExtArgs> | null
  }


  /**
   * Model HomeSetting
   */

  export type AggregateHomeSetting = {
    _count: HomeSettingCountAggregateOutputType | null
    _avg: HomeSettingAvgAggregateOutputType | null
    _sum: HomeSettingSumAggregateOutputType | null
    _min: HomeSettingMinAggregateOutputType | null
    _max: HomeSettingMaxAggregateOutputType | null
  }

  export type HomeSettingAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type HomeSettingSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type HomeSettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    title: string | null
    subtitle: string | null
    imageUrl: string | null
    ctaText: string | null
    ctaHref: string | null
    primaryStat: string | null
    primaryLabel: string | null
    secondaryStat: string | null
    secondaryLabel: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HomeSettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    title: string | null
    subtitle: string | null
    imageUrl: string | null
    ctaText: string | null
    ctaHref: string | null
    primaryStat: string | null
    primaryLabel: string | null
    secondaryStat: string | null
    secondaryLabel: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HomeSettingCountAggregateOutputType = {
    id: number
    key: number
    title: number
    subtitle: number
    imageUrl: number
    ctaText: number
    ctaHref: number
    primaryStat: number
    primaryLabel: number
    secondaryStat: number
    secondaryLabel: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HomeSettingAvgAggregateInputType = {
    sortOrder?: true
  }

  export type HomeSettingSumAggregateInputType = {
    sortOrder?: true
  }

  export type HomeSettingMinAggregateInputType = {
    id?: true
    key?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaHref?: true
    primaryStat?: true
    primaryLabel?: true
    secondaryStat?: true
    secondaryLabel?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HomeSettingMaxAggregateInputType = {
    id?: true
    key?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaHref?: true
    primaryStat?: true
    primaryLabel?: true
    secondaryStat?: true
    secondaryLabel?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HomeSettingCountAggregateInputType = {
    id?: true
    key?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaHref?: true
    primaryStat?: true
    primaryLabel?: true
    secondaryStat?: true
    secondaryLabel?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HomeSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HomeSetting to aggregate.
     */
    where?: HomeSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HomeSettings to fetch.
     */
    orderBy?: HomeSettingOrderByWithRelationInput | HomeSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HomeSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HomeSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HomeSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HomeSettings
    **/
    _count?: true | HomeSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HomeSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HomeSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HomeSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HomeSettingMaxAggregateInputType
  }

  export type GetHomeSettingAggregateType<T extends HomeSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateHomeSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHomeSetting[P]>
      : GetScalarType<T[P], AggregateHomeSetting[P]>
  }




  export type HomeSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HomeSettingWhereInput
    orderBy?: HomeSettingOrderByWithAggregationInput | HomeSettingOrderByWithAggregationInput[]
    by: HomeSettingScalarFieldEnum[] | HomeSettingScalarFieldEnum
    having?: HomeSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HomeSettingCountAggregateInputType | true
    _avg?: HomeSettingAvgAggregateInputType
    _sum?: HomeSettingSumAggregateInputType
    _min?: HomeSettingMinAggregateInputType
    _max?: HomeSettingMaxAggregateInputType
  }

  export type HomeSettingGroupByOutputType = {
    id: string
    key: string
    title: string | null
    subtitle: string | null
    imageUrl: string | null
    ctaText: string | null
    ctaHref: string | null
    primaryStat: string | null
    primaryLabel: string | null
    secondaryStat: string | null
    secondaryLabel: string | null
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: HomeSettingCountAggregateOutputType | null
    _avg: HomeSettingAvgAggregateOutputType | null
    _sum: HomeSettingSumAggregateOutputType | null
    _min: HomeSettingMinAggregateOutputType | null
    _max: HomeSettingMaxAggregateOutputType | null
  }

  type GetHomeSettingGroupByPayload<T extends HomeSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HomeSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HomeSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HomeSettingGroupByOutputType[P]>
            : GetScalarType<T[P], HomeSettingGroupByOutputType[P]>
        }
      >
    >


  export type HomeSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaHref?: boolean
    primaryStat?: boolean
    primaryLabel?: boolean
    secondaryStat?: boolean
    secondaryLabel?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["homeSetting"]>

  export type HomeSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaHref?: boolean
    primaryStat?: boolean
    primaryLabel?: boolean
    secondaryStat?: boolean
    secondaryLabel?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["homeSetting"]>

  export type HomeSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaHref?: boolean
    primaryStat?: boolean
    primaryLabel?: boolean
    secondaryStat?: boolean
    secondaryLabel?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["homeSetting"]>

  export type HomeSettingSelectScalar = {
    id?: boolean
    key?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaHref?: boolean
    primaryStat?: boolean
    primaryLabel?: boolean
    secondaryStat?: boolean
    secondaryLabel?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HomeSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "title" | "subtitle" | "imageUrl" | "ctaText" | "ctaHref" | "primaryStat" | "primaryLabel" | "secondaryStat" | "secondaryLabel" | "isActive" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["homeSetting"]>

  export type $HomeSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HomeSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      title: string | null
      subtitle: string | null
      imageUrl: string | null
      ctaText: string | null
      ctaHref: string | null
      primaryStat: string | null
      primaryLabel: string | null
      secondaryStat: string | null
      secondaryLabel: string | null
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["homeSetting"]>
    composites: {}
  }

  type HomeSettingGetPayload<S extends boolean | null | undefined | HomeSettingDefaultArgs> = $Result.GetResult<Prisma.$HomeSettingPayload, S>

  type HomeSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HomeSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HomeSettingCountAggregateInputType | true
    }

  export interface HomeSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HomeSetting'], meta: { name: 'HomeSetting' } }
    /**
     * Find zero or one HomeSetting that matches the filter.
     * @param {HomeSettingFindUniqueArgs} args - Arguments to find a HomeSetting
     * @example
     * // Get one HomeSetting
     * const homeSetting = await prisma.homeSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HomeSettingFindUniqueArgs>(args: SelectSubset<T, HomeSettingFindUniqueArgs<ExtArgs>>): Prisma__HomeSettingClient<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HomeSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HomeSettingFindUniqueOrThrowArgs} args - Arguments to find a HomeSetting
     * @example
     * // Get one HomeSetting
     * const homeSetting = await prisma.homeSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HomeSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, HomeSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HomeSettingClient<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HomeSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeSettingFindFirstArgs} args - Arguments to find a HomeSetting
     * @example
     * // Get one HomeSetting
     * const homeSetting = await prisma.homeSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HomeSettingFindFirstArgs>(args?: SelectSubset<T, HomeSettingFindFirstArgs<ExtArgs>>): Prisma__HomeSettingClient<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HomeSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeSettingFindFirstOrThrowArgs} args - Arguments to find a HomeSetting
     * @example
     * // Get one HomeSetting
     * const homeSetting = await prisma.homeSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HomeSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, HomeSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__HomeSettingClient<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HomeSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HomeSettings
     * const homeSettings = await prisma.homeSetting.findMany()
     * 
     * // Get first 10 HomeSettings
     * const homeSettings = await prisma.homeSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const homeSettingWithIdOnly = await prisma.homeSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HomeSettingFindManyArgs>(args?: SelectSubset<T, HomeSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HomeSetting.
     * @param {HomeSettingCreateArgs} args - Arguments to create a HomeSetting.
     * @example
     * // Create one HomeSetting
     * const HomeSetting = await prisma.homeSetting.create({
     *   data: {
     *     // ... data to create a HomeSetting
     *   }
     * })
     * 
     */
    create<T extends HomeSettingCreateArgs>(args: SelectSubset<T, HomeSettingCreateArgs<ExtArgs>>): Prisma__HomeSettingClient<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HomeSettings.
     * @param {HomeSettingCreateManyArgs} args - Arguments to create many HomeSettings.
     * @example
     * // Create many HomeSettings
     * const homeSetting = await prisma.homeSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HomeSettingCreateManyArgs>(args?: SelectSubset<T, HomeSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HomeSettings and returns the data saved in the database.
     * @param {HomeSettingCreateManyAndReturnArgs} args - Arguments to create many HomeSettings.
     * @example
     * // Create many HomeSettings
     * const homeSetting = await prisma.homeSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HomeSettings and only return the `id`
     * const homeSettingWithIdOnly = await prisma.homeSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HomeSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, HomeSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HomeSetting.
     * @param {HomeSettingDeleteArgs} args - Arguments to delete one HomeSetting.
     * @example
     * // Delete one HomeSetting
     * const HomeSetting = await prisma.homeSetting.delete({
     *   where: {
     *     // ... filter to delete one HomeSetting
     *   }
     * })
     * 
     */
    delete<T extends HomeSettingDeleteArgs>(args: SelectSubset<T, HomeSettingDeleteArgs<ExtArgs>>): Prisma__HomeSettingClient<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HomeSetting.
     * @param {HomeSettingUpdateArgs} args - Arguments to update one HomeSetting.
     * @example
     * // Update one HomeSetting
     * const homeSetting = await prisma.homeSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HomeSettingUpdateArgs>(args: SelectSubset<T, HomeSettingUpdateArgs<ExtArgs>>): Prisma__HomeSettingClient<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HomeSettings.
     * @param {HomeSettingDeleteManyArgs} args - Arguments to filter HomeSettings to delete.
     * @example
     * // Delete a few HomeSettings
     * const { count } = await prisma.homeSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HomeSettingDeleteManyArgs>(args?: SelectSubset<T, HomeSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HomeSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HomeSettings
     * const homeSetting = await prisma.homeSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HomeSettingUpdateManyArgs>(args: SelectSubset<T, HomeSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HomeSettings and returns the data updated in the database.
     * @param {HomeSettingUpdateManyAndReturnArgs} args - Arguments to update many HomeSettings.
     * @example
     * // Update many HomeSettings
     * const homeSetting = await prisma.homeSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HomeSettings and only return the `id`
     * const homeSettingWithIdOnly = await prisma.homeSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HomeSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, HomeSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HomeSetting.
     * @param {HomeSettingUpsertArgs} args - Arguments to update or create a HomeSetting.
     * @example
     * // Update or create a HomeSetting
     * const homeSetting = await prisma.homeSetting.upsert({
     *   create: {
     *     // ... data to create a HomeSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HomeSetting we want to update
     *   }
     * })
     */
    upsert<T extends HomeSettingUpsertArgs>(args: SelectSubset<T, HomeSettingUpsertArgs<ExtArgs>>): Prisma__HomeSettingClient<$Result.GetResult<Prisma.$HomeSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HomeSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeSettingCountArgs} args - Arguments to filter HomeSettings to count.
     * @example
     * // Count the number of HomeSettings
     * const count = await prisma.homeSetting.count({
     *   where: {
     *     // ... the filter for the HomeSettings we want to count
     *   }
     * })
    **/
    count<T extends HomeSettingCountArgs>(
      args?: Subset<T, HomeSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HomeSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HomeSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HomeSettingAggregateArgs>(args: Subset<T, HomeSettingAggregateArgs>): Prisma.PrismaPromise<GetHomeSettingAggregateType<T>>

    /**
     * Group by HomeSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HomeSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HomeSettingGroupByArgs['orderBy'] }
        : { orderBy?: HomeSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HomeSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHomeSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HomeSetting model
   */
  readonly fields: HomeSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HomeSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HomeSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HomeSetting model
   */
  interface HomeSettingFieldRefs {
    readonly id: FieldRef<"HomeSetting", 'String'>
    readonly key: FieldRef<"HomeSetting", 'String'>
    readonly title: FieldRef<"HomeSetting", 'String'>
    readonly subtitle: FieldRef<"HomeSetting", 'String'>
    readonly imageUrl: FieldRef<"HomeSetting", 'String'>
    readonly ctaText: FieldRef<"HomeSetting", 'String'>
    readonly ctaHref: FieldRef<"HomeSetting", 'String'>
    readonly primaryStat: FieldRef<"HomeSetting", 'String'>
    readonly primaryLabel: FieldRef<"HomeSetting", 'String'>
    readonly secondaryStat: FieldRef<"HomeSetting", 'String'>
    readonly secondaryLabel: FieldRef<"HomeSetting", 'String'>
    readonly isActive: FieldRef<"HomeSetting", 'Boolean'>
    readonly sortOrder: FieldRef<"HomeSetting", 'Int'>
    readonly createdAt: FieldRef<"HomeSetting", 'DateTime'>
    readonly updatedAt: FieldRef<"HomeSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HomeSetting findUnique
   */
  export type HomeSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * Filter, which HomeSetting to fetch.
     */
    where: HomeSettingWhereUniqueInput
  }

  /**
   * HomeSetting findUniqueOrThrow
   */
  export type HomeSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * Filter, which HomeSetting to fetch.
     */
    where: HomeSettingWhereUniqueInput
  }

  /**
   * HomeSetting findFirst
   */
  export type HomeSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * Filter, which HomeSetting to fetch.
     */
    where?: HomeSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HomeSettings to fetch.
     */
    orderBy?: HomeSettingOrderByWithRelationInput | HomeSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HomeSettings.
     */
    cursor?: HomeSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HomeSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HomeSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HomeSettings.
     */
    distinct?: HomeSettingScalarFieldEnum | HomeSettingScalarFieldEnum[]
  }

  /**
   * HomeSetting findFirstOrThrow
   */
  export type HomeSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * Filter, which HomeSetting to fetch.
     */
    where?: HomeSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HomeSettings to fetch.
     */
    orderBy?: HomeSettingOrderByWithRelationInput | HomeSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HomeSettings.
     */
    cursor?: HomeSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HomeSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HomeSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HomeSettings.
     */
    distinct?: HomeSettingScalarFieldEnum | HomeSettingScalarFieldEnum[]
  }

  /**
   * HomeSetting findMany
   */
  export type HomeSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * Filter, which HomeSettings to fetch.
     */
    where?: HomeSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HomeSettings to fetch.
     */
    orderBy?: HomeSettingOrderByWithRelationInput | HomeSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HomeSettings.
     */
    cursor?: HomeSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HomeSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HomeSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HomeSettings.
     */
    distinct?: HomeSettingScalarFieldEnum | HomeSettingScalarFieldEnum[]
  }

  /**
   * HomeSetting create
   */
  export type HomeSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a HomeSetting.
     */
    data: XOR<HomeSettingCreateInput, HomeSettingUncheckedCreateInput>
  }

  /**
   * HomeSetting createMany
   */
  export type HomeSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HomeSettings.
     */
    data: HomeSettingCreateManyInput | HomeSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HomeSetting createManyAndReturn
   */
  export type HomeSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * The data used to create many HomeSettings.
     */
    data: HomeSettingCreateManyInput | HomeSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HomeSetting update
   */
  export type HomeSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a HomeSetting.
     */
    data: XOR<HomeSettingUpdateInput, HomeSettingUncheckedUpdateInput>
    /**
     * Choose, which HomeSetting to update.
     */
    where: HomeSettingWhereUniqueInput
  }

  /**
   * HomeSetting updateMany
   */
  export type HomeSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HomeSettings.
     */
    data: XOR<HomeSettingUpdateManyMutationInput, HomeSettingUncheckedUpdateManyInput>
    /**
     * Filter which HomeSettings to update
     */
    where?: HomeSettingWhereInput
    /**
     * Limit how many HomeSettings to update.
     */
    limit?: number
  }

  /**
   * HomeSetting updateManyAndReturn
   */
  export type HomeSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * The data used to update HomeSettings.
     */
    data: XOR<HomeSettingUpdateManyMutationInput, HomeSettingUncheckedUpdateManyInput>
    /**
     * Filter which HomeSettings to update
     */
    where?: HomeSettingWhereInput
    /**
     * Limit how many HomeSettings to update.
     */
    limit?: number
  }

  /**
   * HomeSetting upsert
   */
  export type HomeSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the HomeSetting to update in case it exists.
     */
    where: HomeSettingWhereUniqueInput
    /**
     * In case the HomeSetting found by the `where` argument doesn't exist, create a new HomeSetting with this data.
     */
    create: XOR<HomeSettingCreateInput, HomeSettingUncheckedCreateInput>
    /**
     * In case the HomeSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HomeSettingUpdateInput, HomeSettingUncheckedUpdateInput>
  }

  /**
   * HomeSetting delete
   */
  export type HomeSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
    /**
     * Filter which HomeSetting to delete.
     */
    where: HomeSettingWhereUniqueInput
  }

  /**
   * HomeSetting deleteMany
   */
  export type HomeSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HomeSettings to delete
     */
    where?: HomeSettingWhereInput
    /**
     * Limit how many HomeSettings to delete.
     */
    limit?: number
  }

  /**
   * HomeSetting without action
   */
  export type HomeSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeSetting
     */
    select?: HomeSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeSetting
     */
    omit?: HomeSettingOmit<ExtArgs> | null
  }


  /**
   * Model HeroSlide
   */

  export type AggregateHeroSlide = {
    _count: HeroSlideCountAggregateOutputType | null
    _avg: HeroSlideAvgAggregateOutputType | null
    _sum: HeroSlideSumAggregateOutputType | null
    _min: HeroSlideMinAggregateOutputType | null
    _max: HeroSlideMaxAggregateOutputType | null
  }

  export type HeroSlideAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type HeroSlideSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type HeroSlideMinAggregateOutputType = {
    id: string | null
    title: string | null
    subtitle: string | null
    imageUrl: string | null
    ctaText: string | null
    ctaHref: string | null
    buttonVariant: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HeroSlideMaxAggregateOutputType = {
    id: string | null
    title: string | null
    subtitle: string | null
    imageUrl: string | null
    ctaText: string | null
    ctaHref: string | null
    buttonVariant: string | null
    isActive: boolean | null
    sortOrder: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HeroSlideCountAggregateOutputType = {
    id: number
    title: number
    subtitle: number
    imageUrl: number
    ctaText: number
    ctaHref: number
    buttonVariant: number
    isActive: number
    sortOrder: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HeroSlideAvgAggregateInputType = {
    sortOrder?: true
  }

  export type HeroSlideSumAggregateInputType = {
    sortOrder?: true
  }

  export type HeroSlideMinAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaHref?: true
    buttonVariant?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HeroSlideMaxAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaHref?: true
    buttonVariant?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HeroSlideCountAggregateInputType = {
    id?: true
    title?: true
    subtitle?: true
    imageUrl?: true
    ctaText?: true
    ctaHref?: true
    buttonVariant?: true
    isActive?: true
    sortOrder?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HeroSlideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HeroSlide to aggregate.
     */
    where?: HeroSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroSlides to fetch.
     */
    orderBy?: HeroSlideOrderByWithRelationInput | HeroSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HeroSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HeroSlides
    **/
    _count?: true | HeroSlideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HeroSlideAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HeroSlideSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HeroSlideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HeroSlideMaxAggregateInputType
  }

  export type GetHeroSlideAggregateType<T extends HeroSlideAggregateArgs> = {
        [P in keyof T & keyof AggregateHeroSlide]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHeroSlide[P]>
      : GetScalarType<T[P], AggregateHeroSlide[P]>
  }




  export type HeroSlideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HeroSlideWhereInput
    orderBy?: HeroSlideOrderByWithAggregationInput | HeroSlideOrderByWithAggregationInput[]
    by: HeroSlideScalarFieldEnum[] | HeroSlideScalarFieldEnum
    having?: HeroSlideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HeroSlideCountAggregateInputType | true
    _avg?: HeroSlideAvgAggregateInputType
    _sum?: HeroSlideSumAggregateInputType
    _min?: HeroSlideMinAggregateInputType
    _max?: HeroSlideMaxAggregateInputType
  }

  export type HeroSlideGroupByOutputType = {
    id: string
    title: string
    subtitle: string
    imageUrl: string | null
    ctaText: string | null
    ctaHref: string | null
    buttonVariant: string
    isActive: boolean
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    _count: HeroSlideCountAggregateOutputType | null
    _avg: HeroSlideAvgAggregateOutputType | null
    _sum: HeroSlideSumAggregateOutputType | null
    _min: HeroSlideMinAggregateOutputType | null
    _max: HeroSlideMaxAggregateOutputType | null
  }

  type GetHeroSlideGroupByPayload<T extends HeroSlideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HeroSlideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HeroSlideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HeroSlideGroupByOutputType[P]>
            : GetScalarType<T[P], HeroSlideGroupByOutputType[P]>
        }
      >
    >


  export type HeroSlideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaHref?: boolean
    buttonVariant?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["heroSlide"]>

  export type HeroSlideSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaHref?: boolean
    buttonVariant?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["heroSlide"]>

  export type HeroSlideSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaHref?: boolean
    buttonVariant?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["heroSlide"]>

  export type HeroSlideSelectScalar = {
    id?: boolean
    title?: boolean
    subtitle?: boolean
    imageUrl?: boolean
    ctaText?: boolean
    ctaHref?: boolean
    buttonVariant?: boolean
    isActive?: boolean
    sortOrder?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HeroSlideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "subtitle" | "imageUrl" | "ctaText" | "ctaHref" | "buttonVariant" | "isActive" | "sortOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["heroSlide"]>

  export type $HeroSlidePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HeroSlide"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      subtitle: string
      imageUrl: string | null
      ctaText: string | null
      ctaHref: string | null
      buttonVariant: string
      isActive: boolean
      sortOrder: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["heroSlide"]>
    composites: {}
  }

  type HeroSlideGetPayload<S extends boolean | null | undefined | HeroSlideDefaultArgs> = $Result.GetResult<Prisma.$HeroSlidePayload, S>

  type HeroSlideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HeroSlideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HeroSlideCountAggregateInputType | true
    }

  export interface HeroSlideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HeroSlide'], meta: { name: 'HeroSlide' } }
    /**
     * Find zero or one HeroSlide that matches the filter.
     * @param {HeroSlideFindUniqueArgs} args - Arguments to find a HeroSlide
     * @example
     * // Get one HeroSlide
     * const heroSlide = await prisma.heroSlide.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HeroSlideFindUniqueArgs>(args: SelectSubset<T, HeroSlideFindUniqueArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HeroSlide that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HeroSlideFindUniqueOrThrowArgs} args - Arguments to find a HeroSlide
     * @example
     * // Get one HeroSlide
     * const heroSlide = await prisma.heroSlide.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HeroSlideFindUniqueOrThrowArgs>(args: SelectSubset<T, HeroSlideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HeroSlide that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideFindFirstArgs} args - Arguments to find a HeroSlide
     * @example
     * // Get one HeroSlide
     * const heroSlide = await prisma.heroSlide.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HeroSlideFindFirstArgs>(args?: SelectSubset<T, HeroSlideFindFirstArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HeroSlide that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideFindFirstOrThrowArgs} args - Arguments to find a HeroSlide
     * @example
     * // Get one HeroSlide
     * const heroSlide = await prisma.heroSlide.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HeroSlideFindFirstOrThrowArgs>(args?: SelectSubset<T, HeroSlideFindFirstOrThrowArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HeroSlides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HeroSlides
     * const heroSlides = await prisma.heroSlide.findMany()
     * 
     * // Get first 10 HeroSlides
     * const heroSlides = await prisma.heroSlide.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const heroSlideWithIdOnly = await prisma.heroSlide.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HeroSlideFindManyArgs>(args?: SelectSubset<T, HeroSlideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HeroSlide.
     * @param {HeroSlideCreateArgs} args - Arguments to create a HeroSlide.
     * @example
     * // Create one HeroSlide
     * const HeroSlide = await prisma.heroSlide.create({
     *   data: {
     *     // ... data to create a HeroSlide
     *   }
     * })
     * 
     */
    create<T extends HeroSlideCreateArgs>(args: SelectSubset<T, HeroSlideCreateArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HeroSlides.
     * @param {HeroSlideCreateManyArgs} args - Arguments to create many HeroSlides.
     * @example
     * // Create many HeroSlides
     * const heroSlide = await prisma.heroSlide.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HeroSlideCreateManyArgs>(args?: SelectSubset<T, HeroSlideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HeroSlides and returns the data saved in the database.
     * @param {HeroSlideCreateManyAndReturnArgs} args - Arguments to create many HeroSlides.
     * @example
     * // Create many HeroSlides
     * const heroSlide = await prisma.heroSlide.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HeroSlides and only return the `id`
     * const heroSlideWithIdOnly = await prisma.heroSlide.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HeroSlideCreateManyAndReturnArgs>(args?: SelectSubset<T, HeroSlideCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HeroSlide.
     * @param {HeroSlideDeleteArgs} args - Arguments to delete one HeroSlide.
     * @example
     * // Delete one HeroSlide
     * const HeroSlide = await prisma.heroSlide.delete({
     *   where: {
     *     // ... filter to delete one HeroSlide
     *   }
     * })
     * 
     */
    delete<T extends HeroSlideDeleteArgs>(args: SelectSubset<T, HeroSlideDeleteArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HeroSlide.
     * @param {HeroSlideUpdateArgs} args - Arguments to update one HeroSlide.
     * @example
     * // Update one HeroSlide
     * const heroSlide = await prisma.heroSlide.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HeroSlideUpdateArgs>(args: SelectSubset<T, HeroSlideUpdateArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HeroSlides.
     * @param {HeroSlideDeleteManyArgs} args - Arguments to filter HeroSlides to delete.
     * @example
     * // Delete a few HeroSlides
     * const { count } = await prisma.heroSlide.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HeroSlideDeleteManyArgs>(args?: SelectSubset<T, HeroSlideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HeroSlides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HeroSlides
     * const heroSlide = await prisma.heroSlide.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HeroSlideUpdateManyArgs>(args: SelectSubset<T, HeroSlideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HeroSlides and returns the data updated in the database.
     * @param {HeroSlideUpdateManyAndReturnArgs} args - Arguments to update many HeroSlides.
     * @example
     * // Update many HeroSlides
     * const heroSlide = await prisma.heroSlide.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HeroSlides and only return the `id`
     * const heroSlideWithIdOnly = await prisma.heroSlide.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HeroSlideUpdateManyAndReturnArgs>(args: SelectSubset<T, HeroSlideUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HeroSlide.
     * @param {HeroSlideUpsertArgs} args - Arguments to update or create a HeroSlide.
     * @example
     * // Update or create a HeroSlide
     * const heroSlide = await prisma.heroSlide.upsert({
     *   create: {
     *     // ... data to create a HeroSlide
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HeroSlide we want to update
     *   }
     * })
     */
    upsert<T extends HeroSlideUpsertArgs>(args: SelectSubset<T, HeroSlideUpsertArgs<ExtArgs>>): Prisma__HeroSlideClient<$Result.GetResult<Prisma.$HeroSlidePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HeroSlides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideCountArgs} args - Arguments to filter HeroSlides to count.
     * @example
     * // Count the number of HeroSlides
     * const count = await prisma.heroSlide.count({
     *   where: {
     *     // ... the filter for the HeroSlides we want to count
     *   }
     * })
    **/
    count<T extends HeroSlideCountArgs>(
      args?: Subset<T, HeroSlideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HeroSlideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HeroSlide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HeroSlideAggregateArgs>(args: Subset<T, HeroSlideAggregateArgs>): Prisma.PrismaPromise<GetHeroSlideAggregateType<T>>

    /**
     * Group by HeroSlide.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HeroSlideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HeroSlideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HeroSlideGroupByArgs['orderBy'] }
        : { orderBy?: HeroSlideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HeroSlideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHeroSlideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HeroSlide model
   */
  readonly fields: HeroSlideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HeroSlide.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HeroSlideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HeroSlide model
   */
  interface HeroSlideFieldRefs {
    readonly id: FieldRef<"HeroSlide", 'String'>
    readonly title: FieldRef<"HeroSlide", 'String'>
    readonly subtitle: FieldRef<"HeroSlide", 'String'>
    readonly imageUrl: FieldRef<"HeroSlide", 'String'>
    readonly ctaText: FieldRef<"HeroSlide", 'String'>
    readonly ctaHref: FieldRef<"HeroSlide", 'String'>
    readonly buttonVariant: FieldRef<"HeroSlide", 'String'>
    readonly isActive: FieldRef<"HeroSlide", 'Boolean'>
    readonly sortOrder: FieldRef<"HeroSlide", 'Int'>
    readonly createdAt: FieldRef<"HeroSlide", 'DateTime'>
    readonly updatedAt: FieldRef<"HeroSlide", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HeroSlide findUnique
   */
  export type HeroSlideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlide to fetch.
     */
    where: HeroSlideWhereUniqueInput
  }

  /**
   * HeroSlide findUniqueOrThrow
   */
  export type HeroSlideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlide to fetch.
     */
    where: HeroSlideWhereUniqueInput
  }

  /**
   * HeroSlide findFirst
   */
  export type HeroSlideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlide to fetch.
     */
    where?: HeroSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroSlides to fetch.
     */
    orderBy?: HeroSlideOrderByWithRelationInput | HeroSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HeroSlides.
     */
    cursor?: HeroSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HeroSlides.
     */
    distinct?: HeroSlideScalarFieldEnum | HeroSlideScalarFieldEnum[]
  }

  /**
   * HeroSlide findFirstOrThrow
   */
  export type HeroSlideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlide to fetch.
     */
    where?: HeroSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroSlides to fetch.
     */
    orderBy?: HeroSlideOrderByWithRelationInput | HeroSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HeroSlides.
     */
    cursor?: HeroSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HeroSlides.
     */
    distinct?: HeroSlideScalarFieldEnum | HeroSlideScalarFieldEnum[]
  }

  /**
   * HeroSlide findMany
   */
  export type HeroSlideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter, which HeroSlides to fetch.
     */
    where?: HeroSlideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HeroSlides to fetch.
     */
    orderBy?: HeroSlideOrderByWithRelationInput | HeroSlideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HeroSlides.
     */
    cursor?: HeroSlideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HeroSlides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HeroSlides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HeroSlides.
     */
    distinct?: HeroSlideScalarFieldEnum | HeroSlideScalarFieldEnum[]
  }

  /**
   * HeroSlide create
   */
  export type HeroSlideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The data needed to create a HeroSlide.
     */
    data: XOR<HeroSlideCreateInput, HeroSlideUncheckedCreateInput>
  }

  /**
   * HeroSlide createMany
   */
  export type HeroSlideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HeroSlides.
     */
    data: HeroSlideCreateManyInput | HeroSlideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HeroSlide createManyAndReturn
   */
  export type HeroSlideCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The data used to create many HeroSlides.
     */
    data: HeroSlideCreateManyInput | HeroSlideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HeroSlide update
   */
  export type HeroSlideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The data needed to update a HeroSlide.
     */
    data: XOR<HeroSlideUpdateInput, HeroSlideUncheckedUpdateInput>
    /**
     * Choose, which HeroSlide to update.
     */
    where: HeroSlideWhereUniqueInput
  }

  /**
   * HeroSlide updateMany
   */
  export type HeroSlideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HeroSlides.
     */
    data: XOR<HeroSlideUpdateManyMutationInput, HeroSlideUncheckedUpdateManyInput>
    /**
     * Filter which HeroSlides to update
     */
    where?: HeroSlideWhereInput
    /**
     * Limit how many HeroSlides to update.
     */
    limit?: number
  }

  /**
   * HeroSlide updateManyAndReturn
   */
  export type HeroSlideUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The data used to update HeroSlides.
     */
    data: XOR<HeroSlideUpdateManyMutationInput, HeroSlideUncheckedUpdateManyInput>
    /**
     * Filter which HeroSlides to update
     */
    where?: HeroSlideWhereInput
    /**
     * Limit how many HeroSlides to update.
     */
    limit?: number
  }

  /**
   * HeroSlide upsert
   */
  export type HeroSlideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * The filter to search for the HeroSlide to update in case it exists.
     */
    where: HeroSlideWhereUniqueInput
    /**
     * In case the HeroSlide found by the `where` argument doesn't exist, create a new HeroSlide with this data.
     */
    create: XOR<HeroSlideCreateInput, HeroSlideUncheckedCreateInput>
    /**
     * In case the HeroSlide was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HeroSlideUpdateInput, HeroSlideUncheckedUpdateInput>
  }

  /**
   * HeroSlide delete
   */
  export type HeroSlideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
    /**
     * Filter which HeroSlide to delete.
     */
    where: HeroSlideWhereUniqueInput
  }

  /**
   * HeroSlide deleteMany
   */
  export type HeroSlideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HeroSlides to delete
     */
    where?: HeroSlideWhereInput
    /**
     * Limit how many HeroSlides to delete.
     */
    limit?: number
  }

  /**
   * HeroSlide without action
   */
  export type HeroSlideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HeroSlide
     */
    select?: HeroSlideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HeroSlide
     */
    omit?: HeroSlideOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    passwordHash: 'passwordHash',
    phone: 'phone',
    role: 'role',
    isActive: 'isActive',
    sessionVersion: 'sessionVersion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const ContactMessageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    message: 'message',
    read: 'read',
    createdAt: 'createdAt'
  };

  export type ContactMessageScalarFieldEnum = (typeof ContactMessageScalarFieldEnum)[keyof typeof ContactMessageScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    category: 'category',
    name: 'name',
    modality: 'modality',
    excerpt: 'excerpt',
    idealFor: 'idealFor',
    price: 'price',
    currency: 'currency',
    imageUrl: 'imageUrl',
    imageAlt: 'imageAlt',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const PlanFeatureScalarFieldEnum: {
    id: 'id',
    planId: 'planId',
    text: 'text',
    sortOrder: 'sortOrder'
  };

  export type PlanFeatureScalarFieldEnum = (typeof PlanFeatureScalarFieldEnum)[keyof typeof PlanFeatureScalarFieldEnum]


  export const NewsPostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    excerpt: 'excerpt',
    date: 'date',
    category: 'category',
    imageUrl: 'imageUrl',
    published: 'published',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsPostScalarFieldEnum = (typeof NewsPostScalarFieldEnum)[keyof typeof NewsPostScalarFieldEnum]


  export const RaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    date: 'date',
    location: 'location',
    type: 'type',
    distance: 'distance',
    description: 'description',
    registrationUrl: 'registrationUrl',
    status: 'status',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RaceScalarFieldEnum = (typeof RaceScalarFieldEnum)[keyof typeof RaceScalarFieldEnum]


  export const TestimonialScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    quote: 'quote',
    imageUrl: 'imageUrl',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TestimonialScalarFieldEnum = (typeof TestimonialScalarFieldEnum)[keyof typeof TestimonialScalarFieldEnum]


  export const CoachScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    bio: 'bio',
    imageUrl: 'imageUrl',
    specialties: 'specialties',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CoachScalarFieldEnum = (typeof CoachScalarFieldEnum)[keyof typeof CoachScalarFieldEnum]


  export const AthleteScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    bio: 'bio',
    imageUrl: 'imageUrl',
    imageAlt: 'imageAlt',
    achievements: 'achievements',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AthleteScalarFieldEnum = (typeof AthleteScalarFieldEnum)[keyof typeof AthleteScalarFieldEnum]


  export const HomeSettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    title: 'title',
    subtitle: 'subtitle',
    imageUrl: 'imageUrl',
    ctaText: 'ctaText',
    ctaHref: 'ctaHref',
    primaryStat: 'primaryStat',
    primaryLabel: 'primaryLabel',
    secondaryStat: 'secondaryStat',
    secondaryLabel: 'secondaryLabel',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HomeSettingScalarFieldEnum = (typeof HomeSettingScalarFieldEnum)[keyof typeof HomeSettingScalarFieldEnum]


  export const HeroSlideScalarFieldEnum: {
    id: 'id',
    title: 'title',
    subtitle: 'subtitle',
    imageUrl: 'imageUrl',
    ctaText: 'ctaText',
    ctaHref: 'ctaHref',
    buttonVariant: 'buttonVariant',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HeroSlideScalarFieldEnum = (typeof HeroSlideScalarFieldEnum)[keyof typeof HeroSlideScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PlanCategory'
   */
  export type EnumPlanCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanCategory'>
    


  /**
   * Reference to a field of type 'PlanCategory[]'
   */
  export type ListEnumPlanCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanCategory[]'>
    


  /**
   * Reference to a field of type 'NewsCategory'
   */
  export type EnumNewsCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsCategory'>
    


  /**
   * Reference to a field of type 'NewsCategory[]'
   */
  export type ListEnumNewsCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsCategory[]'>
    


  /**
   * Reference to a field of type 'RaceType'
   */
  export type EnumRaceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RaceType'>
    


  /**
   * Reference to a field of type 'RaceType[]'
   */
  export type ListEnumRaceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RaceType[]'>
    


  /**
   * Reference to a field of type 'RaceStatus'
   */
  export type EnumRaceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RaceStatus'>
    


  /**
   * Reference to a field of type 'RaceStatus[]'
   */
  export type ListEnumRaceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RaceStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    sessionVersion?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    sessionVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    sessionVersion?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    sessionVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    sessionVersion?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type ContactMessageWhereInput = {
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    id?: StringFilter<"ContactMessage"> | string
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    message?: StringFilter<"ContactMessage"> | string
    read?: BoolFilter<"ContactMessage"> | boolean
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }

  export type ContactMessageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    message?: StringFilter<"ContactMessage"> | string
    read?: BoolFilter<"ContactMessage"> | boolean
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }, "id">

  export type ContactMessageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    _count?: ContactMessageCountOrderByAggregateInput
    _max?: ContactMessageMaxOrderByAggregateInput
    _min?: ContactMessageMinOrderByAggregateInput
  }

  export type ContactMessageScalarWhereWithAggregatesInput = {
    AND?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    OR?: ContactMessageScalarWhereWithAggregatesInput[]
    NOT?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContactMessage"> | string
    name?: StringWithAggregatesFilter<"ContactMessage"> | string
    email?: StringWithAggregatesFilter<"ContactMessage"> | string
    message?: StringWithAggregatesFilter<"ContactMessage"> | string
    read?: BoolWithAggregatesFilter<"ContactMessage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ContactMessage"> | Date | string
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: StringFilter<"Plan"> | string
    slug?: StringFilter<"Plan"> | string
    category?: EnumPlanCategoryFilter<"Plan"> | $Enums.PlanCategory
    name?: StringFilter<"Plan"> | string
    modality?: StringFilter<"Plan"> | string
    excerpt?: StringFilter<"Plan"> | string
    idealFor?: StringNullableFilter<"Plan"> | string | null
    price?: IntFilter<"Plan"> | number
    currency?: StringFilter<"Plan"> | string
    imageUrl?: StringFilter<"Plan"> | string
    imageAlt?: StringFilter<"Plan"> | string
    isActive?: BoolFilter<"Plan"> | boolean
    sortOrder?: IntFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    features?: PlanFeatureListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    name?: SortOrder
    modality?: SortOrder
    excerpt?: SortOrder
    idealFor?: SortOrderInput | SortOrder
    price?: SortOrder
    currency?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    features?: PlanFeatureOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    category?: EnumPlanCategoryFilter<"Plan"> | $Enums.PlanCategory
    name?: StringFilter<"Plan"> | string
    modality?: StringFilter<"Plan"> | string
    excerpt?: StringFilter<"Plan"> | string
    idealFor?: StringNullableFilter<"Plan"> | string | null
    price?: IntFilter<"Plan"> | number
    currency?: StringFilter<"Plan"> | string
    imageUrl?: StringFilter<"Plan"> | string
    imageAlt?: StringFilter<"Plan"> | string
    isActive?: BoolFilter<"Plan"> | boolean
    sortOrder?: IntFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    features?: PlanFeatureListRelationFilter
  }, "id" | "slug">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    name?: SortOrder
    modality?: SortOrder
    excerpt?: SortOrder
    idealFor?: SortOrderInput | SortOrder
    price?: SortOrder
    currency?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plan"> | string
    slug?: StringWithAggregatesFilter<"Plan"> | string
    category?: EnumPlanCategoryWithAggregatesFilter<"Plan"> | $Enums.PlanCategory
    name?: StringWithAggregatesFilter<"Plan"> | string
    modality?: StringWithAggregatesFilter<"Plan"> | string
    excerpt?: StringWithAggregatesFilter<"Plan"> | string
    idealFor?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    price?: IntWithAggregatesFilter<"Plan"> | number
    currency?: StringWithAggregatesFilter<"Plan"> | string
    imageUrl?: StringWithAggregatesFilter<"Plan"> | string
    imageAlt?: StringWithAggregatesFilter<"Plan"> | string
    isActive?: BoolWithAggregatesFilter<"Plan"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Plan"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type PlanFeatureWhereInput = {
    AND?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    OR?: PlanFeatureWhereInput[]
    NOT?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    id?: StringFilter<"PlanFeature"> | string
    planId?: StringFilter<"PlanFeature"> | string
    text?: StringFilter<"PlanFeature"> | string
    sortOrder?: IntFilter<"PlanFeature"> | number
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }

  export type PlanFeatureOrderByWithRelationInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    sortOrder?: SortOrder
    plan?: PlanOrderByWithRelationInput
  }

  export type PlanFeatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    OR?: PlanFeatureWhereInput[]
    NOT?: PlanFeatureWhereInput | PlanFeatureWhereInput[]
    planId?: StringFilter<"PlanFeature"> | string
    text?: StringFilter<"PlanFeature"> | string
    sortOrder?: IntFilter<"PlanFeature"> | number
    plan?: XOR<PlanScalarRelationFilter, PlanWhereInput>
  }, "id">

  export type PlanFeatureOrderByWithAggregationInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    sortOrder?: SortOrder
    _count?: PlanFeatureCountOrderByAggregateInput
    _avg?: PlanFeatureAvgOrderByAggregateInput
    _max?: PlanFeatureMaxOrderByAggregateInput
    _min?: PlanFeatureMinOrderByAggregateInput
    _sum?: PlanFeatureSumOrderByAggregateInput
  }

  export type PlanFeatureScalarWhereWithAggregatesInput = {
    AND?: PlanFeatureScalarWhereWithAggregatesInput | PlanFeatureScalarWhereWithAggregatesInput[]
    OR?: PlanFeatureScalarWhereWithAggregatesInput[]
    NOT?: PlanFeatureScalarWhereWithAggregatesInput | PlanFeatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlanFeature"> | string
    planId?: StringWithAggregatesFilter<"PlanFeature"> | string
    text?: StringWithAggregatesFilter<"PlanFeature"> | string
    sortOrder?: IntWithAggregatesFilter<"PlanFeature"> | number
  }

  export type NewsPostWhereInput = {
    AND?: NewsPostWhereInput | NewsPostWhereInput[]
    OR?: NewsPostWhereInput[]
    NOT?: NewsPostWhereInput | NewsPostWhereInput[]
    id?: StringFilter<"NewsPost"> | string
    title?: StringFilter<"NewsPost"> | string
    excerpt?: StringFilter<"NewsPost"> | string
    date?: DateTimeFilter<"NewsPost"> | Date | string
    category?: EnumNewsCategoryFilter<"NewsPost"> | $Enums.NewsCategory
    imageUrl?: StringNullableFilter<"NewsPost"> | string | null
    published?: BoolFilter<"NewsPost"> | boolean
    sortOrder?: IntFilter<"NewsPost"> | number
    createdAt?: DateTimeFilter<"NewsPost"> | Date | string
    updatedAt?: DateTimeFilter<"NewsPost"> | Date | string
  }

  export type NewsPostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    date?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    published?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NewsPostWhereInput | NewsPostWhereInput[]
    OR?: NewsPostWhereInput[]
    NOT?: NewsPostWhereInput | NewsPostWhereInput[]
    title?: StringFilter<"NewsPost"> | string
    excerpt?: StringFilter<"NewsPost"> | string
    date?: DateTimeFilter<"NewsPost"> | Date | string
    category?: EnumNewsCategoryFilter<"NewsPost"> | $Enums.NewsCategory
    imageUrl?: StringNullableFilter<"NewsPost"> | string | null
    published?: BoolFilter<"NewsPost"> | boolean
    sortOrder?: IntFilter<"NewsPost"> | number
    createdAt?: DateTimeFilter<"NewsPost"> | Date | string
    updatedAt?: DateTimeFilter<"NewsPost"> | Date | string
  }, "id">

  export type NewsPostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    date?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    published?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsPostCountOrderByAggregateInput
    _avg?: NewsPostAvgOrderByAggregateInput
    _max?: NewsPostMaxOrderByAggregateInput
    _min?: NewsPostMinOrderByAggregateInput
    _sum?: NewsPostSumOrderByAggregateInput
  }

  export type NewsPostScalarWhereWithAggregatesInput = {
    AND?: NewsPostScalarWhereWithAggregatesInput | NewsPostScalarWhereWithAggregatesInput[]
    OR?: NewsPostScalarWhereWithAggregatesInput[]
    NOT?: NewsPostScalarWhereWithAggregatesInput | NewsPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsPost"> | string
    title?: StringWithAggregatesFilter<"NewsPost"> | string
    excerpt?: StringWithAggregatesFilter<"NewsPost"> | string
    date?: DateTimeWithAggregatesFilter<"NewsPost"> | Date | string
    category?: EnumNewsCategoryWithAggregatesFilter<"NewsPost"> | $Enums.NewsCategory
    imageUrl?: StringNullableWithAggregatesFilter<"NewsPost"> | string | null
    published?: BoolWithAggregatesFilter<"NewsPost"> | boolean
    sortOrder?: IntWithAggregatesFilter<"NewsPost"> | number
    createdAt?: DateTimeWithAggregatesFilter<"NewsPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsPost"> | Date | string
  }

  export type RaceWhereInput = {
    AND?: RaceWhereInput | RaceWhereInput[]
    OR?: RaceWhereInput[]
    NOT?: RaceWhereInput | RaceWhereInput[]
    id?: StringFilter<"Race"> | string
    name?: StringFilter<"Race"> | string
    date?: DateTimeFilter<"Race"> | Date | string
    location?: StringFilter<"Race"> | string
    type?: EnumRaceTypeFilter<"Race"> | $Enums.RaceType
    distance?: StringNullableFilter<"Race"> | string | null
    description?: StringNullableFilter<"Race"> | string | null
    registrationUrl?: StringNullableFilter<"Race"> | string | null
    status?: EnumRaceStatusFilter<"Race"> | $Enums.RaceStatus
    isActive?: BoolFilter<"Race"> | boolean
    sortOrder?: IntFilter<"Race"> | number
    createdAt?: DateTimeFilter<"Race"> | Date | string
    updatedAt?: DateTimeFilter<"Race"> | Date | string
  }

  export type RaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    location?: SortOrder
    type?: SortOrder
    distance?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    registrationUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RaceWhereInput | RaceWhereInput[]
    OR?: RaceWhereInput[]
    NOT?: RaceWhereInput | RaceWhereInput[]
    name?: StringFilter<"Race"> | string
    date?: DateTimeFilter<"Race"> | Date | string
    location?: StringFilter<"Race"> | string
    type?: EnumRaceTypeFilter<"Race"> | $Enums.RaceType
    distance?: StringNullableFilter<"Race"> | string | null
    description?: StringNullableFilter<"Race"> | string | null
    registrationUrl?: StringNullableFilter<"Race"> | string | null
    status?: EnumRaceStatusFilter<"Race"> | $Enums.RaceStatus
    isActive?: BoolFilter<"Race"> | boolean
    sortOrder?: IntFilter<"Race"> | number
    createdAt?: DateTimeFilter<"Race"> | Date | string
    updatedAt?: DateTimeFilter<"Race"> | Date | string
  }, "id">

  export type RaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    location?: SortOrder
    type?: SortOrder
    distance?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    registrationUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RaceCountOrderByAggregateInput
    _avg?: RaceAvgOrderByAggregateInput
    _max?: RaceMaxOrderByAggregateInput
    _min?: RaceMinOrderByAggregateInput
    _sum?: RaceSumOrderByAggregateInput
  }

  export type RaceScalarWhereWithAggregatesInput = {
    AND?: RaceScalarWhereWithAggregatesInput | RaceScalarWhereWithAggregatesInput[]
    OR?: RaceScalarWhereWithAggregatesInput[]
    NOT?: RaceScalarWhereWithAggregatesInput | RaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Race"> | string
    name?: StringWithAggregatesFilter<"Race"> | string
    date?: DateTimeWithAggregatesFilter<"Race"> | Date | string
    location?: StringWithAggregatesFilter<"Race"> | string
    type?: EnumRaceTypeWithAggregatesFilter<"Race"> | $Enums.RaceType
    distance?: StringNullableWithAggregatesFilter<"Race"> | string | null
    description?: StringNullableWithAggregatesFilter<"Race"> | string | null
    registrationUrl?: StringNullableWithAggregatesFilter<"Race"> | string | null
    status?: EnumRaceStatusWithAggregatesFilter<"Race"> | $Enums.RaceStatus
    isActive?: BoolWithAggregatesFilter<"Race"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Race"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Race"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Race"> | Date | string
  }

  export type TestimonialWhereInput = {
    AND?: TestimonialWhereInput | TestimonialWhereInput[]
    OR?: TestimonialWhereInput[]
    NOT?: TestimonialWhereInput | TestimonialWhereInput[]
    id?: StringFilter<"Testimonial"> | string
    name?: StringFilter<"Testimonial"> | string
    role?: StringFilter<"Testimonial"> | string
    quote?: StringFilter<"Testimonial"> | string
    imageUrl?: StringNullableFilter<"Testimonial"> | string | null
    isActive?: BoolFilter<"Testimonial"> | boolean
    sortOrder?: IntFilter<"Testimonial"> | number
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    updatedAt?: DateTimeFilter<"Testimonial"> | Date | string
  }

  export type TestimonialOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    quote?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestimonialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestimonialWhereInput | TestimonialWhereInput[]
    OR?: TestimonialWhereInput[]
    NOT?: TestimonialWhereInput | TestimonialWhereInput[]
    name?: StringFilter<"Testimonial"> | string
    role?: StringFilter<"Testimonial"> | string
    quote?: StringFilter<"Testimonial"> | string
    imageUrl?: StringNullableFilter<"Testimonial"> | string | null
    isActive?: BoolFilter<"Testimonial"> | boolean
    sortOrder?: IntFilter<"Testimonial"> | number
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    updatedAt?: DateTimeFilter<"Testimonial"> | Date | string
  }, "id">

  export type TestimonialOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    quote?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TestimonialCountOrderByAggregateInput
    _avg?: TestimonialAvgOrderByAggregateInput
    _max?: TestimonialMaxOrderByAggregateInput
    _min?: TestimonialMinOrderByAggregateInput
    _sum?: TestimonialSumOrderByAggregateInput
  }

  export type TestimonialScalarWhereWithAggregatesInput = {
    AND?: TestimonialScalarWhereWithAggregatesInput | TestimonialScalarWhereWithAggregatesInput[]
    OR?: TestimonialScalarWhereWithAggregatesInput[]
    NOT?: TestimonialScalarWhereWithAggregatesInput | TestimonialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Testimonial"> | string
    name?: StringWithAggregatesFilter<"Testimonial"> | string
    role?: StringWithAggregatesFilter<"Testimonial"> | string
    quote?: StringWithAggregatesFilter<"Testimonial"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Testimonial"> | string | null
    isActive?: BoolWithAggregatesFilter<"Testimonial"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Testimonial"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Testimonial"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Testimonial"> | Date | string
  }

  export type CoachWhereInput = {
    AND?: CoachWhereInput | CoachWhereInput[]
    OR?: CoachWhereInput[]
    NOT?: CoachWhereInput | CoachWhereInput[]
    id?: StringFilter<"Coach"> | string
    name?: StringFilter<"Coach"> | string
    role?: StringFilter<"Coach"> | string
    bio?: StringFilter<"Coach"> | string
    imageUrl?: StringNullableFilter<"Coach"> | string | null
    specialties?: StringNullableListFilter<"Coach">
    isActive?: BoolFilter<"Coach"> | boolean
    sortOrder?: IntFilter<"Coach"> | number
    createdAt?: DateTimeFilter<"Coach"> | Date | string
    updatedAt?: DateTimeFilter<"Coach"> | Date | string
  }

  export type CoachOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    specialties?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoachWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CoachWhereInput | CoachWhereInput[]
    OR?: CoachWhereInput[]
    NOT?: CoachWhereInput | CoachWhereInput[]
    name?: StringFilter<"Coach"> | string
    role?: StringFilter<"Coach"> | string
    bio?: StringFilter<"Coach"> | string
    imageUrl?: StringNullableFilter<"Coach"> | string | null
    specialties?: StringNullableListFilter<"Coach">
    isActive?: BoolFilter<"Coach"> | boolean
    sortOrder?: IntFilter<"Coach"> | number
    createdAt?: DateTimeFilter<"Coach"> | Date | string
    updatedAt?: DateTimeFilter<"Coach"> | Date | string
  }, "id">

  export type CoachOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    specialties?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CoachCountOrderByAggregateInput
    _avg?: CoachAvgOrderByAggregateInput
    _max?: CoachMaxOrderByAggregateInput
    _min?: CoachMinOrderByAggregateInput
    _sum?: CoachSumOrderByAggregateInput
  }

  export type CoachScalarWhereWithAggregatesInput = {
    AND?: CoachScalarWhereWithAggregatesInput | CoachScalarWhereWithAggregatesInput[]
    OR?: CoachScalarWhereWithAggregatesInput[]
    NOT?: CoachScalarWhereWithAggregatesInput | CoachScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Coach"> | string
    name?: StringWithAggregatesFilter<"Coach"> | string
    role?: StringWithAggregatesFilter<"Coach"> | string
    bio?: StringWithAggregatesFilter<"Coach"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Coach"> | string | null
    specialties?: StringNullableListFilter<"Coach">
    isActive?: BoolWithAggregatesFilter<"Coach"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Coach"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Coach"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Coach"> | Date | string
  }

  export type AthleteWhereInput = {
    AND?: AthleteWhereInput | AthleteWhereInput[]
    OR?: AthleteWhereInput[]
    NOT?: AthleteWhereInput | AthleteWhereInput[]
    id?: StringFilter<"Athlete"> | string
    name?: StringFilter<"Athlete"> | string
    role?: StringFilter<"Athlete"> | string
    bio?: StringFilter<"Athlete"> | string
    imageUrl?: StringNullableFilter<"Athlete"> | string | null
    imageAlt?: StringNullableFilter<"Athlete"> | string | null
    achievements?: StringNullableListFilter<"Athlete">
    isActive?: BoolFilter<"Athlete"> | boolean
    sortOrder?: IntFilter<"Athlete"> | number
    createdAt?: DateTimeFilter<"Athlete"> | Date | string
    updatedAt?: DateTimeFilter<"Athlete"> | Date | string
  }

  export type AthleteOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageAlt?: SortOrderInput | SortOrder
    achievements?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AthleteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AthleteWhereInput | AthleteWhereInput[]
    OR?: AthleteWhereInput[]
    NOT?: AthleteWhereInput | AthleteWhereInput[]
    name?: StringFilter<"Athlete"> | string
    role?: StringFilter<"Athlete"> | string
    bio?: StringFilter<"Athlete"> | string
    imageUrl?: StringNullableFilter<"Athlete"> | string | null
    imageAlt?: StringNullableFilter<"Athlete"> | string | null
    achievements?: StringNullableListFilter<"Athlete">
    isActive?: BoolFilter<"Athlete"> | boolean
    sortOrder?: IntFilter<"Athlete"> | number
    createdAt?: DateTimeFilter<"Athlete"> | Date | string
    updatedAt?: DateTimeFilter<"Athlete"> | Date | string
  }, "id">

  export type AthleteOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    imageAlt?: SortOrderInput | SortOrder
    achievements?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AthleteCountOrderByAggregateInput
    _avg?: AthleteAvgOrderByAggregateInput
    _max?: AthleteMaxOrderByAggregateInput
    _min?: AthleteMinOrderByAggregateInput
    _sum?: AthleteSumOrderByAggregateInput
  }

  export type AthleteScalarWhereWithAggregatesInput = {
    AND?: AthleteScalarWhereWithAggregatesInput | AthleteScalarWhereWithAggregatesInput[]
    OR?: AthleteScalarWhereWithAggregatesInput[]
    NOT?: AthleteScalarWhereWithAggregatesInput | AthleteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Athlete"> | string
    name?: StringWithAggregatesFilter<"Athlete"> | string
    role?: StringWithAggregatesFilter<"Athlete"> | string
    bio?: StringWithAggregatesFilter<"Athlete"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Athlete"> | string | null
    imageAlt?: StringNullableWithAggregatesFilter<"Athlete"> | string | null
    achievements?: StringNullableListFilter<"Athlete">
    isActive?: BoolWithAggregatesFilter<"Athlete"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Athlete"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Athlete"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Athlete"> | Date | string
  }

  export type HomeSettingWhereInput = {
    AND?: HomeSettingWhereInput | HomeSettingWhereInput[]
    OR?: HomeSettingWhereInput[]
    NOT?: HomeSettingWhereInput | HomeSettingWhereInput[]
    id?: StringFilter<"HomeSetting"> | string
    key?: StringFilter<"HomeSetting"> | string
    title?: StringNullableFilter<"HomeSetting"> | string | null
    subtitle?: StringNullableFilter<"HomeSetting"> | string | null
    imageUrl?: StringNullableFilter<"HomeSetting"> | string | null
    ctaText?: StringNullableFilter<"HomeSetting"> | string | null
    ctaHref?: StringNullableFilter<"HomeSetting"> | string | null
    primaryStat?: StringNullableFilter<"HomeSetting"> | string | null
    primaryLabel?: StringNullableFilter<"HomeSetting"> | string | null
    secondaryStat?: StringNullableFilter<"HomeSetting"> | string | null
    secondaryLabel?: StringNullableFilter<"HomeSetting"> | string | null
    isActive?: BoolFilter<"HomeSetting"> | boolean
    sortOrder?: IntFilter<"HomeSetting"> | number
    createdAt?: DateTimeFilter<"HomeSetting"> | Date | string
    updatedAt?: DateTimeFilter<"HomeSetting"> | Date | string
  }

  export type HomeSettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrderInput | SortOrder
    subtitle?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    ctaText?: SortOrderInput | SortOrder
    ctaHref?: SortOrderInput | SortOrder
    primaryStat?: SortOrderInput | SortOrder
    primaryLabel?: SortOrderInput | SortOrder
    secondaryStat?: SortOrderInput | SortOrder
    secondaryLabel?: SortOrderInput | SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HomeSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: HomeSettingWhereInput | HomeSettingWhereInput[]
    OR?: HomeSettingWhereInput[]
    NOT?: HomeSettingWhereInput | HomeSettingWhereInput[]
    title?: StringNullableFilter<"HomeSetting"> | string | null
    subtitle?: StringNullableFilter<"HomeSetting"> | string | null
    imageUrl?: StringNullableFilter<"HomeSetting"> | string | null
    ctaText?: StringNullableFilter<"HomeSetting"> | string | null
    ctaHref?: StringNullableFilter<"HomeSetting"> | string | null
    primaryStat?: StringNullableFilter<"HomeSetting"> | string | null
    primaryLabel?: StringNullableFilter<"HomeSetting"> | string | null
    secondaryStat?: StringNullableFilter<"HomeSetting"> | string | null
    secondaryLabel?: StringNullableFilter<"HomeSetting"> | string | null
    isActive?: BoolFilter<"HomeSetting"> | boolean
    sortOrder?: IntFilter<"HomeSetting"> | number
    createdAt?: DateTimeFilter<"HomeSetting"> | Date | string
    updatedAt?: DateTimeFilter<"HomeSetting"> | Date | string
  }, "id" | "key">

  export type HomeSettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrderInput | SortOrder
    subtitle?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    ctaText?: SortOrderInput | SortOrder
    ctaHref?: SortOrderInput | SortOrder
    primaryStat?: SortOrderInput | SortOrder
    primaryLabel?: SortOrderInput | SortOrder
    secondaryStat?: SortOrderInput | SortOrder
    secondaryLabel?: SortOrderInput | SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HomeSettingCountOrderByAggregateInput
    _avg?: HomeSettingAvgOrderByAggregateInput
    _max?: HomeSettingMaxOrderByAggregateInput
    _min?: HomeSettingMinOrderByAggregateInput
    _sum?: HomeSettingSumOrderByAggregateInput
  }

  export type HomeSettingScalarWhereWithAggregatesInput = {
    AND?: HomeSettingScalarWhereWithAggregatesInput | HomeSettingScalarWhereWithAggregatesInput[]
    OR?: HomeSettingScalarWhereWithAggregatesInput[]
    NOT?: HomeSettingScalarWhereWithAggregatesInput | HomeSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HomeSetting"> | string
    key?: StringWithAggregatesFilter<"HomeSetting"> | string
    title?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    subtitle?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    ctaText?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    ctaHref?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    primaryStat?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    primaryLabel?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    secondaryStat?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    secondaryLabel?: StringNullableWithAggregatesFilter<"HomeSetting"> | string | null
    isActive?: BoolWithAggregatesFilter<"HomeSetting"> | boolean
    sortOrder?: IntWithAggregatesFilter<"HomeSetting"> | number
    createdAt?: DateTimeWithAggregatesFilter<"HomeSetting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HomeSetting"> | Date | string
  }

  export type HeroSlideWhereInput = {
    AND?: HeroSlideWhereInput | HeroSlideWhereInput[]
    OR?: HeroSlideWhereInput[]
    NOT?: HeroSlideWhereInput | HeroSlideWhereInput[]
    id?: StringFilter<"HeroSlide"> | string
    title?: StringFilter<"HeroSlide"> | string
    subtitle?: StringFilter<"HeroSlide"> | string
    imageUrl?: StringNullableFilter<"HeroSlide"> | string | null
    ctaText?: StringNullableFilter<"HeroSlide"> | string | null
    ctaHref?: StringNullableFilter<"HeroSlide"> | string | null
    buttonVariant?: StringFilter<"HeroSlide"> | string
    isActive?: BoolFilter<"HeroSlide"> | boolean
    sortOrder?: IntFilter<"HeroSlide"> | number
    createdAt?: DateTimeFilter<"HeroSlide"> | Date | string
    updatedAt?: DateTimeFilter<"HeroSlide"> | Date | string
  }

  export type HeroSlideOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    ctaText?: SortOrderInput | SortOrder
    ctaHref?: SortOrderInput | SortOrder
    buttonVariant?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroSlideWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HeroSlideWhereInput | HeroSlideWhereInput[]
    OR?: HeroSlideWhereInput[]
    NOT?: HeroSlideWhereInput | HeroSlideWhereInput[]
    title?: StringFilter<"HeroSlide"> | string
    subtitle?: StringFilter<"HeroSlide"> | string
    imageUrl?: StringNullableFilter<"HeroSlide"> | string | null
    ctaText?: StringNullableFilter<"HeroSlide"> | string | null
    ctaHref?: StringNullableFilter<"HeroSlide"> | string | null
    buttonVariant?: StringFilter<"HeroSlide"> | string
    isActive?: BoolFilter<"HeroSlide"> | boolean
    sortOrder?: IntFilter<"HeroSlide"> | number
    createdAt?: DateTimeFilter<"HeroSlide"> | Date | string
    updatedAt?: DateTimeFilter<"HeroSlide"> | Date | string
  }, "id">

  export type HeroSlideOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    ctaText?: SortOrderInput | SortOrder
    ctaHref?: SortOrderInput | SortOrder
    buttonVariant?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HeroSlideCountOrderByAggregateInput
    _avg?: HeroSlideAvgOrderByAggregateInput
    _max?: HeroSlideMaxOrderByAggregateInput
    _min?: HeroSlideMinOrderByAggregateInput
    _sum?: HeroSlideSumOrderByAggregateInput
  }

  export type HeroSlideScalarWhereWithAggregatesInput = {
    AND?: HeroSlideScalarWhereWithAggregatesInput | HeroSlideScalarWhereWithAggregatesInput[]
    OR?: HeroSlideScalarWhereWithAggregatesInput[]
    NOT?: HeroSlideScalarWhereWithAggregatesInput | HeroSlideScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HeroSlide"> | string
    title?: StringWithAggregatesFilter<"HeroSlide"> | string
    subtitle?: StringWithAggregatesFilter<"HeroSlide"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"HeroSlide"> | string | null
    ctaText?: StringNullableWithAggregatesFilter<"HeroSlide"> | string | null
    ctaHref?: StringNullableWithAggregatesFilter<"HeroSlide"> | string | null
    buttonVariant?: StringWithAggregatesFilter<"HeroSlide"> | string
    isActive?: BoolWithAggregatesFilter<"HeroSlide"> | boolean
    sortOrder?: IntWithAggregatesFilter<"HeroSlide"> | number
    createdAt?: DateTimeWithAggregatesFilter<"HeroSlide"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HeroSlide"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    phone?: string | null
    role?: $Enums.Role
    isActive?: boolean
    sessionVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    phone?: string | null
    role?: $Enums.Role
    isActive?: boolean
    sessionVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessionVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessionVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    phone?: string | null
    role?: $Enums.Role
    isActive?: boolean
    sessionVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessionVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessionVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateInput = {
    id?: string
    name: string
    email: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type ContactMessageUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type ContactMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateManyInput = {
    id?: string
    name: string
    email: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type ContactMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateInput = {
    id?: string
    slug: string
    category: $Enums.PlanCategory
    name: string
    modality: string
    excerpt: string
    idealFor?: string | null
    price: number
    currency?: string
    imageUrl: string
    imageAlt: string
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PlanFeatureCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    slug: string
    category: $Enums.PlanCategory
    name: string
    modality: string
    excerpt: string
    idealFor?: string | null
    price: number
    currency?: string
    imageUrl: string
    imageAlt: string
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    features?: PlanFeatureUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumPlanCategoryFieldUpdateOperationsInput | $Enums.PlanCategory
    name?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    idealFor?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageAlt?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PlanFeatureUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumPlanCategoryFieldUpdateOperationsInput | $Enums.PlanCategory
    name?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    idealFor?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageAlt?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    features?: PlanFeatureUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    slug: string
    category: $Enums.PlanCategory
    name: string
    modality: string
    excerpt: string
    idealFor?: string | null
    price: number
    currency?: string
    imageUrl: string
    imageAlt: string
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumPlanCategoryFieldUpdateOperationsInput | $Enums.PlanCategory
    name?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    idealFor?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageAlt?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumPlanCategoryFieldUpdateOperationsInput | $Enums.PlanCategory
    name?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    idealFor?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageAlt?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFeatureCreateInput = {
    id?: string
    text: string
    sortOrder?: number
    plan: PlanCreateNestedOneWithoutFeaturesInput
  }

  export type PlanFeatureUncheckedCreateInput = {
    id?: string
    planId: string
    text: string
    sortOrder?: number
  }

  export type PlanFeatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    plan?: PlanUpdateOneRequiredWithoutFeaturesNestedInput
  }

  export type PlanFeatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type PlanFeatureCreateManyInput = {
    id?: string
    planId: string
    text: string
    sortOrder?: number
  }

  export type PlanFeatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type PlanFeatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type NewsPostCreateInput = {
    id?: string
    title: string
    excerpt: string
    date: Date | string
    category: $Enums.NewsCategory
    imageUrl?: string | null
    published?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsPostUncheckedCreateInput = {
    id?: string
    title: string
    excerpt: string
    date: Date | string
    category: $Enums.NewsCategory
    imageUrl?: string | null
    published?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumNewsCategoryFieldUpdateOperationsInput | $Enums.NewsCategory
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumNewsCategoryFieldUpdateOperationsInput | $Enums.NewsCategory
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsPostCreateManyInput = {
    id?: string
    title: string
    excerpt: string
    date: Date | string
    category: $Enums.NewsCategory
    imageUrl?: string | null
    published?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumNewsCategoryFieldUpdateOperationsInput | $Enums.NewsCategory
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumNewsCategoryFieldUpdateOperationsInput | $Enums.NewsCategory
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaceCreateInput = {
    id?: string
    name: string
    date: Date | string
    location: string
    type: $Enums.RaceType
    distance?: string | null
    description?: string | null
    registrationUrl?: string | null
    status?: $Enums.RaceStatus
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RaceUncheckedCreateInput = {
    id?: string
    name: string
    date: Date | string
    location: string
    type: $Enums.RaceType
    distance?: string | null
    description?: string | null
    registrationUrl?: string | null
    status?: $Enums.RaceStatus
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumRaceTypeFieldUpdateOperationsInput | $Enums.RaceType
    distance?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    registrationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRaceStatusFieldUpdateOperationsInput | $Enums.RaceStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumRaceTypeFieldUpdateOperationsInput | $Enums.RaceType
    distance?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    registrationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRaceStatusFieldUpdateOperationsInput | $Enums.RaceStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaceCreateManyInput = {
    id?: string
    name: string
    date: Date | string
    location: string
    type: $Enums.RaceType
    distance?: string | null
    description?: string | null
    registrationUrl?: string | null
    status?: $Enums.RaceStatus
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumRaceTypeFieldUpdateOperationsInput | $Enums.RaceType
    distance?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    registrationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRaceStatusFieldUpdateOperationsInput | $Enums.RaceStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    type?: EnumRaceTypeFieldUpdateOperationsInput | $Enums.RaceType
    distance?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    registrationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRaceStatusFieldUpdateOperationsInput | $Enums.RaceStatus
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialCreateInput = {
    id?: string
    name: string
    role: string
    quote: string
    imageUrl?: string | null
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestimonialUncheckedCreateInput = {
    id?: string
    name: string
    role: string
    quote: string
    imageUrl?: string | null
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestimonialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialCreateManyInput = {
    id?: string
    name: string
    role: string
    quote: string
    imageUrl?: string | null
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestimonialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoachCreateInput = {
    id?: string
    name: string
    role: string
    bio: string
    imageUrl?: string | null
    specialties?: CoachCreatespecialtiesInput | string[]
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoachUncheckedCreateInput = {
    id?: string
    name: string
    role: string
    bio: string
    imageUrl?: string | null
    specialties?: CoachCreatespecialtiesInput | string[]
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoachUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: CoachUpdatespecialtiesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoachUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: CoachUpdatespecialtiesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoachCreateManyInput = {
    id?: string
    name: string
    role: string
    bio: string
    imageUrl?: string | null
    specialties?: CoachCreatespecialtiesInput | string[]
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CoachUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: CoachUpdatespecialtiesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoachUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    specialties?: CoachUpdatespecialtiesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteCreateInput = {
    id?: string
    name: string
    role: string
    bio: string
    imageUrl?: string | null
    imageAlt?: string | null
    achievements?: AthleteCreateachievementsInput | string[]
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AthleteUncheckedCreateInput = {
    id?: string
    name: string
    role: string
    bio: string
    imageUrl?: string | null
    imageAlt?: string | null
    achievements?: AthleteCreateachievementsInput | string[]
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AthleteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AthleteUpdateachievementsInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AthleteUpdateachievementsInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteCreateManyInput = {
    id?: string
    name: string
    role: string
    bio: string
    imageUrl?: string | null
    imageAlt?: string | null
    achievements?: AthleteCreateachievementsInput | string[]
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AthleteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AthleteUpdateachievementsInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AthleteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AthleteUpdateachievementsInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HomeSettingCreateInput = {
    id?: string
    key: string
    title?: string | null
    subtitle?: string | null
    imageUrl?: string | null
    ctaText?: string | null
    ctaHref?: string | null
    primaryStat?: string | null
    primaryLabel?: string | null
    secondaryStat?: string | null
    secondaryLabel?: string | null
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HomeSettingUncheckedCreateInput = {
    id?: string
    key: string
    title?: string | null
    subtitle?: string | null
    imageUrl?: string | null
    ctaText?: string | null
    ctaHref?: string | null
    primaryStat?: string | null
    primaryLabel?: string | null
    secondaryStat?: string | null
    secondaryLabel?: string | null
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HomeSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaHref?: NullableStringFieldUpdateOperationsInput | string | null
    primaryStat?: NullableStringFieldUpdateOperationsInput | string | null
    primaryLabel?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryStat?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryLabel?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HomeSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaHref?: NullableStringFieldUpdateOperationsInput | string | null
    primaryStat?: NullableStringFieldUpdateOperationsInput | string | null
    primaryLabel?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryStat?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryLabel?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HomeSettingCreateManyInput = {
    id?: string
    key: string
    title?: string | null
    subtitle?: string | null
    imageUrl?: string | null
    ctaText?: string | null
    ctaHref?: string | null
    primaryStat?: string | null
    primaryLabel?: string | null
    secondaryStat?: string | null
    secondaryLabel?: string | null
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HomeSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaHref?: NullableStringFieldUpdateOperationsInput | string | null
    primaryStat?: NullableStringFieldUpdateOperationsInput | string | null
    primaryLabel?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryStat?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryLabel?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HomeSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaHref?: NullableStringFieldUpdateOperationsInput | string | null
    primaryStat?: NullableStringFieldUpdateOperationsInput | string | null
    primaryLabel?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryStat?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryLabel?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroSlideCreateInput = {
    id?: string
    title: string
    subtitle: string
    imageUrl?: string | null
    ctaText?: string | null
    ctaHref?: string | null
    buttonVariant?: string
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroSlideUncheckedCreateInput = {
    id?: string
    title: string
    subtitle: string
    imageUrl?: string | null
    ctaText?: string | null
    ctaHref?: string | null
    buttonVariant?: string
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroSlideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaHref?: NullableStringFieldUpdateOperationsInput | string | null
    buttonVariant?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroSlideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaHref?: NullableStringFieldUpdateOperationsInput | string | null
    buttonVariant?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroSlideCreateManyInput = {
    id?: string
    title: string
    subtitle: string
    imageUrl?: string | null
    ctaText?: string | null
    ctaHref?: string | null
    buttonVariant?: string
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HeroSlideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaHref?: NullableStringFieldUpdateOperationsInput | string | null
    buttonVariant?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HeroSlideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ctaText?: NullableStringFieldUpdateOperationsInput | string | null
    ctaHref?: NullableStringFieldUpdateOperationsInput | string | null
    buttonVariant?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    sessionVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    sessionVersion?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    sessionVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    passwordHash?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    sessionVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    sessionVersion?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type ContactMessageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumPlanCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanCategory | EnumPlanCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlanCategory[] | ListEnumPlanCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanCategory[] | ListEnumPlanCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanCategoryFilter<$PrismaModel> | $Enums.PlanCategory
  }

  export type PlanFeatureListRelationFilter = {
    every?: PlanFeatureWhereInput
    some?: PlanFeatureWhereInput
    none?: PlanFeatureWhereInput
  }

  export type PlanFeatureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    name?: SortOrder
    modality?: SortOrder
    excerpt?: SortOrder
    idealFor?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    price?: SortOrder
    sortOrder?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    name?: SortOrder
    modality?: SortOrder
    excerpt?: SortOrder
    idealFor?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    name?: SortOrder
    modality?: SortOrder
    excerpt?: SortOrder
    idealFor?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    price?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumPlanCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanCategory | EnumPlanCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlanCategory[] | ListEnumPlanCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanCategory[] | ListEnumPlanCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PlanCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanCategoryFilter<$PrismaModel>
    _max?: NestedEnumPlanCategoryFilter<$PrismaModel>
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type PlanFeatureCountOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    sortOrder?: SortOrder
  }

  export type PlanFeatureAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type PlanFeatureMaxOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    sortOrder?: SortOrder
  }

  export type PlanFeatureMinOrderByAggregateInput = {
    id?: SortOrder
    planId?: SortOrder
    text?: SortOrder
    sortOrder?: SortOrder
  }

  export type PlanFeatureSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type EnumNewsCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsCategory | EnumNewsCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.NewsCategory[] | ListEnumNewsCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsCategory[] | ListEnumNewsCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsCategoryFilter<$PrismaModel> | $Enums.NewsCategory
  }

  export type NewsPostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    date?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsPostAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type NewsPostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    date?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsPostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    date?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    published?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsPostSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type EnumNewsCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsCategory | EnumNewsCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.NewsCategory[] | ListEnumNewsCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsCategory[] | ListEnumNewsCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsCategoryWithAggregatesFilter<$PrismaModel> | $Enums.NewsCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsCategoryFilter<$PrismaModel>
    _max?: NestedEnumNewsCategoryFilter<$PrismaModel>
  }

  export type EnumRaceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RaceType | EnumRaceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RaceType[] | ListEnumRaceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RaceType[] | ListEnumRaceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRaceTypeFilter<$PrismaModel> | $Enums.RaceType
  }

  export type EnumRaceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RaceStatus | EnumRaceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RaceStatus[] | ListEnumRaceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RaceStatus[] | ListEnumRaceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRaceStatusFilter<$PrismaModel> | $Enums.RaceStatus
  }

  export type RaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    location?: SortOrder
    type?: SortOrder
    distance?: SortOrder
    description?: SortOrder
    registrationUrl?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RaceAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type RaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    location?: SortOrder
    type?: SortOrder
    distance?: SortOrder
    description?: SortOrder
    registrationUrl?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    location?: SortOrder
    type?: SortOrder
    distance?: SortOrder
    description?: SortOrder
    registrationUrl?: SortOrder
    status?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RaceSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type EnumRaceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RaceType | EnumRaceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RaceType[] | ListEnumRaceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RaceType[] | ListEnumRaceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRaceTypeWithAggregatesFilter<$PrismaModel> | $Enums.RaceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRaceTypeFilter<$PrismaModel>
    _max?: NestedEnumRaceTypeFilter<$PrismaModel>
  }

  export type EnumRaceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RaceStatus | EnumRaceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RaceStatus[] | ListEnumRaceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RaceStatus[] | ListEnumRaceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRaceStatusWithAggregatesFilter<$PrismaModel> | $Enums.RaceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRaceStatusFilter<$PrismaModel>
    _max?: NestedEnumRaceStatusFilter<$PrismaModel>
  }

  export type TestimonialCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    quote?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestimonialAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type TestimonialMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    quote?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestimonialMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    quote?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TestimonialSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type CoachCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrder
    specialties?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoachAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type CoachMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoachMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CoachSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type AthleteCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    achievements?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AthleteAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type AthleteMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AthleteMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    imageUrl?: SortOrder
    imageAlt?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AthleteSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type HomeSettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaHref?: SortOrder
    primaryStat?: SortOrder
    primaryLabel?: SortOrder
    secondaryStat?: SortOrder
    secondaryLabel?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HomeSettingAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type HomeSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaHref?: SortOrder
    primaryStat?: SortOrder
    primaryLabel?: SortOrder
    secondaryStat?: SortOrder
    secondaryLabel?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HomeSettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaHref?: SortOrder
    primaryStat?: SortOrder
    primaryLabel?: SortOrder
    secondaryStat?: SortOrder
    secondaryLabel?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HomeSettingSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type HeroSlideCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaHref?: SortOrder
    buttonVariant?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroSlideAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type HeroSlideMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaHref?: SortOrder
    buttonVariant?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroSlideMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    imageUrl?: SortOrder
    ctaText?: SortOrder
    ctaHref?: SortOrder
    buttonVariant?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HeroSlideSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type PlanFeatureCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
  }

  export type PlanFeatureUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
  }

  export type EnumPlanCategoryFieldUpdateOperationsInput = {
    set?: $Enums.PlanCategory
  }

  export type PlanFeatureUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    upsert?: PlanFeatureUpsertWithWhereUniqueWithoutPlanInput | PlanFeatureUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    set?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    disconnect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    delete?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    update?: PlanFeatureUpdateWithWhereUniqueWithoutPlanInput | PlanFeatureUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanFeatureUpdateManyWithWhereWithoutPlanInput | PlanFeatureUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
  }

  export type PlanFeatureUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput> | PlanFeatureCreateWithoutPlanInput[] | PlanFeatureUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PlanFeatureCreateOrConnectWithoutPlanInput | PlanFeatureCreateOrConnectWithoutPlanInput[]
    upsert?: PlanFeatureUpsertWithWhereUniqueWithoutPlanInput | PlanFeatureUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PlanFeatureCreateManyPlanInputEnvelope
    set?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    disconnect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    delete?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    connect?: PlanFeatureWhereUniqueInput | PlanFeatureWhereUniqueInput[]
    update?: PlanFeatureUpdateWithWhereUniqueWithoutPlanInput | PlanFeatureUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PlanFeatureUpdateManyWithWhereWithoutPlanInput | PlanFeatureUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
  }

  export type PlanCreateNestedOneWithoutFeaturesInput = {
    create?: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: PlanCreateOrConnectWithoutFeaturesInput
    connect?: PlanWhereUniqueInput
  }

  export type PlanUpdateOneRequiredWithoutFeaturesNestedInput = {
    create?: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: PlanCreateOrConnectWithoutFeaturesInput
    upsert?: PlanUpsertWithoutFeaturesInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutFeaturesInput, PlanUpdateWithoutFeaturesInput>, PlanUncheckedUpdateWithoutFeaturesInput>
  }

  export type EnumNewsCategoryFieldUpdateOperationsInput = {
    set?: $Enums.NewsCategory
  }

  export type EnumRaceTypeFieldUpdateOperationsInput = {
    set?: $Enums.RaceType
  }

  export type EnumRaceStatusFieldUpdateOperationsInput = {
    set?: $Enums.RaceStatus
  }

  export type CoachCreatespecialtiesInput = {
    set: string[]
  }

  export type CoachUpdatespecialtiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AthleteCreateachievementsInput = {
    set: string[]
  }

  export type AthleteUpdateachievementsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPlanCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanCategory | EnumPlanCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlanCategory[] | ListEnumPlanCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanCategory[] | ListEnumPlanCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanCategoryFilter<$PrismaModel> | $Enums.PlanCategory
  }

  export type NestedEnumPlanCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanCategory | EnumPlanCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PlanCategory[] | ListEnumPlanCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanCategory[] | ListEnumPlanCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PlanCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanCategoryFilter<$PrismaModel>
    _max?: NestedEnumPlanCategoryFilter<$PrismaModel>
  }

  export type NestedEnumNewsCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsCategory | EnumNewsCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.NewsCategory[] | ListEnumNewsCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsCategory[] | ListEnumNewsCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsCategoryFilter<$PrismaModel> | $Enums.NewsCategory
  }

  export type NestedEnumNewsCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsCategory | EnumNewsCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.NewsCategory[] | ListEnumNewsCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsCategory[] | ListEnumNewsCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsCategoryWithAggregatesFilter<$PrismaModel> | $Enums.NewsCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsCategoryFilter<$PrismaModel>
    _max?: NestedEnumNewsCategoryFilter<$PrismaModel>
  }

  export type NestedEnumRaceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RaceType | EnumRaceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RaceType[] | ListEnumRaceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RaceType[] | ListEnumRaceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRaceTypeFilter<$PrismaModel> | $Enums.RaceType
  }

  export type NestedEnumRaceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RaceStatus | EnumRaceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RaceStatus[] | ListEnumRaceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RaceStatus[] | ListEnumRaceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRaceStatusFilter<$PrismaModel> | $Enums.RaceStatus
  }

  export type NestedEnumRaceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RaceType | EnumRaceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RaceType[] | ListEnumRaceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RaceType[] | ListEnumRaceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRaceTypeWithAggregatesFilter<$PrismaModel> | $Enums.RaceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRaceTypeFilter<$PrismaModel>
    _max?: NestedEnumRaceTypeFilter<$PrismaModel>
  }

  export type NestedEnumRaceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RaceStatus | EnumRaceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RaceStatus[] | ListEnumRaceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RaceStatus[] | ListEnumRaceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRaceStatusWithAggregatesFilter<$PrismaModel> | $Enums.RaceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRaceStatusFilter<$PrismaModel>
    _max?: NestedEnumRaceStatusFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    phone?: string | null
    role?: $Enums.Role
    isActive?: boolean
    sessionVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    phone?: string | null
    role?: $Enums.Role
    isActive?: boolean
    sessionVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessionVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessionVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    phone?: string | null
    role?: $Enums.Role
    isActive?: boolean
    sessionVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    passwordHash?: string | null
    phone?: string | null
    role?: $Enums.Role
    isActive?: boolean
    sessionVersion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessionVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sessionVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PlanFeatureCreateWithoutPlanInput = {
    id?: string
    text: string
    sortOrder?: number
  }

  export type PlanFeatureUncheckedCreateWithoutPlanInput = {
    id?: string
    text: string
    sortOrder?: number
  }

  export type PlanFeatureCreateOrConnectWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    create: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput>
  }

  export type PlanFeatureCreateManyPlanInputEnvelope = {
    data: PlanFeatureCreateManyPlanInput | PlanFeatureCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type PlanFeatureUpsertWithWhereUniqueWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    update: XOR<PlanFeatureUpdateWithoutPlanInput, PlanFeatureUncheckedUpdateWithoutPlanInput>
    create: XOR<PlanFeatureCreateWithoutPlanInput, PlanFeatureUncheckedCreateWithoutPlanInput>
  }

  export type PlanFeatureUpdateWithWhereUniqueWithoutPlanInput = {
    where: PlanFeatureWhereUniqueInput
    data: XOR<PlanFeatureUpdateWithoutPlanInput, PlanFeatureUncheckedUpdateWithoutPlanInput>
  }

  export type PlanFeatureUpdateManyWithWhereWithoutPlanInput = {
    where: PlanFeatureScalarWhereInput
    data: XOR<PlanFeatureUpdateManyMutationInput, PlanFeatureUncheckedUpdateManyWithoutPlanInput>
  }

  export type PlanFeatureScalarWhereInput = {
    AND?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
    OR?: PlanFeatureScalarWhereInput[]
    NOT?: PlanFeatureScalarWhereInput | PlanFeatureScalarWhereInput[]
    id?: StringFilter<"PlanFeature"> | string
    planId?: StringFilter<"PlanFeature"> | string
    text?: StringFilter<"PlanFeature"> | string
    sortOrder?: IntFilter<"PlanFeature"> | number
  }

  export type PlanCreateWithoutFeaturesInput = {
    id?: string
    slug: string
    category: $Enums.PlanCategory
    name: string
    modality: string
    excerpt: string
    idealFor?: string | null
    price: number
    currency?: string
    imageUrl: string
    imageAlt: string
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUncheckedCreateWithoutFeaturesInput = {
    id?: string
    slug: string
    category: $Enums.PlanCategory
    name: string
    modality: string
    excerpt: string
    idealFor?: string | null
    price: number
    currency?: string
    imageUrl: string
    imageAlt: string
    isActive?: boolean
    sortOrder?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCreateOrConnectWithoutFeaturesInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
  }

  export type PlanUpsertWithoutFeaturesInput = {
    update: XOR<PlanUpdateWithoutFeaturesInput, PlanUncheckedUpdateWithoutFeaturesInput>
    create: XOR<PlanCreateWithoutFeaturesInput, PlanUncheckedCreateWithoutFeaturesInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutFeaturesInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutFeaturesInput, PlanUncheckedUpdateWithoutFeaturesInput>
  }

  export type PlanUpdateWithoutFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumPlanCategoryFieldUpdateOperationsInput | $Enums.PlanCategory
    name?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    idealFor?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageAlt?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateWithoutFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: EnumPlanCategoryFieldUpdateOperationsInput | $Enums.PlanCategory
    name?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    idealFor?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    imageAlt?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanFeatureCreateManyPlanInput = {
    id?: string
    text: string
    sortOrder?: number
  }

  export type PlanFeatureUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type PlanFeatureUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type PlanFeatureUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}