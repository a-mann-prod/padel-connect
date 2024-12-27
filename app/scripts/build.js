// const dotenv = require('dotenv')
const path = require('path')
// const fs = require('fs')

const rootDir = path.join(__dirname, '..')

const args = process.argv.slice(2) // ignore 2 first args (node path and script path)

const env = args?.[0]
const platformOption = args?.[1]

if (env !== 'local' && env !== 'preview' && env !== 'production') {
  console.error(
    'Usage: yarn build [local|preview|production] [ios|android|all]'
  )
  process.exit(1)
}

if (
  platformOption !== 'ios' &&
  platformOption !== 'android' &&
  platformOption !== 'all'
) {
  console.error(
    'Usage: yarn build [local|preview|production] [ios|android|all]'
  )
  process.exit(1)
}

const { execSync } = require('child_process')

// execSync('cp eas.json eas.json.save')

// const envConfig = dotenv.parse(fs.readFileSync('.env'))
// const easJson = JSON.parse(fs.readFileSync('eas.json.save', 'utf8'))

// if (!envConfig) {
//   console.error(`.env file not found`)
//   process.exit(1)
// }

// if (!easJson) {
//   console.error(`eas.json file not found`)
//   process.exit(1)
// }

// if (!easJson.build[env]) {
//   console.error(`Env ${env} does not exist`)
//   process.exit(1)
// }

// const currentEnv = easJson.build[env].env

// Object.keys(envConfig).forEach((key) => {
//   if (!(key in currentEnv)) {
//     currentEnv[key] = envConfig[key]
//   }
// })

// fs.writeFileSync('eas.json', JSON.stringify(easJson, null, 2))

// process.exit(0)

try {
  // exec build
  execSync(`eas build -e ${env} -p ${platformOption} --local`, {
    stdio: 'inherit',
    env: { ...process.env, FORCE_COLOR: '1' },
    shell: true,
    cwd: rootDir,
  })
} finally {
  // revert eas.json
  // execSync('rm eas.json && mv eas.json.save eas.json')
}
