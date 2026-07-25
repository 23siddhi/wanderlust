$port = 3000
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$mimeTypes = @{
  ".html" = "text/html"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".woff" = "font/woff"
  ".woff2"= "font/woff2"
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:${port}/")
$listener.Start()

Write-Host ""
Write-Host "  Wanderlust Travel Website" -ForegroundColor Cyan
Write-Host "  Server running at http://localhost:${port}" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop" -ForegroundColor DarkGray
Write-Host ""

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response

  $path = $request.Url.LocalPath
  if ($path -eq "/") { $path = "/index.html" }

  $filePath = Join-Path $root ($path.TrimStart("/").Replace("/", "\"))

  if (Test-Path $filePath -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    $contentType = $mimeTypes[$ext]
    if (-not $contentType) { $contentType = "application/octet-stream" }

    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $response.ContentType = $contentType
    $response.ContentLength64 = $bytes.Length
    $response.StatusCode = 200
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
    $response.StatusCode = 404
    $response.ContentType = "text/plain"
    $response.ContentLength64 = $msg.Length
    $response.OutputStream.Write($msg, 0, $msg.Length)
  }

  $response.OutputStream.Close()
}
