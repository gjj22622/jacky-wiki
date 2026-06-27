param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string] $Message
)

$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot
node src/bot.mjs notify $Message
