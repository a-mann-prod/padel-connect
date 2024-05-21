const args = process.argv.slice(2) // ignore 2 first args (node path and script path)

const platformOption = args?.[0]

if (
  platformOption !== 'ios' &&
  platformOption !== 'android' &&
  platformOption !== 'all'
) {
  console.error('Usage: yarn build [ios|android|all]')
  process.exit(1)
}

const { execSync } = require('child_process')

// replace eas.json by eas.local.json
execSync('mv eas.json eas.json.save && mv eas.local.json eas.json')

try {
  // exec build
  execSync(
    `eas build -e local -p ${platformOption} --non-interactive --no-wait --local`,
    {
      stdio: 'inherit',
    }
  )
} finally {
  // revert eas.json
  execSync('mv eas.json eas.local.json && mv eas.json.save eas.json')
}
