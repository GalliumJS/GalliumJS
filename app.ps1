Add-Type -AssemblyName System.Windows.Forms

$form = New-Object System.Windows.Forms.Form
$form.Text = "Gallium"
$form.Width = 800
$form.Height = 600
# Fullscreen
if ($false -eq $true) {
    $form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::None
    $form.WindowState = [System.Windows.Forms.FormWindowState]::Maximized
}
# Still issues with this
if ($false -eq $false) {
    $form.Width = 800
    $form.Height = 600
    $form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::Sizable
    $form.MaximizeBox = $true
    $form.MinimizeBox = $true
}
$form.StartPosition = [System.Windows.Forms.FormStartPosition]::CenterScreen
$form.TopMost = $true
$form.ShowIcon = $true
$form.ShowInTaskbar = $true
$form.TopMost = $true
$form.WindowState = [System.Windows.Forms.FormWindowState]::Normal
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::None
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::Fixed3D
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::FixedSingle
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::FixedToolWindow
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::None
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::Sizable
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::SizableToolWindow
$form.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon("icon.ico")
$form.TopMost = $true
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::Fixed3D

$form.BackColor = [System.Drawing.Color]::Black

$label = New-Object System.Windows.Forms.Label
$label.Text = "Hello, World!"
$label.Font = New-Object System.Drawing.Font("Times New Roman", 10)
$label.ForeColor = [System.Drawing.Color]::White
$label.Location = New-Object System.Drawing.Point(10, 10)
$form.Controls.Add($label)

$form.ShowDialog()

$ipc = New-Object System.Net.Sockets.TcpClient
$ipc.Connect("localhost", 3000)
$ipcStream = $ipc.GetStream()
$ipcReader = New-Object System.IO.StreamReader($ipcStream)
$ipcWriter = New-Object System.IO.StreamWriter($ipcStream)
$ipcWriter.AutoFlush = $true
$ipcWriter.WriteLine("Connected")

while ($true) {
    $ipcCommand = $ipcReader.ReadLine()
    if ($ipcCommand -eq "clear") {
        $form.Refresh()
    }
    if ($ipcCommand -eq "run") {
        $form.ShowDialog()
    }
    if ($ipcCommand -eq "exit") {
        $form.Close()
    }
    if ($ipcCommand -eq "refresh") {
        $form.Refresh()
    }
}
