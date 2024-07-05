const args = process.argv.slice(2) // ignore 2 first args (node path and script path)

const [channelName, commitMessage] = args

if (!['preview', 'production'].includes(channelName)) {
  console.error('Usage: arg 0 (channel) has to be [preview|production]')
  process.exit(1)
}

if (!commitMessage) {
  console.error('Usage: arg 1 (commitMessage) is required')
  process.exit(1)
}

const { execSync } = require('child_process')

// exec ota-build
execSync(
  `eas update --channel ${channelName} --message "${commitMessage}"  --non-interactive`,
  {
    stdio: 'inherit',
  }
)
